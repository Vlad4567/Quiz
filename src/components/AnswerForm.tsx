/* eslint-disable no-param-reassign */
import { twJoin, twMerge } from 'tailwind-merge';
import { Answer, Question } from '../types/quiz';
import { useAppDispatch } from '../app/hooks';
import * as quizSlice from '../features/quizSlice';
import basketImg from '../images/icon-basket.svg';
import { useRef } from 'react';

interface Props {
  type: 'edit' | 'view';
  answer: Answer;
  question: Question;
  isLast: boolean;
}

export const AnswerForm: React.FC<Props> = ({
  type,
  answer,
  question,
  isLast,
}) => {
  const dispatch = useAppDispatch();
  const isOneAnswer = useRef(
    question.answers.filter(item => item.isCorrect).length === 1,
  );

  const handleIsCorrectChange = () => {
    if (answer.errors.isCorrect) {
      question.answers.forEach(item => {
        dispatch(
          quizSlice.updateAnswerError({
            questionId: question.id,
            answerId: item.id,
            answer: {
              isCorrect: '',
            },
          }),
        );
      });
    }

    dispatch(
      quizSlice.updateAnswer({
        questionId: question.id,
        answerId: answer.id,
        answer: {
          isCorrect: !answer.isCorrect,
        },
      }),
    );
    dispatch(
      quizSlice.updateQuestion({
        id: question.id,
        question: {
          answersCount:
            question.answers.filter(item => item.isCorrect).length + 1,
        },
      }),
    );
  };

  const handleIsChoosedChange = () => {
    if (isOneAnswer.current) {
      if (answer.isChoosed) {
        dispatch(
          quizSlice.updateAnswer({
            questionId: question.id,
            answerId: answer.id,
            answer: {
              isChoosed: !answer.isChoosed,
            },
          }),
        );
      } else {
        question.answers.forEach(item => {
          dispatch(
            quizSlice.updateAnswer({
              questionId: question.id,
              answerId: item.id,
              answer: {
                isChoosed: false,
              },
            }),
          );
        });
        dispatch(
          quizSlice.updateAnswer({
            questionId: question.id,
            answerId: answer.id,
            answer: {
              isChoosed: !answer.isChoosed,
            },
          }),
        );
      }
    } else {
      dispatch(
        quizSlice.updateAnswer({
          questionId: question.id,
          answerId: answer.id,
          answer: {
            isChoosed: !answer.isChoosed,
          },
        }),
      );
    }
  };

  const handleAnswerTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (answer.errors.text) {
      dispatch(
        quizSlice.updateAnswerError({
          questionId: question.id,
          answerId: answer.id,
          answer: {
            text: '',
          },
        }),
      );
    }

    dispatch(
      quizSlice.updateAnswer({
        questionId: question.id,
        answerId: answer.id,
        answer: {
          text: e.target.value,
        },
      }),
    );

    if (isLast) {
      dispatch(
        quizSlice.addAnswer({
          questionId: question.id,
        }),
      );
    }
  };

  const handleAnswerDelete = () => {
    dispatch(
      quizSlice.removeAnswer({ questionId: question.id, answerId: answer.id }),
    );
  };

  switch (type) {
    case 'edit':
      return (
        <div className="flex flex-col gap-2">
          <div className="flex h-[2.75rem]">
            <button
              type="button"
              className={twMerge(
                `h-full w-6 overflow-hidden rounded-l-2xl
                border-0.5 border-r-0 border-icons hover:border-primary`,
                answer.isCorrect && 'border-primary',
                isLast && 'pointer-events-none',
              )}
              onClick={handleIsCorrectChange}
            >
              <div
                className={twJoin(
                  'h-full w-full',
                  answer.isCorrect && 'bg-primary',
                )}
              ></div>
            </button>

            <textarea
              className="h-full w-full resize-none overflow-hidden
              rounded-2xl
              rounded-l-none border-0.5 border-icons p-2.5
              [background:_none] focus:border-primary focus:text-primary
              disabled:border-none disabled:bg-icons"
              value={answer.text}
              onChange={handleAnswerTextChange}
              placeholder="Answer"
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = '1px';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            {!isLast && (
              <button
                className="ml-2 flex aspect-square h-full
                flex-col items-center justify-center rounded-2xl
                border-0.5 border-icons hover:border-primary hover:bg-elements"
                type="button"
                onClick={handleAnswerDelete}
              >
                <img src={basketImg} alt="Remove answer" />
              </button>
            )}
          </div>
          <small className="flex gap-1 text-red">
            <span
              className={twMerge(
                `flex h-4 w-4 items-center justify-center
                rounded-full bg-red text-center text-white opacity-0`,
                (answer.errors.text || answer.errors.isCorrect) &&
                  'opacity-100',
              )}
            >
              !
            </span>
            {answer.errors.isCorrect || answer.errors.text}
          </small>
        </div>
      );

    case 'view':
      return (
        <div className="flex h-[2.75rem]">
          <button
            type="button"
            className={twMerge(
              `h-full min-w-6 overflow-hidden rounded-l-2xl
                border-0.5 border-r-0 border-icons hover:border-primary`,
              answer.isChoosed && 'border-primary',
              answer.answer === 'incorrect' && 'border-red',
              answer.answer === 'correct' && 'border-green',
              answer.answer !== '' && 'pointer-events-none',
            )}
            onClick={handleIsChoosedChange}
          >
            <div
              className={twMerge(
                'h-full w-full',
                answer.isChoosed && 'bg-primary',
                answer.answer === 'incorrect' && 'bg-red',
                answer.answer === 'correct' && 'bg-green',
              )}
            ></div>
          </button>

          <h5
            className="h-full w-full resize-none overflow-hidden
              rounded-2xl
              rounded-l-none border-0.5 border-icons p-2.5
              [background:_none] focus:border-primary focus:text-primary
              disabled:border-none disabled:bg-icons"
          >
            {answer.text}
          </h5>
          {answer.isCorrect && answer.answer !== '' && (
            <p className="pl-5 text-center font-bold text-green">
              - Is correct answer
            </p>
          )}
        </div>
      );

    default:
      return <></>;
  }
};
