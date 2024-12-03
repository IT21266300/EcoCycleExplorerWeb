import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ActionButton from "../../components/actions/ActionButton";
import { useNavigate } from "react-router-dom";

export default function Destinations() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/destination");

        // Set the destination data correctly
        setDestinations(result.data);

        // Log the destination data to verify
        console.log(result.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "mongoID",
      headerName: "ID",
      flex: 0,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 0.5,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 0.5,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 0.5,
    },
  ];

  columns.push({
    field: "action",
    headerName: "View",
    flex: 0.2,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <Button variant="contained">More ..</Button>
      </Box>
    ),
  });

  let rows = {};

  rows = destinations.map((row, x) => ({
    id: x + 1,
    mongoID: row._id,
    destination: row.destination,
    description: row.description,
    latitude: row.latitude,
    longitude: row.longitude,
  }));

  return (
    <Container maxWidth="xl" sx={{ paddingY: "16px" }}>
      {/* header */}
      <Box
        sx={{
          marginBottom: "24px",
          textAlign: "start",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            Destinations Management
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
            }}
          >
            Manage Destinations Efficiently.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ background: "#04bd4e" }}
            onClick={() => navigate("/addDestination")}
          >
            Add New Destination
          </Button>
        </Box>
      </Box>

      {/* content */}
      <Box>
        {/* table */}

        <Box
          height="100vh"
          width="100%"
          sx={{
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              //   backgroundColor: colorPalette.primary[500],
              //   color: colorPalette.secondary[200],
              // borderBottom: 'none',
            },

            "& .MuiDataGrid-footerContainer": {
              //   backgroundColor: colorPalette.indigo[100],
              //   color: colorPalette.indigo[900],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              //   color: `${colorPalette.primary[500]} !important`,
            },
            display: "flex",
          }}
        >
          <Box width="100%">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    mongoID: false,
                  },
                },
                // sorting: { sortModel: [{field: 'date', sort: 'asc'}]}
              }}
              pageSize={10}
              components={{
                toolbar: () => {
                  return (
                    <GridToolbarContainer
                      style={{
                        justifyContent: "flex-start",
                        padding: "0.4rem",
                      }}
                    >
                      <GridToolbarFilterButton />
                      <GridToolbarQuickFilter />
                    </GridToolbarContainer>
                  );
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
