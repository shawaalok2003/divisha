import Head from "next/head";

import InvestorLayout from "../../../components/layout/InvestorLayout";
import PageHeader from "../../../components/PageHeader";
import PageContainer from "../../../components/PageContainer";

import useInvestor from "../../../hooks/useInvestor";
import { useEffect, useState } from "react";
import PageSize from "../../../components/PageSize";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import INVESTOR_STARTUP_PORTFOLIO_API from "../../../api/investor/startup-portfolio";
import { consoleLogger } from "../../../helpers";
import Picture from "../../../components/Picture";
import Badge from "../../../components/Badge";
import { ASSETS } from "../../../constants/assets";
import InvestorStartupDetail from "./Detail";
import InvestorStartupAdd from "./Add";

export default function InvestorStartupPortfolio() {
    const { investorData } = useInvestor();

    const [startupModals, setStartupModals] = useState({
        add: false,
        edit: false,
        detail: false,
    });

    const [startups, setStartups] = useState([]);
    const [startupsCount, setStartupsCount] = useState(0);
    const [startupDetails, setStartupDetails] = useState(null);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    const startupTableHeaders = [
        { label: "#", class: "w-10" },
        { label: "" },
        { label: "Activity" },
        { label: "Name" },
        { label: "Year" },
        { label: "Amount Invested" },
        { label: "" },
    ];
    const messages = { noData: "No Startups Found" };

    const formatStartupData = (data = []) => {
        return data.map((d) => {
            return {
                investorStartupId: d.investorStartupId,
                logo: <Picture src={d?.logo || ASSETS.noImage} width="30" />,
                activity: d.activity?.toUpperCase(),
                name: d.name,
                year: d.year,
                amountInvested: d.amountInvested,
                status: <Badge type="pill" text={d.status} color={d.status === "active" ? "green" : "primary"} className="text-capitalize" />,
            };
        });
    };

    useEffect(() => {
        setLoader(true);

        INVESTOR_STARTUP_PORTFOLIO_API.getStartups({
            token: investorData.token,
            page: pageNo,
            limit: pageSize,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartups(startupResponse.data);
                    setStartupsCount(startupResponse.count);
                } else {
                    setStartups([]);
                    setStartupsCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("INVESTOR STARTUPS LIST ERROR: ", error);

                setStartups([]);
                setStartupsCount(0);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            });
    }, [pageNo, pageSize, reload]);

    return (
        <InvestorLayout>
            <Head>
                <title>Investor | Startup</title>
                <meta property="og:title" content="Investor | Startup" key="investor-startup" />
            </Head>

            <PageHeader title="Portfolio" subtitle="List of startups invested" />

            <PageContainer>
                <div className="row mb-5">
                    <div className="col-lg-6">
                        <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                    </div>
                    <div className="col-lg-6 text-right">
                        <Button
                            text="Add Startup"
                            icon={<i className="fas fa-store mr-2"></i>}
                            onClick={() => setStartupModals({ ...startupModals, add: true })}
                        />
                    </div>
                </div>

                <Table
                    headers={startupTableHeaders}
                    data={formatStartupData(startups)}
                    messages={messages}
                    pagination={{
                        pageNo,
                        setPageNo,
                        pageSize,
                        count: startupsCount,
                    }}
                    onRowClick={({ tabData }) => {
                        const foundStartup = startups.find((o) => o.investorStartupId === tabData.investorStartupId);

                        setStartupDetails(foundStartup);
                        setStartupModals({ ...startupModals, detail: true });
                    }}
                    loader={loader}
                    loaderTitle="Loading Startups List"
                    loaderSubtitle="PLease wait while we fetch your startups list"
                />

                <InvestorStartupAdd
                    show={startupModals.add}
                    data={startupDetails}
                    onClose={() => {
                        setStartupDetails(null);
                        setStartupModals({ ...startupModals, add: false });
                    }}
                    onSuccess={(closeModal = false) => {
                        if (closeModal) setStartupModals({ ...startupModals, add: false });
                        setReload(!reload);
                    }}
                />

                <InvestorStartupDetail
                    show={startupModals.detail}
                    data={startupDetails}
                    onClose={() => {
                        setStartupDetails(null);
                        setStartupModals({ ...startupModals, detail: false });
                    }}
                    onDelete={() => {
                        setStartupModals({ ...startupModals, detail: false });
                        setReload(!reload);
                    }}
                />
            </PageContainer>
        </InvestorLayout>
    );
}
