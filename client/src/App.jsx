import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./styles/global.css";
import { ThemeProvider } from "@mui/material";
import { blueTheme } from "./themes";

export default function App() {
  return (
    <>
      <ThemeProvider theme={blueTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
