import React, { use, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const AddRecipe = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
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

    const { image, title, ingredients, instructions, cuisine, prepTime } = formData;
    if (!image || !title || !ingredients || !instructions || !cuisine || !prepTime) {
      toast.error('Please fill in all fields.');
      return;
    }

    const recipeData = {
      ...formData,
      user: {
        name: user.name || user.displayName,
        email: user.email,
        id: user.uid,
      },
      createdAt: new Date(),
    };

    try {
      const res = await fetch('https://recipe-book-server-green.vercel.app/recipes', {
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
        navigate('/my-recipe');
      } else {
        toast.error('Failed to add recipe.');
      }
    } catch (error) {
      toast.error('Error submitting recipe.');
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 py-12 bg-base-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Helmet>
        <title>Add Recipe || RecipeBook</title>
      </Helmet>

      <motion.div
        className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-gray-700 p-8 rounded-xl shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center text-pink-400 mb-8">Add a New Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Option */}
          <div>
            <p className="mb-2">Image Source:</p>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={imageSource === 'file'}
                  onChange={() => {
                    setImageSource('file');
                    setFormData({ ...formData, image: '' });
                  }}
                />
                Upload
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={imageSource === 'url'}
                  onChange={() => {
                    setImageSource('url');
                    setFormData({ ...formData, image: '' });
                  }}
                />
                URL
              </label>
            </div>

            {imageSource === 'file' ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 bg-white/20 rounded border border-gray-500"
              />
            ) : (
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 bg-white/20 rounded border border-gray-500"
              />
            )}

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-3 w-32 h-24 object-cover rounded border border-gray-600"
              />
            )}
          </div>

          {/* Form Fields */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
            className="w-full p-2 bg-white/20 rounded border border-gray-500"
          />
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredients (comma-separated)"
            className="w-full p-2 bg-white/20 rounded border border-gray-500"
            rows={3}
          />
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Instructions"
            className="w-full p-2 bg-white/20 rounded border border-gray-500"
            rows={4}
          />
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="w-full p-2 bg-white/20 rounded border border-gray-500"
          >
            <option value="">Select Cuisine</option>
            {cuisineOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            placeholder="Preparation Time (minutes)"
            className="w-full p-2 bg-white/20 rounded border border-gray-500"
          />

          {/* Categories */}
          <div>
            <p className="mb-2">Categories:</p>
            <div className="flex flex-wrap gap-4">
              {categoriesList.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={formData.categories.includes(cat)}
                    onChange={handleChange}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 transition px-6 py-2 rounded-lg shadow-lg font-semibold text-white"
            >
              Add Recipe
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddRecipe;
