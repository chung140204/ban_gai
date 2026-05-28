import { format } from "date-fns";
import { vi } from "date-fns/locale";

/** "Thứ bảy, 31/05/2026" */
export function formatVietnameseDate(date: Date) {
  const text = format(date, "EEEE, dd/MM/yyyy", { locale: vi });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** 20 → "20:00" */
export function formatHour(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}
