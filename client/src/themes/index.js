import { createTheme } from "@mui/material/styles";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: "#0D47A1",
            constractText: "#fff",
            hover: "#305dac"
        },
    },
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                      backgroundColor: "#0D47A1",
                      color: "#fff"
                    },
                    "&.Mui-selected:hover": {
                        color: "white",
                        backgroundColor: "#305dac"
                    }
                }
            }
        }
    }
})