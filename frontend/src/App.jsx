import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import IndexPage, { loader as placesLoader } from "./pages/Index";
import EuropePage, { loader as europeLoader } from "./pages/Europe";
import UKPage, { loader as ukLoader } from "./pages/UK";
import SingleWeatherPage, {
  loader as singleWeatherLoader,
} from "./pages/SingleWeather";
import ErrorPage from "./pages/Error";
import RegisterPage, { action as registerAction } from "./pages/Register";
import LoginPage, { action as loginAction } from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserInfoPage from "./pages/UserInfo";
import FavoritesPage from "./pages/Favorites";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
        loader: placesLoader,
      },
      {
        path: "search",
        element: <SingleWeatherPage />,
        loader: singleWeatherLoader,
      },
      {
        path: "europe",
        element: <EuropePage />,
        loader: europeLoader,
      },
      {
        path: "uk",
        element: <UKPage />,
        loader: ukLoader,
      },
      {
        path: "user",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <UserInfoPage /> },
        ],
      },
      {
        path: "favorites",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <FavoritesPage /> }],
      },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
