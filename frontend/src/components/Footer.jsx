import React from "react";
import { Box, Typography, IconButton, Input } from "@mui/joy";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  const [isDarkTheme, SetIsDarkTheme] = React.useState(false);

  return (
    <Box
      sx={{
        padding: 0.7,
      }}
    >
      <Box
        sx={{
          width: "65%",
          margin: "0 auto",
          maxWidth: "1200px",
          "@media (max-width: 1200px)": {
            width: "80%",
          },
          "@media (max-width: 992px)": {
            width: "85%",
          },
          "@media (max-width: 768px)": {
            width: "90%",
          },
          "@media (max-width: 576px)": {
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "0 18px",
            alignItems: "center",
            gap: { xs: 3, md: 2 }, // More gap on small screens
            justifyContent: { xs: "center", md: "flex-start" }, // Center icons on small screens
            "& .MuiIconButton-root": {
              transition: "0.5s ease",
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        >
          <IconButton
            variant="soft"
            onClick={() => {
              SetIsDarkTheme((prevState) => !prevState);
            }}
          >
            <ColorLensRoundedIcon />
          </IconButton>

          {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <IconButton variant="soft">
              <FacebookRoundedIcon />
            </IconButton>
          </a> */}
          <a href="https://github.com/geroarmani" target="_blank" rel="noopener noreferrer">
            <IconButton variant="soft">
              <GitHubIcon />
            </IconButton>
          </a>
          <a href="https://www.instagram.com/grigoroww_" target="_blank" rel="noopener noreferrer">
            <IconButton variant="soft">
              <InstagramIcon />
            </IconButton>
          </a>

          <Input
            variant="soft"
            placeholder="Type in your email"
            type="email"
            name="email"
            endDecorator={
              <IconButton variant="soft" aria-label="subscribe">
                <SendIcon />
              </IconButton>
            }
            sx={{
              width: "35%",
              ml: "auto",
              display: { xs: "none", md: "flex", height: "1em" },
            }}
          />
        </Box>

        <Typography
          level="body2"
          textAlign="center"
          sx={{ fontWeight: 600, height: "auto", fontSize: "14px", color: "white", margin: "10px 0 4.4px 0" }}
        >
          &copy; 2024 Concept | Designed by Gerasim
        </Typography>
      </Box>
    </Box>
  );
}
