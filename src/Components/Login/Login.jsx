import React, { use, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";

import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Context/AuthContext";

const Signin = () => {
  const { signInUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [active, setActive] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result);
       {
          toast.success("Login successful! 👋");
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid Credential"); // Show Firebase error message
      });
  };

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        toast.success("Login successful! 👋");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <main className="w-full h-auto sm:h-[100vh] bg-[#d7367c] flex items-center justify-center sm:p-0 p-6">
       <Helmet>
        <title>Login || RecipeBook</title>
      </Helmet>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleLogin}
        className="w-full sm:w-[40%] bg-base-300 rounded-lg sm:py-6 sm:px-8 p-4 flex items-center justify-center flex-col gap-5"
      >
        <h3 className="text-[1.8rem] font-[700] text-shadow-red-400">Log in</h3>

        {/* Show error message */}
        {error && (
          <p className="text-red-500 bg-red-100 w-full p-2 rounded-md text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="py-3 px-4 border focus:outline-[#d7367c] border-gray-300 mt-5 rounded-lg w-full"
        />
        <div className="w-full relative">
          <input
            type={active ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            className="py-3 px-4 border focus:outline-[#d7367c] border-gray-300 rounded-lg w-full"
          />
          {active ? (
            <BsEyeSlash
              className=" absolute top-[30%] right-[5%] text-[1.2rem] text-gray-500 cursor-pointer"
              onClick={() => setActive(false)}
            />
          ) : (
            <BsEyeFill
              className=" absolute top-[30%] right-[5%] text-[1.2rem] text-gray-500 cursor-pointer"
              onClick={() => setActive(true)}
            />
          )}
        </div>

        <Link
          to="/forgot-password"
          className="text-[1rem] text-[#d7367c] font-[500]"
        >
          Forget password
        </Link>
        <button
          type="submit"
          className=" py-3 px-4 bg-[#d7367c] text-white btn-block btn-primary btn rounded-lg mt-3 cursor-pointer"
        >
          Login
        </button>

        <div className="flex items-center justify-center w-full gap-1">
          <span className="text-[1rem] text-gray-600 font-[500]">
            Don't have an account?{" "}
          </span>
          <span>
            <Link
              to={"/registration"}
              className="text-[1rem] text-[#d7367c] font-[500] cursor-pointer"
            >
              Registration
            </Link>
          </span>
        </div>

        <div className="w-full my-1 flex items-center gap-3">
          <hr className="w-[45%] bg-gray-500 h-[2px]" />
          <p>or</p>
          <hr className="w-[45%] bg-gray-500 h-[2px]" />
        </div>
        <button
          onClick={handleGoogleLogIn}
          type="button"
          className=" hover:bg-[#d7367c20] cursor-pointer flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-[500] text-gray-600"
        >
          <FcGoogle className="text-[2rem]" />
          Login with Google
        </button>
      </form>
    </main>
  );
};

export default Signin;
