import styled from 'styled-components';

import { RouterProvider } from 'react-router-dom';
import { MainNavigation } from './components/MainNavgiation.tsx';
import { router } from './router.tsx';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: var(--size-main-wrapper);
  padding: 0 calc(var(--size-base) * 4);
`;

function App() {
  return (
    <main>
      <Wrapper>
        <MainNavigation />
        <RouterProvider router={router} />
      </Wrapper>
    </main>
  );
}

export default App;
