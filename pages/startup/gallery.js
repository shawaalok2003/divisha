import { useCallback, useEffect, useState } from "react";

import Popup from "reactjs-popup";

import StartupLayout from "../../components/layout/StartupLayout";
import StorageService from "../../services/storage";

import { useDropzone } from "react-dropzone";
import CONFIG from "../../config";
import Loader from "../../components/Loader";
import STARTUP_GALLERY_API from "../../api/startup/gallery";

import { deleteFileFromS3, getSignedUrl } from "../../helpers/storage";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";
import UPLOAD_API from "../../api/upload";

import useStartup from "../../hooks/useStartup";
import useToast from "../../hooks/useToast";

export default function StartupGallery() {
    const { startup } = useStartup();
    const { successToast, errorToast } = useToast();

    const [imageLoader, setImageLoader] = useState(false);
    const [loader, setLoader] = useState(false);

    const [modalStatus, setModalStatus] = useState(false);
    const [gallery, setGallery] = useState([]);

    const [galleryTitle, setGalleryTitle] = useState("");
    const [galleryFile, setGalleryFile] = useState("");

    const [signedGalleryFile, setSignedGalleryFile] = useState("");

    const [galleryCount, setGalleryCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        STARTUP_GALLERY_API.searchStartupGallery({ token: startup.token, page: pageNo, limit: pageSize, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setGallery(startupResponse.data);
                    setGalleryCount(startupResponse.count);
                } else {
                    setGallery([]);
                    setGalleryCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setGallery([]);
                setGalleryCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    const handleGalleryFileUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: startup.token, file: files[0], type: "gallery" });

        if (uploadedFile.status === "success") {
            setSignedGalleryFile(uploadedFile.data.signedUrl);
            setGalleryFile(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("error", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleGalleryFileUpload });

    const handleGalleryAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_GALLERY_API.addGallery({
            token: startup.token,
            ...{
                title: galleryTitle,
                file: galleryFile,
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setModalStatus(false);
                    successToast("Gallery image added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add gallery image");
            })
            .finally(() => {
                setModalStatus(false);
                setLoader(false);
                setGalleryFile("");
                setGalleryTitle("");
                setSignedGalleryFile("");
            });
    };

    const handleGalleryDelete = (e, gallery) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this gallery item?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_GALLERY_API.removeGallery({
                    token: startup.token,
                    startupGalleryId: gallery.startupGalleryId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(gallery.file);
                            successToast("Gallery image deleted successfully!");

                            setReload(!reload);
                        }
                    })
                    .catch((error) => {
                        consoleLogger("STARTUPS ERROR: ", error);
                        errorToast("Failed to delete gallery image");
                    });
            } else {
                Swal.close();
            }
        });
    };

    return (
        <StartupLayout>
            <div className="row mb-5">
                <div className="col-lg-12 text-right m">
                    <button className="btn btn-primary" onClick={() => setModalStatus(!modalStatus)}>
                        <i className="fas fa-plus mr-2"></i>Add Image
                    </button>
                </div>
            </div>

            <div className="row">
                {gallery.length === 0 && (
                    <div className="col-sm-12">
                        <div className="bg-white pt-10 pb-10">
                            <h6 className="text-danger text-center"> No Gallery Images Found</h6>
                        </div>
                    </div>
                )}

                {gallery.length > 0 &&
                    gallery.map((gallery, galleryIndex) => (
                        <div className="col-lg-4" key={`stw-gal-${galleryIndex}`}>
                            <div className="image-box card rounded-0 border-0 hover-scale bg-1hite p-2">
                                <a href={getSignedUrl(gallery.file)} className="image position-relative card-img">
                                    <img
                                        src={getSignedUrl(gallery.file)}
                                        width={"300px"}
                                        alt="Image box"
                                        onError={(e) => (e.target.src = "/images/no-image.jpg")}
                                    />
                                </a>
                                <div className="text-white content-box px-4 pb-3 card-img-overlay d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="mb-1 text-capitalize">{"IMAGE"}</p>
                                        <a href={getSignedUrl(gallery.file)} className="font-weight-normal text-white font-size-lg">
                                            {gallery.title || ""}
                                        </a>
                                    </div>
                                    <a className="btn btn-primary btn-sm text-white" onClick={(e) => handleGalleryDelete(e, gallery)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Pagination count={galleryCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Gallery Image Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && <Loader title="Adding Gallery File" subtitle="Please wait while we add your gallery file" />}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-6 ">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Gallery Image / PDF<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        {galleryFile && signedGalleryFile && signedGalleryFile.includes(".pdf") ? (
                                            <iframe src={signedGalleryFile}></iframe>
                                        ) : (
                                            <img src={signedGalleryFile} className="pb-5" />
                                        )}

                                        {imageLoader && (
                                            <Loader
                                                title="Uploading Gallery File"
                                                subtitle="Please wait while we upload and save your gallery file"
                                            />
                                        )}
                                        {!imageLoader && !galleryFile && (
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
                                        {!galleryFile && (
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
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="gallery-name">
                                                Gallery Title<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="gallery-name"
                                            className="form-control"
                                            placeholder="Enter Gallery Title"
                                            value={galleryTitle}
                                            onChange={(e) => setGalleryTitle(e.target.value)}
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
                            {galleryTitle && galleryFile && galleryFile && (
                                <button className="btn btn-secondary" onClick={handleGalleryAdd}>
                                    Add Gallery
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
