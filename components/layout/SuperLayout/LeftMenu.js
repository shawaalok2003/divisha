import Link from "next/link";
import { useRouter } from "next/router";
import { APPLICATION_URLS } from "../../../constants";
import useSuper from "../../../hooks/useSuper";
import { getYear } from "../../../helpers/date";
import { ASSETS } from "../../../constants/assets";

export default function LeftMenu({ menuToggle, setMenuToggle }) {
    const router = useRouter();
    const { clearSuperDetails } = useSuper();

    const normal = `d-flex align-items-center font-size-md px-3 py-2`;
    const active = `active text-primary font-weight-medium`;

    const menuData = [
        {
            url: APPLICATION_URLS.SUPER_DASHBOARD.url,
            name: "Dashboard",
            icon: "far fa-desktop",
            activeClass: router.pathname === APPLICATION_URLS.SUPER_DASHBOARD.url ? active : "",
        },
        {
            url: APPLICATION_URLS.SUPER_INVESTORS.url,
            name: "Investors",
            icon: "far fa-briefcase",
            activeClass: router.pathname.includes(APPLICATION_URLS.SUPER_INVESTORS.url) ? active : "",
        },
        {
            url: APPLICATION_URLS.SUPER_LOGIN.url,
            name: "Logout",
            icon: "far fa-power-off",
            activeClass: router.pathname === APPLICATION_URLS.SUPER_LOGIN.url ? active : "",
            onClick: () => clearSuperDetails(),
        },
    ];

    const deployedYear = 2023;
    const currentYear = getYear();

    const footerYear = deployedYear === currentYear ? `${currentYear}` : `${deployedYear} - ${currentYear}`;

    return (
        <>
            <div
                className={`sidebar sidebar-sticky sidebar-dark shadow-sm pt-0 vh-100 ${menuToggle ? "show" : ""}`}
                style={{ zIndex: 0, marginTop: "2px" }}
            >
                <div className="container px-0">
                    <div className="d-flex flex-column justify-content-between min-vh-96">
                        <div>
                            <div className="text-center py-3">
                                <img src={ASSETS.logo} className="w-30" />
                            </div>
                            <ul className="list-group list-group-flush list-group-borderless">
                                {menuData &&
                                    menuData.map((menu, menuIndex) => (
                                        <li className="list-group-item p-0 lh-15" key={`menu-${menuIndex}`}>
                                            <Link href={menu.url} className={`${normal} ${menu.activeClass}`} onClick={menu?.onClick || (() => {})}>
                                                <span className="d-inline-block mr-3">
                                                    <i className={`${menu.icon}`}></i>
                                                </span>
                                                <span>{menu.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="copyright-area text-center">
                            <span className="text-uppercase text-gray">Version: 2.0.0</span>
                            <span>&copy; {footerYear} Sartupzworld</span>
                        </div>
                    </div>
                </div>
            </div>
            {menuToggle && <div className="sidebar-overwrapper" onClick={() => setMenuToggle(!menuToggle)}></div>}
        </>
    );
}
