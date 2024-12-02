import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Sidebar from "./components/sidebar/Sidebar";
import AppBarComponent from "./components/appbar/Appbar";
import Home from "./pages/Dashboard/home";
import SignIn from "./pages/SignIn";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const App = () => {
  const [open, setOpen] = React.useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
                <Sidebar open={open} handleDrawerClose={handleDrawerClose} handleLogout={handleLogout} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <DrawerHeader />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Home />} />
                  </Routes>
                </Box>
              </Box>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
