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
import useValidationApplication from "@utils/useValidationApplication";

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

    const { errors, validateForm } = useValidationApplication();

    const handleUpdateRoom = async () => {
        const validationErrors = validateForm(formData, uploadedFile);

        if (Object.keys(validationErrors).length) {
            // Generic missing data error
            toast.error(
                "Please fill in all required info before submitting your application!",
                {
                    position: "top-center"
                }
            );
            // Financial proof not uploaded error
            if (validationErrors.fileUpload) {
                toast.error(validationErrors.fileUpload, {
                    position: "top-center"
                });
            }
            // 2-year history violation error
            if (validationErrors.totalDuration) {
                toast.error(validationErrors.totalDuration, {
                    position: "top-center"
                });
            }

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
                                <ListItem>
                                    4. Please fill in all required fields with
                                    asterisk *
                                </ListItem>
                            </List>
                        </div>
                        <Divider className="mt-4 mb-8" />
                        {/* 1. Tenant Info */}
                        <ApplicationInfoForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                            errors={errors}
                        />{" "}
                        {/* 2. Rental History */}
                        <RentalHistoryForm
                            formData={formData}
                            setFormData={setFormData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                            errors={errors.addresses || []}
                        />
                        {/* 3. Other Occupants */}
                        <OccupantsForm
                            formData={formData}
                            setFormData={setFormData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                            errors={errors.occupants || []}
                        />
                        {/* 4. Vehicle Info (No validation needed) */}
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
                            errors={errors.employment}
                        />
                        {/* 6. References Info */}
                        <ReferencesForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            isSmallScreen={isSmallScreen}
                            errors={errors.reference}
                        />
                        {/* 7. Credit Report */}
                        <Box mt={"60px"} mb={"20px"}>
                            <Typography fontSize={20} fontWeight={700}>
                                {"7. Financial Proof"}
                            </Typography>
                            <ListItem>
                                Please upload either Credit report or bank
                                statements.*
                            </ListItem>
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
                            errors={errors.emergency}
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
