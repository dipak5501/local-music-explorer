import { run } from "./logic.js";
const app = document.querySelector("#app");
app.innerHTML = `<main style="font-family:Georgia,serif;max-width:720px;margin:3rem auto;padding:0 1rem;background:linear-gradient(180deg,#f7f3ea,#e8eef5);min-height:100vh"><h1>Local Music Explorer</h1><p>Discover and explore local music venues, concerts, and events in your area.</p><div id="out"></div></main>`;
document.querySelector("#out").textContent = run();
