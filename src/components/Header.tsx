import { Link, NavLink, useLocation } from 'react-router-dom';
import { websiteName } from '../helpers/variables';
import { twJoin } from 'tailwind-merge';
import { InputWithError } from './InputWithError';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import * as quizSlice from '../features/quizSlice';

export const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [quizesSearch, setQuizesSearch] = useState('');
  const isHomePage = !location.pathname.split('/').filter(item => item).length;

  useEffect(() => {
    dispatch(quizSlice.searchQuizes({ text: quizesSearch }));
  }, [dispatch, quizesSearch]);

  useEffect(() => {
    if (!isHomePage) {
      setQuizesSearch('');
    }
  }, [isHomePage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizesSearch(e.target.value);
  };

  return (
    <header className="flex h-22 items-center justify-center">
      <ul className="content-padding flex w-full items-center justify-between">
        <li>
          <Link to="/">
            <h2 className="font-bold">{websiteName}</h2>
          </Link>
        </li>
        {isHomePage && (
          <li>
            <InputWithError
              value={quizesSearch}
              onChange={handleSearchChange}
              inputClassName="placeholder:text-center"
              placeholder="Enter quiz title"
              showTitle={false}
              showError={false}
            />
          </li>
        )}
        <li>
          <NavLink
            to="/new-quiz"
            className={({ isActive }) =>
              twJoin(
                `rounded-md bg-primary px-4 py-2
                text-white transition hover:bg-secondary`,
                isActive && 'hidden',
              )
            }
          >
            Create your quiz
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
