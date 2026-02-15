import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const startupState = atom({
    key: "startupState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const superState = atom({
    key: "superState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const investorState = atom({
    key: "investorState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});
