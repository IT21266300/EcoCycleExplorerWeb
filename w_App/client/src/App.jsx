import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Sidebar from "./components/sidebar/Sidebar";
import AppBarComponent from "./components/appbar/Appbar";
import Home from "./pages/Dashboard/home";
import SignIn from "./pages/SignIn";
import UserProfileTesting from "./pages/Profile";
import UserManagement from "./pages/User_Management/UserManagement";
import UserProfile from "./components/User/UserProfile/UserProfile";
import AddDestination from "./pages/AddDestination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Destinations from "./pages/Destinations";
import NewStaff from "./pages/AddNewStaff";
import { useAuth } from "./context/AuthContext";


const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const App = () => {
  const { isLoggedIn, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<SignIn />} />
       

        {/* Protected Routes */}
        {isLoggedIn ? (
          <Route
            path="*"
            element={
              <Box sx={{ display: "flex", width: "100%" }}>
                <CssBaseline />
                <AppBarComponent
                  open={open}
                  handleDrawerOpen={handleDrawerOpen}
                  handleLogout={logout}
                />
                <Sidebar
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                  handleLogout={logout}
                />
                <Box component="main" sx={{ width: "100%", flexGrow: 1, p: 3 }}>
                  <DrawerHeader />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/profile" element={<UserProfileTesting />} /> 
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/user-management/profile/:id" element={<UserProfile />} />
                    <Route path="/addDestination" element={<AddDestination />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/addNewStaff" element={<NewStaff />} />
                  </Routes>
                </Box>
              </Box>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
