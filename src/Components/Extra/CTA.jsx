import React from 'react';
import { Link } from 'react-router'; 
const CTA = () => {
  return (
    <section className=" py-20 bg-gradient-to-br from-pink-600 via-pink-500 to-red-400 text-white text-center overflow-hidden rounded-lg shadow-lg my-8 mx-4 md:mx-16">
      <div className="">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Got a Tasty Recipe? 🍳✨
        </h2>
        <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
          Share your creativity and inspire thousands of food lovers!
        </p>
        <Link
          to="/add-recipe"
          className="btn btn-lg bg-white text-pink-600 hover:bg-pink-100 transition-all duration-300 font-bold shadow-md "
        >
          🍽️ Add Your Recipe
        </Link>
      </div>
   
    </section>
  );
};

export default CTA;
