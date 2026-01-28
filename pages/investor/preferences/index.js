import { useState } from "react";
import Head from "next/head";

import InvestorLayout from "../../../components/layout/InvestorLayout";
import PageHeader from "../../../components/PageHeader";
import PageContainer from "../../../components/PageContainer";
import Picture from "../../../components/Picture";

import InvestorStartupPreference from "./Startup";
import InvestorInvestmentPreference from "./Investment";

import { ASSETS } from "../../../constants/assets";

import useInvestor from "../../../hooks/useInvestor";

const InvestorPreference = () => {
    const { investorData } = useInvestor();

    const [preferenceModals, setPreferenceModals] = useState({
        startup: false,
        investment: false,
    });

    return (
        <InvestorLayout>
            <Head>
                <title>Investor | Preference</title>
                <meta property="og:title" content="Investor | Preference" key="investor-preference" />
            </Head>

            <PageHeader title="Preferences" subtitle="All your preferences are here" />

            <PageContainer>
                <div className="row p-3">
                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setPreferenceModals({ ...preferenceModals, startup: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgSettings1} className="w-60" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Startup</h6>
                        </div>
                    </div>
                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setPreferenceModals({ ...preferenceModals, investment: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgInvestment} className="w-60" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Investment</h6>
                        </div>
                    </div>
                </div>

                <InvestorStartupPreference
                    show={preferenceModals.startup}
                    onClose={() => {
                        setPreferenceModals({ ...preferenceModals, startup: false });
                    }}
                    onDelete={() => {
                        setPreferenceModals({ ...preferenceModals, startup: false });
                    }}
                />

                <InvestorInvestmentPreference
                    show={preferenceModals.investment}
                    onClose={() => {
                        setPreferenceModals({ ...preferenceModals, investment: false });
                    }}
                    onDelete={() => {
                        setPreferenceModals({ ...preferenceModals, investment: false });
                    }}
                />
            </PageContainer>
        </InvestorLayout>
    );
};

export default InvestorPreference;
