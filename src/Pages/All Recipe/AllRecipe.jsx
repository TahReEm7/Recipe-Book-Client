import React, { use, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const AllRecipe = () => {
  const { user } = use(AuthContext);
  const loadedRecipes = useLoaderData();
  console.log(user?.email);

  // Sort recipes by likeCount (highest first)
  const sortedRecipes = [...loadedRecipes].sort(
    (a, b) => (b.likeCount || 0) - (a.likeCount || 0)
  );

  // We no longer need a global isOwner here

  const [recipes, setRecipes] = useState(sortedRecipes);

  const handleLike = async (id) => {
    // Optimistically update UI
    const updatedRecipes = recipes.map((recipe) =>
      recipe._id === id
        ? { ...recipe, likeCount: (recipe.likeCount || 0) + 1 }
        : recipe
    );

    const reSorted = [...updatedRecipes].sort(
      (a, b) => (b.likeCount || 0) - (a.likeCount || 0)
    );

    setRecipes(reSorted);

    // Send PATCH request
    try {
      await fetch(`http://localhost:3000/recipes/${id}/like`, {
        method: "PATCH",
      });
    } catch (error) {
      console.error("Failed to update like count", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>All Recipes || RecipeBook</title>
      </Helmet>

      <div className="px-4 md:px-10 my-10">
        <h2 className="text-3xl font-bold text-red-400 text-center my-6">
          All Recipes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => {
            const isOwnerOfThis = recipe.user.email === user?.email;

            return (
              <div
                key={recipe._id}
                className="border rounded-lg p-4 shadow bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 hover:shadow-lg transition"
              >
                <img
                  src={
                    recipe.image ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-black">
                  {recipe.title}
                </h3>
                <p className="text-sm text-white">
                  <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
                </p>
                <p className="text-sm text-white">
                  <strong>Prep Time:</strong> {recipe.prepTime || 0} mins
                </p>
                <p className="text-sm text-white">
                  <strong>Categories:</strong>{" "}
                  {recipe.categories?.join(", ") || "None"}
                </p>

                {/* Like Button */}
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => !isOwnerOfThis && handleLike(recipe._id)}
                    disabled={isOwnerOfThis}
                    className={`text-white text-xl transition hover:scale-110 ${
                      isOwnerOfThis
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                    title={
                      isOwnerOfThis
                        ? "You can't like your own recipe"
                        : "Interested?"
                    }
                  >
                    🤍
                  </button>
                  <span className="text-sm text-white">
                    {recipe.likeCount || 0}{" "}
                    {recipe.likeCount === 1 ? "person" : "people"} interested
                  </span>
                </div>

                <Link
                  to={`/recipes/${recipe._id}`}
                  className="block text-center bg-white text-red-500 font-medium rounded mt-4 py-1 hover:bg-red-100 transition"
                >
                  See Details
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllRecipe;
