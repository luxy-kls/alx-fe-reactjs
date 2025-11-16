// src/components/AddRecipeForm.jsx
import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate inputs
    if (title.trim() && description.trim()) {
      addRecipe({
        id: Date.now(),
        title: title.trim(),
        description: description.trim()
      });
      
      // Clear form fields
      setTitle('');
      setDescription('');
    }
  };
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add New Recipe</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
        <button 
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipeForm;