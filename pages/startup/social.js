import { useEffect, useState } from "react";
import STARTUP_CONTACT_API from "../../api/startup/contact";

import StartupLayout from "../../components/layout/StartupLayout";
import Loader from "../../components/Loader";
import useStartup from "../../hooks/useStartup";
import Head from "next/head";
import STARTUP_API from "../../api/startup/startup";
import Swal from "sweetalert2";
import { consoleLogger } from "../../helpers";
import useToast from "../../hooks/useToast";

export default function StartupSocialContact() {
    const { startup } = useStartup();
    const { successToast, errorToast } = useToast();

    const [emailForm, setEmailForm] = useState(false);
    const [mobileForm, setMobileForm] = useState(false);
    const [websiteForm, setWebsiteForm] = useState(false);
    const [appForm, setAppForm] = useState(false);

    const [emailLoader, setEmailLoader] = useState(false);
    const [mobileLoader, setMobileLoader] = useState(false);
    const [websiteLoader, setWebsiteLoader] = useState(false);
    const [appLoader, setAppLoader] = useState(false);
    const [socialLoader, setSocialLoader] = useState(false);
    const [reload, setReload] = useState(false);

    const [email, setEmail] = useState("");
    const [emailTitle, setEmailTitle] = useState("");
    const [mobile, setMobile] = useState("");
    const [mobileTitle, setMobileTitle] = useState("");
    const [websiteTitle, setWebsiteTitle] = useState("");
    const [website, setWebsite] = useState("");
    const [appTitle, setAppTitle] = useState("");
    const [app, setApp] = useState("");

    const [contactEmails, setContactEmails] = useState([]);
    const [contactMobiles, setContactMobiles] = useState([]);
    const [contactWebsites, setContactWebsites] = useState([]);
    const [contactApps, setContactApps] = useState([]);

    const [socialFacebook, setSocialFacebook] = useState(startup.info?.socialFacebook || "");
    const [socialTwitter, setSocialTwitter] = useState(startup.info?.socialTwitter || "");
    const [socialInstagram, setSocialInstagram] = useState(startup.info?.socialInstagram || "");
    const [socialLinkedin, setSocialLinkedin] = useState(startup.info?.socialLinkedin || "");
    const [socialYoutube, setSocialYoutube] = useState(startup.info?.socialYoutube || "");
    const [socialPinterest, setSocialPinterest] = useState(startup.info?.socialPinterest || "");
    const [socialWhatsapp, setSocialWhatsapp] = useState(startup.info?.socialWhatsapp || "");

    useEffect(() => {
        STARTUP_CONTACT_API.searchStartupContactEmails({ filters: { startupId: startup.startupId } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setContactEmails(startupResponse.data);
                } else {
                    setContactEmails([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setContactEmails([]);
            })
            .finally(() => {});
    }, [emailForm, reload]);

    useEffect(() => {
        STARTUP_CONTACT_API.searchStartupContactMobiles({ filters: { startupId: startup.startupId } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setContactMobiles(startupResponse.data);
                } else {
                    setContactMobiles([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setContactMobiles([]);
            })
            .finally(() => {});
    }, [mobileForm, reload]);

    useEffect(() => {
        STARTUP_CONTACT_API.searchStartupWebsites({ filters: { startupId: startup.startupId } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setContactWebsites(startupResponse.data);
                } else {
                    setContactWebsites([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setContactWebsites([]);
            })
            .finally(() => {});
    }, [websiteForm, reload]);

    useEffect(() => {
        STARTUP_CONTACT_API.searchStartupApps({ filters: { startupId: startup.startupId } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setContactApps(startupResponse.data);
                } else {
                    setContactApps([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setContactApps([]);
            })
            .finally(() => {});
    }, [appForm, reload]);

    const handleEmailAdd = (e) => {
        e.preventDefault();
        setEmailLoader(true);

        STARTUP_CONTACT_API.addEmail({ token: startup.token, contact: email, title: emailTitle })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    successToast("Email added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add email");
            })
            .finally(() => {
                setEmail("");
                setEmailTitle("");
                setEmailForm(false);

                setEmailLoader(false);
            });
    };

    const handleMobileAdd = (e) => {
        e.preventDefault();
        setMobileLoader(true);

        STARTUP_CONTACT_API.addMobile({ token: startup.token, contact: mobile, title: mobileTitle })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    successToast("Mobile added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add mobile");
            })
            .finally(() => {
                setMobile("");
                setMobileTitle("");
                setMobileForm(false);

                setMobileLoader(false);
            });
    };

    const handleWebsiteAdd = (e) => {
        e.preventDefault();
        setWebsiteLoader(true);

        STARTUP_CONTACT_API.addWebsite({ token: startup.token, contact: website, title: websiteTitle })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    successToast("Website added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add website");
            })
            .finally(() => {
                setWebsite("");
                setWebsiteTitle("");
                setWebsiteForm(false);

                setWebsiteLoader(false);
            });
    };

    const handleAppAdd = (e) => {
        e.preventDefault();
        setAppLoader(true);

        STARTUP_CONTACT_API.addApp({ token: startup.token, contact: app, title: appTitle })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    successToast("App added successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to add app");
            })
            .finally(() => {
                setApp("");
                setAppTitle("");
                setAppForm(false);

                setAppLoader(false);
            });
    };

    const handleStartupInfoUpdate = (e) => {
        e.preventDefault();
        setSocialLoader(true);

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields: {
                ...(socialFacebook ? { socialFacebook } : {}),
                ...(socialTwitter ? { socialTwitter } : {}),
                ...(socialInstagram ? { socialInstagram } : {}),
                ...(socialLinkedin ? { socialLinkedin } : {}),
                ...(socialYoutube ? { socialYoutube } : {}),
                ...(socialPinterest ? { socialPinterest } : {}),
                ...(socialWhatsapp ? { socialWhatsapp } : {}),
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setReload(!reload);
                    successToast("Social links updated successfully!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                errorToast("Failed to update social links");
            })
            .finally(() => {
                setSocialLoader(false);
            });
    };

    const handleSocialDelete = (e, social) => {
        e.preventDefault();

        Swal.fire({
            title: `Are you sure you want to delete "${social.title}"?`,
            showCancelButton: true,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "Yes! Delete",
            cancelButtonText: "No! Cancel",
        }).then((result) => {
            if (result.isDenied) {
                STARTUP_CONTACT_API.deleteContact({
                    token: startup.token,
                    contactType: social.type,
                    startupContactId: social.startupContactId,
                })
                    .then((results) => {
                        const startupResponse = results.data;

                        if (startupResponse.status === "success") {
                            setReload(!reload);
                            successToast(`${social.title} deleted successfully!`);
                        }
                    })
                    .catch((error) => {
                        consoleLogger("STARTUPS ERROR: ", error);
                        errorToast(`Failed to delete ${social.title}`);
                    });
            } else {
                Swal.close();
            }
        });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Social & Contact | Startup</title>
                <meta property="og:title" content="Social & Contact | Startup" key="social-and-contact-startup" />
            </Head>

            <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    {/* Emails */}
                    <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                        <div className="card-header p-0 bg-transparent d-flex justify-content-between align-items-center pb-3">
                            <h5 className="card-title text-capitalize">Emails</h5>
                            {!emailForm && (
                                <button className="btn btn-primary btn-sm" onClick={() => setEmailForm(!emailForm)}>
                                    <i className="fas fa-plus mr-2"></i>Add Email
                                </button>
                            )}
                        </div>
                        <div className="card-body px-0 pt-4 pb-0">
                            <div className="">
                                {emailLoader && <Loader title="Adding Email" subtitle="Please wait while we add the email" />}
                                {emailForm && !emailLoader && (
                                    <form className="mb-10">
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="email-name" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Email Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="email-name"
                                                    type="text"
                                                    placeholder="e.g. CEO Email, Support Email, etc"
                                                    value={emailTitle}
                                                    onChange={(e) => setEmailTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="email" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Email Address
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="email"
                                                    type="email"
                                                    placeholder="e.g. support@startxv.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mt-5">
                                            <div className="col-lg-6">
                                                <button className="btn btn-primary" onClick={() => setEmailForm(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                {email && emailTitle && (
                                                    <button className="btn btn-secondary" onClick={handleEmailAdd}>
                                                        Add Email
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {contactEmails && contactEmails.length === 0 && (
                                    <div className="text-center">
                                        <span className="alert bg-secondary">You haven't added any email</span>
                                    </div>
                                )}

                                {contactEmails &&
                                    contactEmails.map((email, emailIndex) => (
                                        <div className="form-row mb-5" key={`stw-mob-${emailIndex}`}>
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                    {email.title ? email.title : `Email ${emailIndex + 1}`}
                                                </label>
                                                <div className="d-flex align-items-center">
                                                    <input className="form-control" type="text" defaultValue={email.contact || ""} disabled />
                                                    <a className="btn btn-primary text-white ml-2" onClick={(e) => handleSocialDelete(e, email)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobiles */}
                    <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6 mt-5">
                        <div className="card-header p-0 bg-transparent d-flex justify-content-between align-items-center pb-3">
                            <h5 className="card-title text-capitalize">Mobiles</h5>
                            {!mobileForm && (
                                <button className="btn btn-primary btn-sm" onClick={() => setMobileForm(!mobileForm)}>
                                    <i className="fas fa-plus mr-2"></i>Add Mobile
                                </button>
                            )}
                        </div>
                        <div className="card-body px-0 pt-4 pb-0">
                            <div className="">
                                {mobileLoader && <Loader title="Adding Mobile" subtitle="Please wait while we add the mobile" />}
                                {mobileForm && !mobileLoader && (
                                    <form className="mb-10">
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="mobile-name" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Mobile Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="mobile-name"
                                                    type="text"
                                                    placeholder="e.g. Support Mobile, CEO Mobile, etc"
                                                    value={mobileTitle}
                                                    onChange={(e) => setMobileTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="mobile-no" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Mobile No
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="mobile-no"
                                                    type="number"
                                                    placeholder="Enter Mobile No"
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mt-5">
                                            <div className="col-lg-6">
                                                <button className="btn btn-primary" onClick={() => setMobileForm(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                {mobile && mobileTitle && (
                                                    <button className="btn btn-secondary" onClick={handleMobileAdd}>
                                                        Add Mobile
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {contactMobiles && contactMobiles.length === 0 && (
                                    <div className="text-center">
                                        <span className="alert bg-secondary">You haven't added any mobile</span>
                                    </div>
                                )}

                                {contactMobiles &&
                                    contactMobiles.map((mobile, mobileIndex) => (
                                        <div className="form-row mb-5" key={`stw-mob-${mobileIndex}`}>
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                    {mobile.title ? mobile.title : `Mobile ${mobileIndex + 1}`}
                                                </label>
                                                <div className="d-flex align-items-center">
                                                    <input className="form-control" type="number" defaultValue={mobile.contact || ""} disabled />
                                                    <a className="btn btn-primary text-white ml-2" onClick={(e) => handleSocialDelete(e, mobile)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Websites */}
                    <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6 mt-5">
                        <div className="card-header p-0 bg-transparent d-flex justify-content-between align-items-center pb-3">
                            <h5 className="card-title text-capitalize">Websites</h5>
                            {!websiteForm && (
                                <button className="btn btn-primary btn-sm" onClick={() => setWebsiteForm(!websiteForm)}>
                                    <i className="fas fa-plus mr-2"></i>Add Website
                                </button>
                            )}
                        </div>
                        <div className="card-body px-0 pt-4 pb-0">
                            <div className="">
                                {websiteLoader && <Loader title="Adding Website" subtitle="Please wait while we add the website" />}
                                {websiteForm && !websiteLoader && (
                                    <form className="mb-10">
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="website" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Website Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="website"
                                                    type="text"
                                                    placeholder="e.g. Support Website, Seller Website, etc"
                                                    value={websiteTitle}
                                                    onChange={(e) => setWebsiteTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="website" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Website URL
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="website"
                                                    type="text"
                                                    placeholder="e.g. https://www.startxv.com"
                                                    value={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mt-5">
                                            <div className="col-lg-6">
                                                <button className="btn btn-primary" onClick={() => setWebsiteForm(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                {website && websiteTitle && (
                                                    <button className="btn btn-secondary" onClick={handleWebsiteAdd}>
                                                        Add Website
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {contactWebsites && contactWebsites.length === 0 && (
                                    <div className="text-center">
                                        <span className="alert bg-secondary">You haven't added any website urls</span>
                                    </div>
                                )}

                                {contactWebsites &&
                                    contactWebsites.map((website, websiteIndex) => (
                                        <div className="form-row mb-5" key={`stw-mob-${websiteIndex}`}>
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                    {website.title ? website.title : `Website ${websiteIndex + 1}`}
                                                </label>
                                                <div className="d-flex align-items-center">
                                                    <input className="form-control" type="text" defaultValue={website.contact || ""} disabled />
                                                    <a className="btn btn-primary text-white ml-2" onClick={(e) => handleSocialDelete(e, website)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Apps */}
                    <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6 mt-5">
                        <div className="card-header p-0 bg-transparent d-flex justify-content-between align-items-center pb-3">
                            <h5 className="card-title text-capitalize">Apps</h5>
                            {!appForm && (
                                <button className="btn btn-primary btn-sm" onClick={() => setAppForm(!appForm)}>
                                    <i className="fas fa-plus mr-2"></i>Add App
                                </button>
                            )}
                        </div>
                        <div className="card-body px-0 pt-4 pb-0">
                            <div className="">
                                {appLoader && <Loader title="Adding App" subtitle="Please wait while we add the app" />}
                                {appForm && !appLoader && (
                                    <form className="mb-10">
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="app-title" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    App Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="app-title"
                                                    type="text"
                                                    placeholder="e.g. Delivery App, Customer App, etc"
                                                    value={appTitle}
                                                    onChange={(e) => setAppTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label htmlFor="app" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    App URL
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="app"
                                                    type="text"
                                                    placeholder="e.g. https://play.google.com/store/apps/details?id=world.startupz.www"
                                                    value={app}
                                                    onChange={(e) => setApp(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mt-5">
                                            <div className="col-lg-6">
                                                <button className="btn btn-primary" onClick={() => setAppForm(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                {app && appTitle && (
                                                    <button className="btn btn-secondary" onClick={handleAppAdd}>
                                                        Add App
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {contactApps && contactApps.length === 0 && (
                                    <div className="text-center">
                                        <span className="alert bg-secondary">You haven't added any App links</span>
                                    </div>
                                )}

                                {contactApps &&
                                    contactApps.map((app, appIndex) => (
                                        <div className="form-row mb-5" key={`stw-mob-${appIndex}`}>
                                            <div className="col-md-12 mb-2 mb-md-0">
                                                <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                    {app.title ? app.title : `App ${appIndex + 1}`}
                                                </label>

                                                <div className="d-flex align-items-center">
                                                    <input className="form-control" type="text" defaultValue={app.contact || ""} disabled />
                                                    <a className="btn btn-primary text-white ml-2" onClick={(e) => handleSocialDelete(e, app)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card rounded-0 border-0 bg-white px-4 pt-3">
                        <div className="card-header p-0 bg-transparent d-flex justify-content-between align-items-center pb-3">
                            <h5 className="card-title text-capitalize">Social</h5>
                        </div>
                        <div className="card-body px-0 pt-4 pb-0">
                            {socialLoader && <Loader title="Updating Social Info" subtitle="Please wait while we update your social info" />}
                            {!socialLoader && (
                                <div className="mb-10">
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-facebook mr-2"></i>Facebook
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://www.fb.com/pages/startupzworld"
                                                value={socialFacebook}
                                                onChange={(e) => setSocialFacebook(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-twitter mr-2"></i>Twitter
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://www.twitter.com/startupzworld"
                                                value={socialTwitter}
                                                onChange={(e) => setSocialTwitter(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-instagram mr-2"></i>Instagram
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://www.instagram.com/startupzworld"
                                                value={socialInstagram}
                                                onChange={(e) => setSocialInstagram(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-linkedin mr-2"></i>LinkedIn
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://www.linkedin.com/in/pages/startupzworld"
                                                value={socialLinkedin}
                                                onChange={(e) => setSocialLinkedin(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-youtube mr-2"></i>Youtube
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://www.youtube.com/channel/startupzworld"
                                                value={socialYoutube}
                                                onChange={(e) => setSocialYoutube(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-pinterest mr-2"></i>Pinterest
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://www.pinterest.com/startupzworld"
                                                value={socialPinterest}
                                                onChange={(e) => setSocialPinterest(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mb-4">
                                        <div className="col-md-12 mb-2 mb-md-0">
                                            <label className="font-size-md text-dark font-weight-semibold mb-1">
                                                <i className="fab fa-whatsapp mr-2"></i>WhatsApp
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="e.g.: https://api.whatsapp.com/mobile/9876543210"
                                                value={socialWhatsapp}
                                                onChange={(e) => setSocialWhatsapp(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row mt-5">
                                        <div className="col-lg-6"></div>
                                        <div className="col-lg-6 text-right">
                                            <button className="btn btn-secondary" onClick={handleStartupInfoUpdate}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StartupLayout>
    );
}
