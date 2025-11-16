import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  
  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);
  
  return (
    <div style={{ marginBottom: '30px' }}>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet. Start adding some!</p>
      ) : (
        <div>
          {favoriteRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                margin: '10px 0',
                borderRadius: '5px',
                backgroundColor: '#ffe6e6'
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
                  onClick={() => removeFavorite(recipe.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  }}
                  title="Remove from favorites"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList