// convert full ISO timestemp to raindrop's query format

export function toRaindropQueryDate(
  input: string | Date,
  byDay: boolean = true
): string {
  const d = typeof input === "string" ? new Date(input) : input;

  const pad = (n: number) => String(n).padStart(2, "0");
  const year = d.getUTCFullYear();
  const month = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());

  if (byDay) {
    return `${year}-${month}-${day}`;
  }

  const hour = pad(d.getUTCHours());
  const minute = pad(d.getUTCMinutes());

  return `${year}-${month}-${day}:${hour}:${minute}`;
}
