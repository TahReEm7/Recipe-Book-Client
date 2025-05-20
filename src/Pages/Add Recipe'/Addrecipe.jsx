import React, { use, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const AddRecipe = () => {
  const { user } = use(AuthContext);

  const [imageSource, setImageSource] = useState('file');
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    ingredients: '',
    instructions: '',
    cuisine: '',
    prepTime: '',
    categories: [],
    likeCount: 0,
  });

  const categoriesList = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'];
  const cuisineOptions = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Others'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedCategories = checked
        ? [...formData.categories, value]
        : formData.categories.filter((cat) => cat !== value);
      setFormData({ ...formData, categories: updatedCategories });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to add a recipe.');
      return;
    }

    const recipeData = {
      ...formData,
      user: {
        name: user.name,
        email: user.email,
        id: user.uid,
      },
      createdAt: new Date(),
    };

    try {
      const res = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });

      if (res.ok) {
        toast.success('Recipe added successfully!');
        setFormData({
          image: '',
          title: '',
          ingredients: '',
          instructions: '',
          cuisine: '',
          prepTime: '',
          categories: [],
          likeCount: 0,
        });
      } else {
        toast.error('Failed to add recipe');
      }
    } catch (error) {
      toast.error('Error submitting recipe');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <Helmet>
        <title>My Recipe || RecipeBook</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-[#d7367c] mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Image Source Option */}
        <div>
          <label className="block font-medium mb-1">Choose Image Source</label>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="imageSource"
                value="file"
                checked={imageSource === 'file'}
                onChange={() => {
                  setImageSource('file');
                  setFormData({ ...formData, image: '' });
                }}
              />
              Upload File
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="imageSource"
                value="url"
                checked={imageSource === 'url'}
                onChange={() => {
                  setImageSource('url');
                  setFormData({ ...formData, image: '' });
                }}
              />
              Use Image URL
            </label>
          </div>

          {imageSource === 'file' ? (
            <div>
              <label className="block mb-1">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
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

          {formData.image && <img src={formData.image} alt="Preview" className="w-40 mt-2" />}
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
          className="bg-[#d7367c] text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
