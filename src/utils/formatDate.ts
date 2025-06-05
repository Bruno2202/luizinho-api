export function formatDate(date: string | Date): Date {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
}