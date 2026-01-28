import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SUPER_AUTH_API from "../../../api/super/authentication";
import { APPLICATION_URLS } from "../../../constants";

import useSuper from "../../../hooks/useSuper";

import LeftMenu from "./LeftMenu";
import Loader from "../../Loader";

const SuperLayout = ({ children }) => {
    const router = useRouter();
    const { superData, setSuperDetails, clearSuperDetails, toggleSidebar } = useSuper();

    const [menuToggle, setMenuToggle] = useState(false);

    useEffect(() => {
        SUPER_AUTH_API.getSuperDetails({ token: superData?.token })
            .then((results) => {
                const superResponse = results.data;

                if (superResponse.status === "success") {
                    setSuperDetails(superResponse.data);
                } else {
                    router.push(APPLICATION_URLS.SUPER_LOGIN.url);
                }
            })
            .catch((error) => {
                const errorName = error?.response?.data?.error?.name;

                if (["TokenExpiredError", "JsonWebTokenError"].includes(errorName)) {
                    clearSuperDetails();

                    router.push(APPLICATION_URLS.SUPER_LOGIN.url);
                } else {
                    router.push(APPLICATION_URLS.SUPER_LOGIN.url);
                }
            })
            .finally(() => {});
    }, []);

    return (
        <>
            {superData?.token ? (
                <div id="site-wrapper" className="site-wrapper panel super-wrapper">
                    <LeftMenu menuToggle={superData?.sidebar} setMenuToggle={toggleSidebar} />

                    <div className="content-wrapper bg-gray-03">{children}</div>
                </div>
            ) : (
                <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
                    <Loader title="Loading..." />
                </div>
            )}
        </>
    );
};

export default SuperLayout;
