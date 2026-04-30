from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Quiz
from app.schemas import QuizHistoryItem


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix="/history", tags=["History"])

@router.get("/", response_model=list[QuizHistoryItem])
def get_history(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).order_by(Quiz.created_at.desc()).all()

    return [
        {
            "id": q.id,
            "url": q.url,
            "title": q.title,
            "created_at": q.created_at
        }
        for q in quizzes
    ]
