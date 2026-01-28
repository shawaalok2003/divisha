import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import Picture from "../../../components/Picture";
import SideModal from "../../../components/SideModal";

import { ASSETS } from "../../../constants/assets";

import SUPER_AUTH_API from "../../../api/super/authentication";
import useSuper from "../../../hooks/useSuper";
import useInvestor from "../../../hooks/useInvestor";
import { APPLICATION_URLS, INVESTOR_TYPES, LOADER_TIMEOUTS } from "../../../constants";
import { useState } from "react";
import Loader from "../../../components/Loader";
import SUPER_INVESTORS_API from "../../../api/super/investors";
import { consoleLogger } from "../../../helpers";

const InvestorDetail = (props) => {
    const { data } = props;

    const { superData } = useSuper();
    const { setInvestorDetails, clearInvestorDetails } = useInvestor();
    const [investorLoginLoader, setInvestorLoginLoader] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleInvestorLogin = () => {
        setInvestorLoginLoader(true);

        SUPER_AUTH_API.loginAsInvestor({ token: superData.token, username: data.username })
            .then((results) => {
                const superResponse = results.data;

                if (superResponse.status === "success") {
                    superResponse.data.isSuper = true;

                    setInvestorDetails(superResponse.data);
                    setTimeout(() => {
                        const investorWindow = window.open(
                            APPLICATION_URLS.INVESTOR_DASHBOARD.url,
                            "Data",
                            "height=500,width=1000,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no"
                        );

                        setInvestorLoginLoader(false);

                        var timer = setInterval(function () {
                            if (investorWindow.closed) {
                                clearInterval(timer);
                                clearInvestorDetails(true);
                            }
                        }, LOADER_TIMEOUTS.oneSec);
                    }, LOADER_TIMEOUTS.twoSec);
                }
            })
            .catch((error) => {
                setInvestorLoginLoader(false);
                consoleLogger("SUPER INVESTOR LOGIN ERROR: ", error);
            })
            .finally(() => {});
    };

    const handleInvestorUpdate = async (details) => {
        try {
            setLoader(true);

            const { data: updateData } = await SUPER_INVESTORS_API.updateInvestor({
                token: superData.token,
                investorDetails: { investorId: data?.investorId, ...details },
            });

            if (updateData.status === "success") {
                //success
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.twoSec);

                if (details?.status) data.status = details.status;
            } else {
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
            consoleLogger("SUPER INVESTOR UPDATE ERROR: ", error);
        }
    };

    return (
        <SideModal title={"#" + data?.investorId} {...props}>
            <div className="d-flex flex-column justify-content-between">
                <div className="card border-0">
                    <img className="card-img-top" src={ASSETS.bgTeamInfo} alt="Card image cap" />

                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <Badge
                                type="pill"
                                text={INVESTOR_TYPES.find((it) => it.value === data?.type)?.name}
                                color={"secondary"}
                                className="text-uppercase"
                            />
                            <Badge
                                type="pill"
                                text={data?.status}
                                color={data?.status === "active" ? "green" : "primary"}
                                className="text-uppercase"
                            />
                        </div>

                        <div className="text-center py-5">
                            <Picture src={data?.photo || ASSETS.noImage} type="thumbnail" className="w-50" />
                        </div>
                        <h6 className="text-dark text-center my-2">
                            {data?.firstName} {data?.lastName}
                        </h6>
                        <p className="m-0">
                            <span className="text-dark font-weight-medium">Username: </span>
                            {data?.username}
                        </p>
                        <p className="m-0">
                            <span className="text-dark font-weight-medium">Email: </span>
                            {data?.email}
                        </p>
                        <p className="m-0">
                            <span className="text-dark font-weight-medium">Mobile: </span>
                            {data?.mobile}
                        </p>
                        <p className="m-0">
                            <span className="text-dark font-weight-medium">Founded In: </span>
                            {data?.foundedIn}
                        </p>
                        <p className="m-0">
                            <span className="text-dark font-weight-medium">Website: </span>
                            {data?.website}
                        </p>
                        <p className="mt-2 font-size-sm pt-2 border-top">
                            <h6 className="text-dark font-size-sm">About</h6>
                            {data?.about}
                        </p>

                        {investorLoginLoader && (
                            <div className="text-center my-5">
                                <Loader subtitle="Please wait while we log you in as investor" mini />
                            </div>
                        )}

                        {loader && (
                            <div className="text-center my-5">
                                <Loader subtitle="Please wait while we update investor" mini />
                            </div>
                        )}

                        <div className="d-flex justify-content-between mt-10 mb-5">
                            <Button
                                text="Login As Investor"
                                color="warning"
                                size="sm"
                                icon={<i className="far fa-key text-dark mr-1"></i>}
                                onClick={handleInvestorLogin}
                                disabled={investorLoginLoader}
                            />
                            <Button
                                text={data?.status === "active" ? "Deactivate" : "Activate"}
                                color={data?.status === "active" ? "danger" : "success"}
                                size="sm"
                                icon={<i className="far fa-check-circle mr-1"></i>}
                                onClick={() => handleInvestorUpdate({ status: data?.status === "active" ? "inactive" : "active" })}
                                disabled={loader}
                            />
                        </div>

                        {/* <div className="d-flex justify-content-between mt-10">
                            <Button text="Edit" color="warning" size="sm" icon={<i className="far fa-edit text-dark mr-1"></i>} disabled />
                            <Button text="Delete" color="primary" size="sm" icon={<i className="far fa-trash-alt mr-1"></i>} disabled />
                        </div> */}
                    </div>
                </div>
            </div>
        </SideModal>
    );
};

export default InvestorDetail;
