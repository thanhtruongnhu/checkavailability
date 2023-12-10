import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
    Divider,
    Grid,
    List,
    ListItem,
    MenuItem,
    Paper,
    Select,
    TextareaAutosize,
    useMediaQuery
} from "@mui/material";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Add, Delete } from "@mui/icons-material";
import theme from "@components/CustomComponents/theme";
import CustomButton from "@components/CustomComponents/CustomButton";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/router";
import { getSuiteName, proxy } from "@utils/helper";
import { Toaster, toast } from "sonner";

function getCurrentDateAsString() {
    const currentDate = new Date();
    return currentDate.toString();
}

const canadianProvinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon"
];

const employmentStatuses = [
    "Full-time",
    "Part-time",
    "Unemployed",
    "Student",
    "Retired"
];

const ApplicationDetails = ({ data }) => {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [uploadedFile, setUploadedFile] = useState(null);

    const initialPropertyDetails = {
        tenants: [
            {
                firstName: "",
                lastName: "",
                dob: "",
                phoneNumber: "",
                email: "",
                province: "",
                driverLicense: "",
                moveInDate: "",
                beenEvicted: false,
                missedPayment: false,
                refusedToPay: false,
                reason: "",
                applicationDate: getCurrentDateAsString(),
                occupants: [],
                carModel: {
                    make: "",
                    model: "",
                    color: "",
                    licensePlate: ""
                },
                addresses: [
                    {
                        streetNo: "",
                        streetName: "",
                        city: "",
                        province: "",
                        postalCode: "",
                        since: "",
                        to: "",
                        paysRent: false,
                        hasGivenNotice: false,
                        hasBeenAskedToLeave: false,
                        reasonForLeaving: "",
                        landlord: {
                            firstName: "",
                            lastName: "",
                            phone: "",
                            email: ""
                        }
                    }
                ],
                employmentDetails: {
                    employmentStatus: "",
                    employer: "",
                    since: "",
                    streetCity: "",
                    province: "",
                    positionTitle: "",
                    workSupervisor: "",
                    workSupervisorPhone: "",
                    otherSourcesOfIncome: ""
                },
                additionalReference: {
                    name: "",
                    phoneNumber: "",
                    relationship: "",
                    email: ""
                },
                emergencyContact: {
                    name: "",
                    phoneNumber: "",
                    relationship: "",
                    email: ""
                }
            }
        ]
    };

    const [formData, setFormData] = useState(initialPropertyDetails);

    const handleFieldChange = (fieldName, value) => {
        const mappedValue =
            value === "Yes" ? true : value === "No" ? false : value;

        setFormData((prevData) => {
            const updatedData = { ...prevData };
            const fieldPath = fieldName.split(".");
            let currentObj = updatedData;

            fieldPath.forEach((prop, index) => {
                if (index === fieldPath.length - 1) {
                    currentObj[prop] = mappedValue;
                } else {
                    if (!currentObj[prop]) {
                        currentObj[prop] = {};
                    }
                    currentObj = currentObj[prop];
                }
            });
            return updatedData;
        });
    };

    const handleCreateOccupant = (index) => {
        handleFieldChange(`tenants.0.occupants.${index}.name`, "");
        handleFieldChange(`tenants.0.occupants.${index}.dob`, "");
        handleFieldChange(
            `tenants.0.occupants.${index}.relationToApplicant`,
            ""
        );
    };

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

    const handleDeleteVehicle = (index) => {
        const updatedFormData = { ...formData };
        if (!updatedFormData.tenants) {
            updatedFormData.tenants = [];
        }
        if (updatedFormData._id === undefined) {
            updatedFormData._id = "";
        }
        updatedFormData.tenants[0].carModel.splice(index, 1);
        setFormData(updatedFormData);
    };

    const handleUpdateRoom = async () => {
        // event.preventDefault(); // Prevent the default form submission

        const sendingData = new FormData();
        // Append the file to the formData object
        // The 'file' should be a File or Blob object
        sendingData.append("file", uploadedFile); // Assuming 'file' is the file to be uploaded
        // Append any other form data
        sendingData.append("data", JSON.stringify(formData.tenants[0]));

        try {
            const response = await fetch(
                `${proxy}/checkAvailability/addToApplication/${data}`,
                {
                    method: "POST",
                    body: sendingData
                }
            );

            if (response.ok) {
                toast.success(
                    "Your application has been successfully submitted! We'll contact you as soon as possible! Thank you 😊",
                    {
                        position: "top-center"
                    }
                );
            }

            if (!response.ok) {
                toast.error(
                    "Oops! There's some error happen along the way. Please try again later!",
                    {
                        position: "top-center"
                    }
                );
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating apartment type data:", error);
        }
    };

    const router = useRouter();
    const handleCancel = () => {
        router.push("/"); // Redirect to the main page
    };

    const handleFileUpload = (file) => {
        // Update the state with the selected file
        if (file) {
            setUploadedFile(file);
            // console.log("FILE::", file);
        }
    };

    return (
        <React.Fragment>
            {formData ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Toaster
                        richColors
                        toastOptions={{
                            style: {
                                marginTop: 400
                            },
                            className: "class"
                        }}
                    />
                    <Paper
                        elevation={3}
                        className="max-w-4xl mx-auto my-8 p-8 bg-gray-50"
                    >
                        {/* 0. Title and Instructions*/}
                        <div className={"mx-3"}>
                            <div
                                className={`flex mb-8 ${
                                    isSmallScreen
                                        ? "flex-col "
                                        : "flex-row justify-between items-center"
                                }`}
                            >
                                <div>
                                    <Typography
                                        variant="h5"
                                        className="font-bold mb-4"
                                    >
                                        Rental Application
                                    </Typography>
                                    <Typography
                                        variant="h7"
                                        className="font-semibold"
                                    >
                                        {getSuiteName(data)}
                                    </Typography>
                                </div>
                                {!isSmallScreen && (
                                    <img
                                        src="/peacelogo.png"
                                        alt="PEACE Property Management Company Ltd Logo"
                                        className="w-48"
                                    />
                                )}
                            </div>
                            {isSmallScreen && (
                                <div className="flex justify-start mb-8">
                                    <img
                                        src="peacelogo.png"
                                        alt="PEACE Property Management Company Ltd Logo"
                                        className="w-48"
                                    />
                                </div>
                            )}

                            <Typography>
                                Things to notice before you start:
                            </Typography>
                            <List className="list-decimal list-inside">
                                <ListItem>
                                    1. If one of the occupants is over 18 years
                                    old, they need to apply in a separate
                                    application form.
                                </ListItem>
                                <ListItem>
                                    2. Every detail provided in this form must
                                    be accurate, as it will undergo scrutiny.
                                </ListItem>
                                <ListItem>
                                    3. Change to other pages or exit this page
                                    will cause data loss. Remain in this page
                                    until you finish filling the form and
                                    Submit.
                                </ListItem>
                            </List>
                        </div>
                        <Divider className="mt-4 mb-8" />

                        {/* 1. Tenant Info */}
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
                                            First name
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-basic"
                                            color="info"
                                            variant="outlined"
                                            value={
                                                formData.tenants[0].firstName
                                            }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.firstName`,
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
                                            Last name
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-basic"
                                            color="info"
                                            variant="outlined"
                                            value={formData.tenants[0].lastName}
                                            // onChange={(e) =>
                                            //   handleNestedFieldChange("lastName", e.target.value)
                                            // }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.lastName`,
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
                                                Date of birth
                                            </FormHelperText>
                                        </FormControl>
                                        <DatePicker
                                            defaultValue={dayjs(
                                                formData.tenants[0].dob
                                            )}
                                            onChange={(newValue) =>
                                                handleFieldChange(
                                                    `tenants.0.dob`,
                                                    newValue
                                                        ? newValue.format()
                                                        : ""
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
                                            Phone number
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-basic"
                                            color="info"
                                            variant="outlined"
                                            value={
                                                formData.tenants[0].phoneNumber
                                            }
                                            // onChange={(e) =>
                                            //   handleNestedFieldChange("phoneNumber", e.target.value)
                                            // }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.phoneNumber`,
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
                                            Email address
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
                                            Driver license #
                                        </FormHelperText>
                                        <TextField
                                            fullWidth
                                            required
                                            id="outlined-basic"
                                            color="info"
                                            variant="outlined"
                                            value={
                                                formData.tenants[0]
                                                    .driverLicense
                                            }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.driverLicense`,
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
                                            Province
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
                                                Desired move-in date
                                            </FormHelperText>
                                        </FormControl>
                                        <DatePicker
                                            defaultValue={dayjs(
                                                formData.tenants[0].dob
                                            )}
                                            onChange={(newValue) =>
                                                handleFieldChange(
                                                    `tenants.0.moveInDate`,
                                                    newValue
                                                        ? newValue.format()
                                                        : ""
                                                )
                                            }
                                        />
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>

                        {/* 2. Rental History */}
                        <Box mt={"60px"}>
                            <Box mb={"20px"}>
                                <Typography fontSize={20} fontWeight={700}>
                                    {"2. Rental History"}
                                </Typography>
                                <ListItem>
                                    Please list your addresses in order,
                                    starting with your current one and going
                                    back up to two years ago.
                                </ListItem>
                            </Box>

                            <Box>
                                {formData.tenants[0].addresses.length > 0 ? (
                                    formData.tenants[0].addresses.map(
                                        (address, index) => (
                                            <Box marginTop={8}>
                                                <Box
                                                    sx={{
                                                        // This applies to all immediate children of the Box component
                                                        "& > *": {
                                                            mb: 2
                                                        }
                                                    }}
                                                    marginBottom={2}
                                                >
                                                    <Typography
                                                        fontSize={15}
                                                        fontWeight={700}
                                                    >
                                                        {`ADDRESS ${index + 1}`}
                                                    </Typography>

                                                    <Stack
                                                        direction={
                                                            isSmallScreen
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={4}
                                                        marginTop={2}
                                                    >
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                No.
                                                            </FormHelperText>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id={`street-no-${index}`}
                                                                color="info"
                                                                variant="outlined"
                                                                value={
                                                                    address.streetNo
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.streetNo`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                Street Name
                                                            </FormHelperText>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id={`street-name-${index}`}
                                                                color="info"
                                                                variant="outlined"
                                                                value={
                                                                    address.streetName
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.streetName`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                    </Stack>

                                                    <Stack
                                                        direction={
                                                            isSmallScreen
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={4}
                                                    >
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                City
                                                            </FormHelperText>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id={`city-${index}`}
                                                                color="info"
                                                                variant="outlined"
                                                                value={
                                                                    address.city
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.city`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>

                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                Province
                                                            </FormHelperText>
                                                            <Select
                                                                required
                                                                id="province"
                                                                value={
                                                                    address.province
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.province`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                variant="outlined"
                                                                color="info"
                                                            >
                                                                {canadianProvinces.map(
                                                                    (
                                                                        province,
                                                                        index
                                                                    ) => (
                                                                        <MenuItem
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                province
                                                                            }
                                                                        >
                                                                            {
                                                                                province
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </Stack>

                                                    <FormControl
                                                        sx={{ flex: 1 }}
                                                        fullWidth
                                                    >
                                                        <FormHelperText
                                                            sx={{
                                                                fontWeight: 500,
                                                                margin: "10px 0",
                                                                fontSize: 16,
                                                                color: "#11142d"
                                                            }}
                                                        >
                                                            Postal Code
                                                        </FormHelperText>
                                                        <TextField
                                                            fullWidth
                                                            required
                                                            id={`postal-code-${index}`}
                                                            color="info"
                                                            variant="outlined"
                                                            value={
                                                                address.postalCode
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    `tenants.0.addresses.${index}.postalCode`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>

                                                    <Stack
                                                        direction={
                                                            isSmallScreen
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={4}
                                                        marginTop={2}
                                                    >
                                                        <Stack
                                                            flex={1}
                                                            direction="column"
                                                        >
                                                            <FormControl>
                                                                <FormHelperText
                                                                    sx={{
                                                                        fontWeight: 500,
                                                                        margin: "10px 0",
                                                                        fontSize: 16,
                                                                        color: "#11142d"
                                                                    }}
                                                                >
                                                                    Since
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <DatePicker
                                                                defaultValue={dayjs(
                                                                    address.since
                                                                )}
                                                                onChange={(
                                                                    newValue
                                                                ) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.since`,
                                                                        newValue
                                                                            ? newValue.format()
                                                                            : ""
                                                                    )
                                                                }
                                                            />
                                                        </Stack>
                                                        <Stack
                                                            flex={1}
                                                            direction="column"
                                                        >
                                                            <FormControl>
                                                                <FormHelperText
                                                                    sx={{
                                                                        fontWeight: 500,
                                                                        margin: "10px 0",
                                                                        fontSize: 16,
                                                                        color: "#11142d"
                                                                    }}
                                                                >
                                                                    To
                                                                </FormHelperText>
                                                            </FormControl>
                                                            <DatePicker
                                                                defaultValue={dayjs(
                                                                    address.to
                                                                )}
                                                                onChange={(
                                                                    newValue
                                                                ) =>
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
                                                        direction={
                                                            isSmallScreen
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={4}
                                                        marginTop={2}
                                                    >
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                Have you given
                                                                notice?
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
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <MenuItem value="Yes">
                                                                    Yes
                                                                </MenuItem>
                                                                <MenuItem value="No">
                                                                    No
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                Have you been
                                                                asked to leave?
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
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <MenuItem value="Yes">
                                                                    Yes
                                                                </MenuItem>
                                                                <MenuItem value="No">
                                                                    No
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Stack>

                                                    <FormControl
                                                        sx={{ flex: 1 }}
                                                        fullWidth
                                                    >
                                                        <FormHelperText
                                                            sx={{
                                                                fontWeight: 500,
                                                                margin: "10px 0",
                                                                fontSize: 16,
                                                                color: "#11142d"
                                                            }}
                                                        >
                                                            Reason for leaving
                                                            this property
                                                            (limit: 200
                                                            characters)
                                                        </FormHelperText>
                                                        <TextareaAutosize
                                                            minRows={5}
                                                            required
                                                            placeholder="Write description"
                                                            color="info"
                                                            style={{
                                                                background:
                                                                    "transparent",
                                                                border: "1px solid rgb(220, 221, 222)",
                                                                borderRadius: 6,
                                                                padding: 10
                                                            }}
                                                            value={
                                                                address.reasonForLeaving
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    `tenants.0.addresses.${index}.reasonForLeaving`,
                                                                    e.target
                                                                        .value
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
                                                    <Typography
                                                        fontSize={15}
                                                        fontWeight={700}
                                                    >
                                                        {`LANDLORD ${
                                                            index + 1
                                                        }`}
                                                    </Typography>

                                                    <Stack
                                                        direction={
                                                            isSmallScreen
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={4}
                                                        marginTop={2}
                                                    >
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                First Name
                                                            </FormHelperText>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id={`landlord-firstname-${index}`}
                                                                color="info"
                                                                variant="outlined"
                                                                value={
                                                                    address
                                                                        .landlord
                                                                        .firstName
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.landlord.firstName`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
                                                            <FormHelperText
                                                                sx={{
                                                                    fontWeight: 500,
                                                                    margin: "10px 0",
                                                                    fontSize: 16,
                                                                    color: "#11142d"
                                                                }}
                                                            >
                                                                Last Name
                                                            </FormHelperText>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id={`landlord-lastname-${index}`}
                                                                color="info"
                                                                variant="outlined"
                                                                value={
                                                                    address
                                                                        .landlord
                                                                        .lastName
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.landlord.lastName`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                    </Stack>

                                                    <Stack
                                                        direction={
                                                            isSmallScreen
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={4}
                                                        marginTop={2}
                                                    >
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
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
                                                                value={
                                                                    address
                                                                        .landlord
                                                                        .email
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.landlord.email`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormControl
                                                            sx={{ flex: 1 }}
                                                            fullWidth
                                                        >
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
                                                                id={`landlord-phonenumber-${index}`}
                                                                color="info"
                                                                variant="outlined"
                                                                value={
                                                                    address
                                                                        .landlord
                                                                        .phone
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        `tenants.0.addresses.${index}.landlord.phone`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <Box mt={"28px"}>
                                                            <CustomButton
                                                                title={
                                                                    "Delete this address"
                                                                }
                                                                backgroundColor="#e84747"
                                                                color="#FCFCFC"
                                                                fullWidth
                                                                icon={
                                                                    <Delete />
                                                                }
                                                                handleClick={() => {
                                                                    handleDeleteAddress(
                                                                        index
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        )
                                    )
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
                                                formData.tenants[0].addresses
                                                    .length
                                            );
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* 3. Other Occupants */}
                        <Box mt={"60px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"3. Other Occupants"}
                            </Typography>
                        </Box>

                        <div>
                            {formData.tenants[0].occupants.length > 0 ? (
                                formData.tenants[0].occupants.map(
                                    (occupant, index) => (
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
                                                    direction={
                                                        isSmallScreen
                                                            ? "column"
                                                            : "row"
                                                    }
                                                    gap={4}
                                                    marginTop={2}
                                                >
                                                    <FormControl
                                                        sx={{ flex: 1 }}
                                                        fullWidth
                                                    >
                                                        <FormHelperText
                                                            sx={{
                                                                fontWeight: 500,
                                                                margin: "10px 0",
                                                                fontSize: 16,
                                                                color: "#11142d"
                                                            }}
                                                        >
                                                            Occupant {index + 1}
                                                            's full name
                                                        </FormHelperText>
                                                        <TextField
                                                            fullWidth
                                                            required
                                                            id={`tenant-name-${index}`}
                                                            color="info"
                                                            variant="outlined"
                                                            value={
                                                                occupant.name
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    `tenants.0.occupants.${index}.name`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <Stack
                                                        flex={1}
                                                        direction="column"
                                                    >
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
                                                            //   value={dobMain} // You may want to set this to the occupant's DOB
                                                            // onChange={(newValue) => console.log(newValue)}
                                                            defaultValue={dayjs(
                                                                occupant.dob
                                                            )}
                                                            onChange={(
                                                                newValue
                                                            ) =>
                                                                handleFieldChange(
                                                                    `tenants.0.occupants.${index}.dob`,
                                                                    newValue
                                                                        ? newValue.format()
                                                                        : ""
                                                                )
                                                            }
                                                        />
                                                    </Stack>
                                                </Stack>

                                                <Stack
                                                    direction={
                                                        isSmallScreen
                                                            ? "column"
                                                            : "row"
                                                    }
                                                    gap={4}
                                                >
                                                    <FormControl
                                                        sx={{ flex: 1 }}
                                                        fullWidth
                                                    >
                                                        <FormHelperText
                                                            sx={{
                                                                fontWeight: 500,
                                                                margin: "10px 0",
                                                                fontSize: 16,
                                                                color: "#11142d"
                                                            }}
                                                        >
                                                            Relation to main
                                                            tenant
                                                        </FormHelperText>
                                                        <TextField
                                                            fullWidth
                                                            required
                                                            id={`relation-to-main-tenant-${index}`}
                                                            color="info"
                                                            variant="outlined"
                                                            value={
                                                                occupant.relationToApplicant
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    `tenants.0.occupants.${index}.relationToApplicant`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <Box mt={"28px"}>
                                                        <CustomButton
                                                            title={
                                                                "Delete occupant"
                                                            }
                                                            backgroundColor="#e84747"
                                                            color="#FCFCFC"
                                                            fullWidth
                                                            icon={<Delete />}
                                                            handleClick={() => {
                                                                handleDeleteOccupant(
                                                                    index
                                                                );
                                                            }}
                                                        />
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </div>
                                    )
                                )
                            ) : (
                                <div>
                                    (Please click the button below to add other
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

                        {/* 4. Vehicle Info */}
                        <Box mt={"60px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"4. Vehicle Info"}
                            </Typography>
                        </Box>

                        <div>
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
                                            value={
                                                formData.tenants[0].carModel
                                                    .make
                                            }
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
                                            value={
                                                formData.tenants[0].carModel
                                                    .model
                                            }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    `tenants.0.carModel.model`,
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
                                            value={
                                                formData.tenants[0].carModel
                                                    .color
                                            }
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
                                            value={
                                                formData.tenants[0].carModel
                                                    .licensePlate
                                            }
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

                        {/* 5. Employment Info */}
                        <Box mt={"60px"} mb={"20px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"5. Employment"}
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
                                        Employment status
                                    </FormHelperText>
                                    <Select
                                        required
                                        id="employmentStatus"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails
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
                                        {employmentStatuses.map(
                                            (status, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={status}
                                                >
                                                    {status}
                                                </MenuItem>
                                            )
                                        )}
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
                                        Employer
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails.employer
                                        }
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

                            <Stack
                                direction={isSmallScreen ? "column" : "row"}
                                gap={4}
                            >
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
                                            Since
                                        </FormHelperText>
                                    </FormControl>
                                    <DatePicker
                                        defaultValue={dayjs(
                                            formData.tenants[0]
                                                .employmentDetails.since
                                        )}
                                        onChange={(newValue) =>
                                            handleFieldChange(
                                                `tenants.0.employmentDetails.since`,
                                                newValue
                                                    ? newValue.format()
                                                    : ""
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
                                        Street/City
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails.streetCity
                                        }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.employmentDetails.streetCity`,
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
                                        Province
                                    </FormHelperText>
                                    <Select
                                        required
                                        id="outlined-basic"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails.province
                                        }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.employmentDetails.province`,
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
                                <FormControl sx={{ flex: 1 }} fullWidth>
                                    <FormHelperText
                                        sx={{
                                            fontWeight: 500,
                                            margin: "10px 0",
                                            fontSize: 16,
                                            color: "#11142d"
                                        }}
                                    >
                                        Position/Title
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails.positionTitle
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
                                        Work Supervisor full-name
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails
                                                .workSupervisor
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
                                        Supervisor's Phone number
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .employmentDetails
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
                                    Do you have other sources of income?
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

                        {/* 6. References Info */}
                        <Box mt={"60px"} mb={"20px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"6. References"}
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
                                        Full name
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .additionalReference.name
                                        }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.additionalReference.name`,
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
                                            formData.tenants[0]
                                                .additionalReference
                                                .relationship
                                        }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.additionalReference.relationship`,
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
                                        Email address
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0]
                                                .additionalReference.email
                                        }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.additionalReference.email`,
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
                                        value={
                                            formData.tenants[0]
                                                .additionalReference.phoneNumber
                                        }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `tenants.0.additionalReference.phoneNumber`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                            </Stack>
                        </Box>

                        {/* 7. Credit Report */}
                        <Box mt={"60px"} mb={"20px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"7. Credit Report"}
                            </Typography>
                        </Box>
                        <Box>
                            <CustomButton
                                title={"Upload"}
                                backgroundColor="#40cf38"
                                color="#FCFCFC"
                                icon={<PublishIcon />}
                                handleClick={handleFileUpload}
                            />
                        </Box>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                            marginTop={1}
                        >
                            {uploadedFile?.name}
                        </Typography>

                        {/* 8. Emergency Contact */}
                        <Box mt={"60px"} mb={"20px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"8. Emergency Contact"}
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
                                        Full name
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0].emergencyContact
                                                .name
                                        }
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
                                            formData.tenants[0].emergencyContact
                                                .relationship
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
                                        Email address
                                    </FormHelperText>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-basic"
                                        color="info"
                                        variant="outlined"
                                        value={
                                            formData.tenants[0].emergencyContact
                                                .email
                                        }
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
                                        value={
                                            formData.tenants[0].emergencyContact
                                                .phoneNumber
                                        }
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

                        {/* Submit & Cancel buttons */}
                        <Stack
                            mt={"100px"}
                            direction={"row"}
                            gap={4}
                            justifyContent={"space-between"}
                        >
                            <CustomButton
                                type="submit"
                                title={"Submit"}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                                handleClick={handleUpdateRoom}
                            />
                            <CustomButton
                                type="submit"
                                title={"Back to main page"}
                                backgroundColor="#e84747"
                                color="#fcfcfc"
                                handleClick={handleCancel}
                            />
                        </Stack>
                    </Paper>
                </LocalizationProvider>
            ) : (
                <div>Loading...</div>
            )}
        </React.Fragment>
    );
};

export default ApplicationDetails;
