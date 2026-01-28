import { useEffect, useState } from "react";

import SideModal from "../../../components/SideModal";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input";

import { consoleLogger } from "../../../helpers";
import { LOADER_TIMEOUTS } from "../../../constants";

import INVESTOR_KYC_API from "../../../api/investor/kyc";

import useInvestor from "../../../hooks/useInvestor";

const InvestorTaxKYC = (props) => {
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
        <SideModal title={"Tax Information"} {...props}>
            {loader && (
                <div className="py-10 px-5">
                    <Loader title="Updating KYC . . ." subtitle="Please wait while we save your tax details" />
                </div>
            )}

            {!loader && (
                <div className="p-3">
                    <div className="pb-2">
                        <Input
                            title="PAN"
                            placeholder={"e.g.: PANCA1234D"}
                            defaultValue={kyc?.pan}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    pan: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="GSTIN"
                            placeholder={"e.g.: 22AAAAA0000A1Z5"}
                            defaultValue={kyc?.gstin}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    gstin: e.target.value,
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

export default InvestorTaxKYC;
