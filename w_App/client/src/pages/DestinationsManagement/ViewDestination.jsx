// import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../../assets/images/sigiriya.jpg";
import emptyImage from "../../assets/images/empty.jpg";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MapIcon from "@mui/icons-material/Map";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { toast } from "react-toastify";
import PointingMap from "../../components/Destinations/PointingMap";

export default function ViewDestination() {
  const { destinationId } = useParams(); // Extract `destinationId` from the URL
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/destination/${destinationId}`
        );
        setDestination(response.data.destination); // Update state with fetched destination
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchDestination();
  }, [destinationId]); // Fetch data whenever `destinationId` changes

  // Debugging: Log destination when it changes
  useEffect(() => {
    console.log("Updated destination:", destination);
  }, [destination]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!destination) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  const handleDelete = async () => {
    try {
      axios.delete(
        `http://localhost:5000/api/destination/deleteDestination/${destinationId}`
      );
      toast.success("Data successfully deleted!", {
        position: "bottom-right",
      });
      navigate("/destinations");
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
      });
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingY: "16px" }}>
      {/* Title Section */}
      <Typography variant="h4" gutterBottom>
        {destination.destination}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        <strong>Colombo, Sri Lanka</strong> | {destination.latitude},
        {destination.longitude} | Adventure, Culture/Nature, Popular
      </Typography>

      <Box sx={{ width: "100%", display: "flex", gap: "3rem" }}>
        {/* Image Gallery */}
        <Grid container spacing={2} sx={{ marginY: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={emptyImage} // Replace with actual image path
                alt="Main image"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={emptyImage} // Replace with actual image path
                    alt="Image 1"
                  />
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={emptyImage} // Replace with actual image path
                    alt="Image 2"
                  />
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={emptyImage} // Replace with actual image path
                    alt="Image 3"
                  />
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={emptyImage} // Replace with actual image path
                    alt="Image 4"
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-side Pricing Section */}
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            padding: 3,
            minWidth: 400,
            maxWidth: 600,
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">Sigiriya, Sri Lanka</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Kandy to Anuradhapura
              </Typography>
            </Box>
            <IconButton sx={{ color: "#04bd4e" }} size="large">
              <MyLocationIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ marginY: 2 }}>
            {destination.latitude}, {destination.longitude}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trip code: AHBB
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            Valid on Mar 28 2023
          </Typography>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDelete}
          >
            Remove Location
          </Button>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginTop: 2, display: "block" }}
          >
            Save 15% – Select Departures Jan 31 – Oct 31, 2023
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Expires in 3 days | Promo Code: G23GAV015ADV04
          </Typography>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ marginTop: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.3rem",
          }}
        >
          <Typography variant="h6">About the Destination</Typography>
          <IconButton>
            <VolumeUpIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          textAlign={"justify"}
          sx={{ fontStyle: "italic" }}
        >
          {destination.description}
        </Typography>
      </Box>
      <Box sx={{marginTop: 5}}>
        <Typography variant="h6">Map Location</Typography>
        <PointingMap
          passedLongitude={destination.longitude}
          passedLatitude={destination.latitude}
        />
      </Box>
    </Container>
  );
}
