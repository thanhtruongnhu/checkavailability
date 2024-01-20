import Image from "next/image";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export const Footer = () => {
    return (
        <div>
            <footer className="bg-white text-gray-800 p-4">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center mb-10">
                    <div className="flex flex-col w-full md:w-1/3 mb-0">
                        <span
                            className="text-2xl text-[#a0c020] mb-4"
                            style={{
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: 600,
                                letterSpacing: "0.1rem"
                            }}
                        >
                            CONTACT
                        </span>
                        <span className="mb-2">
                            President: Tuyet (Sunny) Tran Thi
                        </span>
                        <div className="flex items-center mb-2">
                            <AlternateEmailIcon />
                            <a
                                href="mailto:tranquilityplacepei@gmail.com"
                                className="ml-2 hover:text-blue-500"
                            >
                                tranquilityplacepei@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center mb-2">
                            <AlternateEmailIcon />
                            <a
                                href="mailto:sunny.bythebaycottages.ca@gmail.com"
                                className="ml-2 hover:text-blue-500"
                            >
                                sunny.bythebaycottages.ca@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center mb-2">
                            <PhoneIcon />
                            <a
                                href="tel:18004047755"
                                className="ml-2 hover:text-blue-500"
                            >
                                Toll free: 1-800-404-7755
                            </a>
                        </div>
                        <div className="flex items-center mb-2">
                            <PhoneIcon />
                            <a
                                href="tel:9023146827"
                                className="ml-2 hover:text-blue-500"
                            >
                                Cell: 902-314-6827
                            </a>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon />
                            <a
                                href="tel:9026722307"
                                className="ml-2 hover:text-blue-500"
                            >
                                Tel: 902-672-2307
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 mt-16 mb-5 md:mb-0 ">
                        <div className="flex items-center mb-2">
                            <ApartmentIcon />
                            <span className="ml-2">
                                16 Elena Court, Charlottetown, PE C1C 0B2
                            </span>
                        </div>
                        <div className="flex items-center mb-2">
                            <MailOutlineIcon />
                            <span className="ml-2">
                                Mailing address: 2 Birchwood Lane, Stratford PE
                                C1B 3Z1
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            <FacebookIcon />
                            <a
                                href="https://www.facebook.com/tranquilityplacepei/"
                                className="hover:text-blue-500 ml-2"
                            >
                                Facebook
                            </a>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <Image
                                src="/peacelogo.png"
                                alt="PEACE Logo"
                                width={200}
                                height={150}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-auto flex flex-col items-center">
                        {/* Replace with your actual image path and adjust the width and height accordingly */}
                        {/* <div className="flex items-center mb-10">
                        <Image
                            src="/peacelogo.png"
                            alt="PEACE Logo"
                            width={150}
                            height={150}
                        />
                    </div> */}
                        <div className="flex items-center mb-2">
                            <Image
                                src="/cbrblogo.jpeg"
                                alt="PEACE Logo"
                                width={280}
                                height={150}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center text-xs mt-4">
                    © Tranquility Place. All Rights Reserved.
                </div>
            </footer>
            {/* Green line at the end of the footer */}
            <div
                className="w-full h-3"
                style={{ backgroundColor: "#a0c020" }}
            ></div>
        </div>
    );
};
