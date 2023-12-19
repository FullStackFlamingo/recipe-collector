import { Outlet } from 'react-router-dom';
import { HeaderNavgiation } from './components/HeaderNavgiation.tsx';

function App() {
  return (
    <main>
      <HeaderNavgiation />
      <Outlet />
    </main>
  );
}

export default App;
