import json
import re
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

from app.prompts import QUIZ_PROMPT, RELATED_TOPICS_PROMPT


# Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",   # ✅ valid model name
    temperature=0.3
)


def safe_json_parse(text: str):
    """
    Extract and parse JSON from LLM output.
    Handles cases where Gemini adds extra text or markdown fences.
    """
    # Try to find either a JSON array or object
    match = re.search(r"(\[.*\]|\{.*\})", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON found in LLM output")
    return json.loads(match.group(0))


def generate_quiz(article_text: str):
    """Generate a quiz from article text using Gemini + Runnable API."""
    prompt = PromptTemplate(
        input_variables=["article_text"],
        template=QUIZ_PROMPT
    )

    # Runnable pipeline: prompt → llm
    chain = prompt | llm
    response = chain.invoke({"article_text": article_text})

    try:
        quiz = safe_json_parse(response.content)     # type: ignore
        if not isinstance(quiz, list) or len(quiz) < 8 or len(quiz) > 10:
            raise ValueError(
                f"LLM returned {len(quiz) if isinstance(quiz, list) else 'invalid'} quiz items; expected 8-10."
            )
        return quiz
    except Exception as e:
        raise ValueError(f"LLM returned invalid JSON for quiz: {e}")


def generate_related_topics(article_text: str):
    """Generate related topics from article text using Gemini + Runnable API."""
    prompt = PromptTemplate(
        input_variables=["article_text"],
        template=RELATED_TOPICS_PROMPT
    )

    chain = prompt | llm
    response = chain.invoke({"article_text": article_text})

    try:
        return safe_json_parse(response.content)    # type: ignore
    except Exception as e:
        raise ValueError(f"LLM returned invalid JSON for related topics: {e}")
