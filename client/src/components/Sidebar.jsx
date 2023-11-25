import { AppBar, Box, Collapse, Toolbar } from "@mui/material";
import ltv_banner from "../assets/icons/ltv_banner.svg";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { blueTheme } from "../themes";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES, routes } from "../routes";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function SidebarListItem({
  appRouteLinkTo,
  text,
  index,
  setSelectedItem,
  selectedItem,
  theme,
  navigate,
  icon,
  children,
  linkNotExists,
  selectedChild,
  setSelectedChild
}) {
  const isParentSelected = selectedItem === index;
  const hasChildren = children.length > 0;

  function handleParentClick() {
    setSelectedItem((selectedItem === index && hasChildren) ? "" : index);
    if (!linkNotExists) navigate(APP_ROUTES[appRouteLinkTo.toUpperCase()]);
  }
  
  function handleChildrenClick(childrenIndex, childrenAppRouteLinkTo) {
    setSelectedChild(`${index}.${childrenIndex}`)
    navigate(APP_ROUTES[childrenAppRouteLinkTo.toUpperCase()])
  }

  return (
    <>
      <ListItemButton
        onClick={handleParentClick}
        sx={{ height: 56,
          "&.Mui-selected": {
            backgroundColor: "#0D47A1",
            color: "#fff",
          },
          "&.Mui-selected:hover": {
              color: "white",
              backgroundColor: "#305dac"
          } }}
        selected={selectedItem === index}
      >
        <ListItemIcon
          sx={{
            color:
              selectedItem !== index
                ? null
                : theme.palette.primary.constractText,
            minWidth: 48,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} disableTypography={true} />
        {hasChildren ? (
          !isParentSelected ? (
            <ExpandMore />
          ) : (
            <ExpandLess />
          )
        ) : null}
      </ListItemButton>
      {hasChildren ? (
        <Collapse in={isParentSelected} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((v, i) => {
              return (
                <ListItemButton
                  key={v.appRouteLinkTo}
                  selected={isParentSelected && selectedChild === `${index}.${i}`}
                  sx={{
                    pl: 6,
                    "&.Mui-selected": {
                      bgcolor: '#BBDEFB',
                      color: '#0D47A1'
                    },
                    "&.Mui-selected:hover": {
                      bgcolor: '#BBDEFB',
                      color: '#0D47A1'
                    }
                  }}
                  onClick={() => handleChildrenClick(i, v.appRouteLinkTo)}
                >
                  <ListItemText disableTypography={true} primary={v.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

export default function Sidebar({
  handleDrawerToggle,
  container,
  drawerWidth,
  mobileOpen,
}) {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedChild, setSelectedChild] = useState("0.0");
  const theme = useTheme(blueTheme);
  const navigate = useNavigate();

  const drawer = (
    <Box>
      <Toolbar>
        <img src={ltv_banner} alt="" />
      </Toolbar>
      <Divider />
      <List
        sx={{
          fontSize: 14,
        }}
      >
        {routes.map((obj, index) => (
          <SidebarListItem
            key={obj.id}
            theme={theme}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            index={index}
            id={obj.id}
            appRouteLinkTo={obj.appRouteLinkTo}
            text={obj.text}
            navigate={navigate}
            icon={obj.icon}
            children={obj?.children?.length > 0 ? obj.children : []}
            linkNotExists={obj?.linkNotExists}
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        ))}
      </List>
    </Box>
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
