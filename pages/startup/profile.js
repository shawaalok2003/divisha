import Head from "next/head";
import { useState } from "react";

import StartupLayout from "../../components/layout/StartupLayout";
import useStartup from "../../hooks/useStartup";
import VERIFICATION_API from "../../api/verification";
import { consoleLogger } from "../../helpers";

export default function StartupBusinessInfo() {
    const { startup } = useStartup();

    const [email, setEmail] = useState(startup?.email || "");
    const [mobile, setMobile] = useState(startup?.mobile || "");

    const [message, setMessage] = useState("");

    const resendEmailVerificationLink = (e) => {
        e.preventDefault();

        setMessage(`Email Verification Link Has Been Sent To ${startup.email} `);

        VERIFICATION_API.resendEmail({ token: startup.token, type: "sreotp" })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setMessage(startupResponse.message);
                } else {
                    setMessage("Failed To Resend Email Verification Link !!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS VERIFICATION ERROR: ", error);

                setMessage(error.response.data.message || "Failed To Resend Email Verification Link !!");
            })
            .finally(() => {});
    };

    return (
        <StartupLayout>
            <Head>
                <title>My Profile | Startup</title>
                <meta property="og:title" content="My Profile | Startup" key="my-profile-startup" />
            </Head>

            <div className="mb-10 pt-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">My Profile</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                <div className="">
                                    <div className="form-row mb-2">
                                        <div className="col-sm-12 mb-2 mb-sm-0">
                                            <label htmlFor="business-email" className="font-size-md text-dark font-weight-semibold mb-1">
                                                Email
                                            </label>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    className="form-control"
                                                    id="business-email"
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    readOnly
                                                />
                                                <span
                                                    title={startup.emailVerified ? "Email Verified" : "Email Not Verified"}
                                                    className={`font-size-lg font-weight-semibold ml-2 ${
                                                        startup.emailVerified
                                                            ? "text-success fas fa-badge-check"
                                                            : "text-primary fas fa-times-octagon"
                                                    }`}
                                                ></span>
                                            </div>

                                            {!startup.emailVerified && (
                                                <div className="text-center py-5">
                                                    <span className="text-warning font-weight-semibold">{message || ""}</span>
                                                    <br />
                                                    <button className="btn btn-primary btn-sm mt-5" onClick={resendEmailVerificationLink}>
                                                        Resend Email Verification Link
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-row mb-2">
                                        <div className="col-sm-12 mb-2 mb-sm-0">
                                            <label htmlFor="business-mobile" className="font-size-md text-dark font-weight-semibold mb-1">
                                                Mobile <span className="text-danger">*</span>
                                            </label>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    className="form-control"
                                                    id="business-mobile"
                                                    type="text"
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    readOnly
                                                />
                                                <span
                                                    title={startup.mobileVerified ? "Mobile Verified" : "Mobile Not Verified"}
                                                    className={`font-size-lg font-weight-semibold ml-2 ${
                                                        startup.mobileVerified
                                                            ? "text-success fas fa-badge-check"
                                                            : "text-primary fas fa-times-octagon"
                                                    }`}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <button className="btn btn-secondary float-right font-size-lg mt-5">
                                            Save Tax Info
                                        </button> */}
                                </div>
                            </div>
                            <p className="text-center pt-5">
                                To update email or mobile, please reach out to:
                                <a href="mailto:support@startxv.com" className="text-primary font-weight-medium">
                                    {" "}
                                    support@startxv.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StartupLayout>
    );
}
