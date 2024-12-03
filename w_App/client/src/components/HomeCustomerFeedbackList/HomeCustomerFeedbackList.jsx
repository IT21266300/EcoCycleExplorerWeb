/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const CustomerFeedbackList = () => {
  // Sample data for customer messages
  const [selectedMessage, setSelectedMessage] = useState(null);
  const customerMessages = [
    {
      id: 1,
      name: "John Doe",
      time: "2 hours ago",
      message: "The product quality is excellent! I’m very satisfied.",
      icon: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 2,
      name: "Jane Smith",
      time: "4 hours ago",
      message: "I had an issue with delivery, but customer support resolved it quickly.",
      icon: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 3,
      name: "Emily Brown",
      time: "1 day ago",
      message: "Great service! Highly recommend to everyone.",
      icon: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 4,
      name: "Michael Johnson",
      time: "2 days ago",
      message: "The website is easy to use, and the checkout process was smooth.",
      icon: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 5,
      name: "Sarah Connor",
      time: "3 days ago",
      message: "Exceptional customer support! Thank you.",
      icon: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 6,
      name: "John Wick",
      time: "4 days ago",
      message: "Amazing experience! Will definitely recommend.",
      icon: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 7,
      name: "Anna White",
      time: "5 days ago",
      message: "The website was smooth to navigate, and the support team is great!",
      icon: "https://picsum.photos/seed/picsum/200/300",
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
        Customer Feedbacks
      </Typography>

      {/* Scrollable List */}
      <Box
        sx={{
          flex: 1, 
          overflow: "auto",
          maxHeight: "70vh",
          padding: "8px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <List>
          {customerMessages.map((customer) => (
            <ListItem
              key={customer.id}
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
              onClick={() => setSelectedMessage(customer)}
            >
              <ListItemAvatar>
                <Avatar src={customer.icon} alt={customer.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {customer.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      {customer.time}
                    </Typography>
                  </Box>
                }
                secondary={customer.message}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Message Dialog */}
      {selectedMessage && (
        <Dialog
          open={Boolean(selectedMessage)}
          onClose={() => setSelectedMessage(null)}
          aria-labelledby="customer-feedback-dialog"
        >
          <DialogTitle id="customer-feedback-dialog">{selectedMessage.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Message:</strong> {selectedMessage.message}
            </DialogContentText>
            <DialogContentText>
              <strong>Time:</strong> {selectedMessage.time}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedMessage(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CustomerFeedbackList;
