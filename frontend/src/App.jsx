import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import IndexPage, { loader as placesLoader } from "./pages/Index";
import SingleWeatherPage, { loader as singleWeatherLoader } from "./pages/SingleWeather";
import ErrorPage from "./pages/Error";
import RegisterPage, {action as registerAction} from "./pages/Register";
import LoginPage, {action as loginAction} from "./pages/Login";
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
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
