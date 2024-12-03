/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import UserTable from "../../components/User/UserTable/UserTable";

const UserManagement = () => {
  return (
    <Container maxWidth="xl" sx={{ paddingY: "16px" }}>
      {/* Page Header */}
      <Box
        sx={{
          marginBottom: "24px",
          textAlign: "start",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          User Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
          }}
        >
          Manage users and their roles efficiently.
        </Typography>
      </Box>

      {/* User Table */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "70vw",
        }}
      >
        <UserTable />
      </Box>
    </Container>
  );
};

export default UserManagement;
