from app.models import Quiz


def build_quiz_response(quiz: Quiz, sections=None, cached: bool = False):
    return {
        "id": quiz.id,
        "url": quiz.url,
        "title": quiz.title,
        "summary": quiz.summary,
        "key_entities": {
            "people": [],
            "organizations": [],
            "locations": []
        },
        "sections": sections or [],
        "quiz": quiz.quiz,
        "related_topics": quiz.related_topics or [],
        "cached": cached
    }
