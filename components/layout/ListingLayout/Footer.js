import Image from "next/image";
import Link from "next/link";
import { APPLICATION_URLS } from "../../../constants";
import { getYear } from "../../../helpers/date";
import { isLightThemeMode } from "../../../helpers/theme";
import { useRouter } from "next/router";

export default function Footer() {
    const router = useRouter();

    const deployedYear = 2023;
    const currentYear = getYear();

    const footerYear = deployedYear === currentYear ? `${currentYear}` : `${deployedYear} - ${currentYear}`;

    return (
        <footer
            className={`main-footer main-footer-style-01 pt-12 pb-8 ${isLightThemeMode(router.pathname) ? "bg-pattern-01" : "bg-dark text-white"}`}
        >
            <div className="footer-second">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-3 mb-6 mb-lg-0">
                            <div className="mb-8">
                                <img
                                    src={isLightThemeMode(router.pathname) ? "/images/white-logo.png" : "/images/white-logo.png"}
                                    width={"100"}
                                    height={"100"}
                                    alt="Startupz World Logo"
                                />
                            </div>
                            <div className="mb-7">
                                {/* <div className="font-size-md font-weight-semibold text-dark mb-4">Main Office</div> */}
                                <p className="mb-0">
                                    101, Relcon Enclave, NH-48
                                    <br />
                                    Surat, Gujarat
                                    <br />
                                    India - 394325
                                </p>
                            </div>
                            {/* <div className="region pt-1">
                                <div className="font-size-md font-weight-semibold text-dark mb-2">Site Language</div>
                                <form>
                                    <div className="select-custom bg-white">
                                        <select className="form-control bg-transparent">
                                            <option value="1">English</option>
                                        </select>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-3 mb-6 mb-lg-0">
                            <div className="font-size-md font-weight-semibold mb-4">Company</div>
                            <ul className="list-group list-group-flush list-group-borderless">
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.ABOUT_US.url} className="link-hover-secondary-primary">
                                        About Us
                                    </Link>
                                </li>
                                {/* <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href="" className="link-hover-secondary-primary">
                                        Team
                                    </Link>
                                </li> */}
                                {/* <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href="" className="link-hover-secondary-primary">
                                        Careers
                                    </Link>
                                </li> */}
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.CONTACT_US.url} className="link-hover-secondary-primary">
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.PRICING.url} className="link-hover-secondary-primary">
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-3 mb-6 mb-lg-0">
                            <div className="font-size-md font-weight-semibold mb-4">Quick Links</div>
                            <ul className="list-group list-group-flush list-group-borderless">
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.POLICY_COMMUNITY_GUIDELINES.url} className="link-hover-secondary-primary">
                                        Community Guidelines
                                    </Link>
                                </li>
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.POLICY_PRIVACY.url} className="link-hover-secondary-primary">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.POLICY_TERMSOFUSE.url} className="link-hover-secondary-primary">
                                        Terms Of Use
                                    </Link>
                                </li>
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.POLICY_CANCELLATION_REFUND.url} className="link-hover-secondary-primary">
                                        Cancellation & Refund
                                    </Link>
                                </li>
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.POLICY_SHIPPING_AND_EXCHANGE.url} className="link-hover-secondary-primary">
                                        Shipping & Exchange
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-3 mb-6 mb-lg-0">
                            <div className="font-size-md font-weight-semibold mb-4">FAQs</div>
                            <ul className="list-group list-group-flush list-group-borderless">
                                <li className="list-group-item px-0 lh-1625 bg-transparent py-1">
                                    <Link href={APPLICATION_URLS.FAQS_STARTUP.url} className="link-hover-secondary-primary">
                                        Startup FAQs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="col-sm-4 col-md-4 col-lg-3 mb-6 mb-lg-0">
                            <div className="pl-0 pl-lg-9">
                                <div className="font-size-md font-weight-semibold text-dark mb-4">Our Newsletter</div>
                                <div className="mb-4">
                                    Subscribe to our newsletter and
                                    <br />
                                    we will inform you about newset directory and promotions
                                </div>
                                <div className="form-newsletter">
                                    <form>
                                        <div className="input-group bg-white">
                                            <input type="text" className="form-control border-0" placeholder="Email Address... " />
                                            <button type="button" className="input-group-append btn btn-white bg-transparent text-dark border-0">
                                                <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="footer-last mt-8 mt-md-11">
                <div className="container">
                    <div className="footer-last-container position-relative">
                        <div className="row align-items-center">
                            <div className="col-lg-4 mb-3 mb-lg-0">
                                <div className="social-icon text-dark">
                                    <ul className="list-inline">
                                        <li className="list-inline-item mr-5">
                                            <a target="_blank" title="Twitter" href="">
                                                <i className="fab fa-twitter"></i>
                                                <span>Twitter</span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-5">
                                            <a target="_blank" title="Facebook" href="">
                                                <i className="fab fa-facebook"></i>
                                                <span>Facebook</span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-5">
                                            <a target="_blank" title="Instagram" href="">
                                                <i className="fab fa-instagram"></i>
                                                <span>Instagram</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3 mb-lg-0">
                                <div>
                                    &copy; {footerYear}{" "}
                                    <Link
                                        href={APPLICATION_URLS.HOME.url}
                                        className={`link-hover-dark-primary font-weight-semibold ${
                                            isLightThemeMode(router.pathname) ? "text-dark" : "text-primary"
                                        }`}
                                    >
                                        StartupzWorld,
                                    </Link>{" "}
                                    All Rights Resevered.
                                </div>
                            </div>
                            <div className="back-top text-left text-lg-right gtf-back-to-top">
                                <a href="" className="link-hover-secondary-primary">
                                    <i className="fal fa-arrow-up"></i>
                                    <span>Back To Top</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
