import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center bg-[url(https://cdn.dribbble.com/userupload/21994177/file/original-2d2ceffdc1a4e59ef9fbb83916481b71.gif)] shadow-2xl p-6 text-center">
            <h1 className="text-8xl font-extrabold text-[#d7367c]">Sorry</h1>
            <p className="text-2xl mt-4 font-semibold text-[#d7367c]">No Page found!</p>
            <p className="text-md text-[#d7367c] mb-8">
                The Page you are looking for does not exist.
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
