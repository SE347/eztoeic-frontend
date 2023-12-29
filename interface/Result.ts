export interface ResultDetail {
  questionId: number;
  resultDetailId: number;
  answerByUser: string | null;
  isCorrect: boolean;
  question: string;
  answer: string;
  imageUrl: string | null;
  audioUrl: string;
  A: string | null;
  B: string | null;
  C: string | null;
  D: string | null;
  partNumber: string;
  questionIndex: number;
  questionCount: number;
}

export interface ResultDetails {
  partNumber: string;
  questionCount: number;
  questions: ResultDetail[];
}

export interface Result {
  id: number;
  score: string;
  readingCorrectCount: number;
  listeningCorrectCount: number;
  correctCount: number;
  wrongCount: number;
  undoneCount: number;
  time: string;
  testTitle: string;
  resultDetails: ResultDetails[];
}
