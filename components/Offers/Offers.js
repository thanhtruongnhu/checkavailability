import React from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";

const suites = [
    {
        id: 1,
        type: "2 SUITES",
        features: [
            { icon: <HotelIcon style={{ color: "#a0c020" }} />, text: "1" },
            { icon: <BathtubIcon style={{ color: "#a0c020" }} />, text: "1" }
        ],
        description: "one bedroom, one bathroom",
        squareFeet: "864 sq.ft."
    },
    {
        id: 2,
        type: "2 SUITES",
        features: [
            { icon: <HotelIcon style={{ color: "#a0c020" }} />, text: "1" },
            { icon: <BathtubIcon style={{ color: "#a0c020" }} />, text: "1" }
        ],
        description:
            "ground level, one bedroom, one wheelchair accessible bathroom",
        // description: "ground level, one bedroom",
        squareFeet: "864 sq.ft."
    },
    {
        id: 3,
        type: "2 SUITES",
        features: [
            { icon: <HotelIcon style={{ color: "#a0c020" }} />, text: "2" },
            { icon: <BathtubIcon style={{ color: "#a0c020" }} />, text: "1" }
        ],
        description: "two bedroom, one bathroom",
        squareFeet: "1090 sq.ft."
    },
    {
        id: 4,
        type: "12 SUITES",
        features: [
            { icon: <HotelIcon style={{ color: "#a0c020" }} />, text: "2" },
            { icon: <BathtubIcon style={{ color: "#a0c020" }} />, text: "2" }
        ],
        description: "two bedroom, two bathroom",
        squareFeet: "1041 sq.ft."
    },
    {
        id: 5,
        type: "18 SUITES",
        features: [
            { icon: <HotelIcon style={{ color: "#a0c020" }} />, text: "2" },
            { icon: <BathtubIcon style={{ color: "#a0c020" }} />, text: "2" }
        ],
        description: "two bedroom, two bathroom",
        squareFeet: "1120 sq.ft."
    }
];

const Offers = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <h2
                    className="text-3xl font-semibold text-center mb-20"
                    style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 700,
                        letterSpacing: "0.5rem" // Equivalent to 12px, adjust as needed
                    }}
                >
                    WHAT WE OFFER
                </h2>
                <div className="flex flex-wrap justify-center gap-10">
                    {suites.map((suite) => (
                        <div
                            key={suite.id}
                            className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/6 max-w-xs"
                        >
                            <h3
                                className="font-bold text-2xl uppercase mb-4" // Tailwind classes for font size, weight, text transform, and letter-spacing
                                style={{
                                    fontFamily: '"Montserrat", sans-serif',
                                    fontWeight: 600,
                                    letterSpacing: "0.1rem" // Equivalent to 12px, adjust as needed
                                }}
                            >
                                {suite.type}
                            </h3>
                            <div className="flex items-center">
                                {suite.features.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center mr-2"
                                    >
                                        <span className="mr-1">
                                            {feature.text}
                                        </span>
                                        {feature.icon}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-1 text-center">
                                {suite.description}
                            </p>
                            <p className="text-gray-600 mb-4 text-center font-bold">
                                {suite.squareFeet}
                            </p>
                            <button className="text-[#a0c020] hover:text-green-800 transition-colors">
                                Floor Plan &gt;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offers;
