import Head from "next/head";
import { useEffect, useState } from "react";

import StartupLayout from "../../../components/layout/StartupLayout";
import Loader from "../../../components/Loader";
import MultiSelect from "../../../components/MultiSelect";
import BusinessPageHeader from "../../../components/BusinessPageHeader";

import COMMON_API from "../../../api/common";
import STARTUP_API from "../../../api/startup/startup";

import { consoleLogger } from "../../../helpers";
import { PAYMENT_METHODS, STARTUP_INTERESTS } from "../../../constants";

import useStartup from "../../../hooks/useStartup";

export default function StartupCategoriesAndServices() {
    const { startup, setStartupDetails } = useStartup();

    const [countries, setCountries] = useState([]);
    const [countrySearchTerm, setCountrySearchTerm] = useState("");

    const [interests, setInterests] = useState(startup?.info?.interests || []);
    const [operationalCountries, setOperationalCountries] = useState(startup?.info?.operationalCountries || []);
    const [paymentMethods, setPaymentMethods] = useState(startup?.info?.paymentMethods || []);

    const [interestLoader, setInterestLoader] = useState(false);
    const [countryLoader, setCountryLoader] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false);

    useEffect(() => {
        COMMON_API.searchCountries({ page: "all", filters: { ...(countrySearchTerm ? { name: countrySearchTerm } : {}) } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCountries(
                        startupResponse.data.map((count) => {
                            return {
                                ...count,
                                value: count.countryId,
                                selected: startup?.info?.operationalCountries.includes(count.countryId),
                            };
                        })
                    );
                } else {
                    setCountries([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCountries([]);
            })
            .finally(() => {});
    }, [countrySearchTerm]);

    const handleStartupCountriesUpdate = (e) => {
        e.preventDefault();
        setCountryLoader(true);

        const updateFields = { ...(operationalCountries ? { operationalCountries } : {}) };

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartupDetails({ info: { ...startup?.info, ...updateFields } });
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
                    setCountryLoader(false);
                }, 2000);
            });
    };

    const handleStartupPaymentMethodsUpdate = (e) => {
        e.preventDefault();
        setPaymentLoader(true);

        const updateFields = { ...(paymentMethods ? { paymentMethods } : {}) };

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartupDetails({ info: { ...startup?.info, ...updateFields } });
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
                    setPaymentLoader(false);
                }, 2000);
            });
    };

    const handleStartupInterestsUpdate = (e) => {
        e.preventDefault();

        setInterestLoader(true);
        const updateFields = { ...(interests ? { interests } : {}) };

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartupDetails({ info: { ...startup?.info, ...updateFields } });
                } else {
                    //
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setInterestLoader(false);
                }, 2000);
            });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Operation & Interests | Startup</title>
                <meta property="og:title" content="Operation & Interests | Startup" key="operation-and-interests-startup" />
            </Head>

            <BusinessPageHeader />

            <div className="mb-10 pt-5">
                <div className="row">
                    {/* Your Interests */}
                    <div className="col-sm-4 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-4">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Your Interests</h5>
                            </div>
                            <div className="card-body pt-2 pb-0 px-0 ">
                                {interestLoader && (
                                    <div className="startups-interests-card">
                                        <div className="py-10 my-10">
                                            <Loader title="Updating Your Interests" subtitle="Please wait while we update your startup interests" />
                                        </div>
                                    </div>
                                )}
                                {!interestLoader && (
                                    <MultiSelect
                                        data={STARTUP_INTERESTS.map((ints) => {
                                            return {
                                                ...ints,
                                                selected: startup?.info?.interests.includes(ints.value),
                                            };
                                        })}
                                        onSelect={(ints) => {
                                            setInterests(ints.filter((interest) => interest.selected).map((interest) => interest.value));
                                        }}
                                        bordered
                                    />
                                )}

                                {!interestLoader && (
                                    <div className="text-center">
                                        <button className="btn btn-sm btn-primary mt-5" onClick={handleStartupInterestsUpdate}>
                                            Save Interests
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Operational Countries */}
                    <div className="col-sm-4 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-4">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Operational Countries</h5>
                            </div>
                            <div className="card-body pt-0 pb-0 px-0 ">
                                {countryLoader && (
                                    <div className="payment-methods-card">
                                        <div className="py-10 my-10">
                                            <Loader
                                                title="Updating Operational Countries"
                                                subtitle="Please wait while we update your startup operational countries"
                                            />
                                        </div>
                                    </div>
                                )}
                                {!countryLoader && (
                                    <>
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                className="form-control mt-2 border"
                                                placeholder="e.g. India"
                                                value={countrySearchTerm}
                                                onChange={(e) => setCountrySearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <MultiSelect
                                            data={countries}
                                            onSelect={(conts) => {
                                                setOperationalCountries(conts.filter((co) => co.selected).map((co) => co.value));
                                            }}
                                            bordered
                                        />
                                    </>
                                )}

                                {!countryLoader && (
                                    <div className="text-center">
                                        <button className="btn btn-sm btn-primary mt-5" onClick={handleStartupCountriesUpdate}>
                                            Save Operational Countries
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="col-sm-4 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-4">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Payment Methods</h5>
                            </div>
                            <div className="card-body pt-2 pb-0 px-0 ">
                                {paymentLoader && (
                                    <div className="payment-methods-card">
                                        <div className="py-10 my-10">
                                            <Loader
                                                title="Updating Payment Methods"
                                                subtitle="Please wait while we update your accepted payment methods"
                                            />
                                        </div>
                                    </div>
                                )}

                                {!paymentLoader && (
                                    <MultiSelect
                                        data={PAYMENT_METHODS.map((pm) => {
                                            return {
                                                ...pm,
                                                selected: startup?.info?.paymentMethods.includes(pm.value),
                                            };
                                        })}
                                        onSelect={(pMethods) => {
                                            setPaymentMethods(pMethods.filter((pm) => pm.selected).map((pm) => pm.value));
                                        }}
                                        bordered
                                    />
                                )}

                                {!paymentLoader && (
                                    <div className="text-center">
                                        <button className="btn btn-sm btn-primary mt-5" onClick={handleStartupPaymentMethodsUpdate}>
                                            Save Payment Methods
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StartupLayout>
    );
}
