import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function RoutePlanner() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: "16px" }}>
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
          Route Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
          }}
        >
          Manage routes efficiently.
        </Typography>
      </Box>
    </Container>
  );
}
