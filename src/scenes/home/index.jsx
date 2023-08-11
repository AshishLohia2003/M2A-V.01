import { Box, Typography, useTheme, Skeleton } from "@mui/material";
import { tokens } from "../../theme";
import { React, useContext } from "react";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import Header from "../../components/Header";
import StatBox2 from "../../components/StatBox2";
import { SupabaseContext } from "../../context/supabaseContext2";

const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { weightReadings } = useContext(SupabaseContext);

    if (!weightReadings) {
        return (
            <Box my="30px" mx="20px" display="grid" gap="10px">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rectangular" height="40vh" />
                <Skeleton variant="rounded" height="30vh" />
            </Box>
        );
    }

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Home" />
            </Box>


            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                gridTemplateRows="repeat(3, 1fr)"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <Box width="100%" py="20px" m="0px 20px" height='100%'>
                        <Box>
                            <Box>
                                <BusinessOutlinedIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    fontSize="5rem"
                                    fontWeight="bold"
                                    sx={{ color: colors.grey[100] }}
                                >
                                    {weightReadings?.Production}
                                </Typography>
                            </Box>
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
                                Production
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <Box width="100%" py="20px" m="0px 20px" height='100%'>
                        <Box>
                            <Box>
                                <TrendingDownOutlinedIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    fontSize="5rem"
                                    fontWeight="bold"
                                    sx={{ color: colors.grey[100] }}
                                >
                                    {weightReadings?.Downtime}
                                </Typography>
                            </Box>
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
                                Downtime
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['5kg']}
                        subtitle="5 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['10kg']}
                        subtitle="10 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['15kg']}
                        subtitle="15 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['20kg']}
                        subtitle="20 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['26kg']}
                        subtitle="26 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['30kg']}
                        subtitle="30 kg"
                    />
                </Box>
                <Box
                    gridColumn="span 1"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                >
                    <StatBox2
                        title={weightReadings?.['50kg']}
                        subtitle="50 kg"
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default Home;
