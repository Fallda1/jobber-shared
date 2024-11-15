// cloudinary_upload.ts

import { v2 as cloudinary, ConfigOptions, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

/**
 * Configures the Cloudinary instance.
 *
 * @param configOptions - The configuration options for Cloudinary.
 */
export function configureCloudinary(configOptions: ConfigOptions): void {
    cloudinary.config(configOptions);
    console.log('Cloudinary configured in jobber-shared:', cloudinary.config());
}

/**
 * Uploads a file to Cloudinary.
 *
 * @param file - The file to upload (as a base64 string or a URL).
 * @param public_id - Optional. The public ID to assign to the uploaded asset.
 * @param overwrite - Optional. Whether to overwrite an existing asset with the same public ID.
 * @param invalidate - Optional. Whether to invalidate CDN cached copies of the asset.
 * @returns A promise that resolves with the upload result or rejects with an error.
 */
export function uploads(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiResponse> {
    console.log('Current Cloudinary Config Before Upload:', cloudinary.config());

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                resource_type: 'auto', // Supports all resource types (image, video, etc.)
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    reject(error);
                } else {
                    resolve(result!);
                }
            }
        );
    });
}

/**
 * Uploads a video file to Cloudinary.
 *
 * @param file - The video file to upload (as a base64 string or a URL).
 * @param public_id - Optional. The public ID to assign to the uploaded video.
 * @param overwrite - Optional. Whether to overwrite an existing video with the same public ID.
 * @param invalidate - Optional. Whether to invalidate CDN cached copies of the video.
 * @returns A promise that resolves with the upload result or rejects with an error.
 */
export function videoUpload(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiResponse> {
    console.log('Current Cloudinary Config Before Video Upload:', cloudinary.config());

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                resource_type: 'video', // Specify that we're uploading a video
                chunk_size: 6000000,    // Optional: Adjust chunk size for large files
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    console.error('Error uploading video to Cloudinary:', error);
                    reject(error);
                } else {
                    resolve(result!);
                }
            }
        );
    });
}
