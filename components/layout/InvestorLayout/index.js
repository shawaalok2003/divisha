import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LeftMenu from "./LeftMenu";
import Loader from "../../Loader";

import useInvestor from "../../../hooks/useInvestor";

import { APPLICATION_URLS } from "../../../constants";
import INVESTOR_AUTH_API from "../../../api/investor/authentication";

const InvestorLayout = ({ children }) => {
    const router = useRouter();
    const { investorData, setInvestorDetails, clearInvestorDetails, toggleSidebar } = useInvestor();

    useEffect(() => {
        INVESTOR_AUTH_API.getInvestorDetails({ token: investorData?.token })
            .then((results) => {
                const investorResponse = results.data;

                if (investorResponse.status === "success" && investorResponse?.data?.status === "active") {
                    setInvestorDetails(investorResponse.data);
                } else {
                    router.push(APPLICATION_URLS.INVESTOR_LOGIN.url);
                }
            })
            .catch((error) => {
                const errorName = error?.response?.data?.error?.name;

                if (["TokenExpiredError", "JsonWebTokenError"].includes(errorName)) {
                    clearInvestorDetails();

                    router.push(APPLICATION_URLS.INVESTOR_LOGIN.url);
                } else {
                    router.push(APPLICATION_URLS.INVESTOR_LOGIN.url);
                }
            })
            .finally(() => {});
    }, []);

    return (
        <>
            {investorData?.token ? (
                <div className="site-wrapper panel super-wrapper">
                    <LeftMenu menuToggle={investorData?.sidebar} setMenuToggle={toggleSidebar} />

                    <div className="content-wrapper bg-gray-03">
                        {investorData?.isSuper === true && (
                            <div className="bg-primary text-white text-center font-weight-medium font-size-sm">
                                You are a super user and has logged in as investor. Please note that your changes done in this mode will be visible to
                                the investor.
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            ) : (
                <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
                    <Loader title="Loading..." />
                </div>
            )}
        </>
    );
};

export default InvestorLayout;
