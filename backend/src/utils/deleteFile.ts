import fs from "fs";

const deleteFile = (file: Express.Multer.File) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      throw new Error("Failed to delete file");
    }
  });
};

export default deleteFile;
