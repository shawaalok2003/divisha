import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Popup from "reactjs-popup";
import STARTUP_ACCOMPLISHMENT_API from "../../api/startup/accomplishment";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import CONFIG from "../../config";
import { deleteFileFromS3, getSignedUrl } from "../../helpers/storage";
import useStartup from "../../hooks/useStartup";
import StorageService from "../../services/storage";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";

export default function StartupAccomplishments() {
    const { startup } = useStartup();

    const [modalStatus, setModalStatus] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [loader, setLoader] = useState(false);

    const [accomplishments, setAccomplishments] = useState([]);

    const [accomplishmentTitle, setAccomplishmentTitle] = useState("");
    const [accomplishmentFile, setAccomplishmentFile] = useState("");

    const [signedAccomplishmentFile, setSignedAccomplishmentFile] = useState("");

    const [accomplishmentsCount, setAccomplishmentsCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [reload, setReload] = useState(false);

    const handleAccomplishmentFileUpload = useCallback((files) => {
        setImageLoader(true);

        //consoleLogger("FILE", files);

        if (!files || (files && files.length === 0)) return;

        const filePath = `startup/${startup.startupId}/accomplishment/${files[0].name.split(".")[0]}.${files[0].name.split(".")[1]}`;

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
                    setSignedAccomplishmentFile(getSignedUrl(filePath));

                    setAccomplishmentFile(filePath);
                    setImageLoader(false);
                }
            });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleAccomplishmentFileUpload });

    const handleAccomplishmentAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_ACCOMPLISHMENT_API.addAccomplishment({
            token: startup.token,
            ...{
                title: accomplishmentTitle,
                file: accomplishmentFile,
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
                setAccomplishmentFile("");
                setAccomplishmentTitle("");
                setSignedAccomplishmentFile("");
            });
    };

    useEffect(() => {
        STARTUP_ACCOMPLISHMENT_API.searchStartupAccomplishments({ token: startup.token, page: pageNo, limit: pageSize, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setAccomplishments(startupResponse.data);
                    setAccomplishmentsCount(startupResponse.count);
                } else {
                    setAccomplishments([]);
                    setAccomplishmentsCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setAccomplishments([]);
                setAccomplishmentsCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    const handleAccomplishmentDelete = (e, accomplishment) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this accomplishment?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_ACCOMPLISHMENT_API.removeAccomplishment({
                    token: startup.token,
                    startupAccomplishmentId: accomplishment.startupAccomplishmentId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(accomplishment.file);
                            Swal.fire("Accomplishment Deleted", "", "success");

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
                <title>Accomplishments | Startup</title>
                <meta property="og:title" content="Accomplishments | Startup" key="accomplishments-startup" />
            </Head>

            <div className="row mb-7">
                <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(true)}>
                        <i className="fas fa-plus mr-2"></i>Add Accomplishment
                    </button>
                </div>
                <div className="col-lg-12"></div>
            </div>

            <div className="row">
                {accomplishments.length === 0 && (
                    <div className="col-sm-12">
                        <div className="bg-white pt-10 pb-10">
                            <h6 className="text-danger text-center"> No Accomplishment Found</h6>
                        </div>
                    </div>
                )}

                {accomplishments.length > 0 &&
                    accomplishments.map((accomplishment, accomplishmentIndex) => (
                        <div
                            key={`stw-accomplishment-${accomplishmentIndex}`}
                            className="col-lg-3 box"
                            style={{ width: "100%", display: "inline-block" }}
                        >
                            <div className="box mt-5" style={{ width: "100%", display: "inline-block" }}>
                                <div className="store card rounded-0 border-0">
                                    <div className="position-relative store-image">
                                        <a href="" tabindex="0">
                                            {accomplishment.file && accomplishment.file.includes(".pdf") ? (
                                                <iframe
                                                    src={getSignedUrl(accomplishment.file) + "#toolbar=0&navpanes=0"}
                                                    className="card-pdf-top rounded-0"
                                                ></iframe>
                                            ) : (
                                                <img
                                                    src={getSignedUrl(accomplishment.file)}
                                                    alt={accomplishment.title || "Accomplishment Title"}
                                                    className="card-img-top rounded-0"
                                                />
                                            )}
                                        </a>
                                    </div>
                                    <div className="card-body pb-4 border-right border-left">
                                        <a href="" className="card-title h5 text-dark d-inline-block mb-2" tabindex="0">
                                            <span className="letter-spacing-25 text-dark">{accomplishment.title || "NA"}</span>
                                        </a>
                                    </div>
                                    <div className="card-footer rounded-0 border-top-0 pb-3 pt-0 bg-transparent border-left border-right border-bottom">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <a
                                                    className="btn btn-secondary text-white"
                                                    onClick={() => window.open(getSignedUrl(accomplishment.file, 60), "_blank")}
                                                >
                                                    <i className="fas fa-eye mr-2"></i>View
                                                </a>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <a
                                                    className="btn btn-primary text-white"
                                                    onClick={(e) => handleAccomplishmentDelete(e, accomplishment)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Pagination count={accomplishmentsCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Accomplishment Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && <Loader title="Adding Accomplishment" subtitle="Please wait while we add your accomplishment" />}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-6 ">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Accomplishment Image / PDF<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        {accomplishmentFile && signedAccomplishmentFile && signedAccomplishmentFile.includes(".pdf") ? (
                                            <iframe src={signedAccomplishmentFile}></iframe>
                                        ) : (
                                            <img src={signedAccomplishmentFile} className="pb-5" />
                                        )}

                                        {imageLoader && (
                                            <Loader
                                                title="Uploading Accomplishment File"
                                                subtitle="Please wait while we upload and save your accomplishment logo"
                                            />
                                        )}
                                        {!imageLoader && !accomplishmentFile && (
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
                                        {!accomplishmentFile && (
                                            <p className="text-black text-center font-weight-medium mb-5">
                                                <small>
                                                    Recommended size <span className="text-danger font-weight-bold">500px x 500px</span> for better
                                                    user experience
                                                </small>
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="accomplishment-name">
                                                Accomplishment Title<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="accomplishment-name"
                                            className="form-control"
                                            placeholder="Enter Accomplishment Title"
                                            value={accomplishmentTitle}
                                            onChange={(e) => setAccomplishmentTitle(e.target.value)}
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
                            {accomplishmentTitle && accomplishmentFile && accomplishmentFile && (
                                <button className="btn btn-secondary" onClick={handleAccomplishmentAdd}>
                                    Add Accomplishment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
