import React from 'react';
import { useNavigate } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const Slide3 = () => {
   const navigate = useNavigate()
  const handelBtn = ()=>{
    navigate("/login")
  }
    return (
       <div className="bg-red-200 px-8 rounded-2xl">
    <div className="hero-content flex-col lg:flex-row-reverse gap-8">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/025/187/574/small_2x/one-man-cooking-healthy-meal-in-domestic-kitchen-with-ingredients-generated-by-ai-photo.jpg"
        alt="Food Dish"
        className='rounded-xl'
      />
      <div>
        <h1 className="text-2xl md:text-6xl font-bold">Your Digital</h1>
        <span className="text-red-500 ml-2 text-2xl">
                      <Typewriter
                        words={['Recipe Book 🍳']}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </span>
        <p className="py-6 text-lg">Find healthy, tasty, and quick recipes for every meal.</p>
        <button onClick={handelBtn} className="btn btn-error">Get Started</button>
      </div>
    </div>
  </div>
    );
};

export default Slide3;