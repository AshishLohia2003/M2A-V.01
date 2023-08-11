import { Box, Skeleton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SupabaseContext } from "../../context/supabaseContext2";
import { useContext } from "react";

const Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    machine1Readings,
    machine2Readings,
    machine3Readings,
    machine4Readings,
    machine5Readings,
    machine6Readings,
    machine7Readings,
    machine8Readings,
    machine9Readings,
    machine10Readings,
    machine11Readings,
  } = useContext(SupabaseContext);
  const machines = [
    { machineName: 'Machine 1', readings: machine1Readings },
    { machineName: 'Machine 2', readings: machine2Readings },
    { machineName: 'Machine 3', readings: machine3Readings },
    { machineName: 'Machine 4', readings: machine4Readings },
    { machineName: 'Machine 5', readings: machine5Readings },
    { machineName: 'Machine 6', readings: machine6Readings },
    { machineName: 'Machine 7', readings: machine7Readings },
    { machineName: 'Machine 8', readings: machine8Readings },
    { machineName: 'Machine 9', readings: machine9Readings },
    { machineName: 'Machine 10', readings: machine10Readings },
    { machineName: 'Machine 11', readings: machine11Readings },
  ];

  const transformedRows = machines.map((machine) => ({
    id: machine.machineName,
    Voltage: machine.readings?.Voltage,
    Temperature: machine.readings?.Temperature,
    Current: machine.readings?.Current,
    Moisture: machine.readings?.Moisture,
    Frequency: machine.readings?.Frequency,
    Power: machine.readings?.Power,
    Performance: machine.readings?.Performance,
    Power: machine.readings?.Power,
    OEE: machine.readings?.OEE,
    Rejection: machine.readings?.Rejection,
    Status: machine.readings?.Status,
  }));


  const columns = [
    { field: "id", headerName: "Name", flex: 1 },
    { field: "Voltage", headerName: "Voltage", flex:1 },
    {
      field: "Temperature",
      headerName: "Temperature",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      headerAlign: "left",
      align: "left",
      
    },
    {
      field: "Performance",
      headerName: "Performance",
      flex: 1,
    },
    {
      field: "OEE",
      headerName: "OEE",
      flex: 1,
    },
    {
      field: "Current",
      headerName: "Current",
      flex: 1,
    },
    {
      field: "Moisture",
      headerName: "Moisture",
      flex: 1,
    },
    {
      field: "Power",
      headerName: "Power",
      flex: 1,
    },
    {
      field: "Rejection",
      headerName: "Rejection",
      flex: 1,
    },
    {
      field: "Frequency",
      headerName: "Frequency",
      flex: 1,
    },
  ];

  if ( !machine1Readings || !machine2Readings || !machine3Readings || !machine4Readings || !machine5Readings || !machine6Readings || !machine7Readings || !machine8Readings || !machine9Readings || !machine10Readings || !machine11Readings) {
    return (
        <Box my="30px" mx="20px" display="grid" gap="10px" overflow="hidden">
            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
            <Skeleton  variant="rounded" height="60vh" />
        </Box>
    );
}

  
  return (
    <Box m="20px"
    >
      <Header
        title="Records"
      />
      <Box
        m="40px 0 0 0"
        height='75vh'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transformedRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Records;
