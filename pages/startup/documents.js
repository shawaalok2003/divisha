import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Popup from "reactjs-popup";
import STARTUP_DOCUMENT_API from "../../api/startup/document";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { deleteFileFromS3 } from "../../helpers/storage";

import Swal from "sweetalert2";
import UPLOAD_API from "../../api/upload";
import { consoleLogger } from "../../helpers";
import { ASSETS } from "../../constants/assets";

import useStartup from "../../hooks/useStartup";
import useToast from "../../hooks/useToast";

export default function StartupDocuments() {
    const { startup } = useStartup();
    const { successToast, errorToast } = useToast();

    const [modalStatus, setModalStatus] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [loader, setLoader] = useState(false);

    const [documents, setDocuments] = useState([]);

    const [documentTitle, setDocumentTitle] = useState("");
    const [documentFile, setDocumentFile] = useState("");
    const [documentLink, setDocumentLink] = useState("");

    const [signedDocumentFile, setSignedDocumentFile] = useState("");

    const [documentsCount, setDocumentsCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [reload, setReload] = useState(false);

    const handleDocumentFileUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: startup.token, file: files[0], type: "document" });

        if (uploadedFile.status === "success") {
            setSignedDocumentFile(uploadedFile.data.signedUrl);

            setDocumentFile(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("error", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleDocumentFileUpload });

    const handleDocumentAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_DOCUMENT_API.addDocument({
            token: startup.token,
            ...{
                title: documentTitle,
                file: documentFile,
                ...(documentLink ? { link: documentLink } : {}),
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
                setDocumentFile("");
                setDocumentTitle("");
                setSignedDocumentFile("");
            });
    };

    useEffect(() => {
        STARTUP_DOCUMENT_API.searchStartupDocuments({ token: startup.token, page: pageNo, limit: pageSize, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setDocuments(startupResponse.data);
                    setDocumentsCount(startupResponse.count);
                } else {
                    setDocuments([]);
                    setDocumentsCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setDocuments([]);
                setDocumentsCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    const handleDocumentDelete = (e, document) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this document?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_DOCUMENT_API.removeDocument({
                    token: startup.token,
                    startupDocumentId: document.startupDocumentId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(document.file);
                            successToast("Document deleted successfully!");
                            setReload(!reload);
                        }
                    })
                    .catch((error) => {
                        consoleLogger("STARTUPS ERROR: ", error);
                        errorToast("Failed to delete document");
                    });
            } else {
                Swal.close();
            }
        });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Documents | Startup</title>
                <meta property="og:title" content="Documents | Startup" key="documents-startup" />
            </Head>

            <div className="row mb-7">
                <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(true)}>
                        <i className="fas fa-plus mr-2"></i>Add Document
                    </button>
                </div>
                <div className="col-lg-12"></div>
            </div>

            <div className="row">
                {documents.length === 0 && (
                    <div className="col-sm-12">
                        <div className="bg-white pt-10 pb-10">
                            <h6 className="text-danger text-center"> No Documents Found</h6>
                        </div>
                    </div>
                )}

                {documents.length > 0 &&
                    documents.map((document, documentIndex) => (
                        <div key={`stw-document-${documentIndex}`} className="col-lg-3 box" style={{ width: "100%", display: "inline-block" }}>
                            <div className="box mt-5 shadow" style={{ width: "100%", display: "inline-block" }}>
                                <div className="store card rounded-0 border-0">
                                    <div className="position-relative store-image border">
                                        {document?.file && (
                                            <a>
                                                {document.file.includes(".pdf") ? (
                                                    <iframe src={document.file + "#toolbar=0&navpanes=0"} className="card-pdf-top rounded-0"></iframe>
                                                ) : (
                                                    <img
                                                        src={document.file || ASSETS.noImage}
                                                        alt={document.title || "Document Title"}
                                                        className="card-img-top rounded-0"
                                                    />
                                                )}
                                            </a>
                                        )}

                                        {document?.link && (
                                            <a>
                                                {document.link.includes(".pdf") ? (
                                                    <iframe src={document.link + "#toolbar=0&navpanes=0"} className="card-pdf-top rounded-0"></iframe>
                                                ) : (
                                                    <img
                                                        src={document.link || ASSETS.noImage}
                                                        alt={document.title || "Document Title"}
                                                        className="card-img-top rounded-0"
                                                    />
                                                )}
                                            </a>
                                        )}
                                    </div>
                                    <div className="card-body pb-4 border-right border-left">
                                        <a className="card-title h6 d-inline-block mb-2">
                                            <span className="letter-spacing-25 text-dark">{document.title || "NA"}</span>
                                        </a>
                                    </div>
                                    <div className="card-footer rounded-0 border-top-0 pb-3 pt-0 bg-transparent border-left border-right border-bottom">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <a
                                                    className="btn btn-secondary text-white"
                                                    onClick={() => window.open(document?.link || document?.file, "_blank")}
                                                >
                                                    <i className="fas fa-eye mr-2"></i>View
                                                </a>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <a className="btn btn-primary text-white" onClick={(e) => handleDocumentDelete(e, document)}>
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

            <Pagination count={documentsCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Document Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && <Loader title="Adding Document" subtitle="Please wait while we add your document" />}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-12">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Document Image / PDF<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        {documentFile && signedDocumentFile && signedDocumentFile.includes(".pdf") ? (
                                            <iframe src={signedDocumentFile}></iframe>
                                        ) : (
                                            <img src={signedDocumentFile} className="pb-5" />
                                        )}

                                        {imageLoader && (
                                            <Loader
                                                title="Uploading Document File"
                                                subtitle="Please wait while we upload and save your document file"
                                            />
                                        )}
                                        {!imageLoader && !documentFile && (
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
                                        {!documentFile && (
                                            <p className="text-black text-center font-weight-medium mb-5">
                                                <small>
                                                    Recommended size <span className="text-danger font-weight-bold">500px x 500px</span> for better
                                                    user experience
                                                </small>
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="document-name">
                                                Document Title<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="document-name"
                                            className="form-control"
                                            placeholder="Enter Document Title"
                                            value={documentTitle}
                                            onChange={(e) => setDocumentTitle(e.target.value)}
                                        />
                                    </div>

                                    {!documentFile && (
                                        <div className="col-md-12 mt-5">
                                            <div className="mb-2 d-flex align-items-center lh-15">
                                                <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="document-name">
                                                    Document Link
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="document-name"
                                                className="form-control"
                                                placeholder="Enter Document Link"
                                                value={documentLink}
                                                onChange={(e) => setDocumentLink(e.target.value)}
                                            />
                                        </div>
                                    )}
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
                            {documentTitle && (documentFile || documentLink) && (
                                <button className="btn btn-secondary" onClick={handleDocumentAdd}>
                                    Add Document
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
