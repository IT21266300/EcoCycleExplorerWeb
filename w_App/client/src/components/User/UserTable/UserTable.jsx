/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

// Table headers (columns)
const UserTable = () => {
  const navigate = useNavigate();

  const handleMoreClick = (user) => {
    navigate(`/user-management/profile/${user.id}`);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} sx={{ width: 45, height: 45, marginTop: "3px" }} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      renderCell: (params) => (
        <Typography sx={{ fontWeight: "bold", color: "#333", marginTop: "15px" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "More",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleMoreClick(params.row)}
        >
          More
        </Button>
      ),
    },
  ];

  // Sample data
  const rows = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "123-456-7890",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Jane Smith",
      email: "janesmith@example.com",
      mobile: "987-654-3210",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      name: "Alice Johnson",
      email: "alicej@example.com",
      mobile: "555-666-7777",
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%", padding: 3, backgroundColor: "#fff", borderRadius: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: "#333",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f5f5f5",
          },
          border: "none",
        }}
      />
    </Box>
  );
};

export default UserTable;
