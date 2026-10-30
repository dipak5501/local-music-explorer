const KEY = "nae-local-music";

export function loadEvents() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    { id: "1", title: "Open mic night", venue: "Neighborhood Cafe", date: "2026-11-02", notes: "Sign-up at 7pm", tags: "live,acoustic" },
    { id: "2", title: "DJ set", venue: "Warehouse Loft", date: "2026-11-08", notes: "Bring earplugs", tags: "electronic" },
  ];
}

export function saveEvents(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function uid() { return Math.random().toString(36).slice(2, 9); }

export function filterEvents(list, q) {
  const s = (q || "").toLowerCase().trim();
  if (!s) return list;
  return list.filter((e) => [e.title, e.venue, e.notes, e.tags].join(" ").toLowerCase().includes(s));
}
