import { drivers } from "../data/drivers";

export function getDriverOfDay() {
  if (!drivers.length) return null;

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  return drivers[dayOfYear % drivers.length];
}
