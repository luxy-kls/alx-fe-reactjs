import { useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import useRecipeStore from './recipeStore';

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  // Optional: Initialize with sample recipes on mount
  useEffect(() => {
    const initialRecipes = [
      {
        id: 1,
        title: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, and pancetta.'
      },
      {
        id: 2,
        title: 'Chocolate Chip Cookies',
        description: 'Delicious homemade cookies with chocolate chips.'
      }
    ];
    
    // Uncomment to load initial recipes
    // setRecipes(initialRecipes);
  }, [setRecipes]);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        Recipe Sharing App
      </h1>
      
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

