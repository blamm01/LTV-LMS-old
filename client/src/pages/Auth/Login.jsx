import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import icon from "../../assets/icons/ltv_logo.ico";
import { useState, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { Form, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import TopCenterSnackbar from "../../components/Snackbar";
import axios from "axios";
import "../../styles/Auth/Root.css"
import { API_ROUTES } from "../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { APP_ROUTES } from "../../routes";

function ShowPassword({ isShowPassword, setIsShowPassword, disabled }) {
  function handleClick() {
    if (isShowPassword === true) setIsShowPassword(false);
    else setIsShowPassword(true);
  }

  return (
    <FormControlLabel
      {...{ disabled }}
      control={<Checkbox checked={isShowPassword} onClick={handleClick} />}
      label="Hiện mật khẩu"
    />
  );
}

export default function AuthLogin() {
  const { state: prevState } = useLocation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [snackbar, setSnackbar] = useState({
    severity: "info",
    text: "Đang đợi yêu cầu đăng nhập...",
  });
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    document.title = "LTV LMS - Đăng nhập"
    if (prevState?.previous?.pathname) {
      setSnackbar({
        severity: "info",
        text: prevState?.message || "Bạn cần đăng nhập để tiếp tục",
      });
      setSnackbarOpened(true);
    }
  }, [prevState?.previous?.pathname, prevState?.message]);

  function submitForm(data) {
    setIsLoggingIn(true);
    axios.post(API_ROUTES.LOGIN, data).then(
      (response) => {
        const data = response.data;
        if (
          !data?.success ||
          !data?.data?.token ||
          !data?.data?.user ||
          !data?.data?.session
        )
          setSnackbar({
            severity: "error",
            text: data?.message || "Lỗi không xác định",
          }) && setIsLoggingIn(false);
        else {
          setSnackbar({
            severity: "info",
            text: "Đang chuyển hướng",
          });
          setAuth({
            authenticated: true,
            session: data.data.session,
            user: data.data.user,
            token: data.data.token || "",
            permissions: data.data.permissions
          });
          if (prevState?.previous && prevState?.previous?.pathname)
            navigate(prevState.previous.pathname);
          else navigate(APP_ROUTES.DASHBOARD);
        }
        setSnackbarOpened(true);
      },
      (error) => {
        console.log(error);
        setSnackbar({
          severity: "error",
          text:
            error?.response?.data?.message ||
            "Lỗi không xác định khi yêu cầu lên máy chủ",
        });
        setSnackbarOpened(true);
        setIsLoggingIn(false);
      }
    );
  }

  return (
    <div className="auth_container">
      <TopCenterSnackbar
        setOpen={setSnackbarOpened}
        open={snackbarOpened}
        severity={snackbar.severity}
        text={snackbar.text}
      />
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <img className="form__icon" src={icon} alt="" />
        <Box className="form__inputs">
          <TextField
            {...{ disabled: isLoggingIn }}
            {...register("username")}
            className="form__field"
            label="Tài khoản"
            variant="outlined"
            required
          />
          <TextField
            {...{ disabled: isLoggingIn }}
            {...register("password")}
            className="form__field"
            label="Mật khẩu"
            variant="outlined"
            type={isShowPassword ? "text" : "password"}
            required
          />
        </Box>
        <Box
          className="form__button-container"
          style={{ justifyContent: "left" }}
        >
          <ShowPassword
            {...{ disabled: isLoggingIn }}
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
          />
        </Box>
        <Box
          className="form__button-container"
          style={{ justifyContent: "right" }}
        >
          <LoadingButton
            {...{ loading: isLoggingIn }}
            type="submit"
            variant="contained"
          >
            <Box sx={{ letterSpacing: "2px", fontWeight: "light" }}>
              Đăng nhập
            </Box>
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
}
