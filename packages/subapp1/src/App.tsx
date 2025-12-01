import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import './App.css';

const routes: RouteObject[] = [{ path: '/', element: <h2>subapp1</h2> }];

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
