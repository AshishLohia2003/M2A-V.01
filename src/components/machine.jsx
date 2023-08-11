import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { tokens } from "../theme";
import machine from "../assets/Flour machine.png"
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from "react-scroll";
import { SupabaseContext } from "../context/supabaseContext2";

const Machine = ({ status, id, to, color }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { handleMachineSelect } = useContext(SupabaseContext);


    return (
        <Box
            textAlign="center"
            mx="10px"
            position="relative"
        >
            <Box
                position="absolute"
                top="120px"
                left="100px"
            >
                <Link
                    to={to}
                    smooth={true}
                    offset={-200}
                    duration={500}
                >
                    <IconButton
                        onClick={() => handleMachineSelect(id)}
                        sx={{
                            border: "2px solid",
                            color: {color}
                        }}
                    >
                        <CircleIcon fontSize="large" />

                    </IconButton>

                </Link>
            </Box>
            <img src={machine} alt="Machine_bg" />
            <Box

                color={colors.grey[100]}
                position="absolute"
                bottom="5px"
                width="100%"
                display='flex'
                justifyContent="center"
            >
                <Typography variant="h3"
                    backgroundColor={color}
                    p="10px"
                    fontWeight="900"
                    borderRadius="5px"
                    width="60%"
                >
                    {status}
                </Typography>
            </Box>
            <Box

                color="#d8d9ed"
                position="absolute"
                bottom="133px"
                width="100%"
                display='flex'
                justifyContent="center"
            >
                <Typography variant="h3"
                >
                    {id}
                </Typography>
            </Box>
        </Box>
    );
}

export default Machine;
