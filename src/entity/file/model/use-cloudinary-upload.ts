"use client";

import { useUploadFileMutation } from "../api";
import { uploadFiles as uploadFilesToCloudinary } from "../lib/upload-files";

export const useCloudinaryUpload = () => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  return {
    isLoading,
    uploadFiles: async (files: FileList | File[]) =>
      uploadFilesToCloudinary(files, (formData) =>
        uploadFile(formData).unwrap(),
      ),
  };
};
