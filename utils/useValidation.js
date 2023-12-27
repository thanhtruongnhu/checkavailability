import { useState } from "react";
import {
    validateApplicationInfo,
    validateRentalHistory,
    validateOccupantInfo,
    validateEmploymentInfo,
    validateReferenceInfo,
    validateEmergencyContactInfo
} from "./validation";

const useValidation = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData, uploadedFile) => {
        let newErrors = {};
        // ApplicationInfoForm Validation
        newErrors = {
            ...newErrors,
            ...validateApplicationInfo(formData.tenants[0])
        };

        // RentalHistoryForm Validation
        newErrors = {
            ...newErrors,
            ...validateRentalHistory(formData.tenants[0])
        };

        // OccupantsForm Validation
        newErrors = {
            ...newErrors,
            ...validateOccupantInfo(formData.tenants[0])
        };

        // EmploymentForm Validation
        newErrors = {
            ...newErrors,
            ...validateEmploymentInfo(formData.tenants[0].employmentDetails)
        };

        // ReferencesForm Validation
        newErrors = {
            ...newErrors,
            ...validateReferenceInfo(formData.tenants[0].additionalReference)
        };

        // EmergencyContactForm Validation
        newErrors = {
            ...newErrors,
            ...validateEmergencyContactInfo(
                formData.tenants[0].emergencyContact
            )
        };

        // Check whether financial proof file is uploaded or not
        if (!uploadedFile) {
            newErrors.fileUpload =
                "Please upload a credit report or bank statement!";
        }

        setErrors(newErrors);
        return newErrors;
    };

    return { errors, validateForm };
};

export default useValidation;
