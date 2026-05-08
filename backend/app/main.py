from fastapi import FastAPI
from app.models import Quiz  # Ensure models are imported for metadata creation
from app.db import Base, engine
from app.routes import quiz, history
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Wiki Quiz Generator",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],            # allow all HTTP methods
    allow_headers=["*"],            # allow all headers
)


app.include_router(quiz.router)
app.include_router(history.router)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Wiki Quiz API running in Docker container."
    }
