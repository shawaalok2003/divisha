import Link from "next/link";
import Swal from "sweetalert2";

import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import Picture from "../../../components/Picture";
import SideModal from "../../../components/SideModal";

import { ASSETS } from "../../../constants/assets";
import { APPLICATION_URLS } from "../../../constants";

import useInvestor from "../../../hooks/useInvestor";
import INVESTOR_STARTUP_PORTFOLIO_API from "../../../api/investor/startup-portfolio";

const InvestorStartupDetail = (props) => {
    const { data } = props;
    const { investorData } = useInvestor();

    const handleStartupDelete = () => {
        Swal.fire({
            title: `Are you sure you want to remove "${data?.name}" from your startup portfolio ?`,
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                INVESTOR_STARTUP_PORTFOLIO_API.removeStartup({
                    token: investorData.token,
                    investorStartupId: data.investorStartupId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            Swal.fire("Startup Deleted", "", "success");

                            props?.onDelete();
                        }
                    })
                    .catch((error) => {
                        consoleLogger("INVESTOR OFFICE DELETE ERROR: ", error);
                    })
                    .finally(() => {});
            } else {
                Swal.close();
            }
        });
    };

    return (
        <SideModal title={"#" + data?.investorStartupId} {...props}>
            <div className="d-flex flex-column justify-content-between">
                <div className="card border-0">
                    <div className="text-center px-10 border-bottom">
                        <img className="card-img-top w-75" src={ASSETS.bgBuilding} alt="Card image cap" />
                    </div>

                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="card-title text-dark font-weight-medium text-uppercase">{data?.type}</span>
                            <Badge type="pill" text={data?.activity} color={"green"} className="text-uppercase" />
                        </div>

                        <div className="text-center py-5">
                            <Picture src={data?.logo || ASSETS.noImage} type="thumbnail" className="w-35" />
                        </div>

                        <h6 className="text-secondary text-center py-3 m-0">
                            {data?.startupId ? (
                                <Link
                                    className="text-secondary"
                                    href={APPLICATION_URLS.INVESTOR_STARTUP_PORTFOLIO.url + `/${data?.startupId}`}
                                    target="_blank"
                                    title={data?.name}
                                >
                                    {data?.name} <i className="far fa-external-link font-size-sm text-secondary ml-2"></i>
                                </Link>
                            ) : (
                                data?.name
                            )}
                        </h6>
                        <p className="card-text m-0">
                            <span className="text-dark font-weight-medium">Year Invested: </span>
                            {data?.year}
                        </p>
                        <p className="card-text m-0 text-dark">
                            <span className="text-dark font-weight-medium">Amount Invested: </span>
                            {data?.amountInvested}
                        </p>

                        <div className="d-flex justify-content-between mt-10">
                            <Button text="Edit" color="warning" size="sm" icon={<i className="far fa-edit text-dark mr-1"></i>} disabled />
                            <Button
                                text="Delete"
                                color="danger"
                                size="sm"
                                icon={<i className="far fa-trash-alt mr-1"></i>}
                                onClick={handleStartupDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SideModal>
    );
};

export default InvestorStartupDetail;
