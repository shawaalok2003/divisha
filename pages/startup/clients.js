import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Popup from "reactjs-popup";
import STARTUP_CLIENT_API from "../../api/startup/client";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import CONFIG from "../../config";
import { deleteFileFromS3, getSignedUrl } from "../../helpers/storage";
import useStartup from "../../hooks/useStartup";
import StorageService from "../../services/storage";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";
import { ASSETS } from "../../constants/assets";

export default function StartupClients() {
    const { startup } = useStartup();

    const [modalStatus, setModalStatus] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [loader, setLoader] = useState(false);

    const [clients, setClients] = useState([]);

    const [clientLogo, setClientLogo] = useState("");

    const [clientName, setClientName] = useState("");
    const [clientTestimonial, setClientTestimonial] = useState("");

    const [signedClientLogo, setSignedClientLogo] = useState("");

    const [clientsCount, setClientsCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [reload, setReload] = useState(false);

    const handleClientLogoUpload = useCallback((files) => {
        setImageLoader(true);

        //consoleLogger("FILE", files);

        if (!files || (files && files.length === 0)) return;

        const filePath = `startup/${startup.startupId}/client/${files[0].name.split(".")[0]}.${files[0].name.split(".")[1]}`;

        const params = {
            Body: files[0],
            Bucket: CONFIG.AWS_SPACE_BUCKET,
            Key: filePath,
        };

        //consoleLogger("AWS PARAMS: ", params);

        StorageService.putObject(params)
            .on("build", (request) => {
                request.httpRequest.headers.Host = process.env.REACT_APP_SPACE_URL;
                request.httpRequest.headers["Content-Length"] = files[0].size;
                request.httpRequest.headers["Content-Type"] = files[0].type;
                request.httpRequest.headers["x-amz-acl"] = "authenticated-read";
                request.httpRequest.headers["Access-Control-Allow-Origin"] = "*";
            })
            .send((err) => {
                if (err) {
                    setImageLoader(false);
                    consoleLogger("error", err);
                } //errorCallback();
                else {
                    setSignedClientLogo(getSignedUrl(filePath));

                    setClientLogo(filePath);
                    setImageLoader(false);
                }
            });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleClientLogoUpload });

    const handleClientAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_CLIENT_API.addClient({
            token: startup.token,
            ...{
                name: clientName,
                testimonial: clientTestimonial,
                logo: clientLogo,
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
                setClientLogo("");
                setClientName("");
                setClientTestimonial("");
                setSignedClientLogo("");
            });
    };

    useEffect(() => {
        STARTUP_CLIENT_API.searchStartupClients({ token: startup.token, page: pageNo, limit: pageSize, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setClients(startupResponse.data);
                    setClientsCount(startupResponse.count);
                } else {
                    setClients([]);
                    setClientsCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setClients([]);
                setClientsCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    const handleClientDelete = (e, client) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this client?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_CLIENT_API.removeClient({
                    token: startup.token,
                    startupClientId: client.startupClientId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(client.file);
                            Swal.fire("Client Deleted", "", "success");

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
                <title>Clients | Startup</title>
                <meta property="og:title" content="Clients | Startup" key="clients-startup" />
            </Head>

            <div className="row mb-7">
                <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(true)}>
                        <i className="fas fa-plus mr-2"></i>Add Client
                    </button>
                </div>
                <div className="col-lg-12"></div>
            </div>

            <div className="row testimonials-slider arrow-top slick-initialized">
                {clients.length === 0 && (
                    <div className="col-sm-12">
                        <div className="bg-white pt-10 pb-10">
                            <h6 className="text-danger text-center"> No Clients Found</h6>
                        </div>
                    </div>
                )}

                {clients.length > 0 &&
                    clients.map((client, clientIndex) => (
                        <div key={`stw-client-${clientIndex}`} className="col-sm-4 box" style={{ width: "100%", display: "inline-block" }}>
                            <div className="card testimonial h-100 border-0 bg-transparent">
                                <a href="#" className="author-image" tabIndex="0">
                                    <img
                                        src={client.logo ? getSignedUrl(client.logo) : ASSETS.noImage}
                                        width={100}
                                        alt="Testimonial"
                                        className="rounded-circle border-white shadow-sm border"
                                        onError={(e) => {
                                            e.target.src = "/images/no-image.jpg";
                                        }}
                                    />
                                </a>
                                <div className="card-body bg-white shadow-sm">
                                    <div className="testimonial-icon text-right">
                                        <i className="fas fa-quote-right text-primary"></i>
                                    </div>
                                    <ul className="list-inline mb-4 d-flex align-items-end flex-wrap">
                                        <li className="list-inline-item">
                                            <a className="font-size-lg text-dark font-weight-semibold d-inline-block" tabIndex="0">
                                                {client.name || "NA"}
                                            </a>
                                        </li>
                                        {/* <li className="list-inline-item">
                                            <span className="h5 font-weight-light mb-0 d-inline-block ml-1 text-gray">/</span>
                                        </li>
                                        <li>
                                            <span className="text-gray">CEO at TLS</span>
                                        </li> */}
                                    </ul>
                                    <div className="card-text text-gray pr-4">{client.testimonial || "NA"}</div>
                                    <div className="text-right mt-5">
                                        <a className="btn btn-sm btn-primary text-white" onClick={(e) => handleClientDelete(e, client)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Pagination count={clientsCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Client Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && <Loader title="Adding Client" subtitle="Please wait while we add your client" />}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-6 ">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Client Logo<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        {clientLogo && signedClientLogo && <img src={signedClientLogo} className="pb-5" />}

                                        {imageLoader && (
                                            <Loader title="Uploading Client Logo" subtitle="Please wait while we upload and save your client logo" />
                                        )}
                                        {!imageLoader && !clientLogo && (
                                            <div className="form-group mb-4 upload-file text-center bg-gray-02">
                                                <div {...getRootProps()} className="pt-10 pb-10">
                                                    <input {...getInputProps()} />
                                                    {isDragActive ? (
                                                        <p>Drop the files here ...</p>
                                                    ) : (
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {!clientLogo && (
                                            <p className="text-black text-center font-weight-medium mb-5">
                                                <small>
                                                    Recommended size <span className="text-danger font-weight-bold">500px x 500px</span> for better
                                                    user experience
                                                </small>
                                            </p>
                                        )}

                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="client-name">
                                                Client Name<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="client-name"
                                            className="form-control"
                                            placeholder="Enter Client Name"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="client-testimonial">
                                                Client Testimonial
                                            </label>
                                        </div>
                                        <textarea
                                            type="text"
                                            id="client-testimonial"
                                            className="form-control border"
                                            placeholder="e.g.: Add the client testimonial here"
                                            value={clientTestimonial}
                                            rows={5}
                                            onChange={(e) => setClientTestimonial(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4"></div>
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
                            {clientName && clientTestimonial && clientLogo && (
                                <button className="btn btn-secondary" onClick={handleClientAdd}>
                                    Add Client
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
