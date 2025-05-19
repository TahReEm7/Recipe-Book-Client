import { createBrowserRouter } from "react-router";
import ErrorPage from "../Error/ErrorPage";
import HomeLayout from "../Home/HomeLayout";
import Signin from "../Components/Login/Login";
import Signup from "../Components/Login/Registration";

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
      element: <div>Add recipe</div>,
    },
     {
      path: "/my-recipe",
      element: <div>my recipe</div>,
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