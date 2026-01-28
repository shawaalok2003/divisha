import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListingLayout from "../../../components/layout/ListingLayout";
import { getSignedUrl } from "../../../helpers/storage";
import STARTUP_LISTING_API from "../../../api/startup/listing";
import Loader from "../../../components/Loader";
import { getFormattedDateOnly } from "../../../helpers/date";
import BannerSlider from "../../../components/BannerSlider";
import useStartup from "../../../hooks/useStartup";
import STARTUP_ENQUIRY_API from "../../../api/startup/enquiry";
import { FUNDING_TYPES, INVESTMENT_BASIS } from "../../../constants";
import { consoleLogger } from "../../../helpers";
import { ASSETS } from "../../../constants/assets";

export default function ListingDetails() {
    const router = useRouter();
    const { startup } = useStartup();
    const { startupId } = router.query;

    const [tab, setTab] = useState("tab1");
    const [startupDetails, setStartupDetails] = useState(null);

    const [enquiryForm, setEnquiryForm] = useState({
        mobile: "",
        email: "",
        message: "",
    });

    const [enquiryLoader, setEnquiryLoader] = useState(false);

    useEffect(() => {
        if (startupId) {
            STARTUP_LISTING_API.getStartupDetails({ token: null, startupId })
                .then((results) => {
                    const startupResponse = results.data;

                    if (startupResponse.status === "success") {
                        setTimeout(() => {
                            setStartupDetails(startupResponse.data);
                        }, 1000);
                    } else {
                        setStartupDetails([]);
                    }
                })
                .catch((error) => {
                    consoleLogger("STARTUPS ERROR: ", error);

                    setStartupDetails([]);
                })
                .finally(() => {});
        }
    }, [startupId]);

    const sendEnquiry = (e) => {
        e.preventDefault();

        if (!enquiryForm.mobile && !enquiryForm.email && !enquiryForm.message) return;

        setEnquiryLoader(true);

        STARTUP_ENQUIRY_API.addPublicEnquiry({ token: startup.token, startupId: startupDetails?.startupId, ...enquiryForm })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    //
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                //
            })
            .finally(() => {
                setEnquiryForm({
                    mobile: "",
                    email: "",
                    message: "",
                });

                setTimeout(() => {
                    setEnquiryLoader(false);
                }, 2000);
            });
        //
    };

    return (
        <ListingLayout>
            <Head>
                <title>{startupDetails ? startupDetails.name : ""} | Startup</title>
                <meta property="og:title" content="Startups Listing" key="startups-listing" />
            </Head>

            {!startupDetails && (
                <div className="wrapper-content pb-0 mt-10 pt-10">
                    <Loader title="Loading Startup Details" />
                </div>
            )}
            {startupDetails && (
                <div className="wrapper-content pb-0 mt-6 pt-10">
                    <BannerSlider data={startupDetails.banners || []} />

                    <div className="page-title bg-gray-02 pt-8 pb-7">
                        <div className="container">
                            <div className="explore-details-top d-flex flex-wrap flex-lg-nowrap">
                                <div className="mt-4 mt-lg-0 mr-5">
                                    <img
                                        className="border shadow-sm rounded p-1"
                                        src={startupDetails.logo || "/images/no-image.jpg"}
                                        width={150}
                                        height={100}
                                    />
                                </div>
                                <div className="store">
                                    <div className="d-flex flex-wrap">
                                        <h2 className="text-dark mr-3 mb-2">{startupDetails.name || ""}</h2>
                                        {startupDetails.verified ? (
                                            <div className="check font-weight-semibold text-green mb-2">
                                                Verified <span className="fas fa-check-circle text-green"></span>
                                            </div>
                                        ) : (
                                            <div className="check font-weight-semibold text-danger mb-2">
                                                Unverified <span className="fas fa-times-circle text-danger"></span>
                                            </div>
                                        )}
                                    </div>
                                    <ul className="list-inline store-meta d-flex flex-column">
                                        <li className="list-inline-item">
                                            <span className="mr-1">
                                                <i className="fal fa-building text-dark"></i>
                                            </span>
                                            <span className="text-dark">{startupDetails.legalName}</span>
                                        </li>
                                        <li className="list-inline-item">
                                            <span className="mr-1">
                                                <i className="fal fa-info text-dark"></i>
                                            </span>
                                            <span className="text-dark">{startupDetails?.info?.intro || "NA"}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid pr-10 pl-10 pt-8">
                        <div className="row pl-10 pr-10">
                            {/* Main Content */}
                            <div className="page-content col-xl-8 mb-8 mb-xl-0">
                                <div className="mb-5">
                                    <h3 className="font-size-lg text-uppercase font-weight-semibold border-bottom pb-1 pt-2 mb-5 text-dark">ABOUT</h3>
                                    <div className="mb-7">
                                        {startupDetails.info?.about?.split("\n").map((a) => <p className="mb-2">{a}</p>) || ""}
                                    </div>
                                </div>

                                <div className="pb-8 mb-7">
                                    <ul className="nav nav-pills tab-style-05 tab-horizontal mb-5 border-bottom">
                                        <li className="nav-item" onClick={() => setTab("tab1")}>
                                            <a className={`btn nav-link ${tab === "tab1" ? "active" : ""}`}>Team</a>
                                        </li>
                                        <li className="nav-item" onClick={() => setTab("tab2")}>
                                            <a className={`btn nav-link ${tab === "tab2" ? "active" : ""}`}>Contact</a>
                                        </li>
                                        <li className="nav-item" onClick={() => setTab("tab3")}>
                                            <a className={`btn nav-link ${tab === "tab3" ? "active" : ""}`}>Media Publications</a>
                                        </li>
                                        <li className="nav-item" onClick={() => setTab("tab4")}>
                                            <a className={`btn nav-link ${tab === "tab4" ? "active" : ""}`}>Gallery</a>
                                        </li>
                                        <li className="nav-item" onClick={() => setTab("tab5")}>
                                            <a className={`btn nav-link ${tab === "tab5" ? "active" : ""}`}>Financials</a>
                                        </li>
                                        <li className="nav-item" onClick={() => setTab("tab6")}>
                                            <a className={`btn nav-link ${tab === "tab6" ? "active" : ""}`}>Seeking</a>
                                        </li>
                                    </ul>

                                    {/* Team */}
                                    <div className={`fade ${tab === "tab1" ? "show active" : ""}`}>
                                        {startupDetails.team.length === 0 && (
                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Team Members Found</h6>
                                        )}
                                        {startupDetails.team.length > 0 && (
                                            <div class="table-responsive">
                                                <table class="table table-hover listing-table">
                                                    <tbody>
                                                        {startupDetails.team.map((st, stIndex) => (
                                                            <tr className="border rounded shadow-sm" key={`st-${stIndex}`}>
                                                                <td>
                                                                    <div class="media align-items-center">
                                                                        <a href="#" class="image mr-3">
                                                                            <img src={st?.signedPhoto || ASSETS.noImage} alt={st?.name} />
                                                                        </a>
                                                                        <div class="media-body">
                                                                            <div class="text-dark font-size-sm">{st?.designation || ""}</div>
                                                                            <a class="font-weight-semibold text-link  d-block font-size-md name">
                                                                                {st?.name || ""}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span class="text-gray">{st?.type.toUpperCase()}</span>
                                                                </td>

                                                                <td>
                                                                    <span class="text-gray">{st?.qualification}</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact */}
                                    <div className={`fade ${tab === "tab2" ? "show active" : ""}`}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div class="card p-2 widget border-0 rounded-0 mb-6 bg-gray-06">
                                                    <div class="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                                        Emails
                                                    </div>
                                                    <div class="card-body px-0 pb-0">
                                                        {startupDetails.contacts.emails.length === 0 && (
                                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Emails Found</h6>
                                                        )}
                                                        {startupDetails.contacts.emails.length > 0 && (
                                                            <ul class="list-group list-group-flush">
                                                                {startupDetails.contacts.emails.map((sce, sceIndex) => (
                                                                    <li
                                                                        class="list-group-item bg-transparent d-flex text-dark px-0"
                                                                        key={`sce-${sceIndex}`}
                                                                    >
                                                                        <label class="mb-0">{sce.title || ""}</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {sce.contact || ""}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div class="card p-2 widget border-0 rounded-0 mb-6 bg-gray-06">
                                                    <div class="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                                        Mobiles
                                                    </div>
                                                    <div class="card-body px-0 pb-0">
                                                        {startupDetails.contacts.mobiles.length === 0 && (
                                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Mobiles Found</h6>
                                                        )}
                                                        {startupDetails.contacts.mobiles.length > 0 && (
                                                            <ul class="list-group list-group-flush">
                                                                {startupDetails.contacts.mobiles.map((scm, scmIndex) => (
                                                                    <li
                                                                        class="list-group-item bg-transparent d-flex text-dark px-0"
                                                                        key={`sce-${scmIndex}`}
                                                                    >
                                                                        <label class="mb-0">{scm.title || ""}</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {scm.contact || ""}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div class="card p-2 widget border-0 rounded-0 mb-6 bg-gray-06">
                                                    <div class="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                                        Websites
                                                    </div>
                                                    <div class="card-body px-0 pb-0">
                                                        {startupDetails.contacts.websites.length === 0 && (
                                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Websites Found</h6>
                                                        )}
                                                        {startupDetails.contacts.websites.length > 0 && (
                                                            <ul class="list-group list-group-flush">
                                                                {startupDetails.contacts.websites.map((scw, scwIndex) => (
                                                                    <li
                                                                        class="list-group-item bg-transparent d-flex text-dark px-0"
                                                                        key={`sce-${scwIndex}`}
                                                                    >
                                                                        <label class="mb-0">{scw.title || ""}</label>
                                                                        <span class="font-weight-semibold text-dark ml-5">{scw.contact || ""}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div class="card p-2 widget border-0 rounded-0 mb-6 bg-gray-06">
                                                    <div class="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                                        Apps
                                                    </div>
                                                    <div class="card-body px-0 pb-0">
                                                        {startupDetails.contacts.apps.length === 0 && (
                                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Apps Found</h6>
                                                        )}
                                                        {startupDetails.contacts.apps.length > 0 && (
                                                            <ul class="list-group list-group-flush">
                                                                {startupDetails.contacts.apps.map((sca, scaIndex) => (
                                                                    <li
                                                                        class="list-group-item bg-transparent d-flex text-dark px-0"
                                                                        key={`sce-${scaIndex}`}
                                                                    >
                                                                        <label class="mb-0">{sca.title || ""}</label>
                                                                        <span class="font-weight-semibold text-dark ml-5">{sca.contact || ""}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Media Publications */}
                                    <div className={`fade ${tab === "tab3" ? "show active" : ""}`}>
                                        {startupDetails.medias.length === 0 && (
                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Media Publications Found</h6>
                                        )}
                                        {startupDetails.medias.length > 0 && (
                                            <div class="table-responsive">
                                                <table class="table table-hover listing-table">
                                                    <tbody>
                                                        {startupDetails.medias.map((sm, smIndex) => (
                                                            <tr className="border rounded shadow-sm" key={`st-${smIndex}`}>
                                                                <td>
                                                                    <div class="media align-items-center">
                                                                        <a href="#" class="image mr-3">
                                                                            <img src={sm.image || "/images/no-image.jpg"} alt="Provider 1" />
                                                                        </a>
                                                                        <div class="media-body">
                                                                            <div class="text-dark font-size-sm">{sm.publication || ""}</div>
                                                                            <a
                                                                                class="font-weight-semibold text-link  d-block font-size-md name"
                                                                                href={sm.link}
                                                                                target="_blank"
                                                                            >
                                                                                {sm.link || ""}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>

                                    {/* Gallery */}
                                    <div className={`fade ${tab === "tab4" ? "show active" : ""}`}>
                                        {startupDetails.gallery.length === 0 && (
                                            <h6 className="pt-5 pb-5 text-gray   text-center">No Gallery Items</h6>
                                        )}
                                        {startupDetails.gallery.length > 0 && (
                                            <div className="images d-flex flex-wrap">
                                                {startupDetails.gallery.map((banner, bannerIndex) => (
                                                    <img
                                                        key={`stp-gal-${bannerIndex}`}
                                                        src={banner.file || "/images/no-image.jpg"}
                                                        alt={banner.title || ""}
                                                        className="col-3 border rounded shadow-sm m-1"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Funding / Financials */}
                                    <div className={`fade ${tab === "tab5" ? "show active" : ""}`}>
                                        {!startupDetails.fundingInfo && <h6 className="pt-5 pb-5 text-gray text-center">No Funding Info Found</h6>}
                                        {startupDetails.fundingInfo && (
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div class="card p-2 widget border-0 rounded-0 mb-6">
                                                        <div class="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                                            <span>Funding Info</span>
                                                        </div>
                                                        <div className="form-row mt-2 mb-2">
                                                            <div className="col-sm-6 mb-2 mb-sm-0 typography">
                                                                <div
                                                                    class={`alert ${
                                                                        startupDetails.fundingInfo.fundMode === "bootstrapped"
                                                                            ? "alert-success"
                                                                            : "alert-secondary"
                                                                    } mb-4 p-0`}
                                                                >
                                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                                        {startupDetails.fundingInfo.fundMode === "bootstrapped" ? (
                                                                            <span className="fas fa-check-circle"></span>
                                                                        ) : (
                                                                            <span className="far fa-times-circle"></span>
                                                                        )}
                                                                    </div>
                                                                    <div className="message text-uppercase font-weight-semibold">Bootstrapped</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 mb-2 mb-sm-0 typography">
                                                                <div
                                                                    class={`alert ${
                                                                        startupDetails.fundingInfo.fundMode === "funded"
                                                                            ? "alert-success"
                                                                            : "alert-secondary"
                                                                    } mb-4 p-0`}
                                                                >
                                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                                        {startupDetails.fundingInfo.fundMode === "funded" ? (
                                                                            <span className="fas fa-check-circle"></span>
                                                                        ) : (
                                                                            <span className="far fa-times-circle"></span>
                                                                        )}
                                                                    </div>
                                                                    <div className="message text-uppercase font-weight-semibold">Funded</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="card-body px-0 pb-0">
                                                            {startupDetails.fundingInfo.fundMode === "funded" && (
                                                                <ul class="list-group list-group-flush">
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Fund Type</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {FUNDING_TYPES.find(
                                                                                (ft) => ft.value === startupDetails.fundingInfo.fundType
                                                                            ).name || "NA"}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Funded On</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {getFormattedDateOnly(startupDetails.fundingInfo.fundDate) || "NA"}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">No Of Investors Participated</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {startupDetails.fundingInfo.noOfInvestors || "NA"}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Investor Details</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {startupDetails.fundingInfo.investorDetails || "NA"}
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Seeking */}
                                    <div className={`fade ${tab === "tab6" ? "show active" : ""}`}>
                                        {!startupDetails.fundingInfo && <h6 className="pt-5 pb-5 text-gray text-center">No Seeking Info Found</h6>}

                                        {startupDetails.fundingInfo && (
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div class="card p-2 widget border-0 rounded-0 mb-6">
                                                        <div class="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                                            <span>Looking To Raise Funds?</span>
                                                        </div>

                                                        <div className="form-row mt-2 mb-2">
                                                            <div className="col-sm-6 mb-2 mb-sm-0 typography">
                                                                <div
                                                                    class={`alert ${
                                                                        startupDetails.fundingInfo.interestedInFunding === "no"
                                                                            ? "alert-primary"
                                                                            : "alert-secondary"
                                                                    } mb-4 p-0`}
                                                                >
                                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                                        {startupDetails.fundingInfo.interestedInFunding === "no" ? (
                                                                            <span className="fas fa-times-circle"></span>
                                                                        ) : (
                                                                            <span className="far fa-circle"></span>
                                                                        )}
                                                                    </div>
                                                                    <div className="message text-uppercase font-weight-semibold">No</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 mb-2 mb-sm-0 typography">
                                                                <div
                                                                    class={`alert ${
                                                                        startupDetails.fundingInfo.interestedInFunding === "yes"
                                                                            ? "alert-success"
                                                                            : "alert-secondary"
                                                                    } mb-4 p-0`}
                                                                >
                                                                    <div className="alert-icon p-2" style={{ fontSize: "35px" }}>
                                                                        {startupDetails.fundingInfo.interestedInFunding === "yes" ? (
                                                                            <span className="fas fa-check-circle"></span>
                                                                        ) : (
                                                                            <span className="far fa-circle"></span>
                                                                        )}
                                                                    </div>
                                                                    <div className="message text-uppercase font-weight-semibold">Yes</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="card-body px-0 pb-0">
                                                            {startupDetails.fundingInfo.interestedInFunding === "yes" && (
                                                                <ul class="list-group list-group-flush">
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">How much amount are you looking to raise</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {startupDetails.fundingInfo.amountNeededToRaise}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Average Monthly Cash Burn</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {startupDetails.fundingInfo.averageMonthlyCashBurn}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Average Monthly Revenue</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {startupDetails.fundingInfo.averageMonthlyRevenue}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Is Your Pitch Deck Ready?</label>
                                                                        <span
                                                                            class={`font-weight-semibold ml-auto ${
                                                                                startupDetails.fundingInfo.pitchDeckReady === "yes"
                                                                                    ? "text-success"
                                                                                    : "text-primary"
                                                                            }`}
                                                                        >
                                                                            {startupDetails.fundingInfo.pitchDeckReady.toUpperCase() || "NA"}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Is Due Diligence Report Ready?</label>
                                                                        <span
                                                                            class={`font-weight-semibold ml-auto ${
                                                                                startupDetails.fundingInfo.dueDiligenceReady === "yes"
                                                                                    ? "text-success"
                                                                                    : "text-primary"
                                                                            }`}
                                                                        >
                                                                            {startupDetails.fundingInfo.dueDiligenceReady.toUpperCase() || "NA"}
                                                                        </span>
                                                                    </li>
                                                                    <li class="list-group-item bg-transparent d-flex text-dark px-0">
                                                                        <label class="mb-0">Investment will be based on?</label>
                                                                        <span class="font-weight-semibold text-dark ml-auto">
                                                                            {INVESTMENT_BASIS.find(
                                                                                (ib) => ib.value === startupDetails.fundingInfo.investmentBasis
                                                                            ).name || "NA"}
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="sidebar col-xl-4">
                                <div className="card p-4 widget border-0 bg-gray-06 rounded-0 mb-6">
                                    <div className="card-title d-flex mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                        Additional Details
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                                <label className="mb-0">Established On</label>
                                                <span className="ml-auto font-weight-semibold text-dark">
                                                    {startupDetails.startDate ? getFormattedDateOnly(startupDetails.startDate) : "N/A"}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card p-4 widget border-0 contact bg-gray-06 rounded-0 mb-6">
                                    <div className="card-title text-uppercase text-dark font-weight-semibold font-size-md mb-0 border-bottom pb-2">
                                        <span className="text-secondary d-inline-block mr-2">
                                            <i className="fas fa-envelope text-dark"></i>
                                        </span>
                                        Enquiry
                                    </div>
                                    <div className="card-body px-0 pb-3">
                                        <div className="contact-form">
                                            <form>
                                                <div className="form-group mb-2">
                                                    <label className="sr-only">Mobile</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm border-0 bg-white"
                                                        placeholder="Mobile:"
                                                        value={enquiryForm.mobile}
                                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, mobile: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group mb-2">
                                                    <label className="sr-only">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm border-0 bg-white"
                                                        placeholder="Email:"
                                                        value={enquiryForm.email}
                                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group mb-2">
                                                    <label className="sr-only">Message</label>
                                                    <textarea
                                                        className="form-control border-0"
                                                        placeholder="Message:"
                                                        value={enquiryForm.message}
                                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                                    ></textarea>
                                                </div>

                                                {!startup.token && (
                                                    <h6 className="text-primary text-center pt-5">
                                                        <small>You need to be logged in to send enquiry</small>
                                                    </h6>
                                                )}

                                                {!enquiryLoader && startup.token && (
                                                    <a className="btn text-white btn-primary btn-block mt-5" onClick={sendEnquiry}>
                                                        Send Enquiry
                                                    </a>
                                                )}

                                                {enquiryLoader && (
                                                    <Loader
                                                        title="Sending Enquiry"
                                                        subtitle="Please wait while we submit your enquiry to the startup"
                                                    />
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ListingLayout>
    );
}
