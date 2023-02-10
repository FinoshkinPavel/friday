export const convertFileBase64 = (
  file: File,
  callback: (value: string) => void
) => {
  const reader = new FileReader();
  reader.onload = () => {
    const file64 = reader.result as string;
    callback(file64);
  };
  reader.readAsDataURL(file);
};
