import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    prepTime: "",
    ingredients: "",
    steps: ""
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Recipe not found");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched recipe:", data);
        setRecipe(data);
      })
      .catch((err) => {
        console.error("Failed to load recipe", err);
        Swal.fire("Error", "Recipe not found", "error");
        navigate("/my-recipes");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("PATCHING ID:", id);

    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (res.ok) {
        Swal.fire("Success", "Recipe updated successfully", "success");
        navigate(`/recipes/${id}`);
      } else {
        Swal.fire("Failed", "Failed to update recipe", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-medium mb-1" htmlFor="title">Recipe Title</label>
          <input
            id="title"
            className="w-full p-2 border rounded"
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="image">Image URL</label>
          <input
            id="image"
            className="w-full p-2 border rounded"
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="prepTime">Preparation Time (minutes)</label>
          <input
            id="prepTime"
            className="w-full p-2 border rounded"
            type="number"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            className="w-full p-2 border rounded"
            name="ingredients"
            rows="3"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="steps">Steps</label>
          <textarea
            id="steps"
            className="w-full p-2 border rounded"
            name="steps"
            rows="4"
            value={recipe.steps}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
