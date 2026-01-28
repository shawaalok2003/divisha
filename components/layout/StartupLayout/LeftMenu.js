import Link from "next/link";
import { useRouter } from "next/router";
import { APPLICATION_URLS } from "../../../constants";

export default function LeftMenu({ menuToggle, setMenuToggle }) {
    const router = useRouter();

    const normal = `d-flex align-items-center link-hover-dark-primary font-size-md px-3 py-2`;
    const active = `bg-gray-02 text-primary`;

    const activeClasses = {
        [APPLICATION_URLS.STARTUP_DASHBOARD.url]: router.pathname === APPLICATION_URLS.STARTUP_DASHBOARD.url ? active : "",
        [APPLICATION_URLS.STARTUP_LOGIN.url]: router.pathname === APPLICATION_URLS.STARTUP_LOGIN.url ? active : "",
    };

    const menuData = [
        {
            url: APPLICATION_URLS.STARTUP_DASHBOARD.url,
            name: "Dashboard",
            icon: "fal fa-desktop",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_DASHBOARD.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_BUSINESS_INFO.url,
            name: "Business Info",
            icon: "fal fa-briefcase",
            activeClass: router.pathname.includes(APPLICATION_URLS.STARTUP_BUSINESS_INFO.url) ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_LOCATION_INFO.url,
            name: "Location Info",
            icon: "fal fa-location",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_LOCATION_INFO.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_DOCUMENTS.url,
            name: "Documents",
            icon: "fal fa-folder-open",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_DOCUMENTS.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_SOCIAL.url,
            name: "Social / Contact",
            icon: "fal fa-phone",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_SOCIAL.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_GALLERY.url,
            name: "Gallery",
            icon: "fal fa-camera",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_GALLERY.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_BANNER.url,
            name: "Banner",
            icon: "fal fa-images",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_BANNER.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_MEDIA.url,
            name: "Media Publications",
            icon: "fal fa-tv",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_MEDIA.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_FUNDING.url,
            name: "Funding Info",
            icon: "fal fa-money-bill",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_FUNDING.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_ACCOMPLISHMENTS.url,
            name: "Accomplishments",
            icon: "fal fa-trophy",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_ACCOMPLISHMENTS.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_TEAM.url,
            name: "Team",
            icon: "fal fa-users",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_TEAM.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_INCUBATION.url,
            name: "Incubation/ Acceleration",
            icon: "fal fa-trophy",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_INCUBATION.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_CLIENTS.url,
            name: "Clients",
            icon: "fal fa-users",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_CLIENTS.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_ENQUIRIES.url,
            name: "Enquiries",
            icon: "fal fa-file-invoice",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_ENQUIRIES.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_SUBSCRIPTION.url,
            name: "Subscription",
            icon: "fal fa-money-check-alt",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_SUBSCRIPTION.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_TRACTION.url,
            name: "Traction",
            icon: "fal fa-chart-bar",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_TRACTION.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_PROFILE.url,
            name: "My Profile",
            icon: "fal fa-user-circle",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_PROFILE.url ? active : "",
        },
        {
            url: APPLICATION_URLS.STARTUP_LOGIN.url,
            name: "Logout",
            icon: "fal fa-power-off",
            activeClass: router.pathname === APPLICATION_URLS.STARTUP_LOGIN.url ? active : "",
        },
    ];

    return (
        <>
            <div className={`sidebar sidebar-sticky shadow-sm pt-0 ${menuToggle ? "show" : ""}`} style={{ zIndex: 0, marginTop: "2px" }}>
                <div className="container px-0">
                    <ul className="list-group list-group-flush list-group-borderless">
                        {menuData &&
                            menuData.map((menu, menuIndex) => (
                                <li className="list-group-item p-0 lh-15" key={`menu-${menuIndex}`}>
                                    <Link href={menu.url} className={`${normal} ${menu.activeClass}`}>
                                        <span className="d-inline-block mr-3">
                                            <i className={`${menu.icon} text-dark`}></i>
                                        </span>
                                        <span className="text-dark link-hover-dark-primary">{menu.name}</span>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {menuToggle && <div className="sidebar-overwrapper" onClick={() => setMenuToggle(!menuToggle)}></div>}
        </>
    );
}
