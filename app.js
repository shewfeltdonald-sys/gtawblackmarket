// Put your PNGs here in your repo:
// /images/pistols.png
// /images/smgs.png
// /images/rifles.png
// /images/shotguns.png
// /images/melee.png
// /images/drugs.png

const CATEGORY_THEME = {
  "Pistols":  { accent: "#ef4444", image: "./images/pistols.png" },
  "SMGs":     { accent: "#f59e0b", image: "./images/smgs.png" },
  "Rifles":   { accent: "#22c55e", image: "./images/rifles.png" },
  "Shotguns": { accent: "#f43f5e", image: "./images/shotguns.png" },
  "Melee":    { accent: "#a855f7", image: "./images/melee.png" },
  "Drugs":    { accent: "#38bdf8", image: "./images/drugs.png" },
  "Other":    { accent: "#94a3b8", image: "./images/melee.png" }
};

const INVENTORY = [
  // Pistols / Handguns
  { category: "Pistols", name: "HeavyPistol", quantity: 9 },
  { category: "Pistols", name: "CombatPistol", quantity: 10 },
  { category: "Pistols", name: "SNSPistol", quantity: 3 },
  { category: "Pistols", name: "SNSPistolMk2", quantity: 8 },
  { category: "Pistols", name: "Pistol", quantity: 10 },
  { category: "Pistols", name: "PistolMk2", quantity: 11 },
  { category: "Pistols", name: "Pistol50", quantity: 4 },
  { category: "Pistols", name: "VintagePistol", quantity: 7 },
  { category: "Pistols", name: "CeramicPistol", quantity: 1 },
  { category: "Pistols", name: "Revolver", quantity: 2 },
  { category: "Pistols", name: "Model15", quantity: 8 },
  { category: "Pistols", name: "Snub15", quantity: 10 },
  { category: "Pistols", name: "Glock", quantity: 13 },
  { category: "Pistols", name: "Sig", quantity: 10 },
  { category: "Pistols", name: "Taurus", quantity: 1 },
  { category: "Pistols", name: "Makarov", quantity: 1 },
  { category: "Pistols", name: "PistolXM3", quantity: 3 },

  // SMGs / Machine Pistols
  { category: "SMGs", name: "SMG", quantity: 3 },
  { category: "SMGs", name: "SMGMk2", quantity: 6 },
  { category: "SMGs", name: "MicroSMG", quantity: 6 },
  { category: "SMGs", name: "MiniSMG", quantity: 12 },
  { category: "SMGs", name: "MP9", quantity: 9 },
  { category: "SMGs", name: "MAC10", quantity: 2 },
  { category: "SMGs", name: "MachinePistol", quantity: 1 },

  // Rifles
  { category: "Rifles", name: "CarbineRifleMk2", quantity: 15 },
  { category: "Rifles", name: "AssaultRifle", quantity: 4 },
  { category: "Rifles", name: "TacticalRifle", quantity: 2 },
  { category: "Rifles", name: "CompactRifle", quantity: 4 },
  { category: "Rifles", name: "SpecialCarbine", quantity: 1 },
  { category: "Rifles", name: "StampedRifle", quantity: 1 },
  { category: "Rifles", name: "HuntingRifle", quantity: 2 },

  // Shotguns
  { category: "Shotguns", name: "PumpShotgun", quantity: 5 },
  { category: "Shotguns", name: "SawnOffShotgun", quantity: 5 },
  { category: "Shotguns", name: "DbShotgun", quantity: 1 },
  { category: "Shotguns", name: "Remington", quantity: 1 },

  // Melee Weapons
  { category: "Melee", name: "Knife", quantity: 9 },
  { category: "Melee", name: "SwitchBlade", quantity: 22 },
  { category: "Melee", name: "Dagger", quantity: 3 },
  { category: "Melee", name: "Machete", quantity: 4 },
  { category: "Melee", name: "Hatchet", quantity: 2 },
  { category: "Melee", name: "Bat", quantity: 1 },
  { category: "Melee", name: "BattleAxe", quantity: 2 },
  { category: "Melee", name: "KnuckleDuster", quantity: 8 },
  { category: "Melee", name: "Flashlight", quantity: 3 },

  // Drugs
  { category: "Drugs", name: "Marijuana / Weed", quantity: 3800 },
  { category: "Drugs", name: "Cocaine", quantity: 4600 },
  { category: "Drugs", name: "Fentanyl", quantity: 1100 },
  { category: "Drugs", name: "PCP", quantity: 1100 },
  { category: "Drugs", name: "Methamphetamine", quantity: 460 },
  { category: "Drugs", name: "Heroin", quantity: 250 },
  { category: "Drugs", name: "LSD", quantity: 146 },
  { category: "Drugs", name: "Bath Salts", quantity: 28 },
  { category: "Drugs", name: "Oxycodone", quantity: 250 },
  { category: "Drugs", name: "Morphine", quantity: 250 },
];

function sum(arr){ return arr.reduce((a,b)=>a+b,0); }

function groupByCategory(items){
  const map = new Map();
  for (const it of items){
    const cat = (it.category || "Other").trim() || "Other";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push({ ...it, category: cat });
  }
  return map;
}

function computeStats(items){
  const totalItems = sum(items.map(i => Number(i.quantity) || 0));
  const categories = new Set(items.map(i => (i.category || "Other").trim() || "Other")).size;
  return { totalItems, categories };
}

function applyThemeToggle(){
  const key = "gtawisass_theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(key);
  if (saved) root.setAttribute("data-theme", saved);
  if (!root.getAttribute("data-theme")) root.setAttribute("data-theme", "dark");

  document.getElementById("themeToggle").addEventListener("click", () => {
    const cur = root.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });
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
    const catItems = grouped.get(cat);

    const catQty = sum(catItems.map(i => Number(i.quantity) || 0));

    const card = document.createElement("article");
    card.className = "cat";
    card.style.setProperty("--accent", theme.accent);

    card.innerHTML = `
      <div class="cat__bar"></div>
      <div class="cat__head">
        <div>
          <h3 class="cat__title">
            <img class="cat__icon" src="${theme.image}" alt="${cat}" />
            ${cat}
          </h3>
        </div>
        <div class="cat__meta">
          <div><b>${catQty.toLocaleString()}</b> total</div>
        </div>
      </div>
      <div class="cat__list"></div>
    `;

    const list = card.querySelector(".cat__list");

    const sorted = [...catItems].sort((a,b) => {
      const qa = Number(a.quantity)||0, qb = Number(b.quantity)||0;
      if (qb !== qa) return qb - qa;
      return String(a.name).localeCompare(String(b.name));
    });

    for (const it of sorted){
      const qty = Number(it.quantity) || 0;

      const row = document.createElement("div");
      row.className = "item";
      row.innerHTML = `
        <div class="item__left">
          <div class="item__name">${it.name}</div>
        </div>
        <div class="item__right">
          <span class="badge">x ${qty.toLocaleString()}</span>
        </div>
      `;
      list.appendChild(row);
    }

    grid.appendChild(card);
  }
}

function hydrateKpis(allItems){
  const stats = computeStats(allItems);
  document.getElementById("kpiTotalItems").textContent = stats.totalItems.toLocaleString();
  document.getElementById("kpiCategories").textContent = stats.categories.toLocaleString();

  const chips = document.getElementById("quickStats");
  chips.innerHTML = "";

  const topCats = Array.from(groupByCategory(allItems).entries())
    .map(([cat, list]) => ({ cat, qty: sum(list.map(i => Number(i.quantity)||0)) }))
    .sort((a,b)=> b.qty - a.qty)
    .slice(0, 4);

  for (const t of topCats){
    const div = document.createElement("div");
    div.className = "chip";
    div.innerHTML = `${t.cat}: <b>${t.qty.toLocaleString()}</b>`;
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
      i.category.toLowerCase().includes(q)
    );
  }

  if (sort === "NAME_ASC"){
    items.sort((a,b)=>a.name.localeCompare(b.name));
  } else if (sort === "QTY_DESC"){
    items.sort((a,b)=>(Number(b.quantity)||0) - (Number(a.quantity)||0));
  }

  return items;
}

function bindUI(){
  const cats = new Set(INVENTORY.map(i => i.category?.trim() || "Other"));
  fillFilters(cats);

  const rerender = () => {
    render(getFilteredItems());
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
