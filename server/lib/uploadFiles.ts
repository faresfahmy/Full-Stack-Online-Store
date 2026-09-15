import {  type UploadApiResponse } from "cloudinary";
import { appError } from "../utils/appError.ts";
import { ERROR, FAIL } from "../utils/httpStatus.ts";
import type { Files_Upload } from "../types/types.ts";
import  cloudinary  from "../config/cloudinary.ts";




export const uploadFile = async (path: string | undefined, folderName: string) => {
    try {
        if (path) {
            const uploadFile = await cloudinary.uploader.upload(path, {
                folder: folderName,
                resource_type: 'image'
            })
            return uploadFile;
        }
        throw appError(FAIL, "Check the file path.", 400)
    } catch (err: any) {
        throw appError(ERROR, null, 500, "There is an error loading the file")
    }
}


export const uploadMultipleFile = async (files: Files_Upload, folderName: string) => {
    try {
        if (Array.isArray(files) && files.length != 0) {
            const matchFieldName = files.filter((file: any) => file.fieldname == folderName);
            if (matchFieldName.length == 0) {
                throw appError(FAIL, "Check the file name.", 400);
            }
            const uploadAllFiles = files.map((file) =>
                cloudinary.uploader.upload(file.path, {
                    folder: folderName,
                    resource_type: 'image'
                })
            )
            const urls:UploadApiResponse[] = await Promise.all(uploadAllFiles);
            if (urls.length == 0) {
                throw appError(ERROR, null, 500, "There is an error loading files")
            }
            return urls
        }
        throw appError(FAIL, "Check the file path.", 400);
    } catch (err: any) {
        throw appError(ERROR, null, 500, "There is an error loading files")
    }
}


export const updateFile = async (path: string | undefined, publicId: string) => {
    try {
        if (path) {
            const update = await cloudinary.uploader.upload(
                path,
                {
                    public_id: publicId,
                    overwrite: true,
                }
            )
            return update;
        }
        throw appError(FAIL, "Check the file path.", 400);
    } catch (error: any) {
        throw appError(ERROR, null, 500, "There is an error loading the file")
    }
}

