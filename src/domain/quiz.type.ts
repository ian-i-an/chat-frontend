
export interface QuizCreateInfo {
  title: string;
  description: string | null;
  questionCreateInfos: QuestionCreateInfo[];
}

export interface QuestionCreateInfo {
  content: string;
  optionCreateInfos: OptionCreateInfo[];
}

export interface OptionCreateInfo {
  content: string;
  correct: boolean;
}

export interface QuizMetadataUpdateInfo {
  title: string;
  description: string | null;
}

export interface QuizUpdateInfo {
  title: string;
  description: string | null;
  questionUpdateInfos: QuestionUpdateInfo[];
}

export interface QuestionUpdateInfo {
  questionId: number | null;
  content: string;
  optionUpdateInfos: OptionUpdateInfo[];
}

export interface OptionUpdateInfo {
  optionId: number | null;
  content: string;
  correct: boolean;
}

export interface QuizDto {
  code: string;
  title: string;
  description: string | null;
  questions: QuestionDto[];
}

export interface QuestionDto {
  questionId: number;
  content: string;
  options: OptionDto[];
}

export interface OptionDto {
  optionId: number;
  content: string;
}

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

export interface QuizStatistics {
  totalCount: number;
  todayCreatedCount: number;
}

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

export interface QuizTemplateCursor {
  cursor?: number;
  limit: number;
}

export interface QuizTemplateMetadataDto {
  quizTemplateId: number;
  title: string;
  description: string | null;
}

export interface QuizTemplateCursorResponse {
  quizTemplates: QuizTemplateMetadataDto[];
  hasNext: boolean;
}

export interface QuizTemplateDto {
  quizTemplateId: number;
  title: string;
  description: string | null;
  questions: QuestionTemplateDto[];
}

export interface QuestionTemplateDto {
  questionId: number;
  content: string;
  options: OptionTemplateDto[];
}

export interface OptionTemplateDto {
  optionId: number;
  content: string;
}

export interface QuizTemplateCreateInfo {
  title: string;
  description: string | null;
  questionTemplates: QuestionTemplateCreateInfo[];
}

export interface QuestionTemplateCreateInfo {
  content: string;
  optionTemplates: string[];
}

export interface QuizTemplateUpdateInfo {
  title: string;
  description: string | null;
  questionTemplateUpdateInfos: QuestionTemplateUpdateInfo[];
}

export interface QuestionTemplateUpdateInfo {
  questionTemplateId: number | null;
  content: string;
  optionTemplateUpdateInfos: OptionTemplateUpdateInfo[];
}

export interface OptionTemplateUpdateInfo {
  optionTemplateId: number | null;
  content: string;
}
