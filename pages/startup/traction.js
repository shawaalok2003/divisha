import Head from "next/head";
import { useState } from "react";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";

import useStartup from "../../hooks/useStartup";
import STARTUP_API from "../../api/startup/startup";
import { consoleLogger } from "../../helpers";

export default function StartupBusinessInfo() {
    const { startup } = useStartup();

    const defaultTraction = {
        noOfUsers: 0,
        totalRevenue: 0,
        annualRecurringRevenue: 0,
        customerRetentionRate: 0,
        momGrowth: 0,
        yoyGrowth: 0,
        averageOrderSize: 0,
        totalCitiesCovered: 0,
    };

    const [traction, setTraction] = useState({
        ...(startup.traction ? startup.traction : defaultTraction),
    });

    const [tractionLoader, setTractionLoader] = useState(false);
    const [growthLoader, setGrowthLoader] = useState(false);

    const handleStartupTractionUpdate = (e, growth = false) => {
        e.preventDefault();
        growth ? setGrowthLoader(true) : setTractionLoader(true);

        STARTUP_API.updateStartupTraction({
            token: startup.token,
            updateFields: { ...traction },
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
                    growth ? setGrowthLoader(false) : setTractionLoader(false);
                }, 2000);
            });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Traction | Startup</title>
                <meta property="og:title" content="Traction | Startup" key="traction-startup" />
            </Head>

            <div className="mb-10 pt-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Traction Information</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {tractionLoader && (
                                    <Loader title="Updating Traction Info" subtitle="Please wait while we update your traction information" />
                                )}

                                {!tractionLoader && (
                                    <div className="">
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">Annual Recurring Revenue</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={traction.annualRecurringRevenue}
                                                    onChange={(e) => setTraction({ ...traction, annualRecurringRevenue: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="trac-noOfUsers" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Total Revenue Till Date
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="trac-noOfUsers"
                                                    type="number"
                                                    value={traction.totalRevenue}
                                                    onChange={(e) => setTraction({ ...traction, totalRevenue: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="trac-noOfUsers" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Average Ticket / Order Size
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="trac-noOfUsers"
                                                    type="number"
                                                    value={traction.averageOrderSize}
                                                    onChange={(e) => setTraction({ ...traction, averageOrderSize: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="trac-noOfUsers" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Total No Of Cities Served
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="trac-noOfUsers"
                                                    type="number"
                                                    value={traction.totalCitiesCovered}
                                                    onChange={(e) => setTraction({ ...traction, totalCitiesCovered: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <button className="btn btn-secondary float-right font-size-lg mt-5" onClick={handleStartupTractionUpdate}>
                                            Save Traction Info
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Growth & Retention</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {growthLoader && (
                                    <Loader
                                        title="Updating Growth Info"
                                        subtitle="Please wait while we update your growth and retention information"
                                    />
                                )}

                                {!growthLoader && (
                                    <div className="">
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="trac-noOfUsers" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Total No Of Clients / Users Till Date
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="trac-noOfUsers"
                                                    type="number"
                                                    value={traction.noOfUsers}
                                                    onChange={(e) => setTraction({ ...traction, noOfUsers: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Customer Retention Rate ( % )
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={traction.customerRetentionRate}
                                                    onChange={(e) => setTraction({ ...traction, customerRetentionRate: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">MoM Growth</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={traction.momGrowth}
                                                    onChange={(e) => setTraction({ ...traction, momGrowth: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">YoY Growth</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={traction.yoyGrowth}
                                                    onChange={(e) => setTraction({ ...traction, yoyGrowth: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-secondary float-right font-size-lg mt-5"
                                            onClick={(e) => handleStartupTractionUpdate(e, true)}
                                        >
                                            Save Growth Info
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
