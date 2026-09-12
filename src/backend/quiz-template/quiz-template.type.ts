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
