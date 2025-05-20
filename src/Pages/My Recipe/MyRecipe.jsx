import React from "react";
import { Helmet } from "react-helmet";

const MyRecipe = ({ recipes }) => {
  // Fallback check for undefined or empty array
  if (!recipes || !recipes.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No recipes added yet.
      </p>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Recipe || RecipeBook</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <img
              src={recipe.image}
              alt={`Image of ${recipe.title}`}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{recipe.title}</h3>
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime} mins
            </p>
            <p>
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p>
              <strong>Categories:</strong>{" "}
              {recipe.categories && recipe.categories.join(", ")}
            </p>
            <p className="mt-2 text-gray-700 text-sm">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="text-gray-700 text-sm mt-1">
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipe;

