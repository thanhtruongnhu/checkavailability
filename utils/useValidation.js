// useValidation.js

import { useState } from "react";
import {
    validateApplicationInfo,
    validateRentalHistory /*, other validators */
} from "./validation";

const useValidation = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        let newErrors = {};
        // ApplicationInfoForm Validation
        newErrors = {
            ...newErrors,
            ...validateApplicationInfo(formData.tenants[0])
        };

        // RentalHistoryForm Validation
        newErrors = {
            ...newErrors,
            ...validateRentalHistory(formData.tenants[0].addresses[0])
        };

        // Add other form validations...

        setErrors(newErrors);
        return !Object.keys(newErrors).length; // Returns true if no errors
    };

    return { errors, validateForm };
};

export default useValidation;
