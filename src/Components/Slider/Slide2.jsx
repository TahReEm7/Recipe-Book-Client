import React from 'react';
import { useNavigate } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';
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
       <Typewriter
                              words={['Discover flavors from around the world in one place.']}
                              loop={0}
                              cursor
                              cursorStyle="|"
                              typeSpeed={70}
                              deleteSpeed={50}
                              delaySpeed={1000}
                            /> 
                            <br />
      <button onClick={handelBtn} className="btn btn-outline btn-error mt-4">Explore Recipes</button>
    </div>
  </div>
  );
};

export default Slide2;