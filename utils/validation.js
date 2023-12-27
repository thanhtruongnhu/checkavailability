const validateApplicationInfo = (data) => {
    let errors = {};
    // First name validation
    if (!data.firstName || !data.firstName.length) {
        errors.firstName = "First name is required";
    } else {
        errors.firstName = "";
    }
    // Last name validation
    if (!data.lastName || !data.lastName.length) {
        errors.lastName = "Last name is required";
    } else {
        errors.lastName = "";
    }
    // DOB validation
    if (!data.dob || !data.dob.length) {
        errors.dob = "Date of birth is required";
    } else {
        errors.dob = "";
    }
    // phone validation
    if (!data.phoneNumber || !data.phoneNumber.length) {
        errors.phoneNumber = "Phone number is required";
    } else {
        errors.phoneNumber = "";
    }
    // Email validation
    if (!data.email || !data.email.length) {
        errors.email = "Email is required";
    } else {
        errors.email = "";
    }
    // Driver license validation
    if (!data.driverLicense || !data.driverLicense.length) {
        errors.driverLicense = "Driver license is required";
    } else {
        errors.driverLicense = "";
    }
    // Province validation
    if (!data.province || !data.province.length) {
        errors.province = "Province is required";
    } else {
        errors.province = "";
    }
    // Move in date validation
    if (!data.moveInDate || !data.moveInDate.length) {
        errors.moveInDate = "Desired move-in date is required";
    } else {
        errors.moveInDate = "";
    }
    return errors;
};

const validateRentalHistory = (data) => {
    let errors = {};
    // streetNo validation
    if (!data.streetNo || !data.streetNo.length) {
        errors.streetNo = "Desired move-in date is required";
    } else {
        errors.streetNo = "";
    }
    return errors;
};

// Add similar functions for other forms...

export {
    validateApplicationInfo,
    validateRentalHistory /*, other validators */
};
