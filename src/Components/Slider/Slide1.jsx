import React from 'react';
import { useNavigate } from 'react-router';

const Slide1 = () => {
  const navigate = useNavigate()
  const handelBtn = ()=>{
    navigate("/add-recipe")
  }
    return (
        <div className="p-40 text-center bg-no-repeat bg-cover bg-center bg-[url(https://t4.ftcdn.net/jpg/01/13/80/37/360_F_113803790_GA5ymemnlMH5x1K5lpPlssfAQdMwHvjN.jpg)] mb-3 hero">
    <div className="flex flex-col justify-center items-center text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold">Your Digital Recipe Book</h1>
      <p className="mt-4 text-lg md:text-xl">Save and share your favorite dishes with ease.</p>
      <button onClick={handelBtn} className="mt-6 btn btn-error">Start Cooking</button>
    </div>
  </div>
    );
};

export default Slide1;

