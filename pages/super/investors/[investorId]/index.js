import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import SuperLayout from "../../../../components/layout/SuperLayout";
import PageHeader from "../../../../components/PageHeader";
import PageContainer from "../../../../components/PageContainer";
import Loader from "../../../../components/Loader";

import useSuper from "../../../../hooks/useSuper";
import useInvestor from "../../../../hooks/useInvestor";

import { APPLICATION_URLS } from "../../../../constants";
import SUPER_AUTH_API from "../../../../api/super/authentication";

import SUPER_INVESTORS_API from "../../../../api/super/investors";

import { consoleLogger } from "../../../../helpers";

export default function Investors() {
    const router = useRouter();
    const { investorId } = router.query;

    const { superData } = useSuper();
    const { investorData, setInvestorDetails, clearInvestorDetails } = useInvestor();

    const [investor, setInvestor] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (!investorId) return;

        setLoader(true);

        SUPER_INVESTORS_API.getInvestorDetails({ token: superData.token, investorId })
            .then((results) => {
                const superResponse = results.data;

                if (superResponse.status === "success") {
                    superResponse.data.title = "Authenticating As Investor";
                    superResponse.data.subtitle = "Please wait while we authenticate you as the investor";

                    setTimeout(() => {
                        setLoader(false);
                        setInvestor(superResponse.data);
                    }, 2000);
                }
            })
            .catch((error) => {
                setLoader(false);
                consoleLogger("SUPER INVESTOR DETAILS ERROR: ", error);
            })
            .finally(() => {});
    }, [investorId]);

    const handleInvestorLogin = () => {
        setLoader(true);

        SUPER_AUTH_API.loginAsInvestor({ token: superData.token, username: investor.username })
            .then((results) => {
                const superResponse = results.data;

                if (superResponse.status === "success") {
                    superResponse.data.isSuper = true;

                    setInvestorDetails(superResponse.data);
                    setTimeout(() => {
                        setLoader(false);

                        const investorWindow = window.open(
                            APPLICATION_URLS.INVESTOR_DASHBOARD.url,
                            "Data",
                            "height=500,width=1000,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no"
                        );

                        var timer = setInterval(function () {
                            if (investorWindow.closed) {
                                clearInterval(timer);
                                clearInvestorDetails(true);
                            }
                        }, 1000);

                        //router.push(APPLICATION_URLS.SUPER_DASHBOARD.url);
                    }, 2000);
                }
            })
            .catch((error) => {
                setLoader(false);
                consoleLogger("SUPER INVESTOR LOGIN ERROR: ", error);
            })
            .finally(() => {});
    };
    return (
        <SuperLayout>
            <Head>
                <title>Investor Details | Super</title>
                <meta property="og:title" content="Investor Details | Super" key="investors-super" />
            </Head>

            <PageHeader title="Investor Details" />

            <PageContainer>
                {loader && (
                    <Loader
                        title={investor?.title || "Loading Investor Details"}
                        subtitle={investor?.subtitle || "Please wait while we get investor details"}
                    />
                )}

                <div>Investor Details {investorId}</div>

                <button className="btn btn-secondary" onClick={handleInvestorLogin}>
                    Login as investor
                </button>
            </PageContainer>
        </SuperLayout>
    );
}
