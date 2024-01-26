/**

=========================================================
** Helper Functions
=========================================================

**/

import { toast } from "react-hot-toast";

export const parseError = (error) => {
    const message = error instanceof Error ? error.message : String(error);
    return message;
};

export const getFontSizeForHeading = (level) => {
    const FontSizeMap = {
        1: "text-6xl",
        2: "text-5xl",
        3: "text-4xl",
        4: "text-3xl",
        5: "text-2xl",
        6: "text-xl"
    };
    return `${FontSizeMap[level] || ""}`;
};

export const getTextAlign = (textAlign = "left ") => {
    const textAlignMap = {
        left: "align--left",
        right: "align--right",
        center: "align--center"
    };
    return `${textAlignMap[textAlign] || ""}`;
};

export const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied content to the clipboard!");
};

export const handleDelete = (
    setRewrittentContent,
    rewrittenContent,
    setGenerating
) => {
    setRewrittentContent("");
    setGenerating(false);
    toast.success("Deleted Content!");
};

export function getImagePath(suiteType) {
    let imagePath = "";

    switch (suiteType) {
        case "652423bb11b2d3123e9e93e7":
            imagePath = "/SingleA.jpg";
            break;
        case "652423bb11b2d3123e9e93e8":
            imagePath = "/SingleB.jpg";
            break;
        case "652423bb11b2d3123e9e93e9":
            imagePath = "/DoubleA.jpg";
            break;
        case "652423bb11b2d3123e9e93ea":
            imagePath = "/DoubleSuiteB.jpg";
            break;
        case "652423bb11b2d3123e9e93eb":
            imagePath = "/DoubleSuiteC.jpg";
            break;
        default:
            imagePath = "ERROR HAPPENS WHILE LOADING...";
            break;
    }

    return imagePath;
}

export function getSuiteName(suiteType) {
    let suiteName = "";

    switch (suiteType) {
        case "652423bb11b2d3123e9e93e7":
            suiteName = "One Bed One Bath";
            break;
        case "652423bb11b2d3123e9e93e8":
            suiteName = "One Bed One Bath (Wheelchair Accessible)";
            break;
        case "652423bb11b2d3123e9e93e9":
            suiteName = "Two Bed One Bath";
            break;
        case "652423bb11b2d3123e9e93ea":
            suiteName = "Two Bed Two Bath (Corner Unit)";
            break;
        case "652423bb11b2d3123e9e93eb":
            suiteName = "Two Bed Two Bath";
            break;
        default:
            suiteName = "ERROR HAPPENS WHILE LOADING...";
            break;
    }

    return suiteName;
}

export function formatDate(dateString) {
    const inputDate = new Date(dateString);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Mapping of day numbers to their respective ordinal suffixes
    const ordinalSuffix = {
        1: "st",
        2: "nd",
        3: "rd",
        21: "st",
        22: "nd",
        23: "rd",
        31: "st"
    };

    const day = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    // Determine the correct ordinal suffix for the day
    const daySuffix = ordinalSuffix[day] || "th";

    return `${month} ${day}${daySuffix}, ${year}`;
}

export function processWaitlistData(jsonData) {
    const firstItem = jsonData.waitlist[0];

    const processedData = {
        firstName: firstItem.firstName,
        lastName: firstItem.lastName,
        phoneNumber: firstItem.phoneNumber,
        email: firstItem.email,
        message: firstItem.message,
        desiredDate: firstItem.desiredDate,
        waitlistedDate: firstItem.waitlistedDate
    };

    // Stringify the processed data before returning
    return JSON.stringify(processedData);
}

export function processInquiryData(jsonData) {
    const firstItem = jsonData.inquiry[0];

    const processedData = {
        firstName: firstItem.firstName,
        lastName: firstItem.lastName,
        phoneNumber: firstItem.phoneNumber,
        email: firstItem.email,
        inquiryMessage: firstItem.inquiryMessage,
        inquiryDate: firstItem.inquiryDate
    };

    // Stringify the processed data before returning
    return JSON.stringify(processedData);
}

export const proxy = "https://globalsolusap.com";

export const hasErrors = (errors) => {
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            if (typeof errors[key] === "object" && errors[key] !== null) {
                if (Object.keys(errors[key]).length !== 0) {
                    return true;
                }
            } else if (errors[key]) {
                return true;
            }
        }
    }
    return false;
};
