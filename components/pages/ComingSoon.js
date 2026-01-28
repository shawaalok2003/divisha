import Image from "next/image";
import Countdown from "react-countdown";

export default function ComingSoon() {
    return (
        <div className="coming-soon">
            <header id="header" className="main-header text-center">
                <a href="index.html" className="logo">
                    <Image src="/images/logo.png" alt="Thedir" width={"150"} height={"150"} />
                </a>
            </header>

            <div id="wrapper-content" className="wrapper-content text-center pt-13 pb-12">
                <div className="mb-13">
                    <h2 className="mb-5 font-weight-normal">Coming Soon...</h2>
                    <p className="font-size-md lh-15 mb-0">Welcome</p>
                </div>
                <div className="countdown-section">
                    <div className="text-dark font-weight-semibold font-size-md mb-7 text-uppercase">Our Site Will Be Launched In:</div>

                    <Countdown
                        date={new Date(Date.UTC(2023, 2, 1, 0, 0, 0, 0)) || Date.now()}
                        renderer={({ days, hours, minutes, seconds, completed }) => {
                            if (completed) {
                                return "Yeaah !! We Have Launched !!";
                            } else {
                                return (
                                    <div className="countdown d-flex justify-content-center">
                                        <div className="px-3 px-sm-4 text-left">
                                            <span className="font-size-h4 font-size-sm-h1 text-dark d-block lh-11 day">{days}</span>
                                            <span className="text-capitalize">days</span>
                                        </div>
                                        <div className="px-3 px-sm-4 text-left">
                                            <span className="font-size-h4 font-size-sm-h1 text-dark d-block lh-11 hour">{hours}</span>
                                            <span className="text-capitalize">hours</span>
                                        </div>
                                        <div className="px-3 px-sm-4 text-left">
                                            <span className="font-size-h4 font-size-sm-h1 text-dark d-block lh-11 minute">{minutes}</span>
                                            <span className="text-capitalize">minutes</span>
                                        </div>
                                        <div className="px-3 px-sm-4 text-left">
                                            <span className="font-size-h4 font-size-sm-h1 text-dark d-block lh-11 second">{seconds}</span>
                                            <span className="text-capitalize">seconds</span>
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    />
                </div>
            </div>

            <footer className="main-footer text-center">
                <div className="social-follow d-flex justify-content-center align-items-center">
                    <div className="text-dark font-weight-semibold text-uppercase mr-6">Follow us:</div>
                    <div className="social-icon">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a target="_blank" title="Instagram" href="#">
                                    <svg className="icon icon-instagram"></svg>
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a target="_blank" title="Facebook" href="#">
                                    <i className="fab fa-facebook-f"></i>
                                    <span>Facebook</span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a target="_blank" title="Twitter" href="#">
                                    <i className="fab fa-twitter"></i>
                                    <span>Twitter</span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a target="_blank" title="Google plus" href="#">
                                    <i className="fab fa-youtube"></i>
                                    <span>Youtube</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
