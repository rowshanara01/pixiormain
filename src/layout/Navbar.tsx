import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import { Container } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "none",
        color: "black",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-nunito)",
            }}
          >
            <FilterCenterFocusIcon sx={{ color: "var(--primary-color)" }} />
            Pix<span className="text-[var(--primary-color)]">or</span>
          </Typography>
          <Button
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              "&:hover": { opacity: "0.8" },
              textTransform: "capitalize",
              fontWeight: "semibold",
              fontFamily: "var(--font-nunito)",
            }}
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
