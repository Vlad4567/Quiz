import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import quizSlice from '../features/quizSlice';

export const store = configureStore({
  reducer: {
    quizSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
