import requests
from bs4 import BeautifulSoup
import re
from fastapi import HTTPException


def scrape_wikipedia(url: str) -> dict:
    headers = {"User-Agent": "WikiQuizBot/1.0 (https://yourdomain.com)"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching page: {e}")

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=f"Failed to fetch Wikipedia page (status {response.status_code})")

    soup = BeautifulSoup(response.text, "html.parser")

    # Title
    title_tag = soup.find("h1")
    title = title_tag.text.strip() if title_tag else "Unknown Title"

    # Remove tables and citations
    for tag in soup.find_all(["table", "sup"]):
        tag.decompose()

    # Sections
    sections = []
    for h2 in soup.find_all("h2"):
        span = h2.find("span", class_="mw-headline")
        if span:
            sections.append(span.text.strip())

    # Paragraphs
    paragraphs = soup.find_all("p")
    text_blocks = []
    for p in paragraphs:
        text = p.get_text().strip()
        if len(text) > 50:
            text_blocks.append(text)

    # Summary = first two meaningful paragraphs
    summary = " ".join(text_blocks[:2])

    # Full text = all paragraphs, cleaned and truncated
    full_text = " ".join(text_blocks)
    full_text = re.sub(r"\s+", " ", full_text)
    full_text = full_text[:2000]

    return {
        "title": title,
        "summary": summary,
        "content": full_text,
        "sections": sections
    }
