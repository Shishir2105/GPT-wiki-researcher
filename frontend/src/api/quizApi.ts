const API_BASE = "http://localhost:8000";

export async function generateQuiz(url: string) {
  const res = await fetch(`${API_BASE}/quiz/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!res.ok) {
    const error = new Error(`HTTP ${res.status}: ${res.statusText}`);
    (error as any).response = { status: res.status };
    throw error;
  }

  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_BASE}/history`);
  return res.json();
}

export async function fetchQuizById(id: number) {
  const res = await fetch(`${API_BASE}/quiz/${id}`);
  return res.json();
}
