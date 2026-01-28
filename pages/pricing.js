import Head from "next/head";
import ListingLayout from "../components/layout/ListingLayout";

export default function AboutUs() {
    return (
        <ListingLayout>
            <Head>
                <title>Pricing</title>
                <meta property="og:title" content="Pricing" key="pricing" />
            </Head>
            <div className="page-title mt-10 pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Pricing</h1>
                        </div>
                    </div>

                    <div id="pricing-table" className="section-pricing-table pt-9">
                        <div className="card-deck">
                            <div className="pricing-table card rounded-0">
                                <div className="card-header bg-transparent border-0 p-0">
                                    <div className="font-weight-semibold text-dark font-size-md mb-3 text-uppercase">Silver</div>
                                    <div className="mb-5">
                                        <span className="price text-primary">Rs 500</span>
                                        {/* <span>/</span>
                                        <span>Mo</span> */}
                                    </div>
                                    {/* <p className="text-gray mb-6">Sed faucibus lectus quis tellus fermentum.</p> */}
                                </div>
                                <div className="card-body px-0 pt-5 pb-7">
                                    <ul className="features list-group list-group-flush list-group-borderless">
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Duration: 1 Month</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Premium Listing</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Contact Display</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Services Display</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-transparent border-0 mt-auto p-0">
                                    <a
                                        className="btn btn-primary btn-block lh-lg font-weight-bold rounded-0 text-white"
                                        onClick={() => window.open("https://rzp.io/i/QSiCsVWM", "window", "toolbar=no, menubar=no, resizable=yes")}
                                    >
                                        Subscribe
                                    </a>
                                </div>
                            </div>
                            <div className="pricing-table card rounded-0 bg-primary text-white">
                                <div className="card-header bg-transparent border-0 p-0">
                                    <div className="font-weight-semibold font-size-md mb-3 text-uppercase">Golden</div>
                                    <div className="mb-5">
                                        <span className="price text-white">Rs 1000</span>
                                        {/* <span>/</span>
                                        <span>Mo</span> */}
                                    </div>
                                    {/* <p className="mb-6">Sed faucibus lectus quis tellus fermentum.</p> */}
                                </div>
                                <div className="card-body px-0 pt-5 pb-7">
                                    <ul className="features list-group list-group-flush list-group-borderless">
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span>Duration: 3 Months</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span>Premium Listing</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span>Contact Display</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span>Services Display</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-transparent border-0 p-0 mt-auto">
                                    <a
                                        className="btn btn-white lh-lg text-primary btn-block font-weight-bold rounded-0"
                                        onClick={() => window.open("https://rzp.io/i/dMzuxbc6", "window", "toolbar=no, menubar=no, resizable=yes")}
                                    >
                                        Subscribe
                                    </a>
                                </div>
                            </div>
                            <div className="pricing-table card rounded-0">
                                <div className="card-header bg-transparent border-0 p-0">
                                    <div className="font-weight-semibold text-dark font-size-md mb-3 text-uppercase">Platinum</div>
                                    <div className="mb-5">
                                        <span className="price text-primary">Rs 2000</span>
                                        {/* <span>/</span>
                                        <span>Mo</span> */}
                                    </div>
                                    {/* <p className="text-gray mb-6">Sed faucibus lectus quis tellus fermentum.</p> */}
                                </div>
                                <div className="card-body px-0 pt-5 pb-7">
                                    <ul className="list-group list-group-flush list-group-borderless">
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Duration: 6 Months</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Premium Listing</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Contact Display</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Services Display</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-transparent border-0 p-0 mt-auto">
                                    <a
                                        className="btn btn-primary btn-block lh-lg font-weight-bold rounded-0 text-white"
                                        onClick={() => window.open("https://rzp.io/i/FXsnD4UQG", "window", "toolbar=no, menubar=no, resizable=yes")}
                                    >
                                        Subscribe
                                    </a>
                                </div>
                            </div>
                            {/* <div className="pricing-table card rounded-0">
                                <div className="card-header bg-transparent border-0 p-0">
                                    <div className="font-weight-semibold text-dark font-size-md mb-3 text-uppercase">utilmate</div>
                                    <div className="mb-5">
                                        <span className="price text-primary">$99</span>
                                        <span>/</span>
                                        <span>Mo</span>
                                    </div>
                                    <div className="text-gray mb-6">Sed faucibus lectus quis tellus fermentum.</div>
                                </div>
                                <div className="card-body px-0 pt-5 pb-7">
                                    <ul className="list-group list-group-flush list-group-borderless">
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Duration: 30 days</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark"> 30 Listing</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Contact Display</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Price Range</span>
                                        </li>
                                        <li className="list-group-item bg-transparent p-0 mb-1">
                                            <span className="text-green font-size-md d-inline-block mr-3">
                                                <i className="fal fa-check"></i>
                                            </span>
                                            <span className="text-dark">Business Hours</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-transparent border-0 p-0 mt-auto">
                                    <a href="#" className="btn btn-primary btn-block lh-lg font-weight-bold rounded-0">
                                        Register Now
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
