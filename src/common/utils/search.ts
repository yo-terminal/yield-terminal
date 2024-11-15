import { Slot } from "../../app/types";

export function search(slots: Slot[], q: string, exclude?: Set<string>) {
  let results = slots;
  if (exclude && exclude.size > 0) {
    results = results.filter((x) => !exclude.has(x.id));
  }
  if (q) {
    const query = q.toLowerCase();
    results = results.filter((x) => x.summary.toLowerCase().includes(query));
  }
  return results;
}
