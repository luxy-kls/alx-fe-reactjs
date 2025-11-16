import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  searchTerm: '',
  filteredRecipes: [],
  recommendations: [],
  
  // Basic recipe actions
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, newRecipe] 
    })),
  
  setRecipes: (recipes) => 
    set({ recipes }),
  
  // Update recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  
  // Delete recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id)
    })),
  
  // Favorites actions
  addFavorite: (recipeId) => 
    set((state) => ({ 
      favorites: [...state.favorites, recipeId] 
    })),
  
  removeFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId)
    })),
  
  // Search and filter actions
  setSearchTerm: (term) => 
    set({ searchTerm: term }),
  
  filterRecipes: () => 
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    })),
  
  // Generate recommendations based on favorites
  generateRecommendations: () => 
    set((state) => {
      // Mock implementation: recommend recipes similar to favorites
      const recommended = state.recipes.filter((recipe) =>
        !state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended.slice(0, 3) };
    }),
}));

export default useRecipeStore