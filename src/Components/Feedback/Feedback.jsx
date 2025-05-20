import React, { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-hot-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [reviews, setReviews] = useState([
    {
      name: "Lionel Messi",
      email: "alice@example.com",
      rating: 5,
      message: "Excellent service! Highly recommend it.",
    },
    {
      name: "Cristiano Ronaldo",
      email: "bob@example.com",
      rating: 4,
      message: "Very good experience, just a few things to improve.",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast.error("Please fill all fields and select a rating.");
      return;
    }

    const newReview = {
      name: formData.name,
      email: formData.email,
      rating,
      message: formData.message,
    };

    setReviews([newReview, ...reviews]); // Add new review at top
    toast.success("Review submitted!");
    setFormData({ name: "", email: "", message: "" });
    setRating(0);
  };

  return (
    <div className="w-11/12 mx-auto my-10 mb-16 p-6 bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 text-white rounded-xl shadow-md">
      <h2 className="text-4xl font-bold mb-4 text-white text-center py-6">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
        />
        <textarea
          placeholder="Your Feedback"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows="3"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-500"
        ></textarea>

        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-400"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(star)}
              fill={(hover || rating) >= star ? "currentColor" : "none"}
            />
          ))}
          <span className="ml-2 text-sm text-white">
            {rating ? `${rating} Star${rating > 1 ? "s" : ""}` : "No Rating"}
          </span>
        </div>

        <button
          type="submit"
          className=" font-semibold btn btn-error"
        >
          Submit Review
        </button>
      </form>

      <h3 className="text-xl font-semibold text-white mb-4">What People Are Saying</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-gray-800">{review.name}</h4>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">{review.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
