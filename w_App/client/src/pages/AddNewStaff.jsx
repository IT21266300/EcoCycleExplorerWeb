import React, { useState } from "react";
import {
  ThemeProvider,
  Grid,
  CssBaseline,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signUp } from "../api/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: "#04bd4e",
    },
  },
});

const AddNewStaff = () => {
  const [name, setName] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!name || !employeeType || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      const data = await signUp(name, employeeType, email, password); // Call API
      setSuccess("Staff member added successfully");
      setError("");

      // Clear form fields
      setName("");
      setEmployeeType("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage =
        err.message || "Failed to add staff member. Please try again.";
      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ minHeight: "100vh", width: "100vw" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Staff
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="employeeType-label">Employee Type</InputLabel>
                <Select
                  labelId="employeeType-label"
                  id="employeeType"
                  value={employeeType}
                  label="Employee Type"
                  onChange={(e) => setEmployeeType(e.target.value)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="staff member">Staff Member</MenuItem>
                  <MenuItem value="medical officer">Medical Officer</MenuItem>
                  <MenuItem value="support staff">Support Staff</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="success.main" variant="body2">
                  {success}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Staff
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AddNewStaff;
