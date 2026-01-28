import Head from "next/head";
import StartupLayout from "../../components/layout/StartupLayout";
import useStartup from "../../hooks/useStartup";
import Link from "next/link";
import { APPLICATION_URLS } from "../../constants";
import CONFIG from "../../config";
import { getFormattedDateOnly } from "../../helpers/date";

export default function StartupDashboard() {
    const { startup } = useStartup();

    const checklists = [
        {
            title: "Add legal name",
            completed: startup?.legalName?.length ? true : false,
        },
        {
            title: "Add business type",
            completed: startup?.businessType?.length ? true : false,
        },
        {
            title: "Add about us",
            completed: startup?.info?.about?.length ? true : false,
        },
        {
            title: "Add nature of business",
            completed: startup?.businessNature?.length ? true : false,
        },
        {
            title: "Add business current stage",
            completed: startup?.stage?.length ? true : false,
        },
    ];

    return (
        <StartupLayout>
            <Head>
                <title>Dashboard | Startup</title>
                <meta property="og:title" content="Dashboard | Startup" key="dashboard-startup" />
            </Head>

            {!startup.emailVerified && (
                <div className="alert alert-warning my-5 fade show border shadow-sm">
                    <div className="font-size-lg py-0 mr-6">
                        <i className="fas fa-envelope pr-3"></i>We have sent an email verification link to your email: <b>{startup.email}</b> which
                        will be valid for 24 hrs, Please click on the link to verify your email. <br />
                        <br /> If the link has expired{" "}
                        <u>
                            <Link href={APPLICATION_URLS.STARTUP_PROFILE.url}>click here</Link>
                        </u>{" "}
                        to go to profile and resend a new email verification link again.
                    </div>
                </div>
            )}

            <div className="row pb-5">
                <div className="col-lg-6">
                    <div className="bg-white p-5 d-flex">
                        <span className="fas fa-praying-hands text-primary pr-4" style={{ fontSize: "50px" }}></span>
                        <div>
                            <h5 className="text-dark">
                                Welcome <span className="text-primary">{startup.name}</span>
                            </h5>
                            <h6 className="text-gray">Thank you for registering with us.</h6>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="bg-white p-5">
                        {startup.subscription && (
                            <>
                                <h5 className="text-dark">
                                    You can check out your premium page{" "}
                                    <Link href={`${APPLICATION_URLS.STARTUP_LISTING.url}/${startup.startupId}`} className="text-info" target="_blank">
                                        here <span className="fas fa-external-link pl-1"></span>
                                    </Link>
                                </h5>
                                <h6 className="text-gray">
                                    Your subscription is expiring on:{" "}
                                    {CONFIG.STARTUP_SUBSCRIPTION_MODE === "onetime" ? getFormattedDateOnly(startup.subscription.endDate) : "NA"}
                                </h6>
                            </>
                        )}

                        {!startup.subscription && (
                            <>
                                <h5 className="text-dark">
                                    You can check out your premium page: <span className="text-gray">N/A</span>
                                </h5>
                                <h6 className="text-primary">
                                    Your need an active subscription to access your premium page{" "}
                                    <Link href={`${APPLICATION_URLS.STARTUP_SUBSCRIPTION.url}`} className="text-info">
                                        Subscribe Here
                                    </Link>
                                </h6>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="section-progress bg-white p-5">
                        <h4 className="mb-7 text-dark">Startup Application Progress</h4>

                        <div className="row progress-bars">
                            {checklists &&
                                checklists.map((checklist, checklistIndex) => (
                                    <div className="col-lg-6 progress-item mb-4" key={`check-${checklistIndex}`}>
                                        <div className="mb-2 d-flex align-items-center">
                                            <span className={`${checklist.completed ? "text-gray" : "text-dark"}`}>{checklist.title}</span>
                                            <span
                                                className={`font-size-lg font-weight-semibold ml-auto ${
                                                    checklist.completed ? "text-success fas fa-badge-check" : "text-primary fas fa-times-octagon"
                                                }`}
                                            ></span>
                                        </div>
                                        <div className="progress">
                                            <div
                                                className={`progress-bar ${checklist.completed ? "bg-success" : "bg-primary"}`}
                                                role="progressbar"
                                                style={{ width: checklist.completed ? "100%" : "50%" }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="text-center pt-7">More checklists are coming soon . . .</div>
                </div>
            </div>

            {/* <div className="features card-deck">
                <div className="card rounded-0 border-0 bg-transparent mb-6">
                    <div className="card-body d-flex align-items-center py-6 px-8 bg-white">
                        <span className="font-size-h1 font-weight-semibold d-inline-block mr-2 text-primary lh-1">0</span>
                        <span className="font-size-md font-weight-semibold text-uppercase text-dark lh-13">Members</span>
                    </div>
                </div>
                <div className="card rounded-0 border-0 bg-transparent mb-6">
                    <div className="card-body d-flex align-items-center py-6 px-8 bg-white">
                        <span className="font-size-h1 font-weight-semibold d-inline-block mr-2 text-darker-light lh-1">0</span>
                        <span className="font-size-md font-weight-semibold text-uppercase text-dark lh-13">Members</span>
                    </div>
                </div>
                <div className="card rounded-0 border-0 bg-transparent mb-6">
                    <div className="card-body d-flex align-items-center py-6 px-8 bg-white">
                        <span className="font-size-h1 font-weight-semibold d-inline-block mr-2 lh-1 published">0</span>
                        <span className="font-size-md font-weight-semibold text-uppercase text-dark lh-13">Members</span>
                    </div>
                </div>
                <div className="card rounded-0 border-0 bg-transparent mb-6">
                    <div className="card-body d-flex align-items-center py-6 px-8 bg-white">
                        <span className="font-size-h1 font-weight-semibold d-inline-block mr-2 lh-1 experied">0</span>
                        <span className="font-size-md font-weight-semibold text-uppercase text-dark lh-13">Members</span>
                    </div>
                </div>
                <div className="card rounded-0 border-0 bg-transparent mb-6">
                    <div className="card-body d-flex align-items-center p-6 bg-white">
                        <span className="font-size-h1 font-weight-semibold d-inline-block mr-2 lh-1 active">0</span>
                        <span className="font-size-md font-weight-semibold text-uppercase text-dark lh-13">Members</span>
                    </div>
                </div>
            </div> */}
        </StartupLayout>
    );
}
