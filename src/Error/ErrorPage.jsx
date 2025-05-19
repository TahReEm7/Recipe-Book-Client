import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 shadow-2xl p-6 text-center">
            <h1 className="text-8xl font-extrabold text-blue-700">Sorry</h1>
            <p className="text-2xl mt-4 font-semibold text-blue-800">No Page found!</p>
            <p className="text-md text-blue-600 mb-8">
                The Page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="px-6 py-2 border border-blue-700 text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
