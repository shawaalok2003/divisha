import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Select from "../../../components/Select";
import SideModal from "../../../components/SideModal";
import TextArea from "../../../components/TextArea";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { INVESTOR_MEMBER_TYPES, LOADER_TIMEOUTS } from "../../../constants";
import { ASSETS } from "../../../constants/assets";
import { consoleLogger } from "../../../helpers";

import INVESTOR_MEMBER_API from "../../../api/investor/member";

import useInvestor from "../../../hooks/useInvestor";
import Loader from "../../../components/Loader";
import Picture from "../../../components/Picture";
import UPLOAD_API from "../../../api/upload";

const AddInvestorMember = (props) => {
    const { onClose, onSuccess } = props;
    const { investorData } = useInvestor();

    const defaultNewMember = {
        type: "founding",
        photo: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        designation: "",
        qualification: "",
        about: "",
        facebook: "",
        instagram: "",
        linkedin: "",
    };

    const [newMember, setNewMember] = useState(defaultNewMember);
    const [fieldsOkay, setFeildsOkay] = useState(false);
    const [loader, setLoader] = useState(false);

    const [imageLoader, setImageLoader] = useState(false);
    const [memberImage, setMemberImage] = useState("");
    const [signedMemberImage, setSignedMemberImage] = useState("");

    useEffect(() => {
        let eligible = true;

        if (!newMember.type) eligible = false;
        if (!newMember.firstName) eligible = false;
        if (!newMember.email) eligible = false;
        if (!newMember.mobile) eligible = false;
        if (!newMember.designation) eligible = false;

        if (!eligible) {
            setFeildsOkay(false);
        } else setFeildsOkay(true);
    }, [newMember]);

    const handleTeamImageUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: investorData.token, file: files[0], type: "investormember" });

        if (uploadedFile.status === "success") {
            setSignedMemberImage(uploadedFile.data.signedUrl);

            setMemberImage(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("INVESTOR MEMBER PHOTO ERROR:", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleTeamImageUpload });

    const addNewMember = () => {
        setLoader(true);

        INVESTOR_MEMBER_API.addMember({
            token: investorData.token,
            newMember: { ...newMember, photo: memberImage },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setTimeout(() => {
                        setNewMember(defaultNewMember);
                        setMemberImage("");
                        setSignedMemberImage("");

                        onSuccess();
                    }, LOADER_TIMEOUTS.fiveSec);
                }
            })
            .catch((error) => {
                consoleLogger("ADD INVESTOR MEMBER ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.fiveSec);
            });
    };

    return (
        <SideModal title="Add Member" {...props}>
            <div className="card border-0">
                <img className="card-img-top" src={ASSETS.bgTeamAdd} alt="Team Add BG" />

                <div className="card-body">
                    {!loader && (
                        <div class="form-row">
                            <div className="col-12">
                                <label className="font-size-sm text-dark font-weight-semibold mb-1">Photo</label>
                                {memberImage && signedMemberImage && (
                                    <div class="col-12 mb-2 text-center">
                                        <Picture src={signedMemberImage} type="thumbnail" className="w-70" />
                                    </div>
                                )}

                                {imageLoader && (
                                    <Loader title="Uploading Document File" subtitle="Please wait while we upload and save your document file" />
                                )}

                                {!imageLoader && !memberImage && (
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
                                {!memberImage && (
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
                                    title="Member Type"
                                    options={INVESTOR_MEMBER_TYPES || []}
                                    value={newMember.type}
                                    onChange={(e) => setNewMember({ ...newMember, type: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="First Name"
                                    placeholder="e.g.: Deepak"
                                    value={newMember.firstName}
                                    onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Last Name"
                                    placeholder="e.g.: Priyadarshi"
                                    value={newMember.lastName}
                                    onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Email"
                                    placeholder="e.g.: support@tls.com"
                                    value={newMember.email}
                                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    type="number"
                                    title="Mobile"
                                    placeholder="e.g.: 919876543210"
                                    value={newMember.mobile}
                                    onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Designation"
                                    placeholder="e.g.: Director"
                                    value={newMember.designation}
                                    onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                                    required
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Qualification"
                                    placeholder="e.g.: Mtech & PHD"
                                    value={newMember.qualification}
                                    onChange={(e) => setNewMember({ ...newMember, qualification: e.target.value })}
                                />
                            </div>

                            <div class="col-sm-12 mb-2">
                                <TextArea
                                    title="About"
                                    placeholder="e.g.: Write something about the team member"
                                    value={newMember.about}
                                    onChange={(e) => setNewMember({ ...newMember, about: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Facebook"
                                    placeholder="e.g.: https://www.fb.com/pages/startupzworld"
                                    value={newMember.facebook}
                                    onChange={(e) => setNewMember({ ...newMember, facebook: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Instagram"
                                    placeholder="e.g.: https://www.instagram.com/startupzworld"
                                    value={newMember.instagram}
                                    onChange={(e) => setNewMember({ ...newMember, instagram: e.target.value })}
                                />
                            </div>

                            <div class="col-12 mb-2">
                                <Input
                                    title="Linkedin"
                                    placeholder="e.g.: https://www.linkedin.com/in/pages/startupzworld"
                                    value={newMember.linkedin}
                                    onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {loader && (
                        <div className="py-5">
                            <Loader title="Adding New Member ..." subtitle={`Please wait while we add your ${newMember?.type} member in your team`} />
                        </div>
                    )}

                    {!loader && (
                        <div className="d-flex justify-content-between mt-10">
                            <Button text="Cancel" color="danger" size="sm" onClick={onClose} />
                            <Button text="Add Member" color="success" size="sm" onClick={addNewMember} disabled={!fieldsOkay} />
                        </div>
                    )}
                </div>
            </div>
        </SideModal>
    );
};

export default AddInvestorMember;
