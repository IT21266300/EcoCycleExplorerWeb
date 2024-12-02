import React, { useState } from "react";
import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Material-UI styling
const useStyles = makeStyles(() => ({
  mapContainer: {
    position: "relative",
    height: "500px",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
  },
  controlPanel: {
    marginTop: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  resetButton: {
    backgroundColor: "#ff4c4c",
    color: "white",
    "&:hover": {
      backgroundColor: "#e60000",
    },
  },
}));

const MapComponent = () => {
  const classes = useStyles();

  const [markers, setMarkers] = useState([]);
  const [polylinePath, setPolylinePath] = useState([]);
  const [mapCenter] = useState({ lat: 7.8731, lng: 80.7718 }); // Sri Lanka's approximate center

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your API key
  });

  if (!isLoaded) return <Typography>Loading Map...</Typography>;

  const handleMapClick = (e) => {
    const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkers((prev) => [...prev, newPoint]);
    setPolylinePath((prev) => [...prev, newPoint]);
  };

  const handleReset = () => {
    setMarkers([]);
    setPolylinePath([]);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Route Designer
      </Typography>

      <Box className={classes.mapContainer}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={mapCenter}
          zoom={8}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
          <Polyline path={polylinePath} options={{ strokeColor: "#FF0000", strokeWeight: 2 }} />
        </GoogleMap>
      </Box>

      <Box className={classes.controlPanel}>
        <Typography variant="h6">Control Panel</Typography>
        <Button variant="contained" onClick={handleReset} className={classes.resetButton}>
          Reset Route
        </Button>
      </Box>
    </Box>
  );
};

export default MapComponent;
