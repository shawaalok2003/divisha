import useInvestor from "../../hooks/useInvestor";
import useSuper from "../../hooks/useSuper";

const PageHeader = ({ title = "", subtitle = "" }) => {
    const { superData, clearSuperDetails, toggleSidebar } = useSuper();
    const { investorData, clearInvestorDetails, toggleSidebar: toggleInvestorSidebar } = useInvestor();

    const handleLogout = () => {
        if (investorData?.token) clearInvestorDetails();
        else if (superData?.token) clearSuperDetails();
    };

    const handleToggle = () => {
        if (investorData?.token) toggleInvestorSidebar(false);
        else if (superData?.token) toggleSidebar(false);
    };

    return (
        <div className="d-flex align-items-center justify-content-between bg-white border-bottom px-5 py-4 shadow-sm">
            <div className="d-flex">
                <div className="page-header-menu pr-2 mr-2 cursor-pointer" onClick={handleToggle}>
                    <span className="d-inline-block">
                        <i className="far fa-bars text-dark"></i>
                    </span>
                </div>
                <div>
                    <h5 className="text-dark m-0 p-0">
                        {title || ""}
                        <small className="text-gray"> {subtitle ? " - " + subtitle : ""}</small>
                    </h5>
                </div>
            </div>
            <button className="p-0 m-0 font-weight-medium bg-gray-03 px-3 border text-dark" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default PageHeader;
