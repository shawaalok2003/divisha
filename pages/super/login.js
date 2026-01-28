import { useRouter } from "next/router";
import { useState } from "react";
import useSuper from "../../hooks/useSuper";

import Loader from "../../components/Loader";

import { consoleLogger, isDevEnv } from "../../helpers";
import SUPER_AUTH_API from "../../api/super/authentication";

import { APPLICATION_URLS } from "../../constants";
import { ASSETS } from "../../constants/assets";

export default function Login() {
    const router = useRouter();
    const { setSuperDetails } = useSuper();

    const [loginData, setLoginData] = useState({
        username: isDevEnv() ? "super@startupzworld.com" : "",
        password: isDevEnv() ? "startupzworld" : "",
        error: "",
    });

    const [loader, setLoader] = useState(false);

    const handleSuperLogin = (e) => {
        e.preventDefault();

        if (!loginData.username.length) {
            setLoginData({ ...loginData, error: "Please enter your username" });
            return;
        } else if (!loginData.password.length) {
            setLoginData({ ...loginData, error: "Please enter your password" });
            return;
        } else {
            setLoginData({ ...loginData, error: "" });
        }

        setLoader(true);

        SUPER_AUTH_API.loginSuper({ ...loginData })
            .then((results) => {
                const superResponse = results.data;

                if (superResponse.status === "success") {
                    setSuperDetails(superResponse.data);
                    setTimeout(() => {
                        setLoader(false);
                        router.push(APPLICATION_URLS.SUPER_DASHBOARD.url);
                    }, 2000);
                }
            })
            .catch((error) => {
                setLoader(false);
                consoleLogger("SUPER LOGIN ERROR: ", error);
                setLoginData({ ...loginData, error: error?.response?.data?.message || "Failed To Login Super" });
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
                                <span className="text-dark">Super </span>
                                <span className="text-dark font-weight-light">Login</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="form-login-register shadow border">
                        {!loader && (
                            <div className="form-login">
                                <div className="form-group mb-2">
                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        Username<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Mobile or Email"
                                        value={loginData.username}
                                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
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
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    />
                                </div>
                                {loginData && loginData.error.length > 0 && (
                                    <div className="form-group mt-8 mb-8">
                                        <h6 className="text-danger text-center">{loginData.error}</h6>
                                    </div>
                                )}
                                <button
                                    className="btn btn-primary btn-block font-weight-bold text-uppercase font-size-lg rounded-sm mb-8 mt-5"
                                    onClick={handleSuperLogin}
                                >
                                    Log In
                                </button>
                            </div>
                        )}

                        {loader && <Loader title="Verifying Credentials" subtitle="Please wait while we check if you are a registered super user" />}
                    </div>
                </div>
            </div>
        </div>
    );
}
