/* =========================================================
   SHOPPIE-SPORT — app.js
   Semua logika interaktif toko: render produk, filter/search,
   keranjang belanja (localStorage), modal detail produk,
   checkout + simulasi pembayaran, dan event Analytics (dummy).
   ========================================================= */

/* ---------------------------------------------------------
   1. DATA PRODUK
   Minimal 8-10 produk sesuai ketentuan tugas (di sini 12).
   Setiap produk punya: id, name, category, price, image,
   description, tag (opsional), rating (opsional).
--------------------------------------------------------- */
const PRODUCTS = [
    {
        id: 1,
        name: "Sepatu Lari Aero Runner",
        category: "Sepatu",
        price: 450000,
        image: "image/sepatu lari aero runner.jpg",
        tag: "Terlaris",
        desc: "Sepatu lari ringan dengan sol responsif dan bantalan empuk, dirancang untuk menemani lari harian maupun latihan interval jarak jauh."
    },
    {
        id: 2,
        name: "Sepatu Basket High Top X1",
        category: "Sepatu",
        price: 520000,
        image: "image/sepatu basket.jpg",
        tag: "Baru",
        desc: "Sepatu basket dengan ankle support tinggi dan grip outsole yang kuat, cocok untuk pergerakan cepat di lapangan indoor maupun outdoor."
    },
    {
        id: 3,
        name: "Sepatu Futsal Turf Grip",
        category: "Sepatu",
        price: 380000,
        image: "image/sepatu futsal.jpg",
        desc: "Didesain khusus untuk lapangan turf, memberikan traksi maksimal dan kontrol bola yang presisi di setiap sentuhan."
    },
    {
        id: 4,
        name: "Jersey Olahraga",
        category: "Pakaian",
        price: 175000,
        image: "image/jersey olahraga.jpg",
        tag: "Terlaris",
        desc: "Jersey berbahan dry-fit yang menyerap keringat dengan cepat, menjaga tubuh tetap sejuk selama pertandingan atau latihan."
    },
    {
        id: 5,
        name: "Celana Training Cargo Jogger",
        category: "Pakaian",
        price: 135000,
        image: "image/celana training cargo jogger.jpg",
        desc: "Celana jogger elastis dengan potongan tapered, nyaman dipakai untuk lari, gym, maupun aktivitas kasual sehari-hari."
    },
    {
        id: 6,
        name: "Jaket Windbreaker Sport",
        category: "Pakaian",
        price: 210000,
        image: "image/Jaket Windbreaker Sport.jpg",
        tag: "Baru",
        desc: "Jaket ringan anti-angin dengan lapisan water-resistant, cocok dipakai saat lari pagi atau bersepeda di cuaca tak menentu."
    },
    {
        id: 7,
        name: "Matras Yoga Premium",
        category: "Peralatan",
        price: 120000,
        image: "image/Matras Yoga Premium.jpg",
        desc: "Matras anti-slip dengan ketebalan optimal untuk kenyamanan sendi saat yoga, pilates, maupun latihan lantai lainnya."
    },
    {
        id: 8,
        name: "Dumbbell Set 5kg (Sepasang)",
        category: "Peralatan",
        price: 350000,
        image: "image/Dumbbell Set 5kg (Sepasang).jpg",
        desc: "Set dumbbell vinyl anti karat, ideal untuk latihan kekuatan di rumah tanpa perlu ke gym."
    },
    {
        id: 9,
        name: "Resistance Band Set (5 Level)",
        category: "Peralatan",
        price: 95000,
        image: "image/Resistance Band Set (5 Level).jpg",
        desc: "Lima tingkat resistensi dalam satu paket, cocok untuk latihan kekuatan, rehabilitasi otot, maupun pemanasan."
    },
    {
        id: 10,
        name: "Tas Olahraga Gym Bag",
        category: "Aksesoris",
        price: 145000,
        image: "image/Tas Olahraga Gym Bag.jpg",
        desc: "Tas serbaguna dengan kompartemen sepatu terpisah, cukup luas untuk membawa perlengkapan gym harianmu."
    },
    {
        id: 11,
        name: "Botol Minum Sport 750ml",
        category: "Aksesoris",
        price: 65000,
        image: "image/Botol Minum Sport 750ml.jpg",
        desc: "Botol minum BPA-free dengan penanda takaran, membantu menjaga hidrasi selama latihan atau pertandingan."
    },
    {
        id: 12,
        name: "Sarung Tangan Fitness",
        category: "Aksesoris",
        price: 55000,
        image: "image/Sarung Tangan Fitness.jpg",
        desc: "Melindungi telapak tangan dari lecet saat angkat beban, dilengkapi grip anti-selip untuk pegangan yang lebih kuat."
    }
];

/* ---------------------------------------------------------
   2. STATE APLIKASI
--------------------------------------------------------- */
let cart = [];               // { id, name, price, qty, image }
let currentFilters = { search: "", category: "all", price: "all" };
let activeDetailProduct = null;

const CART_STORAGE_KEY = "shoppieSportCart";

/* ---------------------------------------------------------
   3. UTIL
--------------------------------------------------------- */
function formatRp(n) {
    return "Rp " + n.toLocaleString("id-ID");
}

function saveCartToStorage() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
        console.warn("Gagal menyimpan keranjang ke localStorage:", err);
    }
}

function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        cart = raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.warn("Gagal memuat keranjang dari localStorage:", err);
        cart = [];
    }
}

/* ---------------------------------------------------------
   4. GOOGLE ANALYTICS (DUMMY) — EVENT TRACKING
   Catatan: gtag() sudah didefinisikan sebagai fungsi dummy
   di index.html (lihat komentar di <head>). Panggilan di
   bawah ini mensimulasikan event yang akan dikirim ke GA4
   pada implementasi produksi sesungguhnya.
   Metrik yang dipantau: page_view, view_item, add_to_cart,
   begin_checkout, purchase, search, dan bounce/engagement
   time yang otomatis dicatat oleh GA4.
--------------------------------------------------------- */
function trackEvent(eventName, params) {
    if (typeof gtag === "function") {
        gtag("event", eventName, params || {});
    }
}

/* ---------------------------------------------------------
   5. RENDER PRODUK
--------------------------------------------------------- */
function getFilteredProducts() {
    return PRODUCTS.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(currentFilters.search.toLowerCase());

        const matchCategory = currentFilters.category === "all" || p.category === currentFilters.category;

        let matchPrice = true;
        if (currentFilters.price === "under100") matchPrice = p.price < 100000;
        else if (currentFilters.price === "100to250") matchPrice = p.price >= 100000 && p.price <= 250000;
        else if (currentFilters.price === "250to500") matchPrice = p.price > 250000 && p.price <= 500000;
        else if (currentFilters.price === "above500") matchPrice = p.price > 500000;

        return matchSearch && matchCategory && matchPrice;
    });
}

function renderProducts() {
    const grid = document.getElementById("products-grid");
    const emptyState = document.getElementById("products-empty");
    const list = getFilteredProducts();

    if (!list.length) {
        grid.innerHTML = "";
        emptyState.style.display = "block";
        return;
    }
    emptyState.style.display = "none";

    grid.innerHTML = list.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-img-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.tag ? `<div class="product-tag">${p.tag}</div>` : ""}
            </div>
            <div class="product-info">
                <p class="product-category">${p.category}</p>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${formatRp(p.price)}</span>
                    <button class="add-to-cart-btn" data-id="${p.id}">+ Keranjang</button>
                </div>
            </div>
        </div>
    `).join("");

    // Klik kartu (selain tombol) -> buka detail produk
    grid.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.closest(".add-to-cart-btn")) return;
            openProductDetail(+card.dataset.id);
        });
    });

    // Tombol tambah langsung dari grid
    grid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(+btn.dataset.id, 1);
        });
    });
}

/* ---------------------------------------------------------
   6. FILTER & SEARCH
--------------------------------------------------------- */
function initFilters() {
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("category-filter");
    const priceSelect = document.getElementById("price-filter");
    const resetBtn = document.getElementById("filter-reset");

    searchInput.addEventListener("input", () => {
        currentFilters.search = searchInput.value.trim();
        renderProducts();
        if (currentFilters.search.length > 1) {
            trackEvent("search", { search_term: currentFilters.search });
        }
    });

    categorySelect.addEventListener("change", () => {
        currentFilters.category = categorySelect.value;
        renderProducts();
    });

    priceSelect.addEventListener("change", () => {
        currentFilters.price = priceSelect.value;
        renderProducts();
    });

    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "all";
        priceSelect.value = "all";
        currentFilters = { search: "", category: "all", price: "all" };
        renderProducts();
    });
}

/* ---------------------------------------------------------
   7. MODAL DETAIL PRODUK
--------------------------------------------------------- */
function openProductDetail(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    activeDetailProduct = product;

    document.getElementById("detail-img").src = product.image;
    document.getElementById("detail-img").alt = product.name;
    document.getElementById("detail-category").textContent = product.category;
    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-desc").textContent = product.desc;
    document.getElementById("detail-price").textContent = formatRp(product.price);
    document.getElementById("detail-qty").value = 1;

    trackEvent("view_item", {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        value: product.price
    });

    openModal("detail-modal");
}

function initDetailModal() {
    document.getElementById("detail-qty-minus").addEventListener("click", () => {
        const input = document.getElementById("detail-qty");
        input.value = Math.max(1, (+input.value || 1) - 1);
    });
    document.getElementById("detail-qty-plus").addEventListener("click", () => {
        const input = document.getElementById("detail-qty");
        input.value = (+input.value || 1) + 1;
    });
    document.getElementById("detail-add-btn").addEventListener("click", () => {
        if (!activeDetailProduct) return;
        const qty = Math.max(1, +document.getElementById("detail-qty").value || 1);
        addToCart(activeDetailProduct.id, qty);
        closeModal("detail-modal");
    });
}

/* ---------------------------------------------------------
   8. KERANJANG BELANJA
--------------------------------------------------------- */
function addToCart(id, qty) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });

    saveCartToStorage();
    updateBadge();
    showMessage("✓ Ditambahkan!", `${product.name} berhasil ditambahkan ke keranjang.`);

    trackEvent("add_to_cart", {
        item_id: product.id,
        item_name: product.name,
        quantity: qty,
        value: product.price * qty
    });
}

function updateBadge() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById("cart-badge").textContent = total;
}

function renderCart() {
    const el = document.getElementById("cart-items");
    if (!cart.length) {
        el.innerHTML = '<p>Keranjang Anda kosong.</p>';
        return;
    }
    el.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-main">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price-each">${formatRp(item.price)} / item</div>
                <div class="qty-stepper">
                    <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
                </div>
            </div>
            <div class="cart-item-detail">
                <span class="cart-item-price">${formatRp(item.price * item.qty)}</span>
                <button class="cart-item-remove" data-idx="${idx}" title="Hapus">×</button>
            </div>
        </div>
    `).join("");

    el.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = +btn.dataset.idx;
            if (btn.dataset.action === "inc") cart[idx].qty++;
            else cart[idx].qty = Math.max(1, cart[idx].qty - 1);
            saveCartToStorage();
            renderCart(); updateTotal(); updateBadge();
        });
    });

    el.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const removed = cart[+btn.dataset.idx];
            cart.splice(+btn.dataset.idx, 1);
            saveCartToStorage();
            renderCart(); updateTotal(); updateBadge();
            if (removed) trackEvent("remove_from_cart", { item_id: removed.id, item_name: removed.name });
        });
    });
}

function updateTotal() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById("cart-total").textContent = formatRp(total);
}

function initCart() {
    document.getElementById("cart-icon").addEventListener("click", () => {
        renderCart(); updateTotal();
        openModal("cart-modal");
    });

    document.getElementById("clear-cart-btn").addEventListener("click", () => {
        cart = [];
        saveCartToStorage();
        renderCart(); updateTotal(); updateBadge();
    });

    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (!cart.length) {
            showMessage("Keranjang Kosong", "Tambahkan produk terlebih dahulu sebelum checkout.");
            return;
        }
        closeModal("cart-modal");
        renderCheckoutSummary();
        openModal("checkout-modal");
        trackEvent("begin_checkout", {
            value: cart.reduce((s, i) => s + i.price * i.qty, 0),
            items: cart.length
        });
    });
}

/* ---------------------------------------------------------
   9. CHECKOUT + VALIDASI + SIMULASI PEMBAYARAN
--------------------------------------------------------- */
function renderCheckoutSummary() {
    const el = document.getElementById("checkout-summary");
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    el.innerHTML = cart.map(i => `
        <div class="checkout-summary-row">
            <span>${i.name} × ${i.qty}</span>
            <span>${formatRp(i.price * i.qty)}</span>
        </div>
    `).join("") + `
        <div class="checkout-summary-row checkout-summary-total">
            <span>Total</span>
            <span>${formatRp(total)}</span>
        </div>
    `;
}

function initCheckout() {
    document.querySelectorAll(".payment-option").forEach(opt => {
        opt.addEventListener("click", () => {
            document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            document.getElementById("payment-method").value = opt.dataset.method;
            document.getElementById("payment-error").textContent = "";
        });
    });

    document.getElementById("checkout-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("shipping-name").value.trim();
        const address = document.getElementById("shipping-address").value.trim();
        const phone = document.getElementById("shipping-phone").value.trim();
        const method = document.getElementById("payment-method").value;

        // Validasi sederhana
        const phoneRegex = /^[0-9+\s-]{9,15}$/;
        let hasError = false;

        if (name.length < 3) {
            document.getElementById("name-error").textContent = "Nama minimal 3 karakter.";
            hasError = true;
        } else {
            document.getElementById("name-error").textContent = "";
        }

        if (address.length < 10) {
            document.getElementById("address-error").textContent = "Alamat terlalu singkat, mohon lengkapi.";
            hasError = true;
        } else {
            document.getElementById("address-error").textContent = "";
        }

        if (!phoneRegex.test(phone)) {
            document.getElementById("phone-error").textContent = "Nomor telepon tidak valid.";
            hasError = true;
        } else {
            document.getElementById("phone-error").textContent = "";
        }

        if (!method) {
            document.getElementById("payment-error").textContent = "Pilih metode pembayaran terlebih dahulu.";
            hasError = true;
        }

        if (hasError) return;

        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

        // Simulasi proses payment gateway (mis. Midtrans/Xendit dummy)
        showMessage("⏳ Memproses Pembayaran...", "Mohon tunggu, kami sedang memverifikasi pembayaran Anda (simulasi).");

        setTimeout(() => {
            closeModal("message-modal");
            trackEvent("purchase", {
                value: total,
                payment_method: method,
                currency: "IDR",
                items: cart.length
            });

            closeModal("checkout-modal");
            cart = [];
            saveCartToStorage();
            updateBadge();
            document.getElementById("checkout-form").reset();
            document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
            document.getElementById("payment-method").value = "";

            showMessage("🎉 Pesanan Dikonfirmasi!",
                `Halo ${name},\n\nTerima kasih atas pesanan Anda!\n\nTotal: ${formatRp(total)}\nMetode: ${method}\n\n(Ini adalah simulasi payment gateway untuk keperluan tugas — tidak ada transaksi nyata.)`);
        }, 1200);
    });
}

/* ---------------------------------------------------------
   10. FORM KONTAK (dummy submit)
--------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        showMessage("Pesan Terkirim!", "Terima kasih! Tim kami akan menghubungi Anda segera.");
        form.reset();
    });
}

/* ---------------------------------------------------------
   11. MODAL HELPERS (generik)
--------------------------------------------------------- */
function openModal(id) { document.getElementById(id).classList.add("active"); }
function closeModal(id) { document.getElementById(id).classList.remove("active"); }

function showMessage(title, body) {
    document.getElementById("message-modal-title").textContent = title;
    document.getElementById("message-modal-body").textContent = body;
    openModal("message-modal");
}

function initModalGenerics() {
    document.querySelectorAll(".modal-close, #message-modal-close-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
        });
    });
    document.querySelectorAll(".modal").forEach(m => {
        m.addEventListener("click", (e) => {
            if (e.target === m) m.classList.remove("active");
        });
    });
}

/* ---------------------------------------------------------
   12. NAVBAR: hamburger + smooth scroll
--------------------------------------------------------- */
function initNavbar() {
    document.getElementById("menu-button").addEventListener("click", () => {
        const m = document.getElementById("mobile-menu");
        m.classList.toggle("open");
    });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", (e) => {
            const targetId = a.getAttribute("href");
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            document.getElementById("mobile-menu").classList.remove("open");
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

/* ---------------------------------------------------------
   13. SCROLL REVEAL ANIMATION (subtle)
--------------------------------------------------------- */
function initScrollReveal() {
    const items = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   14. INIT
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
    renderProducts();
    updateBadge();

    initFilters();
    initDetailModal();
    initCart();
    initCheckout();
    initContactForm();
    initModalGenerics();
    initNavbar();
    initScrollReveal();

    trackEvent("page_view", { page_title: "Shoppie-Sport Home" });
});
