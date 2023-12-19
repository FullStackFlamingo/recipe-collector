import { RouterProvider } from 'react-router-dom';
import { HeaderNavgiation } from './components/HeaderNavgiation.tsx';
import { router } from './router.tsx';

function App() {
  return (
    <main>
      <HeaderNavgiation />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
