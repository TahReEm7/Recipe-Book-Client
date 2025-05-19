import React from 'react';
import { useNavigate } from 'react-router';
const Slide2= () => {
   const navigate = useNavigate()
  const handelBtn = ()=>{
    navigate("/all-recipes")
  }
  return (
    <div
    className="hero min-h-[60vh] bg-cover bg-center bg-[url(https://img.freepik.com/free-photo/top-view-recipe-book-still-life-concept_23-2149056055.jpg?semt=ais_hybrid&w=740)] text-white"
  >
    <div className="" />
    <div className="text-center max-w-2xl">
      <h1 className="text-5xl text-red-400 font-bold mb-4">Delicious Recipes Await</h1>
      <p className="mb-6 text-black text-lg">Discover flavors from around the world in one place.</p>
      <button onClick={handelBtn} className="btn btn-outline btn-error">Explore Recipes</button>
    </div>
  </div>
  );
};

export default Slide2;