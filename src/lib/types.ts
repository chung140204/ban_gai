export type Step = "intro" | "ask" | "datetime" | "location" | "confirm" | "success";

export interface TimeSlot {
  id: string;
  label: string;
  emoji: string;
  hours: number[];
}

export interface DateSelection {
  date: Date;
  slot: TimeSlot;
  hour: number;
  location?: string;
  food?: string;
  activity?: string;
}

export interface LocationPreset {
  id: string;
  label: string;
  emoji: string;
}
