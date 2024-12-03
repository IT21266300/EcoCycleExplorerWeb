/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

const drawerWidth = 240; // Sidebar width

// Sample user data
const user = {
  image: "https://via.placeholder.com/150",
  name: "John Doe",
  email: "johndoe@example.com",
  mobile: "123-456-7890",
  country: "United States",
};

// Sample rides data
const rides = [
  {
    id: 1,
    start: "New York",
    end: "Boston",
    startDate: "2023-11-20",
    endDate: "2023-11-21",
    distance: "300 miles",
  },
  {
    id: 2,
    start: "San Francisco",
    end: "Los Angeles",
    startDate: "2023-10-15",
    endDate: "2023-10-16",
    distance: "380 miles",
  },
  {
    id: 3,
    start: "Seattle",
    end: "Portland",
    startDate: "2023-09-12",
    endDate: "2023-09-13",
    distance: "170 miles",
  },
];

const handleMoreClick = (ride) => {
  alert(`More details for ride from ${ride.start} to ${ride.end}`);
};

const UserProfile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        transition: "margin-left 0.3s ease",
      }}
    >
      <Container maxWidth="xl" sx={{ paddingY: "16px" }}>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
            width: "80vw",
            position: "relative",
          }}
        >
          {/* Buttons: Delete and Disable User */}
          <Box
            sx={{
              position: "absolute",
              top: "16px",
              right: "16px",
              display: "flex",
              gap: "8px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => alert("Delete User")}
            >
              Delete User
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => alert("Disable User")}
            >
              Disable User
            </Button>
          </Box>

          {/* Left: Profile Image */}
          <Avatar
            src={user.image}
            alt={user.name}
            sx={{
              width: 150,
              height: 150,
              marginBottom: { xs: "16px", md: "0" },
              flexShrink: 0,
            }}
          />

          {/* Right: User Details */}
          <Box
            sx={{
              marginLeft: { md: "50px" },
              textAlign: { xs: "center", md: "left" },
              flexGrow: 1,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
              {user.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Email: {user.email}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Mobile: {user.mobile}
            </Typography>
            <Typography variant="body1">Country: {user.country}</Typography>
          </Box>
        </Box>

        {/* User Rides Section */}
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            User Rides
          </Typography>

          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Destination</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>End Destination</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Distance</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rides.map((ride) => (
                  <TableRow key={ride.id}>
                    <TableCell>{ride.start}</TableCell>
                    <TableCell>{ride.end}</TableCell>
                    <TableCell>{ride.startDate}</TableCell>
                    <TableCell>{ride.endDate}</TableCell>
                    <TableCell>{ride.distance}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleMoreClick(ride)}
                      >
                        More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
