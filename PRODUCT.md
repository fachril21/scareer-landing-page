# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (user, 13 Okt 2026): Vite + React + TypeScript, CSS biasa dengan custom properties, tanpa Tailwind atau shadcn. Satu halaman statis tanpa router dan tanpa backend. Ruang lingkup proyek ini hanya **prototype UI/UX homepage**: tidak ada form, checkout, data nyata, atau integrasi.

## Users

Fresh graduate, pencari kerja entry-level, dan mungkin career switcher pemula di Indonesia, dengan budget terbatas. Mayoritas membuka dari HP dengan jaringan yang tidak selalu cepat. Mereka sedang membandingkan pilihan bootcamp, ragu soal harga dan hasil, dan perlu cepat paham "ini apa dan cocok buat aku atau tidak". Orang tua yang ikut membaca adalah audiens sekunder, jadi bahasa tetap harus kredibel. *(Diambil dari `docs/Struktur Homepage Scareer.md` dan Design.md; tidak diwawancarai ulang.)*

## Product Purpose

scareer adalah bootcamp terjangkau (mulai dari ±Rp3 juta) dengan internship, Supported by Dibimbing. Dua program: Cyber Security dan Data Analyst (hanya dua, tidak ada program lain; diputuskan 20 Okt 2026). Homepage bertugas mengenalkan brand dan mengantar pengunjung ke **halaman detail bootcamp yang tepat**. Keputusan ikut program diambil di halaman detail, bukan di homepage. Tujuan sekunder: pengunjung yang belum yakin ngobrol dulu lewat WhatsApp. Sukses = pengunjung membuka satu halaman detail program, atau memulai obrolan WhatsApp.

## Positioning

"Kakak tingkat, bukan institusi": teman setara yang jujur soal harga dan soal apa yang tidak dijanjikan. **Terjangkau, bukan asal-asalan.** (Kata "murahan/termurah" dihindari brand guideline.) Hook brand: "Fresh graduate, tapi diminta pengalaman 2 tahun?"

## Operating Context

- Konsultasi dan pendaftaran lewat WhatsApp. Belum ada form pendaftaran atau checkout.
- Homepage memajang 4 track resmi; halaman Daftar program (`/program`) dan detail (`/program/[slug]`) ada di luar prototype ini dan memakai kartu program yang sama.
- Halaman detail bootcamp yang sudah dibuat menjadi template untuk semua program.

## Capabilities and Constraints

- Semua fakta program (nama, harga mulai, durasi, format, level, hasil, mentor, nomor WhatsApp) belum ada dan tetap ditulis `[ISI]`. Jangan dikarang.
- Terminologi: "kami" = brand, "kamu" = pembaca; "Didukung Dibimbing" ditulis apa adanya.
- Tidak boleh ada janji kerja, superlatif yang tidak bisa dibuktikan, visual diskon, atau testimoni dan angka karangan.
- Belum diputuskan: program unggulan homepage, asal mentor, teks pertanyaan resmi chip tanya cepat, jawaban resmi FAQ, kebutuhan halaman "Tentang Scareer" dan blog.

## Brand Commitments

- Nama Scareer, posisi "kakak tingkat", tone jujur, hangat, relatable, santai, percaya diri.
- Logo Scareer dan Dibimbing belum tersedia; logo Dibimbing butuh izin dan panduan pemakaian resmi.
- Referensi yang dinyatakan pengguna sebagai pola UI/UX: homepage customer.io. Yang dipinjam hanya pola UI dan komposisi; warna, font, ilustrasi, foto, logo, dan copy customer.io tidak dipakai. *(Detail visual ada di Design.md, bukan di sini.)*

## Evidence on Hand

Belum ada foto candid, potret mentor, karya peserta, testimoni, atau cerita alumni yang boleh dipublikasikan. Prototype memakai placeholder berlabel `[ISI]`. Bagian yang butuh data nyata (mentor, cerita alumni) hanya tampil jika datanya ada dan tidak boleh difabrikasi.

## Product Principles

1. **Jujur lebih penting dari meyakinkan.** Tampilkan apa yang dikurangi, apa yang tidak, dan apa yang tidak dijanjikan.
2. **Homepage untuk menemukan dan percaya; halaman detail untuk memutuskan.** Jangan menumpuk keputusan di homepage.
3. **Program adalah jantung halaman.** Section lain mendukung jalan pengunjung ke halaman detail.
4. **Kepercayaan datang dari bukti nyata,** bukan klaim. Tanpa data nyata, bagian itu ditunda atau dihapus, bukan diisi.
5. **Mobile dulu,** dan WhatsApp selalu menjadi jalan keluar yang rendah risiko.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Target sentuh minimal 48 px, navigasi keyboard lengkap, `prefers-reduced-motion` dihormati, tanpa auto-play. Informasi tidak boleh bergantung pada warna saja (termasuk pengguna buta warna merah-hijau). Bahasa Indonesia sehari-hari yang rapi.
