# Implementation Plan: Prototype Homepage Scareer

Lingkup: **prototype UI/UX saja**. Tidak ada backend, form, checkout, atau data nyata. Semua fakta yang belum pasti tetap `[ISI]`. Sumber kebenaran: `Design.md` (v2), `docs/Struktur Homepage Scareer.md`, `docs/Wireframe Homepage Scareer.html` (desktop 1320, mobile 390, perilaku global).

## 1. Hasil studi (ringkas)

**Customer.io (diverifikasi langsung, 13 Okt 2026):** hero rata kiri dengan H1 besar bobot menengah, subhead pendek, dua tombol pil, baris centang; panggung produk melebar di bawah hero; strip logo; kalimat pernyataan + 3 pilar; grid sel berborder; section gelap; kartu studi kasus; CTA penutup + footer gelap. Karakternya tenang, lega, banyak garis tipis, nyaris tanpa bayangan. Ini cocok dengan tabel studi di Design.md.

**Scareer:** struktur Customer.io, jiwa Scareer (kakak tingkat, hangat, jujur). Urutan: Navbar → Hero + panggung + strip bukti → **Program (inti)** → Kenapa Scareer (pernyataan, pilar, panel gelap) → Cara belajar → Karya (akordeon foto) → Mentor → FAQ → CTA penutup → Footer. Plus bar CTA sticky mobile.

## 2. Temuan dan celah yang harus diputuskan dulu

| # | Temuan | Usulan |
| --- | --- | --- |
| 1 | `PRODUCT.md` belum ada. | **Selesai:** ditulis di root project dari brief dan jawaban kamu. |
| 2 | Token v1 yang hilang. | **Selesai:** Design.md sudah mandiri dan semua token (`--border`, `--text-secondary`, `--r-*`, `--shadow-ink`, `--wa-icon`, dst.) terdefinisi di bab 3. Dipakai apa adanya. |
| 3 | Wireframe punya template `{{ }}` (data berulang: tab, karya, FAQ, tabel interaksi). Isinya dihasilkan script, bukan teks statis. | Ekstrak dari JS wireframe saat membangun (langkah 3.1), bukan menebak. |
| 4 | Tidak ada foto candid, potret mentor, atau karya. | **Disetujui:** placeholder `--sky-soft` bergaris diagonal berlabel "Foto [ISI]" (Design.md 8.3) + ilustrasi garis. |
| 5 | Pertanyaan terbuka nomor 6 (cincin halo terlalu mirip Customer.io?). | Bangun sebagai satu token (`--ring-*`) sehingga bisa dicabut tanpa mengubah komponen. |

## 3. Keputusan teknis (default, bisa kamu tolak)

- **Stack:** Vite + React + TypeScript, CSS biasa dengan custom properties (tanpa Tailwind/shadcn, supaya tidak terlihat seperti template default). Satu halaman, tanpa router. Alasan: tab, akordeon, filter, dan IntersectionObserver lebih rapi sebagai komponen, build statis mudah dibuka tim.
- **Alternatif:** HTML/CSS/JS polos satu folder. Lebih ringan, tapi komponen berulang (grid program, FAQ, tab) jadi panjang.
- **Font:** Bricolage Grotesque (judul), Plus Jakarta Sans (isi), Kalam (catatan tangan), via Google Fonts `font-display: swap`, subset latin.
- **Konten:** satu file `content.ts` berisi semua copy dan `[ISI]`, supaya tim mengisi tanpa menyentuh komponen.
- **Gerak:** hanya `transform`/`opacity` (kecuali tinggi akordeon FAQ), `prefers-reduced-motion` dihormati, tanpa auto-play.
- **Pengujian:** Playwright untuk screenshot 390/768/1024/1440, cek overflow, keyboard (tab, akordeon, tab vertikal), axe untuk a11y. Satu putaran verifikasi batch, lalu perbaikan sekali, sesuai aturan Impeccable.

## 4. Fase

### Fase 0: Fondasi (sebelum kode)
1. ~~Tulis `PRODUCT.md`~~ (selesai).
2. ~~Konfirmasi token dan stack~~ (selesai, lihat bagian 7).
3. Ekstrak copy dan data dari wireframe ke `content.ts` draft.

### Fase 1: Scaffold dan sistem desain (SELESAI)
1. Scaffold Vite React TS, struktur per fitur (`components/hero`, `program`, `why`, `learn`, `proof`, `faq`, `cta`, `ui`; `hooks`; `styles`).
2. `styles/tokens.css`: warna (palet Design.md 3.1), lebar `--w-content 1024`, `--w-wide 1320`, hairline, cincin halo, `--dots`, ritme `--sec-y 128/72`, tipografi fluid (3.3), gerak.
3. Salin token dari Design.md bab 3 apa adanya (warna, tipografi fluid, lebar, radius `--r-pill/media/panel/paper`, cincin, `--shadow-ink 6px`, `--dots`, gerak). Tambahkan reset, `:focus-visible`, dan `.on-ink`.
4. Primitif UI: `Button` (utama, outline, WhatsApp, tautan panah; cincin halo; focus-visible terpisah), `SectionLabel` (ikon tag + nama menu), `Chip`, `QuickChip` (pil stabilo), `CheckRow`, `Placeholder` (blok foto `[ISI]`), ikon fungsional Lucide (stroke 1.75 px, Design.md 8.6) dan ilustrasi garis coretan 1.5 px untuk dekorasi.
5. Layout: `Section` (band selang-seling, lebar 1024/1320, grid 4/8/12 kolom, breakpoint 640/1024/1280, container query untuk sel program), skip link, heading order.

### Fase 2: Section, urut sesuai dampak (SELESAI, 10 dari 10)
Urutan bangun: yang paling menentukan kesan dulu.
1. **Navbar** (sticky, border setelah scroll 8 px, scroll-spy, mega-menu Program, panel penuh mobile dengan focus trap).
2. **Hero + panggung + strip bukti:** H1 80/40 px, kartu lowongan (`--shadow-ink`), animasi coretan SVG dipicu IntersectionObserver ≥ 60%, sekali saja, catatan Kalam. Strip 4 sel; mobile bisa digeser.
3. **Program (jantung):** satu kontainer radius 20 px dengan sel berbagi hairline, filter chip (fade 200 ms, susun ulang, `aria-live`, hash `#bidang-x`), sel ganjil jadi "Lihat semua program", skeleton, state kosong, chip tanya cepat. Hanya tombol "Lihat detail" yang masuk urutan Tab; seluruh sel bisa diklik.
4. **Kenapa Scareer:** kalimat pernyataan rata tengah dengan stabilo (≤ 3 kata), 3 pilar bergaris vertikal, panel gelap (sel "Yang nggak kami janjikan" selalu utuh).
5. **Cara belajar:** tab vertikal (`role=tablist`, panah atas/bawah, Home/End), garis aktif 2 px, panel crossfade 200 ms (kartu program, obrolan WhatsApp, foto mentor, kartu karya), tanpa auto-advance. Mobile jadi akordeon.
6. **Karya:** akordeon foto 5 kolom ≥ 1024 px (flex-grow 1 → 3.2, 300 ms, scrim gradasi, tiap kolom `<a>`, teks ada di DOM tanpa hover, panah kiri/kanan). Sentuh/mobile: carousel scroll-snap.
7. **Mentor:** dua kartu miring (`clip-path` ±40°), varian A/B bergantian. Dirender hanya jika data ada (flag di `content.ts`).
8. **FAQ:** baris bergaris, judul sticky `top: 96px`, deep-link `#faq-nama`, multi-open, tinggi animasi 250 ms.
9. **CTA penutup + Footer:** kontainer bertitik 1024, chip tanya cepat, footer Ink 4 kolom, lencana "Baru".
10. **Bar CTA sticky mobile:** IntersectionObserver, tampil dari Kenapa Scareer sampai FAQ, sembunyi di Hero, Program, dan CTA penutup.

### Fase 3: Perilaku global dan polesan (SELESAI, sebagian besar sudah masuk Fase 2)
Smooth scroll dengan offset 72 px, View Transition foto kartu program (fallback navigasi biasa, di prototype cukup placeholder), reduced-motion, dan link WhatsApp dengan pesan awal terisi (nomor `[ISI]`, `wa.me` placeholder).

### Fase 4: Verifikasi (SELESAI, satu putaran + satu konfirmasi)
1. Playwright screenshot 390 / 768 / 1024 / 1440, kedua tema tidak berlaku (hanya terang + band gelap).
2. Cek: tidak ada overflow horizontal, H1 + subhead + 2 tombol terlihat tanpa scroll di 390×844, kontras (stabilo, scrim, `--red` kecil), fokus keyboard di semua pola baru, target sentuh 48 px.
3. Jalankan detector Impeccable (`impeccable detect`) dan `critique` sekali. Perbaiki semuanya dalam satu batch, konfirmasi satu kali, selesai.
4. Setelah selesai: `/impeccable document` agar Design.md mencerminkan hasil sebenarnya.

## 5. Estimasi urutan kerja

Fondasi + sistem desain → Navbar + Hero → Program → Kenapa + Cara belajar → Karya + Mentor → FAQ + CTA + Footer → Verifikasi. Program dibangun lebih awal karena itu tujuan utama homepage dan polanya (sel bergaris, chip) dipakai ulang di bagian lain.

## 6. Risiko

| Risiko | Mitigasi |
| --- | --- |
| Terlalu mirip Customer.io (cincin halo, label tag, pola section) | Token dilepas satu per satu; warna, font, copy, ilustrasi, dan jiwa visual Scareer berbeda. |
| Tanpa foto asli, panggung dan akordeon terasa kosong | Placeholder diberi desain yang disengaja (blok `--sky-soft`, ilustrasi garis, label jelas), bukan abu-abu kosong. |
| Akordeon foto bergantung hover | Fokus keyboard memicu efek sama, info ada di DOM, sentuh pakai carousel. |
| Copy `[ISI]` terbawa ke produksi | Satu file `content.ts`, plus daftar `[ISI]` yang bisa dicari. |

## 7. Keputusan yang sudah dikonfirmasi

1. Stack: Vite + React + TypeScript + CSS biasa (default dari saya, disetujui).
2. Token: memakai Design.md terbaru (sudah lengkap).
3. Semua foto, potret, dan karya memakai placeholder.
4. `PRODUCT.md` sudah ada. **Berikutnya: Fase 1 (scaffold + sistem desain).**

Catatan Design.md terbaru yang memengaruhi build: bar CTA sticky mobile (4.18) sudah resmi, ikon pakai Lucide/Phosphor, JS hanya untuk filter, menu/dropdown, tab, akordeon foto, bar sticky, scroll-spy, dan coretan (sisanya `<details>` dan scroll-snap native), anggaran font maksimal 4 berkas, halaman < 1 MB sebelum foto.

## 8. Hasil Fase 3 dan 4

**Terverifikasi** (`npm run verify`, Playwright + axe, Chrome, 390/768/1024/1440): 0 pelanggaran axe WCAG 2.2 AA (termasuk kontras) di keempat lebar, tanpa scroll horizontal, tanpa error console, satu `<h1>`, hero (H1, subhead, dua tombol) terlihat tanpa scroll di 390x844, reduced-motion membuat kartu lowongan langsung statis dan smooth scroll mati, urutan Tab dimulai dari "Lewati ke konten" dengan outline 3 px di setiap fokus, detektor Impeccable bersih.

**Diperbaiki saat verifikasi:** strip bukti yang bisa digeser kini fokusable di bawah 1024 px; area sentuh chip filter, chip tanya cepat, dan tautan footer menjadi 48 px.

**Sengaja ditunda (butuh halaman lain atau data nyata):**
- ~~View Transition foto kartu program ke halaman detail~~ (selesai di Fase E halaman detail, lihat `Implementation Plan Detail Program.md`).
- Skeleton memuat sel program (data prototype statis, tidak ada loading).
- Semua `[ISI]`, foto, logo, nomor WhatsApp, dan mentor nyata.
- Tautan "FAQ" di footer selebar 30 px (tinggi 48 px): lolos WCAG 2.2 AA (minimum 24 px), tapi di bawah target 48 px di Design.md.

**Penyimpangan kecil dari Design.md:** breakpoint tab/akordeon Cara belajar dan akordeon Karya memakai 1024 px; catatan tangan di panggung diberi latar kertas putih agar kontras aman di atas foto; kartu mentor desktop memakai tiga kolom (potret, isi, fakta) dengan kartu kedua dibalik.
