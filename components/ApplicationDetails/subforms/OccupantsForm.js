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
const OccupantsForm = ({
    formData,
    setFormData,
    handleFieldChange,
    isSmallScreen,
    errors
}) => {
    const handleCreateOccupant = (index) => {
        handleFieldChange(`tenants.0.occupants.${index}.name`, "");
        handleFieldChange(`tenants.0.occupants.${index}.dob`, "");
        handleFieldChange(
            `tenants.0.occupants.${index}.relationToApplicant`,
            ""
        );
    };

    const handleDeleteOccupant = (index) => {
        const updatedFormData = { ...formData };
        if (!updatedFormData.tenants) {
            updatedFormData.tenants = [];
        }
        if (updatedFormData._id === undefined) {
            updatedFormData._id = "";
        }
        updatedFormData.tenants[0].occupants.splice(index, 1);
        setFormData(updatedFormData);
    };
    const handleDeleteAddress = (index) => {
        const updatedFormData = { ...formData };
        if (!updatedFormData.tenants) {
            updatedFormData.tenants = [];
        }
        if (updatedFormData._id === undefined) {
            updatedFormData._id = "";
        }
        updatedFormData.tenants[0].addresses.splice(index, 1);
        setFormData(updatedFormData);
    };
    return (
        <div>
            <Box mt={"60px"}>
                <Typography fontSize={20} fontWeight={700}>
                    {"3. Other Occupants"}
                </Typography>
            </Box>
            <div>
                {formData.tenants[0].occupants.length > 0 ? (
                    formData.tenants[0].occupants.map((occupant, index) => (
                        <div key={index}>
                            <Box
                                sx={{
                                    // This applies to all immediate children of the Box component
                                    "& > *": {
                                        mb: 2
                                    }
                                }}
                                key={index}
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
                                            Occupant {index + 1}
                                            &apos;s full name
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`tenant-name-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={occupant.name}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.occupants.${index}.name`,
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                errors[index]?.name
                                                    ? true
                                                    : false
                                            }
                                            helperText={errors[index]?.name}
                                        />
                                    </FormControl>
                                    <Stack flex={1} direction="column">
                                        <FormControl>
                                            <FormHelperText
                                                sx={{
                                                    fontWeight: 500,
                                                    margin: "10px 0",
                                                    fontSize: 16,
                                                    color: "#11142d"
                                                }}
                                            >
                                                Date of birth
                                            </FormHelperText>
                                        </FormControl>
                                        <DatePicker
                                            defaultValue={dayjs(occupant.dob)}
                                            onChange={(newValue) =>
                                                handleFieldChange(
                                                    `tenants.0.occupants.${index}.dob`,
                                                    newValue
                                                        ? newValue.format()
                                                        : ""
                                                )
                                            }
                                            error={
                                                errors[index]?.dob
                                                    ? true
                                                    : false
                                            }
                                            disableFuture
                                        />
                                    </Stack>
                                </Stack>

                                <Stack
                                    direction={isSmallScreen ? "column" : "row"}
                                    gap={4}
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
                                            Relation to main tenant
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`relation-to-main-tenant-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={occupant.relationToApplicant}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.occupants.${index}.relationToApplicant`,
                                                    e.target.value
                                                )
                                            }
                                            error={
                                                errors[index]
                                                    ?.relationToApplicant
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors[index]
                                                    ?.relationToApplicant
                                            }
                                        />
                                    </FormControl>
                                    <Box mt={"28px"}>
                                        <CustomButton
                                            title={"Delete occupant"}
                                            backgroundColor="#e84747"
                                            color="#FCFCFC"
                                            fullWidth
                                            icon={<Delete />}
                                            handleClick={() => {
                                                handleDeleteOccupant(index);
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Box>
                        </div>
                    ))
                ) : (
                    <div>
                        (Please include all occupants that will reside in the
                        apartment. Please click the button below to add other
                        occupants!)
                    </div>
                )}
            </div>
            <Box marginTop={3}>
                <CustomButton
                    title={"Add occupant"}
                    backgroundColor="#40cf38"
                    color="#FCFCFC"
                    icon={<Add />}
                    handleClick={() => {
                        handleCreateOccupant(
                            formData.tenants[0].occupants.length
                        );
                    }}
                />
            </Box>
        </div>
    );
};

export default OccupantsForm;
