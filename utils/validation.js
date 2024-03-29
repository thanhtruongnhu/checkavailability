import dayjs from "dayjs";

const validateApplicationInfo = (data) => {
    let errors = {};
    // First name validation
    if (!data.firstName || !data.firstName.length) {
        errors.firstName = "First name is required";
    }
    // Last name validation
    if (!data.lastName || !data.lastName.length) {
        errors.lastName = "Last name is required";
    }
    // DOB validation
    if (!data.dob || !data.dob.length) {
        errors.dob = "Date of birth is required";
    }
    // phone validation
    if (!data.phoneNumber || !data.phoneNumber.length) {
        errors.phoneNumber = "Phone number is required";
    }
    // Email validation
    if (!data.email || !data.email.length) {
        errors.email = "Email is required";
    }
    // // Driver license validation
    // if (!data.driverLicense || !data.driverLicense.length) {
    //     errors.driverLicense = "Driver license is required";
    // }
    // Province validation
    if (!data.province || !data.province.length) {
        errors.province = "Province is required";
    }
    // Move in date validation
    if (!data.moveInDate || !data.moveInDate.length) {
        errors.moveInDate = "Desired move-in date is required";
    }
    return errors;
};

const validateRentalHistory = (data) => {
    let errors = {};
    let addressErrors = [];
    let totalDuration = 0;

    data.addresses.forEach((address, index) => {
        let addressError = {};

        // Street number validation
        if (!address.streetNo || !address.streetNo.length) {
            addressError.streetNo = `Address ${
                index + 1
            }: Street number is required`;
        }
        // Street name validation
        if (!address.streetName || !address.streetName.length) {
            addressError.streetName = `Address ${
                index + 1
            }: Street name is required`;
        }
        // city validation
        if (!address.city || !address.city.length) {
            addressError.city = `Address ${index + 1}: City is required`;
        }
        // province validation
        if (!address.province || !address.province.length) {
            addressError.province = `Address ${
                index + 1
            }: Province is required`;
        }
        // postalCode validation
        if (!address.postalCode || !address.postalCode.length) {
            addressError.postalCode = `Address ${
                index + 1
            }: Postal code is required`;
        }
        // since date validation
        if (!address.since || !address.since.length) {
            addressError.since = `Address ${index + 1}: Start date is required`;
        }
        // to date validation
        if (!address.to || !address.to.length) {
            addressError.to = `Address ${index + 1}: End date is required`;
        }
        // The below 3 validations are commented out because they're dropdown list with predefined options: yes and no. Meaning that there will be always an option even if the user doesn't select anything. Hence, no need to validate whether there's input in these fields: paysRent, hasGivenNotice and hasBeenAskedToLeave.
        // // paysRent validation
        // if (!address.paysRent || !address.paysRent.length) {
        //     addressError.paysRent = `Address ${
        //         index + 1
        //     }: paysRent is required`;
        // }
        // // hasGivenNotice validation
        // if (!address.hasGivenNotice || !address.hasGivenNotice.length) {
        //     addressError.hasGivenNotice = `Address ${
        //         index + 1
        //     }: hasGivenNotice is required`;
        // }
        // // hasBeenAskedToLeave validation
        // if (
        //     !address.hasBeenAskedToLeave ||
        //     !address.hasBeenAskedToLeave.length
        // ) {
        //     addressError.hasBeenAskedToLeave = `Address ${
        //         index + 1
        //     }: hasBeenAskedToLeave is required`;
        // }

        // reasonForLeaving validation
        if (!address.reasonForLeaving || !address.reasonForLeaving.length) {
            addressError.reasonForLeaving = `Address ${
                index + 1
            }: Reasons for leaving is required`;
        } else if (countWords(address.reasonForLeaving) > 200) {
            addressError.reasonForLeaving = `Address ${
                index + 1
            }: Reason for leaving must be under 200 words (currently ${countWords(
                address.reasonForLeaving
            )})`;
        }

        // landlord's firstName validation
        if (!address.landlord.firstName || !address.landlord.firstName.length) {
            addressError.landlordFirstName = `Address ${
                index + 1
            }: landlord's first name is required`;
        }
        // landlord's lastName validation
        if (!address.landlord.lastName || !address.landlord.lastName.length) {
            addressError.landlordLastName = `Address ${
                index + 1
            }: landlord's last name is required`;
        }
        // landlord's phone validation
        if (!address.landlord.phone || !address.landlord.phone.length) {
            addressError.landlordPhone = `Address ${
                index + 1
            }: landlord's phone number is required`;
        }
        // landlord's email validation
        // if (!address.landlord.email || !address.landlord.email.length) {
        //     addressError.landlordEmail = `Address ${
        //         index + 1
        //     }: landlord's email address is required`;
        // }

        // rental time accumulation
        if (address.since && address.to) {
            totalDuration += calculateDurationInYears(
                address.since,
                address.to
            );
        }

        if (Object.keys(addressError).length) {
            addressErrors[index] = addressError;
        }
    });

    // Check if the total duration is less than 2 years
    if (totalDuration < 2) {
        errors.totalDuration =
            "Total rental history must be at least 2 years! Please try again!";
    }

    if (addressErrors.length) {
        errors.addresses = addressErrors;
    }

    return errors;
};

const validateOccupantInfo = (data) => {
    let errors = {};
    let occupantErrors = [];

    data.occupants.forEach((occupant, index) => {
        let occupantError = {};

        // name validation
        if (!occupant.name || !occupant.name.length) {
            occupantError.name = `Occupant ${index + 1}: Full name is required`;
        }
        // date of birth validation
        if (!occupant.dob || !occupant.dob.length) {
            occupantError.dob = `Occupant ${
                index + 1
            }: Date of birth is required`;
        }
        // relationToApplicant validation
        if (
            !occupant.relationToApplicant ||
            !occupant.relationToApplicant.length
        ) {
            occupantError.relationToApplicant = `Occupant ${
                index + 1
            }: Relation to main applicant is required`;
        }

        if (Object.keys(occupantError).length) {
            occupantErrors[index] = occupantError;
        }
    });

    if (occupantErrors.length) {
        errors.occupants = occupantErrors;
    }

    return errors;
};

const validateEmploymentInfo = (data) => {
    let errors = {};
    let employmentError = {};
    // employmentStatus validation
    if (!data.employmentStatus || !data.employmentStatus.length) {
        employmentError.employmentStatus = "Employment status is required";
    }
    // employer name validation
    if (!data.employer || !data.employer.length) {
        employmentError.employer = "Employer name is required";
    }
    // Employment Start date validation
    if (!data.since || !data.since.length) {
        employmentError.since = "Employment start date is required";
    }
    // Street/City validation
    if (!data.streetCity || !data.streetCity.length) {
        employmentError.streetCity = "Street/City is required";
    }

    // province validation
    if (!data.province || !data.province.length) {
        employmentError.province = "province is required";
    }
    // positionTitle validation
    if (!data.positionTitle || !data.positionTitle.length) {
        employmentError.positionTitle = "Job Title is required";
    }
    // workSupervisor validation
    if (!data.workSupervisor || !data.workSupervisor.length) {
        employmentError.workSupervisor =
            "work supervisor's full-name is required";
    }
    // workSupervisorPhone validation
    if (!data.workSupervisorPhone || !data.workSupervisorPhone.length) {
        employmentError.workSupervisorPhone =
            "work supervisor's phone number is required";
    }

    errors.employment = employmentError;

    return errors;
};
const validateReferenceInfo = (data) => {
    let errors = {};
    let referenceError = {};
    // reference name validation
    if (!data.name || !data.name.length) {
        referenceError.name = "Reference name is required";
    }
    // reference phoneNumber validation
    if (!data.phoneNumber || !data.phoneNumber.length) {
        referenceError.phoneNumber = "Phone number is required";
    }
    // relationship validation
    if (!data.relationship || !data.relationship.length) {
        referenceError.relationship = "Relationship is required";
    }

    errors.reference = referenceError;

    return errors;
};
const validateEmergencyContactInfo = (data) => {
    let errors = {};
    let emergencyError = {};
    // reference name validation
    if (!data.name || !data.name.length) {
        emergencyError.name = "Reference name is required";
    }
    // reference phoneNumber validation
    if (!data.phoneNumber || !data.phoneNumber.length) {
        emergencyError.phoneNumber = "Phone number is required";
    }
    // relationship validation
    if (!data.relationship || !data.relationship.length) {
        emergencyError.relationship = "Relationship is required";
    }

    errors.emergency = emergencyError;

    return errors;
};

const validateInquiry = (data) => {
    let errors = {};
    // First name validation
    if (!data.firstName || !data.firstName.length) {
        errors.firstName = "First name is required";
    }

    // Last name validation
    if (!data.lastName || !data.lastName.length) {
        errors.lastName = "Last name is required";
    }

    // phone validation
    if (!data.phoneNumber || !data.phoneNumber.length) {
        errors.phoneNumber = "Phone number is required";
    }

    // Email validation
    if (!data.email || !data.email.length) {
        errors.email = "Email is required";
    }

    // inquiryMessage validation
    if (!data.inquiryMessage || !data.inquiryMessage.length) {
        errors.inquiryMessage = "Inquiry message is required";
    } else if (countWords(data.inquiryMessage) > 200) {
        errors.inquiryMessage = `Your questions must be under 200 words (currently ${countWords(
            data.inquiryMessage
        )})`;
    }

    return errors;
};

const validateWaitlist = (data) => {
    let errors = {};
    // First name validation
    if (!data.firstName || !data.firstName.length) {
        errors.firstName = "First name is required";
    }

    // Last name validation
    if (!data.lastName || !data.lastName.length) {
        errors.lastName = "Last name is required";
    }

    // phone validation
    if (!data.phoneNumber || !data.phoneNumber.length) {
        errors.phoneNumber = "Phone number is required";
    }

    // Email validation
    if (!data.email || !data.email.length) {
        errors.email = "Email is required";
    }

    // inquiryMessage validation
    if (!data.message || !data.message.length) {
        errors.message = "Inquiry message is required";
    } else if (countWords(data.message) > 200) {
        errors.message = `Your questions must be under 200 words (currently ${countWords(
            data.message
        )})`;
    }

    // Desired move-in date validation
    if (!data.desiredDate || !data.desiredDate.length) {
        errors.desiredDate = "Desired move-in date is required";
    }

    return errors;
};

// HELPERS
const countWords = (str) => {
    return str.trim().split(/\s+/).length;
};

const calculateDurationInYears = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, "year", true); // 'true' for a precise (floating point) result
};

export {
    validateApplicationInfo,
    validateRentalHistory,
    validateOccupantInfo,
    validateEmploymentInfo,
    validateReferenceInfo,
    validateEmergencyContactInfo,
    validateInquiry,
    validateWaitlist
};
