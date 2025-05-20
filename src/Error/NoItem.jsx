import React from 'react';
import { Link } from 'react-router'; 

const NoItem = () => {
  return (
    <div className="flex items-center justify-center h-full py-20">
      <div className="w-10/12 mx-auto  bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 shadow-lg rounded-xl p-10 text-center border border-gray-200">
        <h2 className="text-4xl font-bold text-white mb-4">No Recipes Found 🍽️</h2>
        <p className="text-black mb-6">
          You haven’t added any recipes yet. Want to share your culinary creativity?
        </p>
        <Link
          to="/add-recipe"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
        >
          Add Your First Recipe
        </Link>
      </div>
    </div>
  );
};

export default NoItem;
