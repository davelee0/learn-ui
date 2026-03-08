import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ComponentPage } from './pages/ComponentPage';
import { ProgressPage } from './pages/ProgressPage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalog', element: <CatalogPage /> },
      { path: '/component/:slug', element: <ComponentPage /> },
      { path: '/progress', element: <ProgressPage /> },
    ],
  },
]);
