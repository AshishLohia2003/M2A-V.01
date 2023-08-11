import { Box, IconButton, Typography, useTheme, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import { mockPieData3 as data, mockLineData, mockLineData2 } from "../../data/mockData";
import BarChart from "../../components/BarChart";

const dropdown_1 = [{ id: 1, name: 'Machine 1' }, { id: 2, name: 'Machine 2' }, { id: 3, name: 'Machine 3' }];

const Downtime = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [view_1, setView_1] = useState("1");
  const [view_2, setView_2] = useState("monthly");


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Downtime" />
      </Box>

      {/* SEARCH BAR */}
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" mb="25px">
          <FormControl variant="filled" sx={{ minWidth: 220, backgroundColor: colors.primary[500] }}>
            <InputLabel>Machine_ID</InputLabel>
            <Select
              value={view_1}
              label="View_1"
              onChange={(e) => setView_1(e.target.value)}
            >
              {dropdown_1.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box ml="10px">
            <FormControl variant="filled" sx={{ minWidth: 220, backgroundColor: colors.primary[500] }}>
              <InputLabel>Timeframe</InputLabel>
              <Select
                value={view_2}
                label="View_2"
                onChange={(e) => setView_2(e.target.value)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box ml="10px">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>
      </Box>



      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Downtime
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                40hrs
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data_1={(view_2 === "monthly") ? mockLineData2 : mockLineData} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="10px"
        >
          <Typography variant="h5" fontWeight="600">
            Downtime Reason
          </Typography>
          <PieChart data={data} />
        </Box>

  

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Heat Dissipation
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data_1={(view_2 === "monthly") ? mockLineData : mockLineData2} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="10px"
        >
          <Typography variant="h5" fontWeight="600">
            MTTR
          </Typography>
          <Box height="100%">
            <BarChart />
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default Downtime;