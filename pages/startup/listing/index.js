import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import STARTUP_API from "../../../api/startup/startup";
import ListingLayout from "../../../components/layout/ListingLayout";
import { APPLICATION_URLS, BUSINESS_MODEL_DATA, STARTUP_STAGES } from "../../../constants";

import STARTUP_LISTING_API from "../../../api/startup/listing";
import CATEGORY_API from "../../../api/category";
import { consoleLogger, handleDefaultImage } from "../../../helpers";
import { getFormattedDateOnly } from "../../../helpers/date";

export default function Listing() {
    const router = useRouter();
    const { categoryId, name: startupName, businessModel, stage } = router.query;

    const defaultFilters = {
        categoryId: categoryId || "all",
        businessModel: businessModel || "",
        name: decodeURIComponent(startupName || ""),
        stage: stage || "",
    };

    const sortingList = [
        {
            key: "latest",
            name: "Recently Added",
        },
        // {
        //     key: "name-asc",
        //     name: "Name: A - Z",
        // },
        // {
        //     key: "name-desc",
        //     name: "Name: Z - A",
        // },
    ];

    const [filters, setFilters] = useState(defaultFilters);

    const [startups, setStartups] = useState([]);
    const [startupsCount, setStartupsCount] = useState(0);
    const [totalStartupsCount, setTotalStartupsCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [searchTerm, setSearchTerm] = useState(decodeURIComponent(startupName || ""));
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CATEGORY_API.searchCategories({ token: null, page: 0, limit: 10000 })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCategories(startupResponse.data);
                } else {
                    setCategories([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCategories([]);
            })
            .finally(() => { });
    }, []);

    useEffect(() => {
        //if (startupName) setFilters({ ...filters, name: decodeURIComponent(startupName || "") });
        //if (categoryId) setFilters({ ...filters, categoryId: categoryId });
        //if (businessModel) setFilters({ ...filters, businessModel: businessModel });

        setFilters({ ...filters, name: decodeURIComponent(startupName || ""), categoryId: categoryId, businessModel: businessModel, stage: stage });
    }, [router.query]);

    useEffect(() => {
        STARTUP_LISTING_API.searchStartups({ page: pageNo, limit: pageSize, filters: filters })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartups(startupResponse.data);
                    setStartupsCount(startupResponse.count);
                    setTotalStartupsCount(startupResponse.total);
                } else {
                    setStartups([]);
                    setStartupsCount(0);
                    setTotalStartupsCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setStartups([]);
                setStartupsCount(0);
                setTotalStartupsCount(0);
            })
            .finally(() => { });
    }, [pageNo, pageSize, filters]);

    const redirectToStartupSearch = () => {
        if (searchTerm) {
            router.push(`${APPLICATION_URLS.STARTUP_LISTING.url}?name=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <ListingLayout>
            <Head>
                <title>Startups Listing</title>
                <meta property="og:title" content="Startups Listing" key="startups-listing" />
            </Head>
            <div className="page-title mt-10 pt-10 pb-10 wrapper-content bg-gray-04 pb-0">
                <div className="container">
                    <div className="page-container row ml-0">
                        <div className="col-12 explore-filter d-lg-flex align-items-center d-block">
                            {startupsCount > 0 && (
                                <div className="text-dark font-weight-semibold font-size-md mb-4 mb-lg-0">
                                    Showing {pageNo * pageSize + 1} to{" "}
                                    {startupsCount > (pageNo + 1) * pageSize ? (pageNo + 1) * pageSize : startupsCount} of {startupsCount} startups
                                </div>
                            )}
                            <div className="form-filter d-flex align-items-center ml-auto">
                                {/* <div className="form-group row no-gutters align-items-center">
                                    <label htmlFor="sort-by" className="col-sm-3 text-dark font-size-md font-weight-semibold mb-0">
                                        Show
                                    </label>
                                    <div className="select-custom col-sm-2 bg-white">
                                        <select
                                            id="sort-by"
                                            className="form-control bg-transparent"
                                            value={pageSize}
                                            onChange={(e) => setPageSize(e.target.value)}
                                        >
                                            <option value={2}>2</option>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="form-group row no-gutters align-items-center">
                                    <label htmlFor="sort-by" className="col-sm-3 text-dark font-size-md font-weight-semibold mb-0">
                                        Sort by
                                    </label>
                                    <div className="select-custom col-sm-9 bg-white">
                                        <select id="sort-by" className="form-control bg-transparent" defaultValue={filters.sort}>
                                            {sortingList.map((sort, sortIndex) => {
                                                return (
                                                    <option key={`sort-list-${sortIndex}`} value={sort.key}>
                                                        {sort.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="format-listing ml-auto">
                                    <a href="explore-sidebar-grid.html">
                                        <i className="fas fa-th"></i>
                                    </a>
                                    <a href="#" className="active">
                                        <i className="fal fa-bars"></i>
                                    </a>
                                </div> */}
                            </div>
                        </div>
                        {/* Sidebar */}
                        <div className="sidebar col-12 col-lg-4 order-1 order-lg-0">
                            <div className="card search bg-white mb-6 border rounded-5 px-6 shadow-sm">
                                <div className="card-header bg-transparent border-0 pt-4 pb-0 px-0">
                                    <h5 className="card-title mb-0">Search</h5>
                                </div>
                                <div className="card-body px-0 pb-42">
                                    <div className="form-search form-search-style-03">
                                        <div className="form-group">
                                            <div className="input-group d-flex align-items-center">
                                                <label htmlFor="what" className="input-group-prepend text-dark font-weight-semibold">
                                                    What
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    id="what"
                                                    placeholder="Startup Name"
                                                    defaultValue={searchTerm || ""}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <div className="input-group d-flex align-items-center">
                                                <label htmlFor="where" className="input-group-prepend text-dark font-weight-semibold">
                                                    Where
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    id="where"
                                                    placeholder="City, postcode..."
                                                />
                                            </div>
                                        </div> */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block btn-icon-left font-size-md"
                                            onClick={(e) => {
                                                setFilters({ ...filters, name: searchTerm });

                                                //redirectToStartupSearch();
                                            }}
                                        >
                                            <i className="fal fa-search"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card widget-filter bg-white mb-6 rounded-5 px-6 border shadow-sm">
                                <div className="card-header bg-transparent border-0 pt-4 pb-0 px-0">
                                    <h5 className="card-title mb-0">Filters</h5>
                                </div>
                                <div className="card-body px-0">
                                    <div className="form-group category">
                                        <label className="font-weight-semibold">Category</label>
                                        <div className="select-custom">
                                            <select
                                                className="form-control"
                                                value={filters.categoryId}
                                                onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                                            >
                                                <option key={`cat-list-all`} value={"all"}>
                                                    All
                                                </option>
                                                {categories.map((category, catIndex) => {
                                                    return (
                                                        <option key={`cat-list-${catIndex}`} value={category.categoryId}>
                                                            {category.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group category">
                                        <label className="font-weight-semibold">Business Model</label>
                                        <div className="select-custom">
                                            <select
                                                className="form-control"
                                                value={filters.businessModel}
                                                onChange={(e) => setFilters({ ...filters, businessModel: e.target.value })}
                                            >
                                                <option key={`buss-mod-all`} value={""}>
                                                    All
                                                </option>
                                                {BUSINESS_MODEL_DATA.map((bmd, bmdIndex) => {
                                                    return (
                                                        <option key={`buss-mod-${bmdIndex}`} value={bmd.value}>
                                                            {bmd.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group category">
                                        <label className="font-weight-semibold">Business Stage</label>
                                        <div className="select-custom">
                                            <select
                                                className="form-control"
                                                value={filters.stage}
                                                onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                                            >
                                                <option key={`buss-stage-all`} value={""}>
                                                    All
                                                </option>
                                                {STARTUP_STAGES.map((sts, stsIndex) => {
                                                    return (
                                                        <option key={`buss-stage-${stsIndex}`} value={sts.value}>
                                                            {sts.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Startups */}
                        <div className="page-content col-12 col-lg-8">
                            {/* Startups Listing */}
                            <div className="store-listing-style store-listing-style-02">
                                {startups && startups.length === 0 && (
                                    <div className="text-center bg-white border py-10 shadow-sm">
                                        <h5 className="text-center text-primary">No startups Found</h5>

                                        <h6 className="text-center text-gray font-size-sm pt-5 pb-5">Try clearing some filters . . .</h6>
                                        <div className="d-flex flex-wrap align-items-center justify-content-center p-5">
                                            {Object.keys(filters).map((fk, fkIndex) => {
                                                let label = fk;
                                                let labelValue = filters[fk];

                                                if (fk === "name") {
                                                    label = "Startup Name";
                                                    labelValue = decodeURIComponent(labelValue || "N/A");
                                                } else if (fk === "categoryId") {
                                                    label = "Category";
                                                    labelValue = (categories && categories.find((c) => c.categoryId == labelValue)?.name) || "All";
                                                } else if (fk === "businessModel") {
                                                    label = "Busness Model";
                                                    labelValue =
                                                        (BUSINESS_MODEL_DATA && BUSINESS_MODEL_DATA.find((bm) => bm.value == labelValue)?.name) ||
                                                        "All";
                                                } else if (fk === "stage") {
                                                    label = "Busness Stage";
                                                    labelValue =
                                                        (STARTUP_STAGES && STARTUP_STAGES.find((bm) => bm.value == labelValue)?.name) || "All";
                                                }

                                                return (
                                                    <span className="bg-primary text-white p-2 mr-2 mb-2 rounded" key={`filters-applied-${fkIndex}`}>
                                                        <span className="font-weight-semibold">{label}</span>: {labelValue}{" "}
                                                        {/* <span
                                                            className="fas fa-times-circle pl-3 cursor-pointer"
                                                            onClick={() => {
                                                                setFilters({ ...filters, [label]: defaultFilters[label] });
                                                            }}
                                                        ></span> */}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {startups?.map((startup, startupIndex) => (
                                    <div className="mb-6 border shadow-sm" key={`stl-${startupIndex}-${startup.startupId}`}>
                                        <div className="store media bg-white job-store">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}/${startup.startupId}`}
                                                className="store-image"
                                            // style={{
                                            //     backgroundImage: startup.logo || "url('/images/no-image.jpg')",
                                            // }}
                                            >
                                                <img src={startup.logo || "/images/no-image.jpg"} className="w-100" onError={handleDefaultImage} />
                                            </Link>
                                            <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                                <Link
                                                    href={`${APPLICATION_URLS.STARTUP_LISTING.url}/${startup.startupId}`}
                                                    className="h5 text-dark d-inline-block store-name text-decoration-none"
                                                >
                                                    <span className="letter-spacing-25 text-primary">{startup.name || ""}</span>{" "}
                                                </Link>
                                                <div className="d-flex align-items-center lh-1">
                                                    <span className="text-gray">
                                                        <span className="text-secondary font-weight-semibold">Categories:</span>{" "}
                                                        {startup?.categories
                                                            .splice(0, 2)
                                                            .map((c) => c.name)
                                                            .join(",") || "NA"}
                                                        {"..."}
                                                    </span>
                                                    {/* <span className="favourite ml-auto text-danger">
                                                            <i className="fas fa-heart"></i>
                                                        </span> */}
                                                </div>
                                                <div className="border-bottom pt-2 pb-1 mb-1 px-0">
                                                    <span className="text-secondary font-weight-semibold">Intro:</span> {startup?.info?.intro || "NA"}
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <i className="fal fa-map-marker-alt text-dark"></i>
                                                        <span className="d-inline-block ml-2 text-dark">
                                                            Country: {startup?.country?.name || "NA"}
                                                        </span>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <i className="fal fa-briefcase text-dark"></i>
                                                        <span className="d-inline-block ml-2 text-dark">
                                                            Stage: {startup.stage?.toUpperCase() || "NA"}
                                                        </span>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <i className="fal fa-sack-dollar text-dark"></i>
                                                        <span className="d-inline-block ml-2 text-dark">
                                                            Open To Funding: {startup?.funding?.interestedInFunding?.toUpperCase() || "NA"}
                                                        </span>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <i className="fal fa-clock text-dark"></i>
                                                        <span className="d-inline-block ml-2 text-dark">
                                                            Type: {startup?.funding?.fundMode?.toUpperCase() || "NA"} ({" "}
                                                            {startup?.funding?.fundType?.toUpperCase() || "NA"} )
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className="mb-6">
                                    <div className="store media align-items-stretch bg-white job-store">
                                        <a
                                            href="listing-details-full-image.html"
                                            className="store-image"
                                            style={{ backgroundImage: "url('/images/shop/shop-1.jpg')" }}
                                        ></a>
                                        <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                            <div className="d-flex align-items-center lh-1">
                                                <span className="text-gray">Wave Agency</span>
                                                <span className="favourite ml-auto text-darker-light">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </div>
                                            <a href="listing-details-full-image.html" className="h5  text-dark d-inline-block store-name">
                                                <span className="letter-spacing-25">Account Executive</span>{" "}
                                            </a>
                                            <div className="row mb-2">
                                                <div className="col-lg-6">
                                                    <i className="fal fa-map-marker-alt"></i>
                                                    <span className="d-inline-block ml-2">92 Halsey St, Brooklyn, New York</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-briefcase"></i>
                                                    <span className="d-inline-block ml-2 text-link">Part Time</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-sack-dollar"></i>
                                                    <span className="d-inline-block ml-2 text-danger">$300.00 - $800.00</span>
                                                </div>
                                                <div className="col-lg-6 item">
                                                    <i className="fal fa-clock"></i>
                                                    <span className="d-inline-block ml-2">Posted 22 hours ago</span>
                                                </div>
                                            </div>
                                            <div className="border-top pt-2 px-0 pb-0">
                                                Consulting have instructions to recruit a Company Accountant/Bookkeeper...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="store media align-items-stretch bg-white job-store">
                                        <a
                                            href="listing-details-full-image.html"
                                            className="store-image"
                                            style={{ backgroundImage: "url('/images/shop/shop-1.jpg')" }}
                                        ></a>
                                        <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                            <div className="d-flex align-items-center lh-1">
                                                <span className="text-gray">ABA Logistic JSC</span>
                                                <span className="favourite ml-auto text-darker-light">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </div>
                                            <a href="listing-details-full-image.html" className="h5  text-dark d-inline-block store-name">
                                                <span className="letter-spacing-25">3Transport Shift Controller</span>{" "}
                                            </a>
                                            <div className="row mb-3">
                                                <div className="col-lg-6">
                                                    <i className="fal fa-map-marker-alt"></i>
                                                    <span className="d-inline-block ml-2">92 Halsey St, Brooklyn, New York</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-briefcase"></i>
                                                    <span className="d-inline-block ml-2 text-link">Temporary</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-sack-dollar"></i>
                                                    <span className="d-inline-block ml-2 text-danger">$100.00/day</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-clock"></i>
                                                    <span className="d-inline-block ml-2">Posted 1 days ago</span>
                                                </div>
                                            </div>
                                            <div className="border-top pt-2 px-0 pb-0">
                                                Consulting have instructions to recruit a Company Accountant/Bookkeeper...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="store media align-items-stretch bg-white job-store">
                                        <a
                                            href="listing-details-full-image.html"
                                            className="store-image"
                                            style={{ backgroundImage: "url('/images/shop/shop-1.jpg')" }}
                                        ></a>
                                        <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                            <div className="d-flex align-items-center lh-1">
                                                <span className="text-gray">Arates Property Co</span>
                                                <span className="favourite ml-auto text-darker-light">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </div>
                                            <a href="listing-details-full-image.html" className="h5  text-dark d-inline-block store-name">
                                                <span className="letter-spacing-25">Intership Property Sale</span>{" "}
                                            </a>
                                            <div className="row mb-3">
                                                <div className="col-lg-6">
                                                    <i className="fal fa-map-marker-alt"></i>
                                                    <span className="d-inline-block ml-2">92 Halsey St, Brooklyn, New York</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-briefcase"></i>
                                                    <span className="d-inline-block ml-2 text-link">Intership</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-sack-dollar"></i>
                                                    <span className="d-inline-block ml-2 text-danger">$150.00 - $300.00</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-clock"></i>
                                                    <span className="d-inline-block ml-2">Posted 2 days ago</span>
                                                </div>
                                            </div>
                                            <div className="border-top pt-2 px-0 pb-0">
                                                Consulting have instructions to recruit a Company Accountant/Bookkeeper...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="store media align-items-stretch bg-white job-store">
                                        <a
                                            href="listing-details-full-image.html"
                                            className="store-image"
                                            style={{ backgroundImage: "url('/images/shop/shop-1.jpg')" }}
                                        ></a>
                                        <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                            <div className="d-flex align-items-center lh-1">
                                                <span className="text-gray">Roishalattan LLC</span>
                                                <span className="favourite ml-auto text-darker-light">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </div>
                                            <a href="listing-details-gallery.html" className="h5  text-dark d-inline-block store-name">
                                                <span className="letter-spacing-25">UI/UX Product Designer</span>{" "}
                                            </a>
                                            <div className="row mb-3">
                                                <div className="col-lg-6">
                                                    <i className="fal fa-map-marker-alt"></i>
                                                    <span className="d-inline-block ml-2">92 Halsey St, Brooklyn, New York</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-briefcase"></i>
                                                    <span className="d-inline-block ml-2 text-link">Anywhere</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-sack-dollar"></i>
                                                    <span className="d-inline-block ml-2 text-danger">$1,000.00 - $2,000.00</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-clock"></i>
                                                    <span className="d-inline-block ml-2">Posted 2 hours ago</span>
                                                </div>
                                            </div>
                                            <div className="border-top pt-2 px-0 pb-0">
                                                Consulting have instructions to recruit a Company Accountant/Bookkeeper...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="store media align-items-stretch bg-white job-store">
                                        <a
                                            href="listing-details-full-image.html"
                                            className="store-image"
                                            style={{ backgroundImage: "url('/images/shop/shop-1.jpg')" }}
                                        ></a>
                                        <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                            <div className="d-flex align-items-center lh-1">
                                                <span className="text-gray">BeatsLabs Co</span>
                                                <span className="favourite ml-auto text-darker-light">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </div>
                                            <a href="listing-details-full-image.html" className="h5  text-dark d-inline-block store-name">
                                                <span className="letter-spacing-25">WP Front-End Developer</span>{" "}
                                            </a>
                                            <div className="row mb-3">
                                                <div className="col-lg-6">
                                                    <i className="fal fa-map-marker-alt"></i>
                                                    <span className="d-inline-block ml-2">92 Halsey St, Brooklyn, New York</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-briefcase"></i>
                                                    <span className="d-inline-block ml-2 text-link">Full Time</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-sack-dollar"></i>
                                                    <span className="d-inline-block ml-2 text-danger">$1,500.00 - $3,000.00</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-clock"></i>
                                                    <span className="d-inline-block ml-2">Posted 3 days ago</span>
                                                </div>
                                            </div>
                                            <div className="border-top pt-2 px-0 pb-0">
                                                Consulting have instructions to recruit a Company Accountant/Bookkeeper...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="store media align-items-stretch bg-white job-store">
                                        <a
                                            href="listing-details-full-image.html"
                                            className="store-image"
                                            style={{ backgroundImage: "url('/images/shop/shop-1.jpg')" }}
                                        ></a>
                                        <div className="media-body px-0 px-md-4 pt-4 pt-lg-0">
                                            <div className="d-flex align-items-center lh-1">
                                                <span className="text-gray">Sun Travel Co</span>
                                                <span className="favourite ml-auto text-darker-light">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                            </div>
                                            <a href="listing-details-full-image.html" className="h5  text-dark d-inline-block store-name">
                                                <span className="letter-spacing-25">Travel Sale Consultan</span>{" "}
                                            </a>
                                            <div className="row mb-3">
                                                <div className="col-lg-6">
                                                    <i className="fal fa-map-marker-alt"></i>
                                                    <span className="d-inline-block ml-2">92 Halsey St, Brooklyn, New York</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-briefcase"></i>
                                                    <span className="d-inline-block ml-2 text-link">Full Time</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-sack-dollar"></i>
                                                    <span className="d-inline-block ml-2 text-danger">$300.00 - $800.00</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <i className="fal fa-clock"></i>
                                                    <span className="d-inline-block ml-2">Posted 4 days ago</span>
                                                </div>
                                            </div>
                                            <div className="border-top pt-2 px-0 pb-0">
                                                Consulting have instructions to recruit a Company Accountant/Bookkeeper...
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="pagination">
                                <a href="#" className="btn btn-lg btn-dark-red btn-block font-size-h5 lh-18">
                                    More Results...48/56
                                </a>
                            </div> */}

                            {/* Startups Pagination */}

                            {startupsCount > pageSize && (
                                <ul className="bg-white pagination pagination-style-01 justify-content-center mt-6 pt-5 pb-5">
                                    {pageNo >= 1 && (
                                        <li className="page-item">
                                            <button
                                                onClick={() => setPageNo(pageNo - 1)}
                                                className="page-link bg-transparent link-hover-dark-primary px-3"
                                            >
                                                <i className="fal fa-arrow-left"></i>
                                            </button>
                                        </li>
                                    )}

                                    {[...Array(parseInt(startupsCount / pageSize) + 1).keys()].map((number, i) => (
                                        <li
                                            key={`pg-${i}-nos`}
                                            className={`page-item ${pageNo === i ? "text-danger" : ""}`}
                                            onClick={() => setPageNo(i)}
                                        >
                                            <button
                                                className={`page-link bg-transparent link-hover-dark-primary px-3 ${pageNo === i ? "text-danger" : ""
                                                    }`}
                                            >
                                                {number + 1}
                                            </button>
                                        </li>
                                    ))}

                                    {pageNo >= 0 && pageNo < parseInt(startupsCount / pageSize) && (
                                        <li className="page-item">
                                            <button
                                                onClick={() => setPageNo(pageNo + 1)}
                                                className="page-link bg-transparent link-hover-dark-primary px-3"
                                            >
                                                <i className="fal fa-arrow-right"></i>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
