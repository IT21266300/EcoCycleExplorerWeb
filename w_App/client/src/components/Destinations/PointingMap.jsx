import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import placeholder from "../../assets/images/placeholder.png";
import { Box } from "@mui/material";

const PointingMap = ({passedLongitude, passedLatitude}) => {
  // States for latitude, longitude, and marker position
  const [latitude, setLatitude] = useState(passedLatitude); // Default latitude
  const [longitude, setLongitude] = useState(passedLongitude); // Default longitude
  const [position, setPosition] = useState([passedLatitude, passedLongitude]); // Marker position

  // Custom icon (optional)
  const customIcon = new L.Icon({
    iconUrl: placeholder,
    iconSize: [38, 38],
    iconAnchor: [38, 38],
    popupAnchor: [-3, -76],
  });

  const handleUpdatePosition = () => {
    if (latitude && longitude) {
      setPosition([parseFloat(latitude), parseFloat(longitude)]);
    } else {
      alert("Please enter valid latitude and longitude.");
    }
  };

  return (
    <Box>
      {/* OpenStreetMap */}
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "500px", width: "100%", borderRadius: '20px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Latitude: {position[0]}, Longitude: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default PointingMap;
