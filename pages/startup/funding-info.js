import Head from "next/head";
import { useState } from "react";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";

import useStartup from "../../hooks/useStartup";
import STARTUP_FUNDING_API from "../../api/startup/funding-info";
import { getFormattedDateOnly } from "../../helpers/date";
import { consoleLogger } from "../../helpers";

export default function StartupFundingInfo() {
    const { startup } = useStartup();

    const [fundMode, setFundMode] = useState(startup?.fundingInfo?.fundMode || "bootstrapped");
    const [fundType, setFundType] = useState(startup?.fundingInfo?.fundType || "crowd");
    const [fundDate, setFundDate] = useState(getFormattedDateOnly(startup?.fundingInfo?.fundDate) || "");
    const [noOfInvestors, setNoOfInvestors] = useState(startup?.fundingInfo?.noOfInvestors || 0);
    const [investorDetails, setInvestorDetails] = useState(startup?.fundingInfo?.investorDetails || "");

    const [interestedInFunding, setInterestedInFunding] = useState(startup?.fundingInfo?.interestedInFunding || "no");
    const [dealRound, setDealRound] = useState(startup?.fundingInfo?.dealRound || "crowd");
    const [preMoneyValuation, setPreMoneyValuation] = useState(startup?.fundingInfo?.preMoneyValuation || 0);
    const [amountNeededToRaise, setAmountNeededToRaise] = useState(startup?.fundingInfo?.amountNeededToRaise || 0);
    const [averageMonthlyCashBurn, setAverageMonthlyCashBurn] = useState(startup?.fundingInfo?.averageMonthlyCashBurn || 0);
    const [averageMonthlyRevenue, setAverageMonthlyRevenue] = useState(startup?.fundingInfo?.averageMonthlyRevenue || 0);
    const [pitchDeckReady, setPitchDeckReady] = useState(startup?.fundingInfo?.pitchDeckReady || "no");
    const [dueDiligenceReady, setDueDiligenceReady] = useState(startup?.fundingInfo?.dueDiligenceReady || "no");
    const [investmentBasis, setInvestmentBasis] = useState(startup?.fundingInfo?.investmentBasis || "equity");

    const [fundingInfoLoader, setFundingInfoLoader] = useState(false);
    const [fundingInterestLoader, setFundingInterestLoader] = useState(false);

    const handleStartupFundingInfoUpdate = (e) => {
        e.preventDefault();
        setFundingInfoLoader(true);

        STARTUP_FUNDING_API.updateStartupFundingInfo({
            token: startup.token,
            updateFields: {
                ...(fundMode ? { fundMode } : {}),
                ...(fundType ? { fundType } : {}),
                ...(fundDate ? { fundDate } : {}),
                ...(noOfInvestors ? { noOfInvestors } : {}),
                ...(investorDetails ? { investorDetails } : {}),
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
                    setFundingInfoLoader(false);
                }, 2000);
            });
    };

    const handleStartupFundingInterestUpdate = (e) => {
        e.preventDefault();
        setFundingInterestLoader(true);

        STARTUP_FUNDING_API.updateStartupFundingInfo({
            token: startup.token,
            updateFields: {
                ...(interestedInFunding ? { interestedInFunding } : {}),
                ...(dealRound ? { dealRound } : {}),
                ...(preMoneyValuation ? { preMoneyValuation } : {}),
                ...(amountNeededToRaise ? { amountNeededToRaise } : {}),
                ...(averageMonthlyCashBurn ? { averageMonthlyCashBurn } : {}),
                ...(averageMonthlyRevenue ? { averageMonthlyRevenue } : {}),
                ...(pitchDeckReady ? { pitchDeckReady } : {}),
                ...(dueDiligenceReady ? { dueDiligenceReady } : {}),
                ...(investmentBasis ? { investmentBasis } : {}),
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
                    setFundingInterestLoader(false);
                }, 2000);
            });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Funding Info | Startup</title>
                <meta property="og:title" content="Funding Info | Startup" key="funding-info-startup" />
            </Head>

            <div className="mb-10 pt-2">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Basic Funding Info</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {fundingInfoLoader && (
                                    <Loader title="Updating Funding Info" subtitle="Please wait while we update your funding information" />
                                )}
                                {!fundingInfoLoader && (
                                    <div className="">
                                        <div className="form-row mb-2">
                                            <div className="col-sm-6 mb-2 mb-sm-0 typography" onClick={() => setFundMode("bootstrapped")}>
                                                <div class={`alert ${fundMode === "bootstrapped" ? "alert-success" : "alert-secondary"} mb-4 p-0`}>
                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                        {fundMode === "bootstrapped" ? (
                                                            <span className="fas fa-check-circle"></span>
                                                        ) : (
                                                            <span className="far fa-circle"></span>
                                                        )}
                                                    </div>
                                                    <div className="message text-uppercase font-weight-semibold">Bootstrapped</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-2 mb-sm-0 typography" onClick={() => setFundMode("funded")}>
                                                <div class={`alert ${fundMode === "funded" ? "alert-success" : "alert-secondary"} mb-4 p-0`}>
                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                        {fundMode === "funded" ? (
                                                            <span className="fas fa-check-circle"></span>
                                                        ) : (
                                                            <span className="far fa-circle"></span>
                                                        )}
                                                    </div>
                                                    <div className="message text-uppercase font-weight-semibold">Funded</div>
                                                </div>
                                            </div>
                                        </div>

                                        {fundMode === "funded" && (
                                            <div className="form-row mb-2">
                                                <div className="col-sm-12 mb-2">
                                                    <label htmlFor="business-fundType" className="font-size-md text-dark font-weight-semibold mb-1">
                                                        Funding Type<span className="text-danger">*</span>
                                                    </label>
                                                    <select className="form-control" value={fundType} onChange={(e) => setFundType(e.target.value)}>
                                                        <option value={"crowd"}>Crowd Funded</option>
                                                        <option value={"preseed"}>Pre-Seed Funded</option>
                                                        <option value={"seed"}>Seed Funded</option>
                                                        <option value={"seriesa"}>Series A</option>
                                                        <option value={"seriesb"}>Series B</option>
                                                        <option value={"seriesc"}>Series C</option>
                                                        <option value={"seriesd"}>Series D</option>
                                                        <option value={"seriese"}>Series E</option>
                                                        <option value={"seriesf"}>Series F</option>
                                                        <option value={"seriesg"}>Series G</option>
                                                        <option value={"seriesh"}>Series H</option>
                                                    </select>
                                                </div>

                                                <div className="col-sm-12 mb-2">
                                                    <label
                                                        htmlFor="business-funding-date"
                                                        className="text-dark font-weight-semibold font-size-md mb-2 lh-15"
                                                    >
                                                        Funded On<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="business-funding-date"
                                                        className="form-control"
                                                        placeholder="Enter Funding Date"
                                                        max={getFormattedDateOnly(new Date().toISOString())}
                                                        value={fundDate}
                                                        onChange={(e) => setFundDate(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-sm-12 mb-2">
                                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                        No Of Investors Participated<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter No Of Investors"
                                                        value={noOfInvestors}
                                                        onChange={(e) => setNoOfInvestors(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-sm-12 mb-2">
                                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                        Investor Details<span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={9}
                                                        placeholder="e.g. Investor Name, Mobile, Email, Location, Amount."
                                                        value={investorDetails}
                                                        onChange={(e) => setInvestorDetails(e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        )}

                                        <button className="btn btn-secondary float-right font-size-lg mt-5" onClick={handleStartupFundingInfoUpdate}>
                                            Save Funding Info
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Are you looking to raise funds?</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {fundingInterestLoader && (
                                    <Loader title="Updating Funding Interest" subtitle="Please wait while we update your funding interest" />
                                )}
                                {!fundingInterestLoader && (
                                    <div className="">
                                        <div className="form-row mb-2">
                                            <div className="col-sm-6 mb-2 mb-sm-0 typography" onClick={() => setInterestedInFunding("no")}>
                                                <div class={`alert ${interestedInFunding === "no" ? "alert-danger" : "alert-secondary"} mb-4 p-0`}>
                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                        {interestedInFunding === "no" ? (
                                                            <span className="fas fa-times-circle"></span>
                                                        ) : (
                                                            <span className="far fa-circle"></span>
                                                        )}
                                                    </div>
                                                    <div className="message text-uppercase font-weight-semibold">No</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-2 mb-sm-0 typography" onClick={() => setInterestedInFunding("yes")}>
                                                <div class={`alert ${interestedInFunding === "yes" ? "alert-success" : "alert-secondary"} mb-4 p-0`}>
                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                        {interestedInFunding === "yes" ? (
                                                            <span className="fas fa-check-circle"></span>
                                                        ) : (
                                                            <span className="far fa-circle"></span>
                                                        )}
                                                    </div>
                                                    <div className="message text-uppercase font-weight-semibold">Yes</div>
                                                </div>
                                            </div>
                                        </div>

                                        {interestedInFunding === "yes" && (
                                            <div className="form-row mb-2">
                                                <div className="col-sm-12 mb-2">
                                                    <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                        Deal Round<span className="text-danger">*</span>
                                                    </label>
                                                    <select className="form-control" value={dealRound} onChange={(e) => setDealRound(e.target.value)}>
                                                        <option value={"crowd"}>Crowd Fund</option>
                                                        <option value={"preseed"}>Pre-Seed Fund</option>
                                                        <option value={"seed"}>Seed Fund</option>
                                                        <option value={"seriesa"}>Series A</option>
                                                        <option value={"seriesb"}>Series B</option>
                                                        <option value={"seriesc"}>Series C</option>
                                                        <option value={"seriesd"}>Series D</option>
                                                        <option value={"seriese"}>Series E</option>
                                                        <option value={"seriesf"}>Series F</option>
                                                        <option value={"seriesg"}>Series G</option>
                                                        <option value={"seriesh"}>Series H</option>
                                                    </select>
                                                </div>

                                                <div className="col-sm-12 mb-2">
                                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                        Pre Money Valuation<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Pre Money Valuation"
                                                        value={preMoneyValuation}
                                                        onChange={(e) => setPreMoneyValuation(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                        How much amount are you looking to raise<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Amount Needed To Raise"
                                                        value={amountNeededToRaise}
                                                        onChange={(e) => setAmountNeededToRaise(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                        Average Monthly Cash Burn<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Average Monthly Cash Burn"
                                                        value={averageMonthlyCashBurn}
                                                        onChange={(e) => setAverageMonthlyCashBurn(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <label className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                        Average Monthly Revenue<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Average Monthly Revenue"
                                                        value={averageMonthlyRevenue}
                                                        onChange={(e) => setAverageMonthlyRevenue(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                        Is Your Pitch Deck Ready?<span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        value={pitchDeckReady}
                                                        onChange={(e) => setPitchDeckReady(e.target.value)}
                                                    >
                                                        <option value={"no"}>No</option>
                                                        <option value={"yes"}>Yes</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                        Is Due Diligence Report Ready?<span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        value={dueDiligenceReady}
                                                        onChange={(e) => setDueDiligenceReady(e.target.value)}
                                                    >
                                                        <option value={"no"}>No</option>
                                                        <option value={"yes"}>Yes</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                        Investment will be based on?<span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        value={investmentBasis}
                                                        onChange={(e) => setInvestmentBasis(e.target.value)}
                                                    >
                                                        <option value={"equity"}>Equity Dilution</option>
                                                        <option value={"debt"}>Debt Funding</option>
                                                        <option value={"convdebt"}>Convertible Debt</option>
                                                        <option value={"crowdfund"}>Crowd-Funding</option>
                                                        <option value={"csr"}>CSR</option>
                                                        <option value={"all"}>All</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            className="btn btn-secondary float-right font-size-lg mt-5"
                                            onClick={handleStartupFundingInterestUpdate}
                                        >
                                            Save Funding Interest
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
