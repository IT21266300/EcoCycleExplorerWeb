/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample data
const incomeData = {
  January: {
    week1: [100, 120, 90, 140, 100, 80, 70],
    week2: [80, 90, 70, 100, 120, 110, 95],
    week3: [110, 100, 130, 120, 115, 90, 85],
    week4: [100, 120, 110, 100, 80, 95, 90],
  },
  February: {
    week1: [90, 110, 80, 120, 100, 90, 85],
    week2: [80, 100, 90, 110, 120, 130, 95],
    week3: [100, 110, 100, 90, 85, 95, 110],
    week4: [120, 130, 110, 100, 90, 100, 105],
  },
};

const MonthlyProgress = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedWeek, setSelectedWeek] = useState("week1");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Income",
        data: incomeData[selectedMonth][selectedWeek],
        backgroundColor: "#68CE8F",
        borderColor: "#04bd4e",
        borderWidth: 1,
        hoverBackgroundColor: "#037a34",
        barThickness: 40,
        maxBarThickness: 50, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#04bd4e",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#000" },
      },
      y: {
        grid: { drawBorder: false, color: "#ccc" },
        ticks: { beginAtZero: true, stepSize: 20, color: "#000" },
      },
    },
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: "#000",
          fontWeight: "bold",
        }}
      >
        Monthly Progress
      </Typography>

      {/* Dropdowns */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#04bd4e" }}>Select Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{
              backgroundColor: "#f6f6f6",
              color: "#000",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#04bd4e",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#037a34",
              },
            }}
          >
            {Object.keys(incomeData).map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel sx={{ color: "#04bd4e" }}>Select Week</InputLabel>
          <Select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            sx={{
              backgroundColor: "#f6f6f6",
              color: "#000",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#04bd4e",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#037a34",
              },
            }}
          >
            {["week1", "week2", "week3", "week4"].map((week) => (
              <MenuItem key={week} value={week}>
                {week.charAt(0).toUpperCase() + week.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Bar Chart */}
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default MonthlyProgress;
