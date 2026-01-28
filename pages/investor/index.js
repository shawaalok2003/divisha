import Head from "next/head";
import ListingLayout from "../../components/layout/ListingLayout";
import Button from "../../components/Button";
import Link from "next/link";
import { APPLICATION_URLS } from "../../constants";

export default function Investor() {
    const investorFeatures = [
        {
            title: "A curated selection of high-potential startups",
        },
        {
            title: "Detailed information on each startup, including financials and pitch decks",
        },
        {
            title: "A streamlined investment process",
        },
        {
            title: "Exclusive events and networking opportunities",
        },
        {
            title: "Wide range of investment options across various industries and sectors",
        },
        {
            title: "Access to vetted and un-vetted startups",
        },
        {
            title: "Transparent and user-friendly interface",
        },
        {
            title: "Opportunity to connect and network with other like-minded individuals",
        },
        {
            title: "Dedicated team of experts constantly researching and analyzing the startup ecosystem",
        },
        {
            title: "Access to regular reports, newsletters and webinars on the latest trends and developments in the startup ecosystem.",
        },
    ];
    return (
        <ListingLayout>
            <Head>
                <title>Investors</title>
                <meta property="og:title" content="Investors" key="investors" />
            </Head>
            <div className="page-title mt-10 pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="jumbotron mb-6 bg-transparent p-0 text-dark ">
                                <h3 className="mb-7 text-dark text-center">INVESTORS</h3>
                                <p className="lead mb-0 font-size-lg font-weight-normal lh-18">
                                    Welcome to our platform, where we connect innovative startups with savvy investors. Our goal is to make the
                                    investment process as seamless and efficient as possible. We understand that as an investor, you are looking for
                                    opportunities to grow your portfolio and generate returns. That's why we've created a platform that streamlines
                                    the process of finding, researching, and investing in startups.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <p className="text-dark lead font-size-lg font-weight-normal lh-18">
                                Our platform offers a wide range of startups across various industries and stages of development, providing investors
                                with a diverse range of investment opportunities.
                            </p>

                            <div className="row no-gutters mt-7">
                                <div className="col-md-12">
                                    <ul className="icon-list list-group list-group-flush list-group-borderless">
                                        {investorFeatures &&
                                            investorFeatures.map((invf, invfIndex) => (
                                                <li className="list-group-item p-0 mb-3 icon-box no-shape icon-box-style-03 text-dark lead font-size-lg font-weight-normal lh-18">
                                                    <span className="icon-box-icon d-inline-block mr-3 text-success">
                                                        <i className="fal fa-check-circle text-success"></i>
                                                    </span>
                                                    <span className="text-dark">{invf.title || ""}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>

                            <p className="text-dark lead mt-6 font-size-lg font-weight-normal lh-18">
                                By joining our platform, you'll have access to a diverse range of investment opportunities and the support you need to
                                make informed decisions. Let's work together to build your portfolio and achieve your financial goals.
                            </p>
                        </div>

                        <div className="col-md-12 text-center mt-5">
                            <Link href={APPLICATION_URLS.INVESTOR_LOGIN.url}>
                                <Button text="Start Investing" size="xl" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
