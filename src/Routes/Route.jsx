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
import ForgotPass from "../Components/Login/ForgotPass";
import Details from "../Pages/Recipe Details/Details";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-recipes",
        loader: () => fetch("https://recipe-book-server-green.vercel.app/recipes"),
        Component: AllRecipe,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <Addrecipe></Addrecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipe",

        element: (
          <PrivateRoute>
            <MyRecipe />
          </PrivateRoute>
        ),
      },
    ],
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
    path: "/forgot-password",
    Component: ForgotPass,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
  {
    path: "/recipes/:id",
    loader: ({ params }) => fetch(`https://recipe-book-server-green.vercel.app/recipes/${params.id}`),
    element: (
      <PrivateRoute>
        <Details></Details>
      </PrivateRoute>
    ),
  },

]);

export default router;
