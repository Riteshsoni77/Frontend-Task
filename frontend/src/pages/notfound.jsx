import React from "react";
import { Box, Typography } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
    </Box>
  );
}

export default NotFound;