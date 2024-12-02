/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardComponent = ({ title, amount, icon, backgroundColor = "#f5f5f5" }) => {
  return (
    <Box
      sx={{
        backgroundColor,
        color: "#000",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width:"300px",
        minWidth: "180px",
        height: "120px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        sx={{
          fontSize: "40px",
          color: "#04bd4e",
          marginBottom: "8px",
          padding:"5px",
          scale:"2"
          
        }}
      >
        {icon}
      </Box>
      <Box sx={{flexDirection:"column"}}> 
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "medium" }}>
        {amount}
      </Typography>
      </Box>
    </Box>
  );
};

export default CardComponent;
