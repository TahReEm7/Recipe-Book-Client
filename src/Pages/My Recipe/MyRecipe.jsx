import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import NoItem from "../../Error/NoItem";

const MyRecipe = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // Track deletion in progress

  const fetchMyRecipes = () => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => {
        const owned = data.filter(
          (recipe) => recipe?.user?.email === currentUserEmail
        );
        setMyRecipes(owned);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyRecipes();
  }, [currentUserEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingId(id); // Show spinner on this button

        try {
          const res = await fetch(`http://localhost:3000/recipes/${id}`, {
            method: "DELETE",
          });

          const result = await res.json();
          console.log(result);
          if (result.success === true) {
            setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
            Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
          } else {
            Swal.fire("Failed!", "Could not delete the recipe.", "error");
          }
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "An error occurred during deletion.", "error");
        } finally {
          setDeletingId(null); // Reset state
        }
      }
    });
  };

  if (loading)
    return <p className="text-center mt-8">Loading your recipes...</p>;

  if (myRecipes.length === 0) {
    return <NoItem />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        My Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-lg shadow-md border overflow-hidden"
          >
            <img
              src={
                recipe.image ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-red-500">{recipe.title}</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Prep Time:</strong> {recipe.prepTime || 0} mins
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Likes:</strong> {recipe.likeCount || 0}
              </p>
              <div className="flex gap-3 text-red-600">
                <button
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  title="Delete"
                  disabled={deletingId === recipe._id}
                  className={`${
                    deletingId === recipe._id ? "opacity-50 cursor-wait" : ""
                  }`}
                >
                  {deletingId === recipe._id ? (
                    <svg
                      className="animate-spin h-5 w-5 text-red-600"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                  ) : (
                    <FaTrashAlt />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipe;
