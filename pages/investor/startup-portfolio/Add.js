import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Button from "../../../components/Button";
import Picture from "../../../components/Picture";
import SideModal from "../../../components/SideModal";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

import { ASSETS } from "../../../constants/assets";
import { LOADER_TIMEOUTS, STARTUP_INTERESTS } from "../../../constants";

import useInvestor from "../../../hooks/useInvestor";
import INVESTOR_STARTUP_PORTFOLIO_API from "../../../api/investor/startup-portfolio";
import SEARCH_API from "../../../api/search";
import Loader from "../../../components/Loader";
import { consoleLogger } from "../../../helpers";

const InvestorStartupAdd = (props) => {
    const { investorData } = useInvestor();

    const [searchTerm, setSearchTerm] = useState("");
    const [startups, setStartups] = useState([]);

    const [loader, setLoader] = useState(false);
    const [addStartup, setAddStartup] = useState({
        internal: true,
        external: false,
    });
    const [newExternalStartup, setNewExternalStartup] = useState({
        name: "",
        activity: "incubation",
        year: new Date().getFullYear(),
        amountInvested: "0",
    });

    const handleStartupSearch = async (term = null) => {
        try {
            setLoader(true);

            const { data: invstars } = await INVESTOR_STARTUP_PORTFOLIO_API.getStartups({
                token: investorData.token,
                page: 0,
                limit: 10000,
            });

            const { data: nameStartups = [] } = await SEARCH_API.findStartups({
                token: investorData.token,
                filters: { ...(searchTerm ? { name: term || searchTerm } : {}) },
            });

            if (nameStartups.status === "success") {
                nameStartups.data.forEach((ns, nsIndex) => {
                    nameStartups.data[nsIndex] = {
                        ...ns,
                        popdown: false,
                        activity: "incubation",
                        year: 2023,
                        amountInvested: "0",
                        alreadyAdded: invstars.data?.map((s) => s.startupId).includes(ns.startupId),
                    };
                });
                setStartups(nameStartups.data);
            }

            setTimeout(() => {
                setLoader(false);
            }, LOADER_TIMEOUTS.twoSec);
        } catch (error) {
            consoleLogger("STARTUPS SEARCH ERROR:", error);
            setStartups([]);
            setTimeout(() => {
                setLoader(false);
            }, LOADER_TIMEOUTS.twoSec);
        }
    };

    const handleAddStartup = async (st) => {
        Swal.fire({
            title: `Are you sure you want to add startup "${st?.name}" in your portfolio ?`,
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes!",
            cancelButtonText: "No!",
        }).then(async (result) => {
            if (result.isDenied) {
                const { activity, year, amountInvested } = st || {};

                const { data: startupAdded } = await INVESTOR_STARTUP_PORTFOLIO_API.addInternalStartup({
                    token: investorData.token,
                    startupId: st.startupId,
                    activity,
                    year,
                    amountInvested,
                });

                if (startupAdded.status === "success") {
                    Swal.fire("Startup Added In Portfolio", "", "success");
                    handleStartupSearch();
                    props?.onSuccess();
                }
            } else {
                Swal.close();
            }
        });
    };

    const handleAddExternalStartup = async () => {
        setLoader(true);

        const { data: startupAdded } = await INVESTOR_STARTUP_PORTFOLIO_API.addExternalStartup({
            token: investorData.token,
            newExternalStartup,
        });

        if (startupAdded.status === "success") {
            setTimeout(() => {
                setSearchTerm("");
                setAddStartup({ external: false, internal: true });

                Swal.fire("Startup Added In Portfolio", "", "success");

                setLoader(false);
                props?.onSuccess(true);
            }, LOADER_TIMEOUTS.twoSec);
        }
    };

    return (
        <SideModal title={"Add Startup"} {...props}>
            <div className="d-flex flex-column justify-content-between">
                <div className="card border-0">
                    <div className="text-center px-10 border-bottom">
                        <img className="card-img-top w-75" src={ASSETS.bgBuilding} alt="Card image cap" />
                    </div>

                    <div className="card-body">
                        {addStartup?.internal && (
                            <div>
                                <h5 className="text-secondary text-center mb-5"> Search your startup here</h5>
                                <div className="d-flex flex-column flex-sm-row">
                                    <Input
                                        placeholder={"e.g. Startupzworld"}
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            if (e.target.value?.length >= 3) handleStartupSearch(e.target.value);
                                        }}
                                    />

                                    <Button
                                        text="Clear"
                                        className="ml-sm-0 ml-md-1 mt-md-0 mt-1"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStartups([]);
                                        }}
                                        disabled={!searchTerm.length}
                                    />
                                </div>

                                {loader && (
                                    <div className="mt-5">
                                        <Loader title="Searching Startup..." subtitle="Please wait while we search for startups in our directory" />
                                    </div>
                                )}
                                {!loader && searchTerm?.length >= 3 && startups?.length === 0 && (
                                    <div className="border mt-5 p-5 text-center">
                                        <h6 className="text-secondary mb-5">Can not find your startup?</h6>

                                        <Button
                                            text="Add An External Startup"
                                            size="sm"
                                            onClick={() => setAddStartup({ internal: false, external: true })}
                                        />
                                    </div>
                                )}

                                <div className="startup-search-list mt-5">
                                    {!loader &&
                                        startups?.map((st, stIndex) => (
                                            <div key={`stp-srch-list-${stIndex}`} className="item mb-2">
                                                <div
                                                    className="info"
                                                    onClick={() => {
                                                        if (startups[stIndex].alreadyAdded) return;

                                                        const stps = [...startups];
                                                        stps[stIndex] = { ...stps[stIndex], popdown: !stps[stIndex].popdown };
                                                        setStartups(stps);
                                                    }}
                                                >
                                                    <Picture src={st?.logo || ASSETS.noImage} className="w-20" />
                                                    <div className="w-80 ml-3">
                                                        <h6 className="text-secondary m-0 p-0">{st.name}</h6>
                                                        <p className="text-secondary font-size-sm m-0 p-0">{st.legalName}</p>
                                                        {!st?.popdown && !st?.alreadyAdded && (
                                                            <div className="w-100 text-right" title="Click to select startup">
                                                                <i className="text-secondary font-size-sm">
                                                                    <small>
                                                                        <i className="far fa-info-circle text-secondary"></i> click to select startup
                                                                    </small>
                                                                </i>
                                                            </div>
                                                        )}
                                                        {st?.alreadyAdded && (
                                                            <div className="w-100 text-right" title="Startup Already In Portfolio">
                                                                <i className="text-secondary font-size-sm">
                                                                    <small>
                                                                        <i className="fas fa-check-circle text-success"></i> Startup already in
                                                                        portfolio
                                                                    </small>
                                                                </i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {st?.popdown && !st?.alreadyAdded && (
                                                    <div className="options p-2">
                                                        <div className="form-row">
                                                            <div className="col-sm-12">
                                                                <Select
                                                                    title="Activity"
                                                                    options={STARTUP_INTERESTS}
                                                                    value={st?.activity}
                                                                    onChange={(e) => {
                                                                        const stps = [...startups];
                                                                        stps[stIndex] = { ...stps[stIndex], activity: e.target.value };
                                                                        setStartups(stps);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-row">
                                                            <div className="col-sm-6">
                                                                <Input
                                                                    type="number"
                                                                    title="Year"
                                                                    max={new Date().getFullYear()}
                                                                    defaultValue={st?.year}
                                                                    onChange={(e) => {
                                                                        const stps = [...startups];
                                                                        stps[stIndex] = { ...stps[stIndex], year: e.target.value };
                                                                        setStartups(stps);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Input
                                                                    type="number"
                                                                    title="Amount Invested"
                                                                    min={1}
                                                                    value={st?.amountInvested}
                                                                    onChange={(e) => {
                                                                        const stps = [...startups];
                                                                        stps[stIndex] = { ...stps[stIndex], amountInvested: e.target.value };
                                                                        setStartups(stps);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-between mt-2">
                                                            <span
                                                                className="text-danger font-size-sm font-weight-medium cursor-pointer py-2  ml-2"
                                                                onClick={() => {
                                                                    const stps = [...startups];
                                                                    stps[stIndex] = { ...stps[stIndex], popdown: false };
                                                                    setStartups(stps);
                                                                }}
                                                            >
                                                                Cancel
                                                            </span>
                                                            <span
                                                                className="text-dark font-size-sm font-weight-bold cursor-pointer py-2 mr-2"
                                                                onClick={() => handleAddStartup(st)}
                                                            >
                                                                Add
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {addStartup.external && !loader && (
                            <div>
                                <div className="form-row">
                                    <div className="col-sm-12">
                                        <Input
                                            title="Startup Name"
                                            placeholder="e.g.: Startupzworld"
                                            value={newExternalStartup?.name}
                                            onChange={(e) => setNewExternalStartup({ ...newExternalStartup, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="col-sm-12">
                                        <Select
                                            title="Activity"
                                            options={STARTUP_INTERESTS}
                                            value={newExternalStartup?.activity}
                                            onChange={(e) => setNewExternalStartup({ ...newExternalStartup, activity: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <Input
                                            type="number"
                                            title="Year"
                                            max={new Date().getFullYear()}
                                            value={newExternalStartup?.year}
                                            onChange={(e) => setNewExternalStartup({ ...newExternalStartup, year: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Input
                                            type="number"
                                            title="Amount Invested"
                                            min={1}
                                            value={newExternalStartup?.amountInvested}
                                            onChange={(e) => setNewExternalStartup({ ...newExternalStartup, amountInvested: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-10">
                                    <Button
                                        text="Cancel"
                                        size="sm"
                                        color="danger"
                                        onClick={() => setAddStartup({ internal: true, external: false })}
                                    />
                                    <Button
                                        text="Add"
                                        size="sm"
                                        color="success"
                                        onClick={handleAddExternalStartup}
                                        disabled={
                                            !newExternalStartup.name ||
                                            !newExternalStartup.activity ||
                                            !newExternalStartup.year ||
                                            !newExternalStartup.amountInvested
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {addStartup.external && loader && (
                            <Loader title="Adding Startup..." subtitle="Please wait while we add this startup to your portfolio" />
                        )}
                    </div>
                </div>
            </div>
        </SideModal>
    );
};

export default InvestorStartupAdd;
