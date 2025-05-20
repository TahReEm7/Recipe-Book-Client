import React from 'react';
import { useLoaderData, useParams } from 'react-router';

const Details = () => {
  const recipeDetails = useLoaderData();
  const { id } = useParams();

  console.log("Recipe ID:", id);
  console.log("Recipe Data:", recipeDetails);

  if (!recipeDetails) return <p>Loading recipe details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipeDetails.title}</h1>
      <img
        src={recipeDetails.image}
        alt={recipeDetails.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p><strong>Cuisine:</strong> {recipeDetails.cuisine}</p>
      <p><strong>Prep Time:</strong> {recipeDetails.prepTime} mins</p>
      <p><strong>Categories:</strong> {recipeDetails.categories?.join(", ")}</p>
      <h3 className="mt-4 font-semibold">Ingredients:</h3>
      <p>{recipeDetails.ingredients}</p>
      <h3 className="mt-4 font-semibold">Instructions:</h3>
      <p>{recipeDetails.instructions}</p>
    </div>
  );
};

export default Details;
