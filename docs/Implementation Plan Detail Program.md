# Implementation Plan: Halaman Detail Program (`/program/[slug]`)

Lingkup sama dengan homepage: **prototype UI/UX saja**. Tidak ada backend, form, atau checkout. Semua fakta yang belum ada tetap `[ISI]`. Sumber kebenaran:

- `docs/Brief-Detail-Program-Scareer.md` (isi, aturan konten, model data, event)
- `docs/Wireframe Detail Program Scareer.html` (5 board: desktop 1740 bagian 1 dan 2, mobile bagian 1 dan 2, "Navigasi samping"; catatan bernomor 1 sampai 29 dan N1 sampai N10)
- `Design.md` (token dan komponen), `PRODUCT.md`

Wireframe hanya abu-abu. Warna, font, radius, dan cincin halo semuanya dari token homepage yang sudah ada, bukan dari wireframe.

## 1. Hasil studi

**Halaman ini membantu memutuskan, bukan menemukan.** 12 section berurutan sesuai pikiran calon peserta: Hero, Problem Agitate Solution, Why Us, Curriculum, Tools, Skills & Output, Mentor, Journey & Schedule, Portfolio Output, Program Detail (+ Untuk siapa), Pricing, FAQ. Satu tujuan: pilih paket lalu lanjut ke WhatsApp. Tujuan kedua: unduh silabus.

**Hal baru dibanding homepage** (di sinilah risiko dan pekerjaan terbesar):

| Elemen baru | Catatan |
| --- | --- |
| Routing `/program/[slug]` | Homepage satu halaman tanpa router. Tautan `/program/...` selama ini mati. |
| Navigasi halaman (daftar isi) dalam 3 pola: sidebar 200 px (≥ 1440), rail 56 px (1280 sampai 1439, hanya pointer), section switcher + bottom sheet (< 1280) | Elemen paling kompleks. Scroll-spy, smooth scroll, hash URL, fokus, lock scroll. |
| Toggle Full Price / Cicilan dengan state di URL (`?bayar=cicilan`), sticky di mobile | Harga berubah tanpa layout shift. |
| Tabel responsif (skill, batch, perbandingan paket) | Desktop tabel, mobile kartu atau scroll horizontal dengan kolom sticky. |
| Model data program tunggal (brief bab 8) | Satu sumber untuk semua program. |
| SEO: `Course`, `FAQPage`, `BreadcrumbList`, title, OG | Prototype cukup menghasilkan JSON-LD dan meta dari data. |
| Event pelacakan (brief bab 11) | Prototype: fungsi `track()` yang hanya `console.debug` di dev. |

**Yang sudah ada dan dipakai ulang:** `Section`, `Button`, `SectionLabel`, `CheckRow`, `FilterChip`, `QuickChip`, `Photo`, `Placeholder`, `Navbar`, `Footer`, `StickyBar`, tab vertikal Cara belajar, akordeon Karya, kartu Mentor, FAQ, `waLink`, hook `useMediaQuery`, `useInViewOnce`, `useVisibleSections`, `useReducedMotion`.

## 2. Selisih brief, wireframe, dan kode yang harus dikunci

| # | Temuan | Keputusan usulan |
| --- | --- | --- |
| 1 | Offset scroll homepage 72 px, halaman detail 96 px (desktop) dan 124 px (mobile: navbar 56 + switcher 52 + 16). | `scroll-padding-top` diganti per halaman lewat variabel `--scroll-offset` di layout detail. |
| 2 | Sidebar 200 px duduk di gutter kiri kolom 1024. Di 1440, gutter = 208 px, jadi pas. Di 1280 gutter 128 px, tidak muat, jadi rail. | Tiga pola dipilih lewat CSS (media query) dan satu komponen data. Rail hanya `(hover: hover) and (min-width: 1280px)`. Tablet di bawah 1280 memakai switcher, termasuk iPad landscape tanpa hover. |
| 3 | Brief memberi hover akordeon Karya 300 ms, kode homepage sudah dihaluskan ke 560 ms. | Pakai komponen Karya yang sudah ada (digeneralisasi), bukan 300 ms dari wireframe. |
| 4 | Brief 7.6 "pisahkan hard skill dan soft skill", wireframe memakai chip filter Semua / Hard skill / Soft skill. | Ikuti wireframe (filter 200 ms, hasil lewat `aria-live`), baris disusun hard dulu lalu soft. |
| 5 | Brief 7.8 menyebut status "hampir penuh / penuh" hanya jika data nyata, wireframe menampilkan "Pendaftaran dibuka / Segera dibuka". | Tipe status mendukung keempatnya. Data prototype hanya memakai dua yang ada di wireframe. Tidak ada kelangkaan palsu. |
| 6 | Tombol mobile "Lihat paket" ada di bar sticky, di homepage bar sticky punya aturan tampil sendiri. | `StickyBar` menerima prop `showBetween={['transparan','detail']}`. Aturan detail: tampil dari Why Us sampai Program Detail, hilang di Hero dan Pricing. |
| 7 | Wireframe punya bar sticky dan toggle bayar sticky bersamaan di Pricing mobile. | Selama Pricing: bar CTA sembunyi, toggle menempel di bawah section switcher (top 108 px). Tinggi tumpukan dihitung di variabel `--stack-top`. |
| 8 | Unduh silabus: brief menyarankan tanpa form. | Tombol menaut ke satu PDF placeholder kecil (`public/files/silabus-placeholder.pdf`, dibuat sekali) dengan `download`, ditandai jelas "contoh". Perlu konfirmasi, lihat bagian 8. |
| 9 | Brief 3.1 melarang angka riset tampil tanpa sumber. | Kolom statistik di PAS dibuat opsional dan **tidak dirender** di prototype (data kosong). Struktur komponen tersedia untuk saat sumber siap. |
| 10 | Foto asli belum ada. | Pakai gambar AI yang sudah masuk (`program-x` untuk panggung hero, `work-1..5` untuk Portfolio berlabel "Contoh dari tim mentor", `mentor-1/2` untuk dua mentor unggulan). Kartu mentor kecil memakai inisial di lingkaran, bukan gambar baru. Tidak membuat gambar tambahan. |

## 3. Keputusan teknis

- **Router:** pengendali kecil buatan sendiri di atas History API (`/` dan `/program/:slug`, sekitar 50 baris: `useRoute`, `Link`, `navigate`, pemulihan scroll). Dua rute tidak membenarkan dependensi baru. Alternatif: `react-router-dom` bila nanti rute bertambah. `vite preview` dan dev server sudah punya fallback SPA.
- **Tidak ada halaman hasil build per slug** (prototype). Slug tidak dikenal menampilkan halaman "Program tidak ditemukan" dengan tautan ke `/#program`.
- **Data:** `src/content/program-detail.ts` mengikuti model brief bab 8 dengan satu fungsi `getProgram(slug)`. Semua enam program (`program-a` sampai `program-f`) memakai template yang sama. Program A diisi **struktur lengkap** (6 modul, 8 tools, 5 skill, 3 batch, 5 karya, 2 mentor unggulan + 4 kecil, 3 persona, 2 paket, 7 baris perbandingan, 5 FAQ). Lima lainnya mewarisi struktur dengan nama `[ISI]`. Kartu program homepage membaca dari sumber yang sama.
- **Satu fakta, satu sumber:** nama, harga mulai, dan durasi di hero, kartu ringkasan, sidebar, spesifikasi, dan metadata semuanya dibaca dari objek program, tidak diketik ulang.
- **Gaya:** CSS biasa per fitur, token lama. Komponen baru tidak menambah token kecuali `--scroll-offset`, `--stack-top`, `--sidebar-w`. Tidak ada bayangan baru, `--shadow-ink` tetap hanya milik kartu hero homepage (kartu ringkasan hero detail memakai hairline).
- **Gerak:** `transform`/`opacity` saja (kecuali tinggi akordeon FAQ). Durasi dari brief: indikator toc 200 ms, crossfade panel 200 ms, crossfade harga 150 ms, kartu CTA mini 150 ms, sheet 250 ms naik dan 200 ms turun. `prefers-reduced-motion`: indikator berpindah tanpa animasi, scroll instan, sheet tanpa geser.
- **Scroll-spy:** satu `IntersectionObserver` dengan `rootMargin: '-96px 0px -60% 0px'`, dikunci selama gulungan hasil klik (lepas saat scroll berhenti atau setelah 800 ms). Dasar halaman otomatis mengaktifkan FAQ. Hash: `pushState` saat klik, `replaceState` saat scroll biasa. Hash di URL saat dimuat langsung menggulung ke section itu.
- **Pelacakan:** `src/lib/track.ts` dengan nama event persis dari brief bab 11. WhatsApp memakai `waLink(source, pesan)` yang sudah ada, `WaSource` diperluas (`pas`, `program_detail`, `pricing`, `faq`, `sticky`, `batch`, `persona`, `silabus`).
- **SEO/meta:** komponen `ProgramMeta` mengatur `document.title`, meta description, OG, dan menyuntik tiga blok JSON-LD dari data. Konten JSON-LD diturunkan dari objek yang sama dengan UI supaya selalu identik.

## 4. Struktur berkas

```
src/
  app/router.tsx                 router kecil, Link, useRoute
  pages/HomePage.tsx             isi App sekarang dipindah ke sini
  pages/ProgramPage.tsx          layout detail + 12 section
  content/program-detail.ts      model brief bab 8 + getProgram
  lib/track.ts, lib/programMeta.ts
  hooks/useScrollSpy.ts, useUrlState.ts, useSectionLock.ts
  components/program-detail/
    ProgramNav/  TocData.ts, Sidebar.tsx, Rail.tsx, SectionSwitcher.tsx, TocSheet.tsx, MiniCta.tsx, toc.css
    sections/    Hero, Pas, WhyUs, Curriculum, Tools, Skills, Mentors, Journey, Portfolio,
                 ProgramSpec(+Persona), Pricing, FaqProgram  (masing-masing .tsx + .css)
    shared/      Breadcrumb, Segmented, DataTable, ChipFilter
```

Aturan: tiap berkas di bawah 400 baris. `Pricing` dan `ProgramNav` dipecah per subkomponen. `components/works`, `mentors`, `faq`, dan tab vertikal Learn diubah agar menerima data lewat props (bukan membaca `content.ts` langsung) lalu dipakai oleh kedua halaman.

## 5. Fase

### Fase A: Fondasi dan data (sebelum UI) (SELESAI)
1. Router kecil + `HomePage` dan `ProgramPage` kosong, tautan homepage (`Lihat detail`, Karya, menu Program) menaut ke `/program/[slug]`. Navbar sadar rute: tautan anchor homepage menjadi `/#program` saat di halaman detail.
2. Tulis `program-detail.ts` lengkap (struktur di bagian 3), tipe TypeScript dari brief bab 8, `getProgram`, dan `track.ts`.
3. `ProgramMeta` (title, description, OG, JSON-LD) dan halaman "tidak ditemukan".
4. Generalisasi komponen yang dipakai ulang (Works, Mentors, Faq, VerticalTabs) menjadi berbasis props. Regresi homepage diperiksa dengan `npm run verify`.

### Fase B: Layout halaman dan navigasi (bagian paling berisiko, dibangun lebih awal) (SELESAI)
1. `ProgramPage` layout: kolom 1024 di tengah, ruang gutter kiri untuk sidebar, `--scroll-offset`, `section[data-theme]`, tautan "Lewati daftar isi".
2. `TocData.ts`: 12 item, 4 grup, 3 anak (Kenapa Scareer, Kenapa program ini, Untuk siapa), satu sumber untuk sidebar, rail, dan sheet.
3. `useScrollSpy` + kunci selama gulungan klik + hash + fokus ke judul section (`tabindex="-1"`).
4. **Sidebar penuh** (≥ 1440): jalur hairline + segmen tebal 3 px (`translateY`, 200 ms), grup dan anak yang membuka 200 ms, state default/hover/aktif/fokus dari tabel wireframe, tema on-ink di atas Why Us dan Karya (150 ms) lewat observer `data-theme="ink"`, kartu CTA mini ("Mulai dari Rp [ISI]" + "Lihat paket" + tautan WhatsApp) yang sembunyi saat Hero atau Harga terlihat, tinggi maksimal `100vh - 160px` dengan scrollbar disembunyikan dan item aktif dijaga terlihat.
5. **Rail 56 px** (1280 sampai 1439, `hover: hover`): garis per item, chip nama pada item aktif, panel 220 px melayang (fade + geser 8 px, 200 ms) saat hover, fokus-dalam, atau klik, menutup 200 ms setelah kursor keluar atau Esc, tidak mendorong konten.
6. **Section switcher + bottom sheet** (< 1280): bilah 52 px menempel di bawah navbar (nama section crossfade 150 ms, "n dari 12", garis kemajuan 2 px), sheet naik 250 ms dengan scrim Ink 45%, tinggi maksimal 70%, `role="dialog"` `aria-modal`, kunci scroll, trap fokus, tutup lewat scrim/Esc/geser ke bawah, target sentuh 48 px, centang di item aktif.
7. Breadcrumb (item terakhir `aria-current`), `<nav aria-label="Daftar isi halaman">` dengan `<ol>` dan tautan biasa, `aria-current="location"`, tanpa `aria-live`.

### Fase C: Section 1 sampai 6 (urutan baca) (SELESAI)
1. **Hero:** lencana, H1 "Bootcamp [Nama Program]", subhead, "Lihat paket" (gulung ke `#harga`) dan WhatsApp, baris centang, panggung foto (mobile 4:5) dengan kartu ringkasan hairline (Durasi, Format, Batch berikutnya dari data dan hilang otomatis bila lewat, Level, "Mulai dari Rp [ISI]"), strip fakta 4 sel (mobile bisa digeser, fokusable).
2. **Problem Agitate Solution:** kalimat pernyataan rata tengah dengan stabilo (maks 3 kata), tiga kolom bergaris vertikal (mobile bergaris horizontal). Baris statistik tidak dirender tanpa data bersumber.
3. **Why Us (ink):** dua kelompok sel: Kenapa Brand (3 sel, sel "yang nggak kami janjikan" selalu utuh dan menyebut tidak menjanjikan kerja, tautan "Pelajari Scareer" ke `/#transparan`) dan Kenapa Program Ini (3 sampai 4 sel, tautan panah "Lihat tools" dan "Lihat mentor" menggulung ke section). Sel relevansi bidang hanya jika ada `sumber`.
4. **Curriculum:** strip ringkasan (modul, minggu, proyek, jam), tab vertikal 6 modul (panah, Home/End, garis aktif 2 px bergeser 250 ms), panel rincian crossfade 200 ms dengan **tinggi tetap** (topik, tools yang menaut ke Tools, output modul, penanda proyek portofolio), hash `#kurikulum-modul-n`, mobile akordeon. Kartu unduh silabus (nama berkas, ukuran, tanggal pembaruan, "Unduh silabus" + "Mau silabus lewat WhatsApp?"), event `download_syllabus`.
5. **Tools:** grid 4 kolom (mobile 2) dalam satu kontainer radius 20 px, ikon Lucide generik (tanpa logo merek), chip kategori yang memudarkan sel tidak cocok 200 ms lalu menyusun ulang grid tanpa celah, hasil lewat `aria-live`, sel menaut ke modul terkait di Curriculum dan memilihnya.
6. **Skills & Output:** tabel tiga kolom, chip Semua / Hard / Soft, baris dengan modul menaut ke Curriculum, empat kartu output di bawah (Portfolio, Sertifikat [ISI], Review CV [ISI], Akses materi [ISI]). Mobile: ditumpuk per skill. Tanpa kolom "sering diminta di lowongan".

### Fase D (SELESAI): Section 7 sampai 12
1. **Mentor:** dua kartu unggulan miring bergantian (komponen homepage), baris empat kartu kecil (inisial, nama, peran), baris "Akses ke mentor" berisi chip (kelas live, review proyek, 1-on-1, rasio). Chip tanpa data dihapus. Mobile: baris kecil bisa digeser (scroll-snap).
2. **Journey & Schedule:** timeline 3 fase bersel dengan garis hubung (mobile vertikal bergaris putus), tabel batch (Batch, Mulai, Hari dan jam, Format, Kuota, Status, "Tanya jadwal" yang membawa nama batch ke pesan WhatsApp), mobile kartu per batch, hover baris pointer 150 ms, state kosong "Batch berikutnya belum dijadwalkan. Tanya dulu lewat WhatsApp.", batch yang sudah lewat otomatis hilang.
3. **Portfolio Output (ink):** akordeon foto 5 kolom (komponen Karya, `work-1..5`) dengan tools, ringkasan, label jujur "Contoh dari tim mentor", mobile carousel dengan kartu berikutnya mengintip 24 px. Judul section "Karya yang dibuat di program ini". Bila tanpa karya peserta: tampil "Proyek yang akan kamu kerjakan".
4. **Program Detail + Untuk siapa:** tabel spesifikasi 10 butir dalam satu kontainer dua kolom (butir kosong dihapus, bukan "-"; "Perangkat" dan "Prasyarat" menaut ke FAQ terkait lalu membuka butirnya), tiga sel persona ("Cocok kalau kamu..." dan "Mungkin belum cocok kalau..."), chip tanya cepat membawa persona ke WhatsApp.
5. **Pricing:** kontrol segmen Full price / Cicilan (radio group, panah kiri/kanan), state di `?bayar=`, harga crossfade 150 ms dengan tinggi sel tetap, dua sel paket (nama, untuk siapa, centang termasuk, "Tidak termasuk", "Pilih paket" menyusun pesan WhatsApp berisi program + paket + mode bayar dan memicu `select_plan`), mode Cicilan menampilkan nominal per bulan, tenor, **total yang dibayar di akhir**, biaya, dan penyedia. Tabel perbandingan 7 baris (mobile scroll horizontal dengan kolom Fitur sticky dan bayangan tipis sebagai petunjuk). Dua kartu "Rincian cicilan" dan "Kebijakan refund dan pindah batch" **selalu terlihat**, tidak di balik tautan atau akordeon. Chip tanya cepat. Tanpa harga dicoret, "paling laris", atau hitung mundur. Mobile: toggle sticky selama Pricing.
6. **FAQ:** komponen FAQ homepage dengan 5 butir program (judul sticky `top: 96px`, multi-open, deep-link `#faq-nama`, event `faq_open`), tombol WhatsApp di bawah. Butir "jaminan kerja" menjawab jujur.
7. **Footer** (global) dan **bar CTA sticky mobile** (aturan di bagian 2 nomor 6, padding bawah halaman agar tidak tertutup).

### Fase E: Integrasi homepage dan polesan (SELESAI)
1. Kartu program, panel "Pilih program", Karya, dan CTA homepage menaut ke rute nyata. View Transition foto kartu program ke panggung hero detail (fallback navigasi biasa), butir yang ditunda di Fase 3 homepage.
2. Pemulihan scroll saat kembali ke homepage (`/#program` menggulung ke section, bukan ke atas).
3. Skeleton kartu program tidak dibangun (data statis, tetap ditunda).
4. Event `view_program`, `click_cta_hero`, `scroll_depth_pricing` (observer), `toc_click` dengan `sumber`.

### Fase F: Verifikasi (satu putaran + satu konfirmasi, aturan Impeccable) (SELESAI)
1. Perluas `scripts/verify.mjs` agar juga menguji `/program/program-a` di 390, 768, 1024, 1280, 1440 (tambahan 1280 karena rail): tanpa overflow horizontal, axe WCAG 2.2 AA, target sentuh, tanpa error console, satu `<h1>`, heading berurutan.
2. Skrip baru `scripts/program-nav.mjs`: scroll-spy (klik tiap item, item aktif benar, tidak berkedip), hash saat dimuat, FAQ aktif di dasar halaman, pola navigasi benar per lebar (sidebar, rail, switcher), bottom sheet (fokus terkunci, Esc, scroll terkunci), tema on-ink di atas Why Us, kartu CTA mini sembunyi di Hero dan Harga, bar sticky mobile aturan tampil, toggle bayar (URL berubah, tinggi sel tetap, tidak ada CLS), keyboard tab vertikal Curriculum dan filter Tools/Skills, reduced motion (scroll instan).
3. Screenshot per section di 390 dan 1440, `impeccable detect` dan `critique` sekali, perbaiki dalam satu batch, konfirmasi satu kali.
4. Cek bundel: halaman di bawah 1 MB sebelum foto, JS gzip di bawah 150 kB (ada penambahan kecil dari router dan komponen).
5. Setelah selesai: perbarui `docs/Implementation Plan.md` dan jalankan `/impeccable document` agar Design.md mencerminkan hasil.

## 6. Urutan kerja dan estimasi

A (fondasi + data) → B (navigasi, paling berisiko, diuji dulu dengan section kosong berjudul) → C → D → E → F. Navigasi dibangun sebelum isi supaya scroll-spy, offset, dan tema ink diuji terhadap 12 section sungguhan sejak awal, bukan ditambal di akhir. Sekitar 70 berkas baru, sebagian besar kecil. Pricing, ProgramNav, dan Curriculum adalah tiga bagian yang paling banyak memakan waktu.

## 7. Risiko

| Risiko | Mitigasi |
| --- | --- |
| Scroll-spy berkedip atau salah di section pendek dan di dasar halaman | Satu observer, kunci selama gulungan klik, aturan dasar halaman, diuji otomatis di tiap pola. |
| Tiga lapis sticky (navbar, switcher, toggle bayar) saling menimpa di mobile | Variabel `--stack-top` terpusat, uji screenshot 390 saat berada di Pricing, offset gulung dihitung dari variabel yang sama. |
| Sidebar atau rail mendorong layout atau menutupi konten di 1280 sampai 1439 | Rail di gutter, `position: sticky`, tanpa mengubah lebar kolom, uji lebar 1280 dan 1439 untuk overflow. |
| Pergeseran tinggi saat ganti modul, mode bayar, atau filter | Tinggi panel dan sel dikunci, filter memakai `aria-live` dan ruang tetap, diukur CLS dalam verifikasi. |
| Data `[ISI]` terbawa ke produksi dan angka tanpa sumber tampil | Aturan "butir kosong dihapus, bukan diisi", statistik PAS tidak dirender tanpa `sumber`, daftar `[ISI]` bisa dicari di satu berkas data. |
| Komponen homepage yang digeneralisasi (Works, Mentors, Faq, tab) memunculkan regresi | Verifikasi homepage dijalankan segera setelah Fase A, sebelum UI baru dibangun. |
| Gambar AI terlihat seperti mentor atau karya nyata | Label jujur tetap: "Contoh dari tim mentor", nama mentor `[ISI]`, seperti di homepage. |
| Terlalu panjang untuk dibaca di HP | Switcher + sheet, bagian berat (kurikulum, tools, tabel) memakai akordeon atau scroll-snap di mobile. |

## 8. Yang perlu kamu putuskan sebelum mulai

Semua ada default, jadi kalau tidak ada keberatan saya langsung jalan dengan pilihan pertama.

1. **Router:** buat sendiri (default) atau pakai `react-router-dom`?
2. **Unduh silabus:** saya buat satu PDF placeholder kecil berlabel "contoh" (default), atau tombol dibiarkan tidak aktif sampai berkas asli ada?
3. **Program mana yang diisi lengkap:** Program A (default, enam program lain mewarisi struktur dengan `[ISI]`). Atau mau semuanya diisi struktur penuh?
4. **Gambar:** pakai gambar AI yang sudah ada sebagai pengganti sementara (default), tanpa membuat gambar baru, atau kamu mau saya tulis prompt tambahan (misalnya panggung hero detail dan potret mentor kecil)?
5. **Keputusan terbuka brief bab 12** tidak menghalangi prototype, tapi memengaruhi isi akhir: pendaftaran lewat WhatsApp saja, prospek karier dan gaji, isi paket, dan jaminan kerja. Prototype mengikuti default brief (WhatsApp saja, tanpa prospek karier, tanpa jaminan kerja).

## 9. Hasil Fase A

**Dibangun**
- `src/app/router.tsx`: router kecil (`useLocation`, `navigate`, `useHomeHref`, `Router`, `Redirect`). Tautan `<a href="/...">` biasa dicegat satu kali di dokumen, jadi komponen lama tidak perlu diubah. Posisi gulir disimpan di `history.state`, jadi tombol Kembali memulihkan posisi. `/program` diarahkan ke `/#program`, slug atau rute tak dikenal menampilkan `NotFoundPage`.
- `src/pages/`: `HomePage` (isi `App` lama), `ProgramPage` (kerangka: 12 section dengan id dan judul final, breadcrumb, `<h1>`), `NotFoundPage`. `App.tsx` kini hanya memilih rute.
- `src/content/program-detail.types.ts` (model brief bab 8) dan `program-detail.ts` (`getProgram`, `upcomingBatches`). Nama, durasi, format, level, dan harga mulai dibaca dari `PROGRAMS`. `program-sections.ts` memuat 12 section (id, label daftar isi, judul, tona) sebagai satu sumber.
- `src/lib/track.ts` (event brief bab 11, `CustomEvent scareer:track`), `lib/programMeta.ts` dan `ProgramMeta` (title, description, OG, JSON-LD `Course`, `FAQPage`, `BreadcrumbList`; penawaran harga tidak ditulis selama harga masih `[ISI]`; semuanya dibersihkan saat keluar halaman).
- `public/files/silabus-contoh.pdf` (placeholder 1 halaman), `WaSource` diperluas dengan sumber "Detail: ...".
- Navbar, menu mobile, logo, dan footer sadar rute: tautan anchor menjadi `/#...` di halaman detail, scroll-spy navbar hanya aktif di homepage.
- Generalisasi berbasis props: `WorkShowcase` (Karya), `MentorShowcase` (Mentor, potret dan CTA bisa diatur), `Faq` (items, judul, sumber WhatsApp, `onOpen`). Homepage memakai pembungkus `Works`, `Mentors`, dan `Faq` bawaan dengan tampilan sama.
- `scripts/route-check.mjs`: cek rute otomatis.

**Terverifikasi:** `tsc` dan build bersih; `route-check`: klik "Lihat detail" berpindah rute tanpa muat ulang dokumen, Kembali memulihkan posisi gulir homepage, hash langsung (`/program/program-b#harga`) menggulung ke section, navbar dari halaman detail membawa ke `/#kenapa-scareer`, meta dan JSON-LD terpasang lalu dibersihkan, `/program` diarahkan, dua jenis 404, tanpa error console; `verify` homepage tetap 0 pelanggaran axe, tanpa overflow, tanpa error console (satu-satunya target kecil tetap tautan footer "FAQ" 30 px yang sudah dicatat).

**Dipindah ke fase berikutnya (sengaja):** generalisasi tab vertikal Cara belajar. Kurikulum punya tata letak sendiri (durasi di daftar, panel tinggi tetap), jadi pengambilan bagian bersama (penanganan panah/Home/End) dilakukan di Fase C saat bentuk kedua pemakainya jelas, bukan ditebak sekarang.

**Catatan:** `--scroll-offset` (96/124 px) belum dipasang karena itu bagian Fase B. Untuk sementara `#harga` berhenti 72 px dari atas (offset homepage).

## 10. Hasil Fase B

**Dibangun**
- `ProgramPage` kini punya kerangka final: breadcrumb di bilah sendiri (di atas switcher di mobile), `<div class="pd-shell">` untuk aside, 12 section dengan id final plus tiga pembungkus anak section (`kenapa-brand`, `kenapa-program`, `untuk-siapa`) yang tingginya masih kerangka (`.pd-stub`, dihapus saat isi section jadi), dan penanda `#spy-end` di dasar dokumen.
- `content/program-sections.ts`: `PROGRAM_TOC` (4 grup, 12 item, 3 anak) dan `TOC_PARENT`, satu sumber untuk ketiga pola.
- `hooks/useProgramToc.ts`: satu `IntersectionObserver` (rootMargin `-96px 0 -60% 0`), aturan dasar halaman, kunci selama gulungan klik (dilepas oleh `scrollend` atau maksimal 1,2 detik), tema on-ink, hash lewat `replaceState` (hash anak section dari klik tidak ditimpa selama induknya aktif), dan pemulihan posisi untuk Kembali/Maju antar-hash. `hooks/useNavPattern.ts` memilih tepat satu pola.
- `lib/scrollTo.ts` (`goToSection`: `pushState`, gulir mulus, fokus ke judul; `scrollTargetFor`). Klik dan hash di URL menggulung ke **judul** section (padding section 128 px tidak ikut), kecuali Ringkasan yang kembali ke puncak.
- `components/program-detail/ProgramNav/`: `TocList` (satu komponen untuk sidebar, panel rail, dan sheet; jalur hairline + segmen tebal yang diskalakan dengan `transform`), `Sidebar` (+ tautan "Lewati daftar isi", `MiniCta`), `Rail` (garis dekoratif + satu tombol, panel 220 px melayang), `ProgramSwitcher` + `TocSheet` (bilah 52 px, bottom sheet dengan trap fokus, kunci scroll, Esc, scrim, geser untuk menutup), `ProgramAside`, `toc.css`.
- `--scroll-offset`: 96 px (sidebar atau rail), 132 px di bawah itu (navbar 64 + switcher 52 + 16), dipasang lewat kelas `is-program-page` pada `<html>` sebelum rute menggulung ke hash.
- `Section` kini memberi `data-theme="ink"` pada section gelap.

**Terverifikasi** (`scripts/program-nav.mjs`, semua cek lolos): sidebar 1440 px (tepat satu `<nav>`, tidak menimpa kolom konten, sticky di 96 px, kartu CTA mini hilang di Hero dan Harga lalu muncul di tengah, scroll-spy benar di 12 section, FAQ aktif di dasar halaman, anak section membuka saat induk aktif, tema on-ink di Why Us dan Karya, klik 11 item menggulung ke judul di 96 px dengan hash dan fokus yang benar tanpa item aktif berkedip melewati section lain, klik anak, hash di URL saat dimuat, Kembali memulihkan posisi); rail 1300 px (56 px, 12 garis, chip item aktif, panel 220 px tidak menggeser konten, tutup dengan klik, Esc, dan buka saat fokus); layar sentuh 1300 px memakai switcher; switcher 390 px (52 px, menempel di 64 px, "n dari 12" mengikuti gulir, sheet modal dengan fokus di dalam, scroll terkunci, tinggi di bawah 70%, target 48 px, Esc dan scrim menutup, pilih item menggulung ke judul di 132 px, hash dan fokus benar); reduced motion membuat gulir instan; axe WCAG 2.2 AA 0 pelanggaran di semua pola; tanpa error console. Homepage tetap bersih (`verify`, `route-check`).

**Penyimpangan kecil dari brief:** navbar situs 64 px (bukan 56 px di wireframe), jadi offset mobile 132 px, bukan 124 px. Rail dan sidebar hanya memakai gutter yang ada: lebar sidebar `min(200px, gutter - 24px)` supaya tidak pernah menimpa kolom konten (di viewport 1440 yang memakai scrollbar klasik sekitar 176 px). Rail memakai satu tombol fokus + daftar tautan di panel, bukan 12 garis yang masing-masing bisa difokus, supaya urutan Tab tidak ganda. Item anak di daftar isi hanya bisa dijangkau saat induknya aktif (sesuai brief).

**Tertunda ke Fase D:** bar CTA sticky mobile (aturan tampil ada di bagian 2 nomor 6 dan 7) dan toggle bayar yang menempel selama Pricing.

## 11. Hasil Fase C

**Dibangun** (`components/program-detail/sections/`, satu berkas komponen dan satu CSS per section)
1. **ProgramHero**: lencana, H1 "Bootcamp [nama]", subhead, "Lihat paket" (menggulung ke Harga) dan WhatsApp, baris centang, foto kelas dengan **kartu ringkasan hairline** (Durasi, Format, Batch berikutnya dari data dan otomatis hilang bila sudah lewat, Level, "Mulai dari"), strip fakta 4 sel. Memakai ulang `.hero`, `.stage`, `.proof` homepage. Di mobile kartu hanya menampilkan Durasi dan Batch berikutnya, strip bisa digeser dan fokusable.
2. **ProblemAgitateSolution**: kalimat pernyataan sebagai `<h2>` (maks 3 kata berstabilo) dan tiga pilar Problem / Agitate / Solution (gaya "Kenapa Scareer" homepage). Baris statistik hanya dirender bila data punya `sumber` (belum ada, jadi tidak tampil).
3. **WhyUs** (ink): dua kelompok sel dengan pembungkus `kenapa-brand` dan `kenapa-program` (anak daftar isi), sel "Yang nggak kami janjikan" selalu utuh, tautan "Lihat tools" dan "Lihat mentor" menggulung ke section, "Pelajari Scareer" menaut ke `/#transparan`. Butir bertanda `requiresSource` tanpa `source` dibuang.
4. **Curriculum**: strip ringkasan, tab vertikal 6 modul (panah, Home/End, tanpa auto-advance, garis aktif 2 px), panel rincian ditumpuk dalam satu sel grid sehingga tinggi tetap dan crossfade 200 ms, penanda proyek portofolio, hash `#kurikulum-modul-n` (dibaca saat dimuat dan ditulis saat memilih), mobile akordeon. Kartu unduh silabus (PDF placeholder, `download`, event `download_syllabus`, alternatif WhatsApp).
5. **Tools**: grid sel berborder 4/3/2 kolom dalam satu kontainer, ikon Lucide generik (tanpa logo merek), chip kategori dengan pola fade 200 ms lalu susun ulang (`useFadeFilter`), hasil lewat `aria-live`, klik sel memilih modul terkait di Curriculum.
6. **SkillsOutput**: tabel tiga kolom dengan `<caption>` dan `scope` (tablet ke atas), ditumpuk per skill di mobile, filter Hard/Soft (hard dulu), tautan modul ke Curriculum, empat kartu output.

**Pendukung baru:** `hooks/useFadeFilter.ts`, `lib/sectionLink.ts` (`requestSection` dan `openModule` lewat event, supaya tautan di dalam konten memakai kunci scroll-spy yang sama dengan daftar isi), dan `ModuleDetail` yang dipakai tab dan akordeon. Hash yang diawali id section aktif (mis. `#kurikulum-modul-3`) tidak lagi ditimpa scroll-spy.

**Terverifikasi** (`scripts/program-sections.mjs`, semua cek lolos): hero (satu H1, 4 baris ringkasan, 4 fakta, foto termuat, "Lihat paket" menggulung ke judul Harga di 96 px dengan event, tautan WhatsApp membawa sumber), PAS (kolom, stabilo 2, tanpa statistik), Why Us (dua kelompok, id anak benar, "Lihat tools" menggulung dengan hash, href "Pelajari Scareer"), Curriculum (panah/Home/End, hash, fokus ikut tab, tinggi panel tidak berubah, tidak berpindah sendiri 3 detik, tepat satu panel aktif, silabus berformat PDF 200 dengan atribut `download`), Tools (filter, teks status, ikon SVG tanpa gambar merek, klik sel memilih modul dan menggulung), Skills (filter 3 dan 2 baris, tabel beratribut, klik modul), hash modul saat dimuat, mobile 390 (H1, subhead, kedua tombol terlihat tanpa scroll, ringkasan 2 baris, strip bisa digeser, PAS bertumpuk, akordeon, Tools 2 kolom, Skills bertumpuk, kartu output 1 kolom), tablet 768, axe WCAG 2.2 AA 0 pelanggaran di 1440, 390, dan 768, tanpa overflow dan tanpa error console. `program-nav`, `route-check`, dan `verify` homepage tetap lolos.

**Penyimpangan kecil:** tautan modul di sel Tools dan tabel Skills diberi area sentuh 44 px dengan pseudo-elemen (tinggi tampilan tetap kecil); filter yang tidak mengubah URL, berbeda dari filter Program homepage yang menulis hash. Foto panggung hero memakai gambar `program-x` yang sudah ada (belum ada foto kelas asli).

**Belum (Fase D):** section 7 sampai 12 (Mentor, Journey & Schedule, Portfolio Output, Program Detail + Untuk siapa, Pricing, FAQ), bar CTA sticky mobile, dan toggle bayar yang menempel.

## 12. Hasil Fase D

**Dibangun** (`components/program-detail/sections/`)
7. **MentorSection**: dua kartu unggulan miring bergantian (memakai `MentorShowcase`), baris empat kartu kecil dengan inisial (scroll-snap dan fokusable di bawah desktop), baris "Akses ke mentor" berisi chip. Hanya mentor ber-`consent` yang dirender, chip tanpa data dihapus.
8. **JourneySchedule**: timeline 3 fase dalam satu kontainer (garis penghubung tipis di desktop, garis putus-putus vertikal di mobile), tabel batch (kartu per batch di mobile), tombol "Tanya jadwal" membawa nama batch ke pesan WhatsApp, status dari data (tanpa "hampir penuh" atau "penuh" selama datanya tidak ada), batch yang sudah lewat otomatis hilang, state kosong dengan ajakan WhatsApp.
9. **PortfolioOutput**: `WorkShowcase` dengan label jujur "Contoh dari tim mentor" dan tools per karya. Lebar kolom 1024 px (bukan 1320 seperti homepage) supaya tidak menimpa daftar isi di gutter. Karya tanpa `href` hanya mencatat `portfolio_open` dan tidak berpindah halaman.
10. **ProgramSpec**: tabel spesifikasi dua kolom (butir kosong dihapus, bukan "-"), "Lihat jawaban" untuk Perangkat dan Prasyarat membuka butir FAQ terkait dan menggulung ke sana (`openFaq`), tiga persona (Cocok kalau / Mungkin belum cocok kalau), chip tanya cepat berisi persona (anak section `untuk-siapa`).
11. **Pricing**: kontrol segmen Full price / Cicilan (radio group, panah kiri/kanan) dengan state di `?bayar=` lewat `replaceState` (hash dan posisi gulir tidak berubah), dua paket dengan harga Full dan Cicilan ditumpuk dalam satu sel sehingga tinggi kartu tetap dan crossfade 150 ms tanpa layout shift, mode Cicilan selalu menampilkan total yang dibayar di akhir, "Pilih paket" menyusun pesan WhatsApp berisi program, paket, dan mode bayar (event `select_plan`), tabel perbandingan 7 baris (digeser horizontal di mobile dengan kolom Fitur menempel dan bayangan tepi), kartu "Rincian cicilan" dan "Kebijakan refund" selalu terlihat, chip tanya cepat, event `scroll_depth_pricing`. Di bawah 1024 px toggle menempel di bawah switcher selama Harga digulir.
12. **ProgramFaq**: komponen FAQ homepage dengan 6 butir program, judul menempel di kiri, multi-open, deep-link, event `faq_open`. Jawaban jaminan kerja jujur (tidak menjanjikan).

**Bar CTA sticky mobile**: `StickyBar` kini menerima aturan tampil dari halaman (homepage lewat `HomeStickyBar`). Di halaman detail: tampil dari Kenapa kami sampai Program Detail, hilang saat Hero atau Harga terlihat, "Lihat paket" menggulung ke Harga, ikon WhatsApp membawa sumber.

**Pendukung:** `usePaymentMode`, `openFaq` dan event buka FAQ, `QuickChip` dengan `onClick`, `Faq` dengan `tone` dan `onAsk`, `Works` dengan `tools`, `onOpen`, `width`. Scroll-spy mengabaikan sasaran yang bukan section (butir FAQ) sehingga item daftar isi tidak hilang.

**Terverifikasi** (`scripts/program-pricing.mjs`, semua cek lolos): seluruh isi section 7 sampai 12 di 1440; karya tidak menimpa sidebar, hover membuka kolom dengan deskripsi dan tools, klik tidak berpindah halaman; "Lihat jawaban" membuka FAQ, hash `#faq-laptop`, judul di offset benar; FAQ multi-open; toggle (URL, tinggi `.plans` tidak berubah, hash tetap, panah, event, pesan WhatsApp berisi paket dan mode); cicilan dan refund selalu terlihat; tanpa harga dicoret atau label "paling laris"; `?bayar=cicilan#faq-jaminan-kerja` saat dimuat; di 390 px bar sticky tampil dan hilang sesuai aturan (Hero, Harga, FAQ hilang; Kurikulum, Karya, Detail tampil), "Lihat paket" menggulung ke judul Harga di 132 px, toggle menempel di 116 px dan bisa dipakai tanpa kembali ke atas, tabel perbandingan bisa digeser dengan kolom Fitur menempel, kartu batch, mentor kecil, carousel karya; axe WCAG 2.2 AA 0 pelanggaran di 1440, 1300, 768, 390 (juga mode cicilan); tanpa overflow dan tanpa error console. `program-sections`, `program-nav`, `route-check`, dan `verify` homepage tetap lolos.

**Penyimpangan kecil:** judul FAQ menempel di top 96 px bersama labelnya, jadi `<h2>` berhenti sedikit di bawah 96 px saat diklik dari daftar isi. Karya di halaman detail memakai kolom 1024 px.

**Belum:** Fase E (menyambungkan homepage ke rute nyata dengan View Transition foto kartu program, pemulihan scroll `/#program`), dan Fase F (verifikasi akhir, `impeccable detect` dan `critique`, cek bundel, memperbarui dokumen).

## 13. Hasil Fase E

**Dibangun**
- **View Transition foto kartu program** (`lib/viewTransition.ts`, aturan di `program-page.css`): klik atau Enter pada kartu program di homepage menjalankan `document.startViewTransition`. Foto kartu diberi `view-transition-name: program-photo` sesaat, halaman detail dirender dengan `flushSync`, lalu transisi menunggu foto hero ter-decode (maksimal 700 ms) sehingga bingkai akhir tidak kosong. Foto dipotong dengan `object-fit: cover` selama bergerak (kartu 16:10 ke panggung lebar), durasi 420 ms dengan kurva token. Tanpa dukungan browser, dengan reduced motion, atau dengan modifier (Ctrl atau Cmd + klik), pindah halaman biasa. Hanya arah maju dari kartu ke detail; arah kembali memakai pemulihan gulir.
- **Footer**: kolom Program menaut ke `/program/program-a` sampai `c`, kolom Perusahaan ke `#kenapa-scareer`, `#cara-belajar`, `#faq` (menjadi `/#...` di halaman detail). Kontak dan Legal tetap ke beranda sampai tujuannya ada.
- Tautan yang sudah menuju rute nyata sejak Fase A dan kini diverifikasi: tombol "Lihat detail" enam kartu, lima kolom Karya, menu Program, "Lihat semua program" (`/program` diarahkan ke `/#program`).

**Terverifikasi** (`scripts/route-transition.mjs`, semua cek lolos): klik badan kartu memanggil `startViewTransition` sekali dan menghasilkan animasi `::view-transition-group/old/new(program-photo)` yang selesai, tanpa muat ulang dokumen, mendarat di `/program/program-c` pada y = 0 dengan foto hero 1200 px sudah termuat dan nama transisi tidak tertinggal di elemen; Kembali memulihkan posisi gulir homepage (1802 ke 1802) dan section Program terlihat; Enter pada tombol "Lihat detail" juga bertransisi; Ctrl+klik tidak memanggil transisi; reduced motion tidak memanggil transisi; di 390 px (tap) transisi berjalan dan switcher tampil; kolom Karya homepage membuka detail tanpa transisi foto kartu; footer dari halaman detail ke `/#cara-belajar` mendarat dengan section di 72 px (offset homepage). Bingkai tengah transisi diperiksa visual (foto bergerak dari kartu ke panggung tanpa regang).

**Tetap tidak dibangun (disengaja):** skeleton kartu program (data statis, tidak ada loading) dan transisi arah kembali (detail ke kartu).

**Berikutnya (Fase F):** verifikasi akhir (`impeccable detect` dan `critique` sekali, perbaikan satu batch), cek bundel, dan memperbarui dokumen (`Implementation Plan.md` serta Design.md lewat `/impeccable document`).

## 14. Hasil Fase F (verifikasi akhir)

**Cara menjalankan ulang:** `npm run build`, `npx vite preview --port 4173`, lalu `npm run verify:program` (route-check, route-transition, program-nav, program-sections, program-pricing, program-budget) dan `npm run verify` (homepage).

**Detektor Impeccable** (`impeccable detect`): pemindaian berkas `src` bersih. Pemindaian halaman berjalan di 1440 dan 390 px menghasilkan 28 temuan, ditriase satu putaran:
- **Diperbaiki:** kotak ikon di atas judul pada 8 sel Tools (`icon-tile-stack`) diganti ikon polos sebaris dengan nama tool; bilah breadcrumb diberi padding vertikal 4 px.
- **Diterima, bukan cacat:** 10 `cramped-padding` pada pembungkus tabel dan kontainer berradius yang selnya sendiri berpadding (`skills-box`, `batch-box`, `compare`, butir FAQ yang sama dengan homepage); 7 `tight-leading` pada judul display yang line-height-nya memang dipatok Design.md; 2 `low-contrast` pada kata berstabilo (teks Ink di atas Stabilo, kontras tinggi, detektor salah membaca gradasi transparan; sama dengan homepage); 1 `overused-font` (Plus Jakarta Sans dipatok Design.md: "the brief wins").
- Setelah perbaikan: `icon-tile-stack` hilang, sisanya hanya yang diterima di atas.

**Anggaran performa** (`scripts/program-budget.mjs`, gulir penuh + ganti mode bayar + buka FAQ dan modul): JS 95,1 kB gzip (anggaran 150), CSS 11,7 kB gzip (anggaran 30), bobot non-gambar 457 kB (anggaran 1 MB), font 76 kB, CLS 0,007 di 1440 dan 0,002 di 390 (anggaran 0,1).

**Satu putaran konfirmasi:** seluruh `verify:program` lolos, `verify` homepage tetap 0 pelanggaran axe di 390/768/1024/1440, tanpa overflow dan tanpa error console. Satu cek uji sempat gagal sekali karena menyimpan hash sebelum scroll-spy selesai menulisnya (masalah urutan di skrip uji, bukan di halaman); skrip diperbaiki dan dijalankan dua kali berturut-turut tanpa masalah.

**Tentang Design.md:** `Design.md` adalah milik tim dan tidak diubah. Tambahan yang muncul di halaman detail dan layak masuk ke Design.md bila tim setuju: daftar isi halaman (sidebar, rail, switcher + sheet), kartu ringkasan hairline di hero detail, kontrol segmen mode bayar, tabel bergaris dalam kontainer 20 px, dan transisi foto kartu program. Menjalankan `/impeccable document` akan membuat DESIGN.md turunan dari kode; belum dijalankan agar tidak menimpa keputusan tim.

**Yang masih menunggu data atau keputusan tim (bukan pekerjaan UI):** semua `[ISI]`, foto kelas dan mentor asli (gambar AI sekarang hanya pengganti), PDF silabus asli, nomor WhatsApp, harga, skema cicilan, kebijakan refund, isi paket, dan keputusan terbuka brief bab 12.
