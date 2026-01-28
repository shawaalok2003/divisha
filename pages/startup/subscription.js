import { useEffect, useState } from "react";
import SUBSCRIPTION_PLAN_API from "../../api/subscriptionPlan";
import StartupLayout from "../../components/layout/StartupLayout";
import { DEFAULT_DATE_FORMAT, SUBSCRIPTION_PLANS_PERIOD } from "../../constants";
import useStartup from "../../hooks/useStartup";
import Loader from "../../components/Loader";
import STARTUP_SUBSCRIPTION_API from "../../api/startup/subscription";
import CONFIG from "../../config";
import moment from "moment";
import { useRouter } from "next/router";
import { consoleLogger, isProdEnv } from "../../helpers";
import { getFormattedDateOnly } from "../../helpers/date";
import Head from "next/head";
import { detectIncognito } from "detectincognitojs";

export default function StartupDashboard() {
    const router = useRouter();
    const { startup } = useStartup();

    const { subscriptionSuccessful = false } = router.query;

    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [newSubscription, setNewSubscription] = useState(null);
    const [subscriptionLoader, setSubscriptionLoader] = useState(false);
    const [incognitoMode, setIncognitoMode] = useState(false);

    useEffect(() => {
        SUBSCRIPTION_PLAN_API.searchSubscriptionPlans({ token: startup.token, page: "all" })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setSubscriptionPlans(startupResponse.data);
                } else {
                    setSubscriptionPlans([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setSubscriptionPlans([]);
            })
            .finally(() => {});

        detectIncognito().then((result) => {
            consoleLogger(result.browserName, result.isPrivate);
            setIncognitoMode(result.isPrivate);
        });
    }, []);

    const handleConfirmSubscription = (e) => {
        e.preventDefault();

        setNewSubscription({ ...newSubscription, confirmed: true });
        setSubscriptionLoader(true);

        STARTUP_SUBSCRIPTION_API.createSubscription({ token: startup.token, subscriptionPlanId: newSubscription.subscriptionPlanId })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setNewSubscription({ ...newSubscription, subscription: startupResponse.data });

                    /* Handle Razorpay Payment Starts Here */
                    const options = {
                        key: CONFIG.RAZORPAY_KEY_ID,
                        name: "Startupz World",
                        description: newSubscription.name,
                        //image: "/your_logo.jpg",
                        ...(CONFIG.STARTUP_SUBSCRIPTION_MODE === "onetime"
                            ? {
                                  order_id: startupResponse.data.rzpSubscriptionId,
                                  currency: startupResponse.data.rzpSubscriptionData?.currency || "INR",
                              }
                            : { subscription_id: startupResponse.data.rzpSubscriptionId }),

                        callback_url: `${isProdEnv() ? CONFIG.API_URL : CONFIG.NGROK_URL}/v1/webhook/razorpay/signature`,
                        prefill: {
                            name: startup.legalName,
                            email: startup.email,
                            contact: "+91" + startup.mobile,
                        },
                        notes: {
                            ...(startupResponse.data.rzpSubscriptionData.notes || {}),
                        },
                    };

                    options.modal = {
                        ondismiss: () => {
                            setNewSubscription({ ...newSubscription, confirmed: false, subscription: null });
                            setSubscriptionLoader(false);
                        },
                    };

                    const rzp = new window.Razorpay(options);

                    rzp.on("payment.failed", function (response) {
                        consoleLogger("PAYMENT FAILED", response);
                    });

                    rzp.open();

                    /* Handle Razorpay Payment Ends Here */
                } else {
                    setNewSubscription(newSubscription);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setNewSubscription(newSubscription);
            })
            .finally(() => {
                setTimeout(() => {
                    setSubscriptionLoader(false);
                }, 2000);
            });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Subscription | Startup</title>
                <meta property="og:title" content="Subscription | Startup" key="subscription-startup" />
            </Head>

            {incognitoMode && newSubscription && (
                <div className="subscription-ingognito-wall">
                    <div className="text-center p-5 bg-white rounded">
                        <img className="mb-4" src="/images/incognito.png" width={70} />
                        <h6 className="text-primary border-bottom pb-3">It seems like you are using the application in incognito mode</h6>
                        <p className="text-dark pt-1">
                            Our payment gateway and processing uses application session and redirection.
                            <br />
                            Please close and open the subscription page in normal window.
                        </p>
                    </div>
                </div>
            )}

            {!startup.subscription && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-dark">Subscription Plans</h2>
                        </div>
                    </div>

                    {!newSubscription && (
                        <div className="section-pricing-table pt-9">
                            <div className="card-deck">
                                {subscriptionPlans &&
                                    subscriptionPlans.map((sp, spIndex) => (
                                        <div
                                            key={`sp-${spIndex}`}
                                            className={`pricing-table card rounded-0 ${sp.highlight ? "bg-primary text-white" : "text-dark"}`}
                                        >
                                            <div className="card-header bg-transparent border-0 p-0">
                                                <div
                                                    className={`font-weight-semibold font-size-md mb-3 text-uppercase ${
                                                        sp.highlight ? "text-white" : "text-dark"
                                                    }`}
                                                >
                                                    {sp.name}
                                                </div>
                                                <div className="mb-5">
                                                    <span className={`price ${sp.highlight ? "text-white" : "text-primary"}`}>
                                                        {sp.currency} {sp.amount}
                                                    </span>
                                                    {/* <span>/</span>
                                        <span>Mo</span> */}
                                                </div>
                                                {/* <p className="text-gray mb-6">Sed faucibus lectus quis tellus fermentum.</p> */}
                                            </div>
                                            <div className="card-body px-0 pt-5 pb-7">
                                                <ul className="features list-group list-group-flush list-group-borderless">
                                                    <li className="list-group-item bg-transparent p-0 mb-1">
                                                        <span
                                                            className={`font-size-md d-inline-block mr-3 ${
                                                                sp.highlight ? "text-white" : "text-green"
                                                            }`}
                                                        >
                                                            <i
                                                                className={`fal fa-stopwatch text-dark ${sp.highlight ? "text-white" : "text-dark"}`}
                                                            ></i>
                                                        </span>
                                                        <span className={sp.highlight ? "text-white" : "text-dark"}>
                                                            Duration: {sp.interval} {SUBSCRIPTION_PLANS_PERIOD[sp.period]}
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item bg-transparent p-0 mb-1">
                                                        <span
                                                            className={`font-size-md d-inline-block mr-3 ${
                                                                sp.highlight ? "text-white" : "text-green"
                                                            }`}
                                                        >
                                                            <i className={`fal fa-check text-dark ${sp.highlight ? "text-white" : "text-dark"}`}></i>
                                                        </span>
                                                        <span className={sp.highlight ? "text-white" : "text-dark"}>Premium Listing</span>
                                                    </li>
                                                    <li className="list-group-item bg-transparent p-0 mb-1">
                                                        <span
                                                            className={`font-size-md d-inline-block mr-3 ${
                                                                sp.highlight ? "text-white" : "text-green"
                                                            }`}
                                                        >
                                                            <i className={`fal fa-check text-dark ${sp.highlight ? "text-white" : "text-dark"}`}></i>
                                                        </span>
                                                        <span className={sp.highlight ? "text-white" : "text-dark"}>Contact Display</span>
                                                    </li>
                                                    <li className="list-group-item bg-transparent p-0 mb-1">
                                                        <span
                                                            className={`font-size-md d-inline-block mr-3 ${
                                                                sp.highlight ? "text-white" : "text-green"
                                                            }`}
                                                        >
                                                            <i className={`fal fa-check text-dark ${sp.highlight ? "text-white" : "text-dark"}`}></i>
                                                        </span>
                                                        <span className={sp.highlight ? "text-white" : "text-dark"}>Services Display</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-footer bg-transparent border-0 mt-auto p-0">
                                                <button
                                                    className={`btn btn-block lh-lg font-weight-bold rounded-0 ${
                                                        sp.highlight ? "bg-white text-primary" : "btn-primary text-white"
                                                    }`}
                                                    onClick={() => {
                                                        //window.open("https://rzp.io/i/QSiCsVWM", "window", "toolbar=no, menubar=no, resizable=yes")

                                                        setNewSubscription({ ...sp, confirmed: false, subscription: null });
                                                    }}
                                                >
                                                    Subscribe
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {newSubscription && (
                        <div className="row mt-5">
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                {/* New Subscription Details */}
                                <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                                    <div className="card-header p-0 bg-transparent">
                                        <h5 className="card-title text-capitalize">New Subscription</h5>
                                    </div>
                                    <div className="card-body px-0 pt-4 pb-0">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                                Plan
                                                <span className="font-weight-semibold text-danger ml-auto">{newSubscription.name}</span>
                                            </li>

                                            <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                                <label className="mb-0">Amount</label>
                                                <span className="font-weight-semibold ml-auto text-dark">
                                                    {newSubscription.currency} {parseFloat(newSubscription.amount).toFixed(2)}
                                                </span>
                                            </li>
                                            <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                                <label className="mb-0">Tax (18%)</label>
                                                <span className="font-weight-semibold ml-auto text-dark">
                                                    {newSubscription.currency} {parseFloat(newSubscription.amount * 0.18).toFixed(2)}
                                                </span>
                                            </li>
                                            <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                                <label className="mb-0">Total</label>
                                                <span className="font-weight-semibold ml-auto text-dark">
                                                    {newSubscription.currency}{" "}
                                                    {(parseFloat(newSubscription.amount) + parseFloat(newSubscription.amount * 0.18)).toFixed(2)}
                                                </span>
                                            </li>
                                            <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                                <label className="mb-0">Frequency</label>
                                                <span className="font-weight-semibold text-danger ml-auto">
                                                    Every {newSubscription.interval} {SUBSCRIPTION_PLANS_PERIOD[newSubscription.period]}
                                                </span>
                                            </li>
                                        </ul>
                                        {!subscriptionLoader && !newSubscription.subscription && (
                                            <>
                                                <button className="btn btn-primary btn-block mt-5" onClick={handleConfirmSubscription}>
                                                    Confirm Subscription
                                                </button>

                                                <button className="btn btn-secondary btn-block mt-5" onClick={() => setNewSubscription(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                {/* New Subscription Payment */}
                                <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                                    <div className="card-header p-0 bg-transparent">
                                        <h5 className="card-title text-capitalize">Payment</h5>
                                    </div>
                                    <div className="card-body px-0 pt-4 pb-0">
                                        {!newSubscription.confirmed && !newSubscription.subscription && (
                                            <div className="my-10 py-10">
                                                <h5 className="text-center text-primary py-4">Please confirm subscription details</h5>
                                            </div>
                                        )}

                                        {newSubscription.confirmed && subscriptionLoader && (
                                            <div className="py-8 my-1">
                                                <Loader
                                                    title="Creating Subscription"
                                                    subtitle="Please wait while we create your subscription and initiate payment"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {startup?.subscription && (
                <div className="container-fluid">
                    {subscriptionSuccessful && (
                        <div className="row mt-5">
                            <div className="col-lg-12 mb-lg-0">
                                <div className="card border-0 bg-white px-4 py-5">
                                    <div className="text-center">
                                        <span className="fal fa-check-circle text-success" style={{ fontSize: "100px" }}></span>
                                        <h5 className="pt-5 text-success">Subscription Successful !!</h5>
                                        {/* <h6 className="pt-5 text-gray">
                                            Thank you for subscribing. Your payment has been authenticated and your card will be charged within 1 hour
                                            for this subscription.
                                        </h6> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subscription Created */}
                    {["created", "authenticated"].includes(startup.subscription.rzpStatus) && (
                        <div className="alert alert-warning my-5 fade show border shadow">
                            <div className="font-size-lg py-0 mr-6">
                                <i className="fas fa-exclamation-circle pr-3"></i>Thank you for subscribing. Your payment has been authenticated and
                                your payment will be charged/confirmed within 1 hour for this subscription.
                            </div>
                        </div>
                    )}

                    <div className="row mt-5">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            {/* Active Subscription Details */}
                            <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                                <div className="card-header p-0 bg-transparent">
                                    <h5 className="card-title text-capitalize">Active Subscription</h5>
                                </div>
                                <div className="card-body px-0 pt-4 pb-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Subscription ID:</label>
                                            <span className="font-weight-semibold ml-auto text-dark text-break">
                                                st_{startup.subscription.startupSubscriptionId}_{startup.subscription.rzpSubscriptionId}
                                            </span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Plan</label>
                                            <span className="font-weight-semibold ml-auto text-dark">{startup.subscription.plan.name}</span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Amount</label>
                                            <span className="font-weight-semibold ml-auto text-dark">
                                                {startup.subscription.plan.currency} {parseFloat(startup.subscription.amount).toFixed(2)}
                                            </span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Tax (18%)</label>
                                            <span className="font-weight-semibold ml-auto text-dark">
                                                {startup.subscription.plan.currency} {parseFloat(startup.subscription.tax).toFixed(2)}
                                            </span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Total</label>
                                            <span className="font-weight-semibold ml-auto text-dark">
                                                {startup.subscription.plan.currency} {parseFloat(startup.subscription.total).toFixed(2)}
                                            </span>
                                        </li>

                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Subscribed On</label>
                                            <span className="font-weight-semibold text-success ml-auto">
                                                {moment(startup.subscription.startDate || startup.subscription.createdAt).format(DEFAULT_DATE_FORMAT)}
                                            </span>
                                        </li>

                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <label className="mb-0">Expiring On</label>
                                            <span className="font-weight-semibold text-danger ml-auto">
                                                {moment(startup.subscription.endDate).format(DEFAULT_DATE_FORMAT)}
                                            </span>
                                        </li>

                                        <li className="list-group-item bg-transparent d-flex text-dark px-0 pt-5">
                                            {["charged"].includes(startup.subscription.rzpStatus) && (
                                                <span className="alert alert-info text-center w-100">
                                                    We have received your payment.
                                                    <br />
                                                    <br /> The subscription will be activated automatically once payment is verified.
                                                </span>
                                            )}

                                            {["activated", "completed"].includes(startup.subscription.rzpStatus) && (
                                                <span className="alert bg-success font-weight-medium text-center w-100">
                                                    Your subscription is active.
                                                </span>
                                            )}
                                        </li>
                                    </ul>

                                    {!subscriptionLoader && !startup.subscription && (
                                        <>
                                            <button className="btn btn-primary btn-block mt-5" onClick={handleConfirmSubscription}>
                                                Confirm Subscription
                                            </button>

                                            <button className="btn btn-secondary btn-block mt-5" onClick={() => setNewSubscription(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            {/* Active Subscription Payment */}
                            <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                                <div className="card-header p-0 bg-transparent">
                                    <h5 className="card-title text-capitalize">Subscription Payment History</h5>
                                </div>
                                <div className="card-body px-0 pt-4 pb-0">
                                    {startup.subscription.payments && startup.subscription.payments.length === 0 && (
                                        <div className="my-10 py-9">
                                            <h5 className="text-center text-primary">No Subscription Payments Found</h5>
                                            <h6 className="text-center text-gray">
                                                <small>
                                                    NOTE: Payment history will be start reflecting within 24 hrs after the subscription payment is
                                                    made.
                                                </small>
                                            </h6>
                                        </div>
                                    )}

                                    {startup.subscription.payments && startup.subscription.payments.length > 0 && (
                                        <div className="table-responsive-md bg-white px-5">
                                            <table className="table">
                                                <thead>
                                                    <tr className="bg-gray-02">
                                                        <th rowSpan={2} className="">
                                                            Payment ID
                                                        </th>
                                                        <th rowSpan={2} className="">
                                                            Amount
                                                        </th>

                                                        <th rowSpan={2} className="">
                                                            Date
                                                        </th>
                                                        <th rowSpan={2} className="text-center"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {startup.subscription.payments.map((payment, paymentIndex) => (
                                                        <tr key={`st-pymt-${paymentIndex}`}>
                                                            <td className="py-2 px-2">{payment.id}</td>
                                                            <td className="py-2 px-2">
                                                                {payment.currency} {payment.amount / 100}
                                                            </td>

                                                            <td className="py-2 px-2">
                                                                {getFormattedDateOnly(
                                                                    moment.unix(payment?.date || payment?.created_at).format(DEFAULT_DATE_FORMAT)
                                                                ) || "NA"}
                                                            </td>
                                                            <td className="py-2 px-2 text-right">
                                                                {CONFIG.STARTUP_SUBSCRIPTION_MODE === "recurring" ? (
                                                                    <a
                                                                        className="btn btn-primary text-white"
                                                                        href={payment.short_url}
                                                                        target="_blank"
                                                                    >
                                                                        <span className="fal fa-file-invoice pr-2"></span>Invoice
                                                                    </a>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </StartupLayout>
    );
}
