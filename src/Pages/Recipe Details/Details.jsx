import { useLoaderData, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react"; // Optional: Install lucide-react or use any icon lib

const Details = () => {
  const recipeDetails = useLoaderData();
  const navigate = useNavigate();

  if (!recipeDetails) return <p>Loading recipe details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-200 to-red-300 py-12 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl border border-red-200">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-full transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </button>

        {/* Like Count */}
        <p className="text-gray-700 text-md font-medium mb-3 italic">
          {recipeDetails.likeCount || 0}{" "}
          {recipeDetails.likeCount === 1 ? "person is" : "people are"} interested in this recipe
        </p>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-red-600 mb-4 tracking-tight drop-shadow">
          {recipeDetails.title}
        </h1>

        {/* Image */}
        <img
          src={recipeDetails.image || "https://via.placeholder.com/600x300?text=No+Image"}
          alt={recipeDetails.title}
          className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg mb-6 border border-red-300"
        />

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base font-semibold text-gray-800 mb-8">
          <div className="bg-white/80 p-4 rounded-lg shadow-inner">
            <span className="block text-red-500 mb-1">Cuisine</span>
            {recipeDetails.cuisine || "N/A"}
          </div>
          <div className="bg-white/80 p-4 rounded-lg shadow-inner">
            <span className="block text-red-500 mb-1">Prep Time</span>
            {recipeDetails.prepTime || 0} mins
          </div>
          <div className="bg-white/80 p-4 rounded-lg shadow-inner">
            <span className="block text-red-500 mb-1">Categories</span>
            {recipeDetails.categories?.length ? recipeDetails.categories.join(", ") : "None"}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-red-600 mb-3 border-b-2 border-red-400 inline-block">
            🥗 Ingredients
          </h3>
          <p className="whitespace-pre-line text-gray-900 leading-relaxed mt-2">
            {recipeDetails.ingredients}
          </p>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-2xl font-bold text-red-600 mb-3 border-b-2 border-red-400 inline-block">
            🍳 Instructions
          </h3>
          <p className="whitespace-pre-line text-gray-900 leading-relaxed mt-2">
            {recipeDetails.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
