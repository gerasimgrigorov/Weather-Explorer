import React from "react";
import { Box, Typography, Divider, IconButton, Input } from "@mui/joy";
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
        bgcolor: "rgba(235, 235, 235, 0.6)",
        padding: 0.7,
        borderTop: "1px solid",
        borderColor: "divider",
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
            gap: 2,
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
            size="sm"
            onClick={() => {
              SetIsDarkTheme((prevState) => !prevState);
            }}
          >
            <ColorLensRoundedIcon fontSize="small" />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton variant="plain">
            <FacebookRoundedIcon />
          </IconButton>
          <IconButton variant="plain">
            <GitHubIcon />
          </IconButton>
          <IconButton variant="plain">
            <InstagramIcon />
          </IconButton>
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
        <Divider sx={{ my: 0.7 }} />
        <Typography level="body2" textAlign="center" sx={{ fontWeight: 600, height: "auto", fontSize: "14px" }}>
          &copy; 2024 | Designed by Gerasim
        </Typography>
      </Box>
    </Box>
  );
}
