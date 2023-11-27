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
import { useNavigate } from "react-router-dom";
import { APP_ROUTES, routes } from "../routes";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useCurrentPath } from "../hooks/useCurrentPath";

// activeItem: APP_ROUTES (key) NOT VALUE
// eg: teachers teachers/head_classes

function SidebarListItem({
  id,
  appRouteLinkTo,
  text,
  icon,
  children,
  activeItem,
  setActiveItem
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const currentPath = useCurrentPath();
  const currentPathId = (Object.keys(APP_ROUTES).find(v => APP_ROUTES[v] == currentPath) || "").toLowerCase();

  let isParentSelected = activeItem == appRouteLinkTo ||  activeItem.startsWith(id);
  const parentHasChildren = children.length > 0;

  function handleParentClick() {
    if(!parentHasChildren) navigate(APP_ROUTES[appRouteLinkTo.toUpperCase()])
    setActiveItem(activeItem == id || activeItem.startsWith(id) || currentPathId.startsWith(id) ? currentPathId : id)
  }

  function handleChildrenClick(childAppRouteLinkTo) {
    const linkTo = APP_ROUTES[childAppRouteLinkTo.toUpperCase()]
    navigate(linkTo)
    setActiveItem(childAppRouteLinkTo)
    console.log('navigated to', linkTo)
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
        selected={isParentSelected}
      >
        <ListItemIcon
          sx={{
            color:
              !isParentSelected
                ? null
                : theme.palette.primary.constractText,
            minWidth: 48,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} disableTypography={true} />
        {parentHasChildren ? (
          !isParentSelected ? (
            <ExpandMore />
          ) : (
            <ExpandLess />
          )
        ) : null}
      </ListItemButton>
      {parentHasChildren ? (
        <Collapse in={isParentSelected} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.filter(v => !v?.hideInSidebar).map((v, i) => {
              return (
                <ListItemButton
                  key={v.appRouteLinkTo}
                  selected={activeItem == v.appRouteLinkTo}
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
                  onClick={() => handleChildrenClick(v.appRouteLinkTo)}
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
  const navigate = useNavigate();
  const currentPath = useCurrentPath();
  const currentPathId = (Object.keys(APP_ROUTES).find(v => APP_ROUTES[v] == currentPath) || "").toLowerCase();

  const [activeItem, setActiveItem] = useState(currentPathId);

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
        {routes.filter(v => !v?.hideInSidebar).map((obj) => (
          <SidebarListItem
            key={obj.id}
            id={obj.id}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            appRouteLinkTo={obj.appRouteLinkTo}
            text={obj.text}
            icon={obj.icon}
            children={obj?.children?.length > 0 ? obj.children : []}
            currentPathId={currentPathId}
            mainReRenderedActiveItem={activeItem}
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
