import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/ourFamilyRecipes",
    name: "OurFamilyRecipes",
    component: () => import("./pages/OurFamilyRecipes")
  },
  {
    path: "/myRecipes",
    name: "MyRecipes",
    component: () => import("./pages/MyRecipesPage")
  },
  {
    path: "/myFavorites",
    name: "MyFavorites",
    component: () => import("./pages/MyFavoritesPage")
  },
  {
    path: "/recipe/:recipeId/:spoonacular",
    name: "Recipe",
    component: () => import("./pages/RecipeViewPage")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
