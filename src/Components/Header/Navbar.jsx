import { NavLink } from "react-router";

const Navbar = () => {

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: ' All Recipes', path: '/all-recipes' },
        { name: 'Add Recipe', path: '/add-recipe' },
        { name: 'My Recipe', path: '/my-recipe' },
      ];
    return (
                    <div className="navbar bg-base-200 pr-10 md:px-10 shadow-sm">
                       {/* <Toaster position="top-center" reverseOrder={false} /> */}
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                    
                     {navLinks.map((link) => (
                              <li className='' key={link.path}>
                              <NavLink key={link.path} to={link.path}>
                             {link.name}
                           </NavLink>
                           </li>
                           ))}  
                
                  </ul>
                </div>
                <a className="md:pl-5"><span className='text-3xl font-bold text-[#d7367c]'>Recipe</span><span className='text-2xl font-bold text-shadow-blue-200'>Book</span></a>
              </div>
              <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal px-1 flex items-center justify-center gap-4">
               
                     {navLinks.map((link) => (
                             <li className='text-lg font-semibold' key={link.path}>
                                <NavLink key={link.path} to={link.path}>
                               {link.name}
                             </NavLink>
                             </li>
                           ))}  
                </ul>
              </div>
              <div className="navbar-end flex gap-4">
                <div>
                  reg/log avatar
                </div>
      </div>
            </div>
    );
};

export default Navbar;