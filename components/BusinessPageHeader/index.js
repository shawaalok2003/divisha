import Link from "next/link";
import { useRouter } from "next/router";
import { APPLICATION_URLS } from "../../constants";

const BusinessPageHeader = ({}) => {
    const router = useRouter();

    const commanClass = `btn btn-block text-capitalize rounded-0 border shadow-sm py-2`;
    const isActiveLink = (url) => (router.pathname === url ? "btn-primary text-white" : "");
    return (
        <div className="card-body bg-white">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <Link
                        className={`${commanClass} ${isActiveLink(APPLICATION_URLS.STARTUP_BUSINESS_INFO.url)}`}
                        title="Basic"
                        href={APPLICATION_URLS.STARTUP_BUSINESS_INFO.url}
                    >
                        Basic
                    </Link>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <Link
                        className={`${commanClass} ${isActiveLink(APPLICATION_URLS.STARTUP_BUSINESS_INFO_TAXES_AND_REGISTRATIONS.url)}`}
                        title="Tax & Registration"
                        href={APPLICATION_URLS.STARTUP_BUSINESS_INFO_TAXES_AND_REGISTRATIONS.url}
                    >
                        Tax & Registration
                    </Link>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <Link
                        className={`${commanClass} ${isActiveLink(APPLICATION_URLS.STARTUP_BUSINESS_INFO_CATEGORY_AND_SERVICES.url)}`}
                        title="Category & Services"
                        href={APPLICATION_URLS.STARTUP_BUSINESS_INFO_CATEGORY_AND_SERVICES.url}
                    >
                        Categories & Services
                    </Link>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <Link
                        className={`${commanClass} ${isActiveLink(APPLICATION_URLS.STARTUP_BUSINESS_INFO_OPERATION_AND_INTERESTS.url)}`}
                        title="Operation & Interests"
                        href={APPLICATION_URLS.STARTUP_BUSINESS_INFO_OPERATION_AND_INTERESTS.url}
                    >
                        Operation & Interests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BusinessPageHeader;
