import { Inter } from "@next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import ListingLayout from "../components/layout/ListingLayout";
import ComingSoon from "../components/pages/ComingSoon";
import Maintenance from "../components/pages/Maintenance";
import BusinessTypeStartupSlider from "../components/TabSlider/BusinessTypeStartupSlider";

import CONFIG from "../config";
import {
    APPLICATION_URLS,
    BUSINESS_MODEL_DATA,
    STARTUP_FUNDINGS,
    STARTUP_INTERESTS,
    STARTUP_INVESTMENT_NATURES,
    STARTUP_NATURES,
    STARTUP_STAGES,
} from "../constants";
import { isLightThemeMode } from "../helpers/theme";
import CategorySlider from "../components/CategorySlider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(null);

    const redirectToStartupSearch = (e, type = null, value = null) => {
        if (["name"].includes(type)) {
            router.push(`${APPLICATION_URLS.STARTUP_LISTING.url}?${type}=${encodeURIComponent(value)}`);
        } else {
            router.push(`${APPLICATION_URLS.STARTUP_LISTING.url}?${type}=${value}`);
        }
    };

    return (
        <>
            <Head>
                <title>StartupzWorld</title>
                <meta property="og:title" content="StartupzWorld" key="startupz-world" />
            </Head>
            {/* Launch Mode */}
            {CONFIG.LAUNCH_MODE ? <ComingSoon /> : ""}

            {/* Launch Mode */}
            {CONFIG.MAINTENANCE_MODE ? <Maintenance /> : ""}

            {/* Home Page */}
            {!CONFIG.LAUNCH_MODE && !CONFIG.MAINTENANCE_MODE && (
                <ListingLayout>
                    <section className={`home-main-intro ${isLightThemeMode(router.pathname) ? "" : "dark"}`}>
                        <div className="home-main-intro-container">
                            <div className="container">
                                <div className="heading mb-9">
                                    <h1 className="mb-7">
                                        <span className="d-block animate__animated animate__slideInLeft">Discover</span>
                                        <span className="font-weight-light d-block animate__animated animate__fadeInRight">amazing startups</span>
                                    </h1>
                                    <p className="h5 font-weight-normal mb-0 animate__animated animate__fadeInDown">
                                        Find great startups curated by our experts for investing.
                                    </p>
                                </div>
                                <div className="form-search form-search-style-02 pb-9 animate__animated animate__fadeInDown">
                                    <div className="row align-items-end no-gutters">
                                        <div className="col-xl-6 mb-4 mb-xl-0 py-3 px-4 bg-white border-right position-relative rounded-left form-search-item">
                                            <label htmlFor="key-word" className="font-size-md font-weight-semibold mb-0 lh-1">
                                                Startup Name
                                            </label>
                                            <div className="input-group dropdown">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-mini border-0 px-0 bg-transparent"
                                                    placeholder="Ex: Nearbygrocer, Nykaa, etc"
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-2 button">
                                            <button
                                                className="btn btn-primary btn-lg btn-icon-left btn-block"
                                                onClick={(e) => (searchTerm ? redirectToStartupSearch(e, "name", searchTerm) : () => {})}
                                            >
                                                <i className="fal fa-search"></i>Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="font-size-lg mb-4">Or browse the highlights</div>
                                    <div className="list-inline pb-8 flex-wrap my-n2">
                                        <div className="list-inline-item py-2">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}?category=healthcare`}
                                                className="card border-0 link-hover-dark-white icon-box-style-01"
                                            >
                                                <div className="card-body p-0">
                                                    <span className="far fa-hospital"></span>
                                                    <span className="card-text font-size-md font-weight-semibold mt-2 d-block">Healthcare</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="list-inline-item py-2">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}?category=services`}
                                                className="card border-0 link-hover-dark-white icon-box-style-01"
                                            >
                                                <div className="card-body p-0">
                                                    <span className="far fa-cog"></span>
                                                    <span className="card-text font-size-md font-weight-semibold mt-2 d-block">Services</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="list-inline-item py-2">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}?category=retail`}
                                                className="card border-0 link-hover-dark-white icon-box-style-01"
                                            >
                                                <div className="card-body p-0">
                                                    <span className="far fa-tshirt"></span>
                                                    <span className="card-text font-size-md font-weight-semibold mt-2 d-block">Retail</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="list-inline-item py-2">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}?category=fashion`}
                                                className="card border-0 link-hover-dark-white icon-box-style-01"
                                            >
                                                <div className="card-body p-0">
                                                    <span className="far fa-shopping-bag"></span>
                                                    <span className="card-text font-size-md font-weight-semibold mt-2 d-block">Fashion</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="list-inline-item py-2">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}?category=automotive`}
                                                className="card border-0 link-hover-dark-white icon-box-style-01"
                                            >
                                                <div className="card-body p-0">
                                                    <span className="far fa-car"></span>
                                                    <span className="card-text font-size-md font-weight-semibold mt-2 d-block">Automotive</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div> */}
                            </div>
                        </div>
                    </section>

                    <CategorySlider title="Category" redirectType={"startup-category-search"} />

                    {/* Business Models */}
                    <div className={`${isLightThemeMode(router.pathname) ? "bg-white" : "bg-dark"} pt-8 pb-8`}>
                        <div className="container">
                            <div className="mb-2">
                                <h2 className="mb-0">
                                    <span className="font-weight-light">Explore By </span>
                                    <span className="font-weight-semibold">Business Model</span>
                                </h2>
                            </div>

                            <div className="row pt-5">
                                {BUSINESS_MODEL_DATA.map((bmd, bmdIndex) => (
                                    <div key={`bmd-${bmdIndex}`} className="col-sm-6 col-md-4 col-lg-3 mb-4" data-animate="pulse">
                                        <button
                                            className={`btn btn-hero text-capitalize rounded-0 ${
                                                isLightThemeMode(router.pathname) ? "" : "text-white"
                                            }`}
                                            title={bmd.name || ""}
                                            onClick={(e) => redirectToStartupSearch(e, "businessModel", bmd.value)}
                                        >
                                            {bmd.name || ""}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Startup Interests */}
                    <div className={`${isLightThemeMode(router.pathname) ? "bg-pattern-01" : "bg-secondary"} pt-8 pb-8`}>
                        <div className="container">
                            <div className="mb-2">
                                <h2 className="mb-0">
                                    <span className="font-weight-light">Explore By </span>
                                    <span className="font-weight-semibold">Interested In</span>
                                </h2>
                            </div>

                            <div className="row pt-5">
                                {STARTUP_INTERESTS.map((sti, stiIndex) => (
                                    <div key={`sti-${stiIndex}`} className="col-sm-6 col-md-4 col-lg-3 mb-4" data-animate="pulse">
                                        <button
                                            className={`btn btn-hero text-capitalize rounded-0 ${
                                                isLightThemeMode(router.pathname) ? "" : "text-white"
                                            }`}
                                            title={sti.name || ""}
                                            onClick={(e) => redirectToStartupSearch(e, sti.value, true)}
                                        >
                                            {sti.name || ""}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Startup Stage */}
                    <div className={`${isLightThemeMode(router.pathname) ? "bg-white" : "bg-dark"} pt-8 pb-8`}>
                        <div className="container">
                            <div className="mb-2">
                                <h2 className="mb-0">
                                    <span className="font-weight-light">Explore By </span>
                                    <span className="font-weight-semibold">Stage</span>
                                </h2>
                            </div>

                            <div className="row pt-5">
                                {STARTUP_STAGES.map((sti, stiIndex) => (
                                    <div key={`sti-${stiIndex}`} className="col-sm-6 col-md-4 col-lg-3 mb-4" data-animate="pulse">
                                        <button
                                            className={`btn btn-hero text-capitalize rounded-0 ${
                                                isLightThemeMode(router.pathname) ? "" : "text-white"
                                            }`}
                                            title={sti.name || ""}
                                            onClick={(e) => redirectToStartupSearch(e, "stage", sti.value)}
                                        >
                                            {sti.name || ""}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Startup Funding Type */}
                    <div className={`${isLightThemeMode(router.pathname) ? "bg-pattern-01" : "bg-secondary"} pt-8 pb-8`}>
                        <div className="container">
                            <div className="mb-2">
                                <h2 className="mb-0">
                                    <span className="font-weight-light">Explore By </span>
                                    <span className="font-weight-semibold">Funding Type</span>
                                </h2>
                            </div>

                            <div className="row pt-5">
                                {STARTUP_FUNDINGS.map((sti, stiIndex) => (
                                    <div key={`sti-${stiIndex}`} className="col-sm-6 col-md-4 col-lg-3 mb-4" data-animate="pulse">
                                        <button
                                            className={`btn btn-hero text-capitalize rounded-0 ${
                                                isLightThemeMode(router.pathname) ? "" : "text-white"
                                            }`}
                                            title={sti.name || ""}
                                            onClick={(e) => redirectToStartupSearch(e, "fundType", sti.value)}
                                        >
                                            {sti.name || ""}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Startup Nature */}
                    <div className={`${isLightThemeMode(router.pathname) ? "bg-white" : "bg-dark"} pt-8 pb-8`}>
                        <div className="container">
                            <div className="mb-2">
                                <h2 className="mb-0">
                                    <span className="font-weight-light">Explore By </span>
                                    <span className="font-weight-semibold">Business Nature</span>
                                </h2>
                            </div>

                            <div className="row pt-5">
                                {STARTUP_NATURES.map((sti, stiIndex) => (
                                    <div key={`sti-${stiIndex}`} className="col-sm-6 col-md-4 col-lg-3 mb-4" data-animate="pulse">
                                        <button
                                            className={`btn btn-hero text-capitalize rounded-0 ${
                                                isLightThemeMode(router.pathname) ? "" : "text-white"
                                            }`}
                                            title={sti.name || ""}
                                            onClick={(e) => redirectToStartupSearch(e, "businessNature", sti.value)}
                                        >
                                            {sti.name || ""}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Startup Funding Type */}
                    <div className={`${isLightThemeMode(router.pathname) ? "bg-pattern-01" : "bg-secondary"} pt-8 pb-8`}>
                        <div className="container">
                            <div className="mb-2">
                                <h2 className="mb-0">
                                    <span className="font-weight-light">Explore By </span>
                                    <span className="font-weight-semibold">Investment Nature</span>
                                </h2>
                            </div>

                            <div className="row pt-5">
                                {STARTUP_INVESTMENT_NATURES.map((sti, stiIndex) => (
                                    <div key={`sti-${stiIndex}`} className="col-sm-6 col-md-4 col-lg-3 mb-4" data-animate="pulse">
                                        <button
                                            className={`btn btn-hero text-capitalize rounded-0 ${
                                                isLightThemeMode(router.pathname) ? "" : "text-white"
                                            }`}
                                            title={sti.name || ""}
                                            onClick={(e) => redirectToStartupSearch(e, "investmentBasis", sti.value)}
                                        >
                                            {sti.name || ""}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ListingLayout>
            )}
        </>
    );
}
