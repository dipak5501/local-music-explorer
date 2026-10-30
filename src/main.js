import "./style.css";
import { loadEvents, saveEvents, uid, filterEvents } from "./logic.js";

const root = document.querySelector("#app");
let events = loadEvents();
let q = "";

function render() {
  const list = filterEvents(events, q).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  root.innerHTML = `
  <main class="app">
    <h1 class="brand">Local Music Explorer</h1>
    <p class="lede">Track venues, shows, and notes near you — saved only on this device.</p>
    <input id="q" placeholder="Filter by venue, tag, title…" value="${q.replace(/"/g,"&quot;")}" style="width:100%;margin:0.8rem 0;padding:0.7rem 0.85rem;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:inherit" />
    <form class="form" id="form">
      <input name="title" placeholder="Event title" required />
      <input name="venue" placeholder="Venue" required />
      <input name="date" type="date" required />
      <input name="tags" placeholder="tags (comma separated)" />
      <textarea class="full" name="notes" placeholder="Notes" rows="3"></textarea>
      <button class="full" type="submit">Add event</button>
    </form>
    <div class="list">
      ${list.map((e) => `
        <article class="card">
          <h2>${esc(e.title)}</h2>
          <p>${esc(e.venue)} · ${esc(e.date)}</p>
          <p>${esc(e.notes || "")}</p>
          ${(e.tags || "").split(",").filter(Boolean).map((t) => `<span class="tag">${esc(t.trim())}</span>`).join(" ")}
          <div style="margin-top:.7rem"><button type="button" class="ghost" data-del="${e.id}">Remove</button></div>
        </article>`).join("") || "<p class='lede'>No events match.</p>"}
    </div>
    <aside id="insights" class="lede" style="margin-top:1.5rem"></aside>
  </main>`;

  root.querySelector("#q").addEventListener("input", (e) => { q = e.target.value; render(); });
  root.querySelector("#form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    events = [{
      id: uid(),
      title: String(fd.get("title") || ""),
      venue: String(fd.get("venue") || ""),
      date: String(fd.get("date") || ""),
      tags: String(fd.get("tags") || ""),
      notes: String(fd.get("notes") || ""),
    }, ...events];
    saveEvents(events); render();
  });
  root.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      events = events.filter((e) => e.id !== btn.getAttribute("data-del"));
      saveEvents(events); render();
    });
  });
}
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
render();
fetch("./insights.json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(d=>{ if(d){ const el=document.querySelector("#insights"); if(el) el.textContent="Web insights: "+(d.headline||""); }}).catch(()=>{});
