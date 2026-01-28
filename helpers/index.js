import CONFIG from "../config";

export const isProdEnv = () => ["production", "Production", "PRODUCTION", "prod", "Prod", "PROD"].includes(CONFIG.NODE_ENV);
export const isDevEnv = () =>
    ["dev", "DEV", "Dev", "development", "DEVELOPMENT", "Development", "DEVELOP", "develop", "Develop"].includes(CONFIG.NODE_ENV);

export const handleDefaultImage = (e) => {
    e.target.src = "/images/no-image.jpg";
};

export const isDebugModeOn = () => ["true", true].includes(CONFIG?.DEBUG_MODE);

export const consoleLogger = (...options) => {
    if (isDevEnv() || isDebugModeOn()) {
        console.log(...options);
    }
};
