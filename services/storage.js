// Storage service - AWS S3 replaced with Neon DB storage
// File uploads now go through the backend /v1/upload/aws endpoint
// File serving is handled by the backend /v1/file/* endpoint

const StorageService = {
    // No-op stubs for backward compatibility
    getSignedUrl: () => null,
    putObject: () => ({ on: () => ({ send: (cb) => cb(new Error("S3 disabled - use UPLOAD_API.uploadFileToAWS instead")) }) }),
    deleteObject: (params, cb) => cb(null, {}),
};

export default StorageService;
