import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
export function uploads(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    console.log('Current Cloudinary Config Before Upload:', cloudinary.v2.config());
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                resource_type: 'auto' // zip, images
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) resolve(error);
                resolve(result);
            }
        );
    });
}

export function videoUpload(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    console.log('Current Cloudinary Config Before Upload:', cloudinary.v2.config());
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                chunk_size: 50000,
                resource_type: 'video'
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) resolve(error);
                resolve(result);
            }
        );
    });
}
