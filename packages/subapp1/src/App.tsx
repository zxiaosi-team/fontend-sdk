import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];

function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter(routes, { basename: '/subapp1' })}
        future={{ v7_startTransition: false }}
      />
    </>
  );
}

export default App;
