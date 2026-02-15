import Head from "next/head";
import { useEffect, useState } from "react";

import StartupLayout from "../../../components/layout/StartupLayout";
import MultiSelect from "../../../components/MultiSelect";
import BusinessPageHeader from "../../../components/BusinessPageHeader";

import { consoleLogger } from "../../../helpers";

import CATEGORY_API from "../../../api/category";
import SERVICE_API from "../../../api/service";
import STARTUP_API from "../../../api/startup/startup";

import useStartup from "../../../hooks/useStartup";
import useToast from "../../../hooks/useToast";
import Loader from "../../../components/Loader";
import Accordian from "../../../components/Accordian";

export default function StartupCategoriesAndServices() {
    const { startup, setStartupDetails } = useStartup();
    const { successToast, errorToast } = useToast();

    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);

    const [categoryLoader, setCategoryLoader] = useState(false);
    const [serviceLoader, setServiceLoader] = useState(false);

    const [startupCategories, setStartupCategories] = useState(startup?.info?.categories || []);
    const [startupServices, setStartupServices] = useState(startup?.info?.services || []);

    useEffect(() => {
        CATEGORY_API.searchCategories({ token: startup.token, page: 0, limit: 10000 })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCategories(
                        startupResponse.data.map((cat) => {
                            return { ...cat, value: cat.categoryId, selected: startupCategories.includes(cat.categoryId) };
                        })
                    );
                } else {
                    setCategories([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCategories([]);
            })
            .finally(() => {});
    }, []);

    useEffect(() => {
        SERVICE_API.searchServices({ token: startup.token, page: 0, limit: 10000, filters: { categoryId: startupCategories } })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    console.log(
                        "SERVICES: ",
                        startupResponse.data.map((serv) => {
                            return { ...serv, value: serv.serviceId, selected: startupServices.includes(serv.serviceId) };
                        })
                    );
                    setServices(
                        startupResponse.data.map((serv) => {
                            return { ...serv, value: serv.serviceId, selected: startupServices.includes(serv.serviceId) };
                        })
                    );

                    //setFilteredServices(startup?.info?.services || []);
                } else {
                    setServices([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setServices([]);
            })
            .finally(() => {});
    }, [startupCategories]);

    const handleStartupCategoriesUpdate = (e, ignoreLoader = false) => {
        e.preventDefault();
        if (!ignoreLoader) setCategoryLoader(true);

        const updateFields = { ...(startupCategories ? { categories: startupCategories } : {}) };

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartupDetails({ info: { ...startup?.info, ...updateFields } });
                    if (!ignoreLoader) setCategoryLoader(false);
                    if (!ignoreLoader) successToast("Categories updated successfully !!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                if (!ignoreLoader) setCategoryLoader(false);
                if (!ignoreLoader) errorToast("Failed to update categories");
            });
    };

    const handleStartupServicesUpdate = (e) => {
        e.preventDefault();
        setServiceLoader(true);

        handleStartupCategoriesUpdate(e, true);
        const updateFields = { ...(startupServices ? { services: startupServices } : {}) };

        STARTUP_API.updateStartupInfo({
            token: startup.token,
            updateFields,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setStartupDetails({ info: { ...startup?.info, ...updateFields } });
                    setServiceLoader(false);
                    successToast("Services updated successfully !!");
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);
                setServiceLoader(false);
                errorToast("Failed to update services");
            });
    };

    return (
        <StartupLayout>
            <Head>
                <title>Categories & Services | Startup</title>
                <meta property="og:title" content="Categories & Services | Startup" key="categories-and-services-startup" />
            </Head>
            <BusinessPageHeader />

            <div className="mb-10 pt-5">
                <div className="row">
                    <div className="col-sm-4 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-4">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Categories</h5>
                            </div>
                            <div className="card-body pt-2 pb-0 px-0 ">
                                <MultiSelect
                                    data={categories}
                                    onSelect={(scats) => {
                                        setStartupCategories(scats.filter((sc) => sc.selected).map((sc) => sc.value));
                                    }}
                                    bordered
                                />

                                {categoryLoader && <Loader title="Updating Categories" subtitle="Please wait while we update your categories" />}

                                <div className="text-center">
                                    <button className="btn btn-sm btn-primary mt-5" onClick={handleStartupCategoriesUpdate}>
                                        Save Categories
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <div className="card rounded-0 border-0 bg-white px-4 pt-3 pb-6">
                            <div className="card-header p-0 bg-transparent">
                                <h5 className="card-title text-capitalize">Services</h5>
                            </div>
                            <div className="card-body px-0 pt-4 pb-0">
                                {startupCategories.length === 0 && <h6 className="text-center text-danger py-5">No Categories Selected</h6>}
                                {services.length === 0 && <h6 className="text-center text-danger py-5">No Services Found For Selected Categories</h6>}

                                {startupCategories.length > 0 &&
                                    services.length > 0 &&
                                    categories
                                        .filter((cat) => startupCategories.includes(cat.categoryId))
                                        .map((sc) => {
                                            return (
                                                <Accordian title={sc?.name}>
                                                    <MultiSelect
                                                        data={services.filter((s) => s.categoryId === sc.categoryId)}
                                                        onSelect={(servs) => {
                                                            setStartupServices(servs.filter((sv) => sv.selected).map((sv) => sv.value));
                                                        }}
                                                        bordered
                                                    />
                                                </Accordian>
                                            );
                                        })}

                                {serviceLoader && <Loader title="Updating Services" subtitle="Please wait while we update your services" />}

                                {startupServices.length !== 0 && (
                                    <div className="text-center">
                                        <button className="btn btn-sm btn-primary mt-5" onClick={handleStartupServicesUpdate}>
                                            Save Services
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
