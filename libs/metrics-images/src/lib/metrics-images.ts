import { Image } from '@metricsai/metrics-interfaces';

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertToBase64Sync = (file: File): string => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return reader.result as string;
};

export const convertToImage = (base64: string): Image => {
  const base64Image = base64.split(';base64,').pop();
  const id = Math.random().toString(36).substring(2);
  const name = `${id}.png`;
  return { id, name, base64: base64Image as string };
};

export const convertToImageSync = (base64: string): Image => {
  const base64Image = base64.split(';base64,').pop();
  const id = Math.random().toString(36).substring(2);
  const name = `${id}.png`;
  return { id, name, base64: base64Image as string };
};

// Path: libs\metrics-images\src\lib\metrics-images.ts
