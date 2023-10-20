import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import "../../styles/Auth/Root.css"
import "../../styles/Auth/Login.css"
import icon from "../../assets/ltv_logo.ico"
import { useState } from "react";
import { Box } from "@mui/material";

function ShowPassword({ isShowPassword, setIsShowPassword }) {
  function handleClick() {
    if(isShowPassword === true) setIsShowPassword(false)
    else setIsShowPassword(true)
  }

  return <FormControlLabel control={<Checkbox checked={isShowPassword} onClick={handleClick} />} label="Hiện mật khẩu" />
}

export default function AuthLogin() {
  const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <>
          <img className="form__icon" src={icon} alt="" />
          <div className="form__inputs">
            <TextField className="form__field" label="Tài khoản" variant="outlined" required />
            <TextField className="form__field" label="Mật khẩu" variant="outlined" type={isShowPassword ? "text" : "password"} required />
          </div>
          <div className="form__button-container" style={{ justifyContent: "left" }}>
            <ShowPassword isShowPassword={isShowPassword} setIsShowPassword={setIsShowPassword} />
          </div>
          <div className="form__button-container" style={{ justifyContent: "right" }}>
            <Button variant="contained">
              <Box sx={{ letterSpacing: "2px", fontWeight: "light" }}>Đăng nhập</Box>
            </Button>
          </div>
        </>
      );
}