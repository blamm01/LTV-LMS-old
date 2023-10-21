import { Alert, Snackbar } from "@mui/material";

export default function TopCenterSnackbar({ open, severity, text }) {
    const vertical = 'top', horizontal = 'center';
    return (<Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open}>
        <Alert severity={severity} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>)
}