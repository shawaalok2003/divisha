import { consoleLogger } from ".";
import CONFIG from "../config";
import StorageService from "../services/storage";

export const getSignedUrl = (filePath, expiry = null) => {
    const getParams = {
        Bucket: CONFIG.AWS_SPACE_BUCKET,
        Key: filePath,
        ...(expiry != null ? { Expires: expiry } : {}),
    };

    return StorageService.getSignedUrl("getObject", getParams);
};

export const processStorageFiles = (data = [], keys = [], expiry = null) => {
    return data.map((item) => {
        const processedKeys = {};

        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            var getParams = {
                Bucket: CONFIG.AWS_SPACE_BUCKET,
                Key: item[keys[keyIndex]],
                ...(expiry != null ? { Expires: expiry } : {}),
            };

            processedKeys[keys[keyIndex]] = StorageService.getSignedUrl("getObject", getParams);
        }

        return {
            ...item,
            ...processedKeys,
        };
    });

    return data;
};

export const deleteFileFromS3 = (filePath = null) => {
    if (!filePath) return null;

    const params = { Bucket: CONFIG.AWS_SPACE_BUCKET, Key: filePath };

    return StorageService.deleteObject(params, (err, data) => {
        if (err) consoleLogger("Failed To Delete File From S3", err, err.stack);
        else consoleLogger("File Deleted Successfully From S3", data);
    });
};
