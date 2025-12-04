import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeFound = data.find((item) => item.id === parseInt(id));
    setRecipe(recipeFound);
  }, [id]);

  if (!recipe) {
    return <p className="text-center p-6">Loading recipe...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl shadow-lg"
      />

      <h1 className="text-4xl font-bold mt-6 mb-4 text-center">
        {recipe.title}
      </h1>

      <p className="text-gray-700 text-center mb-8">{recipe.summary}</p>

      {/* Ingredients */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;