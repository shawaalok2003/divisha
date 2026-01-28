import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Popup from "reactjs-popup";

import STARTUP_MEMBER_API from "../../api/startup/member";

import StartupLayout from "../../components/layout/StartupLayout";
import Pagination from "../../components/Pagination";
import useStartup from "../../hooks/useStartup";
import { deleteFileFromS3 } from "../../helpers/storage";
import Swal from "sweetalert2";
import UPLOAD_API from "../../api/upload";
import { useDropzone } from "react-dropzone";
import Loader from "../../components/Loader";
import PageSize from "../../components/PageSize";
import { consoleLogger } from "../../helpers";

export default function StartupTeam() {
    const { startup } = useStartup();

    const [modalStatus, setModalStatus] = useState(false);
    const [members, setMembers] = useState([]);

    const [officeTypesData, setOfficeTypesData] = useState([
        {
            value: "founding",
            name: "Founding",
        },
        {
            value: "mentor",
            name: "Mentor",
        },
        {
            value: "other",
            name: "Other",
        },
    ]);

    const [memberType, setMemberType] = useState("founding");
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberMobile, setMemberMobile] = useState("");
    const [memberDesignation, setMemberDesignation] = useState("");
    const [memberQualification, setMemberQualification] = useState("");
    const [memberAbout, setMemberAbout] = useState("");
    const [memberShare, setMemberShare] = useState("");
    const [memberFacebook, setMemberFacebook] = useState("");
    const [memberInstagram, setMemberInstagram] = useState("");
    const [memberLinkedin, setMemberLinkedin] = useState("");

    const [membersCount, setMembersCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [reload, setReload] = useState(false);

    const [imageLoader, setImageLoader] = useState(false);
    const [teamImage, setTeamImage] = useState("");
    const [signedTeamImage, setSignedTeamImage] = useState("");

    useEffect(() => {
        STARTUP_MEMBER_API.searchStartupMembers({ token: startup.token, page: pageNo, limit: pageSize, filters: { startupId: startup.startupId } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setMembers(startupResponse.data);
                    setMembersCount(startupResponse.count);
                } else {
                    setMembers([]);
                    setMembersCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setMembers([]);
                setMembersCount(0);
            })
            .finally(() => {});
    }, [modalStatus, pageNo, pageSize, reload]);

    const handleTeamImageUpload = useCallback(async (files) => {
        setImageLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: startup.token, file: files[0], type: "teammember" });

        if (uploadedFile.status === "success") {
            setSignedTeamImage(uploadedFile.data.signedUrl);

            setTeamImage(uploadedFile.data.Key);
            setImageLoader(false);
        } else {
            setImageLoader(false);
            consoleLogger("error", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleTeamImageUpload });

    const handleMemberAdd = (e) => {
        e.preventDefault();

        STARTUP_MEMBER_API.addMember({
            token: startup.token,
            ...{
                type: memberType,
                name: memberName,
                email: memberEmail,
                mobile: memberMobile,
                designation: memberDesignation,
                qualification: memberQualification,
                about: memberAbout,
                share: memberShare,
                facebook: memberFacebook,
                instagram: memberInstagram,
                linkedin: memberLinkedin,
                photo: teamImage,
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

                setMemberType("founding");
                setMemberName("");
                setMemberEmail("");
                setMemberMobile("");
                setMemberDesignation("");
                setMemberQualification("");
                setMemberAbout("");
                setMemberFacebook("");
                setMemberInstagram("");
                setMemberLinkedin("");

                setTeamImage("");
                setSignedTeamImage("");
            });
    };

    const handleMemberDelete = (e, member) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to delete this member?",
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_MEMBER_API.removeMember({
                    token: startup.token,
                    startupMemberId: member.startupMemberId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            deleteFileFromS3(member.file);
                            Swal.fire("Member Deleted", "", "success");

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
                <title>Team | Startup</title>
                <meta property="og:title" content="Team | Startup" key="team-startup" />
            </Head>

            <div className="row mb-5">
                <div className="col-lg-6">
                    <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                </div>
                <div className="col-lg-6 text-right">
                    <button className="btn btn-primary" onClick={() => setModalStatus(!modalStatus)}>
                        <i className="fas fa-plus mr-2"></i>Add Member
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="table-responsive bg-white">
                        <table className="table table-hover listing-table">
                            <thead>
                                <tr>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Share %</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Mobile</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members && members.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            <h6 className="pt-5 pb-4 text-danger">No Members Found</h6>
                                        </td>
                                    </tr>
                                )}
                                {members &&
                                    members.map((member, memberIndex) => (
                                        <tr key={`memb-${memberIndex}`}>
                                            <td>
                                                <div className="media align-items-center">
                                                    <a href="#" className="image mr-3">
                                                        <img src={member.photo || "/images/no-image.jpg"} alt={member.name} />
                                                    </a>
                                                    <div className="media-body">
                                                        <div className="text-dark font-size-sm">{member.designation}</div>
                                                        <a className="font-weight-semibold text-link d-block font-size-md name">{member.name}</a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-dark">{member.type.toUpperCase()}</span>
                                            </td>
                                            <td>
                                                <span className="text-dark">{member.share} %</span>
                                            </td>
                                            <td>
                                                <span className="text-dark">{member.email}</span>
                                            </td>
                                            <td>
                                                <span className="text-dark">{member.mobile}</span>
                                            </td>
                                            <td>
                                                <div className="social-icon origin-color si-square">
                                                    <ul className="list-inline text-center">
                                                        <li className="list-inline-item si-facebook">
                                                            <a target="_blank" title="Facebook" href={member.facebook || ""}>
                                                                <i className="fab fa-facebook-f"></i>
                                                                <span>Facebook</span>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item si-google">
                                                            <a target="_blank" title="Instagram" href={member.instagram || ""}>
                                                                <i className="fab fa-instagram"></i>
                                                                <span>Instagram</span>
                                                            </a>
                                                        </li>

                                                        <li className="list-inline-item si-tumblr">
                                                            <a target="_blank" title="Linkedin" href={member.linkedin || ""}>
                                                                <i className="fab fa-linkedin"></i>
                                                                <span>Linkedin</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <a className="btn btn-sm btn-primary text-white" onClick={(e) => handleMemberDelete(e, member)}>
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

            <Pagination count={membersCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />

            {/* Add Member Popup */}
            <Popup open={modalStatus} closeOnDocumentClick={false} onClose={() => setModalStatus(false)}>
                {/* <a className="close text-danger p-3" onClick={() => setModalStatus(false)}>
                            &times;
                        </a> */}
                <div className="rjs-modal p-5">
                    <div className="contact-form">
                        <form>
                            <div className="form-row mb-4">
                                <div className="col-md-6">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                            Member Photo<span className="text-danger">*</span>
                                        </label>
                                    </div>
                                    {teamImage && signedTeamImage && signedTeamImage.includes(".pdf") ? (
                                        <iframe src={signedTeamImage}></iframe>
                                    ) : (
                                        <img src={signedTeamImage} className="pb-5" />
                                    )}

                                    {imageLoader && (
                                        <Loader title="Uploading Document File" subtitle="Please wait while we upload and save your document file" />
                                    )}
                                    {!imageLoader && !teamImage && (
                                        <div className="form-group mb-4 upload-file text-center bg-gray-02">
                                            <div {...getRootProps()} className="pt-10 pb-10">
                                                <input {...getInputProps()} />
                                                {isDragActive ? (
                                                    <p>Drop the files here ...</p>
                                                ) : (
                                                    <p>Drag 'n' drop some files here, or click to select picture</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {!teamImage && (
                                        <p className="text-black text-center font-weight-medium mb-5">
                                            <small>
                                                Recommended size <span className="text-danger font-weight-bold">500px x 500px</span> for better user
                                                experience
                                            </small>
                                        </p>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="office-type" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                            Member Type<span className="text-danger">*</span>
                                        </label>
                                        <select
                                            id="office-type"
                                            className="form-control color-gray"
                                            value={memberType}
                                            onChange={(e) => setMemberType(e.target.value)}
                                        >
                                            {officeTypesData &&
                                                officeTypesData.map((ot, oti) => (
                                                    <option key={`ot-opt-${oti}`} value={ot.value}>
                                                        {ot.name || ""}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="address">
                                                Name<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="address"
                                            className="form-control"
                                            placeholder="Full Name"
                                            value={memberName}
                                            onChange={(e) => setMemberName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="area">
                                                Email<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="area"
                                            className="form-control"
                                            placeholder="Email"
                                            value={memberEmail}
                                            onChange={(e) => setMemberEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Mobile<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            id="area"
                                            className="form-control"
                                            placeholder="Mobile"
                                            value={memberMobile}
                                            onChange={(e) => setMemberMobile(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="mb-2 d-flex align-items-center lh-15">
                                            <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                                Share %<span className="text-danger">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            id="area"
                                            className="form-control"
                                            placeholder="Share Percentage"
                                            value={memberShare}
                                            onChange={(e) => setMemberShare(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row mb-4">
                                <div className="col-sm-6">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15">
                                            Designation<span className="text-danger">*</span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="area"
                                        className="form-control"
                                        placeholder="Designation"
                                        value={memberDesignation}
                                        onChange={(e) => setMemberDesignation(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <div className="mb-2 d-flex align-items-center lh-15">
                                        <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="area">
                                            Qualification<span className="text-danger">*</span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="area"
                                        className="form-control"
                                        placeholder="Qualification"
                                        value={memberQualification}
                                        onChange={(e) => setMemberQualification(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <div className="mb-2 d-flex align-items-center lh-15">
                                    <label className="mb-0 text-dark font-weight-semibold font-size-md lh-15" htmlFor="landmark">
                                        About
                                    </label>
                                </div>
                                <textarea
                                    type="text"
                                    id="landmark"
                                    className="form-control"
                                    placeholder="e.g.: Something about the member"
                                    value={memberAbout}
                                    onChange={(e) => setMemberAbout(e.target.value)}
                                />
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-md-12 mb-2 mb-md-0">
                                    <label htmlFor="facebook" className="font-size-md text-dark font-weight-semibold mb-1">
                                        <i className="fab fa-facebook mr-2"></i>Facebook
                                    </label>
                                    <input
                                        className="form-control"
                                        id="facebook"
                                        type="text"
                                        placeholder="e.g.: https://www.fb.com/pages/startupzworld"
                                        value={memberFacebook}
                                        onChange={(e) => setMemberFacebook(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-md-12 mb-2 mb-md-0">
                                    <label htmlFor="instagram" className="font-size-md text-dark font-weight-semibold mb-1">
                                        <i className="fab fa-instagram mr-2"></i>Instagram
                                    </label>
                                    <input
                                        className="form-control"
                                        id="instagram"
                                        type="text"
                                        placeholder="e.g.: https://www.instagram.com/startupzworld"
                                        value={memberInstagram}
                                        onChange={(e) => setMemberInstagram(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col-md-12 mb-2 mb-md-0">
                                    <label htmlFor="linkedin" className="font-size-md text-dark font-weight-semibold mb-1">
                                        <i className="fab fa-linkedin mr-2"></i>LinkedIn
                                    </label>
                                    <input
                                        className="form-control"
                                        id="linkedin"
                                        type="text"
                                        placeholder="e.g.: https://www.linkedin.com/in/pages/startupzworld"
                                        value={memberLinkedin}
                                        onChange={(e) => setMemberLinkedin(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-10">
                        <div className="col-lg-6">
                            <button className="btn btn-primary" onClick={() => setModalStatus(false)}>
                                Cancel
                            </button>
                        </div>
                        <div className="col-lg-6 text-right">
                            {memberType && memberName && memberEmail && memberMobile && memberDesignation && memberQualification && teamImage && (
                                <button className="btn btn-secondary" onClick={handleMemberAdd}>
                                    Add Member
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>
        </StartupLayout>
    );
}
