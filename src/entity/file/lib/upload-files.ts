import type { ApiResponse, UploadFileResponseDTO } from "shared/api";

type UploadFileHandler = (
  formData: FormData,
) => Promise<ApiResponse<UploadFileResponseDTO>>;

export const uploadFiles = async (
  files: FileList | File[],
  uploadFile: UploadFileHandler,
) => {
  const fileList = Array.from(files);

  if (fileList.length === 0) {
    return [];
  }

  return Promise.all(
    fileList.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData);

      return response.data.filepath;
    }),
  );
};
