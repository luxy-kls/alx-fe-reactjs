// src/components/RecipeList.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Filter recipes whenever search term or recipes change
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes, filterRecipes]);

  // Display filtered recipes if there's a search term, otherwise show all recipes
  const displayedRecipes = searchTerm ? filteredRecipes : recipes;

  const handleFavoriteToggle = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div>
      <h2>Recipe List</h2>
      {displayedRecipes.length === 0 ? (
        <p>No recipes available. Add your first recipe!</p>
      ) : (
        displayedRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              margin: '10px 0',
              borderRadius: '5px',
              backgroundColor: '#fff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3>
                  <Link 
                    to={`/recipe/${recipe.id}`}
                    style={{ color: '#007bff', textDecoration: 'none' }}
                  >
                    {recipe.title}
                  </Link>
                </h3>
                <p>{recipe.description}</p>
              </div>
              <button
                onClick={() => handleFavoriteToggle(recipe.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
                title={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favorites.includes(recipe.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;