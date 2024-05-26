import { Quiz } from '../types/quiz';

const delay = () => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 1000);
  });
};

export const createQuiz = (quiz: Quiz) =>
  new Promise(resolve => {
    delay();
    const quizes =
      JSON.parse(localStorage.getItem('quizes') || JSON.stringify([])) || [];
    const newQuiz = { ...quiz, id: +Date.now() };

    localStorage.setItem('quizes', JSON.stringify([...quizes, newQuiz]));

    resolve(quiz);
  });

export const getQuizes = async () => {
  await delay();
  const quizes: Quiz[] =
    JSON.parse(localStorage.getItem('quizes') || JSON.stringify([])) || [];

  return quizes;
};

export const getQuizById = async (id: number) => {
  await delay();

  return (
    (JSON.parse(
      localStorage.getItem('quizes') || JSON.stringify([]),
    ) as Quiz[]) || []
  ).find(quiz => quiz.id === id) as Quiz;
};

export const removeQuizById = async (id: number) => {
  await delay();
  const quizes: Quiz[] =
    JSON.parse(localStorage.getItem('quizes') || JSON.stringify([])) || [];

  localStorage.setItem(
    'quizes',
    JSON.stringify(quizes.filter(quiz => quiz.id !== id)),
  );

  return true;
};

export const updateCorrectAnswersByQuizId = async (
  id: number,
  correctAnswers: number,
) => {
  await delay();

  const quizes: Quiz[] =
    JSON.parse(localStorage.getItem('quizes') || JSON.stringify([])) || [];
  const updatedQuizes = quizes.map(quiz => {
    if (quiz.id === id) {
      return { ...quiz, correctAnswers };
    } else {
      return quiz;
    }
  });

  localStorage.setItem('quizes', JSON.stringify(updatedQuizes));

  return correctAnswers;
};
