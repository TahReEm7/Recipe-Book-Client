import { createBrowserRouter } from "react-router";
import ErrorPage from "../Error/ErrorPage";
import HomeLayout from "../Home/HomeLayout";
import Signin from "../Components/Login/Login";
import Signup from "../Components/Login/Registration";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Homepage/Home";
import AllRecipe from "../Pages/All Recipe/AllRecipe";
import Addrecipe from "../Pages/Add Recipe'/Addrecipe";
import MyRecipe from "../Pages/My Recipe/MyRecipe";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children : [
        {
          index: true,
          Component : Home ,
        },
           {
      path: "/all-recipes",
      Component: AllRecipe,
    },
     {
      path: "/add-recipe",
      element:(<PrivateRoute>
                          <Addrecipe></Addrecipe>
                   </PrivateRoute>),
    },
     {
      path: "/my-recipe",
     element:(<PrivateRoute>
                          <MyRecipe></MyRecipe>
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