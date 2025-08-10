/* ================= PRODUCT DATA ================= */
/**
 * Static product list used across filters.
 * NOTE: Keep `type` values consistent: "set" | "single" | "bundle".
 */
const allProducts = [
  { name: "The Complete Set", flavour: "6 different flavours, 6 diffusers - one pack", desc: "For Every Mood, All in One Pack", img: "https://github.com/somka890/img/blob/main/img/the%20complete%20set.png?raw=true", price_new: "$70.00", price_old: "$113.70", discount: "40% Off", soldOut: false, type: "set" },
  { name: "Mullein Diffuser", flavour: "Detox Flavour", desc: "For Lung Reset, Immune and Natural Detox", img: "https://github.com/somka890/img/blob/main/img/mullein%20diffuser.png?raw=true", price_new: "$16.11", price_old: "$18.95", discount: "15% Off", soldOut: false, type: "single" },
  { name: "Calm Diffuser", flavour: "Peach Cream Flavour", desc: "For Emotional Wellness & Mental Clarity", img: "https://github.com/somka890/img/blob/main/img/calm%20diffuser.png?raw=true", price_new: "$16.11", price_old: "$18.95", discount: "15% Off", soldOut: false, type: "single" },
  { name: "Vitamin B-12 Diffuser", flavour: "Strawberry Kiwi Flavour", desc: "For Brain Power, Better Mood & Focus", img: "https://github.com/somka890/img/blob/main/img/vitamin%20b-12%20diffuser.png?raw=true", price_new: "$16.11", price_old: "$18.95", discount: "15% Off", soldOut: false, type: "single" },
  { name: "Caffeine Diffuser", flavour: "Cherry Ice Flavour", desc: "For Fast Energy Without The Crash", img: "https://github.com/somka890/img/blob/main/img/caffeine%20diffuser.png?raw=true", price_new: "$16.11", price_old: "$18.95", discount: "15% Off", soldOut: false, type: "single" },
  { name: "Gaming Diffuser", flavour: "Glowberry Flavour", desc: "For Mental Sharpness & Hyper Focus", img: "https://github.com/somka890/img/blob/main/img/gaming%20diffuser.png?raw=true", price_new: "$16.11", price_old: "$18.95", discount: "15% Off", soldOut: false, type: "single" },
  { name: "Melatonin Diffuser", flavour: "Lavender Berry Flavour", desc: "For Balanced Sleep Cycle & Deep Sleep", img: "https://github.com/somka890/img/blob/main/img/melatonin%20diffuser.png?raw=true", price_new: "$16.11", price_old: "$18.95", discount: "15% Off", soldOut: false, type: "single" },
  { name: "Best Of Pure", flavour: "4 different flavours, 4 diffusers", desc: "For Every Mood, All in One Bundle", img: "https://github.com/somka890/img/blob/main/img/best%20of%20pure.png?raw=true", price_new: "$42.79", price_old: "$71.32", discount: "40% Off", soldOut: false, type: "bundle" },
  { name: "Lung Reset Pack", flavour: "3 different flavours, 6 diffusers", desc: "For Lung Reset, All in One Bundle", img: "https://github.com/somka890/img/blob/main/img/lung%20reset%20pack.png?raw=true", price_new: "$64.18", price_old: "$106.97", discount: "40% Off", soldOut: false, type: "bundle" },
  { name: "Sweet Dreams", flavour: "4 different flavours, 6 diffusers", desc: "For Sweet Dreams & Calm Nights", img: "https://github.com/somka890/img/blob/main/img/sweet%20dreams.png?raw=true", price_new: "$64.18", price_old: "$106.97", discount: "40% Off", soldOut: false, type: "bundle" },
  { name: "The Night + Day Kit", flavour: "5 different flavours, 8 diffusers", desc: "For Night & Day, All in One Bundle", img: "https://github.com/somka890/img/blob/main/img/the%20night%20+%20day%20kit.png?raw=true", price_new: "$85.58", price_old: "$142.63", discount: "40% Off", soldOut: false, type: "bundle" },
  { name: "Game Mode", flavour: "8 different flavours, 8 diffusers", desc: "For Game Mode, All in One Bundle", img: "https://github.com/somka890/img/blob/main/img/game%20mode.png?raw=true", price_new: "$85.58", price_old: "$142.63", discount: "40% Off", soldOut: false, type: "bundle" },
  { name: "The Sampler", flavour: "Ten different flavours, 10 diffusers", desc: "For Every Mood, All in One Bundle", img: "https://github.com/somka890/img/blob/main/img/the%20sampler.png?raw=true", price_new: "$85.58", price_old: "$142.63", discount: "40% Off", soldOut: false, type: "bundle" },
];

/* ================= FILTERING ================= */
/**
 * Filters list by type and controls ordering.
 * EXPLANATION:
 * - "all": we intentionally place the single "set" product first (hero product),
 *   then all "single" items, followed by "bundle" items.
 * - "single": only products with type === "single".
 * - "bundle": we again prepend the "set" (if present), then all bundle items.
 *   This creates a consistent merchandising story with the set as a lead-in.
 */
function filterProducts(type) {
  let filtered;

  if (type === 'all') {
    const setProduct = allProducts.find(p => p.type === 'set');
    const singles = allProducts.filter(p => p.type === 'single');
    const bundles = allProducts.filter(p => p.type === 'bundle');
    // Ensure we don't accidentally add undefined or duplicates.
    filtered = [
      ...(setProduct ? [setProduct] : []),
      ...singles,
      ...bundles
    ];
  } else if (type === 'single') {
    filtered = allProducts.filter(p => p.type === 'single');
  } else if (type === 'bundle') {
    const setProduct = allProducts.find(p => p.type === 'set');
    const bundles = allProducts.filter(p => p.type === 'bundle');
    filtered = [
      ...(setProduct ? [setProduct] : []),
      ...bundles
    ];
  } else {
    // Safety fallback: unknown type -> show all
    filtered = allProducts.slice();
  }

  renderProducts(filtered);
}

/* ================= RENDERING ================= */
/**
 * Renders product cards into the grid.
 * EXPLANATION:
 * - We rebuild grid each time (simple + predictable).
 * - Each card gets a type class (set/single/bundle) to let CSS apply responsive layout rules.
 * - Sold-out products:
 *   - Button is disabled and gets "sold-out" class for styling.
 *   - Title color is dimmed inline (kept from your original logic).
 */
function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  if (!grid) {
    // Defensive: prevents errors if the element is missing.
    console.warn('#products-grid not found in DOM.');
    return;
  }

  grid.innerHTML = '';

  // Optional: empty state for filters with zero results
  if (!products || products.length === 0) {
    const empty = document.createElement('div');
    empty.style.gridColumn = '1 / -1';
    empty.style.textAlign = 'center';
    empty.style.padding = '16px';
    empty.innerText = 'No products found.';
    grid.appendChild(empty);
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = `product-card ${product.type || ''}`;

    // Performance: lazy + async; Basic robustness: onerror fallback
    const imgHTML = `
      <img
        src="${product.img}"
        alt="${product.name}"
        class="product-img"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null; this.src='https://via.placeholder.com/600x600?text=Image+unavailable';"
      >
    `;

    card.innerHTML = `
      ${imgHTML}
      <div class="product-info">
        <div class="product-title"${product.soldOut ? ' style="color:#444;"' : ''}>
          ${product.soldOut ? '(Sold Out) ' : ''}<i>${product.name}</i>
        </div>
        <div class="product-flavour">${product.flavour}</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-price-row">
          <span class="product-price-new">${product.price_new}</span>
          <span class="product-price-old">${product.price_old}</span>
          <span class="product-discount">${product.discount}</span>
        </div>
      </div>
      <button class="product-btn${product.soldOut ? ' sold-out' : ''}" ${product.soldOut ? 'disabled' : ''}>
        ${product.soldOut ? 'Sold Out' : 'Get It Now'}
      </button>
    `;

    grid.appendChild(card);
  });
}

/* ================= TABS (UI CONTROL) ================= */
/**
 * Tab click behavior:
 * - Sets .active class for styling.
 * - Reads data-filter (expected: "all" | "single" | "bundle").
 * - Calls filterProducts with that value.
 * EXPLANATION:
 * Using data attributes keeps HTML declarative:
 * <button class="tab" data-filter="single">Singles</button>
 */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter; // "all" | "single" | "bundle"
    filterProducts(filter);
  });
});

/* ================= INITIAL LOAD ================= */
/**
 * On DOM ready, we render default view ("all").
 * EXPLANATION:
 * This ensures content is visible even if user hasn't interacted with tabs yet.
 */
document.addEventListener('DOMContentLoaded', function () {
  filterProducts('all');
});
