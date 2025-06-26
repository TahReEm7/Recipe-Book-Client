import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { IoArrowDown } from "react-icons/io5";
import { useNavigate } from "react-router";
import Typewriter from "typewriter-effect";

const slides = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/top-view-recipe-book-still-life-concept_23-2149056055.jpg?semt=ais_hybrid&w=740",
    title: "Discover Tasty Recipes",
    description: "Explore a world of delicious recipes shared by food lovers like you.",
  },
  {
    id: 2,
    image: "https://static.vecteezy.com/system/resources/thumbnails/025/187/574/small_2x/one-man-cooking-healthy-meal-in-domestic-kitchen-with-ingredients-generated-by-ai-photo.jpg",
    title: "Share Your Own Creations",
    description: "Add and manage your personal recipes with images, instructions, and more.",
  },
  {
    id: 3,
    image: "https://t4.ftcdn.net/jpg/01/13/80/37/360_F_113803790_GA5ymemnlMH5x1K5lpPlssfAQdMwHvjN.jpg",
    title: "Cook with Confidence",
    description: "Follow easy, step-by-step instructions and bring your meals to life.",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const slideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  // Change slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateText(false); // stop animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setAnimateText(true); // trigger new typewriter animation
      }, 400); // small delay after fade
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // GSAP animation when slide changes
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      slideRef.current,
      { autoAlpha: 0, scale: 1.05 },
      { autoAlpha: 1, scale: 1, duration: 1.8, ease: "power3.out" }
    );
  }, [currentIndex]);

  const handleLearnMore = () => {
    navigate("/all-recipes");
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <div
        ref={slideRef}
        style={{
          backgroundImage: `url(${currentSlide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text content */}
        <div className="relative text-center text-white px-6 lg:px-16">
          <h1 className="text-4xl font-bold h-16 mb-3">
            {animateText && (
              <Typewriter
                options={{
                  strings: [currentSlide.title],
                  autoStart: true,
                  loop: false,
                  delay: 60,
                  cursor: "|",
                }}
              />
            )}
          </h1>
          <p className="text-lg font-light">{currentSlide.description}</p>
          <button
            onClick={handleLearnMore}
            className="text-center flex flex-col mx-auto mt-[10%] border border-white rounded-full px-6 py-5 hover:border-red-300 hover:text-red-400 duration-300 cursor-pointer items-center justify-center"
          >
            Explore Recipes <br /> <IoArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
