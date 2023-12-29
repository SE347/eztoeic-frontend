export interface ResultPart {
  id: number;
  partNumber: number;
}

export interface HistoricalTestResult {
  id: number;
  state: string;
  score: string;
  readingCorrectCount: number;
  listeningCorrectCount: number;
  correctCount: number;
  wrongCount: number;
  undoneCount: number;
  time: string;
  createdAt: string;
  resultParts: ResultPart[];
  title: string;
  testId: number;
}

export interface HistoricalTestResultData {
  title: string;
  testId: number;
  values: HistoricalTestResult[];
}
