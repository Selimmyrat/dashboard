import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Menu from "./views/Menu";
import Auth from "./pages/auth";
import Users from "./pages/users";
import Dashboard from "./pages/dashboard";
import Root from "./routes/Root";
import Sprints from "./pages/sprints";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/users", element: <Users /> },
      { path: "/sprints", element: <Sprints /> },
    ],
  },
  { path: "/auth", element: <Auth /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
