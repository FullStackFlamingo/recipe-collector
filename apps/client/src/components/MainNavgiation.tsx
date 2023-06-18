import { useState } from 'react';
import styled from 'styled-components';
import JSONLD from '../recipe-jsonld-example.json';
import { Recipe, RecipeJSONLD, db } from '../db';

const MainNavigationRoot = styled.nav`
  position: relative;
  z-index: var(--zindex-nav);
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 calc(var(--size-base-unit) * 4);
`;

const MobileButton = styled.button<{ $menuOpen: boolean }>`
  justify-self: flex-end;
  color: ${(props) => (props.$menuOpen ? 'red' : 'inherit')};
  &:hover {
    color: var(--color-accent-1);
  }
`;

export function MainNavigation() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openUrlPrompt = async () => {
    const url = window.prompt('Enter recipe url');
    // 'fetch' RecipeJSONLD
    const json = JSON.parse(JSON.stringify(JSONLD)) as RecipeJSONLD;
    const id = await db.addRecipeFromJSON(json);
  };

  return (
    <MainNavigationRoot>
      <div className={menuOpen ? 'active' : ''}>
        <MobileButton $menuOpen={menuOpen} aria-label="Toggle Navigation" onClick={() => setMenuOpen(!menuOpen)}>
          Menu {menuOpen ? 'open' : 'closed'}
        </MobileButton>
        <button onClick={openUrlPrompt}>Prompt url</button>
      </div>
    </MainNavigationRoot>
  );
}
