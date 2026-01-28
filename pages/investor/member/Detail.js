import Swal from "sweetalert2";

import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import Picture from "../../../components/Picture";
import SideModal from "../../../components/SideModal";

import { ASSETS } from "../../../constants/assets";

import INVESTOR_MEMBER_API from "../../../api/investor/member";

import useInvestor from "../../../hooks/useInvestor";
import { consoleLogger } from "../../../helpers";

const InvestorMemberDetail = (props) => {
    const { data } = props;
    const { investorData } = useInvestor();

    const handleMemberDelete = () => {
        Swal.fire({
            title: `Are you sure you want to delete "${data?.type}" member ?`,
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                INVESTOR_MEMBER_API.removeMember({
                    token: investorData.token,
                    investorMemberId: data.investorMemberId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            Swal.fire("Member Deleted", "", "success");

                            props?.onDelete();
                        }
                    })
                    .catch((error) => {
                        consoleLogger("INVESTOR MEMBER DELETE ERROR: ", error);
                    })
                    .finally(() => {});
            } else {
                Swal.close();
            }
        });
    };

    return (
        <SideModal title={"#" + data?.investorMemberId} {...props}>
            <div className="d-flex flex-column justify-content-between">
                <div className="card border-0">
                    <img className="card-img-top" src={ASSETS.bgTeamInfo} alt="Card image cap" />

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

                        <div className="text-center py-5">
                            <Picture src={data?.photo || ASSETS.noImage} type="thumbnail" className="w-50" />
                        </div>

                        <p className="card-text m-0">
                            {data?.firstName} {data?.lastName}
                        </p>
                        <p className="card-text m-0">{data?.designation}</p>
                        <p className="card-text m-0">{data?.qualification}</p>
                        <p className="card-text m-0">{data?.email}</p>
                        <p className="card-text m-0">{data?.mobile}</p>
                        <p className="card-text mt-2 font-size-sm pt-2 border-top">
                            <h6 className="text-dark font-size-sm">About</h6>
                            {data?.about}
                        </p>

                        <ul class="list-inline">
                            <li class="list-inline-item">
                                <a target="_blank" title="Linkedin" href={data?.linkedin}>
                                    <i class="fab fa-linkedin bg-gray p-2 rounded-circle"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a target="_blank" title="Facebook" href={data?.facebook}>
                                    <i class="fab fa-facebook bg-gray p-2 rounded-circle"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a target="_blank" title="Instagram" href={data?.instagram}>
                                    <i class="fab fa-instagram bg-gray p-2 rounded-circle"></i>
                                </a>
                            </li>
                        </ul>

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
                                onClick={handleMemberDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SideModal>
    );
};

export default InvestorMemberDetail;
