import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import COMMON_API from "../../api/common";
import STARTUP_API from "../../api/startup/startup";

import ListingLayout from "../../components/layout/ListingLayout";
import Loader from "../../components/Loader";
import { ALLOWED_SMS_COUNTRIES, APPLICATION_URLS } from "../../constants";
import { setStartupSession } from "../../helpers/session";
import useStartup from "../../hooks/useStartup";
import { consoleLogger } from "../../helpers";

export default function Login() {
    const router = useRouter();
    const { setStartupToken } = useStartup();

    const [registerData, setRegisterData] = useState({
        name: "",
        mobile: "",
        email: "",
        countryId: 0,
        agreement: false,
        type: "srotp",
        otp: "",
        error: "",
    });

    const [registerForm, setRegisterForm] = useState("register");

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    const [loader, setLoader] = useState(false);
    const [otpLoader, setOtpLoader] = useState(false);

    const handleStartupRegistration = (e) => {
        e.preventDefault();

        if (!registerData.countryId || registerData.countryId == 0) {
            setRegisterData({ ...registerData, error: "Please select country" });
            return;
        } else if (!registerData.name.length) {
            setRegisterData({ ...registerData, error: "Please enter startup name" });
            return;
        } else if (!registerData.mobile.length) {
            setRegisterData({ ...registerData, error: "Please enter startup mobile" });
            return;
        } else if (!registerData.email.length) {
            setRegisterData({ ...registerData, error: "Please enter startup email" });
            return;
        } else {
            setRegisterData({ ...registerData, error: "" });
        }
        setLoader(true);

        STARTUP_API.registerStartup({ ...registerData })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setTimeout(() => {
                        setLoader(false);
                        setRegisterForm("otp");
                        //setRegisterData({ ...registerData, otp: startupResponse.data.otp });
                    }, 2000);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                setLoader(false);
                setRegisterData({ ...registerData, error: error?.response?.data?.message || "Failed To Register Startup" });
            })
            .finally(() => { });
    };

    const handleOTPVerification2 = (e) => {
        e.preventDefault();

        STARTUP_API.verifyOTP({ ...registerData })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    // Startup Verified Success

                    setStartupSession(startupResponse.data.token);

                    router.push(APPLICATION_URLS.STARTUP_DASHBOARD.url);
                } else {
                    // Startup Verified Failed
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
            })
            .finally(() => { });
    };

    const handleOTPVerification = (e) => {
        e.preventDefault();
        setOtpLoader(true);

        setRegisterData({ ...registerData, error: "" });

        STARTUP_API.verifyOTP({ ...registerData })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    // Startup Verified Success
                    setStartupToken(startupResponse.data.token);
                    setStartupSession(startupResponse.data.token);

                    setTimeout(() => {
                        setOtpLoader(false);
                        router.push(APPLICATION_URLS.STARTUP_DASHBOARD.url);
                    }, 2000);
                } else {
                    // Startup Verified Failed
                    setRegisterData({ ...registerData, otp: "", error: "Invalid or Expired OTP" });
                    setOtpLoader(false);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                setRegisterData({ ...registerData, otp: "", error: "Invalid or Expired OTP" });
                setOtpLoader(false);
            })
            .finally(() => { });
    };

    useEffect(() => {
        COMMON_API.searchCountries({ page: 0, limit: 10000, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCountries(startupResponse.data);
                } else {
                    setCountries([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCountries([]);
            })
            .finally(() => { });
    }, []);

    return (
        <ListingLayout>
            <div className="page-title mt-10 pt-10 text-center">
                <div className="container">
                    <div>
                        <h1 className="mb-0 text-center animate__animated animate__fadeInDownn">
                            <span>Startup </span>
                            <span className="font-weight-light">Registration</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div>
                <div className="form-login-register">
                    {registerForm === "register" && !loader && (
                        <div className="form-login">
                            <div className="form-group mb-4">
                                <label htmlFor="country-list" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                    Country<span className="text-danger">*</span>
                                </label>
                                <select
                                    id="country-list"
                                    className="form-control color-gray"
                                    value={registerData.countryId}
                                    onChange={(e) => {
                                        setRegisterData({ ...registerData, countryId: e.target.value });
                                        setSelectedCountry(countries.find((c) => c.countryId == e.target.value) || {});
                                    }}
                                >
                                    <option value={0}>Select Country</option>
                                    {countries &&
                                        countries.map((country, countryIndex) => (
                                            <option key={`stw-country-${countryIndex}`} value={country.countryId}>
                                                {country.name || ""}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="username" className="text-dark">
                                    Startup Name<span className="text-danger">*</span>
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g.: Startupz World"
                                    value={registerData.name}
                                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="startup-mobile" className="text-dark">
                                    Mobile<span className="text-danger">*</span>
                                </label>
                                <div className="d-flex align-items-center">
                                    <img
                                        width={40}
                                        className="rounded"
                                        src={`/images/country/${selectedCountry?.shortName || "in"}.png`}
                                        alt={selectedCountry?.name || "India"}
                                        onError={(e) => (e.target.src = "/images/no-image.jpg")}
                                    />
                                    <div className="d-flex pl-2 pr-2">
                                        <span className="text-dark">+</span> <span className="text-dark">{selectedCountry?.mobileCode}</span>{" "}
                                    </div>
                                    <input
                                        id="startup-mobile"
                                        type="number"
                                        className="form-control"
                                        placeholder="Your 10 Digit Number"
                                        value={registerData.mobile}
                                        onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="startup-email" className="text-dark">
                                    Email<span className="text-danger">*</span>
                                </label>
                                <input
                                    id="startup-email"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g.: deepak@startxv.com"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                />
                            </div>
                            <div className="d-flex align-items-center form-group mt-6 mb-6">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={registerData.agreement ? "checked" : ""}
                                    onChange={(e) => setRegisterData({ ...registerData, agreement: !registerData.agreement })}
                                />
                                <label className="mb-0 font-size-sm">
                                    I have reviewed the Privacy Policy & agree to receive Text message and email alerts. By tapping Register you agree
                                    to our{" "}
                                    <Link href={APPLICATION_URLS.POLICY_TERMSOFUSE.url} className="text-primary font-weight-semibold" target="_blank">
                                        Terms of Use
                                    </Link>{" "}
                                    &{" "}
                                    <Link href={APPLICATION_URLS.POLICY_PRIVACY.url} className="text-primary font-weight-semibold" target="_blank">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {registerData && registerData.error.length > 0 && (
                                <div className="form-group mt-8 mb-8">
                                    <h6 className="text-danger text-center">{registerData.error}</h6>
                                </div>
                            )}

                            <div className="mt-5">
                                <button
                                    className="btn btn-primary btn-block font-weight-bold text-uppercase font-size-lg rounded-sm mb-8"
                                    onClick={handleStartupRegistration}
                                    disabled={
                                        !registerData.name.length ||
                                        !registerData.email.length ||
                                        !registerData.mobile.length ||
                                        (!registerData.countryId || registerData.countryId == 0) ||
                                        !registerData.agreement
                                    }
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    )}

                    {registerForm === "otp" && !otpLoader && (
                        <div className="form-login">
                            <div className="alert alert-warning mb-7 show">
                                <div className="font-size-lg py-0 mr-6 text-center">
                                    We have sent the OTP on your registered{" "}
                                    {ALLOWED_SMS_COUNTRIES.includes(parseInt(registerData?.countryId)) ? "mobile" : "email"}.
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
                                    value={registerData.otp}
                                    onChange={(e) => setRegisterData({ ...registerData, otp: e.target.value })}
                                />
                            </div>

                            {registerData.otp && registerData.otp.length == 6 && (
                                <div className="mt-10">
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

                    {loader && <Loader title="Registering Startup" subtitle="Please wait while we register your startup" />}
                    {otpLoader && <Loader title="Verifying OTP" subtitle="Please wait while we verify your register OTP" />}

                    <div className=" page-submit-listing mt-8">
                        <div className="page-description text-center font-size-md py-3 lh-15 mb-9">
                            <span className="font-weight-semibold text-dark">Returning User? Please </span>
                            <Link className="text-link font-weight-semibold" href={APPLICATION_URLS.STARTUP_LOGIN.url}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
