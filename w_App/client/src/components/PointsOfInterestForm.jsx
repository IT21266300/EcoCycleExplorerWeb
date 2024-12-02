import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Material-UI styling
const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    maxWidth: "400px",
  },
  submitButton: {
    alignSelf: "flex-start",
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
}));

const PointsOfInterestForm = ({ onAddPOI }) => {
  const classes = useStyles();

  const [poi, setPoi] = useState({
    name: "",
    type: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoi((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input
    if (!poi.name || !poi.type || !poi.lat || !poi.lng) {
      alert("Please fill out all fields.");
      return;
    }

    // Pass the POI data back to the parent component
    onAddPOI(poi);

    // Reset form
    setPoi({
      name: "",
      type: "",
      lat: "",
      lng: "",
    });
  };

  return (
    <Box className={classes.formContainer}>
      <Typography variant="h6">Add Point of Interest</Typography>

      <TextField
        name="name"
        label="Name"
        variant="outlined"
        value={poi.name}
        onChange={handleChange}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          name="type"
          value={poi.type}
          onChange={handleChange}
        >
          <MenuItem value="Restaurant">Restaurant</MenuItem>
          <MenuItem value="Hotel">Hotel</MenuItem>
          <MenuItem value="Washroom">Washroom</MenuItem>
          <MenuItem value="Bicycle Repair">Bicycle Repair</MenuItem>
          <MenuItem value="View Point">View Point</MenuItem>
          <MenuItem value="Special Place">Special Place</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="lat"
        label="Latitude"
        variant="outlined"
        value={poi.lat}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        name="lng"
        label="Longitude"
        variant="outlined"
        value={poi.lng}
        onChange={handleChange}
        fullWidth
      />

      <Button
        variant="contained"
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        Add POI
      </Button>
    </Box>
  );
};

// PropTypes Validation
PointsOfInterestForm.propTypes = {
  onAddPOI: PropTypes.func.isRequired,
};

export default PointsOfInterestForm;
