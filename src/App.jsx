import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import IndexPage, { loader as placesLoader } from "./pages/Index";
import SingleWeatherPage, { loader as singleWeatherLoader } from "./pages/SingleWeather";
import ErrorPage from "./pages/Error";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
    ],
  },
  {
    path: "*", // Match any undefined routes
    element: (
      <RootLayout> // Wrap ErrorPage with RootLayout
        <ErrorPage />
      </RootLayout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
