import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import { investorState } from "../state/atoms";
import { APPLICATION_URLS } from "../constants";

const useInvestor = () => {
    const router = useRouter();

    const defaultInvestorState = {
        token: null,
        sidebar: false,
        isSuper: false,
    };

    const [investorData, setInvestorData] = useRecoilState(investorState);

    const setInvestorDetails = (investorDetails) => {
        setInvestorData({ ...defaultInvestorState, ...investorData, ...investorDetails });
    };

    const clearInvestorDetails = (ignoreRedirect = false) => {
        setInvestorData(defaultInvestorState);

        if (!ignoreRedirect) router.push(APPLICATION_URLS.INVESTOR_LOGIN.url);
    };

    const toggleSidebar = (toggle = null) => {
        setInvestorData({ ...defaultInvestorState, ...investorData, sidebar: toggle || !investorData.sidebar });
    };

    return {
        investorData,
        setInvestorDetails,
        clearInvestorDetails,
        toggleSidebar,
    };
};

export default useInvestor;
