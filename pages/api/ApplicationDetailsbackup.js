import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Divider, List, ListItem, Paper, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import theme from "@components/CustomComponents/theme";
import CustomButton from "@components/CustomComponents/CustomButton";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/router";
import { getSuiteName, proxy } from "@utils/helper";
import { Toaster, toast } from "sonner";
import ApplicationInfoForm from "./subforms/ApplicationInfoForm";
import RentalHistoryForm from "./subforms/RentalHistoryForm";
import OccupantsForm from "./subforms/OccupantsForm";
import VehicleForm from "./subforms/VehicleForm";
import EmploymentForm from "./subforms/EmploymentForm";
import ReferencesForm from "./subforms/ReferencesForm";
import EmergencyContactForm from "./subforms/EmergencyContactForm";
import { useForm } from "react-hook-form";
import { faL } from "@fortawesome/free-solid-svg-icons";

function getCurrentDateAsString() {
    const currentDate = new Date();
    return currentDate.toString();
}

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

    // const { register, handleSubmit } = useForm();

    const [fnameError, setFNameError] = useState("");
    const [lnameError, setLNameError] = useState("");
    const [dobError, setDobError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [licenseError, setLicenseError] = useState("");
    const [provinceError, setProvinceError] = useState("");
    const [moveinDateError, setMoveinDateError] = useState("");

    const handleProcessForm = async () => {
        let insanity = false;
        // First name validation
        if (
            !formData.tenants[0].firstName ||
            !formData.tenants[0].firstName.length
        ) {
            setFNameError("First name is required");
            insanity = true;
        } else {
            setFNameError("");
        }
        // Last name validation
        if (
            !formData.tenants[0].lastName ||
            !formData.tenants[0].lastName.length
        ) {
            setLNameError("Last name is required");
            insanity = true;
        } else {
            setLNameError("");
        }
        // DOB validation
        if (!formData.tenants[0].dob || !formData.tenants[0].dob.length) {
            setDobError("Date of birth is required");
            insanity = true;
        } else {
            setDobError("");
        }
        // phone validation
        if (
            !formData.tenants[0].phoneNumber ||
            !formData.tenants[0].phoneNumber.length
        ) {
            setPhoneError("Phone number is required");
            insanity = true;
        } else {
            setPhoneError("");
        }
        // Email validation
        if (!formData.tenants[0].email || !formData.tenants[0].email.length) {
            setEmailError("Email is required");
            insanity = true;
        } else {
            setEmailError("");
        }
        // Driver license validation
        if (
            !formData.tenants[0].driverLicense ||
            !formData.tenants[0].driverLicense.length
        ) {
            setLicenseError("Driver license is required");
            insanity = true;
        } else {
            setLicenseError("");
        }
        // Province validation
        if (
            !formData.tenants[0].province ||
            !formData.tenants[0].province.length
        ) {
            setProvinceError("Province is required");
            insanity = true;
        } else {
            setProvinceError("");
        }
        // Move in date validation
        if (
            !formData.tenants[0].moveInDate ||
            !formData.tenants[0].moveInDate.length
        ) {
            setMoveinDateError("Desired move-in date is required");
            insanity = true;
        } else {
            setMoveinDateError("");
        }

        if (insanity) {
            return false;
        }
        return true;
    };

    const handleUpdateRoom = async () => {
        // event.preventDefault(); // Prevent the default form submission
        const shouldContinue = await handleProcessForm();

        if (!shouldContinue) {
            // Terminate if handleProcessForm returned false
            toast.error(
                "Oops! Please fill in all required info before Sending your application!",
                {
                    position: "top-center"
                }
            );
            return;
        }
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
                        <ApplicationInfoForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                            fnameError={fnameError}
                            lnameError={lnameError}
                            dobError={dobError}
                            phoneError={phoneError}
                            emailError={emailError}
                            licenseError={licenseError}
                            provinceError={provinceError}
                            moveinDateError={moveinDateError}
                        />{" "}
                        {/* 2. Rental History */}
                        <RentalHistoryForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                        />
                        {/* 3. Other Occupants */}
                        <OccupantsForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                        />
                        {/* 4. Vehicle Info */}
                        <VehicleForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                        />
                        {/* 5. Employment Info */}
                        <EmploymentForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                        />
                        {/* 6. References Info */}
                        <ReferencesForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                        />
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
                        <EmergencyContactForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                        />
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
