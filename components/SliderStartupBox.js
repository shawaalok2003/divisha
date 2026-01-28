import Link from "next/link";

const SliderStartupBox = ({ startup }) => {
    return (
        <div className="box" data-animate="fadeInUp">
            <div className="store card border-0 rounded-0">
                <div className="position-relative store-image">
                    <Link href="">
                        <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                    </Link>
                    <div className="image-content position-absolute d-flex align-items-center">
                        <div className="content-left">
                            <div className="badge badge-primary">{startup.domain || "NA"}</div>
                        </div>
                        {/* <div className="content-right ml-auto d-flex w-lg show-link">
                            <a href="#" className="item marking" data-toggle="tooltip" data-placement="top" title="Bookmark">
                                <i className="fal fa-bookmark"></i>
                            </a>
                        </div> */}
                    </div>
                </div>
                <div className="card-body px-0 pb-0 pt-3">
                    <Link href="" className="card-title h5 text-dark d-inline-block mb-2">
                        <span className="letter-spacing-25">{startup.name || ""}</span>
                    </Link>
                    <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap justify-content-between">
                        <li className="list-inline-item">
                            <span className="badge badge-success d-inline-block">
                                <i className="fa fa-star"></i> {startup.ratings || 0}
                            </span>
                            {/* <span>4 rating</span> */}
                        </li>
                        <li className="list-inline-item separate"></li>
                        <li className="list-inline-item">
                            <span className="mr-1"></span>
                            <span className="text-danger font-weight-semibold">
                                {startup.currency || "Rs. "} {startup.valuation}
                            </span>
                        </li>
                        {/* <li className="list-inline-item separate"></li>
                        <li className="list-inline-item">
                            <a href="#" className="link-hover-secondary-primary">
                                <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed"></use>
                                </svg>
                                <span>{startup.domain || "NA"}</span>
                            </a>
                        </li> */}
                    </ul>
                    <div className="media">
                        <div className="media-body lh-14 font-size-sm">{startup.shortDescription || ""}</div>
                    </div>
                </div>
                <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center justify-content-between">
                    <li className="list-inline-item">
                        <span className="d-inline-block mr-1">
                            <i className="fal fa-map-marker-alt"> </i>
                        </span>
                        <Link href="" className="text-secondary text-decoration-none link-hover-secondary-blue">
                            {startup.location || "NA"}
                        </Link>
                    </li>
                    {/* <li className="list-inline-item separate"></li> */}
                    <li className="list-inline-item text-right">
                        <Link href={""} className="btn btn-primary">
                            Details <i className="fas fa-arrow-right"> </i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SliderStartupBox;
