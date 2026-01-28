import img from "next/image";
import Link from "next/link";
import { useState } from "react";
import { APPLICATION_URLS, LIGHT_THEME } from "../../../constants";
import { isLightThemeMode } from "../../../helpers/theme";
import useStartup from "../../../hooks/useStartup";
import { useRouter } from "next/router";

export default function TopMenu() {
    const router = useRouter();
    const { startup } = useStartup();

    const [menu, setMenu] = useState(false);

    const menuColor = [APPLICATION_URLS.HOME.url].includes(router.pathname) ? "" : "bg-white shadow-sm";

    const menuData = [
        {
            name: "Home",
            url: APPLICATION_URLS.HOME.url,
        },
        {
            name: "Startup",
            url: APPLICATION_URLS.STARTUP.url,
        },
        {
            name: "Investor",
            url: APPLICATION_URLS.INVESTOR.url,
        },
        {
            name: "About Us",
            url: APPLICATION_URLS.ABOUT_US.url,
        },
    ];

    return (
        <header
            className={`main-header header-sticky header-sticky-smart header-style-01 header-float text-uppercase ${
                isLightThemeMode(router.pathname) ? menuColor : "bg-dark"
            }`}
        >
            <div className="header-wrapper sticky-area">
                <div className="container container-1720">
                    <nav className="navbar navbar-expand-xl">
                        <div className="header-mobile d-flex d-xl-none flex-fill justify-content-between align-items-center">
                            <div className={`navbar-toggler toggle-icon ${menu ? "in" : "collapsed"}`} onClick={() => setMenu(!menu)}>
                                <span></span>
                            </div>
                            <Link className="navbar-brand navbar-brand-mobile" href={APPLICATION_URLS.HOME.url}>
                                <img
                                    src={isLightThemeMode(router.pathname) ? "/images/white-logo.png" : "/images/white-logo.png"}
                                    width={"60"}
                                    height={"60"}
                                    alt="Startupz World"
                                />
                            </Link>
                            <Link
                                className="mobile-button-search"
                                href="#search-popup"
                                data-gtf-mfp="true"
                                data-mfp-options='{"type":"inline","mainClass":"mfp-move-from-top mfp-align-top search-popup-bg","closeOnBgClick":false,"showCloseBtn":false}'
                            >
                                <i className="far fa-search"></i>
                            </Link>
                        </div>
                        <div className={`collapse navbar-collapse ${menu ? "show" : ""}`} id="navbar-main-menu">
                            <Link className="navbar-brand d-none d-xl-block mr-auto" href={APPLICATION_URLS.HOME.url}>
                                <img
                                    src={isLightThemeMode(router.pathname) ? "/images/white-logo.png" : "/images/white-logo.png"}
                                    width={"60"}
                                    height={"60"}
                                    alt="Startupz World"
                                />
                            </Link>
                            <ul className="navbar-nav">
                                {menuData.map((menu, menuIndex) => (
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isLightThemeMode(router.pathname) ? "" : "text-white"}`} href={menu.url}>
                                            {menu.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="header-customize justify-content-end align-items-center d-none d-xl-flex">
                                <div className="header-customize-item">
                                    <Link
                                        href={startup && startup.token ? APPLICATION_URLS.STARTUP_DASHBOARD.url : APPLICATION_URLS.STARTUP_LOGIN.url}
                                        className={`nav-link ${isLightThemeMode(router.pathname) ? "" : "text-white"}`}
                                    >
                                        <span className="fas fa-user-circle pr-2"></span>
                                        {startup && startup.token ? "Dashboard" : "Log In"}
                                    </Link>
                                </div>
                                {startup && !startup.token && (
                                    <div className="header-customize-item button">
                                        <Link href={APPLICATION_URLS.STARTUP_REGISTER.url} className="btn btn-primary btn-icon-right">
                                            Add Listing
                                            <i className="far fa-angle-right"></i>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
