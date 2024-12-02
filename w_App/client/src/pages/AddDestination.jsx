import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addDoc,collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';


export default function AddDestination() {

  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("")

  const desCollection = collection(db, "destinations");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(desCollection, {locationName: locationName, latitude: latitude, longitude: longitude, description: description});
      alert("Tourist Destination added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Typography variant="h4" sx={{ fontSize: "1.6rem" }}>
          Add New Destination
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "2rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <Typography sx={{ fontSize: "1rem" }}>Location Name</Typography>
          <TextField
            name="locationName"
            label="Location Name"
            variant="outlined"
            value={locationName}
            onChange={(e) => {setLocationName(e.target.value)}}
          />
        </Box>
        <Box>
          <Typography>Location</Typography>
          <Box>
            <Typography>Latitude</Typography>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="latitude"
              value={latitude}
              onChange={(e) => {setLatitude(e.target.value)}}
            />
          </Box>
          <Box>
            <Typography>Longitude</Typography>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="longitude"
              value={longitude}
              onChange={(e) => {setLongitude(e.target.value)}}
            />
          </Box>
          <Box>
            <Typography>Description</Typography>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              width="100%"
              name="description"
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
            />
          </Box>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleSubmit}>Upload Location</Button>
        </Box>
      </Box>
    </Box>
  );
}
