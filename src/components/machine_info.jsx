import { React, useContext } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { SupabaseContext } from "../context/supabaseContext2";
import { LimitContext } from "../context/limitContext";
import { toast } from "react-toastify";
import addNotification from "react-push-notification";
import useMediaQuery from "@mui/material/useMediaQuery";


const Machine_info = ({
    voltage,
    temperature,
    moisture,
    current,
    frequency,
    oee,
    performance,
    power,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

    const notify2 = (parameter, machineName) => {
        const navigate = useNavigate(); 
        addNotification({
            title: 'Warning',
            subtitle: 'This is a subtitle',
            message: `${parameter} of ${machineName} reached the limit`,
            native: true,
            duration: 50000,
            image: 'https://i0.wp.com/made2automate.com/wp-content/uploads/2023/03/cropped-cropped-cropped-Untitled-design-2023-03-27T165416.581.png?w=261&ssl=1e', // Replace with the URL of your custom image
            style: {
                backgroundColor: colors.redAccent[500], // Customize background color
                text: {
                    color: colors.grey[100], // Customize text color
                },
            },
            onClick: () => {
                // Redirect the user to /machine2 when they click on the notification
                navigate('/machine2');
            },
        });
    };
    const notify = (parameter, machineName) => {
        toast.error(`${parameter} of ${machineName} reached the limit`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };
    const {
        selectedMachine,
        handleMachineSelect,
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
    const {
        voltageLimit,
        temperatureLimit,
        moistureLimit,
        currentLimit,
        frequencyLimit,
        oeeLimit,
        performanceLimit,
        powerLimit,
    } = useContext(LimitContext);
    const machineReadingsMap = {
        Machine_1: machine1Readings,
        Machine_2: machine2Readings,
        Machine_3: machine3Readings,
        Machine_4: machine4Readings,
        Machine_5: machine5Readings,
        Machine_6: machine6Readings,
        Machine_7: machine7Readings,
        Machine_8: machine8Readings,
        Machine_9: machine9Readings,
        Machine_10: machine10Readings,
        Machine_11: machine11Readings,
    };

    const getAlertColor = (reading1, reading2) =>
        reading1 > reading2 ? colors.redAccent[500] : colors.greenAccent[500];
    const checkIfExceedsLimit = (machineReadings, machineName) => {

        const {
            Voltage,
            Temperature,
            Moisture,
            Power,
            Performance,
            Current,
            Frequency,
            OEE,
        } = machineReadings;
        if (parseInt(Voltage) > voltageLimit) {
            notify("Voltage", machineName);
            notify2("Voltage", machineName);
        }
        if (parseInt(Temperature) > temperatureLimit) {
            notify("Temperature", machineName);
            notify2("Temperature", machineName);
        }
        if (parseInt(Power) > powerLimit) {
            notify("Power", machineName);
            notify2("Power", machineName);
        }
        if (parseInt(Moisture) > moistureLimit) {
            notify("Moisture", machineName);
            notify2("Moisture", machineName);
        }
        if (parseInt(Performance) < performanceLimit) {
            notify("Performance", machineName);
            notify2("Performance", machineName);
        }
        if (parseInt(Current) > currentLimit) {
            notify("Current", machineName);
            notify2("Current", machineName);
        }
        if (parseInt(Frequency) > frequencyLimit) {
            notify("Frequency", machineName);
            notify2("Frequency", machineName);
        }
        if (parseInt(OEE) < oeeLimit) {
            notify("OEE", machineName);
            notify2("OEE", machineName);
        }
        if (
            parseInt(Voltage) > voltageLimit ||
            parseInt(Temperature) > temperatureLimit ||
            parseInt(Moisture) > moistureLimit ||
            parseInt(Power) > powerLimit ||
            parseInt(Performance) < performanceLimit ||
            parseInt(Current) > currentLimit ||
            parseInt(Frequency) > frequencyLimit ||
            parseInt(OEE) < oeeLimit
        ) {
            return colors.redAccent[500];
        }

        return colors.greenAccent[700];


    };

    const selectedMachineReadings = machineReadingsMap[selectedMachine] || {};

    const {
        Voltage,
        Temperature,
        Moisture,
        Power,
        // Rejection,
        Performance,
        Current,
        Frequency,
        OEE,
    } = selectedMachineReadings;

    const alertColors = {
        alertColorVoltage: selectedMachine
            ? getAlertColor(Voltage, voltageLimit)
            : colors.grey[500],
        alertColorTemperature: selectedMachine
            ? getAlertColor(Temperature, temperatureLimit)
            : colors.grey[500],
        alertColorMoisture: selectedMachine
            ? getAlertColor(Moisture, moistureLimit)
            : colors.grey[500],
        alertColorPower: selectedMachine
            ? getAlertColor(Power, powerLimit)
            : colors.grey[500],
        // alertColorRejection: selectedMachine ? getAlertColor(Rejection, rejectionLimit) : colors.grey[500],
        alertColorPerformance: selectedMachine
            ? getAlertColor(performanceLimit, Performance)
            : colors.grey[500],
        alertColorCurrent: selectedMachine
            ? getAlertColor(Current, currentLimit)
            : colors.grey[500],
        alertColorFrequency: selectedMachine
            ? getAlertColor(Frequency, frequencyLimit)
            : colors.grey[500],
        alertColorOEE: selectedMachine
            ? getAlertColor(oeeLimit, OEE)
            : colors.grey[500],
    };

    const {
        alertColorVoltage,
        alertColorTemperature,
        alertColorCurrent,
        alertColorFrequency,
        alertColorMoisture,
        alertColorOEE,
        alertColorPerformance,
        alertColorPower,
    } = alertColors;

    return (
        <Box
            display="grid"
            gridTemplateColumns={isNonMobile ? "2fr repeat(2, 1fr)" : ""}
            // gridTemplateColumns="2fr repeat(2, 1fr)"
            gridTemplateRows="repeat(5, 1fr)"
            overflow="auto"
            whiteSpace="nowrap"
            columnGap="20px"
            border="5px solid"
            borderColor={colors.greenAccent[500]}
            borderRadius="10px"
            py="10px"
        >
            <Box
                gridArea="1 / 1 / 2 / 4"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pb="10px"
                mb="10px"
                borderBottom="5px solid"
                borderColor={colors.greenAccent[500]}
                gap="10px"
            >
                <Typography variant="h1" color={colors.blueAccent[500]}>
                    {" "}
                    {selectedMachine} (
                </Typography>
                <Box display="flex" justifyContent="space-between" gap="10px">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: `${colors.greenAccent[700]}` }}
                    >
                        Online
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: `${colors.redAccent[500]}` }}
                    >
                        Error
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: `${colors.grey[500]}` }}
                    >
                        Offline
                    </Button>
                </Box>
                <Typography variant="h1" color={colors.blueAccent[500]}>
                    )
                </Typography>
            </Box>
            <Box
                gridArea="2 / 1 / 6 / 2"
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gridTemplateRows="repeat(4, 1fr)"
                gap="20px"
            >
                <Box
                    gridArea="1 / 1 / 2 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_1")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine1Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine1Readings, "Machine 1")
                                }`,
                        }}
                    >
                        Machine 1
                    </Button>
                </Box>
                <Box
                    gridArea="1 / 2 / 2 / 3"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_2")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine2Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine2Readings, "Machine 2")
                                }`,
                        }}
                    >
                        Machine 2
                    </Button>
                </Box>
                <Box
                    gridArea="1 / 3 / 2 / 4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_3")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine3Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine3Readings, "Machine 3")
                                }`,
                        }}
                    >
                        Machine 3
                    </Button>
                </Box>
                <Box
                    gridArea="2 / 1 / 3 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_4")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine4Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine4Readings, "Machine 4")
                                }`,
                        }}
                    >
                        Machine 4
                    </Button>
                </Box>
                <Box
                    gridArea="2 / 2 / 3 / 3"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_5")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine5Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine5Readings, "Machine 5")
                                }`,
                        }}
                    >
                        Machine 5
                    </Button>
                </Box>
                <Box
                    gridArea="2 / 3 / 3 / 4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_6")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine6Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine6Readings, "Machine 6")
                                }`,
                        }}
                    >
                        Machine 6
                    </Button>
                </Box>
                <Box
                    gridArea="3 / 1 / 4 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_7")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine7Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine7Readings, "Machine 7")
                                }`,
                        }}
                    >
                        Machine 7
                    </Button>
                </Box>
                <Box
                    gridArea="3 / 2 / 4 / 3"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_8")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine8Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine8Readings, "Machine 8")
                                }`,
                        }}
                    >
                        Machine 8
                    </Button>
                </Box>
                <Box
                    gridArea="3 / 3 / 4 / 4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_9")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine9Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine9Readings, "Machine 9")
                                }`,
                        }}
                    >
                        Machine 9
                    </Button>
                </Box>
                <Box
                    gridArea="4 / 1 / 5 / 2"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_10")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine10Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine10Readings, "Machine 10")
                                }`,
                        }}
                    >
                        Machine 10
                    </Button>
                </Box>
                <Box
                    gridArea="4 / 2 / 5 / 3"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        onClick={() => handleMachineSelect("Machine_11")}
                        variant="contained"
                        sx={{
                            backgroundColor: `${machine11Readings.Status === "Offline"
                                ? colors.grey[500]
                                : checkIfExceedsLimit(machine11Readings, "Machine 11")
                                }`,
                        }}
                    >
                        Machine 11
                    </Button>
                </Box>
                <Box
                    gridArea="4 / 3 / 5 / 4"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* <Button onClick={() => handleMachineSelect('Machine_11')} variant="contained" sx={{ backgroundColor: `${colors.redAccent[500]}` }}>Machine 12</Button> */}
                </Box>
            </Box>
            <Box gridArea="2 / 2 / 3 / 3" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Current : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorCurrent}>
                    {current}
                </Typography>
            </Box>
            <Box gridArea="2 / 3 / 3 / 4" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Voltage : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorVoltage}>
                    {voltage}
                </Typography>
            </Box>
            <Box gridArea="3 / 2 / 4 / 3" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Temperature : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorTemperature}>
                    {temperature}
                </Typography>
            </Box>
            <Box gridArea="3 / 3 / 4 / 4" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Moisture : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorMoisture}>
                    {moisture}
                </Typography>
            </Box>
            <Box gridArea="4 / 2 / 5 / 3" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Power : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorPower}>
                    {power}
                </Typography>
            </Box>
            <Box gridArea="4 / 3 / 5 / 4" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Frequency : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorFrequency}>
                    {frequency}
                </Typography>
            </Box>
            <Box gridArea="5 / 2 / 6 / 3" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    OEE : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorOEE}>
                    {oee}
                </Typography>
            </Box>
            <Box gridArea=" 5 / 3 / 6 / 4" display="flex">
                <Typography variant="h3" color={colors.grey[100]}>
                    Performance : &nbsp;
                </Typography>
                <Typography variant="h3" color={alertColorPerformance}>
                    {performance}
                </Typography>
            </Box>
        </Box>
    );
};

export default Machine_info;
