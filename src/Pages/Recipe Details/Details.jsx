
import { useLoaderData, useNavigate } from "react-router";

const Details = () => {
  const recipeDetails = useLoaderData();
  const navigate = useNavigate();

 

  if (!recipeDetails) return <p>Loading recipe details...</p>;

  return (
   <div className="bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 max-h-full p-10">
     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        ← Back
      </button>
        <h2 className="text-lg font-semibold mb-6 text-gray-700">
        {recipeDetails.likeCount || 0}{" "}
        {recipeDetails.likeCount === 1 ? "person is" : "people are"} interested in this recipe
      </h2>
      <h1 className="text-4xl font-extrabold mb-6 text-red-600">{recipeDetails.title}</h1>

      <img
        src={recipeDetails.image || "https://via.placeholder.com/600x300?text=No+Image"}
        alt={recipeDetails.title}
        className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 font-medium mb-6">
        <p>
          <span className="font-semibold text-red-500">Cuisine:</span> {recipeDetails.cuisine || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-red-500">Prep Time:</span> {recipeDetails.prepTime || 0} mins
        </p>
        <p>
          <span className="font-semibold text-red-500">Categories:</span>{" "}
          {recipeDetails.categories?.length ? recipeDetails.categories.join(", ") : "None"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2 border-b border-red-400 pb-1 text-red-600">
          Ingredients
        </h3>
        <p className="whitespace-pre-line text-gray-800">{recipeDetails.ingredients}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-2 border-b border-red-400 pb-1 text-red-600">
          Instructions
        </h3>
        <p className="whitespace-pre-line text-gray-800">{recipeDetails.instructions}</p>
      </div>
    </div>
   </div>
  );
};

export default Details;
