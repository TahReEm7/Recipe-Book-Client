import React from 'react';
import { useNavigate } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const Slide1 = () => {
  const navigate = useNavigate()
  const handelBtn = ()=>{
    navigate("/add-recipe")
  }
    return (
        <div className="md:p-40 p-15 text-center bg-no-repeat bg-cover bg-center bg-[url(https://t4.ftcdn.net/jpg/01/13/80/37/360_F_113803790_GA5ymemnlMH5x1K5lpPlssfAQdMwHvjN.jpg)] mb-3 hero">
    <div className="flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl font-bold text-center mt-6">
            Welcome to RecipeBook –
            <span className="text-red-500 ml-2">
              <Typewriter
                words={['Cook!', 'Eat!', 'Repeat!']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
      <p className="mt-4 text-lg md:text-xl">Save and share your favorite dishes with ease.</p>
      <button onClick={handelBtn} className="mt-6 btn btn-error">Start Cooking</button>
    </div>
  </div>
    );
};

export default Slide1;

