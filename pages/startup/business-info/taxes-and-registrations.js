import Head from "next/head";
import { useState } from "react";

import STARTUP_API from "../../../api/startup/startup";

import StartupLayout from "../../../components/layout/StartupLayout";
import Loader from "../../../components/Loader";

import BusinessPageHeader from "../../../components/BusinessPageHeader";
import useStartup from "../../../hooks/useStartup";
import { consoleLogger } from "../../../helpers";

export default function StartupBusinessInfo() {
    const { startup } = useStartup();

    const [pan, setPan] = useState(startup?.info?.pan || "");
    const [tan, setTan] = useState(startup?.info?.tan || "");
    const [gstin, setGstin] = useState(startup?.info?.gstin || "");

    const [dpiit, setDpiit] = useState(startup?.info?.dpiit || "");
    const [msme, setMsme] = useState(startup?.info?.msme || "");

    const [taxLoader, setTaxLoader] = useState(false);
    const [regLoader, setRegLoader] = useState(false);

    const handleStartupTaxInfoUpdate = (e) => {
        e.preventDefault();
        setTaxLoader(true);

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields: {
                ...(pan ? { pan } : {}),
                ...(tan ? { tan } : {}),
                ...(gstin ? { gstin } : {}),
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    //
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                //
            })
            .finally(() => {
                setTimeout(() => {
                    setTaxLoader(false);
                }, 2000);
            });
    };

    const handleStartupRegInfoUpdate = (e) => {
        e.preventDefault();
        setRegLoader(true);

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields: {
                ...(dpiit ? { dpiit } : {}),
                ...(msme ? { msme } : {}),
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    //
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                //
            })
            .finally(() => {
                setTimeout(() => {
                    setRegLoader(false);
                }, 2000);
            });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Tax & Registration | Startup</title>
                <meta property="og:title" content="Tax & Registration | Startup" key="tax-and-registration-startup" />
            </Head>
            <BusinessPageHeader />

            <div className="mb-10 pt-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Tax Information</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {taxLoader && <Loader title="Updating Tax Info" subtitle="Please wait while we update your tax information" />}
                                {!taxLoader && (
                                    <div className="">
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-pan" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    PAN<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-pan"
                                                    type="text"
                                                    value={pan}
                                                    onChange={(e) => setPan(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-tan" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    TAN<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-tan"
                                                    type="text"
                                                    value={tan}
                                                    onChange={(e) => setTan(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-gstin" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    GSTIN<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-gstin"
                                                    type="text"
                                                    value={gstin}
                                                    onChange={(e) => setGstin(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <button className="btn btn-secondary float-right font-size-lg mt-5" onClick={handleStartupTaxInfoUpdate}>
                                            Save Tax Info
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Registrations Information</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {regLoader && (
                                    <Loader
                                        title="Updating Registration Info"
                                        subtitle="Please wait while we update your business registration information"
                                    />
                                )}
                                {!regLoader && (
                                    <div className="">
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-dpiit" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    DPIIT<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-dpiit"
                                                    type="text"
                                                    value={dpiit}
                                                    onChange={(e) => setDpiit(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-msme" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    MSME<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-msme"
                                                    type="text"
                                                    value={msme}
                                                    onChange={(e) => setMsme(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <button className="btn btn-secondary float-right font-size-lg mt-5" onClick={handleStartupRegInfoUpdate}>
                                            Save Reg Info
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StartupLayout>
    );
}
