import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
const VehicleForm = ({ formData, handleFieldChange, isSmallScreen }) => {
    return (
        <div>
            <Box mt={"60px"}>
                <Typography fontSize={20} fontWeight={700}>
                    {"4. Vehicle Info"}
                </Typography>
            </Box>
            <Box
                sx={{
                    // This applies to all immediate children of the Box component
                    "& > *": {
                        mb: 2
                    }
                }}
                marginBottom={2}
            >
                <Stack
                    direction={isSmallScreen ? "column" : "row"}
                    gap={4}
                    marginTop={2}
                >
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d"
                            }}
                        >
                            Make
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].carModel.make}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.carModel.make`,
                                    e.target.value
                                )
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d"
                            }}
                        >
                            Model
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].carModel.model}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.carModel.model`,
                                    e.target.value
                                )
                            }
                        />
                    </FormControl>
                </Stack>

                <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                    {/* DOB main tenant */}
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d"
                            }}
                        >
                            Color
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].carModel.color}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.carModel.color`,
                                    e.target.value
                                )
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d"
                            }}
                        >
                            License plate#
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].carModel.licensePlate}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.carModel.licensePlate`,
                                    e.target.value
                                )
                            }
                        />
                    </FormControl>
                </Stack>
            </Box>
        </div>
    );
};

export default VehicleForm;
