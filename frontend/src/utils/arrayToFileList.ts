const arrayToFileList = (array: File[]): FileList => {
  const dataTransfer = new DataTransfer();

  array.forEach((file) => {
    dataTransfer.items.add(file);
  });

  return dataTransfer.files;
};

export default arrayToFileList;
