import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Select from "../../../components/Select";
import SideModal from "../../../components/SideModal";
import TextArea from "../../../components/TextArea";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { INVESTOR_TYPES, LOADER_TIMEOUTS } from "../../../constants";
import { ASSETS } from "../../../constants/assets";
import { consoleLogger } from "../../../helpers";

import Loader from "../../../components/Loader";
import Picture from "../../../components/Picture";
import UPLOAD_API from "../../../api/upload";
import SUPER_INVESTORS_API from "../../../api/super/investors";
import useSuper from "../../../hooks/useSuper";

const AddInvestor = (props) => {
    const { onClose, onSuccess } = props;
    const { superData } = useSuper();

    const defaultNewInvestor = {
        type: "individual",
        firstName: "",
        lastName: "",
        username: "",
        mobile: "",
        password: "",
        foundedIn: new Date().getFullYear(),
        about: "",
        photo: "",
        website: "",
    };

    const [newInvestor, setNewInvestor] = useState(defaultNewInvestor);
    const [fieldsOkay, setFeildsOkay] = useState(false);
    const [loader, setLoader] = useState(false);

    const [imageLoader, setImageLoader] = useState(false);
    const [investorImage, setInvestorImage] = useState("");
    const [signedInvestorImage, setSignedInvestorImage] = useState("");

    useEffect(() => {
        let eligible = true;

        if (!newInvestor.type) eligible = false;
        if (!newInvestor.firstName) eligible = false;
        if (!newInvestor.username) eligible = false;
        if (!newInvestor.mobile) eligible = false;
        if (!newInvestor.password) eligible = false;

        if (!eligible) {
            setFeildsOkay(false);
        } else setFeildsOkay(true);
    }, [newInvestor]);

    const handleTeamImageUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: superData.token, file: files[0], type: "investor" });

        if (uploadedFile.status === "success") {
            setSignedInvestorImage(uploadedFile.data.signedUrl);

            setInvestorImage(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("INVESTOR INVESTOR PHOTO ERROR:", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleTeamImageUpload });

    const addNewInvestor = () => {
        setLoader(true);

        SUPER_INVESTORS_API.addInvestor({
            token: superData.token,
            newInvestor: { ...newInvestor, photo: investorImage },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setTimeout(() => {
                        setNewInvestor(defaultNewInvestor);
                        setInvestorImage("");
                        setSignedInvestorImage("");
                        onSuccess();
                    }, LOADER_TIMEOUTS.fiveSec);
                }
            })
            .catch((error) => {
                consoleLogger("ADD INVESTOR INVESTOR ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.fiveSec);
            });
    };

    return (
        <SideModal title="Add Investor" {...props}>
            <div className="card border-0">
                <img className="card-img-top" src={ASSETS.bgTeamAdd} alt="Team Add BG" />

                <div className="card-body">
                    {!loader && (
                        <div class="form-row">
                            <div className="col-12">
                                <label className="font-size-sm text-dark font-weight-semibold mb-1">Photo</label>
                                {investorImage && signedInvestorImage && (
                                    <div class="col-12 mb-2 text-center">
                                        <Picture src={signedInvestorImage} type="thumbnail" className="w-70" />
                                    </div>
                                )}

                                {imageLoader && (
                                    <Loader title="Uploading Document File" subtitle="Please wait while we upload and save your document file" />
                                )}

                                {!imageLoader && !investorImage && (
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
                                {!investorImage && (
                                    <p className="text-center font-size-sm mb-5">
                                        <small>
                                            Recommended size <span className="text-danger font-weight-medium">500px x 500px</span> for better user
                                            experience
                                        </small>
                                    </p>
                                )}
                            </div>

                            <div class="col-12 mb-2">
                                <Select
                                    title="Investor Type"
                                    options={INVESTOR_TYPES || []}
                                    value={newInvestor.type}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, type: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="First Name"
                                    placeholder="e.g.: Deepak"
                                    value={newInvestor.firstName}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, firstName: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Last Name"
                                    placeholder="e.g.: Priyadarshi"
                                    value={newInvestor.lastName}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, lastName: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Username / Email"
                                    placeholder="e.g.: support@tls.com"
                                    value={newInvestor.username}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, username: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    type="number"
                                    title="Mobile"
                                    placeholder="e.g.: 9876543210"
                                    value={newInvestor.mobile}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, mobile: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    type="password"
                                    title="Password"
                                    placeholder="e.g.: startupzworld"
                                    value={newInvestor.password}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Founded In "
                                    placeholder="e.g.: 2021"
                                    value={newInvestor.foundedIn}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, foundedIn: e.target.value })}
                                />
                            </div>

                            <div class="col-sm-12 mb-2">
                                <TextArea
                                    title="About"
                                    placeholder="e.g.: Write something about the investor"
                                    value={newInvestor.about}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, about: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Website"
                                    placeholder="e.g.: https://www.startxv.com"
                                    value={newInvestor.website}
                                    onChange={(e) => setNewInvestor({ ...newInvestor, website: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {loader && (
                        <div className="py-5">
                            <Loader
                                title="Adding New Investor ..."
                                subtitle={`Please wait while we add your ${newInvestor?.type} investor in your team`}
                            />
                        </div>
                    )}

                    {!loader && (
                        <div className="d-flex justify-content-between mt-10">
                            <Button text="Cancel" color="danger" size="sm" onClick={onClose} />
                            <Button text="Add Investor" color="success" size="sm" onClick={addNewInvestor} disabled={!fieldsOkay} />
                        </div>
                    )}
                </div>
            </div>
        </SideModal>
    );
};

export default AddInvestor;
