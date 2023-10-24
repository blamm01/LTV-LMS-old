import { AppBar, Box, Toolbar } from "@mui/material";
import ltv_banner from "../assets/icons/ltv_banner.svg";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { blueTheme } from "../themes";
import { Dashboard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Sidebar_Routes } from "../routes";

function SidebarListItem({
  id,
  linkTo,
  text,
  index,
  setSelectedItem,
  selectedItem,
  theme,
  navigate,
  icon
}) {
  function handleClick() {
    setSelectedItem(index);
    navigate(linkTo);
  }

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton
        onClick={handleClick}
        sx={{ height: 56 }}
        selected={selectedItem === index}
      >
        <ListItemIcon
          sx={{
            color:
              selectedItem !== index
                ? null
                : theme.palette.primary.constractText,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default function Sidebar({
  handleDrawerToggle,
  container,
  drawerWidth,
  mobileOpen,
}) {
  const [selectedItem, setSelectedItem] = useState(-1);
  const theme = useTheme(blueTheme);
  const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar>
        <img src={ltv_banner} alt="" />
      </Toolbar>
      <Divider />
      <List>
        {Sidebar_Routes.map((obj, index) => (
          <SidebarListItem
            theme={theme}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            index={index}
            id={obj.id}
            linkTo={obj.linkTo}
            text={obj.text}
            key={obj.id}
            navigate={navigate}
            icon={obj.icon}
          />
        ))}
      </List>
    </div>
  );

  return (
    <Box id="sidebarContainer">
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: "black",
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
