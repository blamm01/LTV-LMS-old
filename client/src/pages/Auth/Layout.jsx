import { Outlet } from "react-router-dom";
import "../../styles/Auth/Root.css";
export default function AuthLayout() {
  return (
    <div className="auth_container">
      <Outlet />
    </div>
  );
}
