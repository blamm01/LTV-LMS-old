import { Alert, Snackbar, Typography } from "@mui/material";

export default function TopCenterSnackbar({ setOpen, open, severity, text }) {
  const vertical = "top", horizontal = "center";
  return (<Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
    <Alert severity={severity} sx={{ width: "100%" }}>
      <Typography sx={{ fontSize: 14 }}>{text}</Typography>
      {/* {text} */}
    </Alert>
  </Snackbar>)
}