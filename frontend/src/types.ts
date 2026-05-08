export interface QuizQuestion {
  section: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
  explanation: string;
}


export interface QuizResponse {
  id: number;
  url: string;
  title: string;
  summary: string;
  sections: string[];
  quiz: QuizQuestion[];
  related_topics: string[];
  cached?: boolean; // 🆕
}
