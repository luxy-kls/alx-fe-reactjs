import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  
  useEffect(() => {
    if (favorites.length > 0) {
      generateRecommendations();
    }
  }, [favorites, generateRecommendations]);
  
  if (recommendations.length === 0) {
    return (
      <div style={{ marginBottom: '30px' }}>
        <h2>Recommended for You</h2>
        <p>Add some favorites to get personalized recommendations!</p>
      </div>
    );
  }
  
  return (
    <div style={{ marginBottom: '30px' }}>
      <h2>Recommended for You</h2>
      <div>
        {recommendations.map((recipe) => (
          <div 
            key={recipe.id}
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              margin: '10px 0',
              borderRadius: '5px',
              backgroundColor: '#e6f3ff'
            }}
          >
            <h3>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                {recipe.title}
              </Link>
            </h3>
            <p>{recipe.description}</p>
            <span style={{ 
              fontSize: '12px', 
              color: '#666',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '3px'
            }}>
              Recommended
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList