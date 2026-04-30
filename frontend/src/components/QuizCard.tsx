import type { QuizQuestion } from "../types";

interface Props {
  q: QuizQuestion;
  index: number;
  userAnswer?: string;
  onAnswerSelect?: (ans: string) => void;
  showResult?: boolean;
}

export default function QuizCard({
  q,
  index,
  userAnswer,
  onAnswerSelect,
  showResult = false,
}: Props) {
  return (
    <div className="border rounded-lg p-5 bg-slate-50">
      <h4 className="font-semibold mb-3">
        Q{index + 1}. {q.question}
      </h4>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = opt === q.answer;
          const isSelected = opt === userAnswer;

          let style = "border bg-white";
          if (showResult) {
            if (isCorrect) style = "border-green-500 bg-green-100";
            else if (isSelected) style = "border-red-500 bg-red-100";
          } else if (isSelected) {
            style = "border-blue-500 bg-blue-100";
          }

          return (
            <button
              key={i}
              onClick={() => onAnswerSelect?.(opt)}
              disabled={showResult}
              className={`w-full text-left px-3 py-2 rounded border ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-3 text-sm text-slate-700">
          <p>
            <b>Correct Answer:</b> {q.answer}
          </p>
          <p className="italic">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}
