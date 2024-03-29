// ApplicationInfoForm.js

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import { canadianProvinces } from "@utils/constants";

const ApplicationInfoForm = ({
    formData,
    handleFieldChange,
    isSmallScreen,
    errors
}) => {
    return (
        <Box mt={"20px"}>
            <Box mb={"20px"}>
                <Typography fontSize={20} fontWeight={700}>
                    {"1. Application Info"}
                </Typography>
            </Box>

            <Box
                sx={{
                    // This applies to all immediate children of the Box component
                    "& > *": {
                        mb: 2
                    }
                }}
            >
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
                            First name*
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].firstName}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.firstName`,
                                    e.target.value
                                )
                            }
                            error={errors?.firstName ? true : false}
                            helperText={errors?.firstName}
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
                            Last name*
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].lastName}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.lastName`,
                                    e.target.value
                                )
                            }
                            error={errors?.lastName ? true : false}
                            helperText={errors?.lastName}
                        />
                    </FormControl>
                </Stack>

                <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
                    {/* DOB main tenant */}
                    <Stack flex={1} direction={"column"}>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d"
                                }}
                            >
                                Date of birth*
                            </FormHelperText>
                        </FormControl>
                        <DatePicker
                            defaultValue={dayjs(formData.tenants[0].dob)}
                            onChange={(newValue) =>
                                handleFieldChange(
                                    `tenants.0.dob`,
                                    newValue ? newValue.format() : ""
                                )
                            }
                            error={errors?.dob ? true : false}
                            disableFuture
                        />
                    </Stack>
                    <FormControl sx={{ flex: 1 }} fullWidth>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d"
                            }}
                        >
                            Phone number*
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].phoneNumber}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.phoneNumber`,
                                    e.target.value
                                )
                            }
                            error={errors?.phoneNumber ? true : false}
                            helperText={errors?.phoneNumber}
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
                            Email address*
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].email}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.email`,
                                    e.target.value
                                )
                            }
                            error={errors?.email ? true : false}
                            helperText={errors?.email}
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
                            Driver license # - not required
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            value={formData.tenants[0].driverLicense}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.driverLicense`,
                                    e.target.value
                                )
                            }
                            // error={errors?.driverLicense ? true : false}
                            // helperText={errors?.driverLicense}
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
                            Province*
                        </FormHelperText>
                        <Select
                            required
                            id="province"
                            value={formData.tenants[0].province}
                            onChange={(e) =>
                                handleFieldChange(
                                    `tenants.0.province`,
                                    e.target.value
                                )
                            }
                            variant="outlined"
                            color="info"
                            error={errors?.province ? true : false}
                        >
                            {canadianProvinces.map((province, index) => (
                                <MenuItem key={index} value={province}>
                                    {province}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* DOB main tenant */}
                    <Stack flex={1} direction={"column"}>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d"
                                }}
                            >
                                Desired move-in date*
                            </FormHelperText>
                        </FormControl>
                        <DatePicker
                            defaultValue={dayjs(formData.tenants[0].dob)}
                            onChange={(newValue) =>
                                handleFieldChange(
                                    `tenants.0.moveInDate`,
                                    newValue ? newValue.format() : ""
                                )
                            }
                            error={errors?.moveInDate ? true : false}
                            disablePast
                        />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

export default ApplicationInfoForm;
