export function fileContentToBase64(file: any) {
  return new Promise((resolve: any, reject: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = reject;

    fileReader.readAsDataURL(file);
  });
}
