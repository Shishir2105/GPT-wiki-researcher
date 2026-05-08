import { useState } from "react";
import { generateQuiz } from "../api/quizApi";
import type { QuizResponse } from "../types";
import QuizCard from "../components/QuizCard";

export default function GenerateQuiz() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const isValidWikiUrl = (value: string) =>
    /^https?:\/\/(?:[a-z]+\.)?wikipedia\.org\/wiki\/.+$/i.test(value.trim());

  const handleGenerate = async () => {
    if (!isValidWikiUrl(url)) {
      setErrorMessage("Please enter a valid Wikipedia article URL.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSubmitted(false);
    setUserAnswers({});

    try {
      const res = await generateQuiz(url.trim());
      setData(res);
    } catch (e: any) {
      if (e?.response?.status === 400) {
        setErrorMessage("Invalid Wikipedia article. Please check the URL and try again.");
      } else if (e?.response?.status === 500) {
        setErrorMessage("Quiz generation failed. The article might be too short or complex. Please try a different article.");
      } else {
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: answer,
    }));
  };


  const score =
    data?.quiz.filter(
      (q, i) => userAnswers[i] === q.answer
    ).length || 0;

  const groupedQuestions = data
    ? data.quiz.reduce<Record<string, typeof data.quiz>>(
        (acc, q) => {
          acc[q.section] = acc[q.section] || [];
          acc[q.section].push(q);
          return acc;
        },
        {}
      )
    : {};


  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Generate Quiz from Wikipedia
      </h2>

      {/* URL input */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row">
        <input
          className="flex-1 border border-slate-300 rounded-md px-3 py-2"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setErrorMessage(null);
          }}
          placeholder="https://en.wikipedia.org/wiki/india"
        />
        <button
          onClick={handleGenerate}
          disabled={!url || !isValidWikiUrl(url)}
          className={`px-5 py-2 rounded-md transition
            ${
              url && isValidWikiUrl(url)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Generate
        </button>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
      )}

      {loading && (
        <p className="text-sm text-slate-500">
          Generating quiz, please wait…
        </p>
      )}

      {/* Quiz Section */}
      {data && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-1">{data.title}</h3>

          {/* 🆕 CACHE INDICATOR */}
          {data.cached && (
            <span className="inline-block mb-2 px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
              ⚡ Loaded from cache
            </span>
          )}

          <p className="text-slate-600 mb-6">{data.summary}</p>


          <div className="space-y-4">
          {Object.entries(groupedQuestions).map(([section, questions]) => (
            <div key={section || "no-section"} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                📌 {"General"}
              </h3>

              <div className="space-y-4">
                {questions.map((q, i) => (
                  <QuizCard
                    key={i}
                    q={q}
                    index={i}
                    userAnswer={userAnswers[i]}
                    onAnswerSelect={(ans) => handleSelect(i, ans)}
                    showResult={submitted}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>


          <button
            className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            onClick={() => setSubmitted(true)}
          >
            Submit Quiz
          </button>

          {submitted && (
            <p className="mt-4 text-lg font-semibold">
              Your Score: {score} / {data.quiz.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
