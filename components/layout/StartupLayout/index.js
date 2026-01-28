import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import STARTUP_API from "../../../api/startup/startup";
import { APPLICATION_URLS } from "../../../constants";

import { getYear } from "../../../helpers/date";
import useStartup from "../../../hooks/useStartup";

import LeftMenu from "./LeftMenu";
import TopMenu from "./TopMenu";
import Loader from "../../Loader";

const StartupLayout = ({ children }) => {
    const router = useRouter();
    const { startup, setStartupDetails, clearStartupToken, clearStartupDetails } = useStartup();

    const deployedYear = 2023;
    const currentYear = getYear();

    const footerYear = deployedYear === currentYear ? `${currentYear}` : `${deployedYear} - ${currentYear}`;

    const [menuToggle, setMenuToggle] = useState(false);

    useEffect(() => {
        STARTUP_API.getStartupDetails({ token: startup.token })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartupDetails(startupResponse.data);
                } else {
                    router.push(APPLICATION_URLS.STARTUP_LOGIN.url);
                }
            })
            .catch((error) => {
                const errorName = error?.response?.data?.error.name;

                if (["TokenExpiredError", "JsonWebTokenError"].includes(errorName)) {
                    clearStartupToken();
                    clearStartupDetails();

                    setTimeout(() => {
                        router.push(APPLICATION_URLS.STARTUP_LOGIN.url);
                    }, 1000);
                } else {
                    router.push(APPLICATION_URLS.STARTUP_LOGIN.url);
                }
            })
            .finally(() => {});
    }, []);

    return (
        <>
            {startup?.token ? (
                <div id="site-wrapper" className="site-wrapper panel dashboards">
                    <TopMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />

                    <div className="wrapper-content mt-9 pt-0 pb-0">
                        <div className="page-wrapper d-flex flex-wrap flex-xl-nowrap">
                            <LeftMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
                            <div className="page-container custom-page-container">
                                <div className="container-fluid">
                                    <div className="page-content-wrapper">{children}</div>
                                    <div className="copy-right mt-auto text-center">&copy; {footerYear} SartupzWorld. All Rights Reserved.</div>
                                </div>
                            </div>
                        </div>
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

export default StartupLayout;
