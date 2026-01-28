import { useRecoilState } from "recoil";
import { startupState } from "../state/atoms";

const useStartup = () => {
    const defaultStartupState = {
        subscription: null,
        token: null,
    };

    const [startup, setStartup] = useRecoilState(startupState);

    const setStartupDetails = (startupDetails) => {
        setStartup({ ...defaultStartupState, ...startup, ...startupDetails });
    };

    const clearStartupDetails = () => {
        setStartup(defaultStartupState);
    };

    const setStartupToken = (startupToken) => {
        setStartup({ ...defaultStartupState, ...startup, token: startupToken });
    };

    const clearStartupToken = () => {
        setStartup({ ...defaultStartupState, ...startup, token: null });
    };

    return {
        startup,
        setStartupDetails,
        clearStartupDetails,
        setStartupToken,
        clearStartupToken,
    };
};

export default useStartup;
