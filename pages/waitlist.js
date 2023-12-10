import { Layout } from "@components/Layout";
import WaitlistDetails from "@components/WaitlistDetails/WaitlistDetails";
import { useRouter } from "next/router";

const Inquiry = () => {
    const router = useRouter();
    const { data } = router.query; // Retrieve data from query parameters

    return (
        <Layout>
            <div className="main-wrapper relative z-10 pb-20 pt-20 ">
                <WaitlistDetails data={data} />
            </div>
        </Layout>
    );
};

export default Inquiry;
