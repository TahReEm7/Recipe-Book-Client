import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        setRecipes(sorted.slice(0, 6));
      })
      .catch((err) => console.error("Failed to fetch recipes:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-red-500 mb-6 text-center">Top Recipes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <img
              src={recipe.image || "https://via.placeholder.com/400x200?text=No+Image"}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-red-400 mb-2">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Prep Time:</strong> {recipe.prepTime || 0} mins
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Likes:</strong> {recipe.likeCount || 0}
              </p>
              <Link
                to={`/recipes/${recipe._id}`}
                className="inline-block bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/all-recipes")}
          className="px-6 py-2 bg-red-400 text-white rounded hover:bg-red-600 transition"
        >
          Show All Recipes
        </button>
      </div>
    </div>
  );
};

export default TopRecipes;
