import React, { useState, useEffect } from "react";
import data from "../data.json";
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    setRecipes(data);
  }, []);
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing Platform</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
              <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;