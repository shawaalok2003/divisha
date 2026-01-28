import Head from "next/head";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";
import InvestorLayout from "../../components/layout/InvestorLayout";
import useInvestor from "../../hooks/useInvestor";

const InvestorDashboard = () => {
    const { investorData } = useInvestor();
    return (
        <InvestorLayout>
            <Head>
                <title>Dashboard | Investor</title>
                <meta property="og:title" content="Dashboard | Investor" key="dashboard-investor" />
            </Head>

            <PageHeader title="Dashboard" />

            <PageContainer>
                <div>Investor Dashboard: {investorData?.firstName}</div>
            </PageContainer>
        </InvestorLayout>
    );
};

export default InvestorDashboard;
