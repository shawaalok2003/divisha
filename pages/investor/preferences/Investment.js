import { useEffect, useState } from "react";

import SideModal from "../../../components/SideModal";
import Button from "../../../components/Button";

import INVESTOR_PREFERENCE_API from "../../../api/investor/preference";

import { consoleLogger } from "../../../helpers";
import { LOADER_TIMEOUTS } from "../../../constants";

import useInvestor from "../../../hooks/useInvestor";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input";

const InvestorInvestmentPreference = (props) => {
    const { investorData } = useInvestor();

    const [preference, setPreference] = useState(null);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoader(true);

            const { data: prefs } = await INVESTOR_PREFERENCE_API.getPreference({ token: investorData.token });
            if (prefs?.status === "success") setPreference(prefs.data);

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
                consoleLogger("UPDATE INVESTOR INVESTMENT PREFERENCE ERROR: ", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, LOADER_TIMEOUTS.twoSec);
            });
    };

    return (
        <SideModal title={"Investment Preferences"} {...props}>
            {loader && (
                <div className="py-10 px-5">
                    <Loader title="Updating Preference . . ." subtitle="Please wait while we save your investment preference" />
                </div>
            )}

            {!loader && (
                <div className="p-3">
                    <Input
                        type="number"
                        title="INVESTMENT CAPACITY"
                        placeholder={"e.g.: 105020"}
                        defaultValue={preference?.investmentCapacity}
                        onChange={(e) => {
                            setPreference({
                                ...preference,
                                investmentCapacity: parseInt(e.target.value || 0),
                            });
                        }}
                    />

                    <Button className="mt-5 p-2" color={"success"} text="Update" block onClick={handlePreferenceUpdate} />
                </div>
            )}
        </SideModal>
    );
};

export default InvestorInvestmentPreference;
