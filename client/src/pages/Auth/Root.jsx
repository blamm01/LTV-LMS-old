import { Outlet } from "react-router-dom";
import "../../styles/Auth/Root.css";
export default function Auth() {
  return (
    <div className="auth_container">
      <Outlet />
    </div>
  );
}
