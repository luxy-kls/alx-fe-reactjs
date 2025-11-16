// src/components/SearchBar.jsx
import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #007bff',
          borderRadius: '4px',
          outline: 'none'
        }}
      />
    </div>
  );
};

export default SearchBar;