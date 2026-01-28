import Head from "next/head";
import { useEffect, useState } from "react";

import InvestorLayout from "../../../components/layout/InvestorLayout";
import PageSize from "../../../components/PageSize";

import useInvestor from "../../../hooks/useInvestor";

import Table from "../../../components/Table";
import PageHeader from "../../../components/PageHeader";
import PageContainer from "../../../components/PageContainer";

import { consoleLogger } from "../../../helpers";

import INVESTOR_OFFICE_API from "../../../api/investor/office";
import Badge from "../../../components/Badge";

import InvestorOfficeDetail from "./Detail";
import AddInvestorOffice from "./Add";
import EditInvestorOffice from "./Edit";

export default function Investors() {
    const { investorData } = useInvestor();

    const [officeModals, setOfficeModals] = useState({
        add: false,
        edit: false,
        detail: false,
    });

    const [offices, setOffices] = useState([]);
    const [officesCount, setOfficesCount] = useState(0);
    const [officeDetails, setOfficeDetails] = useState(null);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    const investorTableHeaders = [{ label: "#", class: "w-10" }, { label: "Type" }, { label: "Address" }, { label: "Area" }, { label: "Status" }];
    const messages = { noData: "No Offices Found" };

    const formatOfficeData = (data = []) => {
        return data.map((d) => {
            return {
                investorOfficeId: d.investorOfficeId,
                type: d.type,
                address: d.address,
                area: d.area,
                status: <Badge type="pill" text={d.status} color={d.status === "active" ? "green" : "primary"} className="text-capitalize" />,
            };
        });
    };

    useEffect(() => {
        setLoader(true);

        INVESTOR_OFFICE_API.getOfficeList({
            token: investorData.token,
            page: pageNo,
            limit: pageSize,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setOffices(startupResponse.data);
                    setOfficesCount(startupResponse.count);
                } else {
                    setOffices([]);
                    setOfficesCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("INVESTOR OFFICES LIST ERROR: ", error);

                setOffices([]);
                setOfficesCount(0);
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
                <title>Investor | Office</title>
                <meta property="og:title" content="Investor | Office" key="investor-office" />
            </Head>

            <PageHeader title="Office" subtitle="List of your head and branch offices" />

            <PageContainer>
                <div className="row mb-5">
                    <div className="col-lg-6">
                        <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                    </div>
                    <div className="col-lg-6 text-right">
                        <button className="btn btn-sm btn-primary" onClick={() => setOfficeModals({ ...officeModals, add: true })}>
                            <i className="fas fa-building mr-2"></i>New Office
                        </button>
                    </div>
                </div>

                <Table
                    headers={investorTableHeaders}
                    data={formatOfficeData(offices)}
                    messages={messages}
                    pagination={{
                        pageNo,
                        setPageNo,
                        pageSize,
                        count: officesCount,
                    }}
                    onRowClick={({ tabData }) => {
                        const foundOffice = offices.find((o) => o.investorOfficeId === tabData.investorOfficeId);

                        setOfficeDetails(foundOffice);
                        setOfficeModals({ ...officeModals, detail: true });
                    }}
                    loader={loader}
                    loaderTitle="Loading Offices List"
                    loaderSubtitle="PLease wait while we fetch offices list"
                />

                <InvestorOfficeDetail
                    show={officeModals.detail}
                    data={officeDetails}
                    onClose={(opt) => {
                        setOfficeDetails(opt?.edit ? officeDetails : null);
                        setOfficeModals({ ...officeModals, detail: false, edit: opt?.edit || false });
                    }}
                    onDelete={() => {
                        setOfficeModals({ ...officeModals, detail: false });
                        setReload(!reload);
                    }}
                />

                <AddInvestorOffice
                    show={officeModals.add}
                    onClose={() => {
                        setOfficeModals({ ...officeModals, add: false });
                    }}
                    onSuccess={() => {
                        setOfficeModals({ ...officeModals, add: false });
                        setReload(!reload);
                    }}
                />

                <EditInvestorOffice
                    show={officeModals.edit}
                    data={officeDetails}
                    onClose={() => {
                        setOfficeModals({ ...officeModals, edit: false });
                    }}
                    onSuccess={() => {
                        setOfficeModals({ ...officeModals, edit: false });
                        setReload(!reload);
                    }}
                />
            </PageContainer>
        </InvestorLayout>
    );
}
