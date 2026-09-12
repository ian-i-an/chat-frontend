export interface Answer {
  questionId: number;
  optionId: number;
}

export interface QuizSubmission {
  nickname: string;
  answers: Answer[];
}

export interface GradeResultResponse {
  quizResultId: number;
  nickname: string;
  score: number;
  rank: number;
}
