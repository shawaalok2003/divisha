import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import STARTUP_OFFICE_API from "../../api/startup/office";

import StartupLayout from "../../components/layout/StartupLayout";
import Pagination from "../../components/Pagination";
import { getStartupSession } from "../../helpers/session";
import useStartup from "../../hooks/useStartup";
import Head from "next/head";
import Swal from "sweetalert2";
import COMMON_API from "../../api/common";
import { consoleLogger } from "../../helpers";

export default function StartupLocationInfo() {
    const countriesData = [
        {
            countryId: 1,
            name: "India",
            shortName: "IN",
            mobileCode: "91",
        },
    ];

    const statesData = [
        {
            stateId: 1,
            countryId: 1,
            name: "Bihar",
            shortName: "BR",
            mobileCode: "0612",
        },
    ];

    const citiesData = [
        {
            cityId: 1,
            stateId: 1,
            name: "Patna",
            shortName: "PNBE",
            mobileCode: "0612",
        },
    ];

    const [modalStatus, setModalStatus] = useState(false);

    const [officeTypesData, setOfficeTypesData] = useState([
        {
            value: "head",
            name: "Head Office",
        },
        {
            value: "branch",
            name: "Branch Office",
        },
    ]);
    const [countries, setCountries] = useState(countriesData || []);
    const [states, setStates] = useState(statesData || []);
    const [cities, setCities] = useState(citiesData || []);

    const [officeType, setOfficeType] = useState("head");
    const [officeAddress, setOfficeAddress] = useState("");
    const [officeCountry, setOfficeCountry] = useState("");
    const [officeState, setOfficeState] = useState("");
    const [officeCity, setOfficeCity] = useState("");
    const [officeArea, setOfficeArea] = useState("");
    const [officeLandmark, setOfficeLandmark] = useState("");
    const [officePincode, setOfficePincode] = useState("");
    const [officeLatitude, setOfficeLatitude] = useState("");
    const [officeLongitude, setOfficeLongitude] = useState("");

    const [offices, setOffices] = useState([]);
    const { startup } = useStartup();

    const [officesCount, setOfficesCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [reload, setReload] = useState(false);

    /* Reset Office State & Office City When Office Country Changes */
    useEffect(() => {
        setOfficeState("");
        setOfficeCity("");

        //setStates(states.filter((s) => s.countryId == officeCountry));
    }, [officeCountry]);

    /* Reset Office City When Office State Changes */
    useEffect(() => {
        setOfficeCity("");
    }, [officeState]);

    useEffect(() => {
        STARTUP_OFFICE_API.searchStartupOffices({ token: startup.token, page: pageNo, limit: pageSize, filters: { startupId: startup.startupId } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setOffices(startupResponse.data);
                    setOfficesCount(startupResponse.count);
                } else {
                    setOffices([]);
                    setOfficesCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setOffices([]);
                setOfficesCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    useEffect(() => {
        const headOfficeAdded = offices.find((office) => office.type === "head");

        if (headOfficeAdded) {
            setOfficeTypesData([
                {
                    value: "branch",
                    name: "Branch Office",
                },
            ]);

            setOfficeType("branch");
        }
    }, [offices]);

    const handleOfficeAdd = (e) => {
        e.preventDefault();

        STARTUP_OFFICE_API.addOffice({
            token: startup.token,
            ...{
                type: officeType,
                address: officeAddress,
                area: officeArea,
                landmark: officeLandmark,
                countryId: officeCountry,
                stateId: officeState,
                cityId: officeCity,
                pincode: officePincode,
                longitude: officeLongitude,
                latitude: officeLatitude,
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setOfficeAddress("");
                    setOfficeCountry("");
                    setOfficeState("");
                    setOfficeCity("");
                    setOfficeArea("");
                    setOfficeLandmark("");
                    setOfficePincode("");
                    setOfficeLatitude("");
                    setOfficeLongitude("");

                    setModalStatus(false);
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                //
            })
            .finally(() => {
                setModalStatus(false);
            });
    };

    const handleOfficeDelete = (e, startupOfficeId) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this office?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_OFFICE_API.removeOffice({
                    token: startup.token,
                    startupOfficeId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            Swal.fire("Office Deleted", "", "success");

                            setReload(!reload);
                        } else {
                            //
                        }
                    })
                    .catch((error) => {
                        consoleLogger("STARTUPS ERROR: ", error);
                        //
                    })
                    .finally(() => {});
            } else {
                Swal.close();
            }
        });
    };

    useEffect(() => {
        COMMON_API.searchCountries({ page: 0, limit: 10000, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCountries(startupResponse.data);
                } else {
                    setCountries([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCountries([]);
            })
            .finally(() => {});
    }, []);

    useEffect(() => {
        COMMON_API.searchStates({ page: 0, limit: 10000, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStates(startupResponse.data);
                } else {
                    setStates([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setStates([]);
            })
            .finally(() => {});
    }, []);

    useEffect(() => {
        COMMON_API.searchCities({ page: 0, limit: 10000, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCities(startupResponse.data);
                } else {
                    setCities([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCities([]);
            })
            .finally(() => {});
    }, []);

    return (
        <StartupLayout>
            <Head>
                <title>Location Info | Startup</title>
                <meta property="og:title" content="Location Info | Startup" key="location-info-startup" />
            </Head>

            <div className="row mb-5">
                <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(!modalStatus)}>
                        <i className="fas fa-plus mr-2"></i>Add Address
                    </button>
                </div>
                <div className="col-lg-12"></div>
            </div>

            <div className="row">
                {offices.length === 0 && (
                    <div className="col-sm-12">
                        <div className="bg-white pt-10 pb-10">
                            <h6 className="text-danger text-center"> No Offices Found</h6>
                        </div>
                    </div>
                )}

                {offices.length > 0 &&
                    offices.map((office, officeIndex) => (
                        <div className="col-lg-4" key={`ofc-list-${officeIndex}`}>
                            <div className="card px-0 widget border-0 rounded-0 mb-6 bg-white p-3">
                                <div className="card-title d-flex justify-content-between align-items-center mb-0 font-size-md font-weight-semibold text-dark text-uppercase border-bottom pb-2 lh-1">
                                    <div>
                                        <span className="text-secondary">
                                            <i className="fas fa-building text-dark"></i>
                                        </span>
                                        <span className="text-dark"> {office.type.toUpperCase() || "NA"}</span>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-sm py-0 mt-0 mb-0"
                                            title="Delete Office"
                                            onClick={(e) => handleOfficeDelete(e, office.startupOfficeId)}
                                        >
                                            <span className="text-white">
                                                <i className="fas fa-trash-alt"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body px-0 pt-3 pb-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <span className="item-icon mr-3">
                                                <i className="fal fa-map text-dark"></i>
                                            </span>
                                            <span className="text-dark">{office.address || "NA"}</span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <span className="item-icon mr-3">
                                                <i className="fal fa-box text-dark"></i>
                                            </span>
                                            <span className="text-dark">Area: {office.area || "NA"}</span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <span className="item-icon mr-3">
                                                <i className="fal fa-landmark text-dark"></i>
                                            </span>
                                            <span className="text-dark">Landmark: {office.landmark || "NA"}</span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0">
                                            <span className="item-icon mr-3">
                                                <i className="fal fa-globe text-dark"></i>
                                            </span>
                                            <span className="text-dark">
                                                {office?.country?.name || "NA"}, {office?.state?.name || "NA"}, {office?.city?.name || "NA"} -{" "}
                                                {office.pincode || "NA"}
                                            </span>
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex text-dark px-0 pb-2 pt-5">
                                            <div className="social-icon origin-color si-square">
                                                <ul className="list-inline text-center">
                                                    <li className="list-inline-item si-facebook">
                                                        <a
                                                            target="_blank"
                                                            title="Map"
                                                            href={`https://www.google.com/maps?q=${office.latitude || "0.0"},${
                                                                office.longitude || "0.0"
                                                            }`}
                                                        >
                                                            <i className="fal fa-map-marker-alt"></i>
                                                            <span>Map</span>
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item si-facebook">
                                                        {office.latitude}, {office.longitude}
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Pagination count={officesCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Address Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    <div className="contact-form">
                        <form>
                            <div className="form-group mb-4">
                                <label htmlFor="office-type" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                    Office / Location Type<span className="text-danger">*</span>
                                </label>
                                <select
                                    id="office-type"
                                    className="form-control color-gray"
                                    value={officeType}
                                    onChange={(e) => setOfficeType(e.target.value)}
                                >
                                    {officeTypesData &&
                                        officeTypesData.map((ot, oti) => (
                                            <option key={`ot-opt-${oti}`} value={ot.value}>
                                                {ot.name || ""}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <div className="mb-2 d-flex align-items-center lh-15">
                                    <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="address">
                                        Address<span className="text-danger">*</span>
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    className="form-control"
                                    placeholder="Full Address"
                                    value={officeAddress}
                                    onChange={(e) => setOfficeAddress(e.target.value)}
                                />
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-sm-6">
                                    <label htmlFor="country-list" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        Country<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="country-list"
                                        className="form-control color-gray"
                                        value={officeCountry}
                                        onChange={(e) => setOfficeCountry(e.target.value)}
                                    >
                                        <option value="">Select Country</option>
                                        {countries &&
                                            countries.map((country, countryIndex) => (
                                                <option key={`stw-country-${countryIndex}`} value={country.countryId}>
                                                    {country.name || ""}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="state-list" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        State<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="state-list"
                                        className="form-control color-gray"
                                        value={officeState}
                                        onChange={(e) => setOfficeState(e.target.value)}
                                    >
                                        <option value="">Select State</option>
                                        {states &&
                                            states
                                                .filter(officeCountry.length ? (s) => s.countryId == officeCountry : (s) => s)
                                                .map((state, stateIndex) => (
                                                    <option key={`stw-state-${stateIndex}`} value={state.stateId}>
                                                        {state.name || ""}
                                                    </option>
                                                ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-sm-6">
                                    <label htmlFor="city-list" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                        City<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="city-list"
                                        className="form-control color-gray"
                                        value={officeCity}
                                        onChange={(e) => setOfficeCity(e.target.value)}
                                    >
                                        <option value="">Select City</option>
                                        {cities &&
                                            cities
                                                .filter(officeState.length ? (ct) => ct.stateId == officeState : (ct) => ct)
                                                .map((city, cityIndex) => (
                                                    <option key={`stw-city-${cityIndex}`} value={city.cityId}>
                                                        {city.name || ""}
                                                    </option>
                                                ))}
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="pincode">
                                            Pincode<span className="text-danger">*</span>
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        id="pincode"
                                        className="form-control"
                                        placeholder="e.g: 800003"
                                        value={officePincode}
                                        onChange={(e) => setOfficePincode(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-sm-12">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="area">
                                            Area
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="area"
                                        className="form-control"
                                        placeholder="Area"
                                        value={officeArea}
                                        onChange={(e) => setOfficeArea(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <div className="mb-2 d-flex align-items-center lh-15">
                                    <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="landmark">
                                        Landmark
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    id="landmark"
                                    className="form-control"
                                    placeholder="Full Landmark"
                                    value={officeLandmark}
                                    onChange={(e) => setOfficeLandmark(e.target.value)}
                                />
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-sm-6">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="latitude">
                                            Latitude
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="latitude"
                                        className="form-control"
                                        placeholder="Latitude"
                                        value={officeLatitude}
                                        onChange={(e) => setOfficeLatitude(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="longitude">
                                            Longitude
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="longitude"
                                        className="form-control"
                                        placeholder="Longitude"
                                        value={officeLongitude}
                                        onChange={(e) => setOfficeLongitude(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-10">
                        <div className="col-lg-6">
                            <button className="btn btn-primary" onClick={() => setModalStatus(false)}>
                                Cancel
                            </button>
                        </div>
                        <div className="col-lg-6 text-right">
                            {officeType && officeAddress && officeCountry && officeState && officeCity && officePincode && (
                                <button className="btn btn-secondary" onClick={handleOfficeAdd}>
                                    Add Address
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>

            {/* Edit Address Popup */}

            {/* Delete Address Popup */}
        </StartupLayout>
    );
}
