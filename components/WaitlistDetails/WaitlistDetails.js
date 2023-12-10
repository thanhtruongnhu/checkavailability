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
import { Add, Delete, PublishedWithChangesSharp } from "@mui/icons-material";
import theme from "@components/CustomComponents/theme";
import CustomButton from "@components/CustomComponents/CustomButton";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/router";
import {
    getSuiteName,
    processJsonData,
    processWaitlistData,
    proxy
} from "@utils/helper";
import { toast, Toaster } from "sonner";

function getCurrentDateAsString() {
    const currentDate = new Date();
    return currentDate.toString();
}

const WaitlistDetails = ({ data }) => {
    const router = useRouter();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const initialInquiryDetails = {
        waitlist: [
            {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                message: "",
                desiredDate: "",
                waitlistedDate: getCurrentDateAsString()
            }
        ]
    };

    const [formData, setFormData] = useState(initialInquiryDetails);

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

    // const handleCreateWaitlist = async () => {
    //     fetch(`/api/checkAvailability/addToWaitlist/${data}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //             // Include other headers as needed
    //         },
    //         body: processWaitlistData(formData)
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // };

    const handleCreateWaitlist = async () => {
        // event.preventDefault(); // Prevent the default form submission
        try {
            const response = await fetch(
                `${proxy}/checkAvailability/addToWaitlist/${data}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: processWaitlistData(formData)
                }
            );

            if (response.ok) {
                toast.success(
                    "Your information has been successfully submitted! We'll contact you as soon as possible! Thank you 😊",
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
            console.error("Error creating inquiry:", error);
        }
    };

    const handleCancel = () => {
        router.push("/"); // Redirect to the main page
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
                                        Welcome to our wait list!
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
                        </div>

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
                                        value={formData.waitlist[0].firstName}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `waitlist.0.firstName`,
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
                                        value={formData.waitlist[0].lastName}
                                        // onChange={(e) =>
                                        //   handleNestedFieldChange("lastName", e.target.value)
                                        // }
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `waitlist.0.lastName`,
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
                                        value={formData.waitlist[0].email}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `waitlist.0.email`,
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
                                        value={formData.waitlist[0].phoneNumber}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                `waitlist.0.phoneNumber`,
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>
                            </Stack>

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
                                        formData.waitlist[0].desiredDate
                                    )}
                                    onChange={(newValue) =>
                                        handleFieldChange(
                                            `waitlist.0.desiredDate`,
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
                                    Your message (limit: 200 words)
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
                                    value={formData.waitlist[0].message}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            `waitlist.0.message`,
                                            e.target.value
                                        )
                                    }
                                />
                            </FormControl>
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
                                handleClick={handleCreateWaitlist}
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

export default WaitlistDetails;
