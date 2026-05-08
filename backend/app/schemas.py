from pydantic import BaseModel, HttpUrl
from typing import List, Dict, Any, Optional
from datetime import datetime

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str
    difficulty: str
    explanation: str

class GenerateQuizRequest(BaseModel):
    url: HttpUrl

class GenerateQuizResponse(BaseModel):
    id: int
    url: str
    title: str
    summary: str

    key_entities: Dict[str, List[str]]
    sections: List[str]

    quiz: List[QuizQuestion]
    related_topics: List[str]
    cached: Optional[bool] = False


class QuizHistoryItem(BaseModel):
    id: int
    url: str
    title: str
    created_at: datetime

class QuizHistoryResponse(BaseModel):
    quizzes: List[QuizHistoryItem]
