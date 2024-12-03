import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { fetchUserProfile } from "../api/user"; 

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(); 
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Failed to load user profile.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Avatar
              alt={user.firstName}
              src={user.profile_pic || ""}
              sx={{ width: 100, height: 100, mx: "auto" }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6">User Details</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>User ID:</strong> {user.userID}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile:</strong> {user.mobile}
              </Typography>
              <Typography variant="body1">
                <strong>Verified User:</strong>{" "}
                {user.isVerifiedUser ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Last Updated:</strong>{" "}
                {new Date(user.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserProfile;
