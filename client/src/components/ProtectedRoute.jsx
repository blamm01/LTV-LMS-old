import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { APP_ROUTES } from "../routes";
import { checkPerms } from "../utils/checkPerms";
import TopCenterSnackbar from "./Snackbar.jsx";

export default function ProtectedRoute({ children, authorization }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  if (!auth.authenticated)
    return (
      <Navigate
        to={APP_ROUTES.LOGIN}
        state={{
          previous: location,
          message: "Bạn cần đăng nhập để tiếp tục",
        }}
      />
    );
  if (!authorization) return children;
  else {
    const passed = checkPerms(
      authorization.include,
      authorization.required,
      auth.permissions.permObj,
      authorization.requiredSuperuser,
      auth.permissions.superuser || false
    );
    if (!passed) {
      const [open, setOpen] = useState(true);
      return <TopCenterSnackbar setOpen={setOpen} open={open} severity={"error"} text={"Bạn không được phép truy cập vào tài nguyên này."} />
    }
    else return children;
  }
}
