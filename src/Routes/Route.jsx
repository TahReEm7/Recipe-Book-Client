import { createBrowserRouter } from "react-router";
import ErrorPage from "../Error/ErrorPage";
import HomeLayout from "../Home/HomeLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
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
    {
      path: "/*",
      element: <ErrorPage/>,
    },
  ]);
  
  export default router;