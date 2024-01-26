import React, { useEffect, useState } from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { formatDate, getImagePath, getSuiteName, proxy } from "@utils/helper";
import { useRouter } from "next/router";
import Image from "next/image";

const SuiteCard = ({ suite }) => {
    const router = useRouter();

    const handleApplication = (id) => {
        router.push({
            pathname: "/application",
            query: { data: id } // Passing data in query parameters
        });
    };

    const handleInquiry = (id) => {
        router.push({
            pathname: "/inquiry",
            query: { data: id } // Passing data in query parameters
        });
    };

    const handleWaitlist = (id) => {
        router.push({
            pathname: "/waitlist",
            query: { data: id } // Passing data in query parameters
        });
    };

    return (
        <div
            className="rounded-lg p-4 flex flex-col md:flex-row items-stretch mb-16 custom-parentdiv-width"
            style={{ backgroundColor: "#f6f6f6" }} // Ensure the parent div is full-width on smaller screens and has a max-width set for larger screens
        >
            <div className="hide-on-767px w-72 h-96 flex-shrink-0">
                <img
                    src={suite.imageUrl}
                    alt={suite.name}
                    className="object-cover w-full h-full rounded-lg" // Image will cover the full area of its container
                />
            </div>

            {/* <div className="hide-on-767px w-72 h-96 flex-shrink-0 relative rounded-lg">
                <Image
                    src={suite.imageUrl}
                    alt={suite.name}
                    layout="fill"
                    objectFit="fill" // This will stretch the image to fill the container
                    className="rounded-lg"
                />
            </div> */}
            <div className="flex flex-col justify-between flex-grow p-4">
                <div className="flex flex-col md:flex-row justify-between items-center w-full mb-4">
                    <h3 className="text-xl font-bold mb-2">{suite.name}</h3>
                    <div className="flex items-center text-[#a0c020] mb-4">
                        <HotelIcon />
                        <span className="mx-2">{suite.bedrooms}</span>
                        <BathtubIcon />
                        <span className="mx-2">{suite.bathrooms}</span>
                        <SquareFootIcon />
                        <span className="ml-1">{suite.squareFeet}</span>
                    </div>
                </div>
                <div className="text-gray-500 font-semibold text-sm">
                    {`Starting from $${suite.rentFrom}`}
                </div>
                <p className="text-gray-700 mb-4">{suite.description}</p>
                <div className="text-gray-500">
                    {suite.isAvailable
                        ? `Available from ${suite.availableFrom}`
                        : "No Vacancies"}
                </div>
                <div className="flex justify-end mt-4">
                    {suite.isAvailable ? (
                        <div className="flex space-x-2">
                            <button
                                className="hover:bg-blue-700 text-white text-sm font-semibold py-2 px-5 rounded-full"
                                style={{
                                    backgroundColor: "#010839",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px"
                                }}
                                onClick={() => handleInquiry(suite.id)}
                            >
                                Inquire
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white text-sm font-semibold py-2 px-5 rounded-full"
                                style={{
                                    backgroundColor: "#a0c03b",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px"
                                }}
                                onClick={() => handleApplication(suite.id)}
                            >
                                Apply to Rent
                            </button>
                        </div>
                    ) : (
                        <button
                            className="hover:bg-blue-700 text-white text-sm font-semibold py-2 px-5 rounded-full"
                            style={{
                                backgroundColor: "#010839",
                                textTransform: "uppercase",
                                letterSpacing: "1px"
                            }}
                            onClick={() => handleWaitlist(suite.id)}
                        >
                            Join Waiting List
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const AvailableSuites = () => {
    const [suiteData, setSuiteData] = useState([]);
    const [finalSuiteData, setFinalSuiteData] = useState([]);

    // useEffect(() => {
    //     const fetchAvailabilityData = async () => {
    //         fetch("/api/checkAvailability/getAllAptTypes")
    //             .then((response) => response.json())
    //             .then((data) => setSuiteData(data));
    //     };

    //     fetchAvailabilityData();
    // }, []);

    useEffect(() => {
        const fetchAvailabilityData = async () => {
            try {
                const response = await fetch(
                    `${proxy}/checkAvailability/getAllAptTypes`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setSuiteData(data);
            } catch (error) {
                console.error("Error fetching apartment data:", error);
            }
        };
        fetchAvailabilityData();
    }, []);

    useEffect(() => {
        const processSuiteData = (data) => {
            if (!data) {
                return;
            }
            const suiteInfo = data.map((suite) => {
                const suiteTypeData = suite;
                return {
                    id: suiteTypeData._id,
                    name: getSuiteName(suiteTypeData._id),
                    description: suiteTypeData.aptTypeDescription,
                    availableFrom: formatDate(suiteTypeData.aptAvailableFrom),
                    isAvailable: suiteTypeData.aptAvailability,
                    squareFeet: `${suiteTypeData.sqFeet} sq.ft.`,
                    bedrooms: suiteTypeData.bdNum,
                    bathrooms: suiteTypeData.bathNum,
                    rentFrom: suiteTypeData.rentFrom,
                    imageUrl: getImagePath(suiteTypeData._id)
                };
            });

            setFinalSuiteData(suiteInfo);
        };

        if (suiteData) {
            processSuiteData(suiteData);
        }
    }, [suiteData]);

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4">
                <img
                    src={"/divider.png"}
                    alt="divider"
                    className="mx-auto w-80 mb-8"
                />
                <h2
                    className="text-3xl font-semibold text-center mb-20"
                    style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 700,
                        letterSpacing: "0.5rem" // Equivalent to 12px, adjust as needed
                    }}
                >
                    AVAILABLE SUITES
                </h2>
                <div className="flex flex-col items-center">
                    {finalSuiteData.map((suite) => (
                        <SuiteCard key={suite.id} suite={suite} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AvailableSuites;
