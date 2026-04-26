const startOfDay = (d: Date): Date => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const diffInDays = (a: Date, b: Date): number => {
  const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

export const getDayKey = (iso: string): string => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const getRelativeDayLabel = (iso: string, now: Date = new Date()): string => {
  const d = new Date(iso);
  const days = diffInDays(now, d);

  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";

  const sameYear = d.getFullYear() === now.getFullYear();
  const label = sameYear
    ? d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
    : d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  return label.toLowerCase();
};

export const getShortDateLabel = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
};

export const getTimeLabel = (iso: string): string => {
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};
