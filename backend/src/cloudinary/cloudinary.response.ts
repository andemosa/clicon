/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
