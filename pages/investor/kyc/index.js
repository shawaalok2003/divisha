import { useState } from "react";
import Head from "next/head";

import InvestorLayout from "../../../components/layout/InvestorLayout";
import PageHeader from "../../../components/PageHeader";
import PageContainer from "../../../components/PageContainer";
import Picture from "../../../components/Picture";

import InvestorBankKYC from "./Bank";

import { ASSETS } from "../../../constants/assets";
import { APPLICATION_URLS } from "../../../constants";

import useInvestor from "../../../hooks/useInvestor";
import InvestorNomineeKYC from "./Nominee";
import InvestorDematKYC from "./Demat";
import InvestorTaxKYC from "./Tax";
import InvestorIdentityKYC from "./Identity";

const InvestorKYC = () => {
    const { investorData } = useInvestor();

    const [kycModals, setKYCModals] = useState({
        identity: false,
        tax: false,
        demat: false,
        bank: false,
        nominee: false,
    });

    return (
        <InvestorLayout>
            <Head>
                <title>Investor | KYC</title>
                <meta property="og:title" content="Investor | KYC" key="investor-kyc" />
            </Head>

            <PageHeader title="KYCs" subtitle="All your kyc information are here" />

            <PageContainer>
                <div className="row p-3">
                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setKYCModals({ ...kycModals, identity: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgIdentity} className="w-90" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Identity</h6>
                        </div>
                    </div>

                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setKYCModals({ ...kycModals, tax: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgTax} className="w-70" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Tax</h6>
                        </div>
                    </div>

                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setKYCModals({ ...kycModals, demat: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgTrade} className="w-100" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Demat</h6>
                        </div>
                    </div>

                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setKYCModals({ ...kycModals, bank: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgVault} className="w-100" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Bank</h6>
                        </div>
                    </div>

                    <div
                        className="col-sm-4 col-md-3 col-lg-2 bg-white rounded border p-5 shadow-sm cursor-pointer"
                        onClick={() => setKYCModals({ ...kycModals, nominee: true })}
                    >
                        <div className="d-flex flex-column align-items-center justify-content-between h-100">
                            <Picture src={ASSETS.bgTeamAdd} className="w-100" />
                            <h6 className="pt-5 text-secondary text-center text-uppercase">Nominee</h6>
                        </div>
                    </div>
                </div>

                <InvestorIdentityKYC
                    show={kycModals.identity}
                    onClose={() => {
                        setKYCModals({ ...kycModals, identity: false });
                    }}
                    onDelete={() => {
                        setKYCModals({ ...kycModals, identity: false });
                    }}
                />

                <InvestorTaxKYC
                    show={kycModals.tax}
                    onClose={() => {
                        setKYCModals({ ...kycModals, tax: false });
                    }}
                    onDelete={() => {
                        setKYCModals({ ...kycModals, tax: false });
                    }}
                />

                <InvestorDematKYC
                    show={kycModals.demat}
                    onClose={() => {
                        setKYCModals({ ...kycModals, demat: false });
                    }}
                    onDelete={() => {
                        setKYCModals({ ...kycModals, demat: false });
                    }}
                />

                <InvestorBankKYC
                    show={kycModals.bank}
                    onClose={() => {
                        setKYCModals({ ...kycModals, bank: false });
                    }}
                    onDelete={() => {
                        setKYCModals({ ...kycModals, bank: false });
                    }}
                />

                <InvestorNomineeKYC
                    show={kycModals.nominee}
                    onClose={() => {
                        setKYCModals({ ...kycModals, nominee: false });
                    }}
                    onDelete={() => {
                        setKYCModals({ ...kycModals, nominee: false });
                    }}
                />
            </PageContainer>
        </InvestorLayout>
    );
};

export default InvestorKYC;
