import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Sidebar from "./components/sidebar/Sidebar";
import AppBarComponent from "./components/appbar/Appbar";
import Home from "./pages/Dashboard/home";
import SignIn from "./pages/SignIn";
import AddDestination from "./pages/AddDestination";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Destinations from "./pages/Destinations";
import NewStaff from "./pages/AddNewStaff"

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
              <Box sx={{ display: "flex", width: '100%' }}>
                <ToastContainer />
                <CssBaseline />
                <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
                <Sidebar open={open} handleDrawerClose={handleDrawerClose} handleLogout={handleLogout} />
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: 3 }}>
                  <DrawerHeader />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/addDestination" element={<AddDestination />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/addNewStaff" element={<NewStaff />} />
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
