import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { use } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "../../Context/ThemeContext";

const Navbar = () => {
  const { user, signOutUser, Balance } = use(AuthContext);
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Successfully logged out");

      setTimeout(() => {
        navigate("/");
      }, 1000); // Wait 1 second for toast to show
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: " All Recipes", path: "/all-recipes" },
    { name: "Add Recipe", path: "/add-recipe" },
    { name: "My Recipe", path: "/my-recipe" },
  ];
  return (
    <div className="navbar bg-base-200 pr-10 md:px-10 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}

            {/* Conditionally render based on user */}
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="btn w-2/3 btn-outline btn-error">
                  Login
                </Link>
                <Link to="/registration" className="btn w-2/3 btn-outline btn-error">
                  Register
                </Link>
              </div>
            ) : null}

            {/* Always show Theme Toggle */}
           <div className="mt-2 w-full">
             <ThemeToggle />
           </div>
          </ul>
        </div>
        <a className="pl-5">
          <span className="text-3xl font-bold text-[#d7367c]">🍳Recipe</span>
          <span className="text-3xl font-bold text-shadow-blue-200">Book</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 flex items-center justify-center gap-4">
          {navLinks.map((link) => (
            <li className="text-lg font-semibold" key={link.path}>
              <NavLink key={link.path} to={link.path}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end flex gap-4">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <div className="avatar">
                  <div
                    className="w-10 cursor-pointer rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                    title="Current Balance"
                  >
                    <img src={user?.photoURL} alt="User Avatar" />
                  </div>
                </div>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-5 shadow-md"
              >
                <p className="p-2 font-bold text-center text-[#d7367c] text-lg"><span className="px-1 text-black">Hello</span>
                  {user?.displayName}
                </p>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-secondary"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex gap-3">
            <Link to="/login" className="btn btn-outline btn-error">
              Login
            </Link>
            <Link to="/registration" className="btn btn-outline btn-error">
              Register
            </Link>
          </div>
        )}
        <div className="hidden lg:flex">
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
