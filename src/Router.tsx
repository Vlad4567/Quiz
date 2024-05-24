import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  );
};
