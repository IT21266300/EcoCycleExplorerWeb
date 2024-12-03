/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RouteIcon from "@mui/icons-material/Route";
import HotelIcon from "@mui/icons-material/Hotel";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ open, handleDrawerClose, handleLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Define routes and their respective icons
  const routes = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Route Planner", icon: <RouteIcon />, path: "/route-planner" },
    { text: "Hotel Management", icon: <HotelIcon />, path: "/hotel-management" },
    { text: "Service Management", icon: <EngineeringIcon />, path: "/service-management" },
    { text: "User Management", icon: <PersonIcon />, path: "/user-management" },
    { text: "Admin Management", icon: <AdminPanelSettingsIcon />, path: "/admin-management" },
    { text: "Logout", icon: <AdminPanelSettingsIcon /> },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes.map(({ text, icon }) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }} onClick={() => navigate('/addDestination')}>
            <ListItemButton sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem
        disablePadding
        sx={{
          display: "block",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <ListItemButton onClick={handleLogout} sx={{ justifyContent: "center" }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
