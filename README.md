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
