QUIZ_PROMPT = """
You are an expert quiz creator.

Using ONLY the information from the Wikipedia article below,
generate 8-10 multiple-choice questions.

Rules:
- Each question must belong to ONE section from the article
- Section must be chosen from the article headings
- Each question must have exactly 4 options
- Only ONE correct answer
- Difficulty: easy, medium, hard
- Explanation grounded in article text
- Output MUST be valid JSON
- DO NOT add extra text

Wikipedia Article:
{article_text}

Return JSON strictly in this format and include 8-10 objects:
[
  {{
    "section": "",
    "question": "",
    "options": ["", "", "", ""],
    "answer": "",
    "difficulty": "",
    "explanation": ""
  }}
]
"""





RELATED_TOPICS_PROMPT = """
Based ONLY on the Wikipedia article below,
suggest 5 related Wikipedia topics for further reading.

Rules:
- Topics must be relevant
- No explanations
- Output ONLY a JSON array of strings

Wikipedia Article:
{article_text}
"""
