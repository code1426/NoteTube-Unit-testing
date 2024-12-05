import fs from "fs";

const deleteFile = (file: Express.Multer.File) => {
  fs.unlink(file.path, (err) => {
    // console.log("File deleted:", file.path);
    if (err) {
      throw new Error("Failed to delete file");
    }
  });
};

export default deleteFile;
