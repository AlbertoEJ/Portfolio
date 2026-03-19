import type { Timestamp } from "firebase/firestore";

export type QuestionType = "single" | "multiple" | "scale" | "text";

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  active: boolean;
  createdAt: Timestamp;
  questions: Question[];
}

export type AnswerValue = string | string[] | number;

export interface SurveyResponse {
  name: string;
  email: string;
  submittedAt: Timestamp;
  answers: Record<string, AnswerValue>;
}
