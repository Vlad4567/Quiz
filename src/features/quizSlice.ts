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
  isChoosed: false,
  answer: '',
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
  quizes: Quiz[];
} = {
  data: {
    id: 0,
    title: '',
    description: '',
    questions: [],
    correctAnswers: 0,
    errors: { title: '', description: '' },
  },
  quizes: [],
};

export const loadQuizes = createAsyncThunk('quiz/loadQuizes', async () => {
  const res = await quizApi.getQuizes();

  return res;
});

export const createQuiz = createAsyncThunk(
  'quiz/createQuiz',
  async (quiz: Quiz) => {
    const res = await quizApi.createQuiz(quiz);

    return res;
  },
);

export const loadQuizById = createAsyncThunk(
  'quiz/loadQuizById',
  async (id: number) => {
    const res = await quizApi.getQuizById(id);

    return res;
  },
);

export const updateCorrectAnswersByQuizId = createAsyncThunk(
  'quiz/correctAnswersByQuizId',
  async ({ id, correctAnswers }: { id: number; correctAnswers: number }) => {
    const res = await quizApi.updateCorrectAnswersByQuizId(id, correctAnswers);

    return res;
  },
);

export const updateQuizById = createAsyncThunk(
  'quiz/updateQuizById',
  async ({ id, quiz }: { id: number; quiz: Quiz }) => {
    const res = await quizApi.updateQuizById(id, quiz);

    return res;
  },
);

export const removeQuizById = createAsyncThunk(
  'quiz/removeQuizById',
  async (id: number, thunkApi) => {
    const res = await quizApi.removeQuizById(id);

    await thunkApi.dispatch(loadQuizes());

    return res;
  },
);

export const searchQuizes = createAsyncThunk(
  'quiz/searchQuizes',
  async ({ text }: { text: string }) => {
    const res = await quizApi.searchQuizes(text);

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

    resetData(state) {
      state.data = initialState.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(createQuiz.fulfilled, state => {
      state.data = structuredClone(initialState.data);
    });
    builder.addCase(loadQuizById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(removeQuizById.fulfilled, state => {
      state.data = structuredClone(initialState.data);
    });
    builder.addCase(loadQuizes.fulfilled, (state, action) => {
      state.quizes = action.payload;
    });
    builder.addCase(updateCorrectAnswersByQuizId.fulfilled, (state, action) => {
      state.data.correctAnswers = action.payload;
    });
    builder.addCase(updateQuizById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(searchQuizes.fulfilled, (state, action) => {
      state.quizes = action.payload;
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
  resetData,
} = quizSlice.actions;
export default quizSlice.reducer;
