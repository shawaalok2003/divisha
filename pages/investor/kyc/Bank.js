import { useEffect, useState } from "react";

import SideModal from "../../../components/SideModal";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input";

import { consoleLogger } from "../../../helpers";
import { LOADER_TIMEOUTS } from "../../../constants";

import INVESTOR_KYC_API from "../../../api/investor/kyc";

import useInvestor from "../../../hooks/useInvestor";

const InvestorBankKYC = (props) => {
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
        <SideModal title={"Bank Infomration"} {...props}>
            {loader && (
                <div className="py-10 px-5">
                    <Loader title="Updating KYC . . ." subtitle="Please wait while we save your bank details" />
                </div>
            )}

            {!loader && (
                <div className="p-3">
                    <div className="pb-2">
                        <Input title="Account Holder Name" defaultValue={`${investorData?.firstName} ${investorData?.lastName}`} disabled />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="Bank Name"
                            placeholder={"e.g.: ABC Bank Pvt. Ltd."}
                            defaultValue={kyc?.bankName}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    bankName: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="Branch"
                            placeholder={"e.g.: Sector 5"}
                            defaultValue={kyc?.bankBranch}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    bankBranch: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="IFSC Code"
                            placeholder={"e.g.: ABCBANK12345"}
                            defaultValue={kyc?.bankIFSC}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    bankIFSC: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="pb-2">
                        <Input
                            title="Account Number"
                            placeholder={"e.g.: 9876543210"}
                            defaultValue={kyc?.bankAccount}
                            onChange={(e) => {
                                setKYC({
                                    ...kyc,
                                    bankAccount: e.target.value,
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

export default InvestorBankKYC;
