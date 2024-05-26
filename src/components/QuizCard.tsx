import { useNavigate } from 'react-router-dom';
import { Quiz } from '../types/quiz';
import basketImg from '../images/icon-basket.svg';
import penImg from '../images/icon-pen.svg';
import { useAppDispatch } from '../app/hooks';
import * as quizSlice from '../features/quizSlice';

interface Props {
  quiz: Quiz;
}

export const QuizCard: React.FC<Props> = ({ quiz }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questionsNum = quiz.questions.length;

  const handleRemoveQuiz = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    dispatch(quizSlice.removeQuizById(quiz.id));
  };

  const handleEditQuiz = () => {
    navigate(`edit-quiz/${quiz.id}`);
  };

  return (
    <div className="relative w-full max-w-[25rem]">
      <div className="absolute right-5 top-5 flex gap-2">
        <button
          type="button"
          className="
          rounded-2xl p-2 hover:bg-elements"
          onClick={handleEditQuiz}
        >
          <img className="aspect-square h-6" src={penImg} alt="Edit quiz" />
        </button>
        <button
          type="button"
          className="aspect-square
          rounded-2xl p-2 hover:bg-elements"
          onClick={handleRemoveQuiz}
        >
          <img
            className="aspect-square h-6"
            src={basketImg}
            alt="Remove quiz"
          />
        </button>
      </div>
      <button
        onClick={() => navigate(`/quiz/${quiz.id}`)}
        type="button"
        className="flex min-h-[15rem] w-full max-w-[25rem] flex-col
        justify-between gap-6 rounded-2xl
        border-0.5 border-elements p-5 hover:bg-elements"
      >
        <div className="pr-[25%]">
          <h4 className="font-bold">{quiz.title}</h4>
          <h5>{quiz.description}</h5>
        </div>
        <div className="ml-auto flex flex-col justify-end gap-2">
          <h5>{`Correct answers: ${quiz.correctAnswers} / ${quiz.questions.length}`}</h5>
          <h5 className="text-end">
            {`question${questionsNum > 1 ? 's' : ''}: ${questionsNum}`}
          </h5>
        </div>
      </button>
    </div>
  );
};
