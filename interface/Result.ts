// import { ResultDetail } from '@/interface/Result';
// export interface ResultDetail {
//     questionId: number;
//     resultdetailid: number;
//     answerByUser: string | null;
//     isCorrect: boolean;
//     question: string;
//     answer: string;
//     imageUrl: string | null;
//     audioUrl: string;
//     A: string | null;
//     B: string | null;
//     C: string | null;
//     D: string | null;
//     partNumber: string;
// }

// export interface Result {
//     id: number;
//     state: string;
//     score: string;
//     readingCorrectCount: number;
//     listeningCorrectCount: number;
//     correctCount: number;
//     time: string;
//     resultDetails: {
//         partNumber: string;
//         questions: ResultDetail[];
//     }[];
// }

export interface ResultDetail {
  questionId: number;
  resultdetailid: number;
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
