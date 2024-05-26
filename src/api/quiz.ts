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
