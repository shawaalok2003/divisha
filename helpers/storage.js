import { consoleLogger } from ".";
import CONFIG from "../config";

export const getSignedUrl = (filePath, expiry = null) => {
    if (!filePath) return null;
    const apiUrl = CONFIG.API_URL || "http://localhost:3333";
    return `${apiUrl}/v1/file/${filePath}`;
};

export const processStorageFiles = (data = [], keys = [], expiry = null) => {
    return data.map((item) => {
        const processedKeys = {};

        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            processedKeys[keys[keyIndex]] = getSignedUrl(item[keys[keyIndex]]);
        }

        return {
            ...item,
            ...processedKeys,
        };
    });
};

export const deleteFileFromS3 = (filePath = null) => {
    // File deletion is now handled server-side
    if (!filePath) return null;
    consoleLogger("deleteFileFromS3 called for:", filePath);
    return null;
};
