export type Step = "intro" | "ask" | "datetime" | "confirm" | "success";

export interface TimeSlot {
  id: string;
  label: string;
  emoji: string;
  hours: number[]; // giờ cụ thể trong khung, vd [18,19,20,21,22]
}

export interface DateSelection {
  date: Date;
  slot: TimeSlot;
  hour: number; // giờ cụ thể đã chọn, vd 20
}
