import { createBrowserRouter } from "react-router";
import ErrorPage from "../Error/ErrorPage";
import HomeLayout from "../Home/HomeLayout";
import Signin from "../Components/Login/Login";
import Signup from "../Components/Login/Registration";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children : [
        {
          index: true,
          element: <div>home</div> ,
        },
           {
      path: "/all-recipes",
      element: <div>All recipe</div>,
    },
     {
      path: "/add-recipe",
      element:(<PrivateRoute>
                          <div>add recipe</div>
                   </PrivateRoute>),
    },
     {
      path: "/my-recipe",
     element:(<PrivateRoute>
                          <div>my recipe</div>
                   </PrivateRoute>),
    },
      ]
    },
    {
        path: "/login",
        Component: Signin,
      },
      {
        path: "/registration",
        Component: Signup,
      },
    {
      path: "/*",
      element: <ErrorPage/>,
    },
  ]);
  
  export default router;