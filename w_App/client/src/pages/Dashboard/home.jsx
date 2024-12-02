/* eslint-disable no-unused-vars */
import React from "react";
import { Typography, Box } from "@mui/material";
import CardRow from "./CardRow";
import MonthlyProgress from "../../components/Monthly_pogress_Chart/MonthlyProgressChart";
import CustomerFeedbackList from "../../components/HomeCustomerFeedbackList/HomeCustomerFeedbackList";


export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width:"100%", 
        marginLeft:"",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "16px",
        transition: "all 0.3s ease", 
      }}
    >
      {/* Welcome Message */}
      <Box sx={{ marginBottom: "24px", textAlign: "start", marginLeft: "10px" }}>
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
          Here’s an overview of your key metrics. Stay updated with your data!
        </Typography>
      </Box>

      {/* Card Row */}
      <CardRow />

      {/* Chart Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {/* Left Side: Bar Chart */}
        <Box
          sx={{
            flex: 7, // 70% width
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
            minHeight: "300px",
          }}
        >
          <MonthlyProgress />
        </Box>

      {/* Right Side: Customer Feedbacks */}
      <Box
          sx={{
            flex: 3, // 30% width
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
            minHeight: "300px",
          }}
>
        <CustomerFeedbackList />
      </Box>
      </Box>
    </Box>
  );
}
