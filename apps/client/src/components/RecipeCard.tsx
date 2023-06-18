import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Recipe } from '../db';
import slugify from 'slugify';

const getRecipeURL = (recipe: Recipe): string => {
  return `/recipes/${recipe.id}/${slugify(recipe.name)}`;
};

const LinkStyled = styled(Link)`
  display: block;
  padding: calc(4 * var(--size-base));
  background-color: white;
`;

interface props {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: props) {
  return <LinkStyled to={getRecipeURL(recipe)}>{recipe.name}</LinkStyled>;
}
