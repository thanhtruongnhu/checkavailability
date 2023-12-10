import React, { useRef } from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
    title,
    backgroundColor,
    color,
    fullWidth,
    icon,
    handleClick,
    disabled
}) => {
    const fileInputRef = useRef(null);

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("Selected file:", selectedFile);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <Button
                disabled={disabled}
                style={{
                    flex: fullWidth ? 1 : "unset",
                    padding: "10px 15px",
                    width: fullWidth ? "100%" : "fit-content",
                    minWidth: 100,
                    backgroundColor: backgroundColor,
                    color: color,
                    fontSize: 16,
                    fontWeight: 700,
                    gap: "10px",
                    textTransform: "capitalize"
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = backgroundColor;
                    e.currentTarget.style.color = color;
                }}
                onClick={() => {
                    if (title === "Upload" && fileInputRef.current) {
                        fileInputRef.current.click();
                    } else if (handleClick) {
                        handleClick();
                    }
                }}
            >
                {icon}
                {title}
            </Button>

            <input
                ref={fileInputRef}
                hidden
                accept="*"
                type="file"
                onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    console.log("Selected file:", selectedFile);
                    if (handleClick) {
                        handleClick(selectedFile);
                    }
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }}
            />
        </div>
    );
};

export default CustomButton;
