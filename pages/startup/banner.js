import { useCallback, useEffect, useState } from "react";

import Popup from "reactjs-popup";

import StartupLayout from "../../components/layout/StartupLayout";
import StorageService from "../../services/storage";

import { useDropzone } from "react-dropzone";
import CONFIG from "../../config";
import Loader from "../../components/Loader";
import STARTUP_BANNER_API from "../../api/startup/banner";

import { deleteFileFromS3, getSignedUrl } from "../../helpers/storage";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";

import useStartup from "../../hooks/useStartup";
import useToast from "../../hooks/useToast";
import UPLOAD_API from "../../api/upload";

export default function StartupBanner() {
    const { startup } = useStartup();
    const { successToast, errorToast } = useToast();

    const [imageLoader, setImageLoader] = useState(false);
    const [loader, setLoader] = useState(false);

    const [modalStatus, setModalStatus] = useState(false);
    const [videoModalStatus, setVideoModalStatus] = useState(false);

    const [banner, setBanner] = useState([]);

    const [bannerTitle, setBannerTitle] = useState("");
    const [bannerFile, setBannerFile] = useState("");

    const [signedBannerFile, setSignedBannerFile] = useState("");

    const [bannerCount, setBannerCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        STARTUP_BANNER_API.searchStartupBanner({ token: startup.token, page: pageNo, limit: pageSize, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setBanner(startupResponse.data);
                    setBannerCount(startupResponse.count);
                } else {
                    setBanner([]);
                    setBannerCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setBanner([]);
                setBannerCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, reload]);

    const handleBannerFileUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: startup.token, file: files[0], type: "banner" });

        if (uploadedFile.status === "success") {
            setSignedBannerFile(uploadedFile.data.signedUrl);
            setBannerFile(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("error", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleBannerFileUpload });

    const handleBannerAdd = (e) => {
        e.preventDefault();
        setLoader(true);

        STARTUP_BANNER_API.addBanner({
            token: startup.token,
            ...{
                title: bannerTitle,
                file: bannerFile,
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setModalStatus(false);
                    successToast("Banner added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add banner");
            })
            .finally(() => {
                setModalStatus(false);
                setLoader(false);
                setBannerFile("");
                setBannerTitle("");
                setSignedBannerFile("");
            });
    };

    const handleBannerDelete = (e, banner) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this banner?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_BANNER_API.removeBanner({
                    token: startup.token,
                    startupBannerId: banner.startupBannerId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(banner.file);
                            successToast("Banner deleted successfully!");

                            setReload(!reload);
                        }
                    })
                    .catch((error) => {
                        consoleLogger("STARTUPS ERROR: ", error);
                        errorToast("Failed to delete banner");
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
                    <button className="btn btn-primary mr-2" onClick={() => setModalStatus(!modalStatus)}>
                        <i className="fas fa-plus mr-2"></i>Add Banner
                    </button>

                    {/* <button className="btn btn-primary" onClick={() => setVideoModalStatus(!videoModalStatus)}>
                        <i className="fas fa-plus mr-2"></i>Add Youtube Video
                    </button> */}
                </div>
            </div>

            <div className="row">
                {banner.length === 0 && (
                    <div className="col-sm-12">
                        <div className="bg-white pt-10 pb-10">
                            <h6 className="text-danger text-center"> No Banners Found</h6>
                        </div>
                    </div>
                )}

                {banner.length > 0 &&
                    banner.map((banner, bannerIndex) => (
                        <div className="col-lg-4" key={`stw-gal-${bannerIndex}`}>
                            <div className="image-box card rounded-0 border-0 hover-scale bg-1hite p-2">
                                <a href={getSignedUrl(banner.file)} className="image position-relative card-img">
                                    <img
                                        src={getSignedUrl(banner.file)}
                                        width={"300px"}
                                        alt="Image box"
                                        onError={(e) => (e.target.src = "/images/no-image.jpg")}
                                    />
                                </a>
                                <div className="text-white content-box px-4 pb-3 card-img-overlay d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="mb-1 text-capitalize">{"IMAGE"}</p>
                                        <a href={getSignedUrl(banner.file)} className="font-weight-normal text-white font-size-lg">
                                            {banner.title || ""}
                                        </a>
                                    </div>
                                    <a className="btn btn-primary btn-sm text-white" onClick={(e) => handleBannerDelete(e, banner)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <Pagination count={bannerCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Banner Image Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    {loader && <Loader title="Adding Banner File" subtitle="Please wait while we add your banner file" />}
                    {!loader && (
                        <div className="contact-form">
                            <form>
                                <div className="form-row mb-4">
                                    <div className="col-md-6 ">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Banner Image<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        {bannerFile && signedBannerFile && signedBannerFile.includes(".pdf") ? (
                                            <iframe src={signedBannerFile}></iframe>
                                        ) : (
                                            <img src={signedBannerFile} className="pb-5" />
                                        )}

                                        {imageLoader && (
                                            <Loader title="Uploading Banner File" subtitle="Please wait while we upload and save your banner file" />
                                        )}
                                        {!imageLoader && !bannerFile && (
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
                                        {!bannerFile && (
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
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="banner-name">
                                                Banner Title<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="banner-name"
                                            className="form-control"
                                            placeholder="Enter Banner Title"
                                            value={bannerTitle}
                                            onChange={(e) => setBannerTitle(e.target.value)}
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
                            {bannerTitle && bannerFile && bannerFile && (
                                <button className="btn btn-secondary" onClick={handleBannerAdd}>
                                    Add Banner
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
