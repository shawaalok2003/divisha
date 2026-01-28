import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Select from "../../../components/Select";
import SideModal from "../../../components/SideModal";
import TextArea from "../../../components/TextArea";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { COMMON_STATUS_TYPES, INVESTOR_MEMBER_TYPES, LOADER_TIMEOUTS } from "../../../constants";
import { ASSETS } from "../../../constants/assets";
import { consoleLogger } from "../../../helpers";

import INVESTOR_MEMBER_API from "../../../api/investor/member";

import useInvestor from "../../../hooks/useInvestor";
import Loader from "../../../components/Loader";
import Picture from "../../../components/Picture";
import UPLOAD_API from "../../../api/upload";

const EditInvestorMember = (props) => {
    const { data = {}, onClose, onSuccess } = props;
    const { investorData } = useInvestor();

    const [editMemberData, setEditMemberData] = useState(null);
    const [editMemberPhoto, setEditMemberPhoto] = useState(false);
    const [fieldsOkay, setFeildsOkay] = useState(false);
    const [loader, setLoader] = useState(false);

    const [imageLoader, setImageLoader] = useState(false);
    const [memberImage, setMemberImage] = useState(null);
    const [signedMemberImage, setSignedMemberImage] = useState(null);

    useEffect(() => {
        setEditMemberData(data);
    }, [data]);

    useEffect(() => {
        let eligible = true;

        if (!editMemberData?.type) eligible = false;
        if (!editMemberData?.firstName) eligible = false;
        if (!editMemberData?.email) eligible = false;
        if (!editMemberData?.mobile) eligible = false;
        if (!editMemberData?.designation) eligible = false;
        if (!editMemberData?.status) eligible = false;

        setFeildsOkay(eligible);
    }, [editMemberData]);

    const handleMemberImageUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: investorData.token, file: files[0], type: "investormember" });

        if (uploadedFile.status === "success") {
            setSignedMemberImage(uploadedFile.data.signedUrl);

            setMemberImage(uploadedFile.data.Key);
            setEditMemberPhoto(false);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("INVESTOR MEMBER PHOTO ERROR:", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleMemberImageUpload });

    const updateMember = async () => {
        setLoader(true);

        try {
            const memberDetails = { ...editMemberData };
            delete memberDetails.photo;

            const { data: updateData } = await INVESTOR_MEMBER_API.updateMember({
                token: investorData.token,
                memberDetails: { ...memberDetails, ...(memberImage && signedMemberImage ? { photo: memberImage } : {}) },
            });

            if (updateData.status === "success") {
                setTimeout(() => {
                    setSignedMemberImage(null);
                    setMemberImage(null);

                    setLoader(false);
                    onSuccess();
                }, LOADER_TIMEOUTS.twoSec);
            }
        } catch (error) {
            consoleLogger("UPDATE INVESTOR MEMBER ERROR: ", error);
            setTimeout(() => {
                setLoader(false);
            }, LOADER_TIMEOUTS.oneSec);
        }
    };

    return (
        <SideModal title="Edit Member" {...props}>
            {editMemberData && (
                <div className="card border-0">
                    <img className="card-img-top" src={ASSETS.bgTeamInfo} alt="Card image cap" />

                    <div className="card-body">
                        {!loader && (
                            <div class="form-row">
                                <div className="col-12">
                                    <label className="font-size-sm text-dark font-weight-semibold mb-1">Photo</label>
                                    {signedMemberImage && (
                                        <div class="col-12 mb-2 text-center">
                                            <Picture src={signedMemberImage} type="thumbnail" className="w-70" />
                                        </div>
                                    )}

                                    {imageLoader && (
                                        <Loader title="Uploading Member Photo" subtitle="Please wait while we upload and save your member photo" />
                                    )}

                                    {!imageLoader && editMemberPhoto && (
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
                                    {!imageLoader && editMemberPhoto && (
                                        <p className="text-center font-size-sm mb-5">
                                            <small>
                                                Recommended size <span className="text-danger font-weight-medium">500px x 500px</span> for better user
                                                experience
                                            </small>
                                        </p>
                                    )}
                                </div>

                                <div class="col-12 mb-2">
                                    <div className="text-center py-5">
                                        {!editMemberPhoto && !signedMemberImage && (
                                            <Picture src={editMemberData.photo || ASSETS.noImage} type="thumbnail" className="w-50" />
                                        )}
                                        <br />
                                        {
                                            <Button
                                                size="sm"
                                                text={!editMemberPhoto ? "Edit" : "Cancel"}
                                                color={!editMemberPhoto ? "warning" : "danger"}
                                                className="my-2"
                                                icon={<i className={`far fa-${!editMemberPhoto ? "edit text-dark" : "times-circle text-white"}`}></i>}
                                                onClick={() => setEditMemberPhoto(!editMemberPhoto)}
                                            />
                                        }
                                    </div>
                                </div>

                                <div class="col-12 mb-2">
                                    <Select
                                        title="Member Type"
                                        options={INVESTOR_MEMBER_TYPES || []}
                                        value={editMemberData.type}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, type: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="First Name"
                                        placeholder="e.g.: Deepak"
                                        value={editMemberData.firstName}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, firstName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Last Name"
                                        placeholder="e.g.: Priyadarshi"
                                        value={editMemberData.lastName}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, lastName: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Email"
                                        placeholder="e.g.: support@tls.com"
                                        value={editMemberData.email}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        type="number"
                                        title="Mobile"
                                        placeholder="e.g.: 919876543210"
                                        value={editMemberData.mobile}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, mobile: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Designation"
                                        placeholder="e.g.: Director"
                                        value={editMemberData.designation}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, designation: e.target.value })}
                                        required
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Qualification"
                                        placeholder="e.g.: Mtech & PHD"
                                        value={editMemberData.qualification}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, qualification: e.target.value })}
                                    />
                                </div>

                                <div class="col-sm-12 mb-2">
                                    <TextArea
                                        title="About"
                                        placeholder="e.g.: Write something about the team member"
                                        value={editMemberData.about}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, about: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Facebook"
                                        placeholder="e.g.: https://www.fb.com/pages/startupzworld"
                                        value={editMemberData.facebook}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, facebook: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Instagram"
                                        placeholder="e.g.: https://www.instagram.com/startupzworld"
                                        value={editMemberData.instagram}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, instagram: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Input
                                        title="Linkedin"
                                        placeholder="e.g.: https://www.linkedin.com/in/pages/startupzworld"
                                        value={editMemberData.linkedin}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, linkedin: e.target.value })}
                                    />
                                </div>

                                <div class="col-12 mb-2">
                                    <Select
                                        title="Status"
                                        options={COMMON_STATUS_TYPES || []}
                                        value={editMemberData.status}
                                        onChange={(e) => setEditMemberData({ ...editMemberData, status: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {loader && (
                            <div className="py-5">
                                <Loader title="Updating Member ..." subtitle={`Please wait while we update your latest member details`} />
                            </div>
                        )}

                        {!loader && (
                            <div className="d-flex justify-content-between mt-10">
                                <Button text="Cancel" color="danger" size="sm" onClick={onClose} />
                                <Button text="Update" color="success" size="sm" onClick={updateMember} disabled={!fieldsOkay} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </SideModal>
    );
};

export default EditInvestorMember;
