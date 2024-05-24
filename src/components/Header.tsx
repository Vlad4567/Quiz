import { Link, NavLink } from 'react-router-dom';
import { websiteName } from '../helpers/variables';
import { twJoin } from 'tailwind-merge';

export const Header: React.FC = () => {
  return (
    <header className="flex h-22 items-center justify-center">
      <ul className="content-padding flex w-full items-center justify-between">
        <li>
          <Link to="/">
            <h2 className="font-bold">{websiteName}</h2>
          </Link>
        </li>
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
