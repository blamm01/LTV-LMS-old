import { Outlet } from "react-router-dom";
import "../../styles/Auth/Root.css";
export default function Auth() {
  return (
      <form className="form">
        <Outlet />
      </form>
  );
}
