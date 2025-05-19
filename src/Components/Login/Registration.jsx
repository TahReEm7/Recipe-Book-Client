import React, { use, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Signup = () => {
  const { createUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [active, setActive] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const allValid = Object.values(passwordRules).every(Boolean);

    if (!allValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);
        sendEmailVerification(auth.currentUser).then(() => {
          toast.success("Verification email sent! Please check your inbox.");
          navigate("/login");
        });
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setError("Registration failed: " + error.message);
      });
  };

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError("Google sign-in failed.");
      });
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordRules({
      length: val.length >= 6,
      lowercase: /[a-z]/.test(val),
      uppercase: /[A-Z]/.test(val),
    });
  };

  return (
    <main className="w-full min-h-[100vh] h-auto bg-blue-300 flex items-center justify-center sm:py-12 p-6">
       <Helmet>
        <title>Registration || BillEase</title>
      </Helmet>
      <form
        onSubmit={handleRegister}
        className="w-full sm:w-[900px] sm:max-w-[1000px] bg-white rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5"
      >
        <h3 className="text-[1.8rem] font-[700] text-gray-900 text-center">
          Sign Up
        </h3>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="py-3 px-4 border focus:outline-blue-500 border-gray-300  rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="py-3 px-4 border focus:outline-blue-500 border-gray-300  rounded-lg w-full"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="py-3 px-4 border focus:outline-blue-500 border-gray-300 rounded-lg w-full"
          required
        />

        <div className="w-full flex items-center gap-4 justify-between sm:flex-row flex-col">
          <div className="w-full relative">
            <input
              name="password"
              type={active ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="py-3 px-4 border focus:outline-blue-500 border-gray-300 rounded-lg w-full"
              required
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

          <div className="w-full relative">
            <input
              type={active ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-3 px-4 border focus:outline-blue-500 border-gray-300 rounded-lg w-full"
              required
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
        </div>

        {/* Password validation rules */}
        <div className="text-sm text-gray-600 space-y-1">
          <p className={passwordRules.length ? "text-green-600" : "text-gray-500"}>
            {passwordRules.length ? "✓" : "○"} At least 6 characters
          </p>
          <p className={passwordRules.uppercase ? "text-green-600" : "text-gray-500"}>
            {passwordRules.uppercase ? "✓" : "○"} Contains an uppercase letter
          </p>
          <p className={passwordRules.lowercase ? "text-green-600" : "text-gray-500"}>
            {passwordRules.lowercase ? "✓" : "○"} Contains a lowercase letter
          </p>
        </div>

        <div className="text-[1rem] ">
          <input type="checkbox" name="checkbox" id="checkbox" />{" "}
          <label htmlFor="checkbox" className="cursor-pointer">
            By clicking, I agree to signup{" "}
            <a href="/*" className=" text-blue-500">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/*" className=" text-blue-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="w-full sm:w-[50%] py-3 px-4 bg-blue-500 text-white border-none outline-none rounded-lg mt-3"
          >
            Sign up
          </button>
        </div>

        <div className="flex items-center justify-center w-full gap-1">
          <span className="text-[1rem] text-gray-600 font-[500]">
            Already have an account?
          </span>
          <span>
            <Link
              to={"/login"}
              className="text-[1rem] text-blue-500 font-[500]"
            >
              Signin
            </Link>
          </span>
        </div>

        <div className="w-full my-1 flex items-center justify-center gap-3">
          <hr className="w-[45%] bg-gray-400 h-[2px]" />
          <p>or</p>
          <hr className="w-[45%] bg-gray-400 h-[2px]" />
        </div>

        <button
          onClick={handleGoogleLogIn}
          type="button"
          className="flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-[500] text-gray-600"
        >
          <FcGoogle className="text-[2rem]" />
          Signup with Google
        </button>
      </form>
    </main>
  );
};

export default Signup;
