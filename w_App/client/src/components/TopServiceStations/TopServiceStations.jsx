/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ServiceStationList = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  // Sample data for service stations
  const serviceStations = [
    {
      id: 1,
      name: "Elite Car Wash",
      rating: 4.3,
      monthlyVisits: 500,
      benefits: "$1,200",
      image: "https://picsum.photos/seed/carwash/200/300",
    },
    {
      id: 2,
      name: "Quick Oil Change",
      rating: 4.5,
      monthlyVisits: 350,
      benefits: "$950",
      image: "https://picsum.photos/seed/oilchange/200/300",
    },
    {
      id: 3,
      name: "Tire Plus Station",
      rating: 4.2,
      monthlyVisits: 280,
      benefits: "$750",
      image: "https://picsum.photos/seed/tireplus/200/300",
    },
    {
      id: 4,
      name: "Auto Repair Hub",
      rating: 4.7,
      monthlyVisits: 450,
      benefits: "$1,100",
      image: "https://picsum.photos/seed/autorepair/200/300",
    },
    {
      id: 5,
      name: "Seaside Service Center",
      rating: 4.4,
      monthlyVisits: 600,
      benefits: "$1,500",
      image: "https://picsum.photos/seed/seasideservice/200/300",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%", 
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#333",
        }}
      >
        Top Service Stations
      </Typography>

      {/* Scrollable List */}
      <Box
        sx={{
          flex: 1, // Take available height
          overflow: "auto", // Enable scrolling
          maxHeight: "300px", // Fixed height for the scrollable list
          padding: "8px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <List>
          {serviceStations.map((station) => (
            <ListItem
              key={station.id}
              sx={{
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor: "#f9f9f9",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                  cursor: "pointer",
                },
              }}
              onClick={() => setSelectedStation(station)}
            >
              <ListItemAvatar>
                <Avatar
                  src={station.image}
                  alt={station.name}
                  sx={{ width: 60, height: 60, borderRadius: "8px" }}
                />
              </ListItemAvatar>
              <ListItemText sx={{ marginLeft: "15px" }}
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {station.name}
                    </Typography>
                    <Rating
                      name="station-rating"
                      value={station.rating}
                      precision={0.1}
                      readOnly
                      sx={{ fontSize: "16px" }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Monthly Visits: {station.monthlyVisits}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Benefits: {station.benefits}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Station Details Dialog */}
      {selectedStation && (
        <Dialog
          open={Boolean(selectedStation)}
          onClose={() => setSelectedStation(null)}
          aria-labelledby="station-details-dialog"
        >
          <DialogTitle id="station-details-dialog">{selectedStation.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Rating:</strong> {selectedStation.rating} ⭐
            </DialogContentText>
            <DialogContentText>
              <strong>Monthly Visits:</strong> {selectedStation.monthlyVisits}
            </DialogContentText>
            <DialogContentText>
              <strong>Our Benefits:</strong> {selectedStation.benefits}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedStation(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ServiceStationList;
