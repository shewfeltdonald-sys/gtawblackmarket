// ===============================
// gtawisass — app.js (FULL FILE)
// ===============================

// Category images (in repo root — filenames must match EXACTLY)
const CATEGORY_THEME = {
  "Money":    { accent: "#34d399", image: "./dollar.png" },
  "Rifles":   { accent: "#22c55e", image: "./Rifles.png" },
  "Pistols":  { accent: "#ef4444", image: "./Pistols.png" },
  "SMGs":     { accent: "#f59e0b", image: "./SMGs.png" },
  "Shotguns": { accent: "#f43f5e", image: "./Shotguns.png" },
  "Devices":  { accent: "#60a5fa", image: "./Devices.png" },
  "Melee":    { accent: "#a855f7", image: "./Melee weapons.png" },
  "Drugs":    { accent: "#fb7185", image: "./Drugs.png" },
  "Other":    { accent: "#94a3b8", image: "./Devices.png" }
};

// Dollar icon (in repo root)
const MONEY_ICON = "./dollar.png";

// Updated weapon description (exactly as requested)
const WEAPON_DESC =
  "All weapons come with a minimum of 150 included ammo. If 5+ weapons bought, it'll be 400 additional ammo for all 5. If 10+ 600 ammo included for all 10.";

// Money description (exactly as requested)
const MONEY_DESC =
  "144 millions available — $100/million. If bought 3 millions and plus, $60/million. If 5 millions and plus, $40/million.";

// ===============================
// INVENTORY
// NOTE: Drugs removed from items (out of stock display only)
// ===============================
const INVENTORY = [
  // Money
  { category: "Money", name: "Millions available", quantity: 144 },

  // Rifles
  { category: "Rifles", name: "CarbineRifleMk2", quantity: 15 },
  { category: "Rifles", name: "AssaultRifle", quantity: 4 },
  { category: "Rifles", name: "TacticalRifle", quantity: 2 },
  { category: "Rifles", name: "CompactRifle", quantity: 4 },
  { category: "Rifles", name: "SpecialCarbine", quantity: 1 },
  { category: "Rifles", name: "StampedRifle", quantity: 1 },
  { category: "Rifles", name: "HuntingRifle", quantity: 2 },

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

  // Shotguns
  { category: "Shotguns", name: "PumpShotgun", quantity: 5 },
  { category: "Shotguns", name: "SawnOffShotgun", quantity: 5 },
  { category: "Shotguns", name: "DbShotgun", quantity: 1 },
  { category: "Shotguns", name: "Remington", quantity: 1 },

  // Devices
  { category: "Devices", name: "Device scanner", quantity: 55 },
  { category: "Devices", name: "Wires", quantity: 25 },
  { category: "Devices", name: "Bugs", quantity: 29 },
  { category: "Devices", name: "Vehicle trackers", quantity: 11 },

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
];

// Custom section order (page order)
const CATEGORY_ORDER = [
  "Money",
  "Rifles",
  "Pistols",
  "SMGs",
  "Shotguns",
  "Devices",
  "Melee",
  "Drugs",
];

// Chips order (what you asked for on the overview)
const CHIP_ORDER = [
  "Money",
  "Rifles",
  "Pistols",
  "Melee",
  "Devices",
  "SMGs",
  "Shotguns",
];

// ===============================
// HELPERS
// ===============================
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

function slugifyCategory(cat){
  return String(cat)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

function computeStats(items){
  const totalItems = sum(items.map(i => Number(i.quantity) || 0));
  const categories = new Set([...CATEGORY_ORDER]).size; // includes Drugs (out of stock)
  return { totalItems, categories };
}

// Price label rules (NO totals anywhere)
function priceLabelFor(item){
  const cat = (item.category || "").trim();
  const name = (item.name || "").trim().toLowerCase();

  // Devices: no per-item prices
  if (cat === "Devices") return null;

  // Money: no per-item price badge (pricing in description)
  if (cat === "Money") return null;

  // Drugs: out of stock, no prices
  if (cat === "Drugs") return null;

  // Pistols
  if (cat === "Pistols"){
    if (name.includes("heavy")) return "20 ea";
    return "15 ea";
  }

  if (cat === "Melee") return "2 ea";
  if (cat === "SMGs") return "20 ea";
  if (cat === "Shotguns") return "25 ea";
  if (cat === "Rifles") return "30 ea";

  return null;
}

function categoryDesc(cat){
  if (cat === "Money") return MONEY_DESC;
  const weaponCats = new Set(["Pistols", "SMGs", "Rifles", "Shotguns", "Melee"]);
  if (weaponCats.has(cat)) return WEAPON_DESC;
  return "";
}

// Category header tag (only Devices requested)
function categoryHeaderTag(cat){
  if (cat === "Devices"){
    return { icon: MONEY_ICON, text: "$10 per device" };
  }
  return null;
}

// ===============================
// THEME + DISCLAIMER
// ===============================
function applyThemeToggle(){
  const key = "gtaw_blackmarket_theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(key);

  if (saved) root.setAttribute("data-theme", saved);
  if (!root.getAttribute("data-theme")) root.setAttribute("data-theme", "dark");

  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });
}

function bindDisclaimer(){
  const modal = document.getElementById("disclaimerModal");
  const open = document.getElementById("openDisclaimer");
  if (!modal || !open) return;

  function openModal(){
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  open.addEventListener("click", openModal);

  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-close") === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ===============================
// FILTERS
// ===============================
function fillFilters(){
  const sel = document.getElementById("categoryFilter");
  if (!sel) return;

  sel.innerHTML = `<option value="ALL">All categories</option>`;
  for (const c of CATEGORY_ORDER){
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  }
}

// ===============================
// QUICK CHIPS (CLICK -> SCROLL)
// ===============================
function getCategoryCountsMap(allItems){
  const grouped = groupByCategory(allItems);
  const counts = new Map();

  for (const cat of CATEGORY_ORDER){
    if (cat === "Drugs"){
      counts.set(cat, 0);
      continue;
    }
    const list = grouped.get(cat) || [];
    const qty = sum(list.map(i => Number(i.quantity) || 0));
    counts.set(cat, qty);
  }

  return counts;
}

function buildQuickChips(allItems){
  const chips = document.getElementById("quickStats");
  if (!chips) return;

  chips.innerHTML = "";

  const counts = getCategoryCountsMap(allItems);

  for (const cat of CHIP_ORDER){
    const theme = CATEGORY_THEME[cat] || CATEGORY_THEME["Other"];
    const qty = counts.get(cat) ?? 0;
    const targetId = `cat-${slugifyCategory(cat)}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.style.setProperty("--accent", theme.accent);
    btn.setAttribute("data-target", targetId);
    btn.innerHTML = `${cat}: <b>${qty.toLocaleString()}</b>`;

    btn.addEventListener("click", () => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    chips.appendChild(btn);
  }
}

// ===============================
// RENDER
// ===============================
function render(items){
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const grouped = groupByCategory(items);

  for (const cat of CATEGORY_ORDER){
    const theme = CATEGORY_THEME[cat] || CATEGORY_THEME["Other"];
    const catItems = grouped.get(cat) || [];
    const desc = categoryDesc(cat);
    const headerTag = categoryHeaderTag(cat);

    const card = document.createElement("article");
    card.className = "cat";
    card.style.setProperty("--accent", theme.accent);
    card.id = `cat-${slugifyCategory(cat)}`;

    const drugsOutOfStock = (cat === "Drugs");

    card.innerHTML = `
      <div class="cat__bar"></div>
      <div class="cat__head">
        <div>
          <h3 class="cat__title">
            <img class="cat__icon" src="${theme.image}" alt="${cat}" />
            <span>${cat}</span>
          </h3>
          ${
            drugsOutOfStock
              ? `<div class="cat__desc"><span class="badge badge--danger">OUT OF STOCK</span></div>`
              : (desc ? `<div class="cat__desc">${desc}</div>` : ``)
          }
        </div>
        <div class="cat__meta">
          ${
            headerTag
              ? `<span class="badge">
                   <span class="money">
                     <img class="money__icon" src="${headerTag.icon}" alt="$" />
                     <span>${headerTag.text}</span>
                   </span>
                 </span>`
              : ``
          }
        </div>
      </div>
      <div class="cat__list"></div>
    `;

    const list = card.querySelector(".cat__list");

    // Drugs: no items
    if (drugsOutOfStock){
      grid.appendChild(card);
      continue;
    }

    // Sort: qty desc then name
    const sorted = [...catItems].sort((a,b) => {
      const qa = Number(a.quantity)||0, qb = Number(b.quantity)||0;
      if (qb !== qa) return qb - qa;
      return String(a.name).localeCompare(String(b.name));
    });

    for (const it of sorted){
      const qty = Number(it.quantity) || 0;
      const priceLabel = priceLabelFor(it);

      const row = document.createElement("div");
      row.className = "item";

      // Devices: no per-item prices
      if (cat === "Devices"){
        row.innerHTML = `
          <div class="item__left">
            <div class="item__name">${it.name}</div>
          </div>
          <div class="item__right">
            <span class="badge">x ${qty.toLocaleString()}</span>
          </div>
        `;
        list.appendChild(row);
        continue;
      }

      // Money: show "144 millions available"
      if (cat === "Money"){
        row.innerHTML = `
          <div class="item__left">
            <div class="item__name">${qty.toLocaleString()} millions available</div>
          </div>
          <div class="item__right">
            <span class="badge">
              <span class="money">
                <img class="money__icon" src="${MONEY_ICON}" alt="$" />
                <span>$100/million</span>
              </span>
            </span>
          </div>
        `;
        list.appendChild(row);
        continue;
      }

      // Weapons: qty + price label
      row.innerHTML = `
        <div class="item__left">
          <div class="item__name">${it.name}</div>
        </div>
        <div class="item__right">
          <span class="badge">x ${qty.toLocaleString()}</span>
          ${
            priceLabel
              ? `<span class="badge">
                   <span class="money">
                     <img class="money__icon" src="${MONEY_ICON}" alt="$" />
                     <span>${priceLabel}</span>
                   </span>
                 </span>`
              : ``
          }
        </div>
      `;
      list.appendChild(row);
    }

    grid.appendChild(card);
  }
}

function hydrateKpis(allItems){
  const stats = computeStats(allItems);

  const totalEl = document.getElementById("kpiTotalItems");
  const catsEl = document.getElementById("kpiCategories");

  if (totalEl) totalEl.textContent = stats.totalItems.toLocaleString();
  if (catsEl) catsEl.textContent = stats.categories.toLocaleString();

  buildQuickChips(allItems);
}

// ===============================
// SEARCH/FILTER/SORT
// ===============================
function getFilteredItems(){
  const q = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();
  const cat = document.getElementById("categoryFilter")?.value || "ALL";
  const sort = document.getElementById("sortBy")?.value || "NAME_ASC";

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
  fillFilters();

  const rerender = () => {
    const filtered = getFilteredItems();
    render(filtered);
    hydrateKpis(INVENTORY); // chips should reflect full inventory, not filtered
  };

  document.getElementById("searchInput")?.addEventListener("input", rerender);
  document.getElementById("categoryFilter")?.addEventListener("change", rerender);
  document.getElementById("sortBy")?.addEventListener("change", rerender);

  rerender();
}

// Init
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

applyThemeToggle();
bindDisclaimer();
bindUI();
