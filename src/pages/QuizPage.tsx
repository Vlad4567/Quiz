import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { QuestionForm } from '../components/QuestionForm';
import { QuizInfo } from '../components/QuizInfo';
import * as quizSlice from '../features/quizSlice';
import { useEffect, useState } from 'react';
import { useDocumentTitle } from 'usehooks-ts';
import { websiteName } from '../helpers/variables';

interface Props {
  type: 'create' | 'view';
}

export const QuizPage: React.FC<Props> = ({ type }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.quizSlice);
  const navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);

  const handleNewQuestion = () => {
    dispatch(quizSlice.addQuestion({}));
  };

  const renderHeaderQuizTitle = () => {
    switch (type) {
      default:
        return 'New quiz';
    }
  };

  const handleCreateQuiz = () => {
    let hasErrors = false;

    if (!data.title.trim()) {
      dispatch(quizSlice.updateQuizError({ title: 'Title is required' }));
      hasErrors = true;
    }

    data.questions.forEach(question => {
      if (!question.text.trim()) {
        dispatch(
          quizSlice.updateQuestionError({
            id: question.id,
            question: {
              text: 'Question is required',
            },
          }),
        );
        hasErrors = true;
      }

      dispatch(
        quizSlice.updateQuestion({
          id: question.id,
          question: {
            answers: [
              ...question.answers
                .slice(0, -1)
                .filter(answer => answer.text.trim()),
              question.answers[question.answers.length - 1],
            ],
          },
        }),
      );

      const answers = question.answers.slice(0, -1);

      if (answers.length === 1) {
        hasErrors = true;
        answers.forEach(answer => {
          dispatch(
            quizSlice.updateAnswerError({
              questionId: question.id,
              answerId: answer.id,
              answer: {
                text: 'Answers must be at least 2',
              },
            }),
          );
        });
      }

      if (!answers.some(answer => answer.isCorrect)) {
        hasErrors = true;

        if (answers.length) {
          answers.forEach(answer => {
            dispatch(
              quizSlice.updateAnswerError({
                questionId: question.id,
                answerId: answer.id,
                answer: {
                  isCorrect: 'Answer is required',
                },
              }),
            );
          });
        } else {
          dispatch(
            quizSlice.updateAnswerError({
              questionId: question.id,
              answerId: question.answers[0].id,
              answer: {
                isCorrect: 'Answer is required',
              },
            }),
          );
        }
      }
    });

    if (!hasErrors) {
      dispatch(quizSlice.createQuiz(data))
        .unwrap()
        .then(() => {
          navigate('/');
        });
    }
  };

  const handleSubmitQuiz = () => {
    if (isSubmited) {
      navigate('/');
    } else {
      setIsSubmited(true);
      let correctAnswers = 0;

      data.questions.forEach(question => {
        let correct = true;

        question.answers.forEach(answer => {
          dispatch(
            quizSlice.updateAnswer({
              questionId: question.id,
              answerId: answer.id,
              answer: {
                answer: 'submited',
              },
            }),
          );

          if (answer.isCorrect && answer.isCorrect === answer.isChoosed) {
            dispatch(
              quizSlice.updateAnswer({
                questionId: question.id,
                answerId: answer.id,
                answer: {
                  answer: 'correct',
                },
              }),
            );
          }

          if (
            (answer.isCorrect || answer.isChoosed) &&
            answer.isCorrect !== answer.isChoosed
          ) {
            correct = false;

            dispatch(
              quizSlice.updateAnswer({
                questionId: question.id,
                answerId: answer.id,
                answer: {
                  answer: 'incorrect',
                },
              }),
            );
          }
        });

        if (correct) {
          correctAnswers += 1;
        }
      });

      dispatch(
        quizSlice.updateCorrectAnswersByQuizId({
          id: +(id ?? 0),
          correctAnswers,
        }),
      );
    }
  };

  useDocumentTitle(data.title || websiteName);

  useEffect(() => {
    if (type === 'view') {
      dispatch(quizSlice.loadQuizById(+(id ?? 0)));
    }

    return () => {
      dispatch(quizSlice.resetData());
    };
  }, [dispatch, id, type]);

  switch (type) {
    case 'create':
      return (
        <main
          className="flex flex-col items-center gap-5 py-10
          [&>*]:h-fit [&>*]:w-full [&>*]:max-w-[30rem]"
        >
          <h1>{renderHeaderQuizTitle()}</h1>
          <QuizInfo type="edit" />
          {data.questions.map((question, index) => (
            <QuestionForm
              key={question.id}
              type="edit"
              question={question}
              questionIndex={index}
            />
          ))}
          <button
            className="flex items-center justify-center
            rounded-2xl border-0.5 border-icons bg-elements py-4
            text-center text-6xl font-bold leading-none
            transition hover:bg-icons"
            onClick={handleNewQuestion}
          >
            +
          </button>

          {!!data.questions.length && (
            <button
              type="button"
              className="rounded-md border-0.5 border-green bg-green
              bg-none px-4 py-2
              font-bold text-white transition hover:text-green
              hover:[background:_none]"
              onClick={handleCreateQuiz}
            >
              Create quiz
            </button>
          )}
        </main>
      );

    case 'view':
      return (
        <main
          className="flex flex-col items-center gap-5 py-10
          [&>*]:h-fit [&>*]:w-full [&>*]:max-w-[30rem]"
        >
          <QuizInfo type={type} />

          {data.questions.map((question, index) => (
            <QuestionForm
              key={question.id}
              type={type}
              question={question}
              questionIndex={index}
            />
          ))}

          <button
            type="button"
            className="rounded-md border-0.5 border-green bg-green
              bg-none px-4 py-2
              font-bold text-white transition hover:text-green
              hover:[background:_none]"
            onClick={handleSubmitQuiz}
          >
            {isSubmited ? 'Back to quizes' : 'Check answers'}
          </button>
        </main>
      );

    default:
      return <></>;
  }
};
