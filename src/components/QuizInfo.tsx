import { useAppDispatch, useAppSelector } from '../app/hooks';
import { InputWithError } from './InputWithError';
import * as quizSlice from '../features/quizSlice';
import { Textarea } from './Textarea';

interface Props {
  type: 'edit' | 'view';
}

export const QuizInfo: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.quizSlice);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.errors.title) {
      dispatch(quizSlice.updateQuizError({ title: '' }));
    }

    dispatch(
      quizSlice.updateQuiz({
        title: e.target.value,
      }),
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (data.errors.description) {
      dispatch(quizSlice.updateQuizError({ description: '' }));
    }

    dispatch(
      quizSlice.updateQuiz({
        description: e.target.value,
      }),
    );
  };

  switch (type) {
    case 'edit':
      return (
        <form
          className="flex flex-col gap-4
          rounded-2xl border border-icons p-2"
        >
          <InputWithError
            placeholder="Title"
            value={data.title}
            onChange={handleTitleChange}
            errorText={data.errors.title}
          />
          <Textarea
            autoGrow
            placeholder="Description"
            value={data.description}
            onChange={handleDescriptionChange}
            errorText={data.errors.description}
          />
        </form>
      );

    case 'view':
      return (
        <div
          className="flex h-[15rem] flex-col justify-between
          rounded-2xl border border-icons p-2"
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">{data.title}</h3>
            <h4>{data.description}</h4>
          </div>
          <div className="ml-auto flex flex-col gap-1">
            <h5>{`Correct answers: ${data.correctAnswers} / ${data.questions.length}`}</h5>
          </div>
        </div>
      );

    default:
      return <></>;
  }
};
