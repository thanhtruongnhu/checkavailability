import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
const EmergencyContactForm = ({
    formData,
    handleFieldChange,
    isSmallScreen
}) => {
    return (
        <Box
            sx={{
                // This applies to all immediate children of the Box component
                "& > *": {
                    mb: 2
                }
            }}
        >
            <Box mt={"60px"} mb={"20px"}>
                <Typography fontSize={20} fontWeight={700}>
                    {"8. Emergency Contact"}
                </Typography>
            </Box>
            <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                        sx={{
                            fontWeight: 500,
                            margin: "10px 0",
                            fontSize: 16,
                            color: "#11142d"
                        }}
                    >
                        Full name
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={formData.tenants[0].emergencyContact.name}
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.emergencyContact.name`,
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
                        Relation to applicant
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={
                            formData.tenants[0].emergencyContact.relationship
                        }
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.emergencyContact.relationship`,
                                e.target.value
                            )
                        }
                    />
                </FormControl>
            </Stack>

            <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                <FormControl sx={{ flex: 1 }} fullWidth>
                    <FormHelperText
                        sx={{
                            fontWeight: 500,
                            margin: "10px 0",
                            fontSize: 16,
                            color: "#11142d"
                        }}
                    >
                        Email address
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={formData.tenants[0].emergencyContact.email}
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.emergencyContact.email`,
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
                        Phone number
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={formData.tenants[0].emergencyContact.phoneNumber}
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.emergencyContact.phoneNumber`,
                                e.target.value
                            )
                        }
                    />
                </FormControl>
            </Stack>
        </Box>
    );
};

export default EmergencyContactForm;
