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
