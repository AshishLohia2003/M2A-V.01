import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme"
import { Link } from "react-router-dom";


const StatBox2 = ({ title, subtitle, icon, to }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box back
            width="100%" height="100%" display="grid" alignContent="center"
        >
            {/* 
            <Box p="20px">
                {icon}
            </Box> */}

            <Box display="flex" justifyContent="center">
                <Typography
                    fontSize="50px"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                    border="2px solid"
                    borderColor={colors.greenAccent[500]}
                    borderRadius="50%"
                    px="10px"
                >
                    {title}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt="2px">
                <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
                    {subtitle}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" mt="20px" width="100%">
                <Link to="/records2">
                    <Button variant="outlined" onClick={to}
                        sx={{ color: colors.greenAccent[500] }}
                    >
                        Load More...
                    </Button>
                </Link>
            </Box>

        </Box>
    );
};

export default StatBox2;
