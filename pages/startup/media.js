import { useCallback, useEffect, useState } from "react";

import STARTUP_MEDIA_API from "../../api/startup/media";

import StartupLayout from "../../components/layout/StartupLayout";
import Pagination from "../../components/Pagination";

import Popup from "reactjs-popup";
import Loader from "../../components/Loader";
import { useDropzone } from "react-dropzone";

import { deleteFileFromS3, getSignedUrl } from "../../helpers/storage";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";
import UPLOAD_API from "../../api/upload";

import { ASSETS } from "../../constants/assets";

import useStartup from "../../hooks/useStartup";
import useToast from "../../hooks/useToast";

export default function StartupMedia() {
    const { startup } = useStartup();
    const { successToast, errorToast } = useToast();

    const [modalStatus, setModalStatus] = useState(false);
    const [loader, setLoader] = useState(false);
    const [imageLoader, setImageLoader] = useState(false);
    const [reload, setReload] = useState(false);

    const [mediaTitle, setMediaTitle] = useState("");
    const [mediaFile, setMediaFile] = useState("");
    const [signedMediaFile, setSignedMediaFile] = useState("");
    const [mediaPublication, setMediaPublication] = useState("");
    const [mediaLink, setMediaLink] = useState("");

    const [medias, setMedias] = useState([]);

    const [mediaCount, setMediaCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        STARTUP_MEDIA_API.searchStartupMedias({ token: startup.token, page: pageNo, limit: pageSize, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setMedias(startupResponse.data);
                    setMediaCount(startupResponse.count);
                } else {
                    setMedias([]);
                    setMediaCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setMedias([]);
                setMediaCount(0);
            })
            .finally(() => {});
    }, [pageNo, modalStatus, reload]);

    const handleMediaFileUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: startup.token, file: files[0], type: "media" });

        if (uploadedFile.status === "success") {
            setSignedMediaFile(uploadedFile.data.signedUrl);
            setMediaFile(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setMediaFile(false);
            consoleLogger("error", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleMediaFileUpload });

    const handleMediaAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_MEDIA_API.addMedia({
            token: startup.token,
            ...{
                title: mediaTitle,
                image: mediaFile,
                publication: mediaPublication,
                link: mediaLink,
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setModalStatus(false);
                    successToast("Media publication added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add media publication");
            })
            .finally(() => {
                setModalStatus(false);
                setLoader(false);
                setMediaFile("");
                setMediaTitle("");
                setSignedMediaFile("");
                setMediaPublication("");
                setMediaLink("");
            });
    };

    const handleMediaDelete = (e, media) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this media publication?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_MEDIA_API.removeMedia({
                    token: startup.token,
                    startupMediaId: media.startupMediaId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(media.image);
                            successToast("Media publication deleted successfully!");

                            setReload(!reload);
                        }
                    })
                    .catch((error) => {
                        consoleLogger("STARTUPS ERROR: ", error);
                        errorToast("Failed to delete media publication");
                    });
            } else {
                Swal.close();
            }
        });
    };

    return (
        <StartupLayout>
            <div className="row mb-7">
                <div className="col-lg-12 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(true)}>
                        <i className="fas fa-plus mr-2"></i>Add Media Publication
                    </button>
                </div>
                <div className="col-lg-12"></div>
            </div>

            <div className="store-listing-style-04 row">
                {medias.length === 0 && (
                    <div className="col-sm-12 bg-white pt-10 pb-10">
                        <h6 className="text-primary text-center">No Media Publication Found</h6>
                    </div>
                )}
                {medias.length > 0 &&
                    medias.map((media, mediaIndex) => (
                        <div key={`stw-media-${mediaIndex}`} className="col-md-12 store-listing-item bg-white mb-5">
                            <div className="d-flex align-items-end py-4 py-lg-0">
                                <div className="store media align-items-stretch py-4">
                                    <a href={media.link || ""} target="_blank" className="store-image">
                                        <img src={media.signedImage || ASSETS.noImage} alt={media.title} />
                                    </a>
                                    <div className="media-body px-0 pt-4 pt-md-0">
                                        <a target="_blank" className="font-size-lg font-weight-semibold text-dark d-inline-block mb-2 lh-1">
                                            <span className="letter-spacing-25 text-dark">{media.title || "NA"}</span>
                                        </a>
                                        <ul className="list-inline store-meta font-size-sm d-flex align-items-center flex-wrap">
                                            <li className="list-inline-item">
                                                <a className="link-hover-secondary-primary">
                                                    <span className="d-inline-block mr-1">
                                                        <i className="fal fa-book text-secondary"></i>
                                                    </span>
                                                    <span className="text-dark">{media.publication || "NA"}</span>
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href={media.link || ""} target="_blank" className="link-hover-secondary-primary">
                                                    <span className="d-inline-block mr-1">
                                                        <i className="fal fa-link text-secondary"></i>
                                                    </span>
                                                    <span className="text-link">{media.publication || "NA"}</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="mt-5 text-right">
                                            <a
                                                href={media.link || ""}
                                                target="_blank"
                                                className="btn btn-secondary btn-icon-left mb-2 mb-sm-0 px-5 font-size-md"
                                            >
                                                <i className="fal fa-external-link"></i>
                                                Open
                                            </a>

                                            <a className="btn btn-primary text-white ml-2" onClick={(e) => handleMediaDelete(e, media)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Pagination count={mediaCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Media Image Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && <Loader title="Adding Media File" subtitle="Please wait while we add your media file" />}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-6 ">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Media Image / PDF<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        {mediaFile && signedMediaFile && signedMediaFile.includes(".pdf") ? (
                                            <iframe src={signedMediaFile}></iframe>
                                        ) : (
                                            <img src={signedMediaFile} className="pb-5" />
                                        )}

                                        {imageLoader && (
                                            <Loader title="Uploading Media File" subtitle="Please wait while we upload and save your media file" />
                                        )}
                                        {!imageLoader && !mediaFile && (
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
                                        {!mediaFile && (
                                            <p className="text-black text-center font-weight-medium mb-5">
                                                <small>
                                                    Recommended size <span className="text-danger font-weight-bold">500px x 500px</span> for better
                                                    user experience
                                                </small>
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <div className="mb-2 d-flex align-items-center lh-15">
                                                <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="media-name">
                                                    Media Title<span className="text-danger">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="media-name"
                                                className="form-control"
                                                placeholder="Enter Media Title"
                                                value={mediaTitle}
                                                onChange={(e) => setMediaTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="mb-2 d-flex align-items-center lh-15">
                                                <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">Media Publication</label>
                                            </div>
                                            <input
                                                type="text"
                                                id="media-name"
                                                className="form-control"
                                                placeholder="Enter Media Publication"
                                                value={mediaPublication}
                                                onChange={(e) => setMediaPublication(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="mb-2 d-flex align-items-center lh-15">
                                                <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">Media Link</label>
                                            </div>
                                            <input
                                                type="text"
                                                id="media-name"
                                                className="form-control"
                                                placeholder="Enter Media Link"
                                                value={mediaLink}
                                                onChange={(e) => setMediaLink(e.target.value)}
                                            />
                                        </div>
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
                            {mediaTitle && (
                                <button className="btn btn-secondary" onClick={handleMediaAdd}>
                                    Add Media
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
