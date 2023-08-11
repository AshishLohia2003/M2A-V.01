import { Box, IconButton, useTheme, Typography, Badge } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import supabase2 from "../../supabase2";

const Topbar = ({ token, setToken }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  let navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase2.auth.signOut();
    if (!error) {
      sessionStorage.removeItem("token");
      setToken(false);
      navigate("/");
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[400]}
    >
      {/* Title */}
      <Box display="flex" alignItems="center">
        <Typography variant="h5" color={colors.grey[100]}>
          Dashboard
        </Typography>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* <Box
          display="flex"
          backgroundColor={colors.primary[300]}
          borderRadius="5px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box> */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <Badge  color="error" variant="dot" >
          <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleLogout}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
