from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Quiz
from app.schemas import GenerateQuizRequest, GenerateQuizResponse
from app.scraper import scrape_wikipedia
from app.llm import generate_quiz, generate_related_topics
from app.utils.response_builder import build_quiz_response


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter(prefix="/quiz", tags=["Quiz"])

@router.get("/preview")
def preview_article(url: str):
    """
    Fetch Wikipedia title for URL preview
    """
    try:
        scraped = scrape_wikipedia(url)
        return {
            "title": scraped["title"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid Wikipedia URL")


@router.post("/generate", response_model=GenerateQuizResponse)
def generate_quiz_api(
    request: GenerateQuizRequest,
    db: Session = Depends(get_db)
):
    # 1. Cache check
    existing = db.query(Quiz).filter(Quiz.url == str(request.url)).first()
    if existing:
        response = build_quiz_response(existing, cached=True)
        return response


    # 2. Scrape
    try:
        scraped = scrape_wikipedia(str(request.url))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # 3. LLM
    try:
        quiz_data = generate_quiz(scraped["content"])
        related_topics = generate_related_topics(scraped["content"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 4. Save
    quiz = Quiz(
        url=str(request.url),
        title=scraped["title"],
        summary=scraped["summary"],
        content=scraped["content"],
        quiz=quiz_data,
        related_topics=related_topics
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    return build_quiz_response(quiz, scraped["sections"], cached=False)



@router.get("/{quiz_id}", response_model=GenerateQuizResponse)
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    return build_quiz_response(quiz)
