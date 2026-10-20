# Design.md: Homepage Scareer (varian "Structured")

> **Pembaruan 20 Okt 2026: warna mengikuti Panduan Warna scareer (Brand Identity, Color Guideline).** Bagian 3.1 menggantikan palet ungu sebelumnya: Merah Nyala `#EE2B33` sebagai warna utama, Merah Tua `#C8161D` untuk teks merah, Kuning Hangat `#FFC629` sebagai sorotan, Biru Royal `#1F4FD8` sebagai aksen kecil, Putih Tulang `#F7F8F2` sebagai latar netral, dan Tinta `#17181A` sebagai teks utama. Ungu, lavender, dan biru langit tidak dipakai lagi. Tipografi tetap dari pembaruan 14 Okt 2026 (bagian 3.2): heading Bricolage Grotesque 700/800 tracking -2% sampai -3%, isi Satoshi 400/500/700. **Kode sudah dimigrasi (20 Okt 2026):** `src/styles/tokens.css` dan semua komponen memakai palet ini, tanpa opsi tweak untuk kembali ke ungu. Sumber kebenaran token: `src/styles/tokens.css`. File logo di `public/images/brand` masih versi lama dan menunggu aset baru.


Varian desain homepage Scareer yang menggabungkan **bahasa komponen bergaya Customer.io** (rapi, lega, berbasis garis tipis dan sel) dengan **brand guideline Scareer** (hangat, jujur, kakak tingkat). Dokumen ini berdiri sendiri: berisi arah visual, token, komponen, aturan per section, gerak, aksesibilitas, dan aturan konten. Semua angka dan fakta program yang belum ada tetap `[ISI]`.

Wireframe pendamping dokumen ini ada di file wireframe terpisah dan memakai nomor catatan perilaku yang sama dengan bagian komponen di sini.

---

## 1. Arah desain

### 1.1 Konteks

| Aspek | Isi |
| --- | --- |
| Produk | Scareer: bootcamp terjangkau (sekitar Rp4 juta), didukung Dibimbing. **Hanya dua program** (Cyber Security dan Data Analyst); tanpa ubin "Lihat semua program" dan tanpa tautan ke program lain. |
| Audiens | Fresh graduate, pencari kerja entry-level, career switcher pemula. Budget terbatas. Mayoritas membuka dari HP. |
| Target visitor utama | **Mahasiswa semester akhir** (skripsi atau menjelang lulus) yang mulai cemas soal kerja pertama dan belum punya pengalaman kerja. Mereka membandingkan bootcamp sambil kuliah, hemat, dan sangat peka pada hal yang terasa menggurui atau "jualan". Konsekuensi desain: tampilan boleh lebih berwarna, hidup, dan interaktif dari desain korporat, tetapi tetap dari palet merek dan tetap jujur (bukan visual promo). Micro-interaction diutamakan di komponen yang dibaca sekilas lewat HP. |
| Tujuan homepage | Mengenalkan brand dan mengantar pengunjung ke halaman detail program yang tepat. Keputusan ikut program diambil di halaman detail. |
| Tujuan sekunder | Pengunjung yang belum yakin ngobrol dulu lewat WhatsApp. |
| Posisi brand | Teman setara, "kakak tingkat". Murah, bukan murahan. |
| Tone | Jujur, hangat, relatable, santai, percaya diri. "Kami" = brand, "kamu" = pembaca. |

### 1.2 Konsep: "Catatan kakak tingkat" dengan struktur yang rapi

Bahasa visual Scareer diambil dari dunia kampus dan lembar koreksi: tinta, coretan pulpen merah, stabilo, kertas. Tata letak dan komponennya meminjam disiplin Customer.io: tipografi besar berbobot menengah, ruang lega, garis tipis 1 px sebagai pembeda area, sel berborder, dan hampir tanpa bayangan.

Rumusnya: **struktur yang tenang dan dewasa, dengan kehangatan dari foto candid, catatan tangan, dan stabilo.**

**Satu hal yang dibuat memorable** adalah **kartu lowongan di panggung Hero**. Lowongan bertulis "Fresh graduate", tapi persyaratannya "Min. pengalaman 2 tahun", lalu dicoret merah dan diberi catatan tangan kakak tingkat. Ini visualisasi langsung dari hook H1 "Fresh graduate, tapi diminta pengalaman 2 tahun?". Semua section lain sengaja tenang supaya kartu ini yang diingat.

### 1.3 Prinsip

1. **Murah, bukan murahan.** Kualitas terlihat dari kerapian: grid disiplin, spasi lega, tipografi tegas. Dilarang visual diskon: tanpa harga dicoret, ledakan "PROMO", hitung mundur, atau banner merah-kuning mencolok.
2. **Garis, bukan bayangan.** Pembeda area memakai garis 1 px dan selang-seling latar. Satu-satunya bayangan di halaman adalah bayangan solid pada kartu lowongan Hero.
3. **Hangat tapi tertib.** Gaya catatan tangan hanya sebagai anotasi, maksimal satu per section. Strukturnya tetap rapi.
4. **Mobile dulu.** Semua keputusan dicek di layar 360 px dulu, di jaringan lambat.
5. **Foto nyata di atas ilustrasi.** Kepercayaan datang dari wajah, ruang, dan karya asli.
6. **Satu aksi utama per layar.** Hero, Program, dan CTA penutup masing-masing satu tombol utama. Section Program adalah jantung halaman.
7. **Gerak memberi tahu dan menghidupkan.** *(Direvisi 19 Okt 2026.)* Gerak boleh hadir di tiap section selama pendek, terpicu oleh scroll atau aksi, dan tidak pernah menghalangi bacaan. Tetap tanpa auto-play, auto-scroll, dan konten yang hanya bisa dibaca setelah animasi selesai. Pembawa gerak: panel tweak "Gerak" (Dasar / Interaktif, bawaan Interaktif). Detail di bagian 6.2.

---

## 2. Referensi gaya dan cara menerjemahkannya

Referensi: homepage customer.io (dipelajari 13 Okt 2026, tampilan desktop). Yang dipinjam hanya **pola UI dan komposisi**. Warna, font, ilustrasi, foto, logo, dan copy mereka tidak dipakai.

| Pola di referensi | Terjemahan di Scareer |
| --- | --- |
| Navbar putih 64 px, menu di tengah, tombol pil terisi dan outline di kanan | Sama. Tombol: "Tanya via WhatsApp" (outline) dan "Lihat program" (terisi merah). |
| Hero rata kiri, H1 sangat besar bobot menengah, baris centang kecil di bawah tombol | Sama. H1 hook brand, baris centang berisi fakta nyata. |
| Layar produk melayang di atas foto kantor sebagai panggung | Kartu lowongan melayang di atas foto candid. |
| Strip logo klien berjalan | Strip bukti **statis**, hanya fakta terkonfirmasi, tanpa auto-scroll. |
| Kalimat pernyataan di tengah dengan kata kunci berwarna-warni | Kata kunci ditandai **stabilo** (maksimal tiga kata). |
| Tiga pilar dengan ikon garis dan pemisah vertikal | Sama, dengan ikon garis bergaya coretan. |
| Label section berikon tag | Dipakai, dengan syarat (lihat 4.3). |
| Grid sel berborder tanpa radius | Satu kontainer berradius luar 20 px, sel dalam berbagi garis. |
| Section gelap bergrid | Panel transparansi harga dan "yang nggak kami janjikan". |
| Akordeon foto bertinta yang melebar saat hover | Karya peserta (desktop). |
| Tab vertikal dengan panel chat berganti | Cara belajar, panel berisi contoh obrolan WhatsApp. |
| Pil saran bergaya prompt | Chip tanya cepat yang membuka WhatsApp. |
| Kartu studi kasus berwarna dengan potret dipotong miring | Kartu mentor (dan kelak cerita alumni jika datanya nyata). |
| CTA penutup di kontainer bertitik, footer gelap | Sama. |

**Tidak diambil:** warna hijau teal dan mint, font Saans, semua ilustrasi dan foto mereka, logo klien, lencana kepatuhan, angka hasil bisnis, marquee logo, tab yang berpindah otomatis, animasi demo agen AI, dan sudut siku di seluruh halaman.

---

## 3. Token

### 3.1 Warna

Sumber: Panduan Warna scareer. Prinsipnya: **Merah Nyala adalah suara utama** (berani, penuh semangat, percaya diri untuk langkah pertama), **Kuning jadi sorotan**, **Biru hanya aksen kecil**, sedangkan **Putih Tulang dan Tinta** menjaga semuanya tetap jelas dibaca.

Nama peran: **Merah Nyala** (warna utama), **Merah Tua** (teks merah), **Kuning Hangat** (sorotan), **Biru Royal** (aksen), **Putih Tulang** (latar netral), **Tinta** (teks utama).

| Peran | Nama | Hex | RGB | CMYK | Dipakai untuk |
| --- | --- | --- | --- | --- | --- |
| Warna utama | Merah Nyala | `#EE2B33` | 238 43 51 | 0 82 79 7 | Latar, blok besar, stiker, simbol logo |
| Teks merah | Merah Tua | `#C8161D` | 200 22 29 | 0 89 86 22 | Judul dan kata penting di latar terang |
| Sorotan | Kuning Hangat | `#FFC629` | 255 198 41 | 0 22 84 0 | Highlight kata, label, tombol kecil |
| Aksen | Biru Royal | `#1F4FD8` | 31 79 216 | 86 63 0 15 | Label kecil, ikon, garis; maksimal 8% |
| Latar netral | Putih Tulang | `#F7F8F2` | 247 248 242 | 0 0 2 3 | Latar konten minimalis dan berita |
| Teks utama | Tinta | `#17181A` | 23 24 26 | 12 8 0 90 | Teks isi, judul, garis, ilustrasi |

```css
:root {
  /* Inti: enam warna dari Panduan Warna scareer */
  --red: #EE2B33;            /* Merah Nyala: warna utama */
  --red-dark: #C8161D;       /* Merah Tua: teks merah di latar terang, hover/pressed */
  --highlight: #FFC629;      /* Kuning Hangat: sorotan */
  --blue: #1F4FD8;           /* Biru Royal: aksen kecil, maks 8% */
  --paper: #F7F8F2;          /* Putih Tulang: latar netral */
  --ink: #17181A;            /* Tinta: teks, section panggung gelap */

  /* Turunan netral (bukan warna baru): putih untuk kartu, tinta terangkat untuk kartu di atas Ink */
  --surface: #FFFFFF;        /* kartu di atas Paper */
  --ink-raised: #232427;     /* kartu di atas Ink */

  /* Teks */
  --text: var(--ink);
  --text-secondary: #5A5B5E;          /* turunan Tinta, sekitar 6.3:1 di atas Paper */
  --text-on-ink: var(--paper);
  --text-on-ink-secondary: #B8B9BC;

  /* Border */
  --border: rgba(23, 24, 26, 0.10);          /* dekoratif (garis, tepi sel) */
  --border-control: rgba(23, 24, 26, 0.55);  /* kontrol interaktif */
  --border-on-ink: #3F4044;

  /* WhatsApp: hanya untuk ikon */
  --wa-icon: #25D366;
}
```

**Token lama yang dipensiunkan dan penggantinya**

| Token lama | Ganti dengan |
| --- | --- |
| `--purple` (utama) | `--red` |
| `--purple-dark` (hover, teks kecil) | `--red-dark` |
| `--purple-light` (fokus di atas Tinta, bentuk) | `--highlight` |
| `--lavender`, `--sky-soft` (latar lembut, kotak ikon, placeholder) | `--paper` (di atas Surface) atau `--surface` dengan border `--border` (di atas Paper) |
| `--sky` (cincin halo, bentuk di belakang potret, kotak label di gelap) | cincin halo `--red` 28%, bentuk `--red` atau `--highlight`, kotak label `--highlight` |

| Token | Peran |
| --- | --- |
| `--red` | Warna suara utama: tombol utama, panggung dan panel besar (hero, CTA penutup), stiker, simbol logo, angka langkah, coretan, garis progres. **Putih di atas Merah Nyala hanya 4.2:1**: boleh untuk judul besar, tombol (bobot 700, tidak di bawah 16 px), dan angka; lead di panel merah bobot 700 dan minimal sekitar 18.7 px; jangan untuk paragraf atau teks kecil di panel merah. Chip dan lencana kecil di panel merah memakai Kuning dengan teks Ink atau Tinta dengan teks Paper. |
| `--red-dark` | Teks merah di latar terang (judul penting, kata ditandai, tautan teks; 5.5:1 di atas Paper), hover tombol utama. Harus tetap terlihat merah, **bukan maroon**: jangan digelapkan lagi dari `#C8161D`. |
| `--highlight` | Sorotan: penanda kata kunci, label, chip tanya cepat, tombol panah akordeon, bentuk di belakang potret. **Selalu di belakang teks Ink** (Tinta di atas Kuning 11.3:1); boleh juga jadi teks atau ikon di atas Ink. Tidak pernah jadi teks di atas Paper (1.5:1), dan tidak boleh dengan teks putih (1.6:1). |
| `--blue` | Aksen kecil: ikon label section, ikon, garis tipis. Teks putih di atas biru 6.6:1. **Jangan** jadi latar penuh, jangan lebih dari sekitar 8%, jangan berdampingan dengan teks atau bentuk merah. |
| `--paper` | Latar halaman dan band netral yang selang-seling dengan `--surface`; panel lembut dan placeholder foto. |
| `--surface` | Kartu di atas Paper, sel grid, panggung kartu lowongan. |
| `--ink` | Teks isi dan judul, garis, ilustrasi, section gelap, tombol WhatsApp, bayangan kartu lowongan. |
| `--ink-raised` | Sel dan kartu di atas latar Ink. |
| `--wa-icon` | Hanya ikon WhatsApp. |

**Porsi warna** (acuan komposisi seluruh halaman, bukan tiap layar): **35% Merah Nyala, 30% Putih Tulang, 15% Tinta, 12% Kuning, 8% Biru**. Merah, biru, dan kuning tidak boleh berporsi sama dalam satu area atau satu garis pelangi.

**Kombinasi teks dan latar** (minimal 3:1 untuk judul)

| Pasangan | Kontras | Status |
| --- | --- | --- |
| Putih di Merah Nyala | 4.2:1 | Lolos untuk judul dan teks besar |
| Merah Tua di Putih Tulang | 5.5:1 | Lolos |
| Tinta di Kuning | 11.3:1 | Lolos |
| Putih di Biru Royal | 6.6:1 | Lolos |
| Kuning di Tinta | 11.3:1 | Lolos |
| Biru di Merah (bergetar) | 1.6:1 | **Dilarang** |
| Kuning di Putih Tulang | 1.5:1 | **Dilarang** |
| Putih di Kuning | 1.6:1 | **Dilarang** |

**Logo** (empat varian): simbol Merah Nyala di latar terang/gelap; putih di Tinta; putih di Merah Nyala; Tinta di Kuning. Urutan pilihan: latar terang atau gelap, simbol Merah Nyala, latar merah atau foto dengan logo putih, latar kuning dengan logo Tinta.

**Aturan pakai**

1. **Merah = aksi, semangat, dan koreksi.** Karena merah juga identik dengan galat, pesan galat selalu memakai ikon, teks yang jelas, dan `--red-dark`. Jangan menaruh pesan galat berdampingan dengan tombol merah.
2. **WhatsApp tidak memakai fill hijau.** Hijau di sebelah merah sulit dibedakan pengguna buta warna merah-hijau. Tombol WhatsApp berlatar **Ink** dengan teks Paper (di atas Ink atau merah: latar Paper, teks Ink), dan hanya ikonnya yang hijau.
3. Kontras teks minimal 4.5:1 (teks besar 3:1). Teks kecil memakai `--ink`, `--text-secondary`, atau `--red-dark`. `--red` hanya untuk teks besar, teks putih besar di atas panel merah, dan tombol.
4. **Hindari:** ungu, maroon, tosca, oranye, atau hijau sebagai warna dominan; menggelapkan Merah Tua jadi maroon; biru lebih dari sekitar 8% atau sebagai latar penuh (terasa Dibimbing atau anak sekolah); teks merah di atas biru (bergetar) dan teks putih di atas kuning; merah, biru, dan kuning berporsi sama atau jadi garis pelangi.
5. Mode gelap sistem tidak termasuk cakupan. Section Ink adalah keputusan desain, bukan mode gelap.

### 3.2 Tipografi

| Peran | Font | Catatan |
| --- | --- | --- |
| Display dan heading | **Bricolage Grotesque** (variable) | Bobot 600. Grotesk dengan karakter yang ramah. |
| Body dan UI | **Plus Jakarta Sans** (400, 500, 600) | Dirancang di Indonesia, rapi untuk teks Indonesia dan terbaca baik di layar kecil. |
| Anotasi tangan | **Kalam** (400) | **Hanya** catatan "kakak tingkat": maksimal satu per section, di bawah 12 kata. Tidak untuk heading, tombol, atau body. |

Resep ketenangan: judul **besar tapi berbobot menengah**, dengan line-height rapat. Bobot judul 600, bukan 700 atau 800.

| Token | Mobile | Desktop | Bobot, line-height | Dipakai di |
| --- | --- | --- | --- | --- |
| `--t-hero` | 40 px | 80 px | 600, 1.02, tracking -0.015em | H1 Hero |
| `--t-statement` | 24 px | 36 px | 500, 1.25 | Kalimat pernyataan di tengah |
| `--t-h2` | 28 px | 44 px | 600, 1.12 | Judul section |
| `--t-h3` | 20 px | 22 px | 600, 1.25 | Judul sel, kartu, baris tab |
| `--t-lead` | 17 px | 20 px | 400, 1.5 | Subhead dan paragraf pembuka |
| `--t-body` | 16 px | 16 px | 400, 1.55 | Isi |
| `--t-small` | 14 px | 14 px | 500, 1.45 | Label, chip, metadata |
| `--t-note` | 22 px | 28 px | Kalam 400, 1.2 | Catatan tangan |

```css
:root {
  --f-display: "Bricolage Grotesque", "Segoe UI", system-ui, sans-serif;
  --f-body: "Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif;
  --f-note: "Kalam", "Segoe Print", cursive;

  --t-hero: clamp(2.5rem, 1.2rem + 4.6vw, 5rem);
  --t-statement: clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem);
  --t-h2: clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem);
  --t-h3: clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem);
  --t-lead: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);
  --t-body: 1rem;
  --t-small: 0.875rem;
  --t-note: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
}

body {
  background: var(--paper);
  color: var(--text);
  font-family: var(--f-body);
  font-size: var(--t-body);
  line-height: 1.55;
}
```

Aturan teks:
- Panjang baris body maksimal 65–70 karakter.
- **Sentence case** di semua tempat. Tidak ada huruf kapital semua untuk label atau tombol.
- H1 dan judul section tidak memakai kata yang diwarnai atau dimiringkan. Satu-satunya penanda kata adalah stabilo pada kalimat pernyataan (4.6).
- Angka harga dan durasi memakai `font-variant-numeric: tabular-nums`.
- Muat font dengan `font-display: swap`, subset Latin. Preload hanya Bricolage (600) dan Plus Jakarta (400). Kalam dimuat lazy karena baru dibutuhkan di panggung Hero.

### 3.3 Perataan

Rata kiri adalah default. **Dua pengecualian rata tengah:** kalimat pernyataan di Kenapa Scareer dan blok CTA penutup.

### 3.4 Lebar, spasi, garis, radius, bayangan

```css
:root {
  /* lebar */
  --w-content: 1024px;   /* kolom teks dan grid utama */
  --w-wide: 1320px;      /* panggung Hero, akordeon foto, navbar, footer */

  /* ritme section */
  --sec-y: 128px;        /* desktop */
  --sec-y-m: 72px;       /* mobile */

  /* garis */
  --hairline: 1px solid var(--border);
  --hairline-on-ink: 1px solid var(--border-on-ink);

  /* radius */
  --r-pill: 999px;       /* tombol, chip, badge */
  --r-media: 12px;       /* foto di dalam sel */
  --r-panel: 20px;       /* kontainer grid, panel, kartu mentor */
  --r-paper: 6px;        /* hanya kartu lowongan Hero */

  /* cincin halo tombol */
  --ring-primary: 0 0 0 4px rgba(238, 43, 51, 0.28);        /* Merah Nyala 28% */
  --ring-primary-hover: 0 0 0 6px rgba(238, 43, 51, 0.28);
  --ring-neutral: 0 0 0 4px rgba(23, 24, 26, 0.06);

  /* satu-satunya bayangan solid: kartu lowongan Hero */
  --shadow-ink: 6px 6px 0 var(--ink);

  /* pola titik CTA penutup */
  --dots: radial-gradient(rgba(23, 24, 26, 0.14) 1px, transparent 1px) 0 0 / 14px 14px;

  /* gerak */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
}

:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
.on-ink :focus-visible { outline-color: var(--highlight); }
```

- Padding vertikal section: **128 px desktop, 72 px mobile**. Ruang lega adalah bagian utama dari karakter varian ini. Hero: 80 px atas, 96 px bawah.
- Dua lebar kolom: **konten 1024 px** untuk teks dan grid, **lebar 1320 px** hanya untuk panggung Hero, akordeon foto, navbar, dan footer. Margin sisi mobile 20 px.
- Grid: 4 kolom (mobile), 8 (tablet), 12 (desktop). Gutter 16 / 24 / 24 px. Breakpoint `640`, `1024`, `1280`.
- Pemisah antar band: **garis 1 px** dan selang-seling latar `--surface` / `--paper`. Tidak ada bayangan lembut.
- Pakai container query untuk sel program supaya komponen yang sama bekerja di homepage dan halaman Daftar program.

---

## 4. Komponen

### 4.1 Navbar

```
[Scareer]       Program ▾   Kenapa Scareer   FAQ      [Tanya via WhatsApp]  [Lihat program]
```

- Tinggi 64 px, latar `--surface`, garis bawah 1 px `--border`, lebar isi 1320 px. Sticky.
- Menu di **tengah**, dengan chevron pada Program. Kanan: tombol outline (WhatsApp) dan tombol terisi merah (Lihat program), tinggi 40 px.
- Dropdown Program (tweak "Dropdown Program", bawaan Kartu ikon): panel putih selebar isi (400 px) berisi dua kartu program bersisian, tanpa foto. Tiap kartu: kotak ikon `--paper` (ShieldCheck, BarChart3), panah kecil di kanan atas, dan nama program. Hover: kartu naik 2 px, border merah, panah terisi merah. Panel disembunyikan lewat visibility dan muncul fade + naik 6 px dengan kartu masuk berurutan. Tidak ada tautan "Lihat semua program" (hanya dua program). Pilihan lama: daftar teks.
- Mobile: logo dan tombol menu. Menu membuka panel penuh dengan item setinggi 56 px dan tombol WhatsApp di dasar.
- **Puncak homepage (tweak "Navbar di puncak homepage", bawaan Bar putih terpisah):** di scroll 0 navbar adalah bar putih selebar layar di alur dokumen dengan hairline `--border`, hero mulai di bawahnya (tidak menimpa). Makin discroll (96 px) bar menyusut kontinu jadi pill glass: latar header memudar ke transparan, radius, lebar, border, dan blur naik bersama `--nav-p`. Tinggi tetap 64 px, jadi tanpa layout shift. Halaman lain tetap transparan lalu pill.

### 4.2 Tombol pil dengan cincin halo

| Varian | Tampilan |
| --- | --- |
| **Utama** | Latar `--red`, border 2 px `--red`, teks putih bobot 600, pil, `--ring-primary`. Tinggi 40 px (navbar) atau 48 px (konten, 52 px di mobile). Padding horizontal 20 px atau 28 px. |
| **Outline** | Latar `--surface`, border 2 px `--ink`, teks `--ink`, `--ring-neutral`. |
| **WhatsApp** | Latar `--ink`, teks `--paper`, ikon WhatsApp `--wa-icon`, `--ring-neutral`. Di atas Ink: latar `--paper`, teks `--ink`. |
| **Tautan panah** | Teks `--ink` bobot 500 dengan ikon panah kecil **di kiri** teks. Hover: garis bawah. |

State:
- *Hover (pointer):* latar `--red-dark`, cincin melebar ke 6 px (150 ms).
- *Active:* cincin menyusut ke 2 px, tombol turun 1 px (100 ms).
- *Focus-visible:* outline 3 px `--ink` offset 3 px (di atas Ink: `--highlight`). Dipisahkan dari cincin halo supaya fokus tetap terbaca.
- Area sentuh minimal 48×48 px.

Label tombol memakai kata kerja jelas dan konsisten di seluruh situs: "Lihat program", "Lihat detail", "Tanya via WhatsApp". Tidak ada "Klik di sini", tidak ada tanda panah di ujung teks tombol.

Di bawah tombol Hero dan CTA penutup ada **baris centang** (ikon centang bulat 14 px, teks 13 px `--text-secondary`), tiga butir berisi fakta yang benar: "Cicilan tersedia", "Bisa ngobrol dulu lewat WhatsApp", "Didukung Dibimbing". Butir yang belum dikonfirmasi tetap `[ISI]`.

### 4.3 Label section (ikon tag)

```
[tag] Program        <- ikon tag kecil Merah + label 14 px --text-secondary
Pilih program yang cocok buat kamu
```

Syarat pemakaian agar tidak jadi hiasan kosong:
- Sentence case, bukan huruf kapital.
- Isi label = **nama menu navbar atau anchor** (Program, Kenapa Scareer, Cara belajar, Karya, Mentor, FAQ), sehingga berfungsi sebagai penunjuk posisi.
- Tidak dipakai di Hero dan CTA penutup.
- Ikon: tag/label bergaris 16 px, isi `--blue`. Di section gelap, label dan ikon memakai `--text-on-ink-secondary`.

### 4.4 Hero: rata kiri dengan panggung

```
[Navbar]

  Fresh graduate, tapi diminta           (H1 80 px / 600, 3-4 baris)
  pengalaman 2 tahun?

  Subhead 2 baris (--t-lead)

  [ Lihat program ]  [ Tanya via WhatsApp ]
  (v) Cicilan tersedia  (v) Bisa ngobrol dulu  (v) Didukung Dibimbing

+------------------ panggung 1320 x 480 ------------------+
|  foto candid melebar (tinta Ink 25%)                      |
|        +--------------------+                             |
|        | kartu lowongan     |   catatan tangan (Kalam)    |
|        | (coretan merah)    |                             |
|        +--------------------+                             |
+-----------------------------------------------------------+
[ strip bukti: sel berborder ]
```

- Hero hanya berisi H1, subhead, dua tombol, dan baris centang. Tidak ada gambar di samping H1.
- **Panggung:** foto candid asli sebagai latar (tinta Ink 25% agar kartu terbaca), radius 20 px (12 px di mobile). Foto yang belum ada diganti blok `--paper` berlabel "Foto [ISI]".
- **Kartu lowongan:** meniru lowongan sungguhan tapi jelas ilustrasi (nama perusahaan fiktif, tanpa merek asli).

```
+------------------------------------+   latar --surface, radius --r-paper
| Junior [Posisi] [ISI]              |   border 1.5 px --ink
| PT Contoh Maju Bersama             |   --shadow-ink
|------------------------------------|   garis tipis --border tiap 28 px
| Kualifikasi                        |
|  - Fresh graduate welcome          |
|  - Min. pengalaman 2 tahun    ~~~~ |   <- coretan merah (SVG, 3 px, ujung bulat)
|  - Menguasai [tools] A, B, C       |
+------------------------------------+
   "lah, ini fresh grad apa bukan?"       <- Kalam, --red, 22 px ke atas
```

- Teks kartu tetap terbaca pembaca layar: kartu diberi `aria-label` ("Contoh lowongan yang meminta pengalaman 2 tahun untuk fresh graduate") dan coretan `aria-hidden`.
- Catatan Kalam memakai `--red` (sekitar 4.6:1 di atas Paper) hanya di ukuran 22 px ke atas.
- Mobile: H1, subhead, dan kedua tombol terlihat tanpa scroll di 390×844. Panggung menjadi foto 4:5 dengan kartu menimpa bagian bawahnya, tidak miring.
- Foto candid: wajib asli. Alt text mendeskripsikan kegiatan, bukan "orang tersenyum".

### 4.5 Strip bukti (sel berborder)

Satu baris sel berborder di bawah panggung, dipisah garis vertikal 1 px, tanpa radius dalam:

```
| [logo] Didukung Dibimbing | Harga mulai Rp [ISI] | Cicilan tersedia | Mentor dari [ISI] |
```

- Hanya fakta yang sudah dikonfirmasi. Sel yang datanya belum ada **dihapus**, bukan diisi.
- Tidak ada logo perusahaan, angka, atau klaim yang tidak bisa dibuktikan.
- Statis, tanpa marquee. Mobile: satu baris yang bisa digeser, sel berikutnya mengintip.

### 4.6 Kalimat pernyataan dengan stabilo

Pembuka Kenapa Scareer: satu kalimat 3 baris, **rata tengah**, `--t-statement`, lebar maksimal 780 px. Kata kunci (maksimal tiga) ditandai **stabilo**: latar `--highlight` setinggi sekitar 60% tinggi huruf di belakang kata. Teks tetap `--ink`.

Penanda stabilo hanya boleh di kalimat pernyataan ini, tidak di H1 atau judul section. Copy final menyusul dari tim.

### 4.7 Baris tiga pilar

```
| ikon 24 px         | ikon 24 px         | ikon 24 px           |
| Kakak tingkat,     | Didukung           | Murah, bukan murahan |
| bukan institusi    | Dibimbing          |                      |
| 2 baris deskripsi  | 2 baris deskripsi  | 2 baris deskripsi    |
```

Tiga kolom dipisah **garis vertikal 1 px**, tanpa kartu. Ikon garis bergaya coretan (4.15). Judul `--t-h3`, deskripsi `--text-secondary`. Mobile: ditumpuk dengan garis horizontal.

**Varian kartu berwarna (layout editorial, tweak "Tiga pilar", bawaan; ditambahkan 20 Okt 2026 untuk mahasiswa semester akhir).** Tiap pilar jadi kartu dengan lencana ikon bulat 60 px (ikon 32 px). Warna tetap dari palet merek, satu per pilar: Kakak tingkat = kuning (teks tinta), Supported by Dibimbing = tinta (lencana kuning), Terjangkau = kartu putih berborder dengan lencana merah (paragraf tidak boleh di atas Merah Nyala). Desktop: ketiga kartu sejajar dan sama tinggi (tanpa tangga turun). Micro-interaction, hanya `transform`, `opacity`, dan stroke:
- Masuk layar: centang di ikon Dibimbing tergambar sekali.
- Hover (mouse): kartu naik 6 px, lencana miring dan membesar sedikit, ikon bergerak sesuai arti (adik tingkat melambai, centang digambar ulang, tutup dompet terbuka), cahaya lembut mengikuti kursor di mode Interaktif.
- Sentuh: kartu menekan ke 0.985 saat disentuh.
- `prefers-reduced-motion`: semua gerak mati, kartu statis.
Pilihan "Polos (lama)" tetap menampilkan baris garis di atas.

**Kartu di samping judul (tweak `whyCard`, bawaan Foto + ornamen):** kutipan berlatar warna merek diganti foto `learn-mentor-session` (sudut `--r-panel`, miring tipis seperti kartu lama) dengan empat ornamen yang sama dengan hero (Sparkle, Burst, Squiggle) menempel di sudutnya. Tanpa teks kutipan. Mode Interaktif + mouse: kartu miring 3D mengikuti kursor, foto zoom dan bergeser berlawanan arah, sorot cahaya lembut, ornamen bergeser berkedalaman (`--d`) dan berputar saat hover; ornamen membal masuk berurutan. Sentuh dan reduced-motion: diam. Kutipan tetap tersedia sebagai pilihan lama.

### 4.8 Program: grid sel berborder (inti halaman)

**Keputusan 20 Okt 2026: hanya dua program** (Cyber Security dan Data Analyst). Di homepage keduanya berbagi lebar baris (dua kolom sama lebar di tablet dan desktop, ditumpuk di HP). Tidak ada ubin "Lihat semua program" di grid, carousel, menu navbar, maupun menu mobile, dan tidak ada tweak jumlah program. Baris di bawah tentang enam program, jumlah ganjil, dan sel "Lihat semua" tidak berlaku lagi.

Enam program dalam **satu kontainer berborder** dengan radius luar `--r-panel`. Sel di dalamnya berbagi garis 1 px (tanpa celah dan tanpa bayangan).

```
+------------------+------------------+------------------+
| [foto 16:10]     | [foto 16:10]     | [foto 16:10]     |
| Nama program     | Nama program     | Nama program     |
| Untuk siapa      |                  |                  |
| [Durasi][Format][Level]             |                  |
| - Hasil 1 / 2 / 3                   |                  |
| Mulai dari Rp [ISI]                 |                  |
| [ Lihat detail ]                    |                  |
+------------------+------------------+------------------+
| (baris 2, pola sama)                                    |
+---------------------------------------------------------+
```

- Isi sel: foto, nama program, untuk siapa (1 baris), chip durasi, format, level, tiga hasil utama, "Mulai dari Rp [ISI]", tombol "Lihat detail". Padding 24 px.
- Foto inset di dalam sel, radius `--r-media`. Jika foto belum ada, pakai ilustrasi garis kecil (4.15).
- **Hover (pointer):** latar sel jadi `--paper` (150 ms) dan cincin tombol melebar. Border tidak berubah. Seluruh sel bisa diklik, tetapi hanya tombol "Lihat detail" yang masuk urutan Tab.
- **Klik:** foto bertransisi ke header halaman detail dengan View Transitions API (300 ms). Fallback: pindah halaman biasa.
- **Filter chip** di atas grid (chip: tinggi 40 px, border `--border-control`, terpilih berlatar `--ink` dengan teks `--paper`). Sel yang tidak cocok memudar 200 ms, grid disusun ulang tanpa celah, hasil diumumkan lewat `aria-live` ("Menampilkan 3 program"), hash URL diperbarui.
- Jumlah ganjil: sel terakhir menjadi sel "Lihat semua program".
- Keadaan kosong: "Belum ada program di bidang ini. Lihat semua program atau ngobrol dulu lewat WhatsApp." Keadaan memuat: skeleton setinggi sel asli.
- Di bawah grid: tombol outline "Lihat semua program" dan baris chip tanya cepat (4.12).
- Mobile: satu kolom dalam satu kontainer berradius, garis horizontal 1 px.

### 4.9 Panel gelap bergrid (transparansi harga)

Band **Ink** setelah pilar, berisi sel-sel bergaris tipis.

```
[ label kecil: "Transparan soal harga" ]
H2 (--text-on-ink)

+-------------------------+-------------------------+
| Yang dikurangi          | Yang tidak dikurangi    |
+-------------------------+-------------------------+
| Yang nggak kami janjikan                          |
+---------------------------------------------------+
| Mulai dari Rp [ISI], cicilan tersedia             |
+---------------------------------------------------+
```

- Sel `--ink-raised`, border `--border-on-ink` 1 px, radius luar `--r-panel`. Label dengan kotak kecil `--highlight`.
- Daftar memakai ikon centang dan silang yang selalu disertai kata.
- Sel "Yang nggak kami janjikan" selalu tampil utuh di semua viewport, tanpa "baca selengkapnya".
- Statis: tanpa hover dan tanpa animasi masuk.

### 4.10 Akordeon foto (karya peserta)

Hanya desktop ≥ 1024 px, lebar 1320 px, tinggi 420 px. Lima kolom foto:

```
Diam:  | + Karya 1 | + Karya 2 | + Karya 3 | + Karya 4 | + Karya 5 |
Hover: | + K1 | (->) Karya 2 (lebar, deskripsi, label) | + K3 | + K4 | + K5 |
```

- **Diam:** kolom sama lebar. Foto bertinta **Ink 35%** (tinta tipis agar karya tetap terbaca sebagai bukti). Label di kiri bawah, ikon bulat "+" 32 px di kiri atas.
- **Hover atau fokus:** kolom melebar (flex-grow 1 → 3.2, 300 ms, ease-out), tinta hilang jadi foto penuh, muncul deskripsi satu kalimat dan **label jujur** ("Dikerjakan peserta batch [ISI]"), ikon "+" berubah jadi tombol panah bulat berlatar `--highlight` dengan panah `--ink`. Klik kolom menuju detail program asal.
- Teks di atas foto memakai **scrim gradasi Ink** dari bawah (60% → 0) agar kontras ≥ 4.5:1.
- Keyboard: tiap kolom adalah `<a>` yang bisa difokus. Fokus memicu pelebaran yang sama. Panah kiri/kanan berpindah antar kolom. Nama dan label sudah ada di DOM tanpa hover.
- **Mobile dan layar sentuh:** carousel scroll-snap horizontal, kartu berikutnya mengintip 24 px, tanpa panah dan tanpa titik indikator.
- Latar band: `--ink` (section panggung). Tidak ada auto-scroll.

### 4.11 Tab vertikal dengan panel (Cara belajar)

**Varian "Garis waktu 3 langkah" (tweak "Layout Cara belajar", bawaan; ditambahkan 20 Okt 2026).** Judul tiga baris "Dari belajar / sampai punya / *pengalaman nyata.*" di kiri (berat 800, tracking -0.04em; frasa terakhir di atas blok stabilo kuning dengan teks tinta, mengikuti referensi desain, pengecualian atas aturan stabilo hanya di kalimat pernyataan; tanpa label kecil di atas judul), kalimat pengantar di kanan. Di bawahnya tiga langkah (Belajar Skill, Praktik Langsung, Internship) di satu garis: titik merah bernomor 40 px, dua segmen garis 2 px (jalur `--border`, isian merah), lalu ikon coretan 36 px (buku, laptop, tas kerja), judul, dan deskripsi. Titik terakhir = tujuan akhir: lingkaran tinta dengan angka stabilo. Desktop: tiga kolom dengan garis mendatar; mobile dan tablet: garis tegak di kiri. Tanpa label kecil di atas judul. Gerak (mode Interaktif): garis terisi dan titik menyala berurutan mengikuti scroll; hover atau sentuh langkah membesarkan titik dan menggerakkan ikon (halaman buku membuka, centang laptop tergambar ulang, gagang tas terangkat). Reduced motion: statis. Pilihan "Original" dan "4 kolom" tetap tersedia; deskripsi di bawah ini berlaku untuk varian Original.

```
[tag] Cara belajar                               +--------------------------+
H2                                               | panel --paper         |
Paragraf pembuka 3 baris                         |                          |
[→ Lihat program]                                |  contoh obrolan WhatsApp |
                                                 |  (gelembung + chip saran)|
 1  Pilih program            (terbuka)           |                          |
    deskripsi 2 baris                            |                          |
 ─────────────────────                           |                          |
 2  Ngobrol dulu  [opsional]                     |                          |
 ─────────────────────                           +--------------------------+
 3  Belajar bareng mentor
 ─────────────────────
 4  Pulang dengan karya
```

- Empat baris dipisah garis 1 px. Hanya satu baris terbuka (judul + deskripsi). Baris aktif bertanda **garis Ink 2 px** di bawahnya. Angka langkah `--red`, `--t-h3`.
- Panel kanan berlatar `--paper`, radius `--r-panel`, isinya berganti mengikuti langkah (crossfade 200 ms): 1) cuplikan satu kartu program, 2) contoh obrolan WhatsApp dengan chip tanya cepat, 3) foto sesi dengan mentor, 4) satu kartu karya.
- **Tidak auto-advance.** Berpindah hanya lewat klik, Enter, atau panah atas/bawah.
- Obrolan di panel diberi label kecil "Contoh obrolan". Teksnya netral, bukan testimoni dan bukan klaim hasil.
- Mobile: menjadi akordeon, panel tampil di dalam baris yang terbuka.

### 4.12 Chip tanya cepat

Pil saran bergaya prompt yang fungsinya nyata: **tiap chip membuka WhatsApp dengan pesan awal terisi**.

- Tinggi 36 px, latar `--highlight`, teks `--ink` bobot 500, panah kecil di kanan, bentuk pil. Hover: panah bergeser 2 px (150 ms).
- Dipakai di tiga tempat: panel obrolan Cara belajar langkah 2, bawah grid Program, dan CTA penutup. Contoh isi (final dari tim): "Aku fresh graduate, cocoknya program apa?", "Bisa dicicil?", "Bedanya sama bootcamp lain apa?".
- Setiap chip membawa sumbernya ke pesan WhatsApp untuk pelacakan. Label bantu: "Tanya cepat via WhatsApp". Jangan memberi kesan AI atau bot.

### 4.13 Kartu mentor (potret miring)

Latar berwarna per kartu, potret dipotong miring di atas bentuk berlatar, fakta dipisah garis vertikal, tata letak foto kiri dan kanan bergantian. Komponen yang sama kelak dipakai untuk cerita alumni, **hanya jika datanya nyata**.

```
+--------------------------------------------------------------+
| [potret miring]   [chip peran]        | Pengalaman  | Bidang |
|   bentuk --red    Nama mentor          |  [ISI]      | [ISI]  |
|   di belakang     "Kutipan 2-3 baris"  +-------------+--------+
|                   Peran, perusahaan [ISI]    → Lihat program   |
+--------------------------------------------------------------+
```

- Dua varian bergantian. **(A)** latar `--paper`, bentuk di belakang potret `--red`. **(B)** latar `--surface` dengan border 1 px, bentuk `--highlight`. Teks selalu `--ink`.
- Potret dipotong miring (sekitar 40°). Foto asli, bukan stok.
- Tanda kutip besar memakai `--red`. Kutipan hanya tampil jika ada kutipan asli.
- "Statistik" adalah **fakta mentor** yang benar (tahun pengalaman, bidang, perusahaan sebelumnya). Tidak ada angka hasil bisnis atau klaim penempatan kerja.
- Desktop: dua kartu bertumpuk (tinggi sekitar 312 px). Mobile: satu kolom, potret di atas.
- Band berlatar `--paper`. Kartu tidak punya hover.

### 4.14 FAQ bergaris

Baris dengan **garis 1 px** di atas dan bawah, tanpa kartu. Judul `--t-h3`, ikon plus 24 px di kanan. Kolom judul (label section + H2) di kiri dan sticky di top 96 px (desktop saja). Jawaban di bawah 60 kata. Tinggi jawaban beranimasi 250 ms, ikon plus berputar jadi minus, boleh beberapa terbuka sekaligus. Deep-link `#faq-nama` membuka butir dan menggulung ke sana. Di bawah daftar: baris "Pertanyaanmu belum ada di sini?" dengan tombol WhatsApp. Jawaban resmi dari tim masih `[ISI]`.

### 4.15 Ikon dan ilustrasi garis kecil

- Ukuran 24 px (ikon pilar), 64–72 px (ilustrasi sel).
- Garis `--ink` 1.5 px, ujung bulat, **sedikit tidak sempurna** agar senada dengan coretan tangan.
- Satu isian per ilustrasi: `--red` atau `--highlight`. Tidak boleh dua isian.
- Tema: benda dunia kampus dan kerja (lembar lowongan, pulpen, map, kartu nama, gelembung chat). Tidak ada roket, bohlam, atau trofi.
- SVG mandiri, `aria-hidden`, dekoratif atau pengganti foto saja.

### 4.16 CTA penutup bertitik

```
+- kontainer 1024 px, garis 1 px, radius 20 px, latar --surface + --dots -+
|                                                                         |
|              Bingung mulai dari mana? Ngobrol dulu.   (H2 tengah)       |
|            [ Tanya via WhatsApp ]   [ Lihat program ]                   |
|     (v) Cicilan tersedia  (v) Bisa ngobrol dulu  (v) Didukung Dibimbing  |
|            chip tanya cepat: 3 pil                                      |
+-------------------------------------------------------------------------+
```

- Rata tengah. Pola titik hanya di dalam kontainer dan hanya sebagai latar: opasitas rendah supaya tidak mengganggu keterbacaan teks.
- Tombol "Tanya via WhatsApp" varian Ink, "Lihat program" varian utama merah. "Lihat program" menggulung halus ke section Program.

**Varian "Lembar" (default saat ini; pilihan "Original" di panel tweak menampilkan versi di atas).** Panel `--red` selebar layar dengan sudut atas `--r-sheet` (28 px, 48 px di desktop), tanpa pola titik. Judul "Ambil **kesempatan pertamamu** sekarang." (maks 5.5rem): frasa bertanda disorot `--highlight` dengan teks `--ink` (stabilo selalu di atas Ink atau Merah Nyala; teks putih di panel merah hanya untuk judul besar dan tombol karena kontrasnya 4.2:1). Tombol memakai varian on-ink yang ada: WhatsApp (latar Paper, teks Ink) dan outline Paper, cincin halo sebagai pengganti bayangan. Baris fakta dibuang; tiga chip tanya cepat tetap, di bawah tombol. Footer menimpa tepi bawah panel setinggi satu radius (margin negatif) di homepage, sehingga merah terlihat di kedua sudut. Tidak ada form waitlist: konsultasi tetap lewat WhatsApp.

### 4.17 Footer

Latar `--ink`, lebar 1320 px. Logo di kiri dan empat kolom tautan (Program, Perusahaan, Kontak, Legal). Judul kolom `--text-on-ink`, tautan `--text-on-ink-secondary`, hover: garis bawah (150 ms). Lencana "Baru" kecil (pil outline `--highlight`) boleh dipakai untuk program baru. Bawah: hak cipta, kebijakan privasi, syarat dan ketentuan, dan "Didukung Dibimbing". Klik logo menggulung halus ke atas. Padding bawah mobile ekstra agar tidak tertutup bar sticky.

**Varian "Lembar" (default saat ini).** Panel `--ink` bersudut atas `--r-sheet`. Baris atas: logo kiri, tagline "Pengalaman pertama dimulai dari sini." kanan. Di bawahnya kartu putih "Hubungi kami" (telepon dan website `[ISI]`, email asli, tombol ikon 48 px hanya untuk WhatsApp dan email) di kiri, dan tiga kolom tautan di kanan: Program (empat program), Perusahaan (Kenapa scareer, Cara belajar), Bantuan (FAQ, Tanya via WhatsApp). Tautan ke section yang disembunyikan lewat tweak ikut dibuang. Baris bawah: hak cipta dan Supported by Dibimbing di kiri, Kebijakan privasi dan Syarat dan ketentuan di kanan. Tanpa hashtag.

### 4.18 Bar CTA sticky (mobile saja)

Tinggi 64 px, menempel di dasar layar, menghormati `env(safe-area-inset-bottom)`, latar `--surface`, garis atas `--border`. Isi: tombol utama "Lihat program" dan satu tombol ikon WhatsApp 48 px.

- Tersembunyi saat Hero atau Program terlihat. Tampil (naik dari bawah, 200 ms) mulai section Kenapa Scareer sampai FAQ. Tersembunyi lagi saat CTA penutup terlihat.
- Dikendalikan IntersectionObserver, bukan event scroll.

---


### Hero vibrant (opsi tweak, untuk pasar mahasiswa)

Dua varian opsional di panel tweak "Layout hero"; default tetap Terpusat. Palet tidak bertambah: rasa "fun" datang dari proporsi merah yang lebih luas, penanda stabilo, stiker, dan gerak.
- **Panggung merah:** latar `--red`, foto di kanan dengan tepi kiri melengkung, bar fakta `--ink` (teks `--t-body`) yang menimpa tepi bawah hero dan menyambung mulus ke section berikutnya tanpa garis pemisah, navbar transparan berlogo putih sampai pill muncul (hanya bila tweak navbar puncak = Transparan menimpa hero; bawaannya bar putih terpisah).
- **Poster:** latar `--paper`, foto miring (-2,5°) di atas lingkaran `--red`, fakta sebagai pil `--ink` yang sedikit miring.
- Judul memakai kalimat hero yang ada; frasa "pengalaman 2 tahun?" ditandai (`--highlight` di atas Merah, `--red-dark` di atas Paper, teks berganti warna mengikuti sapuan). Catatan "#PengalamanPertama" dan stiker (bintang, burst, squiggle) murni dekoratif, `aria-hidden`.
- Gerak hanya di mode Interaktif: stiker membal masuk sekali lalu bergeser mengikuti kursor, foto parallax tipis. Tanpa gerak berulang otomatis.
- Tanpa eyebrow di atas judul dan tanpa font tulisan tangan (catatan memakai Satoshi bold).

## 5. Urutan section

| # | Section | Komponen | Latar | Lebar |
| --- | --- | --- | --- | --- |
| 1 | Navbar | 4.1 | `--surface` | 1320 |
| 2 | Hero + panggung + strip bukti | 4.4, 4.5 | `--surface` | 1024, panggung 1320 |
| 2b | Scareer itu apa | tweak "Apa itu scareer" | `--surface` | 1024 |
| 3 | Kenapa Scareer: pernyataan dan pilar (varian Editorial: `--paper`) | 4.6, 4.7 | `--surface` | 1024 |
| 4 | Masalah yang ingin diselesaikan (Siklus lingkaran bawaan, Garis lurus lama, atau Dua sisi) | tweak "Masalah" | `--surface` | 1024 |
| 5 | **Program** (inti halaman) | 4.8, 4.12 | `--paper` | 1024 |
| 5b | Kenapa Scareer: panel transparansi (opsional, disembunyikan secara bawaan) | 4.9 | `--ink` | 1024 |
| 6 | Cara belajar (varian 4 kolom: `--surface`) | 4.11, 4.12 | `--paper` | 1024 |
| 7a | Bukti: karya (opsional) | 4.10 | `--ink` | 1320 |
| 7b | Bukti: mentor (opsional) | 4.13 | `--paper` | 1024 |
| 7c | FAQ (opsional) | 4.14 | `--surface` | 1024 |
| 8 | CTA penutup (varian Lembar: panel `--red`) | 4.16 | `--surface` + titik | 1024 |
| 9 | Footer | 4.17 | `--ink` | 1320 |

Ritme latar: terang, abu muda, terang, **gelap**, abu muda, **gelap**, abu muda, terang, terang bertitik, **gelap**.

---

## 6. Gerak dan interaksi

### 6.1 Gerak dasar

Prinsip: **tanpa auto-play dan tanpa auto-scroll.** *(Direvisi 19 Okt 2026: larangan "animasi masuk per section" dan "parallax" dicabut, lihat 6.2.)* Hormati `prefers-reduced-motion`. Bagian 6.1 berlaku untuk mode **Dasar** dan menjadi fondasi mode **Interaktif**.

| Elemen | Pemicu | Efek | Durasi |
| --- | --- | --- | --- |
| **Coretan merah Hero** (satu-satunya animasi otomatis) | Kartu terlihat ≥ 60% di viewport, sekali saja | Kartu fade, coretan digambar (stroke-dashoffset), catatan tangan fade | 200 / 600 / 200 ms |
| Tombol utama | Hover | Latar `--red-dark`, cincin 4 → 6 px | 150 ms |
| Tombol utama | Tekan | Cincin menyusut ke 2 px, turun 1 px | 100 ms |
| Menu navbar aktif | Scroll-spy | Garis bawah 2 px tumbuh dari kiri | 150 ms |
| Dropdown Program | Hover atau klik | Fade dan turun 4 px. Tutup: fade saja | 150 / 100 ms |
| Chip filter | Klik | Chip jadi Ink, sel tak cocok memudar, grid tersusun ulang | 150 / 200 ms |
| Sel program | Hover | Latar `--paper`, cincin tombol melebar | 150 ms |
| Sel program → detail | Klik | View Transition pada foto | 300 ms |
| Chip tanya cepat | Hover | Panah bergeser 2 px | 150 ms |
| Tab Cara belajar | Klik atau panah | Baris terbuka, garis aktif berpindah, panel crossfade | 250 / 200 ms |
| Akordeon foto | Hover atau fokus | Kolom melebar, tinta hilang, deskripsi muncul, ikon jadi panah | 300 ms |
| Baris FAQ | Klik | Tinggi jawaban dan rotasi ikon | 250 ms |
| Panel menu mobile | Ketuk | Fade dan geser 16 px dari kanan, scroll dikunci | 200 ms |
| Bar CTA sticky | Batas section | Naik dari bawah atau turun | 200 ms |

- **Smooth scroll:** `html { scroll-behavior: smooth; scroll-padding-top: 72px; }` untuk tombol "Lihat program" dan tautan menu. Fokus keyboard dipindah ke judul section tujuan (`tabindex="-1"`).
- **Scroll-spy:** IntersectionObserver dengan `rootMargin` -40% atas dan bawah, sehingga hanya satu section aktif.
- **Hover vs sentuh:** efek hover hanya di `@media (hover: hover)`. Di layar sentuh diganti state tekan singkat. Informasi penting tidak boleh hanya muncul saat hover.
- **Reduced motion:** animasi coretan, View Transition, animasi tinggi accordion, crossfade panel dimatikan, `scroll-behavior` kembali `auto`. Perubahan state tetap terlihat lewat warna, border, dan ikon.
- **Performa gerak:** hanya `transform` dan `opacity` yang dianimasikan, kecuali tinggi accordion. Tidak ada animasi yang memicu layout shift.

### 6.2 Lapisan gerak Interaktif (tweak "Gerak", bawaan)

Tujuan: homepage terasa modern dan hidup tanpa mengubah konten maupun layout. Hasil benchmark 19 Okt 2026 (Dibimbing, Purwadhika, Hacktiv8, Le Wagon, customer.io): tidak ada yang memakai gerak mengikuti scroll atau efek kursor, dan tidak ada yang memakai library animasi. Jadi cukup CSS plus hook kecil.

**Aturan umum**
- Tanpa library animasi baru. CSS (`animation-timeline: view()` bila didukung, fallback IntersectionObserver) dan hook kecil di `src/hooks`.
- Hanya `transform`, `opacity`, `clip-path`. Durasi 150 sampai 600 ms, easing `--ease-out`, stagger maksimal 4 langkah (`--reveal-step`).
- Efek kursor (tilt, spotlight, magnetik) hanya di `@media (hover: hover) and (pointer: fine)`. Di layar sentuh diganti state tekan. Satu listener `pointermove` per kontainer, menulis CSS variable `--x` dan `--y` langsung ke elemen, bukan lewat state React.
- Spotlight kursor hanya terlihat di permukaan gelap atau merah. Di kartu Paper dan Surface gunakan sorotan tepi (border menyala), jangan cahaya putih.
- `prefers-reduced-motion: reduce` mematikan semua gerak di tabel ini. Konten tetap tampil penuh tanpa JS.
- Konten tidak boleh tersembunyi sebelum animasi. Anggaran JS halaman tetap di bawah 150 kb gzip, CLS 0 dari gerak.

| Section | Gerak | Pemicu |
| --- | --- | --- |
| Hero | Headline muncul per kata. Foto panggung: parallax maksimal 24 px dan zoom-out 1,05 → 1. Kartu lowongan miring mengikuti kursor (maksimal 4°). Tombol: efek magnetik dan kilau halus. Kata berganti di `RotatingHeadline` bertransisi masuk dan keluar. | Muat halaman / scroll / hover |
| Strip bukti | Sel muncul bertahap, garis tepi menyala sekilas | Masuk viewport |
| Apa itu scareer | Tiga poin muncul bertahap, garis atas tiap poin tergambar lalu menebal dan menyala merah saat hover | Masuk viewport / hover |
| Masalah (siklus lingkaran, 20 Okt 2026) | Empat langkah di cincin searah jarum jam dari jam 12 (teks di luar cincin di desktop, daftar bernomor di bawah cincin kecil di mobile). Busur merah langkah 1 sampai 3 tergambar sekali (1,1 detik, ease masuk-keluar) begitu section menyentuh pita tengah layar, bukan terikat scroll; node dan panah menyala tepat saat busur sampai, sisanya putus-putus. Pil "scareer masuk di sini" dan panah keluar muncul di titik putus antara langkah 3 dan 4. Setelah penuh, satu titik mengorbit pelan. Tanpa baris "kembali ke langkah 1" karena cincin sudah menutup | Section di tengah layar |
| Program | Kartu: foto zoom 1,04 dan sorotan tepi saat hover. Carousel: indikator progres. Chip: feedback tekan | Hover / scroll / tekan |
| Pindah halaman program | Klik kartu program: foto kartu bergerak menjadi foto hero halaman detail (hero Terbelah maupun Original), dan saat Kembali atau tautan ke beranda foto hero kembali ke kartunya bila kartu itu terlihat setelah posisi gulir dipulihkan; selain itu crossfade 250 ms. View Transition API, tanpa dukungan browser atau dengan reduced motion pindah halaman biasa | Klik kartu / Kembali | 420 ms |
| Kenapa scareer | Stabilo `<mark>` tersapu kiri ke kanan. Kartu foto bereaksi halus ke kursor. Garis atas tiga pilar tergambar bertahap | Masuk viewport / hover |
| Cara belajar | Garis penghubung antar-kolom terisi saat scroll, nomor langkah menyala berurutan | Scroll |
| CTA penutup | Panel merah naik dengan `clip-path`, stabilo tersapu, tombol WhatsApp berdenyut sekali, chip muncul bertahap | Masuk viewport |
| Global | Reveal bervariasi (fade-up, teks bertopeng, skala, wipe) menggantikan fade-up tunggal. Micro-interaction tombol dan tautan konsisten | Masuk viewport / hover |

Tidak dibuat: marquee, pop-up promo, carousel otomatis, latar gradien atau blob, penghitung angka (strip bukti berisi teks, bukan angka). Footer dan section Karya, Mentor, FAQ di luar cakupan.

### Komponen yang bisa digeser

| Komponen | Perilaku |
| --- | --- |
| Chip filter Program (mobile) | Scroll-snap horizontal. Chip yang diketuk otomatis menggulung ke tengah (250 ms). |
| Strip bukti (mobile) | Scroll-snap horizontal, sel berikutnya mengintip. |
| Carousel karya (mobile dan sentuh) | Scroll-snap di tepi kiri kartu, kartu berikutnya mengintip 24 px. |
| Judul FAQ (desktop) | Sticky di top 96 px. |
| Panel menu mobile | Menggulung sendiri bila lebih panjang dari layar, halaman di belakangnya dikunci. |

---

## 7. Responsif

| Pola | Mobile (< 640) | Desktop (≥ 1024) |
| --- | --- | --- |
| Navbar | Logo + menu panel penuh | Menu tengah + dua tombol |
| Hero | Teks lalu panggung 4:5 | Teks kiri, panggung 1320 px |
| Strip bukti | Satu baris yang digeser | 1 baris sel |
| Pilar | Ditumpuk, garis horizontal | 3 kolom, garis vertikal |
| Program | 1 kolom dalam satu kontainer berradius | 3 kolom |
| Panel gelap | Ditumpuk | Grid 2 kolom + sel lebar |
| Cara belajar | Akordeon dengan panel di dalam baris | Tab kiri + panel kanan |
| Karya | Carousel scroll-snap | Akordeon foto 5 kolom |
| Mentor | 1 kolom, potret di atas | 2 kartu bertumpuk |
| FAQ | Judul di atas | Judul sticky kiri |
| CTA penutup | Kontainer penuh, tombol ditumpuk | Kontainer 1024 px |
| Bar CTA sticky | Ada | Tidak ada |

---

## 8. Foto, ikon, dan media

1. **Foto asli** dari kelas, mentoring, dan karya peserta. Pencahayaan alami, tanpa filter tebal. Penyuntingan seragam: kontras sedikit naik, saturasi sedikit turun.
2. **Dilarang:** foto stok orang berjas bersalaman, ilustrasi isometrik, mockup laptop berlayar kosong, logo "dipakai oleh" tanpa bukti, dan testimoni karangan.
3. **Belum ada foto?** Pakai placeholder berlabel jelas: blok `--paper` dengan garis diagonal tipis dan teks "Foto [ISI]". Placeholder tidak boleh lolos ke produksi.
4. Format AVIF atau WebP, `srcset` lebar 480/800/1200, `loading="lazy"` kecuali foto di atas lipatan, `width` dan `height` selalu diisi. Foto Hero pertama memakai `fetchpriority="high"`.
5. Setiap wajah yang tampil wajib sudah mendapat persetujuan tertulis.
6. Set ikon fungsional: Phosphor (regular) atau Lucide, stroke 1.75 px, 20/24 px. Ikon pendamping teks, tidak pernah menggantikan teks. Ikon-saja hanya untuk tombol menu, tutup, dan WhatsApp (selalu punya `aria-label`).

---

## 9. Nada bahasa di antarmuka

- Tombol dan tautan: kata kerja + objek, sentence case. Satu aksi dipanggil dengan **nama yang sama di mana pun**.
- Tanpa superlatif yang tidak bisa dibuktikan ("terbaik", "nomor 1"). Tanpa janji kerja. "Didukung Dibimbing" ditulis apa adanya.
- Gaya santai ("nggak kami janjikan") dipakai di judul, kalimat pembuka, dan catatan tangan. Label sistem dan pesan galat tetap netral dan jelas.
- Pesan galat menjelaskan apa yang terjadi dan langkah berikutnya, tanpa meminta maaf berlebihan atau bercanda.
- Bahasa Indonesia sehari-hari yang rapi: "kamu", "nggak" di judul dan catatan tangan boleh, tetapi tidak dicampur gaya gaul berlebihan, agar tetap kredibel bagi orang tua yang ikut membaca.
- Semua fakta yang belum ada ditulis `[ISI]`. Jangan mengarang angka, harga, nama mentor, atau testimoni.

---

## 10. Aksesibilitas dan performa

**Aksesibilitas (target WCAG 2.2 AA)**

- Kontras teks minimal 4.5:1 (teks besar 3:1). Informasi tidak boleh bergantung pada warna saja (filter terpilih, centang dan silang, label karya).
- Fokus keyboard selalu terlihat. Urutan Tab mengikuti urutan visual. Ada tautan "Lewati ke konten". Satu `<h1>` (Hero), `<h2>` per section, `<h3>` untuk sel dan langkah.
- Target sentuh minimal 48 px, jarak antar target minimal 8 px.
- **Akordeon foto:** tiap kolom adalah `<a>`. Nama dan label ada di DOM tanpa hover.
- **Tab vertikal:** `role="tablist"` dengan `aria-orientation="vertical"`, panah atas/bawah berpindah, Home/End ke langkah pertama dan terakhir. Panel memakai `role="tabpanel"` dan `aria-labelledby`. Di mobile, polanya menjadi akordeon dengan `aria-expanded`.
- **Cincin halo** hanya dekoratif (`box-shadow`) dan tidak boleh jadi satu-satunya indikator fokus.
- **Penanda stabilo:** teks tetap `--ink`. Jangan menaruh teks putih di atas `--highlight`.
- **Pola titik:** tidak boleh menurunkan keterbacaan teks. Kepadatan titik rendah di area teks.
- **Foto bertinta:** label wajib memakai scrim agar kontras ≥ 4.5:1.
- **Chip tanya cepat:** `<a>` dengan `rel="noopener"` dan label jelas.
- Coretan SVG `aria-hidden`. Catatan tangan tetap teks yang bisa dibaca.

**Performa**

- Target mobile 4G: LCP < 2.5 detik, CLS < 0.1, INP < 200 ms.
- JavaScript wajib hanya untuk: filter program, dropdown dan menu mobile, tab, akordeon foto, bar sticky, scroll-spy, animasi coretan, dan lapisan gerak Interaktif (6.2: reveal, progres scroll, efek kursor). Sisanya HTML dan CSS (accordion native `<details>`, scroll-snap native).
- Font di-subset, maksimal 4 berkas. Total halaman di bawah 1 MB sebelum foto lazy-load.

---

## 11. Daftar larangan (cek cepat sebelum rilis)

- Gradient atau blob sebagai dekorasi, glassmorphism. Pengecualian varian Lembar dan navbar pill (tweak): sudut atas membulat besar pada panel CTA dan footer, dan glass pada navbar pill saat scroll. Satu-satunya pengecualian: scrim fungsional di atas foto dan pola titik CTA penutup.
- Bayangan lembut di bawah kartu. Satu-satunya bayangan adalah `--shadow-ink` pada kartu lowongan.
- Tombol hijau di sebelah tombol merah. Teks merah kecil di atas Paper (pakai Merah Tua), teks merah di atas biru, teks putih di atas kuning. Stabilo sebagai warna teks.
- Kata di H1 atau judul section yang diwarnai atau dimiringkan.
- Huruf kapital semua untuk label. Eyebrow tanpa fungsi penunjuk section.
- Auto-play, auto-scroll, marquee, pop-up promo, konten yang tersembunyi sampai animasi selesai. *(Animasi masuk per section, parallax tipis, dan hover pada kartu kini diizinkan lewat 6.2, dengan batas di sana.)*
- Visual diskon, stock photo, testimoni atau angka karangan.
- Lebih dari satu catatan tangan per section, atau Kalam dipakai untuk teks penting.
- Tanda panah di akhir teks tombol.

---

## 12. Keputusan terbuka dan masukan dari tim

1. **Foto candid asli.** Panggung Hero dan akordeon karya sangat bergantung padanya. Tanpa foto, panggung memakai blok `--paper` dan ilustrasi garis. Kapan sesi foto?
2. **Strip bukti.** Sel mana yang datanya sudah pasti (harga mulai, cicilan, asal mentor)? Sel yang belum pasti dihapus.
3. **Chip tanya cepat.** Perlu tiga teks pertanyaan resmi, nomor WhatsApp, dan teks pesan awal per sumber (Hero, Program, Cara belajar, CTA penutup).
4. **Kartu mentor.** Perlu data nyata: nama, pengalaman, bidang, foto, dan izin tampil. Jika belum ada, bagian mentor ditunda dan bagian karya berdiri sendiri.
5. **Logo Scareer dan logo Dibimbing.** Cek keterbacaan logo di empat latar logo panduan warna (terang, Tinta, Merah Nyala, Kuning). Logo Dibimbing perlu izin dan panduan pemakaian resmi.
6. **Cincin halo tombol.** Ini penanda gaya yang kuat. Jika tim merasa terlalu mirip referensi, cincin bisa dilepas tanpa mengubah komponen lain.
7. **Uji kartu lowongan.** Konsepnya kuat, tetapi sebaiknya dicek ke 5–8 fresh graduate (apakah catatan tangannya terasa lucu, bukan menyindir) dan diuji terhadap Hero tanpa kartu setelah rilis.
8. **Auto-play.** Tidak dipakai. Jika tim ingin carousel berjalan sendiri, wajib ada tombol jeda dan berhenti saat hover atau fokus (WCAG 2.2.2).
9. **Smooth scroll.** Durasi ditentukan browser. Jika ingin tepat 600 ms dengan ease-out, perlu fungsi scroll sendiri (sekitar 20 baris JavaScript).