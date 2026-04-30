import { useState } from "react";
import GenerateQuiz from "./pages/GenerateQuiz";
import History from "./pages/History";

export default function App() {
  const [tab, setTab] = useState<"generate" | "history">("generate");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">
            Wiki Quiz Generator
          </h1>

          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition
                ${tab === "generate"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
              onClick={() => setTab("generate")}
            >
              Generate Quiz
            </button>

            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition
                ${tab === "history"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
              onClick={() => setTab("history")}
            >
              History
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === "generate" ? <GenerateQuiz /> : <History />}
      </main>
    </div>
  );
}
