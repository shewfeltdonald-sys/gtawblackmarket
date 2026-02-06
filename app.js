// ====== EDIT THIS SECTION LATER (your inventory list) ======
// quantity: how many you have
// value: optional (set to null or 0 if you don't track money/value)
// note: optional (serial, quality, location, etc.)

const INVENTORY = [
  // Guns
  { category: "Guns", name: "Pistol", quantity: 2, value: null, note: "RP" },
  { category: "Guns", name: "SMG", quantity: 1, value: null, note: "" },

  // Devices (you wrote devines — I assumed you meant devices)
  { category: "Devices", name: "Radio", quantity: 1, value: null, note: "" },
  { category: "Devices", name: "Lockpick", quantity: 6, value: null, note: "" },

  // Drugs
  { category: "Drugs", name: "Weed (g)", quantity: 120, value: null, note: "" },
  { category: "Drugs", name: "Coke (bags)", quantity: 8, value: null, note: "" },

  // Other
  { category: "Ammo", name: "9mm", quantity: 250, value: null, note: "" },
  { category: "Medical", name: "Medkit", quantity: 3, value: null, note: "" },
];

// Category styles (nice accents per category)
const CATEGORY_THEME = {
  "Guns":    { accent: "#fb7185", icon: "🔫" },
  "Devices": { accent: "#22d3ee", icon: "🧰" },
  "Drugs":   { accent: "#a78bfa", icon: "🧪" },
  "Ammo":    { accent: "#fbbf24", icon: "🎯" },
  "Medical": { accent: "#34d399", icon: "🩹" },
  "Other":   { accent: "#60a5fa", icon: "📦" },
};

function money(n){
  if (n === null || n === undefined) return "—";
  const x = Number(n);
  if (!Number.isFinite(x)) return "—";
  return x.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function sum(arr){ return arr.reduce((a,b)=>a+b,0); }

function groupByCategory(items){
  const map = new Map();
  for (const it of items){
    const cat = it.category?.trim() || "Other";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push({ ...it, category: cat });
  }
  return map;
}

function computeStats(items){
  const totalItems = sum(items.map(i => Number(i.quantity) || 0));
  const categories = new Set(items.map(i => i.category?.trim() || "Other")).size;

  // Optional value totals (only counts if value is numeric)
  const totalValue = sum(items.map(i => {
    const qty = Number(i.quantity) || 0;
    const val = Number(i.value);
    if (!Number.isFinite(val) || val <= 0) return 0;
    return qty * val;
  }));

  return { totalItems, categories, totalValue };
}

function applyThemeToggle(){
  const key = "gtawisass_theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(key);
  if (saved) root.setAttribute("data-theme", saved);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const cur = root.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });

  if (!root.getAttribute("data-theme")) root.setAttribute("data-theme", "dark");
}

function fillFilters(categories){
  const sel = document.getElementById("categoryFilter");
  const cats = Array.from(categories).sort((a,b)=>a.localeCompare(b));
  for (const c of cats){
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  }
}

function render(items){
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = "";

  const grouped = groupByCategory(items);
  const cats = Array.from(grouped.keys()).sort((a,b)=>a.localeCompare(b));

  for (const cat of cats){
    const theme = CATEGORY_THEME[cat] || CATEGORY_THEME["Other"];
    const icon = theme.icon || "📦";

    const catItems = grouped.get(cat);

    const catQty = sum(catItems.map(i => Number(i.quantity) || 0));
    const catValue = sum(catItems.map(i => {
      const qty = Number(i.quantity) || 0;
      const val = Number(i.value);
      if (!Number.isFinite(val) || val <= 0) return 0;
      return qty * val;
    }));

    const card = document.createElement("article");
    card.className = "cat";
    card.style.setProperty("--accent", theme.accent);

    card.innerHTML = `
      <div class="cat__bar"></div>
      <div class="cat__head">
        <div>
          <h3 class="cat__title"><span class="badge">${icon}</span> ${cat}</h3>
        </div>
        <div class="cat__meta">
          <div><b>${catQty}</b> total</div>
          <div class="muted">value: <b>${catValue ? money(catValue) : "—"}</b></div>
        </div>
      </div>
      <div class="cat__list"></div>
    `;

    const list = card.querySelector(".cat__list");

    // Sort inside category by qty desc then name
    const sorted = [...catItems].sort((a,b) => {
      const qa = Number(a.quantity)||0, qb = Number(b.quantity)||0;
      if (qb !== qa) return qb - qa;
      return String(a.name).localeCompare(String(b.name));
    });

    for (const it of sorted){
      const qty = Number(it.quantity) || 0;
      const val = Number(it.value);
      const hasVal = Number.isFinite(val) && val > 0;

      const row = document.createElement("div");
      row.className = "item";
      row.innerHTML = `
        <div class="item__left">
          <div class="item__name">${it.name}</div>
          ${it.note ? `<div class="item__note">${it.note}</div>` : `<div class="item__note muted"> </div>`}
        </div>
        <div class="item__right">
          <div><span class="badge">x ${qty}</span></div>
          <div class="item__note">${hasVal ? `value: ${money(qty * val)}` : ""}</div>
        </div>
      `;
      list.appendChild(row);
    }

    grid.appendChild(card);
  }
}

function hydrateKpis(items){
  const stats = computeStats(items);
  document.getElementById("kpiTotalItems").textContent = stats.totalItems.toLocaleString();
  document.getElementById("kpiCategories").textContent = stats.categories.toLocaleString();
  document.getElementById("kpiTotalValue").textContent = stats.totalValue ? money(stats.totalValue) : "—";

  const chips = document.getElementById("quickStats");
  chips.innerHTML = "";

  // 3 quick chips
  const topCats = Array.from(groupByCategory(items).entries())
    .map(([cat, list]) => ({ cat, qty: sum(list.map(i => Number(i.quantity)||0)) }))
    .sort((a,b)=> b.qty - a.qty)
    .slice(0, 3);

  for (const t of topCats){
    const theme = CATEGORY_THEME[t.cat] || CATEGORY_THEME["Other"];
    const div = document.createElement("div");
    div.className = "chip";
    div.innerHTML = `<span class="badge" style="border-color: var(--border);">${theme.icon}</span> ${t.cat}: <b>${t.qty.toLocaleString()}</b>`;
    chips.appendChild(div);
  }
}

function getFilteredItems(){
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortBy").value;

  let items = [...INVENTORY].map(it => ({
    ...it,
    category: (it.category?.trim() || "Other"),
    name: String(it.name || "").trim(),
  }));

  if (cat !== "ALL") items = items.filter(i => i.category === cat);

  if (q){
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      (i.note || "").toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    );
  }

  if (sort === "NAME_ASC"){
    items.sort((a,b)=>a.name.localeCompare(b.name));
  } else if (sort === "QTY_DESC"){
    items.sort((a,b)=>(Number(b.quantity)||0) - (Number(a.quantity)||0));
  } else if (sort === "VALUE_DESC"){
    items.sort((a,b)=>{
      const av = (Number(a.quantity)||0) * (Number(a.value)||0);
      const bv = (Number(b.quantity)||0) * (Number(b.value)||0);
      return bv - av;
    });
  }

  return items;
}

function bindUI(){
  const cats = new Set(INVENTORY.map(i => i.category?.trim() || "Other"));
  fillFilters(cats);

  const rerender = () => {
    const items = getFilteredItems();
    render(items);

    // KPIs should reflect full inventory (not filtered), feels nicer:
    hydrateKpis(INVENTORY);
  };

  document.getElementById("searchInput").addEventListener("input", rerender);
  document.getElementById("categoryFilter").addEventListener("change", rerender);
  document.getElementById("sortBy").addEventListener("change", rerender);

  rerender();
}

document.getElementById("year").textContent = new Date().getFullYear();
applyThemeToggle();
bindUI();
