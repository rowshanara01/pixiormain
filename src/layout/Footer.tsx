import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "white",
        textAlign: "center",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
