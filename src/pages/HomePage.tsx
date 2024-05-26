import { useEffect } from 'react';
import { QuizCard } from '../components/QuizCard';
import * as quizSlice from '../features/quizSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { quizes } = useAppSelector(state => state.quizSlice);

  useEffect(() => {
    dispatch(quizSlice.loadQuizes());
  }, [dispatch]);

  return (
    <main className="flex flex-wrap justify-evenly">
      {!quizes.length && (
        <h1 className="m-auto text-center font-bold">There are no quizes</h1>
      )}

      {quizes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </main>
  );
};
