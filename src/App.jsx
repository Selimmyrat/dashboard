import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Menu from "./views/Menu";
import Auth from "./pages/auth";
import Users from "./pages/users";
import Dashboard from "./pages/dashboard";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/users", element: <Users /> },
    ],
  },
  { path: "/auth", element: <Auth /> },
  // { path: "/table", element: <Table />}
]);

export default function App() {
  return <RouterProvider router={router} />;
}
