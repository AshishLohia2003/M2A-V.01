import { Box, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import { useContext } from "react";
import Header from "../../components/Header";
import { SupabaseContext } from "../../context/supabaseContext2";
import Machine from "../../components/machine"
import Machineinfo from "../../components/machine_info";
import { LimitContext } from "../../context/limitContext";




const Machine_Profile2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { selectedMachine, selectedMachineReadings, machine1Readings, machine2Readings, machine3Readings, machine4Readings, machine5Readings, machine6Readings, machine7Readings, machine8Readings, machine9Readings, machine10Readings, machine11Readings } = useContext(SupabaseContext);
    const { voltageLimit, temperatureLimit, moistureLimit, currentLimit, frequencyLimit, oeeLimit, performanceLimit, powerLimit } = useContext(LimitContext);

    const checkIfExceedsLimit = (machineReadings) => {
        const { Voltage, Temperature, Moisture, Power, Performance, Current, Frequency, OEE } = machineReadings;

        if (
            Voltage > voltageLimit ||
            Temperature > temperatureLimit ||
            Moisture > moistureLimit ||
            Power > powerLimit ||
            Performance < performanceLimit ||
            Current > currentLimit ||
            Frequency > frequencyLimit ||
            OEE < oeeLimit
        ) {
            return colors.redAccent[500];
        }

        return colors.greenAccent[700];
    };


    if (!selectedMachine || !selectedMachineReadings || !machine1Readings || !machine2Readings || !machine3Readings || !machine4Readings || !machine5Readings || !machine6Readings || !machine7Readings || !machine8Readings || !machine9Readings || !machine10Readings || !machine11Readings) {
        return (
            <Box my="30px" mx="20px" display="grid" gap="10px">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rectangular" height="40vh" />
                <Skeleton variant="rounded" height="30vh" />
            </Box>
        );
    }
    return (<>

        <Box m="20px">
            {/* HEADER */}
            <Box
                textAlign="center"
                my="10px"
            >
                <Header title="Machine Profile" />
            </Box>



            {/* Grid */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(6, 1fr)"
                gridTemplateRows="140px"
                gap="20px"
            >

                {/* Machine_images */}
                <Box
                    display="flex"
                    overflow="auto"
                    whiteSpace="nowrap"
                    gridColumn="span 6"
                    gridRow="span 3"
                >
                    <Machine
                        status={machine1Readings.Status}
                        color={(machine1Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine1Readings))}
                        id="Machine_1"
                        to="Machine"
                    />
                    <Machine
                        status={machine2Readings.Status}
                        color={(machine2Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine2Readings))}
                        id="Machine_2"
                        to="Machine"
                    />
                    <Machine
                        status={machine3Readings.Status}
                        color={(machine3Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine3Readings))}
                        id="Machine_3"
                        to="Machine"
                    />
                    <Machine
                        status={machine4Readings.Status}
                        color={(machine4Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine4Readings))}
                        id="Machine_4"
                        to="Machine"
                    />
                    <Machine
                        status={machine5Readings.Status}
                        color={(machine5Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine5Readings))}
                        id="Machine_5"
                        to="Machine"
                    />
                    <Machine
                        status={machine6Readings.Status}
                        color={(machine6Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine6Readings))}
                        id="Machine_6"
                        to="Machine"
                    />
                    <Machine
                        status={machine7Readings.Status}
                        color={(machine7Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine7Readings))}
                        id="Machine_7"
                        to="Machine"
                    />
                    <Machine
                        status={machine8Readings.Status}
                        color={(machine8Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine8Readings))}
                        id="Machine_8"
                        to="Machine"
                    />
                    <Machine
                        status={machine9Readings.Status}
                        color={(machine9Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine9Readings))}
                        id="Machine_9"
                        to="Machine"
                    />
                    <Machine
                        status={machine10Readings.Status}
                        color={(machine10Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine10Readings))}
                        id="Machine_10"
                        to="Machine"
                    />
                    <Machine
                        status={machine11Readings.Status}
                        color={(machine11Readings.Status === "Offline") ? (colors.grey[500]) : (checkIfExceedsLimit(machine11Readings))}
                        id="Machine_11"
                        to="Machine"
                    />
                </Box>


                {/* Machine Info  */}
                <Box
                    gridColumn="span 6"
                    id="Machine"
                >
                    <Machineinfo
                        voltage={(selectedMachineReadings.Voltage) + "V"}
                        temperature={(selectedMachineReadings.Temperature) + "℃"}
                        current={(selectedMachineReadings.Current) + "A"}
                        power={(selectedMachineReadings.Power) + "W"}
                        performance={(selectedMachineReadings.Performance) + "%"}
                        frequency={(selectedMachineReadings.Frequency) + "hz"}
                        moisture={(selectedMachineReadings.Moisture) + "%"}
                        oee={(selectedMachineReadings.OEE) + "%"}
                    />
                </Box>
            </Box>
        </Box>
    </>
    );
};

export default Machine_Profile2;