import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-sidebar .pro-menu": {
          padding: "0px !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.greenAccent[400]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.greenAccent[400]} !important`,
          borderLeft: "5px solid #4ae4a4 !important",
          borderRadius: "5px",
          backgroundColor: `${colors.grey[600]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isNonMobile ? isCollapsed : !isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}  
            icon={isNonMobile ? (isCollapsed ? <MenuOutlinedIcon /> : undefined) : (!isCollapsed ? <MenuOutlinedIcon /> : undefined)}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}

          >
            {(isNonMobile ? !isCollapsed : isCollapsed) && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Flour Mill
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {(isNonMobile ? !isCollapsed : isCollapsed) && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="150px"
                  src={`../../assets/logo.png`}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          )}



          <Box paddingLeft={isNonMobile ? undefined : (isCollapsed ? undefined : "0%")}>
            {(isNonMobile ? !isCollapsed : isCollapsed) && (
              <Typography
                variant="h6"
                color={colors.grey[400]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Dashboard
              </Typography>
            )}
            <Item
              title="Home"
              to="/home"
              icon={<HomeWorkOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Overview"
              to="/dashboard"
              icon={<DesktopWindowsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Item
              title="Records"
              to="/records"
              icon={<StorageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            {(isNonMobile ? !isCollapsed : isCollapsed) && (
              <Typography
                variant="h6"
                color={colors.grey[400]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Monitoring
              </Typography>

            )}
            <Item
              title="Machine Profile"
              to="/machine2"
              icon={<StackedBarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Downtime"
              to="/downtime"
              icon={<TrendingDownOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box >
  );
};

export default Sidebar;
