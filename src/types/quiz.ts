export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  errors: AnswerError;
}

export interface AnswerError {
  text: string;
  isCorrect: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  answersCount: number;
  errors: QuestionError;
}

export interface QuestionError {
  text: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  errors: QuizError;
}

export interface QuizError {
  title: string;
  description: string;
}
