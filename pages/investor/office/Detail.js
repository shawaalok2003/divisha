import Swal from "sweetalert2";

import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import SideModal from "../../../components/SideModal";
import { ASSETS } from "../../../constants/assets";

import INVESTOR_OFFICE_API from "../../../api/investor/office";

import useInvestor from "../../../hooks/useInvestor";
import { consoleLogger } from "../../../helpers";

const InvestorOfficeDetail = (props) => {
    const { data } = props;
    const { investorData } = useInvestor();

    const handleOfficeDelete = () => {
        Swal.fire({
            title: `Are you sure you want to delete "${data?.type}" office ?`,
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                INVESTOR_OFFICE_API.removeOffice({
                    token: investorData.token,
                    investorOfficeId: data.investorOfficeId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            Swal.fire("Office Deleted", "", "success");

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
        <SideModal title={"#" + data?.investorOfficeId} {...props}>
            <div className="d-flex flex-column justify-content-between">
                {/* <div className="w-100">
                    <iframe
                        className="w-100"
                        src="https://www.google.com/maps/embed"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div> */}

                <div className="card border-0">
                    <img className="card-img-top" src={ASSETS.bgMap} alt="Card image cap" />

                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="card-title text-dark font-weight-medium text-uppercase">{data?.type}</span>
                            <Badge
                                type="pill"
                                text={data?.status}
                                color={data?.status === "active" ? "green" : "primary"}
                                className="text-uppercase"
                            />
                        </div>
                        <p className="card-text m-0">{data?.address}</p>
                        <p className="card-text m-0">{data?.area}</p>
                        <p className="card-text m-0">{data?.landmark}</p>
                        <p className="card-text m-0">
                            {data?.city?.name || data?.cityId}, {data?.state?.name || data?.stateId}
                        </p>
                        <p className="card-text m-0">
                            {data?.country?.name || data?.countryId} - {data?.pincode}
                        </p>

                        <div className="d-flex justify-content-between mt-10">
                            <Button
                                text="Edit"
                                color="warning"
                                size="sm"
                                icon={<i className="far fa-edit text-dark mr-1"></i>}
                                onClick={() => props?.onClose({ edit: true })}
                            />
                            <Button
                                text="Delete"
                                color="primary"
                                size="sm"
                                icon={<i className="far fa-trash-alt mr-1"></i>}
                                onClick={handleOfficeDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SideModal>
    );
};

export default InvestorOfficeDetail;
