import { useRouter } from "next/router";
import { useState } from "react";
import useInvestor from "../../hooks/useInvestor";

import Loader from "../../components/Loader";
import Select from "../../components/Select";

import { consoleLogger, isDevEnv } from "../../helpers";
import INVESTOR_AUTH_API from "../../api/investor/authentication";

import { APPLICATION_URLS, INVESTOR_TYPES } from "../../constants";
import { ASSETS } from "../../constants/assets";
import Link from "next/link";

export default function Register() {
    const router = useRouter();
    const { setInvestorDetails } = useInvestor();

    const [registerData, setRegisterData] = useState({
        type: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobile: "",
        error: "",
        agreement: false,
        success: "",
    });

    const [loader, setLoader] = useState(false);

    const handleInvestorRegister = (e) => {
        e.preventDefault();

        if (!registerData.type.length) {
            setRegisterData({ ...registerData, error: "Please select investor type" });
            return;
        } else if (!registerData.username.length) {
            setRegisterData({ ...registerData, error: "Please enter your username" });
            return;
        } else if (!registerData.password.length) {
            setRegisterData({ ...registerData, error: "Please enter your password" });
            return;
        } else if (!registerData.firstName.length) {
            setRegisterData({ ...registerData, error: "Please enter your first name" });
            return;
        } else if (!registerData.mobile.length) {
            setRegisterData({ ...registerData, error: "Please enter your mobile" });
            return;
        } else {
            setRegisterData({ ...registerData, error: "" });
        }

        setLoader(true);

        INVESTOR_AUTH_API.registerInvestor({ ...registerData })
            .then((results) => {
                const investorResponse = results.data;

                if (investorResponse.status === "success") {
                    if (investorResponse.data?.status === "active") {
                        setInvestorDetails({ ...investorResponse?.data, isSuper: false });
                        setTimeout(() => {
                            setLoader(false);
                            router.push(APPLICATION_URLS.INVESTOR_DASHBOARD.url);
                        }, 2000);
                    } else {
                        setRegisterData({
                            ...registerData,
                            error: investorResponse?.message || "Thank You For Registering. Your Account Will Be Activated Soon Upon Verification",
                        });
                        setLoader(false);
                    }
                }
            })
            .catch((error) => {
                setLoader(false);
                consoleLogger("INVESTOR LOGIN ERROR: ", error);
                setRegisterData({ ...registerData, error: error?.response?.data?.message || "Failed To Register Investor" });
            })
            .finally(() => {});
    };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundImage: `url(${ASSETS.bgWhiteHexagon})`, backgroundSize: "cover", height: "100vh" }}
        >
            <div className="w-100">
                <div className="page-title text-center">
                    <div className="container">
                        <div>
                            <h1 className="mb-0 text-center animate__animated animate__fadeInDownn">
                                <span className="text-dark">Investor </span>
                                <span className="text-dark font-weight-light">Register</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="form-login-register shadow border">
                        {!loader && (
                            <div className="form-login">
                                <div className="form-group mb-2">
                                    <Select
                                        title="Investor Type"
                                        options={[{ name: "Select Investor Type", value: "" }, ...INVESTOR_TYPES]}
                                        required
                                        value={registerData.type}
                                        onChange={(e) => setRegisterData({ ...registerData, type: e.target.value })}
                                    ></Select>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        First Name<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Startup"
                                        value={registerData.firstName}
                                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. World"
                                        value={registerData.lastName}
                                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        Username<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={registerData.username}
                                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        Mobile<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Mobile"
                                        value={registerData.mobile}
                                        onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        Password<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
                                        I have reviewed the Privacy Policy & agree to receive Text message and email alerts. By tapping Register you
                                        agree to our{" "}
                                        <Link
                                            href={APPLICATION_URLS.POLICY_TERMSOFUSE.url}
                                            className="text-primary font-weight-semibold"
                                            target="_blank"
                                        >
                                            Terms of Use
                                        </Link>{" "}
                                        &{" "}
                                        <Link
                                            href={APPLICATION_URLS.POLICY_PRIVACY.url}
                                            className="text-primary font-weight-semibold"
                                            target="_blank"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                {registerData && registerData.error.length > 0 && (
                                    <div className="form-group mt-8 mb-8">
                                        <h6 className="text-danger text-center">{registerData.error}</h6>
                                    </div>
                                )}
                                <button
                                    className="btn btn-primary btn-block font-weight-bold text-uppercase font-size-lg rounded-sm mb-8 mt-5"
                                    onClick={handleInvestorRegister}
                                >
                                    Register
                                </button>

                                <div className="page-submit-listing mt-8">
                                    <div className="page-description text-center font-size-md py-3 lh-15">
                                        <span className="font-weight-semibold text-dark">Already Registered? </span>
                                        <Link className="text-link font-weight-semibold" href={APPLICATION_URLS.INVESTOR_LOGIN.url}>
                                            Login Here
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {loader && <Loader title="Verifying Credentials" subtitle="Please wait while we check if you are a registered investor" />}
                    </div>
                </div>
            </div>
        </div>
    );
}
