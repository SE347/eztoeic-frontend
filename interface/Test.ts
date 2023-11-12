export interface TestInfo {
  id: number;
  title: string;
  sectionCount: number;
  questionCount: number;
  time: string;
  setTitle: string;
}

export interface Test {
  test: TestInfo;
  testParts: TestPart[];
}

export interface TestPart {
  partNumber: string;
  id: number;
  questionCount: number;
  selectAnswerCount: number;
  questions: Question[];
}

export interface Question {
  id: number;
  index: number;
  question: string;
  answer: string;
  imageUrl: string | null;
  audioUrl: string | null;
  A: string | null;
  B: string | null;
  C: string | null;
  D: string | null;
}
