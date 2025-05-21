import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white shadow-2xl p-6 text-center">
      <div className="w-72 h-72 mb-4">
        <DotLottieReact
          src="https://lottie.host/c4bc4cee-2eae-4145-a9fc-61f0e6d4c2a3/U279rssCtN.lottie"
          loop
          autoplay
        />
      </div>
      <h1 className="text-8xl font-extrabold text-[#d7367c]">Sorry</h1>
      <p className="text-2xl mt-4 font-semibold text-[#d7367c]">No Page found!</p>
      <p className="text-md text-[#d7367c] mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 border border-[#d7367c] text-[#d7367c] rounded-full hover:bg-[#d7367c] hover:text-white transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
