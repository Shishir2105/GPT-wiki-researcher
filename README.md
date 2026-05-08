<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a322d387a8195bc5a5a108a2b63d7736b1952494
# GPT Researcher

[![PyPI version](https://badge.fury.io/py/gpt-researcher.svg)](https://badge.fury.io/py/gpt-researcher)

## Description

GPT Researcher is an autonomous agent designed for comprehensive online research on a variety of tasks. It produces detailed, factual, and unbiased research reports with customization options for focusing on relevant resources, outlines, and lessons.

## Features

- Generate research reports, outlines, resources, and lessons from web sources and local documents
- Support for long and detailed reports (over 2K words)
- Aggregates over 20 web sources for objective conclusions
- Easy-to-use web interface (HTML/CSS/JS)
- Scrapes web sources with JavaScript support
- Tracks visited and used web sources
- Export reports to PDF, Word, and more
- Multi-agent assistant using LangGraph

## Installation

### Prerequisites
- Python 3.11 or later
- OpenAI API key
- Tavily API key (or other search API)

### Steps
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd gpt-researcher
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create a `.env` file in the project directory
   - Add your API keys:
     ```
     OPENAI_API_KEY=your_openai_key
     TAVILY_API_KEY=your_tavily_key
     ```

## Usage

### Web Interface
1. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
2. Open http://localhost:8000 in your browser

### CLI
Use the command-line interface for research tasks.

Example:
```bash
python cli.py "Why is Nvidia stock going up?"
```

### API
Install as a package:
```bash
pip install gpt-researcher
```

Example usage:
```python
from gpt_researcher import GPTResearcher

query = "why is Nvidia stock going up?"
researcher = GPTResearcher(query=query, report_type="research_report")
research_result = await researcher.conduct_research()
report = await researcher.write_report()
print(report)
```

## Screenshots

### Web Interface
![Web Interface Screenshot](https://cowriter-images.s3.amazonaws.com/architecture.png)
*Main interface for conducting research.*

### Sample Report Output
<video width="640" height="360" controls>
  <source src="gpt-wiki-reasearcher-output-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
*Video demonstration of a generated research report.*

## Examples

### Input/Output Example

**Input Query:** "Explain what Solana is and its use cases."

**Output Report:**
- Solana is a high-performance blockchain platform...
- Use cases include decentralized applications, NFTs, and DeFi...
- (Full detailed report generated)

### CLI Example
```bash
python cli.py "What is Blockchain Technology?"
```
Output: Generates a markdown file with the research report in the `outputs/` directory.


### Contributors
- [Muzammil Ibrahim](https://github.com/muzammil-ibrahim)
- [Podapati Arjun](https://github.com/Arjun7304)
- [Shishir Sreeramadasu](https://github.com/Shishir2105)
- [SVK Sai Teja](https://github.com/Sai-Teja44)

## Limitations and Future Work

### Limitations
- High API costs due to LLM usage
- Potential biases from web sources
- Dependency on external search APIs
- Limited to text-based research

### Future Work
- Integrate more LLM providers
- Add support for multimedia research
- Improve bias detection algorithms
- Develop offline research capabilities

<<<<<<< HEAD
=======
---
=======
# 📘 Wiki Quiz Generator (LLM-Powered)
###  Overview
Wiki Quiz Generator is a full‑stack application that accepts a Wikipedia article URL and automatically generates a quiz using a Large Language Model (LLM).

#The system:

 Scrapes Wikipedia articles (HTML only, no Wikipedia API)

 Generates quizzes (8–10 MCQs) using Gemini via LangChain

 Stores results in PostgreSQL

 Provides history and quiz replay

 Includes bonus features like Take Quiz mode, section‑wise grouping, and caching indicator

# ✨ Features
### Core Features
 Accepts Wikipedia article URL

 Scrapes and cleans article content using BeautifulSoup

 Generates quiz using Gemini (LangChain)

 Each question includes:

Question text

4 options

Correct answer

Difficulty (easy / medium / hard)

Explanation

 Suggests related Wikipedia topics

 Stores all data in PostgreSQL

 History tab to view past quizzes

 Modal view for quiz details

### Bonus Features
 Take Quiz mode with scoring and feedback

 Section‑wise question grouping

 Caching indicator (detects reused URLs)

 Fully Dockerized backend + database

# 🏗️ Tech Stack
### Backend

FastAPI

SQLAlchemy

PostgreSQL

LangChain

Gemini 2.5 Flash (via API)

BeautifulSoup

Docker

### Frontend

React

Vite

TypeScript

Tailwind CSS

# 📂 Project Structure
Code
wiki-quiz/

│

├── backend/

│   ├── app/

│   │   ├── routes/

│   │   ├── models.py

│   │   ├── schemas.py

│   │   ├── scraper.py

│   │   ├── llm.py

│   │   ├── prompts.py

│   │   └── main.py

│   ├── Dockerfile

│   └── requirements.txt

│

├── frontend/

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── vite.config.ts

│

├── sample_data/

│   ├── urls.txt

│   ├── Hyderabad_response.json

│   ├── india_response.json

│   ├── italy_response.json

│   ├── oneplus_response.json

│   └── russia_response.json

│

├── docker-compose.yml

└── README.md

# ⚙️ Setup Instructions
### 1️⃣ Prerequisites
Docker & Docker Compose

Node.js  (v18+)

Gemini API Key

### 2️⃣ Environment Variables
Create a .env file at project root:

Code
GOOGLE_API_KEY=your_gemini_api_key_here
### 3️⃣ Run Backend + Database
bash
docker-compose up --build
Backend runs at: http://localhost:8000

Swagger docs: http://localhost:8000/docs

### 4️⃣ Run Frontend
bash
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

### 🔌 API Endpoints
Generate Quiz
http
POST /quiz/generate
Body:

json
{
  "url": "https://en.wikipedia.org/wiki/MS_Dhoni"
}
History
http
GET /history
Quiz Details
http
GET /quiz/{id}

# 🧠 Prompt Templates Used
The following prompt templates are used to ensure structured, grounded,
and hallucination-minimized LLM outputs.


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

Return JSON strictly in this format:
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

# 🧪 Sample Data
Located in sample_data/:

urls.txt — tested Wikipedia URLs

Sample JSON responses:
 - Hyderabad_response.json
 - india_response.json
 - italy_response.json
 - oneplus_response.json
 - russia_response.json

# 📸 Screenshots

### Generate Quiz Page
![Generate Quiz Screenshot](/screenshots/generate_quiz.png)

### History Page
![History Screenshot](/screenshots/history_tab.png)
![History Modal Screenshot](/screenshots/history_modal.png)

### Take Quiz Mode
![Take Quiz Screenshot](/screenshots/quiz_score.png)



# 🙌 Final Note
This project demonstrates:

Full‑stack development

LLM integration

API design

Clean architecture

Product‑oriented thinking
>>>>>>> 8525d7ea7fb3193d838afe743ab4b773cf3ffcb4
# GPT-wiki-researcher
>>>>>>> a322d387a8195bc5a5a108a2b63d7736b1952494
