/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Answer,
  AnswerError,
  Question,
  QuestionError,
  Quiz,
  QuizError,
} from '../types/quiz';
import * as quizApi from '../api/quiz';

const initialAnswerError: AnswerError = { text: '', isCorrect: '' };

const initialAnswer: Answer = {
  id: 0,
  text: '',
  isCorrect: false,
  errors: { ...initialAnswerError },
};

const initialQuestionError: QuestionError = {
  text: '',
};

const initialQuestion: Question = {
  id: 0,
  text: '',
  answers: [{ ...initialAnswer }],
  answersCount: 0,
  errors: { ...initialQuestionError },
};

const initialState: {
  data: Quiz;
} = {
  data: {
    id: 0,
    title: '',
    description: '',
    questions: [],
    errors: { title: '', description: '' },
  },
};

export const createQuiz = createAsyncThunk(
  'quiz/createQuiz',
  async (quiz: Quiz) => {
    const res = await quizApi.createQuiz(quiz);

    return res;
  },
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    updateQuiz(state, action: PayloadAction<Partial<Quiz>>) {
      Object.assign(state.data, action.payload);
    },

    updateQuizError(state, action: PayloadAction<Partial<QuizError>>) {
      Object.assign(state.data.errors, action.payload);
    },

    addQuestion(state, action: PayloadAction<Partial<Question>>) {
      const { payload } = action;

      state.data.questions.push({
        ...initialQuestion,
        id: +Date.now(),
        ...payload,
      });
    },

    removeQuestion(state, action: PayloadAction<number>) {
      const { payload } = action;

      state.data.questions = state.data.questions.filter(
        item => item.id !== payload,
      );
    },

    updateQuestion(
      state,
      action: PayloadAction<{
        id: number;
        question: Partial<Question>;
      }>,
    ) {
      const { payload } = action;
      const question = state.data.questions.find(
        item => item.id === payload.id,
      );

      if (question) {
        Object.assign(question, payload.question);
      }
    },

    updateQuestionError(
      state,
      action: PayloadAction<{
        id: number;
        question: Partial<QuestionError>;
      }>,
    ) {
      const { payload } = action;
      const question = state.data.questions.find(
        item => item.id === payload.id,
      );

      if (question) {
        Object.assign(question.errors, payload.question);
      }
    },

    addAnswer(
      state,
      action: PayloadAction<{
        questionId: number;
        answer?: Partial<Answer>;
      }>,
    ) {
      const { payload } = action;
      const question = state.data.questions.find(
        item => item.id === payload.questionId,
      );

      question?.answers.push({
        ...initialAnswer,
        id: +Date.now(),
        ...payload.answer,
      });
    },

    removeAnswer(
      state,
      action: PayloadAction<{
        questionId: number;
        answerId: number;
      }>,
    ) {
      const { payload } = action;
      const question = state.data.questions.find(
        item => item.id === payload.questionId,
      );

      if (question) {
        question.answers = question?.answers.filter(
          item => item.id !== payload.answerId,
        );
      }
    },

    updateAnswer(
      state,
      action: PayloadAction<{
        questionId: number;
        answerId: number;
        answer: Partial<Answer>;
      }>,
    ) {
      const { payload } = action;
      const answer = state.data.questions
        .find(item => item.id === payload.questionId)
        ?.answers.find(item => item.id === payload.answerId);

      if (answer) {
        Object.assign(answer, payload.answer);
      }
    },

    updateAnswerError(
      state,
      action: PayloadAction<{
        questionId: number;
        answerId: number;
        answer: Partial<AnswerError>;
      }>,
    ) {
      const { payload } = action;
      const answer = state.data.questions
        .find(item => item.id === payload.questionId)
        ?.answers.find(item => item.id === payload.answerId);

      if (answer) {
        Object.assign(answer.errors, payload.answer);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(createQuiz.fulfilled, state => {
      state.data = structuredClone(initialState.data);
    });
  },
});

export const {
  updateQuiz,
  updateQuizError,
  addQuestion,
  removeQuestion,
  updateQuestion,
  updateQuestionError,
  addAnswer,
  removeAnswer,
  updateAnswer,
  updateAnswerError,
} = quizSlice.actions;
export default quizSlice.reducer;
