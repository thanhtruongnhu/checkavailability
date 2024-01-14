import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { HomeBanner } from "@components/Banner";
import { Columns } from "@components/Columns";
import { ContentImage } from "@components/ContentImage";
import { Content } from "@components/Content";
import { Accordion } from "@components/Accordion";
import { MotionBTTContainer } from "@components/Motion";
import SEO from "@components/SEO/SEO";
import Offers from "@components/Offers/Offers";
import AvailableSuites from "@components/AvailableSuites/AvailableSuites";

export default function Home() {
    return (
        <Layout className="">
            <SEO
                title="Check Availability - Tranquility Place"
                description="Enter the luxury of living within a few clicks!"
            />
            <div className="main-wrapper relative z-10 pb-20 pt-20 ">
                {/* { Page Banner } */}
                <HomeBanner />
                <Offers />
                <AvailableSuites />
            </div>
        </Layout>
    );
}
