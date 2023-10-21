import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import "../../styles/Auth/Root.css";
import "../../styles/Auth/Login.css";
import icon from "../../assets/ltv_logo.ico";
import { useState } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import TopCenterSnackbar from "../../components/Snackbar";
import AuthLayout from "../../components/AuthLayout";
import axios from "axios";
import { API_ROUTES } from "../../constants/api";
import { useNavigate } from "react-router-dom";

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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [snackbar, setSnackbar] = useState({
    severity: "info",
    text: "Waiting for logging in...",
  });
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  function submitForm(data) {
    setIsLoggingIn(true)
    axios.post(API_ROUTES.LOGIN, data)
    .then((response) => {
      const data = response.data
      if(!data?.success || !data?.data?.token || !data?.data?.user || !data?.data?.session) setSnackbar({
        severity: "error",
        text: data?.message || "Lỗi không xác định"
      }) && setIsLoggingIn(false)
      else {
        setSnackbar({
          severity: "info",
          text: "Đang chuyển hướng"
        })
        localStorage.setItem("auth", JSON.stringify({
          token: data.data.token,
          session: data.data.session,
          user: data.data.user
        }))
        navigate('/')
      }
      setSnackbarOpened(true)
    }, (error) => {
      console.log(error)
      setSnackbar({
        severity: "error",
        text: error?.response?.data?.message || "Lỗi không xác định khi yêu cầu lên máy chủ"
      })
      setSnackbarOpened(true)
      setIsLoggingIn(false)
    })
  }

  return (
    <AuthLayout>
      <TopCenterSnackbar
        setOpen={setSnackbarOpened}
        open={snackbarOpened}
        severity={snackbar.severity}
        text={snackbar.text}
      />
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <img className="form__icon" src={icon} alt="" />
        <div className="form__inputs">
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
        </div>
        <div
          className="form__button-container"
          style={{ justifyContent: "left" }}
        >
          <ShowPassword
            {...{ disabled: isLoggingIn }}
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
          />
        </div>
        <div
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
        </div>
      </form>
    </AuthLayout>
  );
}
