import React, { use, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const ITEMS_PER_PAGE = 8;

const AllRecipe = () => {
  const { user } = use(AuthContext);
  const loadedRecipes = useLoaderData();

  // Important: manage a state for actual recipes to update likes
  const [recipes, setRecipes] = useState(loadedRecipes);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const cuisines = [
    "All",
    ...Array.from(new Set(loadedRecipes.map((r) => r.cuisine).filter(Boolean))),
  ];

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredByCuisine =
    selectedCuisine === "All"
      ? recipes
      : recipes.filter((r) => r.cuisine === selectedCuisine);

  const filteredBySearch = filteredByCuisine.filter((r) =>
    r.title.toLowerCase().includes(searchQuery)
  );

  const sortedRecipes = [...filteredBySearch].sort(
    (a, b) => (b.likeCount || 0) - (a.likeCount || 0)
  );

  const totalPages = Math.ceil(sortedRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = sortedRecipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleLike = async (id) => {
    try {
      // PATCH request to backend
      const res = await fetch(`https://recipe-book-server-green.vercel.app/recipes/${id}/like`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to like");

      // Update recipe state
      const updated = recipes.map((recipe) =>
        recipe._id === id
          ? { ...recipe, likeCount: (recipe.likeCount || 0) + 1 }
          : recipe
      );
      setRecipes(updated);
    } catch (error) {
      console.error("Failed to update like count", error);
    }
  };

  return (
    <div className="px-4 md:px-10 my-10">
      <Helmet>
        <title>All Recipes || RecipeBook</title>
      </Helmet>

      <h2 className="text-4xl font-extrabold text-center text-red-500 mb-8">All Recipes</h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-red-400 rounded px-3 py-1 focus:outline-none w-full sm:w-120"
        />
        <div className="flex items-center gap-2">
          <label className="text-red-500 font-semibold">Filter by Cuisine:</label>
          <select
            value={selectedCuisine}
            onChange={handleCuisineChange}
            className="border border-red-400 rounded px-3 py-1 focus:outline-none"
          >
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedRecipes.map((recipe) => {
          const isOwner = recipe.user.email === user?.email;
          return (
            <div
              key={recipe._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <img
                src={recipe.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-bold text-red-600">{recipe.title}</h3>
                <p className="text-sm text-gray-700"><strong>Cuisine:</strong> {recipe.cuisine || "N/A"}</p>
                <p className="text-sm text-gray-700"><strong>Prep Time:</strong> {recipe.prepTime || 0} mins</p>
                <p className="text-sm text-gray-700">
                  <strong>Categories:</strong> {recipe.categories?.join(", ") || "None"}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => !isOwner && handleLike(recipe._id)}
                    disabled={isOwner}
                    title={isOwner ? "You can't like your own recipe" : "Interested?"}
                    className={`text-xl ${
                      isOwner ? "opacity-50 cursor-not-allowed" : "hover:scale-110 transition"
                    }`}
                  >
                    🤍
                  </button>
                  <span className="text-sm text-gray-600">
                    {recipe.likeCount || 0}{" "}
                    {recipe.likeCount === 1 ? "person" : "people"} interested
                  </span>
                </div>

                <Link
                  to={`/recipes/${recipe._id}`}
                  className="block text-center text-white bg-red-500 hover:bg-red-600 transition mt-4 py-1 rounded"
                >
                  See Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? "bg-red-500 text-white font-bold"
                : "bg-white text-gray-700 hover:bg-red-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllRecipe;
