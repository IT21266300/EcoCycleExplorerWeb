import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import axios, { Axios } from "axios";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

export default function AddDestination() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/destination/add", {
        destination,
        description,
        latitude,
        longitude,
      });
      toast.success("New data has been created successfully!", {
        position: "bottom-right",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("err", { position: "bottom-right" });
    }
  };

  return (
    <Box width="100%" sx={{ padding: "2rem" }}>
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
            name="destination"
            label="Location Name"
            variant="outlined"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <Typography>Location</Typography>
          <Box sx={{display: 'flex', gap: '5rem'}}>
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
              <Typography>Latitude</Typography>
              <TextField
                id="outlined-basic"
                label="Latitude"
                variant="outlined"
                name="latitude"
                value={latitude}
                onChange={(e) => {
                  setLatitude(e.target.value);
                }}
              />
            </Box>
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
              <Typography>Longitude</Typography>
              <TextField
                id="outlined-basic"
                label="Longitude"
                variant="outlined"
                name="longitude"
                value={longitude}
                onChange={(e) => {
                  setLongitude(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
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
          <Typography>Description</Typography>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={5}
            width="100%"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={submitHandler}>
            Upload Location
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
