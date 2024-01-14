import InquiryDetails from "@components/InquiryDetails/InquiryDetails";
import { Layout } from "@components/Layout";
import { useRouter } from "next/router";
import SEO from "@components/SEO/SEO";

const Inquiry = () => {
    const router = useRouter();
    const { data } = router.query; // Retrieve data from query parameters

    return (
        <Layout>
            <SEO
                title="Inquiry - Tranquility Place"
                description="Enter the luxury of living within a few clicks!"
            />
            <div className="main-wrapper relative z-10 pb-20 pt-20 ">
                <InquiryDetails data={data} />
            </div>
        </Layout>
    );
};

export default Inquiry;
