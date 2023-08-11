import { Box, Button, useTheme, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function SearchBar({ data_1 }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [view_1, setView_1] = useState("1");
    const [view_2, setView_2] = useState("daily");


    return (
        <Box display="flex" alignItems="center" mb="25px">
            {/* <FormControl variant="filled" sx={{ minWidth: 220, backgroundColor: colors.primary[500] }}>
                <InputLabel>Machine_ID</InputLabel>
                <Select
                    value={view_1}
                    label="View"
                    onChange={(e) => setView_1(e.target.value)}
                >
                    {data_1.map((item, id) => (
                        <MenuItem value={id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            <Box mx="10px">
                <FormControl variant="filled" sx={{ minWidth: 220, backgroundColor: colors.primary[500] }}>
                    <InputLabel>Timeframe</InputLabel>
                    <Select
                        value={view_2}
                        label="View"
                        onChange={(e) => setView_2(e.target.value)}
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        {/* <MenuItem value="weekly">Weekly</MenuItem> */}
                        <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
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
    );
}
