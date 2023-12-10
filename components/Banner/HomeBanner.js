export const HomeBanner = () => {
    return (
        <div
            className="hero-section bg-cover bg-center text-white py-20 px-4 custom-hero-height relative"
            style={{
                backgroundImage: `url('/banner1.jpg')`,
                height: "353.81px"
            }}
        >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="container mx-auto flex flex-col items-center justify-center h-full relative z-10">
                {/* Logo */}
                <img
                    src={"/whitetranquilitylogo.png"}
                    alt="Tranquility Place"
                    className="h-16" // Adjusted class
                />
                {/* Divider */}
                <div
                    className="custom-divider-width"
                    style={{
                        borderTop: "1px solid white"
                        // margin: "3rem 0"
                    }}
                />
                {/* Check Availability */}
                <h1
                    className="py-2 px-4 text-center md:text-left" // Text center on small, left align on medium and up
                    style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: "500",
                        fontSize: "30px",
                        letterSpacing: "12px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap" // Ensures single line on medium and up
                    }}
                >
                    Check
                    <br className="md:hidden" /> Availability
                </h1>
            </div>
        </div>
    );
};
