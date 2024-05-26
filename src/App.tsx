import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { useDocumentTitle } from 'usehooks-ts';
import { websiteName } from './helpers/variables';
import { convertHyphenToSpace } from './helpers/functions';

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const lastPathName = pathname.split('/').pop();

  useDocumentTitle(convertHyphenToSpace(lastPathName || '') || websiteName);

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};
