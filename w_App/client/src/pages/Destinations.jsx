import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Destinations() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" sx={{ background: "#04bd4e" }} onClick={()=> navigate('/addDestination')}>
          Add New Destination
        </Button>
        <Box>

        </Box>
      </Box>
    </Box>
  );
}
