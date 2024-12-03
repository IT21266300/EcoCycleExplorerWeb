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

const HotelList = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Sample data for hotels
  const hotels = [
    {
      id: 1,
      name: "The Grand Resort",
      rating: 4.5,
      monthlyVisits: 1200,
      benefits: "$5,000",
      rechargePercentage: "10%",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 2,
      name: "Luxury Stay Hotel",
      rating: 4.8,
      monthlyVisits: 950,
      benefits: "$3,800",
      rechargePercentage: "8%",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 3,
      name: "City Center Inn",
      rating: 4.2,
      monthlyVisits: 800,
      benefits: "$2,500",
      rechargePercentage: "12%",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 4,
      name: "Hilltop Villa",
      rating: 4.7,
      monthlyVisits: 700,
      benefits: "$4,200",
      rechargePercentage: "15%",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 5,
      name: "Seaside Retreat",
      rating: 4.3,
      monthlyVisits: 600,
      benefits: "$3,000",
      rechargePercentage: "5%",
      image: "https://picsum.photos/seed/picsum/200/300",
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
        Top Visiting Hotels
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
          {hotels.map((hotel) => (
            <ListItem
              key={hotel.id}
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
              onClick={() => setSelectedHotel(hotel)}
            >
              <ListItemAvatar>
                <Avatar
                  src={hotel.image}
                  alt={hotel.name}
                  sx={{ width: 60, height: 60, borderRadius: "8px" }}
                />
              </ListItemAvatar>
              <ListItemText sx={{marginLeft:"15px"}}
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {hotel.name}
                    </Typography>
                    <Rating
                      name="hotel-rating"
                      value={hotel.rating}
                      precision={0.1}
                      readOnly
                      sx={{ fontSize: "16px" }}
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Monthly Visits: {hotel.monthlyVisits}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Our Benefits: {hotel.benefits}
                    </Typography>
                    
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Hotel Details Dialog */}
      {selectedHotel && (
        <Dialog
          open={Boolean(selectedHotel)}
          onClose={() => setSelectedHotel(null)}
          aria-labelledby="hotel-details-dialog"
        >
          <DialogTitle id="hotel-details-dialog">{selectedHotel.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Rating:</strong> {selectedHotel.rating} ⭐
            </DialogContentText>
            <DialogContentText>
              <strong>Monthly Visits:</strong> {selectedHotel.monthlyVisits}
            </DialogContentText>
            <DialogContentText>
              <strong>Our Benefits:</strong> {selectedHotel.benefits}
            </DialogContentText>
            <DialogContentText>
              <strong>Recharge on Bill:</strong> {selectedHotel.rechargePercentage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedHotel(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default HotelList;
