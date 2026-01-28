import Head from "next/head";

import SuperLayout from "../../components/layout/SuperLayout";

import useSuper from "../../hooks/useSuper";
import PageHeader from "../../components/PageHeader";
import PageContainer from "../../components/PageContainer";

export default function SuperDashboard() {
    const { superData } = useSuper();

    return (
        <SuperLayout>
            <Head>
                <title>Dashboard | Super</title>
                <meta property="og:title" content="Dashboard | Super" key="dashboard-super" />
            </Head>

            <PageHeader title="Dashboard" />

            <PageContainer></PageContainer>
        </SuperLayout>
    );
}
