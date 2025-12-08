import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const Detail = lazy(() => import('@/pages/Detail'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
];

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider
        router={createBrowserRouter(routes, { basename: '/subapp1' })}
        future={{ v7_startTransition: false }}
      />
    </Suspense>
  );
}

export default App;
