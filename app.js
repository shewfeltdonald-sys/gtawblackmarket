// Category images (yours are in repo root)
const CATEGORY_THEME = {
  "Pistols":  { accent: "#ef4444", image: "./Pistols.png" },
  "SMGs":     { accent: "#f59e0b", image: "./SMGs.png" },
  "Rifles":   { accent: "#22c55e", image: "./Rifles.png" },
  "Shotguns": { accent: "#f43f5e", image: "./Shotguns.png" },
  "Melee":    { accent: "#a855f7", image: "./Melee weapons.png" },
  "Drugs":    { accent: "#38bdf8", image: "./drugs.png" },
  "Devices":  { accent: "#60a5fa", image: "./Devices.png" },
  "Other":    { accent: "#94a3b8", image: "./Devices.png" }
};

// Pricing icon (you added this)
const MONEY_ICON = "./dollar.png";

// Weapon category description
const WEAPON_DESC =
  "All weapons come with a minimum of 150 extra ammo included in the package. If 5+ weapons bought, it'll be 250 ammo. If 10+ 400 ammo etc.";

// Inventory
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

function money(n){
  const x = Number(n);
  if (!Number.isFinite(x)) return "—";
  return x.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Unit price rules
function unitPriceFor(item){
  const cat = (item.category || "").trim();
  const name = (item.name || "").trim();

  // DRUGS:
  // Cocaine price is 10usd x 500  => $10 per 500 => $0.02 each
  // Weed x500 = 8/usd           => $8 per 500  => $0.016 each
  // Fentanyl x300 = 8/usd       => $8 per 300  => $0.026666...
  // All the rest x100 = 5/USD   => $5 per 100  => $0.05 each
  if (cat === "Drugs"){
    const lower = name.toLowerCase();
    if (lower.includes("cocaine")) return 10 / 500;
    if (lower.includes("weed") || lower.includes("marijuana")) return 8 / 500;
    if (lower.includes("fentanyl")) return 8 / 300;
    return 5 / 100;
  }

  // WEAPONS:
  // Pistols all 15 except heavy 20
  if (cat === "Pistols"){
    if (name.toLowerCase().includes("heavy")) return 20;
    return 15;
  }

  // Melee all 2
  if (cat === "Melee") return 2;

  // SMGs all 20
  if (cat === "SMGs") return 20;

  // Shotguns all 25
  if (cat === "Shotguns") return 25;

  // Rifles all 30
  if (cat === "Rifles") return 30;

  // No pricing for other categories
  return null;
}

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

  const totalValue = sum(items.map(i => {
    const qty = Number(i.quantity) || 0;
    const u = unitPriceFor(i);
    if (!Number.isFinite(u)) return 0;
    return qty * u;
  }));

  return { totalItems, categories, totalValue };
}

function applyThemeToggle(){
  const key = "gtaw_blackmarket_theme";
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

function bindDisclaimer(){
  const modal = document.getElementById("disclaimerModal");
  const open = document.getElementById("openDisclaimer");

  function openModal(){
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  open?.addEventListener("click", openModal);

  modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-close") === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
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

function categoryDesc(cat){
  const weaponCats = new Set(["Pistols", "SMGs", "Rifles", "Shotguns", "Melee"]);
  return weaponCats.has(cat) ? WEAPON_DESC : "";
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
    const catValue = sum(catItems.map(i => {
      const qty = Number(i.quantity) || 0;
      const u = unitPriceFor(i);
      if (!Number.isFinite(u)) return 0;
      return qty * u;
    }));

    const desc = categoryDesc(cat);

    const card = document.createElement("article");
    card.className = "cat";
    card.style.setProperty("--accent", theme.accent);

    card.innerHTML = `
      <div class="cat__bar"></div>
      <div class="cat__head">
        <div>
          <h3 class="cat__title">
            <img class="cat__icon" src="${theme.image}" alt="${cat}" />
            <span>${cat}</span>
          </h3>
          ${desc ? `<div class="cat__desc">${desc}</div>` : ``}
        </div>
        <div class="cat__meta">
          <div><b>${catQty.toLocaleString()}</b> total</div>
          <div class="money">
            <img class="money__icon" src="${MONEY_ICON}" alt="$" />
            <b>${money(catValue)}</b>
          </div>
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
      const u = unitPriceFor(it);
      const total = Number.isFinite(u) ? qty * u : null;

      const row = document.createElement("div");
      row.className = "item";
      row.innerHTML = `
        <div class="item__left">
          <div class="item__name">${it.name}</div>
        </div>
        <div class="item__right">
          <span class="badge">x ${qty.toLocaleString()}</span>
          <span class="badge">
            <span class="money">
              <img class="money__icon" src="${MONEY_ICON}" alt="$" />
              <span>${Number.isFinite(u) ? `${money(u)} ea` : `—`}</span>
            </span>
          </span>
          <span class="badge">
            <span class="money">
              <img class="money__icon" src="${MONEY_ICON}" alt="$" />
              <span>${total !== null ? money(total) : `—`}</span>
            </span>
          </span>
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
  document.getElementById("kpiTotalValue").textContent = money(stats.totalValue);

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
  } else if (sort === "VALUE_DESC"){
    items.sort((a,b)=>{
      const av = (Number(a.quantity)||0) * (unitPriceFor(a) || 0);
      const bv = (Number(b.quantity)||0) * (unitPriceFor(b) || 0);
      return bv - av;
    });
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
bindDisclaimer();
bindUI();
