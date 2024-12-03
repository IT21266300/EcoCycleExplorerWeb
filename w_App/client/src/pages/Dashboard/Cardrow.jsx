/* eslint-disable no-unused-vars */
import React from "react";
import Box from "@mui/material/Box";
import CardComponent from "../../components/homecard/HomeCard";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";

const cardData = [
  {
    title: "Total Customers",
    amount: 120,
    icon: <GroupIcon />,
  },
  {
    title: "Total Sales",
    amount: 234,
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Total Profit",
    amount: "$456",
    icon: <AttachMoneyIcon />,
  },
  {
    title: "Out of Stock",
    amount: 56,
    icon: <InventoryIcon />,
  },
];

const CardRow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "15px",
        justifyContent: "space-between",
        flexWrap: "wrap",
        margin: "12px",
      }}
    >
      {cardData.map((data, index) => (
        <CardComponent
          key={index}
          title={data.title}
          amount={data.amount}
          icon={data.icon}
          backgroundColor={data.backgroundColor}
        />
      ))}
    </Box>
  );
};

export default CardRow;




// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import CardComponent from "./CardComponent";
// import axios from "axios";

// const CardRow = () => {
//   const [cardData, setCardData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://your-api-endpoint/cards");
//         setCardData(response.data); // Expecting an array of card data from the API
//       } catch (error) {
//         console.error("Error fetching card data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: "16px",
//         justifyContent: "space-between",
//         flexWrap: "wrap",
//         margin: "16px",
//       }}
//     >
//       {cardData.map((data, index) => (
//         <CardComponent
//           key={index}
//           title={data.title}
//           amount={data.amount}
//           icon={data.icon} // Icons can also be fetched from the backend
//           backgroundColor={data.backgroundColor}
//         />
//       ))}
//     </Box>
//   );
// };

// export default CardRow;
