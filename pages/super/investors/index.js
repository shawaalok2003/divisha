import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SuperLayout from "../../../components/layout/SuperLayout";
import PageSize from "../../../components/PageSize";

import useStartup from "../../../hooks/useStartup";
import useSuper from "../../../hooks/useSuper";

import SUPER_INVESTORS_API from "../../../api/super/investors";
import Table from "../../../components/Table";
import DateUtil from "../../../helpers/date";
import PageHeader from "../../../components/PageHeader";
import PageContainer from "../../../components/PageContainer";
import { consoleLogger } from "../../../helpers";
import AddInvestor from "./Add";
import InvestorDetail from "./Detail";

export default function Investors() {
    const router = useRouter();
    const { startup } = useStartup();
    const { superData } = useSuper();

    const [investorModals, setInvestorModals] = useState({
        add: false,
        detail: false,
    });
    const [investors, setInvestors] = useState([]);
    const [investorsCount, setMembersCount] = useState(0);
    const [investorDetails, setInvestorDetails] = useState(null);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    const investorTableHeaders = [
        { label: "Investor Id", class: "w-10" },
        { label: "Name" },
        { label: "Email" },
        { label: "Mobile" },
        { label: "Joined On" },
    ];
    const messages = { noData: "No Investors Found" };

    const formatInvestorData = (data = []) => {
        return data.map((d) => {
            return {
                investorId: d.investorId,
                name: `${d.firstName} ${d.lastName}`,
                email: d.email,
                mobile: d.mobile,
                joinedOn: DateUtil.getCustomerFormattedDate(d.createdAt, null, superData?.timeZone || null),
            };
        });
    };

    useEffect(() => {
        setLoader(true);

        SUPER_INVESTORS_API.getInvestorsList({
            token: superData.token,
            page: pageNo,
            limit: pageSize,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setInvestors(startupResponse.data);
                    setMembersCount(startupResponse.count);
                } else {
                    setInvestors([]);
                    setMembersCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("INVESTORS LIST ERROR: ", error);

                setInvestors([]);
                setMembersCount(0);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            });
    }, [pageNo, pageSize, reload]);

    return (
        <SuperLayout>
            <Head>
                <title>Investors | Super</title>
                <meta property="og:title" content="Investors | Super" key="investors-super" />
            </Head>

            <PageHeader title="Investors" subtitle="List of investors" />

            <PageContainer>
                <div className="row mb-5">
                    <div className="col-lg-6">
                        <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                    </div>
                    <div className="col-lg-6 text-right">
                        <button className="btn btn-primary" onClick={() => setInvestorModals({ ...investorModals, add: true })}>
                            <i className="fas fa-plus mr-2"></i>Add Investor
                        </button>
                    </div>
                </div>

                <Table
                    headers={investorTableHeaders}
                    data={formatInvestorData(investors)}
                    messages={messages}
                    pagination={{
                        pageNo,
                        setPageNo,
                        pageSize,
                        count: investorsCount,
                    }}
                    onRowClick={({ tabData }) => {
                        //router.push(APPLICATION_URLS.SUPER_INVESTORS.url + `/${tabData.investorId}`);
                        const foundInvestor = investors.find((o) => o.investorId === tabData.investorId);

                        setInvestorDetails(foundInvestor);
                        setInvestorModals({ ...investorModals, detail: true });
                    }}
                    loader={loader}
                />

                <AddInvestor
                    show={investorModals.add}
                    onClose={() => {
                        setInvestorModals({ ...investorModals, add: false });
                    }}
                    onSuccess={() => {
                        setInvestorModals({ ...investorModals, add: false });
                        setReload(!reload);
                    }}
                />

                <InvestorDetail
                    show={investorModals.detail}
                    data={investorDetails}
                    onClose={() => {
                        setInvestorDetails(null);
                        setInvestorModals({ ...investorModals, detail: false });
                    }}
                />
            </PageContainer>
        </SuperLayout>
    );
}
