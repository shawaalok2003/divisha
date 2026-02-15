import { useEffect, useState } from "react";

import SideModal from "../../../components/SideModal";
import Accordian from "../../../components/Accordian";
import MultiSelect from "../../../components/MultiSelect";
import Button from "../../../components/Button";

import INVESTOR_PREFERENCE_API from "../../../api/investor/preference";
import CATEGORY_API from "../../../api/category";

import { consoleLogger } from "../../../helpers";
import { BUSINESS_MODEL_DATA, FINANCIAL_TYPES, LOADER_TIMEOUTS, STARTUP_NATURES, STARTUP_STAGES } from "../../../constants";

import useInvestor from "../../../hooks/useInvestor";
import COUNTRY_API from "../../../api/country";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input";

const InvestorStartupPreference = (props) => {
    const { investorData } = useInvestor();

    const formatDataForMultiSelect = (co) => {
        return co.map((c) => {
            return {
                ...c,
                title: c.name,
                selected: false,
            };
        });
    };

    const [countries, setCountries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [businessNatures, setBusinessNatures] = useState(formatDataForMultiSelect(STARTUP_NATURES));
    const [businessTypes, setBusinessTypes] = useState(formatDataForMultiSelect(BUSINESS_MODEL_DATA));
    const [stages, setStages] = useState(formatDataForMultiSelect(STARTUP_STAGES));
    const [financialTypes, setFinancialTypes] = useState(formatDataForMultiSelect(FINANCIAL_TYPES));
    const [preference, setPreference] = useState(null);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoader(true);

            /* Get Countries */
            const { data: counts } = await COUNTRY_API.getCountries({ token: investorData.token, page: 0, limit: 10000, filters: {} });
            if (counts?.status === "success") setCountries(formatDataForMultiSelect(counts.data));

            /* Get Categories */
            const { data: cats } = await CATEGORY_API.searchCategories({ token: investorData.token, page: 0, limit: 10000 });
            if (cats?.status === "success") setCategories(formatDataForMultiSelect(cats.data));

            const { data: prefs } = await INVESTOR_PREFERENCE_API.getPreference({ token: investorData.token });

            if (prefs?.status === "success") {
                setPreference(prefs.data);

                // Update Countries List With Already Selected Countries
                if (Array.isArray(prefs.data.countries)) {
                    setCountries(
                        formatDataForMultiSelect(counts.data).map((con) => {
                            return { ...con, selected: prefs.data.countries.includes(con.countryId) };
                        })
                    );
                }

                // Update Categories List With Already Selected Categories
                if (Array.isArray(prefs.data.categories)) {
                    setCategories(
                        formatDataForMultiSelect(cats.data).map((cat) => {
                            return { ...cat, selected: prefs.data.categories.includes(cat.categoryId) };
                        })
                    );
                }

                // Update Business Natures List With Already Selected Business Natures
                if (Array.isArray(prefs.data.businessNatures)) {
                    setBusinessNatures(
                        formatDataForMultiSelect(STARTUP_NATURES).map((bn) => {
                            return { ...bn, selected: prefs.data.businessNatures.includes(bn.value) };
                        })
                    );
                }

                // Update Business Stages List With Already Selected Business Stages
                if (Array.isArray(prefs.data.stages)) {
                    setStages(
                        formatDataForMultiSelect(STARTUP_STAGES).map((bn) => {
                            return { ...bn, selected: prefs.data.stages.includes(bn.value) };
                        })
                    );
                }

                // Update Business Types List With Already Selected Business Types
                if (Array.isArray(prefs.data.businessTypes)) {
                    setBusinessTypes(
                        formatDataForMultiSelect(BUSINESS_MODEL_DATA).map((bn) => {
                            return { ...bn, selected: prefs.data.businessTypes.includes(bn.value) };
                        })
                    );
                }

                // Update Financial Types List With Already Selected Financial Types
                if (Array.isArray(prefs.data.financialTypes)) {
                    setFinancialTypes(
                        formatDataForMultiSelect(FINANCIAL_TYPES).map((bn) => {
                            return { ...bn, selected: prefs.data.financialTypes.includes(bn.value) };
                        })
                    );
                }
            }

            setLoader(false);
        };

        fetchAllData();
    }, []);

    const handlePreferenceUpdate = () => {
        setLoader(true);

        INVESTOR_PREFERENCE_API.updatePreference({
            token: investorData.token,
            preference,
        })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setReload(!reload);
                    setTimeout(() => {
                        //onSuccess();
                    }, LOADER_TIMEOUTS.twoSec);
                }
            })
            .catch((error) => {
                consoleLogger("UPDATE INVESTOR PREFERENCE ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.twoSec);
            });
    };

    return (
        <SideModal title={"Startup Preferences"} {...props}>
            {loader && (
                <div className="py-10 px-5">
                    <Loader title="Updating Preference . . ." subtitle="Please wait while we save your startup preference" />
                </div>
            )}

            {!loader && (
                <div className="p-3">
                    <Accordian title="BUSINESS TYPE" scrollable open>
                        <MultiSelect
                            data={businessTypes}
                            onSelect={(selectedData) => {
                                setPreference({
                                    ...preference,
                                    businessTypes: selectedData.filter((c) => c?.selected === true).map((c) => c.value),
                                });
                            }}
                        />
                    </Accordian>

                    <Accordian title="BUSINESS NATURE" scrollable open>
                        <MultiSelect
                            data={businessNatures}
                            onSelect={(selectedData) => {
                                setPreference({
                                    ...preference,
                                    businessNatures: selectedData.filter((c) => c?.selected === true).map((c) => c.value),
                                });
                            }}
                        />
                    </Accordian>

                    <Accordian title="BUSINESS STAGE" scrollable open>
                        <MultiSelect
                            data={stages}
                            onSelect={(selectedData) => {
                                setPreference({
                                    ...preference,
                                    stages: selectedData.filter((c) => c?.selected === true).map((c) => c.value),
                                });
                            }}
                        />
                    </Accordian>

                    <Accordian title="FINANCIAL TYPE" scrollable open>
                        <MultiSelect
                            data={financialTypes}
                            onSelect={(selectedData) => {
                                setPreference({
                                    ...preference,
                                    financialTypes: selectedData.filter((c) => c?.selected === true).map((c) => c.value),
                                });
                            }}
                        />
                    </Accordian>

                    <Accordian title="MONTHLY REVENUE" scrollable open>
                        <Input
                            type="number"
                            title="Minimun"
                            placeholder={"e.g.: 2500"}
                            min={0}
                            defaultValue={preference?.monthlyRevenueRange[0]}
                            onChange={(e) => {
                                setPreference({
                                    ...preference,
                                    monthlyRevenueRange: [parseInt(e.target.value || 0), preference?.monthlyRevenueRange[1]],
                                });
                            }}
                        />

                        <Input
                            type="number"
                            title="Maximum"
                            placeholder={"e.g.: 5000"}
                            min={preference?.monthlyRevenueRange[0] || 0}
                            defaultValue={preference?.monthlyRevenueRange[1]}
                            onChange={(e) => {
                                setPreference({
                                    ...preference,
                                    monthlyRevenueRange: [
                                        preference?.monthlyRevenueRange[0],
                                        parseInt(e.target.value || 0) < preference?.monthlyRevenueRange[0]
                                            ? preference?.monthlyRevenueRange[0]
                                            : parseInt(e.target.value || 0),
                                    ],
                                });
                            }}
                        />
                    </Accordian>

                    <Accordian title="COUNTRY" scrollable>
                        <MultiSelect
                            data={countries}
                            onSelect={(selectedData) => {
                                setPreference({ ...preference, countries: selectedData.filter((c) => c?.selected === true).map((c) => c.countryId) });
                            }}
                        />
                    </Accordian>

                    <Accordian title="CATEGORY" scrollable>
                        <MultiSelect
                            data={categories}
                            onSelect={(selectedData) => {
                                setPreference({
                                    ...preference,
                                    categories: selectedData.filter((c) => c?.selected === true).map((c) => c.categoryId),
                                });
                            }}
                        />
                    </Accordian>

                    <Button className="mt-5 p-2" color={"success"} text="Update" block onClick={handlePreferenceUpdate} />
                </div>
            )}
        </SideModal>
    );
};

export default InvestorStartupPreference;
