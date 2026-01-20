// datetime-localの値（YYYY-MM-DDTHH:mm）をローカルタイムゾーンのISO文字列に変換
export const dateTimeLocalToISO = (dateTimeLocal: string): string => {
  // datetime-localの値は既にローカルタイムゾーンなので、そのままDateオブジェクトに渡す
  const date = new Date(dateTimeLocal);
  return date.toISOString();
};

// ISO文字列をdatetime-local形式（YYYY-MM-DDTHH:mm）に変換
export const isoToDateTimeLocal = (iso: string): string => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// ISO文字列を表示用にフォーマット（MM/DD HH:mm）
export const formatDateTimeForDisplay = (iso: string): string => {
  const date = new Date(iso);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};
