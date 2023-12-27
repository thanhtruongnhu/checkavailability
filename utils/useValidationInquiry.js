import { useState } from "react";
import { validateInquiry } from "./validation";

const useValidationInquiry = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        let newErrors = {};
        // Inquiry Validation
        newErrors = {
            ...newErrors,
            ...validateInquiry(formData.inquiry[0])
        };

        setErrors(newErrors);
        return newErrors;
    };

    return { errors, validateForm };
};

export default useValidationInquiry;
