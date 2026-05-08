import { useEffect, useState } from "react";
import { fetchHistory, fetchQuizById } from "../api/quizApi";
import type { QuizResponse } from "../types";
import QuizCard from "../components/QuizCard";
import Modal from "../components/Modal";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizResponse | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchHistory().then(setHistory);
  }, []);

  const openDetails = async (id: number) => {
    const quiz = await fetchQuizById(id);
    setSelectedQuiz(quiz);
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Past Quizzes</h2>

        <table className="w-full border border-slate-200">
          <thead className="bg-slate-100 text-sm text-slate-700">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border text-left">Title</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id} className="hover:bg-slate-50">
                <td className="p-3 border text-center">{h.id}</td>
                <td className="p-3 border">{h.title}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => openDetails(h.id)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open && selectedQuiz !== null}
        onClose={() => {
          setOpen(false);
          setSelectedQuiz(null);
        }}
        title={selectedQuiz?.title || "Quiz Details"}
      >
        {selectedQuiz && (
          <>
            <p className="mb-4 text-slate-600">
              {selectedQuiz.summary}
            </p>

            <div className="space-y-4">
              {selectedQuiz.quiz.map((q, i) => (
                <QuizCard key={i} q={q} index={i} />
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
