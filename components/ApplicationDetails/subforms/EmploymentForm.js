import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Add, Delete } from "@mui/icons-material";
import CustomButton from "@components/CustomComponents/CustomButton";
import dayjs from "dayjs";
import { employmentStatuses } from "@utils/constants";
import { ListItem, MenuItem, Select, TextareaAutosize } from "@mui/material";
import { canadianProvinces } from "@utils/constants";
const EmploymentForm = ({ formData, handleFieldChange, isSmallScreen }) => {
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
                    {"5. Employment"}
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
                        Employment status*
                    </FormHelperText>
                    <Select
                        required
                        id="employmentStatus"
                        value={
                            formData.tenants[0].employmentDetails
                                .employmentStatus
                        }
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.employmentStatus`,
                                e.target.value
                            )
                        }
                        variant="outlined"
                        color="info"
                    >
                        {employmentStatuses.map((status, index) => (
                            <MenuItem key={index} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
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
                        Employer*
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={formData.tenants[0].employmentDetails.employer}
                        // onChange={(e) =>
                        //   handleNestedFieldChange("lastName", e.target.value)
                        // }
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.employer`,
                                e.target.value
                            )
                        }
                    />
                </FormControl>
            </Stack>

            <Stack direction={isSmallScreen ? "column" : "row"} gap={4}>
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
                            Since*
                        </FormHelperText>
                    </FormControl>
                    <DatePicker
                        defaultValue={dayjs(
                            formData.tenants[0].employmentDetails.since
                        )}
                        onChange={(newValue) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.since`,
                                newValue ? newValue.format() : ""
                            )
                        }
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
                        Street/City*
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={formData.tenants[0].employmentDetails.streetCity}
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.streetCity`,
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
                        Province*
                    </FormHelperText>
                    <Select
                        required
                        id="outlined-basic"
                        value={formData.tenants[0].employmentDetails.province}
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.province`,
                                e.target.value
                            )
                        }
                        variant="outlined"
                        color="info"
                    >
                        {canadianProvinces.map((province, index) => (
                            <MenuItem key={index} value={province}>
                                {province}
                            </MenuItem>
                        ))}
                    </Select>
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
                        Position/Title*
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={
                            formData.tenants[0].employmentDetails.positionTitle
                        }
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.positionTitle`,
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
                        Work Supervisor full-name*
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={
                            formData.tenants[0].employmentDetails.workSupervisor
                        }
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.workSupervisor`,
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
                        Supervisor&apos;s Phone number*
                    </FormHelperText>
                    <TextField
                        fullWidth
                        required
                        id="outlined-basic"
                        color="info"
                        variant="outlined"
                        value={
                            formData.tenants[0].employmentDetails
                                .workSupervisorPhone
                        }
                        onChange={(e) =>
                            handleFieldChange(
                                `tenants.0.employmentDetails.workSupervisorPhone`,
                                e.target.value
                            )
                        }
                    />
                </FormControl>
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
                    Do you have other sources of income?*
                </FormHelperText>
                <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    color="info"
                    variant="outlined"
                    value={
                        formData.tenants[0].employmentDetails
                            .otherSourcesOfIncome
                    }
                    onChange={(e) =>
                        handleFieldChange(
                            `tenants.0.employmentDetails.otherSourcesOfIncome`,
                            e.target.value
                        )
                    }
                />
            </FormControl>
        </Box>
    );
};

export default EmploymentForm;
