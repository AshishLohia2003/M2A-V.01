import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

const Footer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box display="flex" justifyContent="center" p={2} backgroundColor={colors.primary[400]}
        >
            <Box
                display="flex"
                alignItems="center"
            >
                <Typography variant="h5" color={colors.grey[100]} display="flex" alignItems="center" style={{ cursor: "pointer" }}>
                    <CopyrightOutlinedIcon />
                    2023 - Made2Automate. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;