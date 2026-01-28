import { useRecoilState } from "recoil";
import { superState } from "../state/atoms";
import { useRouter } from "next/router";
import { APPLICATION_URLS } from "../constants";

const useSuper = () => {
    const router = useRouter();

    const defaultSuperState = {
        token: null,
        sidebar: false,
    };

    const [superData, setSuperData] = useRecoilState(superState);

    const setSuperDetails = (startupDetails) => {
        setSuperData({ ...defaultSuperState, ...superData, ...startupDetails });
    };

    const clearSuperDetails = () => {
        setSuperData(defaultSuperState);
        router.push(APPLICATION_URLS.SUPER_LOGIN.url);
    };

    const setSuperToken = (startupToken) => {
        setSuperData({ ...defaultSuperState, ...superData, token: startupToken });
    };

    const clearSuperToken = () => {
        setSuperData({ ...defaultSuperState, ...superData, token: null });
        router.push(APPLICATION_URLS.SUPER_LOGIN.url);
    };

    const toggleSidebar = (toggle = null) => {
        setSuperData({ ...defaultSuperState, ...superData, sidebar: toggle || !superData.sidebar });
    };

    return {
        superData,
        setSuperDetails,
        clearSuperDetails,
        setSuperToken,
        clearSuperToken,
        toggleSidebar,
    };
};

export default useSuper;
