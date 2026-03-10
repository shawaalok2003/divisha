import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

import "../styles/global.css";
import "../styles/dark-global.css";
import "../styles/fontawesome.css";
import "../styles/custom.css";
import "../styles/dark.css";

import "animate.css";
import "reactjs-popup/dist/index.css";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};

export default function App({ Component, pageProps }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <RecoilRoot>
            <ToastProvider>
                {mounted ? <Component {...pageProps} /> : null}
            </ToastProvider>
        </RecoilRoot>
    );
}
