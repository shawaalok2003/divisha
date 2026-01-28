import Head from "next/head";
import { useEffect, useState } from "react";

import InvestorLayout from "../../../components/layout/InvestorLayout";
import PageSize from "../../../components/PageSize";
import Table from "../../../components/Table";
import PageHeader from "../../../components/PageHeader";
import PageContainer from "../../../components/PageContainer";
import Button from "../../../components/Button";
import Badge from "../../../components/Badge";
import InvestorMemberDetail from "./Detail";
import AddInvestorMember from "./Add";

import { consoleLogger } from "../../../helpers";

import INVESTOR_MEMBER_API from "../../../api/investor/member";

import useInvestor from "../../../hooks/useInvestor";
import Picture from "../../../components/Picture";
import { ASSETS } from "../../../constants/assets";
import EditInvestorMember from "./Edit";

export default function Investors() {
    const { investorData } = useInvestor();

    const [memberModals, setMemberModals] = useState({
        add: false,
        edit: false,
        detail: false,
    });

    const [members, setMembers] = useState([]);
    const [membersCount, setMembersCount] = useState(0);
    const [memberDetails, setMemberDetails] = useState(null);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    const memberTableHeaders = [
        { label: "#", class: "w-10" },
        { label: "" },
        { label: "Type" },
        { label: "Designation" },
        { label: "Name" },
        { label: "Qualification" },
        { label: "" },
    ];
    const messages = { noData: "No Members Found" };

    const formatMemberData = (data = []) => {
        return data.map((d) => {
            return {
                investorMemberId: d.investorMemberId,
                image: <Picture src={d?.photo || ASSETS.noImage} width="30" />,
                type: d.type?.toUpperCase(),
                designation: d.designation,
                name: `${d.firstName} ${d.lastName}`,
                qualification: d.qualification,
                status: <Badge type="pill" text={d.status} color={d.status === "active" ? "green" : "primary"} className="text-capitalize" />,
            };
        });
    };

    useEffect(() => {
        setLoader(true);

        INVESTOR_MEMBER_API.getMembers({
            token: investorData.token,
            page: pageNo,
            limit: pageSize,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setMembers(startupResponse.data);
                    setMembersCount(startupResponse.count);
                } else {
                    setMembers([]);
                    setMembersCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("INVESTOR OFFICES LIST ERROR: ", error);

                setMembers([]);
                setMembersCount(0);
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
                <title>Investors | Team</title>
                <meta property="og:title" content="Investors | Team" key="members-member" />
            </Head>

            <PageHeader title="Team" subtitle="Members of your team" />

            <PageContainer>
                <div className="row mb-5">
                    <div className="col-lg-6">
                        <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                    </div>
                    <div className="col-lg-6 text-right">
                        <Button
                            text="New Member"
                            icon={<i className="fas fa-user-plus mr-2"></i>}
                            onClick={() => setMemberModals({ ...memberModals, add: true })}
                        />
                    </div>
                </div>

                <Table
                    headers={memberTableHeaders}
                    data={formatMemberData(members)}
                    messages={messages}
                    pagination={{
                        pageNo,
                        setPageNo,
                        pageSize,
                        count: membersCount,
                    }}
                    onRowClick={({ tabData }) => {
                        const foundMember = members.find((o) => o.investorMemberId === tabData.investorMemberId);

                        setMemberDetails(foundMember);
                        setMemberModals({ ...memberModals, detail: true });
                    }}
                    loader={loader}
                    loaderTitle="Loading Members List"
                    loaderSubtitle="PLease wait while we fetch team members list"
                />

                <InvestorMemberDetail
                    show={memberModals.detail}
                    data={memberDetails}
                    onClose={(opt) => {
                        setMemberDetails(opt?.edit ? memberDetails : null);
                        setMemberModals({ ...memberModals, detail: false, edit: opt?.edit || false });
                    }}
                    onDelete={() => {
                        setMemberModals({ ...memberModals, detail: false });
                        setReload(!reload);
                    }}
                />

                <AddInvestorMember
                    show={memberModals.add}
                    onClose={() => {
                        setMemberModals({ ...memberModals, add: false });
                    }}
                    onSuccess={() => {
                        setMemberModals({ ...memberModals, add: false });
                        setReload(!reload);
                    }}
                />

                <EditInvestorMember
                    show={memberModals.edit}
                    data={memberDetails}
                    onClose={() => {
                        setMemberModals({ ...memberModals, edit: false });
                    }}
                    onSuccess={() => {
                        setMemberModals({ ...memberModals, edit: false });
                        setReload(!reload);
                    }}
                />
            </PageContainer>
        </InvestorLayout>
    );
}
