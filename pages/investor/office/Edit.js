import { useEffect, useState } from "react";

import CountryList from "../../../components/CountryList";
import StateList from "../../../components/StateList";
import CityList from "../../../components/CityList";
import Select from "../../../components/Select";
import SideModal from "../../../components/SideModal";
import TextArea from "../../../components/TextArea";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { COMMON_STATUS_TYPES, LOADER_TIMEOUTS, OFFICE_TYPES } from "../../../constants";
import { ASSETS } from "../../../constants/assets";
import { consoleLogger } from "../../../helpers";

import INVESTOR_OFFICE_API from "../../../api/investor/office";

import useInvestor from "../../../hooks/useInvestor";
import Loader from "../../../components/Loader";

const EditInvestorOffice = (props) => {
    const { data = {}, onClose, onSuccess } = props;
    const { investorData } = useInvestor();

    const [editOfficeData, setEditOfficeData] = useState(data);
    //const [fieldsOkay, setFeildsOkay] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setEditOfficeData(data);
    }, [data]);

    // useEffect(() => {
    //     let eligible = true;

    //     if (!editOfficeData.type) eligible = false;
    //     if (!editOfficeData.address) eligible = false;
    //     if (!editOfficeData.countryId) eligible = false;
    //     if (!editOfficeData.stateId) eligible = false;
    //     if (!editOfficeData.cityId) eligible = false;
    //     if (!editOfficeData.pincode) eligible = false;
    //     if (!editOfficeData.area) eligible = false;

    //     if (!eligible) {
    //         setFeildsOkay(false);
    //     } else setFeildsOkay(true);
    // }, [editOfficeData]);

    const editOffice = () => {
        setLoader(true);

        INVESTOR_OFFICE_API.editOffice({
            token: investorData.token,
            editOfficeData,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setTimeout(() => {
                        onSuccess();
                    }, LOADER_TIMEOUTS.fiveSec);
                }
            })
            .catch((error) => {
                consoleLogger("EDIT INVESTOR OFFICES ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.fiveSec);
            });
    };

    return (
        <SideModal title="Edit Office" {...props}>
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

            {editOfficeData && (
                <div className="card border-0">
                    <img className="card-img-top" src={ASSETS.bgMap} alt="Card image cap" />

                    <div className="card-body">
                        {!loader && (
                            <div class="form-row">
                                <div class="col-12 mb-2">
                                    <Select
                                        title="Office Type"
                                        options={OFFICE_TYPES || []}
                                        value={editOfficeData.type}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, type: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-sm-12 mb-2">
                                    <TextArea
                                        title="Address"
                                        placeholder="e.g.: Flat - 101, ABC Apartment, DEF Lane"
                                        value={editOfficeData.address}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, address: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <CountryList
                                        value={editOfficeData.countryId}
                                        onChange={(e) => {
                                            setEditOfficeData({ ...editOfficeData, countryId: e.target.value, stateId: 0, cityId: 0 });
                                        }}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <StateList
                                        countryId={editOfficeData.countryId}
                                        value={editOfficeData.stateId}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, stateId: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <CityList
                                        stateId={editOfficeData.stateId}
                                        value={editOfficeData.cityId}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, cityId: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        type="number"
                                        title="Pincode"
                                        placeholder="e.g.: 800003"
                                        value={editOfficeData.pincode}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, pincode: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Area"
                                        placeholder="e.g.: Sector-23"
                                        value={editOfficeData.area}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, area: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Landmark"
                                        placeholder="e.g.: Near SBI ATM"
                                        value={editOfficeData.landmark}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, landmark: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        type="number"
                                        title="Latitude"
                                        placeholder="e.g.: 1.1212"
                                        value={editOfficeData.latitude}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, latitude: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        type="number"
                                        title="Longitude"
                                        placeholder="e.g.: 2.1313"
                                        value={editOfficeData.longitude}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, longitude: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Select
                                        title="Status"
                                        options={COMMON_STATUS_TYPES || []}
                                        value={editOfficeData.status}
                                        onChange={(e) => setEditOfficeData({ ...editOfficeData, status: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {loader && (
                            <div className="py-5">
                                <Loader title="Updating Office ..." subtitle={`Please wait while we update your latest office details`} />
                            </div>
                        )}

                        {!loader && (
                            <div className="d-flex justify-content-between mt-10">
                                <Button text="Cancel" color="danger" size="sm" onClick={onClose} />
                                <Button text="Update" color="success" size="sm" onClick={editOffice} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </SideModal>
    );
};

export default EditInvestorOffice;
