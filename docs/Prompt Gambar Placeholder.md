# Prompt gambar untuk placeholder (prototype Scareer)

Dokumen ini berisi prompt untuk membuat gambar pengganti semua placeholder "Foto [ISI]" di prototype. Total **17 gambar**.

## Aturan penting sebelum mulai

1. **Hanya untuk prototype.** Gambar AI membantu tim menilai tampilan, bukan bukti. Design.md bab 8 mewajibkan foto asli dengan persetujuan tertulis, dan prinsip brand adalah jujur. Jadi:
   - Jangan tampilkan gambar AI sebagai **mentor nyata** atau **karya peserta nyata** di produksi.
   - Label di antarmuka ("Dikerjakan peserta batch [ISI]", "Nama mentor [ISI]") tetap `[ISI]` sampai data aslinya ada.
   - Sebelum rilis, semua gambar di sini diganti foto asli.
2. **Tanpa teks, logo, atau merek** di dalam gambar. Generator sering merusak huruf, dan teks palsu terlihat murahan.
3. **Satu gaya untuk semua.** Selalu tempel **Blok Gaya** dan **Blok Negatif** (di bawah) ke setiap prompt. Setelah satu gambar yang kamu suka jadi, pakai sebagai referensi gaya untuk gambar berikutnya (kalau generatormu mendukung image reference atau style reference).
4. **Warna brand muncul kecil lewat properti**, bukan filter: pulpen merah, buku catatan biru muda, sticky note kuning stabilo. Ini menyambung ke konsep "catatan kakak tingkat".

## Cara pakai

1. Salin **Blok Gaya** + prompt gambar + **Blok Negatif**, tempel ke generator.
2. Atur rasio sesuai kolom "Rasio Gemini". Gemini hanya menyediakan **1:1, 9:16, 3:4, 4:3, 16:9**, jadi semua prompt sudah memakai rasio itu. Kolom "Ditampilkan sebesar" dipotong dari gambar (cover), jadi ikuti catatan **zona aman** di tiap gambar.
3. Simpan hasilnya di **`public/images/source/`** dengan **nama file persis** seperti di tabel (PNG atau JPG, sisi terpanjang minimal 2000 px).
4. Kalau sudah ada beberapa, kabari saya. Saya yang mengonversi ke AVIF/WebP dengan `srcset` 480/800/1200, mengisi `width`/`height`/`alt`, dan memasangnya menggantikan placeholder. Kamu tidak perlu mengubah kode.

## Blok Gaya (tempel di awal setiap prompt)

```
Candid documentary photograph, natural window daylight, soft slightly desaturated colors, gentle contrast, shallow depth of field, 35mm lens, realistic skin texture and fabric, warm neutral tones with small cool blue accents, a lived-in bright co-working and learning space in Indonesia, young Indonesian adults in their early 20s wearing casual everyday clothes, small props in red pen, light blue notebook and yellow-green sticky notes, unposed and authentic, not staged,
```

## Blok Negatif (tempel di akhir, atau di kolom negative prompt)

```
no text, no letters, no numbers, no logos, no brand names, no watermark, no suits or ties, no stock-photo handshake, no people looking at the camera with a big smile, no isometric illustration, no 3D render look, no oversaturated colors, no plastic skin, no distorted hands or extra fingers, no readable screen content
```

## Daftar gambar

| # | Nama file | Dipakai di | Rasio Gemini | Ditampilkan sebesar |
| --- | --- | --- | --- | --- |
| 1 | `hero-desktop` | Panggung Hero (desktop) | 16:9 | 1320 × 480 (dipotong tengah) |
| 2 | `hero-mobile` | Panggung Hero (mobile) | 3:4 | 350 × 437 (4:5) |
| 3–8 | `program-a` … `program-f` | Foto sel Program, juga panel "Pilih program" | 16:9 | ±270 × 170 (16:10) |
| 9–13 | `work-1` … `work-5` | Karya: akordeon dan carousel | 1:1 | 180–570 × 420 |
| 14 | `learn-mentor-session` | Panel Cara belajar, langkah 3 | 4:3 | ±380 × 285 |
| 15 | `learn-work` | Panel Cara belajar, langkah 4 | 4:3 | ±380 × 285 |
| 16 | `mentor-1` | Kartu mentor A | 3:4 | ±300 × 312 (hampir 1:1) |
| 17 | `mentor-2` | Kartu mentor B | 3:4 | ±300 × 312 (hampir 1:1) |

---

## 1. `hero-desktop` (16:9)

Kartu lowongan menutupi sisi kiri, jadi sisi kiri dibuat tenang. Orang berada di tengah dan kanan.

```
Wide shot of four Indonesian fresh graduates around a long wooden table in a bright co-working space, one pointing at a laptop while another writes in a notebook with a red pen, a slightly older mentor-like person leaning in to help, laptops with blurred unreadable screens, soft window light from the left. Composition: main subjects in the center and right 60% of the frame, the left 35% of the frame quiet and low in detail (empty table, blurred shelves and plants), eye level, wide aperture, 16:9
```

Alt: Beberapa fresh graduate belajar bareng di satu meja bersama seorang mentor.

## 2. `hero-mobile` (3:4)

Kartu menimpa bagian bawah, jadi orang berada di separuh atas. Di layar dipotong jadi 4:5, jadi sekitar 6% atas-bawah hilang: **jaga wajah dan tangan di 90% tengah**.

```
Candid shot of three Indonesian fresh graduates at a wooden table in a bright co-working space, looking together at one laptop, one holding a red pen over a notebook, a slightly older mentor-like person beside them. Composition: all faces and hands in the upper 55% of the frame, the lower 45% only soft table surface and blurred foreground, portrait orientation 3:4
```

Alt: sama dengan `hero-desktop`.

## 3–8. Foto program (16:9)

Di layar dipotong jadi 16:10, jadi sekitar 10% atas-bawah hilang. **Jaga kepala, tangan, dan objek utama di 80% tengah.**

Nama program dan bidangnya masih `[ISI]`, jadi enam adegan ini bersifat umum dan beda aktivitas supaya grid tidak terlihat sama. Kalau bidang sudah jelas, ganti baris **Subject** sesuai bidang.

**`program-a`: pair programming**
```
Subject: two Indonesian fresh graduates sharing one laptop and working through a problem together, one typing, one pointing at the screen, screen content blurred and unreadable. Medium shot, 16:9
```
Alt: Dua peserta mengerjakan soal bersama di satu laptop.

**`program-b`: perencanaan dengan sticky note**
```
Subject: three young Indonesians planning at a whiteboard covered in colorful sticky notes and hand-drawn arrows, one placing a sticky note, the others discussing. Medium shot from the side, 16:9
```
Alt: Tiga peserta menyusun rencana dengan sticky note di papan tulis.

**`program-c`: presentasi kecil**
```
Subject: a young Indonesian woman presenting to a small group of peers around a table, gesturing toward a blurred monitor, listeners taking notes. Medium shot, 16:9
```
Alt: Seorang peserta mempresentasikan hasil kerjanya ke teman satu kelas.

**`program-d`: sketsa wireframe**
```
Subject: close-up of a young Indonesian hand sketching a simple wireframe on paper with a red pen, a laptop and a light blue notebook blurred beside it. Overhead three-quarter view, 16:9
```
Alt: Tangan peserta menggambar sketsa wireframe di atas kertas.

**`program-e`: review hasil cetak**
```
Subject: a small group of young Indonesians gathered around printed design layouts spread on a table, one person circling something with a red pen, others leaning in. Medium shot, 16:9
```
Alt: Peserta mengoreksi hasil cetak desain bersama-sama.

**`program-f`: mentoring satu lawan satu**
```
Subject: a slightly older mentor sitting next to a young Indonesian fresh graduate at a desk, explaining something on a laptop with calm gestures, the graduate listening and nodding. Shoulder-level shot, 16:9
```
Alt: Mentor menjelaskan sesuatu kepada peserta dalam sesi satu lawan satu.

## 9–13. Karya peserta (1:1)

Ini **bayangan karya**, bukan karya sungguhan. Tidak ada orang, dan isi layar berupa bentuk abstrak yang tidak terbaca. Subjek ditaruh di tengah karena kolom dipotong dari 180 px sampai 570 px lebar.

**`work-1`: dashboard**
```
Subject: a laptop on a wooden desk showing an abstract colorful dashboard made of simple bars, lines and cards in blue and yellow-green, no readable text, a red pen and a light blue notebook beside it, subject centered, square 1:1
```
**`work-2`: aplikasi mobile**
```
Subject: a smartphone standing upright on a desk showing an abstract mobile app screen with soft blue and light yellow-green blocks, no readable text, blurred laptop behind it, subject centered, square 1:1
```
**`work-3`: tata letak cetak**
```
Subject: printed poster and brand layout sheets arranged on a table in blue, off-white and a little red, abstract shapes only and no readable text, a red pen on top, seen from above at a slight angle, square 1:1
```
**`work-4`: sketsa dan catatan**
```
Subject: an open notebook with hand-drawn wireframe sketches, sticky notes and a red-pen annotation, abstract lines only and no readable writing, soft daylight, subject centered, square 1:1
```
**`work-5`: visualisasi data**
```
Subject: a monitor on a desk showing an abstract data visualization made of colored lines, bars and a simple map-like shape, no readable labels, a mug and a notebook beside it, subject centered, square 1:1
```

Alt umum: "Contoh karya peserta [ISI]". Tulis alt yang sebenarnya setelah ada karya nyata.

## 14. `learn-mentor-session` (4:3)

```
Subject: over-the-shoulder view of a mentor and two young Indonesian participants around a laptop during a learning session, the mentor pointing at the screen, participants taking notes, screen content blurred, 4:3
```
Alt: Sesi belajar bersama mentor dengan dua peserta di depan laptop.

## 15. `learn-work` (4:3)

```
Subject: a laptop on a wooden desk showing an abstract finished portfolio page made of simple blocks in blue and yellow-green, no readable text, a notebook and a red pen beside it, soft daylight, 4:3
```
Alt: Contoh karya akhir peserta di layar laptop [ISI].

## 16. `mentor-1` (3:4): kartu A, foto di kiri

Potret dipotong diagonal dari kanan, jadi wajah harus berada di **kiri tengah**. Di layar dipotong hampir persegi, jadi sekitar 25% atas-bawah hilang: **taruh wajah di 60% tengah, agak ke atas, dan jangan terlalu dekat ke tepi**.

```
Subject: environmental portrait of an Indonesian woman in her late 20s to early 30s, smart casual clothes, sitting at a desk in a bright office, looking slightly off-camera as if mid-conversation with a faint natural smile, a laptop and red pen softly blurred behind her. Composition: face and shoulders in the left 60% of the frame, the right 40% soft blurred background, portrait 3:4
```
Alt: Potret mentor [ISI] di ruang kerja.

## 17. `mentor-2` (3:4): kartu B, foto di kanan

Kartu ini dibalik, jadi wajah berada di **kanan tengah**, dengan zona aman vertikal yang sama seperti `mentor-1`.

```
Subject: environmental portrait of an Indonesian man in his late 20s to early 30s, smart casual shirt, standing beside a whiteboard in a bright office, looking slightly off-camera mid-explanation with a calm expression, a notebook in one hand. Composition: face and shoulders in the right 60% of the frame, the left 40% soft blurred background, portrait 3:4
```
Alt: Potret mentor [ISI] di ruang kerja.

---

## Cek sebelum kamu kirim gambar ke saya

- Tidak ada huruf atau logo yang terbaca di layar, buku, atau poster.
- Tangan dan jari wajar, wajah tidak aneh.
- Warna tidak terlalu jenuh. Kalau terlalu cerah, turunkan saturasi sedikit di editor supaya satu keluarga dengan yang lain.
- Hero: sisi kiri (desktop) dan separuh bawah (mobile) cukup kosong untuk kartu lowongan.
- Mentor: posisi wajah sesuai catatan (kiri untuk #16, kanan untuk #17).

Kalau gambar sudah ada di `public/images/source/`, saya akan memeriksa potongan dan kontras teks di atas gambar (scrim Karya) dan melaporkan mana yang perlu digenerate ulang.
