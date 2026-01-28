import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import STARTUP_API from "../../api/startup/startup";

import ListingLayout from "../../components/layout/ListingLayout";
import Loader from "../../components/Loader";
import { ALLOWED_SMS_COUNTRIES, APPLICATION_URLS } from "../../constants";
import { clearStartupSession, setStartupSession } from "../../helpers/session";
import useStartup from "../../hooks/useStartup";
import { consoleLogger } from "../../helpers";

export default function Login() {
    const router = useRouter();
    const { clearStartupToken, setStartupToken } = useStartup();

    const [loginData, setLoginData] = useState({
        username: "",
        type: "slotp",
        otp: "",
        error: "",
    });

    const [loginForm, setLoginForm] = useState("login");
    const [loader, setLoader] = useState(false);
    const [otpLoader, setOtpLoader] = useState(false);

    const handleStartupLogin = (e) => {
        e.preventDefault();

        if (!loginData.username.length) {
            setLoginData({ ...loginData, error: "Please enter your username" });
            return;
        } else {
            setLoginData({ ...loginData, error: "" });
        }

        setLoader(true);

        STARTUP_API.loginStartup({ ...loginData })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setTimeout(() => {
                        setLoader(false);
                        setLoginForm("otp");
                        setLoginData({ ...loginData, countryId: startupResponse.data.countryId });
                    }, 2000);
                }
            })
            .catch((error) => {
                setLoader(false);
                consoleLogger("STARTUPS ERROR: ", error);
                setLoginData({ ...loginData, error: error?.response?.data?.message || "Failed To Login Startup" });
            })
            .finally(() => {});
    };

    const handleOTPVerification = (e) => {
        e.preventDefault();
        setOtpLoader(true);

        setLoginData({ ...loginData, error: "" });

        STARTUP_API.verifyOTP({ ...loginData })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    // Startup Verified Success
                    setStartupToken(startupResponse.data.token);

                    setTimeout(() => {
                        setOtpLoader(false);
                        router.push(APPLICATION_URLS.STARTUP_DASHBOARD.url);
                    }, 2000);
                } else {
                    // Startup Verified Failed
                    setLoginData({ ...loginData, otp: "", error: "Invalid or Expired OTP" });
                    setOtpLoader(false);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                setLoginData({ ...loginData, otp: "", error: "Invalid or Expired OTP" });
                setOtpLoader(false);
            })
            .finally(() => {});
    };

    return (
        <ListingLayout>
            <div className="page-title mt-10 pt-10 text-center">
                <div className="container">
                    <div>
                        <h1 className="mb-0 text-center animate__animated animate__fadeInDownn">
                            <span>Startup </span>
                            <span className="font-weight-light">Login</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div>
                <div className="form-login-register">
                    {loginForm === "login" && !loader && (
                        <div className="form-login">
                            <div className="form-group mb-2">
                                <label htmlFor="username" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                    Username<span className="text-danger">*</span>
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Mobile or Email"
                                    value={loginData.username}
                                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                />
                            </div>
                            {/* <div className="form-group mb-3">
                                <div className="input-group flex-nowrap align-items-center">
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input id="password" type="text" className="form-control" placeholder="Password" />
                                    <Link href={APPLICATION_URLS.STARTUP_FORGOT_PASSWORD.url} className="input-group-append text-decoration-none">
                                        Forgot?
                                    </Link>
                                </div>
                            </div> */}
                            {/* <div className="form-group mb-6">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="check" />
                                    <label className="custom-control-label text-dark" htmlFor="check">
                                        Remember
                                    </label>
                                </div>
                            </div> */}
                            {loginData && loginData.error.length > 0 && (
                                <div className="form-group mt-8 mb-8">
                                    <h6 className="text-danger text-center">{loginData.error}</h6>
                                </div>
                            )}
                            <button
                                className="btn btn-primary btn-block font-weight-bold text-uppercase font-size-lg rounded-sm mb-8 mt-5"
                                onClick={handleStartupLogin}
                            >
                                Log In
                            </button>
                        </div>
                    )}

                    {loginForm === "otp" && !otpLoader && (
                        <div className="form-login">
                            <div className="alert alert-warning mb-7 show">
                                <div className="font-size-lg py-0 mr-6 text-center">
                                    We have sent the OTP on your registered{" "}
                                    {ALLOWED_SMS_COUNTRIES.includes(loginData?.countryId) ? "mobile" : "email"}.
                                </div>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="otp" className="text-dark">
                                    OTP<span className="text-danger">*</span>
                                </label>
                                <input
                                    id="otp"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter 6 Digit OTP"
                                    value={loginData.otp}
                                    onChange={(e) => setLoginData({ ...loginData, otp: e.target.value })}
                                />
                            </div>

                            {loginData && loginData.error.length > 0 && (
                                <div className="form-group mt-8 mb-8">
                                    <h6 className="text-danger text-center">{loginData.error}</h6>
                                </div>
                            )}

                            {loginData.otp && loginData.otp.length == 6 && (
                                <div className="mt-5">
                                    <button
                                        className="btn btn-primary btn-block font-weight-bold text-uppercase font-size-lg rounded-sm mb-8"
                                        onClick={handleOTPVerification}
                                    >
                                        Verify
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {loader && <Loader title="Verifying Username" subtitle="Please wait while we check if you are a registered startup" />}
                    {otpLoader && <Loader title="Verifying OTP" subtitle="Please wait while we verify your login OTP" />}

                    <div className="page-submit-listing mt-8">
                        <div className="page-description text-center font-size-md py-3 lh-15 mb-9">
                            <span className="font-weight-semibold text-dark">New User? Please </span>
                            <Link className="text-link font-weight-semibold" href={APPLICATION_URLS.STARTUP_REGISTER.url}>
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
