# Shoppie-Sport 🏃‍♂️

Website e-commerce perlengkapan olahraga — dibangun dengan **HTML, CSS, dan JavaScript murni (vanilla)**, tanpa framework maupun library eksternal, sesuai ketentuan tugas.

**Live Demo:** _(isi dengan URL GitHub Pages setelah deploy, contoh: `https://username.github.io/shoppie-sport/`)_

---

## 1. Ringkasan Bisnis

### 1.1 Nama Bisnis & Deskripsi
**Shoppie-Sport** adalah toko daring (e-commerce) yang menjual perlengkapan olahraga — sepatu, pakaian/apparel, peralatan latihan, dan aksesoris — untuk masyarakat Indonesia yang menjalani gaya hidup aktif.

### 1.2 Value Proposition
- **Harga terjangkau** untuk produk olahraga berkualitas, tanpa mengorbankan performa.
- **Kurasi produk terfokus** (bukan katalog masif yang membingungkan) — setiap item dipilih untuk kebutuhan olahraga umum: lari, bola, gym, dan fitness harian.
- **Pengalaman belanja cepat**: filter & pencarian produk, keranjang tersimpan otomatis (localStorage), dan proses checkout yang ringkas.
- **Kepercayaan lokal**: dukungan pelanggan responsif dan garansi kepuasan produk.

### 1.3 Target Market & Segmentasi Pelanggan
| Segmen | Karakteristik |
|---|---|
| Pelajar & mahasiswa | Usia 15–24 tahun, mencari gear olahraga sekolah/kampus dengan harga bersahabat |
| Pekerja aktif (young professional) | Usia 25–35 tahun, rutin gym/lari/futsal setelah jam kerja, mengutamakan kenyamanan & kualitas |
| Komunitas olahraga amatir | Anggota klub lari, futsal, atau basket yang membeli dalam jumlah kecil-menengah (jersey tim, dsb.) |
| Orang tua | Membelikan perlengkapan olahraga untuk anak sekolah |

Segmentasi dilakukan berdasarkan **demografis** (usia, pendapatan), **perilaku** (frekuensi olahraga), dan **psikografis** (gaya hidup aktif/sehat).

### 1.4 Analisis Pasar Singkat & Kompetitor
Pasar perlengkapan olahraga online di Indonesia tumbuh seiring meningkatnya kesadaran gaya hidup sehat pasca-pandemi, didorong oleh tren lari, gym, dan olahraga komunitas. Kompetitor utama meliputi marketplace besar (Tokopedia/Shopee kategori olahraga), retailer brand global (Nike, Adidas, Decathlon), dan toko lokal sejenis.

**Diferensiasi Shoppie-Sport:**
- Fokus pada kategori terkurasi, bukan katalog masif seperti marketplace.
- UX ringkas berorientasi konversi cepat (tanpa perlu instal aplikasi/akun marketplace).
- Harga bersaing untuk segmen menengah, sebagai alternatif produk brand global yang lebih mahal.

### 1.5 Strategi Manajemen Produk & Katalog
- **Kategori**: Sepatu, Pakaian, Peralatan, Aksesoris — dipilih agar navigasi tetap sederhana namun mencakup kebutuhan olahraga utama.
- **Deskripsi produk**: singkat, menonjolkan manfaat fungsional (mis. "menyerap keringat", "anti-slip") bukan hanya spesifikasi teknis.
- **Visual produk**: foto konsisten (rasio 1:1), latar bersih, agar katalog terlihat rapi di grid.
- **Label promosi**: tag "Terlaris" dan "Baru" pada kartu produk untuk mengarahkan perhatian dan mendorong keputusan beli lebih cepat.

### 1.6 Model Bisnis & Revenue Stream
- **Model bisnis**: B2C direct-to-consumer, penjualan retail online dengan sistem beli-putus (bukan langganan).
- **Sumber pendapatan utama**: margin penjualan produk (selisih harga beli grosir vs harga jual).
- **Potensi tambahan** (rencana pengembangan): ongkos kirim berbayar (jika di atas radius tertentu), bundling produk (mis. paket "lari starter kit"), dan kerja sama konsinyasi dengan brand lokal.

### 1.7 Strategi Harga, Promosi, dan Diskon
- **Strategi harga**: penetapan harga kompetitif (competitive pricing) dengan margin wajar, diposisikan di bawah harga brand global untuk kategori serupa.
- **Promosi**: highlight produk "Terlaris"/"Baru" di katalog, testimoni pelanggan untuk membangun kepercayaan sosial (social proof), dan strip statistik (jumlah pelanggan, rating) di atas katalog.
- **Rencana diskon** (pengembangan lanjutan): diskon musiman (mis. promo Hari Olahraga Nasional), diskon pembelian kedua, dan kode voucher untuk pelanggan baru.

### 1.8 Proses Checkout & Simulasi Payment Gateway
Alur checkout pada website ini:
1. Pelanggan menambahkan produk ke keranjang (tersimpan otomatis via `localStorage`, tidak hilang saat halaman di-refresh).
2. Pelanggan membuka keranjang, dapat mengubah jumlah (+/-), menghapus item, dan melihat total otomatis.
3. Klik **Checkout** membuka form pengiriman (nama, alamat, telepon) dengan validasi sederhana (panjang minimum, format nomor telepon).
4. Pelanggan memilih metode pembayaran — pada versi ini disimulasikan sebagai **Transfer Bank (Midtrans dummy)**, **E-Wallet (Xendit dummy)**, atau **COD**.
5. Setelah submit, sistem menampilkan status "memproses pembayaran" (simulasi loading), lalu konfirmasi pesanan berhasil.

> **Catatan implementasi:** Payment gateway pada proyek ini adalah **simulasi (dummy)** untuk keperluan tugas — tidak terhubung ke API pembayaran nyata. Untuk produksi sesungguhnya, direkomendasikan integrasi **Midtrans** atau **Xendit** karena keduanya menyediakan SDK JavaScript resmi, mendukung berbagai metode pembayaran lokal (VA, e-wallet, QRIS), dan memiliki dokumentasi lengkap untuk merchant Indonesia.

### 1.9 Rencana SEO, Keamanan, dan Pemeliharaan
**SEO:**
- Gunakan tag `<title>` dan `<meta name="description">` yang deskriptif (sudah diterapkan di `index.html`).
- Gunakan struktur heading yang logis (`h1` untuk hero, `h2` untuk judul seksi, `h3` untuk sub-item).
- Optimalkan `alt` text pada setiap gambar produk agar dapat diindeks oleh mesin pencari.
- Rencana lanjutan: sitemap.xml, robots.txt, dan schema markup produk (`Product`, `Offer`) untuk rich snippet di hasil pencarian.

**Keamanan:**
- Validasi input form dilakukan di sisi client (JavaScript) sebagai lapisan pertama; pada implementasi produksi wajib ditambahkan validasi & sanitasi di sisi server.
- Tidak menyimpan data sensitif (nomor kartu, kata sandi) di `localStorage` — hanya data keranjang non-sensitif.
- Rencana lanjutan: gunakan HTTPS (otomatis tersedia di GitHub Pages), tambahkan proteksi CSRF dan rate-limiting saat backend nyata dibangun.

**Pemeliharaan:**
- Perbarui katalog produk secara berkala (harga, stok, foto).
- Pantau error console/browser secara rutin setelah setiap pembaruan.
- Gunakan commit history yang rapi di Git agar mudah melakukan rollback jika terjadi bug.

### 1.10 Rencana Penggunaan Data Analytics untuk Pengambilan Keputusan
Website ini menyertakan integrasi **Google Analytics (dummy)** di `index.html` yang mensimulasikan pengiriman event berikut (lihat komentar pada kode dan fungsi `trackEvent()` di `app.js`):

| Event | Kegunaan untuk Bisnis |
|---|---|
| `page_view` | Mengukur jumlah kunjungan & halaman terpopuler |
| `search` | Mengetahui kata kunci yang paling dicari → dasar penambahan stok/kategori baru |
| `view_item` | Mengetahui produk yang paling sering dilihat → dasar strategi promosi |
| `add_to_cart` | Mengukur minat beli awal, dibandingkan dengan `purchase` untuk menghitung **cart abandonment rate** |
| `begin_checkout` | Mengukur berapa banyak yang memulai checkout tapi tidak menyelesaikannya |
| `purchase` | Metrik **conversion rate** utama — dasar evaluasi efektivitas katalog & harga |
| Bounce rate & waktu di halaman | Otomatis dicatat GA4 → indikator apakah desain/isi halaman cukup menarik |

**Rencana pemanfaatan data:** metrik `add_to_cart` vs `purchase` digunakan untuk mengidentifikasi hambatan di proses checkout (mis. metode pembayaran kurang lengkap); metrik `search` digunakan untuk memperluas katalog sesuai permintaan pelanggan; dan bounce rate per halaman digunakan untuk mengevaluasi copywriting maupun kecepatan muat halaman.

---

## 2. Dokumentasi Teknis

### 2.1 Fitur yang Diimplementasikan
- ✅ Responsive design (desktop, tablet, mobile) dengan media query
- ✅ Navbar + Hero Banner
- ✅ Katalog produk (12 produk, 4 kategori)
- ✅ Modal Detail Produk (gambar, deskripsi, pemilihan jumlah)
- ✅ Keranjang belanja: Add to Cart, Update Quantity (+/-), Remove, Total Otomatis
- ✅ Checkout (form + simulasi payment gateway: Midtrans/Xendit/COD dummy)
- ✅ Footer lengkap (navigasi, kategori, sosial media)
- ✅ Filter & Search produk (kategori, rentang harga, nama)
- ✅ Keranjang belanja tersimpan di `localStorage`
- ✅ Perhitungan total otomatis + validasi form checkout
- ✅ Smooth scrolling & animasi scroll-reveal
- ✅ Google Analytics (dummy) + penjelasan metrik
- ✅ Desain modern dengan Flexbox & CSS Grid

### 2.2 Struktur Folder
```
shoppie-sport/
├── index.html      # Struktur halaman utama
├── style.css       # Seluruh styling (tema, layout, responsive)
├── app.js          # Data produk & seluruh logika interaktif
└── README.md       # Dokumentasi ini
```

### 2.3 Cara Menjalankan Secara Lokal
1. Clone/download repository ini.
2. Buka file `index.html` langsung di browser, **atau**
3. Jalankan local server sederhana (disarankan agar `localStorage` bekerja optimal):
   ```bash
   # Python 3
   python -m http.server 8000
   # lalu buka http://localhost:8000
   ```

### 2.4 Deployment ke GitHub Pages
1. Push seluruh isi folder ini ke repository GitHub (pribadi atau grup maks. 3 orang).
2. Buka **Settings → Pages** pada repository.
3. Pilih source branch `main` (atau `master`) dan folder `/root`.
4. Simpan, tunggu beberapa menit, lalu akses URL yang diberikan GitHub (format: `https://<username>.github.io/<nama-repo>/`).
5. Tempelkan URL live tersebut di bagian **Live Demo** pada bagian atas README ini.

### 2.5 Teknologi
- **HTML5** — struktur semantik halaman
- **CSS3** (vanilla, Flexbox + Grid) — tanpa Bootstrap/Tailwind, karena kebutuhan desain kustom (tema sport) dapat dipenuhi penuh dengan CSS murni tanpa overhead library tambahan
- **JavaScript (vanilla, ES6+)** — seluruh interaktivitas: render produk, filter/search, cart, checkout, modal
- **Web Storage API (`localStorage`)** — persistensi keranjang belanja
- **Google Fonts** — Bebas Neue (heading) & Inter (body text)

---

## 3. Catatan Pengumpulan
- Deadline: Minggu ke-16 (sesuai jadwal kelas)
- Commit history disusun bertahap dan bermakna (minimal 8–10 commit) saat proses push ke GitHub
- Link live URL wajib dicantumkan di bagian atas README setelah deploy ke GitHub Pages
