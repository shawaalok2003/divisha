import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const startupState = atom({
    key: "startup",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const superState = atom({
    key: "super",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const investorState = atom({
    key: "investor",
    default: {},
    effects_UNSTABLE: [persistAtom],
});
