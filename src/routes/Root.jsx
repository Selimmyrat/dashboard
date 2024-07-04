import { Outlet } from "react-router-dom";
import Menu from "../views/Menu";

export default function Root() {
  return (
    <>
      <Menu>
        <Outlet />
      </Menu>
    </>
  );
}
