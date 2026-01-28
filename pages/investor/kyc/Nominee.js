import { useEffect, useState } from "react";

import SideModal from "../../../components/SideModal";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input";

import { consoleLogger } from "../../../helpers";
import { LOADER_TIMEOUTS, NOMINEE_RELATIONS } from "../../../constants";

import INVESTOR_KYC_API from "../../../api/investor/kyc";

import useInvestor from "../../../hooks/useInvestor";
import Select from "../../../components/Select";

const InvestorNomineeKYC = (props) => {
    const { investorData } = useInvestor();

    const [kyc, setKYC] = useState(null);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoader(true);

            const { data: prefs } = await INVESTOR_KYC_API.getKYC({ token: investorData.token });

            if (prefs?.status === "success") {
                setKYC(prefs.data);
            }

            setLoader(false);
        };

        fetchAllData();
    }, []);

    const handleKYCUpdate = async () => {
        setLoader(true);

        try {
            const { data: updateRes } = await INVESTOR_KYC_API.updateKYC({
                token: investorData.token,
                kyc,
            });

            if (updateRes.status === "success") {
                setReload(!reload);
            }

            setTimeout(() => {
                setLoader(false);
            }, LOADER_TIMEOUTS.twoSec);
        } catch (error) {
            consoleLogger("UPDATE INVESTOR KYC ERROR: ", error);

            setTimeout(() => {
                setLoader(false);
            }, LOADER_TIMEOUTS.twoSec);
        }
    };

    return (
        <SideModal title={"Nominee Details"} {...props}>
            {loader && (
                <div className="py-10 px-5">
                    <Loader title="Updating KYC . . ." subtitle="Please wait while we save your nominee details" />
                </div>
            )}

            {!loader && (
                <div className="p-3">
                    <div className="pb-2">
                        <Input
                            title="Name"
                            placeholder={"e.g.: Deepak Priyadarshi"}
                            defaultValue={kyc?.nomineeName}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    nomineeName: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Select
                            title="Relation"
                            options={NOMINEE_RELATIONS || []}
                            value={kyc?.nomineeRelation}
                            onChange={(e) => setKYC({ ...kyc, nomineeRelation: e.target.value })}
                            required
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="Mobile"
                            placeholder={"e.g.: 9876543210"}
                            defaultValue={kyc?.nomineeMobile}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    nomineeMobile: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="Email"
                            placeholder={"e.g.: support@startxv.com"}
                            defaultValue={kyc?.nomineeEmail}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    nomineeEmail: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            type="date"
                            title="Date Of Birth"
                            placeholder={"e.g.: 01/12/2023"}
                            max={new Date().toJSON().slice(0, 10)}
                            defaultValue={kyc?.nomineeDOB}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    nomineeDOB: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <Button className="mt-5 p-2" color={"success"} text="Update" block onClick={handleKYCUpdate} />
                </div>
            )}
        </SideModal>
    );
};

export default InvestorNomineeKYC;
