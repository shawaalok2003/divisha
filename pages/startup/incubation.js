import Head from "next/head";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";
import useStartup from "../../hooks/useStartup";
import STARTUP_INCUBATION_API from "../../api/startup/incubation";
import moment from "moment";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";

export default function StartupIncubation() {
    const { startup } = useStartup();

    const [modalStatus, setModalStatus] = useState(false);
    const [loader, setLoader] = useState(false);

    const [incubations, setIncubations] = useState([]);

    const [orgName, setOrgName] = useState("");
    const [incubationDate, setIncubationDate] = useState("");
    const [incubationPeriod, setIncubationPeriod] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [orgMobile, setOrgMobile] = useState("");
    const [orgEmail, setOrgEmail] = useState("");

    const [incubationsCount, setIncubationsCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [reload, setReload] = useState(false);

    const handleIncubationAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_INCUBATION_API.addIncubation({
            token: startup.token,
            ...{
                orgName,
                orgMobile,
                orgEmail,
                orgWebsite,
                incubationDate,
                incubationPeriod,
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
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
                setLoader(false);

                setOrgName("");
                setOrgMobile("");
                setOrgEmail("");
                setOrgWebsite("");

                setIncubationDate("");
                setIncubationPeriod("");
            });
    };

    useEffect(() => {
        STARTUP_INCUBATION_API.searchStartupIncubations({ token: startup.token, page: pageNo, sort: "desc", filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setIncubations(startupResponse.data);
                    setIncubationsCount(startupResponse.count);
                } else {
                    setIncubations([]);
                    setIncubationsCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setIncubations([]);
                setIncubationsCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    const handleIncubationDelete = (e, incubation) => {
        e.preventDefault();

        Swal.fire({
            title: `Are you sure you want to delete "${incubation.orgName}"?`,
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_INCUBATION_API.deleteIncubation({
                    token: startup.token,
                    startupIncubationId: incubation.startupIncubationId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            Swal.fire(`${incubation.orgName} Deleted`, "", "success");
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

    return (
        <StartupLayout>
            <Head>
                <title>Incubation & Acceleration | Startup</title>
                <meta property="og:title" content="Incubation & Acceleration | Startup" key="incubation-and-acceleration-startup" />
            </Head>

            <div className="row mb-7">
                <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(true)}>
                        <i className="fas fa-plus mr-2"></i>Add Incubation / Acceleration
                    </button>
                </div>
                <div className="col-lg-12"></div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive-md bg-white p-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Org Name</th>
                                    <th>Period (Months)</th>
                                    <th>Started On</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Website</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {incubations && incubations.length === 0 && (
                                    <tr>
                                        <td colSpan={6}>
                                            <h6 className="text-danger text-center pt-5 pb-5">No Incubation / Acceleration Found</h6>
                                        </td>
                                    </tr>
                                )}
                                {incubations &&
                                    incubations.map((inc, incIndex) => (
                                        <tr key={`inc-list-${incIndex}`}>
                                            <td className="pt-2 pb-2">{inc.orgName || "NA"}</td>
                                            <td className="pt-2 pb-2">{inc.incubationPeriod || "0"}</td>
                                            <td className="pt-2 pb-2">{moment(inc.incubationDate).format("YYYY-MM-DD") || "NA"}</td>
                                            <td className="pt-2 pb-2">{inc.orgMobile || "NA"}</td>
                                            <td className="pt-2 pb-2">{inc.orgEmail || "NA"}</td>
                                            <td className="pt-2 pb-2">
                                                <a href={inc.orgWebsite || ""} target={"_blank"} className="status active">
                                                    {inc.orgWebsite}
                                                </a>
                                            </td>
                                            <td>
                                                <a className="btn btn-primary text-white ml-2" onClick={(e) => handleIncubationDelete(e, inc)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Pagination count={incubationsCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Incubation / Acceleration Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && (
                        <Loader title="Adding Incubation / Acceleration" subtitle="Please wait while we add your incubation / acceleration details" />
                    )}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-6 ">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="incubation-org">
                                                Organization Name<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="incubation-org"
                                            className="form-control"
                                            placeholder="Enter Organization Name"
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="incubation-date">
                                                Incubation / Acceleration Started On<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="date"
                                            id="incubation-date"
                                            className="form-control"
                                            placeholder="Enter Incubation Start Date"
                                            value={incubationDate}
                                            onChange={(e) => setIncubationDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row mb-4">
                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="incubation-period">
                                                Incubation / Acceleration Period (In Months)<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            id="incubation-period"
                                            className="form-control"
                                            placeholder="Enter Incubation Period"
                                            value={incubationPeriod}
                                            onChange={(e) => setIncubationPeriod(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="organization-website">
                                                Organization Website
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="organization-website"
                                            className="form-control"
                                            placeholder="Enter Organization Website"
                                            value={orgWebsite}
                                            onChange={(e) => setOrgWebsite(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-row mb-4">
                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="organization-mobile">
                                                Organization Mobile
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            id="organization-mobile"
                                            className="form-control"
                                            placeholder="Enter Organization Mobile"
                                            value={orgMobile}
                                            onChange={(e) => setOrgMobile(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="organization-email">
                                                Organization Email
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="organization-email"
                                            className="form-control"
                                            placeholder="Enter Organization Email"
                                            value={orgEmail}
                                            onChange={(e) => setOrgEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="row mt-10">
                        <div className="col-lg-6">
                            <button className="btn btn-primary" onClick={() => setModalStatus(false)}>
                                Cancel
                            </button>
                        </div>
                        <div className="col-lg-6 text-right">
                            {orgName && incubationDate && incubationPeriod && (
                                <button className="btn btn-secondary" onClick={handleIncubationAdd}>
                                    Add Incubation / Acceleration
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
