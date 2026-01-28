import Image from "next/image";

export default function Maintenance() {
    return (
        <div id="site-wrapper" className="site-wrapper under-construction">
            <header id="header" className="pt-10 text-center">
                <a href="index.html" className="logo">
                    <Image src="/images/logo.png" width={"150"} height={"150"} alt="Thedir" />
                </a>
            </header>

            <div id="wrapper-content" className="wrapper-content text-center pb-13">
                <div className="image">
                    <Image src="/images/other/under-contruction.png" width={"1000"} height={"100"} alt="Under construction" />
                </div>
                <div className="pt-9">
                    <h3 className="mb-3">Sorry, we’re doing some work on site.</h3>
                    <p className="font-size-md mb-0">Thank you for being patient. We will be back soon</p>
                </div>
            </div>

            <footer className="main-footer d-flex justify-content-center pb-75">
                <div className="social-icon text-dark">
                    <ul className="list-inline">
                        <li className="list-inline-item mr-5">
                            <a target="_blank" title="Twitter" href="#" className="font-size-md">
                                <i className="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                        </li>
                        <li className="list-inline-item mr-5">
                            <a target="_blank" title="Facebook" href="#" className="font-size-md">
                                <i className="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </a>
                        </li>
                        <li className="list-inline-item mr-5">
                            <a target="_blank" title="Google plus" href="#" className="font-size-md">
                                <svg className="icon icon-google-plus-symbol"></svg>
                                <span>Google plus</span>
                            </a>
                        </li>
                        <li className="list-inline-item mr-5">
                            <a target="_blank" title="Instagram" href="#" className="font-size-md">
                                <svg className="icon icon-instagram"></svg>
                                <span>Instagram</span>
                            </a>
                        </li>
                        <li className="list-inline-item mr-5">
                            <a target="_blank" title="Rss" href="#" className="font-size-md">
                                <i className="fas fa-rss"></i>
                                <span>Rss</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
