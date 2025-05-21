import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import NoItem from "../../Error/NoItem";
import GlobalLoader from "../../Components/Loader/Loader";

const cuisineOptions = [
  "Italian",
  "Chinese",
  "Indian",
  "Mexican",
  "French",
  "Japanese",
  // Add your cuisine types here
];

const categoriesList = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Vegetarian",
  "Vegan",
  // Add your categories here
];

const MyRecipe = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Modal & form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    prepTime: "",
    categories: [],
  });
  const [imageSource, setImageSource] = useState("url"); // "url" or "file"
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (currentUserEmail) fetchMyRecipes();
  }, [currentUserEmail]);

  const fetchMyRecipes = () => {
    fetch("https://recipe-book-server-green.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => {
        const owned = data.filter(
          (recipe) => recipe?.user?.email === currentUserEmail
        );
        setMyRecipes(owned);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

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
        setDeletingId(id);
        try {
          const res = await fetch(`https://recipe-book-server-green.vercel.app/recipes/${id}`, {
            method: "DELETE",
          });
          const result = await res.json();
          if (result.success === true) {
            setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
            Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
          } else {
            Swal.fire("Failed!", "Could not delete the recipe.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "An error occurred during deletion.", "error");
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  // Open modal and fill form for editing
  const openEditModal = (recipe) => {
    setFormData({
      _id: recipe._id,
      title: recipe.title || "",
      image: recipe.image || "",
      ingredients: recipe.ingredients || "",
      instructions: recipe.instructions || "",
      cuisine: recipe.cuisine || "",
      prepTime: recipe.prepTime || "",
      categories: recipe.categories || [],
    });
    setImageSource("url"); // default to URL on open
    setImageFile(null);
    setIsModalOpen(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      _id: "",
      title: "",
      image: "",
      ingredients: "",
      instructions: "",
      cuisine: "",
      prepTime: "",
      categories: [],
    });
    setImageSource("url");
    setImageFile(null);
  };

  // Handle text, number, select inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "categories") {
      // Add/remove categories from array
      let newCategories = [...formData.categories];
      if (checked) {
        if (!newCategories.includes(value)) newCategories.push(value);
      } else {
        newCategories = newCategories.filter((cat) => cat !== value);
      }
      setFormData((prev) => ({ ...prev, categories: newCategories }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Image URL input change
  const handleImageUrlChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.value }));
    setImageFile(null);
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated recipe data
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedRecipe = { ...formData };

    // If using file, upload it here to server/cloudinary or your backend and replace image URL accordingly
    // For demo, we just use base64 preview (not recommended for production)
    // Ideally you handle real upload separately and get URL

    try {
      const res = await fetch(`https://recipe-book-server-green.vercel.app/recipes/${formData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      });

      if (res.ok) {
        setMyRecipes((prev) =>
          prev.map((recipe) =>
            recipe._id === formData._id ? updatedRecipe : recipe
          )
        );
        Swal.fire("Success", "Recipe updated successfully", "success");
        closeModal();
      } else {
        Swal.fire("Failed", "Failed to update recipe", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading) return <GlobalLoader></GlobalLoader> ;

  if (myRecipes.length === 0) {
    return <NoItem />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-red-400 mb-6 text-center">
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
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Prep Time:</strong> {recipe.prepTime || 0} mins
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Categories:</strong>{" "}
                {(recipe.categories || []).join(", ") || "N/A"}
              </p>
              <div className="flex justify-center gap-4 text-red-600 mt-4">
                <button
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                  title="View"
                  className="cursor-pointer"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => openEditModal(recipe)}
                  title="Edit"
                  className="cursor-pointer"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  title="Delete"
                  disabled={deletingId === recipe._id}
                  className={`${
                    deletingId === recipe._id
                      ? "opacity-50 cursor-wait"
                      : "cursor-pointer"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto pt-12 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-700 font-bold text-3xl hover:text-red-500"
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-center text-red-500 mb-4">
              Edit Recipe
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Source Option */}
              <div>
                <label className="block font-medium mb-1">
                  Choose Image Source
                </label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="imageSource"
                      value="file"
                      checked={imageSource === "file"}
                      onChange={() => {
                        setImageSource("file");
                        setFormData((prev) => ({ ...prev, image: "" }));
                        setImageFile(null);
                      }}
                    />
                    Upload File
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="imageSource"
                      value="url"
                      checked={imageSource === "url"}
                      onChange={() => {
                        setImageSource("url");
                        setFormData((prev) => ({ ...prev, image: "" }));
                        setImageFile(null);
                      }}
                    />
                    Use Image URL
                  </label>
                </div>

                {imageSource === "file" ? (
                  <div>
                    <label className="block mb-1">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block mb-1">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-40 mt-2 rounded"
                  />
                )}
              </div>

              <div>
                <label className="block mb-1">Recipe Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Recipe Title"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Ingredients (comma-separated)</label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1">Cuisine Type</label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Cuisine</option>
                  {cuisineOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Preparation Time (minutes)</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  min={1}
                />
              </div>

              <div>
                <p className="block mb-1 font-medium">Categories:</p>
                <div className="flex flex-wrap gap-3">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="categories"
                        value={cat}
                        checked={formData.categories.includes(cat)}
                        onChange={handleChange}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipe;
