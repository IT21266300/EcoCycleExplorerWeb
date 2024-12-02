/* eslint-disable no-unused-vars */
import React from "react";
import { Typography, Box } from "@mui/material";
import CardRow from "./Cardrow";

export default function Home() {
  return (
    <Box
      sx={{
        width: "92vw",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "16px",
      }}
    >
      {/* Welcome Message */}
      <Box sx={{ marginBottom: "24px", textAlign: "start",marginLeft:"10px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Welcome to Your Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
          }}
        >
          Here's an overview of your key metrics. Stay updated with your data!
        </Typography>
      </Box>

      {/* Card Row */}
      <CardRow />
    </Box>
  );
}
