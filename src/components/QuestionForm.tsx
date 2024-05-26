import { useAppDispatch } from '../app/hooks';
import { Question } from '../types/quiz';
import { Textarea } from './Textarea';
import * as quizSlice from '../features/quizSlice';
import { AnswerForm } from './AnswerForm';
import basketImg from '../images/icon-basket.svg';

interface Props {
  type: 'edit' | 'view';
  question: Question;
  questionIndex: number;
}

export const QuestionForm: React.FC<Props> = ({
  type,
  question,
  questionIndex,
}) => {
  const dispatch = useAppDispatch();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (question.errors.text) {
      dispatch(
        quizSlice.updateQuestionError({
          id: question.id,
          question: {
            text: '',
          },
        }),
      );
    }

    dispatch(
      quizSlice.updateQuestion({
        id: question.id,
        question: {
          text: e.target.value,
        },
      }),
    );
  };

  const handleQuestionDelete = () => {
    dispatch(quizSlice.removeQuestion(question.id));
  };

  switch (type) {
    case 'edit':
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2>Question {questionIndex + 1}</h2>
            <button type="button" onClick={handleQuestionDelete}>
              <img src={basketImg} alt="Remove answer" />
            </button>
          </div>
          <form
            className="flex flex-col gap-4
            rounded-2xl border border-icons p-2"
          >
            <Textarea
              autoGrow
              placeholder="Question"
              value={question.text}
              onChange={handleQuestionChange}
              errorText={question.errors.text}
            />

            <div className="flex flex-col gap-2">
              {question.answers.map((answer, index) => (
                <AnswerForm
                  key={answer.id}
                  answer={answer}
                  type={type}
                  question={question}
                  isLast={question.answers.length - 1 === index}
                />
              ))}
            </div>
          </form>
        </div>
      );

    case 'view':
      return (
        <div className="flex flex-col gap-2">
          <h2>Question {questionIndex + 1}</h2>
          <form
            className="flex flex-col gap-4
            rounded-2xl border border-icons p-2"
          >
            <div className="flex justify-between">
              <h5 className="font-bold">{question.text}</h5>
              <h6>
                {question.answers.filter(answer => answer.isCorrect).length ===
                1
                  ? 'One answer'
                  : 'Few answers'}
              </h6>
            </div>

            <div className="flex flex-col gap-2">
              {question.answers.map(
                (answer, index) =>
                  question.answers.length - 1 !== index && (
                    <AnswerForm
                      key={answer.id}
                      answer={answer}
                      type={type}
                      question={question}
                      isLast={question.answers.length - 1 === index}
                    />
                  ),
              )}
            </div>
          </form>
        </div>
      );

    default:
      return <></>;
  }
};
