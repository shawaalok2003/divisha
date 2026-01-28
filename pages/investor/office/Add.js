import { useEffect, useState } from "react";

import CountryList from "../../../components/CountryList";
import StateList from "../../../components/StateList";
import CityList from "../../../components/CityList";
import Select from "../../../components/Select";
import SideModal from "../../../components/SideModal";
import TextArea from "../../../components/TextArea";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { LOADER_TIMEOUTS, OFFICE_TYPES } from "../../../constants";
import { ASSETS } from "../../../constants/assets";
import { consoleLogger } from "../../../helpers";

import INVESTOR_OFFICE_API from "../../../api/investor/office";

import useInvestor from "../../../hooks/useInvestor";
import Loader from "../../../components/Loader";

const AddInvestorOffice = (props) => {
    const { onClose, onSuccess } = props;
    const { investorData } = useInvestor();

    const defaultNewOffice = {
        type: "head",
        address: "",
        countryId: 1,
        stateId: 1,
        cityId: 1,
        pincode: "",
        area: "",
        landmark: "",
        latitude: "",
        longitude: "",
    };

    const [newOffice, setNewOffice] = useState(defaultNewOffice);
    const [fieldsOkay, setFeildsOkay] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        let eligible = true;

        if (!newOffice.type) eligible = false;
        if (!newOffice.address) eligible = false;
        if (!newOffice.countryId) eligible = false;
        if (!newOffice.stateId) eligible = false;
        if (!newOffice.cityId) eligible = false;
        if (!newOffice.pincode) eligible = false;
        if (!newOffice.area) eligible = false;

        if (!eligible) {
            setFeildsOkay(false);
        } else setFeildsOkay(true);
    }, [newOffice]);

    const addNewOffice = () => {
        setLoader(true);

        INVESTOR_OFFICE_API.addOffice({
            token: investorData.token,
            newOffice,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setTimeout(() => {
                        setNewOffice(defaultNewOffice);
                        onSuccess();
                    }, LOADER_TIMEOUTS.fiveSec);
                }
            })
            .catch((error) => {
                consoleLogger("ADD INVESTOR OFFICES ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.fiveSec);
            });
    };

    return (
        <SideModal title="Add Office" {...props}>
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
                    {!loader && (
                        <div class="form-row">
                            <div class="col-12 mb-2">
                                <Select
                                    title="Office Type"
                                    options={OFFICE_TYPES || []}
                                    value={newOffice.type}
                                    onChange={(e) => setNewOffice({ ...newOffice, type: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-sm-12 mb-2">
                                <TextArea
                                    title="Address"
                                    placeholder="e.g.: Flat - 101, ABC Apartment, DEF Lane"
                                    value={newOffice.address}
                                    onChange={(e) => setNewOffice({ ...newOffice, address: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <CountryList
                                    value={newOffice.countryId}
                                    onChange={(e) => {
                                        setNewOffice({ ...newOffice, countryId: e.target.value, stateId: 0, cityId: 0 });
                                    }}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <StateList
                                    countryId={newOffice.countryId}
                                    value={newOffice.stateId}
                                    onChange={(e) => setNewOffice({ ...newOffice, stateId: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <CityList
                                    stateId={newOffice.stateId}
                                    value={newOffice.cityId}
                                    onChange={(e) => setNewOffice({ ...newOffice, cityId: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    type="number"
                                    title="Pincode"
                                    placeholder="e.g.: 800003"
                                    value={newOffice.pincode}
                                    onChange={(e) => setNewOffice({ ...newOffice, pincode: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Area"
                                    placeholder="e.g.: Sector-23"
                                    value={newOffice.area}
                                    onChange={(e) => setNewOffice({ ...newOffice, area: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Landmark"
                                    placeholder="e.g.: Near SBI ATM"
                                    value={newOffice.landmark}
                                    onChange={(e) => setNewOffice({ ...newOffice, landmark: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    type="number"
                                    title="Latitude"
                                    placeholder="e.g.: 1.1212"
                                    value={newOffice.latitude}
                                    onChange={(e) => setNewOffice({ ...newOffice, latitude: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    type="number"
                                    title="Longitude"
                                    placeholder="e.g.: 2.1313"
                                    value={newOffice.longitude}
                                    onChange={(e) => setNewOffice({ ...newOffice, longitude: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {loader && (
                        <div className="py-5">
                            <Loader title="Adding New Office ..." subtitle={`Please wait while we add your ${newOffice?.type} office`} />
                        </div>
                    )}

                    {!loader && (
                        <div className="d-flex justify-content-between mt-10">
                            <Button text="Cancel" color="danger" size="sm" onClick={onClose} />
                            <Button text="Add Office" color="success" size="sm" onClick={addNewOffice} disabled={!fieldsOkay} />
                        </div>
                    )}
                </div>
            </div>
        </SideModal>
    );
};

export default AddInvestorOffice;
