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
import { ListItem, MenuItem, Select, TextareaAutosize } from "@mui/material";
import { canadianProvinces } from "@utils/constants";
const RentalHistoryForm = ({ formData, handleFieldChange, isSmallScreen }) => {
    const handleCreateAddress = (index) => {
        handleFieldChange(`tenants.0.addresses.${index}.streetNo`, "");
        handleFieldChange(`tenants.0.addresses.${index}.streetName`, "");
        handleFieldChange(`tenants.0.addresses.${index}.city`, "");
        handleFieldChange(`tenants.0.addresses.${index}.province`, "");
        handleFieldChange(`tenants.0.addresses.${index}.postalCode`, "");
        handleFieldChange(`tenants.0.addresses.${index}.since`, "");
        handleFieldChange(`tenants.0.addresses.${index}.to`, "");

        handleFieldChange(`tenants.0.addresses.${index}.paysRent`, false);
        handleFieldChange(`tenants.0.addresses.${index}.hasGivenNotice`, false);
        handleFieldChange(
            `tenants.0.addresses.${index}.hasBeenAskedToLeave`,
            false
        );
        handleFieldChange(`tenants.0.addresses.${index}.reasonForLeaving`, "");

        handleFieldChange(
            `tenants.0.addresses.${index}.landlord.firstName`,
            ""
        );
        handleFieldChange(`tenants.0.addresses.${index}.landlord.lastName`, "");
        handleFieldChange(`tenants.0.addresses.${index}.landlord.phone`, "");
        handleFieldChange(`tenants.0.addresses.${index}.landlord.email`, "");
    };
    return (
        <Box mt={"60px"}>
            <Box mb={"20px"}>
                <Typography fontSize={20} fontWeight={700}>
                    {"2. Rental History"}
                </Typography>
                <ListItem>
                    Please list your addresses in order, starting with your
                    current one and going back up to two years ago.
                </ListItem>
            </Box>

            <Box>
                {formData.tenants[0].addresses.length > 0 ? (
                    formData.tenants[0].addresses.map((address, index) => (
                        <Box marginTop={8} key={index}>
                            <Box
                                sx={{
                                    // This applies to all immediate children of the Box component
                                    "& > *": {
                                        mb: 2
                                    }
                                }}
                                marginBottom={2}
                            >
                                <Typography fontSize={15} fontWeight={700}>
                                    {`ADDRESS ${index + 1}`}
                                </Typography>

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
                                            No.*
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`street-no-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.streetNo}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.streetNo`,
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
                                            Street Name*
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`street-name-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.streetName}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.streetName`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
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
                                            City*
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`city-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.city}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.city`,
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
                                            Province*
                                        </FormHelperText>
                                        <Select
                                            required
                                            id="province"
                                            value={address.province}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.province`,
                                                    e.target.value
                                                )
                                            }
                                            variant="outlined"
                                            color="info"
                                        >
                                            {canadianProvinces.map(
                                                (province, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={province}
                                                    >
                                                        {province}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
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
                                        Postal Code*
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id={`postal-code-${index}`}
                                        color="info"
                                        variant="outlined"
                                        value={address.postalCode}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.addresses.${index}.postalCode`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>

                                <Stack
                                    direction={isSmallScreen ? "column" : "row"}
                                    gap={4}
                                    marginTop={2}
                                >
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
                                                Since*
                                            </FormHelperText>
                                        </FormControl>
                                        <DatePicker
                                            defaultValue={dayjs(address.since)}
                                            onChange={(newValue) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.since`,
                                                    newValue
                                                        ? newValue.format()
                                                        : ""
                                                )
                                            }
                                        />
                                    </Stack>
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
                                                To*
                                            </FormHelperText>
                                        </FormControl>
                                        <DatePicker
                                            defaultValue={dayjs(address.to)}
                                            onChange={(newValue) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.to`,
                                                    newValue
                                                        ? newValue.format()
                                                        : ""
                                                )
                                            }
                                        />
                                    </Stack>
                                </Stack>

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
                                            Have you given notice?*
                                        </FormHelperText>
                                        <Select
                                            required
                                            id={`notice-${index}`}
                                            value={
                                                address.hasGivenNotice
                                                    ? "Yes"
                                                    : "No"
                                            }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.hasGivenNotice`,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
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
                                            Have you been asked to leave?*
                                        </FormHelperText>
                                        <Select
                                            required
                                            id={`askedToLeave-${index}`}
                                            value={
                                                address.hasBeenAskedToLeave
                                                    ? "Yes"
                                                    : "No"
                                            }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.hasBeenAskedToLeave`,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
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
                                        Reason for leaving this property (limit:
                                        200 characters)*
                                    </FormHelperText>
                                    <TextareaAutosize
                                        minRows={5}
                                        required
                                        placeholder="Write description"
                                        color="info"
                                        style={{
                                            background: "transparent",
                                            border: "1px solid rgb(220, 221, 222)",
                                            borderRadius: 6,
                                            padding: 10
                                        }}
                                        value={address.reasonForLeaving}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.addresses.${index}.reasonForLeaving`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                            </Box>
                            <Box
                                sx={{
                                    // This applies to all immediate children of the Box component
                                    "& > *": {
                                        mb: 2
                                    }
                                }}
                                marginBottom={5}
                            >
                                <Typography fontSize={15} fontWeight={700}>
                                    {`LANDLORD ${index + 1}`}
                                </Typography>

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
                                            First Name*
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`landlord-firstname-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.landlord.firstName}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.landlord.firstName`,
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
                                            Last Name*
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`landlord-lastname-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.landlord.lastName}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.landlord.lastName`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                </Stack>

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
                                            Email
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`landlord-email-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.landlord.email}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.landlord.email`,
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
                                            Phone number*
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id={`landlord-phonenumber-${index}`}
                                            color="info"
                                            variant="outlined"
                                            value={address.landlord.phone}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.addresses.${index}.landlord.phone`,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <Box mt={"28px"}>
                                        <CustomButton
                                            title={"Delete this address"}
                                            backgroundColor="#e84747"
                                            color="#FCFCFC"
                                            fullWidth
                                            icon={<Delete />}
                                            handleClick={() => {
                                                handleDeleteAddress(index);
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <div>(There is no address!)</div>
                )}
                <Box>
                    <CustomButton
                        title={"Add another address"}
                        backgroundColor="#40cf38"
                        color="#FCFCFC"
                        icon={<Add />}
                        handleClick={() => {
                            handleCreateAddress(
                                formData.tenants[0].addresses.length
                            );
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default RentalHistoryForm;
