import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import STARTUP_API from "../../../api/startup/startup";

import StartupLayout from "../../../components/layout/StartupLayout";
import Loader from "../../../components/Loader";
import BusinessPageHeader from "../../../components/BusinessPageHeader";
import { getFormattedDateOnly } from "../../../helpers/date";
import useStartup from "../../../hooks/useStartup";
import COMMON_API from "../../../api/common";
import UPLOAD_API from "../../../api/upload";
import { consoleLogger } from "../../../helpers";

export default function StartupBusinessInfo() {
    const { startup } = useStartup();

    const countriesData = [
        {
            countryId: 1,
            name: "India",
            shortName: "IN",
            mobileCode: "91",
        },
    ];

    const businessTypesData = [
        {
            countryId: 1,
            name: "Unregistered",
            value: "unregistered",
        },
        {
            countryId: 1,
            name: "LLP - Limited Liability Partnership",
            value: "llp",
        },
        {
            countryId: 1,
            name: "Private Limited",
            value: "private",
        },
        {
            countryId: 1,
            name: "Partnership",
            value: "partnership",
        },
        {
            countryId: 1,
            name: "Sole Proprietorship",
            value: "sproprietorship",
        },
    ];

    const businessNatureData = [
        {
            countryId: 1,
            name: "Service",
            value: "service",
        },
        {
            countryId: 1,
            name: "Product",
            value: "product",
        },
        {
            countryId: 1,
            name: "Both",
            value: "both",
        },
    ];

    const businessModelData = [
        {
            countryId: 1,
            name: "B2B - Business to Business",
            value: "b2b",
        },
        {
            countryId: 1,
            name: "B2C - Business to Consumer",
            value: "b2c",
        },
        {
            countryId: 1,
            name: "B2B2C - Business to Business to Customer",
            value: "b2b2c",
        },
        {
            countryId: 1,
            name: "C2C - Consumer to Consumer",
            value: "c2c",
        },
        {
            countryId: 1,
            name: "C2B - Consumer to Business",
            value: "c2b",
        },
        {
            countryId: 1,
            name: "B2A - Business to Administration",
            value: "b2a",
        },
        {
            countryId: 1,
            name: "C2A - Customer to Administration",
            value: "c2a",
        },
        {
            countryId: 1,
            name: "Other",
            value: "other",
        },
    ];

    const businessStageData = [
        {
            name: "Ideation",
            value: "ideation",
        },
        {
            name: "Validation",
            value: "validation",
        },
        {
            name: "Early Traction",
            value: "etraction",
        },
        {
            name: "Scaling",
            value: "scaling",
        },
    ];

    /* Pre-Defined Data */
    const [countries, setCountries] = useState(countriesData || []);
    const [businessTypes, setBusinessTypes] = useState(businessTypesData || []);

    const [loader, setLoader] = useState(false);
    const [infoLoader, setInfoLoader] = useState(false);
    const [keywordsLoader, setKeywordsLoader] = useState(false);

    const [logoModal, setLogoModal] = useState(false);
    const [logoLoader, setLogoLoader] = useState(false);

    const [countryId, setCountryId] = useState(startup.countryId || "");
    const [name, setName] = useState(startup.name || "");
    const [legalName, setLegalName] = useState(startup.legalName || "");
    const [businessType, setBusinessType] = useState(startup.businessType || "");
    const [businessNature, setBusinessNature] = useState(startup.businessNature || "");
    const [businessModel, setBusinessModel] = useState(startup.businessModel || "");
    const [stage, setStage] = useState(startup.stage || "");
    const [startDate, setStartDate] = useState(getFormattedDateOnly(startup.startDate) || "");
    const [logo, setLogo] = useState(startup.logo || "");
    const [signedLogo, setSignedLogo] = useState("");
    const [intro, setIntro] = useState(startup?.info?.intro?.replace(/&quot;/g, `"`).replace(/&apos;/g, `'`) || "");
    const [aboutUs, setAboutUs] = useState(startup?.info?.about?.replace(/&quot;/g, `"`).replace(/&apos;/g, `'`) || "");
    const [keywords, setKeywords] = useState(startup?.info?.keywords.join(", ") || "");
    const [brokenKeywords, setBrokenKeywords] = useState([]);

    const handleStartupUpdate = (e) => {
        if (e) e.preventDefault();
        setLoader(true);

        STARTUP_API.updateStartup({
            token: startup.token,
            updateFields: {
                ...(countryId ? { countryId } : {}),
                ...(name ? { name } : {}),
                ...(legalName ? { legalName } : {}),
                ...(businessType ? { businessType } : {}),
                ...(businessNature ? { businessNature } : {}),
                ...(businessModel ? { businessModel } : {}),
                ...(stage ? { stage } : {}),
                ...(startDate ? { startDate } : {}),
                //...(logo ? { logo } : {}),
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    //
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                //
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, 2000);
            });
    };

    const handleStartupInfoUpdate = (e) => {
        e.preventDefault();
        setInfoLoader(true);

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields: {
                ...(intro ? { intro: intro.replace(/"/g, "&quot;").replace(/'/g, "&apos;") } : {}),
                ...(aboutUs ? { about: aboutUs.replace(/"/g, "&quot;").replace(/'/g, "&apos;") } : {}),
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    //
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                //
            })
            .finally(() => {
                setTimeout(() => {
                    setInfoLoader(false);
                }, 2000);
            });
    };

    const handleStartupKeywordsUpdate = (e) => {
        e.preventDefault();
        setKeywordsLoader(true);

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields: {
                ...(keywords ? { keywords: keywords.split(",") } : {}),
            },
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    //
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                //
            })
            .finally(() => {
                setTimeout(() => {
                    setKeywordsLoader(false);
                }, 2000);
            });
    };

    const handleStartupLogoUpload = useCallback(async (files) => {
        setLogoLoader(true);

        if (!files || (files && files.length === 0)) return;

        const { data: uploadedFile } = await UPLOAD_API.uploadFileToAWS({ token: startup.token, file: files[0], type: "startuplogo" });

        if (uploadedFile.status === "success") {
            setSignedLogo(uploadedFile.data.signedUrl);

            setLogo(uploadedFile.data.Key);
            setLogoLoader(false);
            setLogoModal(false);

            await STARTUP_API.updateStartup({ token: startup.token, updateFields: { logo: uploadedFile.data.Key } });
        } else {
            setLogoLoader(false);
            setLogoModal(false);
            consoleLogger("error", err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, onDrop: handleStartupLogoUpload });

    useEffect(() => {
        setBrokenKeywords(keywords.split(","));
    }, [keywords]);

    useEffect(() => {
        COMMON_API.searchCountries({ page: 0, limit: 10000, filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCountries(startupResponse.data);
                } else {
                    setCountries([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCountries([]);
            })
            .finally(() => {});
    }, []);

    return (
        <StartupLayout>
            <Head>
                <title>Business Info | Startup</title>
                <meta property="og:title" content="Business Info | Startup" key="business-info-startup" />
            </Head>
            <BusinessPageHeader />

            <div className="mb-10 pt-5">
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Business Details</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {loader && <Loader title="Updating Business Details" subtitle="Please wait while we update your business details" />}
                                {!loader && (
                                    <div className="">
                                        <div className="form-group mb-4">
                                            <label htmlFor="country-list" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                Country<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="country-list"
                                                className="form-control color-gray"
                                                value={countryId}
                                                onChange={(e) => setCountryId(e.target.value)}
                                            >
                                                <option value="">Select Country</option>
                                                {countries &&
                                                    countries.map((country, countryIndex) => (
                                                        <option key={`stw-country-${countryIndex}`} value={country.countryId}>
                                                            {country.name || ""}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-legal-name" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Business / Brand Name<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-legal-name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row mb-2">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <label htmlFor="business-legal-name" className="font-size-md text-dark font-weight-semibold mb-1">
                                                    Business Legal Name<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="business-legal-name"
                                                    type="text"
                                                    value={legalName}
                                                    onChange={(e) => setLegalName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="business-type" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                Business Type<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="business-type"
                                                className="form-control color-gray"
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                            >
                                                <option value="">Select Business Type</option>
                                                {businessTypes &&
                                                    businessTypes.map((btype, btIndex) => (
                                                        <option key={`stw-btype-${btIndex}`} value={btype.value}>
                                                            {btype.name || ""}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="business-model" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                Business Model<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="business-model"
                                                className="form-control color-gray"
                                                value={businessModel}
                                                onChange={(e) => setBusinessModel(e.target.value)}
                                            >
                                                <option value="">Select Business Model</option>
                                                {businessModelData &&
                                                    businessModelData.map((bmodel, btIndex) => (
                                                        <option key={`stw-bmtype-${btIndex}`} value={bmodel.value}>
                                                            {bmodel.name || ""}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="business-nature" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                Business Nature<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="business-nature"
                                                className="form-control color-gray"
                                                value={businessNature}
                                                onChange={(e) => setBusinessNature(e.target.value)}
                                            >
                                                <option value="">Select Business Nature</option>
                                                {businessNatureData &&
                                                    businessNatureData.map((bnature, bnIndex) => (
                                                        <option key={`stw-bnature-${bnIndex}`} value={bnature.value}>
                                                            {bnature.name || ""}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="business-stage" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                Stage<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="business-stage"
                                                className="form-control color-gray"
                                                value={stage}
                                                onChange={(e) => setStage(e.target.value)}
                                            >
                                                <option value="">Select Business Stage</option>
                                                {businessStageData &&
                                                    businessStageData.map((bstage, bsIndex) => (
                                                        <option key={`stw-bstage-${bsIndex}`} value={bstage.value}>
                                                            {bstage.name || ""}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="business-start-date" className="text-dark font-weight-semibold font-size-md mb-2 lh-15">
                                                Started / Established On<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="start-date"
                                                className="form-control"
                                                placeholder="Enter Start / Establishment Date"
                                                max={getFormattedDateOnly(new Date().toISOString())}
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>

                                        <button className="btn btn-secondary btn-block font-size-lg mt-5" onClick={handleStartupUpdate}>
                                            Save Change
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {/* Logo */}
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Logo</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {!logoModal && !logoLoader && !signedLogo && (
                                    <div className="profile media d-flex align-items-center flex-column">
                                        <div className="image mb-4 text-center">
                                            <img
                                                src={startup.logo || "/images/no-image.jpg"}
                                                alt="Startup Logo "
                                                className="rounded-circle w-50 border p-1 bg-gray-02 shadow-sm"
                                                onError={(e) => (e.target.src = "/images/no-image.jpg")}
                                            />
                                        </div>
                                        <div className="media-body d-flex flex-wrap">
                                            <div className="upload-btn-wrapper mr-4 mb-4">
                                                <button className="btn btn-primary px-4 font-size-md" onClick={() => setLogoModal(true)}>
                                                    Upload Logo
                                                </button>
                                                {/* <input type="file" name="myfile" /> */}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {logo && signedLogo && (
                                    <div className="profile media d-flex align-items-center flex-column">
                                        <div className="image mb-4 text-center">
                                            <img
                                                src={signedLogo}
                                                alt="User image"
                                                className="rounded-circle w-50 border p-1 bg-gray-02 shadow-sm"
                                                onError={(e) => (e.target.src = "/images/no-image.jpg")}
                                            />
                                        </div>
                                    </div>
                                )}

                                {logoModal && !logoLoader && (
                                    <>
                                        <div className="form-group mb-4 upload-file text-center bg-gray-02">
                                            <div {...getRootProps()} className="pt-10 pb-10">
                                                <input {...getInputProps()} />
                                                {isDragActive ? (
                                                    <p>Drop the logo here ...</p>
                                                ) : (
                                                    <p>Drag 'n' drop logo file here, or click to select logo</p>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-center text-black font-weight-medium mt-5">
                                            Recommended size <span className="text-danger font-weight-bold">500px x 500px</span> for better user
                                            experience
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Intro & About Us */}
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6 mt-5">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Intro & About Us</h5>
                            </div>
                            <div className="card-body px-0 pb-0">
                                {infoLoader && <Loader title="Updating Business Info" subtitle="Please wait while we update your business info" />}
                                {!infoLoader && (
                                    <>
                                        <h6 className="text-gray">Intro ( Max 50 characters)</h6>
                                        <div className="form-row mb-4">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <textarea
                                                    className="form-control"
                                                    rows={1}
                                                    value={intro}
                                                    onChange={(e) => {
                                                        const tIncChars = e.target.value;

                                                        if (tIncChars.length <= 50) {
                                                            setIntro(e.target.value);
                                                        }
                                                    }}
                                                ></textarea>
                                                <div className="text-primary font-weight-semibold text-right">
                                                    {50 - intro.length} characters left
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="text-gray">About Us</h6>
                                        <div className="form-row mb-4">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <textarea
                                                    className="form-control"
                                                    rows={9}
                                                    value={aboutUs}
                                                    onChange={(e) => setAboutUs(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button className="btn btn-secondary btn-block font-size-lg" onClick={handleStartupInfoUpdate}>
                                            Save Change
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keywords */}
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6 mt-5">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Keywords</h5>
                            </div>
                            <div className="card-body px-0 pb-0">
                                {keywordsLoader && (
                                    <Loader title="Updating Business Keywords" subtitle="Please wait while we update your business keywords" />
                                )}
                                {!keywordsLoader && (
                                    <>
                                        <div className="form-row mb-5 d-flex">
                                            {brokenKeywords.map((bk, bkIndex) => (
                                                <span className="bg-primary text-white pl-2 pr-2 mr-2 mb-2 rounded">{bk}</span>
                                            ))}
                                        </div>

                                        <div className="form-row mb-5">
                                            <div className="col-sm-12 mb-2 mb-sm-0">
                                                <textarea
                                                    className="form-control"
                                                    rows={5}
                                                    value={keywords}
                                                    onChange={(e) => setKeywords(e.target.value)}
                                                    placeholder="Add each keyword with comma separated. e.g. businees, startup, technology, etc."
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button className="btn btn-secondary float-right font-size-lg" onClick={handleStartupKeywordsUpdate}>
                                            Save Keywords
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StartupLayout>
    );
}
