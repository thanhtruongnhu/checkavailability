import { useState } from "react";
import { validateWaitlist } from "./validation";

const useValidationWaitlist = () => {
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        let newErrors = {};
        // Inquiry Validation
        newErrors = {
            ...newErrors,
            ...validateWaitlist(formData.waitlist[0])
        };

        setErrors(newErrors);
        return newErrors;
    };

    return { errors, validateForm };
};

export default useValidationWaitlist;
