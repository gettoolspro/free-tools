import{a as e}from"./index-BrO3c2l1.js";import{a as t,i as n,r,t as i}from"./controls-LEl6-qCH.js";import{t as a}from"./lab-BSD-2J2M.js";import{d as o,f as s,n as c,o as l,r as u,s as d,t as f}from"./codepanel-D34ICvuV.js";var p=String.raw,m=[{key:`square`,name:{en:`Square of a number (sequence)`,id:`Hitung kuadrat (sekuen)`},code:{en:p`number = int(input("Enter a number: "))
square = number * number
print("The square of", number, "is", square)
`,id:p`angka = int(input("Masukkan sebuah angka: "))
kuadrat = angka * angka
print("Kuadrat dari", angka, "adalah", kuadrat)
`},inputs:[`12`],tests:[[`12`],[`-3`],[`0`]]},{key:`types`,name:{en:`Data types with type()`,id:`Tipe data dengan type()`},code:{en:p`name = "Andi"        # str (text)
age = 17             # int (whole number)
height = 165.5       # float (decimal number)
passed = True        # bool (logic)
print("Name:", name, "| type:", type(name))
print("Age:", age, "| type:", type(age))
print("Height:", height, "| type:", type(height))
print("Passed:", passed, "| type:", type(passed))
`,id:p`nama = "Andi"         # str (teks)
umur = 17             # int (bilangan bulat)
tinggi = 165.5        # float (bilangan desimal)
status_lulus = True   # bool (logika)
print("Nama:", nama, "| tipe:", type(nama))
print("Umur:", umur, "| tipe:", type(umur))
print("Tinggi:", tinggi, "| tipe:", type(tinggi))
print("Lulus:", status_lulus, "| tipe:", type(status_lulus))
`}},{key:`temperature`,name:{en:`Temperature conversion`,id:`Konversi suhu`},code:{en:p`celsius = float(input("Temperature (Celsius): "))
reaumur = celsius * 4 / 5
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} C = {reaumur:.1f} R")
print(f"{celsius} C = {fahrenheit:.1f} F")
`,id:p`celsius = float(input("Suhu (Celsius): "))
reamur = celsius * 4 / 5
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} C = {reamur:.1f} R")
print(f"{celsius} C = {fahrenheit:.1f} F")
`},inputs:[`37.5`],tests:[[`37.5`],[`100`],[`-40`]]},{key:`operators`,name:{en:`Guess the output: operators`,id:`Tebak output: operator`},code:{en:p`a = 10
b = 3
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
print(str(a) + str(b))
`,id:p`a = 10
b = 3
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
print(str(a) + str(b))
`}},{key:`pass-fail`,name:{en:`Pass or fail: boundary test`,id:`Predikat kelulusan: uji batas`},code:{en:p`score = float(input("Enter the final score: "))
if score >= 75:
    result = "PASS"
else:
    result = "FAIL"
print("Result:", result)
`,id:p`nilai = float(input("Masukkan nilai akhir: "))
if nilai >= 75:
    predikat = "LULUS"
else:
    predikat = "TIDAK LULUS"
print("Predikat:", predikat)
`},inputs:[`80`],tests:[[`80`],[`75`],[`74.9`]]},{key:`grades`,name:{en:`Grade letters A–D (if/elif/else)`,id:`Predikat A–D (if/elif/else)`},code:{en:p`score = int(input("Enter the score: "))
if score >= 90:
    print("Grade: A (Excellent)")
elif score >= 80:
    print("Grade: B (Good)")
elif score >= 70:
    print("Grade: C (Fair)")
else:
    print("Grade: D (Needs remedial)")
`,id:p`nilai = int(input("Masukkan nilai: "))
if nilai >= 90:
    print("Predikat: A (Sangat Baik)")
elif nilai >= 80:
    print("Predikat: B (Baik)")
elif nilai >= 70:
    print("Predikat: C (Cukup)")
else:
    print("Predikat: D (Perlu Remedial)")
`},inputs:[`85`],tests:[[`85`],[`90`],[`70`],[`69`]]},{key:`uniform`,name:{en:`Uniform of the day (match-case)`,id:`Seragam hari ini (match-case)`},code:{en:p`day = input("What day is it today? ")
match day:
    case "Monday" | "Tuesday":
        print("Wear the grey-and-white uniform.")
    case "Wednesday" | "Thursday":
        print("Wear the school batik uniform.")
    case "Friday":
        print("Wear the Scout uniform.")
    case _:
        print("Day off: wear your own neat clothes!")
`,id:p`hari = input("Hari ini hari apa? ")
match hari:
    case "Senin" | "Selasa":
        print("Gunakan seragam Putih Abu-abu.")
    case "Rabu" | "Kamis":
        print("Gunakan seragam Batik Sekolah.")
    case "Jumat":
        print("Gunakan seragam Pramuka.")
    case _:
        print("Hari libur, berpakaian bebas rapi!")
`},inputs:{en:[`Wednesday`],id:[`Rabu`]},tests:{en:[[`Wednesday`],[`Friday`],[`Sunday`],[`wednesday`]],id:[[`Rabu`],[`Jumat`],[`Minggu`],[`rabu`]]}},{key:`menu`,name:{en:`Menu code (match-case)`,id:`Kode menu (match-case)`},code:{en:p`menu_code = int(input("Enter a menu code (1-3): "))
match menu_code:
    case 1:
        print("You ordered Nasi Goreng.")
    case 2:
        print("You ordered Mie Ayam.")
    case 3:
        print("You ordered Es Teh Manis.")
    case _:
        print("Unknown menu code.")
`,id:p`kode_menu = int(input("Masukkan kode menu (1-3): "))
match kode_menu:
    case 1:
        print("Kamu memesan Nasi Goreng.")
    case 2:
        print("Kamu memesan Mie Ayam.")
    case 3:
        print("Kamu memesan Es Teh Manis.")
    case _:
        print("Kode menu tidak dikenal.")
`},inputs:[`2`],tests:[[`2`],[`3`],[`7`]]},{key:`sum-range`,name:{en:`Sum 1 to n (for + range)`,id:`Jumlah 1 sampai n (for + range)`},code:{en:p`n = int(input("Add up 1 to: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("Sum of 1 to", n, "=", total)
`,id:p`n = int(input("Jumlahkan 1 sampai: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("Jumlah 1 sampai", n, "=", total)
`},inputs:[`5`],tests:[[`5`],[`1`],[`0`]]},{key:`countdown`,name:{en:`Countdown (while)`,id:`Hitung mundur (while)`},code:{en:p`count = 3
print("On your marks... Get set...")
while count > 0:
    print(count)
    count = count - 1
print("GO! Run!")
`,id:p`hitung = 3
print("Bersedia... Siap...")
while hitung > 0:
    print(hitung)
    hitung = hitung - 1
print("YAA! Lari!")
`}},{key:`savings`,name:{en:`Savings goal (while + input)`,id:`Target tabungan (while + input)`},code:{en:p`savings_goal = 100000
savings = 0
weeks = 0
while savings < savings_goal:
    deposit = int(input("This week's deposit: Rp "))
    savings = savings + deposit
    weeks = weeks + 1
    print("Savings so far: Rp", savings)
print(f"Goal reached in {weeks} weeks. Total: Rp {savings}")
`,id:p`target_tabungan = 100000
tabungan = 0
minggu = 0
while tabungan < target_tabungan:
    setoran = int(input("Setoran minggu ini: Rp "))
    tabungan = tabungan + setoran
    minggu = minggu + 1
    print("Tabungan saat ini: Rp", tabungan)
print(f"Target tercapai dalam {minggu} minggu. Total: Rp {tabungan}")
`},inputs:[`40000`,`35000`,`30000`],tests:[[`40000`,`35000`,`30000`],[`100000`],[`50000`,`49999`,`1`]]},{key:`pocket-money`,name:{en:`Pocket money report (accumulators)`,id:`Rekap uang saku (akumulator)`},code:{en:p`# --- Stage 1: how many records ---
students = int(input("Number of students: "))

# --- Stage 2: set up the accumulators ---
total_money = 0
thrifty_count = 0

# --- Stage 3: read each value, decide, accumulate ---
for i in range(students):
    pocket_money = int(input(f"Pocket money of student {i + 1}: Rp "))
    if pocket_money <= 15000:
        print("  Category: Thrifty")
        thrifty_count = thrifty_count + 1
    else:
        print("  Category: Big spender")
    total_money = total_money + pocket_money

# --- Stage 4: final report ---
average = total_money / students
print("=============================")
print("Thrifty students:", thrifty_count, "of", students)
print(f"Average pocket money: Rp {average:.2f}")
`,id:p`# --- Tahap 1: masukan jumlah data ---
jumlah_siswa = int(input("Jumlah siswa yang didata: "))

# --- Tahap 2: siapkan akumulator ---
total_uang_saku = 0
jumlah_hemat = 0

# --- Tahap 3: baca data satu per satu, putuskan, tabung ---
for i in range(jumlah_siswa):
    uang_saku = int(input(f"Uang saku siswa ke-{i + 1}: Rp "))
    if uang_saku <= 15000:
        print("  Kategori: Hemat")
        jumlah_hemat = jumlah_hemat + 1
    else:
        print("  Kategori: Boros")
    total_uang_saku = total_uang_saku + uang_saku

# --- Tahap 4: laporan akhir ---
rata_rata = total_uang_saku / jumlah_siswa
print("=============================")
print("Banyak siswa hemat :", jumlah_hemat, "dari", jumlah_siswa, "siswa")
print(f"Rata-rata uang saku: Rp {rata_rata:.2f}")
`},inputs:[`4`,`10000`,`20000`,`15000`,`25000`],tests:[[`4`,`10000`,`20000`,`15000`,`25000`],[`2`,`15000`,`15001`],[`0`]]},{key:`list-loop`,name:{en:`Loop over a list of scores`,id:`Perulangan pada list nilai`},code:{en:p`class_scores = [80, 75, 90, 65, 85]
passed = 0
for score in class_scores:
    if score >= 75:
        print(score, "-> Passed")
        passed = passed + 1
    else:
        print(score, "-> Not yet passed")
print("Passed:", passed, "of", len(class_scores), "students")
`,id:p`nilai_kelas = [80, 75, 90, 65, 85]
jumlah_tuntas = 0
for nilai in nilai_kelas:
    if nilai >= 75:
        print(nilai, "-> Tuntas")
        jumlah_tuntas = jumlah_tuntas + 1
    else:
        print(nilai, "-> Belum Tuntas")
print("Tuntas:", jumlah_tuntas, "dari", len(nilai_kelas), "siswa")
`}},{key:`stack`,name:{en:`Stack: the Back button (list)`,id:`Stack: tombol Kembali (list)`},code:{en:p`history = []  # an empty stack
# The user opens pages one by one (push)
history.append("Home")
history.append("Timetable")
history.append("Report Card")
print("History now :", history)
print("Top page    :", history[-1])
# "Back" is pressed twice (pop)
page = history.pop()
print("Back from   :", page, "| left:", history)
page = history.pop()
print("Back from   :", page, "| left:", history)
# Safety check: never pop an empty stack
if len(history) == 0:
    print("History is empty, cannot go back.")
`,id:p`riwayat = []  # stack kosong
# Pengguna membuka halaman satu per satu (push)
riwayat.append("Beranda")
riwayat.append("Jadwal Pelajaran")
riwayat.append("Nilai Rapor")
print("Riwayat saat ini :", riwayat)
print("Halaman paling atas:", riwayat[-1])
# Tombol "Kembali" ditekan dua kali (pop)
halaman = riwayat.pop()
print("Kembali dari :", halaman, "| sisa:", riwayat)
halaman = riwayat.pop()
print("Kembali dari :", halaman, "| sisa:", riwayat)
# Pengaman: jangan pop jika stack kosong
if len(riwayat) == 0:
    print("Riwayat kosong, tidak bisa kembali lagi.")
`}},{key:`queue`,name:{en:`Queue: the photocopier line (deque)`,id:`Queue: antrean fotokopi (deque)`},code:{en:p`from collections import deque

queue = deque()  # an empty queue
queue.append("Mrs Sari's worksheet")  # join at the back
queue.append("Mr Budi's test")
queue.append("Principal's letter")
print("Queue now:", list(queue))
# Serve the one at the front, one at a time
while len(queue) > 0:
    document = queue.popleft()  # leave from the front
    print("Copying:", document, "| still waiting:", len(queue))
print("All documents done.")
`,id:p`from collections import deque

antrean = deque()  # antrean kosong
antrean.append("Tugas Bu Sari")  # masuk antrean (belakang)
antrean.append("Soal Pak Budi")
antrean.append("Surat Kepala Sekolah")
print("Antrean saat ini:", list(antrean))
# Petugas melayani yang terdepan satu per satu
while len(antrean) > 0:
    dokumen = antrean.popleft()  # keluar dari depan
    print("Sedang difotokopi:", dokumen, "| sisa antrean:", len(antrean))
print("Semua dokumen selesai.")
`}},{key:`guess-function`,name:{en:`Guess the output: functions`,id:`Tebak output: fungsi`},code:{en:p`def change(x):
    x = x * 2
    return x + 1

a = 5
b = change(a)
print(a, b)
print(change(change(1)))
`,id:p`def ubah(x):
    x = x * 2
    return x + 1

a = 5
b = ubah(a)
print(a, b)
print(ubah(ubah(1)))
`}},{key:`duty-roster`,name:{en:`Class duty roster (functions + list)`,id:`Daftar piket kelas (fungsi + list)`},code:{en:p`def show_roster(roster):
    """Show every student on duty with their number."""
    if len(roster) == 0:
        print("  (the duty roster is empty)")
    for number, name in enumerate(roster, start=1):
        print(f"  {number}. {name}")

def add_student(roster, name):
    """Add a student at the end of the roster."""
    roster.append(name)
    print(f"-> {name} added at the end.")

def remove_student(roster, name):
    """Remove a student; safe if the name is missing."""
    if name in roster:
        roster.remove(name)
        print(f"-> {name} removed.")
    else:
        print(f"-> {name} not found, nothing removed.")

def insert_student(roster, position, name):
    """Insert a student at a position (counting from 1)."""
    roster.insert(position - 1, name)
    print(f"-> {name} inserted at position {position}.")

# ---------- Main program ----------
duty = ["Andi", "Budi", "Cici", "Dina"]
print("Starting roster:")
show_roster(duty)

add_student(duty, "Eko")
show_roster(duty)

remove_student(duty, "Budi")
show_roster(duty)

insert_student(duty, 2, "Fajar")
show_roster(duty)

remove_student(duty, "Zaki")  # test a name that is not there
`,id:p`def tampilkan_piket(daftar):
    """Menampilkan seluruh petugas piket beserta nomor urutnya."""
    if len(daftar) == 0:
        print("  (daftar piket kosong)")
    for nomor, nama in enumerate(daftar, start=1):
        print(f"  {nomor}. {nama}")

def tambah_petugas(daftar, nama):
    """Menambahkan petugas di akhir daftar."""
    daftar.append(nama)
    print(f"-> {nama} ditambahkan di akhir.")

def hapus_petugas(daftar, nama):
    """Menghapus petugas tertentu; aman jika nama tidak ada."""
    if nama in daftar:
        daftar.remove(nama)
        print(f"-> {nama} dihapus.")
    else:
        print(f"-> {nama} tidak ditemukan, tidak ada yang dihapus.")

def sisip_petugas(daftar, posisi, nama):
    """Menyisipkan petugas pada posisi tertentu (posisi dihitung mulai 1)."""
    daftar.insert(posisi - 1, nama)
    print(f"-> {nama} disisipkan di posisi {posisi}.")

# ---------- Program utama ----------
piket = ["Andi", "Budi", "Cici", "Dina"]
print("Kondisi awal:")
tampilkan_piket(piket)

tambah_petugas(piket, "Eko")
tampilkan_piket(piket)

hapus_petugas(piket, "Budi")
tampilkan_piket(piket)

sisip_petugas(piket, 2, "Fajar")
tampilkan_piket(piket)

hapus_petugas(piket, "Zaki")  # menguji kasus nama tidak ada
`}},{key:`door-prize`,name:{en:`Door prize draw (random + seed)`,id:`Undian doorprize (random + seed)`},code:{en:p`import random

random.seed(2026)  # same seed -> the same draw every time
participants = ["Andi", "Budi", "Cici", "Dina", "Eko", "Fajar"]
random.shuffle(participants)
print("Shuffled order :", participants)
winner = random.choice(participants)
print("Door prize goes to:", winner)
ticket_numbers = random.sample(range(1, 31), 3)
print("Three ticket numbers:", ticket_numbers)
`,id:p`import random

random.seed(2026)  # seed sama -> hasil undian selalu sama
peserta = ["Andi", "Budi", "Cici", "Dina", "Eko", "Fajar"]
random.shuffle(peserta)
print("Urutan acak :", peserta)
pemenang = random.choice(peserta)
print("Pemenang doorprize:", pemenang)
nomor_undian = random.sample(range(1, 31), 3)
print("Tiga nomor undian :", nomor_undian)
`}}],h=5e3,ee=300,te=[.5,1,2,4,8,16,50],ne=`pass-fail`,re=new Set([`len`,`abs`,`int`,`float`,`str`,`bool`,`min`,`max`,`sum`,`round`,`type`,`isinstance`,`ord`,`chr`,`any`,`all`,`sorted`,`list`,`tuple`,`set`,`range`]),g=new Set([`list`,`tuple`,`dict`,`deque`,`set`]),ie=new Set([`if`,`elif`,`while`,`for`,`match`,`case`,`except`]),ae=new Set([`=`,`+=`,`-=`,`*=`,`/=`,`//=`,`%=`,`**=`]);function oe(e,t){if(!e||e.type===`object`||e.type===`function`||e.reprTruncated||t>12||e.typeName===`defaultdict`&&!/^defaultdict\(<class '/.test(e.repr))return!1;for(let n of e.items||[])if(!oe(n,t+1))return!1;for(let[n,r]of e.entries||[])if(!oe(n,t+1)||!oe(r,t+1))return!1;return!0}var _=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),v=(e,t)=>e.length>t?e.slice(0,t-1)+`…`:e,y=e=>!!e&&g.has(e.type)&&!!e.id,se=(e,t)=>e.repr===t.repr&&e.id===t.id&&e.type===t.type,ce=(e,t)=>e?y(t)&&y(e)?e.id!==t.id:!se(e,t):!0,b={int:`t-int`,float:`t-float`,str:`t-str`,bool:`t-bool`,NoneType:`t-none`,list:`t-list`,deque:`t-deque`,tuple:`t-tuple`,dict:`t-dict`,set:`t-set`,function:`t-fn`},le=e=>b[e?.type]||`t-other`,ue=`
.pyt { container-type: inline-size; container-name: pyt; padding: 12px; min-width: 0; }
.pyt *, .pyt *::before, .pyt *::after, .pyt-ctl * { box-sizing: border-box; }
.pyt [hidden], .pyt-ctl [hidden] { display: none !important; }
.pyt-grid { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.pyt-left, .pyt-right { display: contents; }
.pyt-code { order: 1; min-width: 0; }
.pyt-bar { order: 2; }
.pyt-memw { order: 3; min-width: 0; }
.pyt-con { order: 4; min-width: 0; }
.pyt-pred { order: 5; }
.pyt-trace { order: 6; }
@container pyt (min-width: 700px) {
  .pyt-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: start; }
  .pyt-bar, .pyt-pred, .pyt-trace { grid-column: 1 / -1; }
  .pyt-left { display: flex; flex-direction: column; gap: 12px; grid-column: 1; min-width: 0; }
  .pyt-right { display: flex; flex-direction: column; gap: 12px; grid-column: 2; min-width: 0; }
  .pyt-bar, .pyt-code, .pyt-memw, .pyt-con, .pyt-pred, .pyt-trace { order: 0; }
}
.pyt-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.pyt-btns { display: flex; flex-wrap: wrap; gap: 6px; }
.pyt-btns .btn { padding: 7px 11px; min-height: 38px; white-space: nowrap; }
.pyt-btns .btn:disabled { opacity: .45; cursor: not-allowed; filter: none; }
.pyt-btns .btn--primary:hover { background: var(--accent, var(--color-accent)); }
.pyt-scrub { display: flex; align-items: center; gap: 8px; flex: 1 1 200px; min-width: 0; }
.pyt-scrub input { flex: 1 1 auto; min-width: 60px; accent-color: var(--accent, var(--color-accent)); }
.pyt-count { font: 600 13px/1.2 var(--font-mono, monospace); white-space: nowrap; color: var(--color-fg); }
.pyt-status { flex: 1 1 100%; margin: 0; font-size: 13px; line-height: 1.45; color: var(--color-muted); min-height: 1.45em; }
.pyt-status b { color: var(--color-fg); }
.pyt-status.is-err b { color: var(--color-danger); }
.pyt-status.is-ok b { color: var(--color-ok); }
.pyt-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
.pyt-legend { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 6px; font-size: 12px; line-height: 1.5; color: var(--color-muted); }
.pyt-sw { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 17px; margin-right: 4px; border-radius: 4px; background: #0b1220; font: 700 11px/1 var(--font-sans); vertical-align: -3px; }
.pyt-sw.s-next { color: #fbbf24; box-shadow: inset 0 0 0 1px rgba(251,191,36,.6); }
.pyt-sw.s-done { color: #34d399; box-shadow: inset 0 0 0 1px rgba(52,211,153,.6); }
.pyt-sw.s-seen { color: #94a3b8; box-shadow: inset 0 0 0 1px rgba(148,163,184,.5); }
.pyt-sw.s-err { color: #f87171; box-shadow: inset 0 0 0 1px rgba(248,113,113,.6); }

.pyt-mem { --mono: var(--font-mono, ui-monospace, Menlo, Consolas, monospace); --sans: var(--font-sans, system-ui, sans-serif);
  background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden;
  container-type: inline-size; container-name: pytmem; font: 13px/1.35 var(--mono); color-scheme: dark; }
.pyt-mem-h, .pyt-trace-h { display: flex; flex-wrap: wrap; align-items: center; gap: 3px 10px; min-height: 30px; padding: 4px 10px;
  background: #0f182c; border-bottom: 1px solid #1e2a44; font: 600 12px/1.3 var(--font-sans, sans-serif); color: #b6c2d6; }
.pyt-title { flex: 1 1 auto; letter-spacing: .02em; }
.pyt-mem-h small, .pyt-trace-h small { font-weight: 400; color: #8a99b3; }
.pyt-lgd { display: flex; flex-wrap: wrap; gap: 1px 9px; font-weight: 500; font-size: 11px; }
.pyt-lgd span { color: var(--tc); white-space: nowrap; }
.pyt-lgd span::before { content: ""; display: inline-block; width: 8px; height: 8px; margin-right: 4px; border-radius: 2px; background: var(--tc); }
.pyt-mem-body { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 10px 10px 12px; min-height: 120px; }
.pyt-mem-body.has-heap { padding-right: 34px; }
@container pytmem (min-width: 470px) { .pyt-mem-body { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); column-gap: 34px; padding-right: 10px; } }
.pyt-frames { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.pyt-heap { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; min-width: 0; }
.pyt-heap:empty { display: none; }
.pyt-frame { border: 1px solid #2b3a5a; border-radius: 8px; background: #0f182c; padding: 6px 8px 8px; min-width: 0; }
.pyt-frame.is-cur { border-color: #fbbf24; box-shadow: 0 0 0 1px rgba(251, 191, 36, .3); }
.pyt-frame-h { display: flex; flex-wrap: wrap; gap: 2px 8px; align-items: baseline; margin-bottom: 6px; font: 600 12px/1.3 var(--sans); color: #b6c2d6; }
.pyt-frame.is-cur .pyt-frame-h { color: #fde68a; }
.pyt-frame-h small { font-weight: 400; color: #8a99b3; }
.pyt-vars { display: grid; grid-template-columns: minmax(0, max-content) minmax(0, 1fr); gap: 5px 8px; align-items: center; }
.pyt-vn { text-align: right; overflow-wrap: anywhere; color: #e2e8f0; }
.pyt-vv { display: flex; align-items: center; gap: 6px; min-width: 0; }
.pyt-box { display: inline-block; max-width: 100%; min-width: 0; padding: 1px 7px; border: 1.5px solid var(--tc); border-radius: 5px;
  background: color-mix(in srgb, var(--tc) 13%, #0b1220); color: var(--tc); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.pyt-ref { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 30px; height: 22px; padding: 0; }
.pyt-ty { flex: none; font: 11px/1 var(--sans); color: var(--tc); white-space: nowrap; }
.pyt-dot { display: inline-block; flex: none; width: 9px; height: 9px; border-radius: 50%; background: #e2e8f0; }
.pyt-empty { color: #8a99b3; font: 12px/1.4 var(--sans); }
.pyt-ret { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 4px 8px; border: 1px dashed #3b4b6e; border-radius: 8px; font: 12px/1.4 var(--sans); color: #b6c2d6; }
.pyt-ret .pyt-box { font: 13px/1.35 var(--mono); }
.pyt-obj { max-width: 100%; min-width: 0; }
.pyt-obj-h { display: flex; flex-wrap: wrap; gap: 1px 8px; align-items: baseline; margin-bottom: 3px; font: 600 11px/1.3 var(--sans); color: var(--tc); }
.pyt-refs { color: #94a3b8; font-weight: 400; overflow-wrap: anywhere; }
.pyt-cells { display: flex; flex-wrap: wrap; padding: 0 0 1.5px 1.5px; }
.pyt-cell { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-width: 34px; max-width: 100%;
  margin: 0 0 -1.5px -1.5px; padding: 3px 6px 1px; border: 1.5px solid var(--tc); background: color-mix(in srgb, var(--tc) 8%, #0b1220); }
.t-tuple > .pyt-cells > .pyt-cell, .t-set > .pyt-cells > .pyt-cell { border-style: dashed; }
.pyt-cv { max-width: 100%; color: var(--tc); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.pyt-ci { font: 10px/1.35 var(--sans); color: #8a99b3; }
.pyt-more { justify-content: center; color: #8a99b3; font: 11px var(--sans); }
.pyt-kvs { display: grid; grid-template-columns: minmax(0, max-content) minmax(0, 1fr); border: 1.5px solid var(--tc); background: color-mix(in srgb, var(--tc) 8%, #0b1220); }
.pyt-k, .pyt-v { display: flex; align-items: center; min-width: 0; padding: 2px 7px; border-top: 1px solid color-mix(in srgb, var(--tc) 35%, #0b1220); }
.pyt-k:first-child, .pyt-k:first-child + .pyt-v { border-top: 0; }
.pyt-k { border-right: 1.5px solid var(--tc); }
.pyt-emptyobj { padding: 1px 8px; border: 1.5px dashed var(--tc); color: #8a99b3; font: 12px/1.5 var(--sans); }
.pyt .is-chg { outline: 2px solid #fde047; outline-offset: 1px; position: relative; z-index: 1; }
@media (prefers-reduced-motion: no-preference) {
  .pyt .is-chg { animation: pyt-pop .7s ease-out; }
  @keyframes pyt-pop { from { outline-color: rgba(253, 224, 71, 0); outline-offset: 6px; } }
}
.pyt-arrows { position: absolute; left: 0; top: 0; pointer-events: none; overflow: visible; }
.pyt-arrows path { fill: none; stroke: #cbd5e1; stroke-width: 1.6; }
.pyt .t-int { --tc: #60a5fa; } .pyt .t-float { --tc: #2dd4bf; } .pyt .t-str { --tc: #c3e88d; } .pyt .t-bool { --tc: #f472b6; }
.pyt .t-none { --tc: #94a3b8; } .pyt .t-list { --tc: #fb923c; } .pyt .t-deque { --tc: #fdba74; } .pyt .t-tuple { --tc: #c4b5fd; }
.pyt .t-dict { --tc: #fcd34d; } .pyt .t-set { --tc: #f0abfc; } .pyt .t-fn { --tc: #ffcb6b; } .pyt .t-other { --tc: #a5b4fc; }

.pyt-pred { display: grid; gap: 8px; padding: 10px; border: 1px solid var(--color-border); border-radius: 10px;
  background: color-mix(in srgb, var(--color-fg) 3%, var(--color-surface)); container-type: inline-size; container-name: pytpred; }
.pyt-pred-h { margin: 0; font-size: 14px; font-weight: 700; color: var(--color-fg); }
.pyt-pred-cols { display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr); align-items: start; }
@container pytpred (min-width: 560px) { .pyt-pred-cols { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); } }
.pyt-pred-ta { display: block; width: 100%; min-height: 120px; resize: vertical; padding: 8px 10px; border: 1px solid #1e2a44; border-radius: 8px;
  background: #0b1220; color: #e2e8f0; caret-color: #fff; font: 13px/1.5 var(--font-mono, monospace); color-scheme: dark; }
.pyt-pred-ta:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.pyt-pred-ta[readonly] { color: #b6c2d6; background: #0f182c; }
.pyt-pred-note { margin: 4px 0 0; font-size: 12px; line-height: 1.45; color: var(--color-muted); }
.pyt-verdict { margin: 0 0 8px; padding: 6px 10px; border-radius: 8px; font-size: 14px; font-weight: 700; color: var(--color-fg); line-height: 1.4; }
.pyt-verdict.ok { background: color-mix(in srgb, var(--color-ok) 16%, transparent); border: 1px solid var(--color-ok); }
.pyt-verdict.bad { background: color-mix(in srgb, var(--color-danger) 13%, transparent); border: 1px solid var(--color-danger); }
.pyt-verdict.wait { font-weight: 500; font-size: 13px; color: var(--color-muted); border: 1px dashed var(--color-border); }
.pyt-cmpw { max-height: 320px; overflow: auto; border-radius: 8px; border: 1px solid #1e2a44; }
.pyt-cmp { width: 100%; border-collapse: collapse; background: #0b1220; color: #e2e8f0; font: 12.5px/1.45 var(--font-mono, monospace); }
.pyt-cmp th { position: sticky; top: 0; padding: 4px 8px; background: #0f182c; color: #b6c2d6; font: 600 11px/1.3 var(--font-sans, sans-serif); text-align: left; }
.pyt-cmp td { padding: 2px 8px; vertical-align: top; white-space: pre-wrap; overflow-wrap: anywhere; border-top: 1px solid #172036; }
.pyt-cmp td.n { width: 1%; color: #7d8ba6; text-align: right; }
.pyt-cmp tr.diff td.p, .pyt-cmp tr.diff td.a { color: #fecaca; }
.pyt-cmp tr.first td { background: rgba(248, 113, 113, .16); }
.pyt-cmp mark { background: rgba(248, 113, 113, .5); color: #fff; border-radius: 2px; }
.pyt-cmp .none { color: #7d8ba6; font-family: var(--font-sans, sans-serif); font-size: 11.5px; }

.pyt-trace { background: #0b1220; color: #e2e8f0; border: 1px solid #1e2a44; border-radius: 10px; overflow: hidden;
  container-type: inline-size; container-name: pyttr; color-scheme: dark; }
.pyt-tscroll { max-height: 300px; overflow: auto; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
.pyt-tt { width: 100%; border-collapse: collapse; font: 12.5px/1.4 var(--font-sans, sans-serif); }
.pyt-tt th { position: sticky; top: 0; z-index: 2; padding: 5px 8px; background: #0f182c; color: #b6c2d6; font-weight: 600; text-align: left;
  white-space: nowrap; border-bottom: 1px solid #1e2a44; }
.pyt-tt td { padding: 4px 8px; vertical-align: top; border-top: 1px solid #172036; }
.pyt-tt .c-step, .pyt-tt .c-line { width: 1%; white-space: nowrap; }
.pyt-tt td.c-line { text-align: right; font-family: var(--font-mono, monospace); color: #8a99b3; }
.pyt-tt td.c-code { max-width: 0; width: 30%; font: 12.5px/1.4 var(--font-mono, monospace); white-space: pre; overflow: hidden; text-overflow: ellipsis; }
.pyt-tt td.c-chg { width: 38%; }
.pyt-tt td.c-out { font-family: var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.pyt-tt tr.is-cur td { background: rgba(251, 191, 36, .13); }
.pyt-tt tr.is-err td { background: rgba(248, 113, 113, .14); }
.pyt-tt tr.pyt-tnote td { color: #8a99b3; text-align: center; }
.pyt-step { min-width: 34px; padding: 1px 6px; border: 1px solid #2b3a5a; border-radius: 5px; background: #131d33; color: #dbe4f3;
  font: 600 12px/1.4 var(--font-mono, monospace); cursor: pointer; }
.pyt-step:hover { background: #1c2945; }
.pyt-step:focus-visible { outline: 2px solid #60a5fa; outline-offset: 1px; }
.pyt-chg { display: inline-block; margin: 1px 10px 1px 0; font-family: var(--font-mono, monospace); white-space: pre-wrap; overflow-wrap: anywhere; }
.pyt-chg .tag { margin-left: 4px; padding: 0 4px; border: 1px solid #2b3a5a; border-radius: 3px; font: 10px/1.3 var(--font-sans, sans-serif); color: #8a99b3; white-space: nowrap; }
.pyt-chg.res { color: #fde68a; }
.pyt-chg.call { color: #ffcb6b; }
.pyt-chg.err { color: #ff8f8f; }
.pyt-tt .k-in { color: #86efac; }
.pyt-tt .k-err { color: #ff8f8f; }
/* narrow: each step is a small card (step | line | changes), the output goes underneath */
@container pyttr (max-width: 680px) {
  .pyt-tt, .pyt-tt thead, .pyt-tt tbody { display: block; }
  .pyt-tt thead { position: sticky; top: 0; z-index: 2; background: #0f182c; border-bottom: 1px solid #1e2a44; }
  .pyt-tt tr { display: grid; grid-template-columns: 56px 36px minmax(0, 1fr); column-gap: 6px; padding: 4px 8px; }
  .pyt-tt tbody tr { border-top: 1px solid #172036; }
  .pyt-tt th, .pyt-tt td, .pyt-tt td.c-chg, .pyt-tt td.c-code, .pyt-tt .c-step, .pyt-tt .c-line { display: block; width: auto; max-width: none; padding: 0; border: 0; position: static; background: none; }
  .pyt-tt td.c-line { text-align: left; }
  .pyt-tt th { white-space: normal; }
  .pyt-tt td.c-code, .pyt-tt th.c-code, .pyt-tt th.c-out { display: none; }
  .pyt-tt td.c-out { grid-column: 3; padding-top: 2px; }
  .pyt-tt td.c-out:empty, .pyt-tt td.c-chg:empty { display: none; }
  .pyt-tt td.c-out::before { content: "↳ "; color: #8a99b3; }
  .pyt-tt td[colspan] { grid-column: 1 / -1; }
  .pyt-tt tr.is-cur { background: rgba(251, 191, 36, .13); }
  .pyt-tt tr.is-err { background: rgba(248, 113, 113, .14); }
  .pyt-tt tr.is-cur td, .pyt-tt tr.is-err td { background: none; }
}

/* the controls pane is as tall as the stage: keep its rows at the top instead of spreading them out */
.sim-controls.pyt-ctl { align-content: start; }
.pyt-ctl-in { display: grid; gap: 6px; }
.pyt-ctl-in label { font-size: var(--type-sm); color: var(--color-muted); }
.pyt-in-ta { display: block; width: 100%; min-height: 66px; resize: vertical; padding: 6px 8px; border: 1px solid var(--color-border);
  border-radius: var(--radius-1); background: var(--color-surface-2); color: var(--color-fg); font: 14px/1.45 var(--font-mono, monospace); }
.pyt-hint { margin: 0; font-size: 12px; line-height: 1.45; color: var(--color-muted); }
.pyt-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--color-muted); }
.pyt-chips .btn { padding: 4px 9px; font: 600 12px/1.35 var(--font-mono, monospace); }
@supports (-webkit-touch-callout: none) { .pyt-in-ta, .pyt-pred-ta { font-size: 16px; } }
`;function de(p){let g=e()===`id`?`id`:`en`,b=(e,t)=>g===`id`?t:e,de=e=>e&&!Array.isArray(e)&&typeof e==`object`?e[g]:e,fe=e=>g===`id`?String(e).replace(`.`,`,`):String(e),pe=typeof window<`u`&&window.matchMedia(`(max-width: 600px)`).matches,me=document.createElement(`style`);me.textContent=ue,p.appendChild(me);let he=document.createElement(`div`);he.className=`pyt`;let ge=document.createElement(`div`);ge.className=`pyt-grid`,he.appendChild(ge),p.appendChild(he);let _e=document.createElement(`div`);_e.className=`sim-controls pyt-ctl`,p.appendChild(_e);let ve=document.createElement(`div`);ve.className=`pyt-bar`,ve.setAttribute(`role`,`group`),ve.setAttribute(`aria-label`,b(`Run controls`,`Kontrol jalannya program`));let ye=document.createElement(`div`);ye.className=`pyt-btns`;let be=i({label:b(`◀ Step back`,`◀ Mundur`),onClick:()=>Wt()}),xe=i({label:b(`Step ▶`,`Langkah ▶`),primary:!0,onClick:()=>Ut(!0)}),Se=i({label:b(`▶ Run`,`▶ Jalankan`),onClick:()=>qt()}),Ce=i({label:b(`⏭ To end`,`⏭ Ke akhir`),onClick:()=>Gt()}),we=i({label:b(`⟲ Reset`,`⟲ Mulai ulang`),onClick:()=>{X(),$(b(`Program reset to the first line.`,`Program kembali ke baris pertama.`))}});be.el.setAttribute(`aria-label`,b(`Step back`,`Mundur satu langkah`)),xe.el.setAttribute(`aria-label`,b(`Step: run the next line`,`Langkah: jalankan baris berikutnya`)),Ce.el.setAttribute(`aria-label`,b(`To end: run the rest of the program`,`Ke akhir: jalankan sisa program`)),we.el.setAttribute(`aria-label`,b(`Reset`,`Mulai ulang`)),ye.append(be.el,xe.el,Se.el,Ce.el,we.el);let Te=document.createElement(`div`);Te.className=`pyt-scrub`;let x=document.createElement(`input`);x.type=`range`,x.min=`0`,x.max=`0`,x.step=`1`,x.value=`0`,x.setAttribute(`aria-label`,b(`Step slider: move through the steps already run`,`Penggeser langkah: telusuri langkah yang sudah berjalan`));let Ee=document.createElement(`span`);Ee.className=`pyt-count`,Te.append(x,Ee);let De=document.createElement(`p`);De.className=`pyt-status`;let Oe=document.createElement(`div`);Oe.className=`pyt-sr`,Oe.setAttribute(`aria-live`,`polite`),ve.append(ye,Te,De,Oe);let ke=document.createElement(`div`);ke.className=`pyt-left`;let Ae=document.createElement(`div`);Ae.className=`pyt-right`;let je=document.createElement(`div`);je.className=`pyt-code`;let S=f({value:``,language:`python`,editable:!0,minLines:8,maxLines:pe?14:20,title:`main.py`,locale:g,ariaLabel:b(`Python program (editable)`,`Program Python (dapat diedit)`),onChange:()=>$t()}),C=document.createElement(`button`);C.type=`button`,C.textContent=b(`↺ Original code`,`↺ Kode awal`),C.title=b(`Put back the preset program`,`Kembalikan program contoh`),C.disabled=!0,C.addEventListener(`click`,()=>rn(N.key)),S.actions.appendChild(C);let Me=document.createElement(`div`);Me.className=`pyt-legend`,Me.innerHTML=`<span><span class="pyt-sw s-next" aria-hidden="true">▶</span>${_(b(`amber: runs next`,`kuning: dijalankan berikutnya`))}</span><span><span class="pyt-sw s-done" aria-hidden="true">✓</span>${_(b(`green: just ran`,`hijau: baru dijalankan`))}</span><span><span class="pyt-sw s-seen" aria-hidden="true">•</span>${_(b(`grey dot: has run`,`titik abu-abu: sudah pernah dijalankan`))}</span><span><span class="pyt-sw s-err" aria-hidden="true">●</span>${_(b(`red: error`,`merah: galat`))}</span>`,je.append(S.el,Me);let Ne=document.createElement(`div`);Ne.className=`pyt-con`;let w=c({minLines:4,maxLines:10,title:b(`Output (console)`,`Keluaran (konsol)`),locale:g,ariaLabel:b(`Program output`,`Keluaran program`),placeholder:b(`Output appears here while the program runs.`,`Keluaran muncul di sini saat program berjalan.`)});Ne.appendChild(w.el);let Pe=document.createElement(`div`);Pe.className=`pyt-memw`;let Fe=document.createElement(`section`);Fe.className=`pyt-mem`,Fe.setAttribute(`aria-label`,b(`Variables in memory`,`Variabel di memori`)),Fe.innerHTML=`<div class="pyt-mem-h"><span class="pyt-title">${_(b(`Memory: frames and objects`,`Memori: bingkai dan objek`))}</span><span class="pyt-lgd" aria-hidden="true">${[[`t-int`,`int`],[`t-float`,`float`],[`t-str`,`str`],[`t-bool`,`bool`],[`t-none`,`None`],[`t-list`,`list`]].map(([e,t])=>`<span class="${e}">${t}</span>`).join(``)}</span></div>`;let T=document.createElement(`div`);T.className=`pyt-mem-body`,Fe.appendChild(T),Pe.appendChild(Fe);let E=document.createElement(`section`);E.className=`pyt-pred`,E.hidden=!0,E.setAttribute(`aria-label`,b(`Predict the output`,`Tebak keluaran`));let Ie=document.createElement(`h2`);Ie.className=`pyt-pred-h`,Ie.textContent=b(`Predict mode: what will the program print?`,`Mode tebak: apa yang akan dicetak program?`);let Le=document.createElement(`div`);Le.className=`pyt-pred-cols`;let Re=document.createElement(`div`),ze=`pyt-pred-${Math.random().toString(36).slice(2,8)}`,Be=document.createElement(`label`);Be.htmlFor=ze,Be.className=`pyt-sr`,Be.textContent=b(`Your prediction of the output`,`Tebakan keluaran kamu`);let D=document.createElement(`textarea`);D.id=ze,D.className=`pyt-pred-ta`,D.rows=5,D.spellcheck=!1,D.setAttribute(`autocomplete`,`off`),D.setAttribute(`autocapitalize`,`off`),D.placeholder=b(`Type the output you expect, line by line.
Include input prompts as they appear on screen,
e.g. Enter the final score: 80`,`Ketik keluaran yang kamu tebak, baris demi baris.
Sertakan teks input seperti di layar,
misalnya Masukkan nilai akhir: 80`);let Ve=document.createElement(`p`);Ve.className=`pyt-pred-note`,Re.append(Be,D,Ve);let He=document.createElement(`div`);He.setAttribute(`aria-live`,`polite`),Le.append(Re,He),E.append(Ie,Le);let Ue=document.createElement(`section`);Ue.className=`pyt-trace`,Ue.setAttribute(`aria-label`,b(`Trace table`,`Tabel penelusuran`));let We=document.createElement(`div`);We.className=`pyt-trace-h`;let Ge=document.createElement(`span`);Ge.className=`pyt-title`,Ge.textContent=b(`Trace table`,`Tabel penelusuran`);let Ke=document.createElement(`small`);We.append(Ge,Ke);let O=document.createElement(`div`);O.className=`pyt-tscroll`,O.tabIndex=0,O.setAttribute(`role`,`region`),O.setAttribute(`aria-label`,b(`Trace table, one row per step`,`Tabel penelusuran, satu baris per langkah`));let k=document.createElement(`table`);k.className=`pyt-tt`,k.innerHTML=`<thead><tr><th class="c-step" scope="col">${_(b(`Step`,`Langkah`))}</th><th class="c-line" scope="col">${_(b(`Line`,`Baris`))}</th><th class="c-code" scope="col">${_(b(`Code`,`Kode`))}</th><th class="c-chg" scope="col">${_(b(`Variables changed / result`,`Perubahan variabel / hasil`))}</th><th class="c-out" scope="col">${_(b(`Output`,`Keluaran`))}</th></tr></thead>`;let A=document.createElement(`tbody`);k.appendChild(A),O.appendChild(k),Ue.append(We,O),ke.append(je,Ne),Ae.append(Pe),ge.append(ve,ke,Ae,E,Ue);let qe=r({label:b(`Program`,`Program`),key:`program`,value:ne,options:m.map((e,t)=>({value:e.key,label:`${t+1}. ${e.name[g]}`})),onChange:e=>rn(e)}),Je=qe.el.querySelector(`select`),Ye=null,Xe=document.createElement(`div`);Xe.className=`pyt-ctl-in`;let Ze=`pyt-in-${Math.random().toString(36).slice(2,8)}`,Qe=document.createElement(`label`);Qe.htmlFor=Ze,Qe.textContent=b(`Input values (one per line)`,`Nilai masukan (satu per baris)`);let j=document.createElement(`textarea`);j.id=Ze,j.className=`pyt-in-ta`,j.rows=3,j.spellcheck=!1,j.setAttribute(`autocomplete`,`off`),j.setAttribute(`autocapitalize`,`off`);let $e=document.createElement(`p`);$e.className=`pyt-hint`,$e.id=`${Ze}-hint`,$e.textContent=b(`Each input() call takes the next line. If the lines run out, the program waits and you type the value in the console.`,`Setiap input() mengambil baris berikutnya. Jika barisnya habis, program menunggu dan kamu mengetik nilainya di konsol.`),j.setAttribute(`aria-describedby`,$e.id);let M=document.createElement(`div`);M.className=`pyt-chips`,Xe.append(Qe,j,$e,M);let et=2,tt=n({label:b(`Run speed`,`Kecepatan jalan`),key:`speed`,min:0,max:te.length-1,step:1,value:et,format:e=>`${fe(te[e])} ${b(`steps/s`,`langkah/detik`)}`,onInput:e=>{et=e,U&&Jt()}}),nt=!1,rt=t({label:b(`Predict mode: write the output before running`,`Mode tebak: tulis keluaran sebelum menjalankan`),key:`predict`,value:!1,onChange:e=>{nt=e,E.hidden=!e,Cn()}}),it=a({title:`Tracing lab`,filename:`python-tracer-data.csv`,columns:[{key:`program`,label:`Program`},{key:`inputs`,label:`Inputs`},{key:`steps`,label:`Steps`},{key:`lines`,label:`Output lines`},{key:`ended`,label:`Ended with`},{key:`prediction`,label:`Prediction`}],procedure:[`Choose program 5 (pass or fail). Turn on Predict mode and type the output you expect for the input 80.`,`Press "To end" and read the verdict, then record the run.`,`Use the test-data buttons for 75 and 74.9 (the boundary case), predict, run and record each.`,`Choose program 9 (sum 1 to n) and record runs for n = 1, 5 and 10. How do the steps grow with n?`,`Choose program 16 (guess the output: functions), predict, run and record. Did the call change a?`],predict:`Before running: what does the pass-or-fail program print for 75 and for 74.9? How many steps will "sum 1 to n" need for n = 5?`,source:()=>wn()});_e.append(qe.el,Xe,tt.el,rt.el,it.el);let N=m.find(e=>e.key===ne),P=N.key,at=null,F=null,I=[],ot=new Map,st=new Map,ct=new Map,L=null,R=null,z=[],B=0,V=[],lt=0,ut=null,dt=[],H=[],ft=!1,U=!1,pt=!1,mt=!1,ht=!1,W=0,gt=0,_t=0,G=1,K=0,vt=``,q=null,yt=0,bt=!1,xt=``,St=new Set,J=()=>z[z.length-1],Y=e=>!!e&&(e.status===`done`||e.status===`error`),Ct=()=>{let e=j.value.replace(/\r\n?/g,`
`).split(`
`);return e.length&&e[e.length-1]===``&&e.pop(),e};function wt(e){I=e.replace(/\r\n?/g,`
`).split(`
`),ot=new Map;for(let e of I){let t=/^\s*def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/.exec(e);t&&ot.set(t[1],`(${t[2].replace(/\s+/g,` `).trim()})`)}st=new Map,ct=new Map}function Tt(e){if(ct.has(e))return ct.get(e);let t=null;try{let n=s(I[e-1]??``).filter(e=>![`indent`,`dedent`,`newline`,`comment`].includes(e.type));if(n.length&&(n[0].type===`name`||n[0].type===`builtin`||n[0].text===`(`)){let e=[[]],r=[],i=0,a=!1;for(let t of n){if(t.type===`op`&&`([{`.includes(t.text)?i++:t.type===`op`&&`)]}`.includes(t.text)&&i--,t.type===`op`&&i===0&&t.text===`;`){a=!0;break}t.type===`op`&&i===0&&ae.has(t.text)?(r.push(t.text),e.push([])):e[e.length-1].push(t)}if(!a&&r.length&&(r.length===1||r.every(e=>e===`=`))){let n=[];for(let t of e.slice(0,-1)){if(!(t.length&&t.every(e=>e.type===`name`||e.type===`builtin`||e.type===`op`&&`(),[]`.includes(e.text)))){n.length=0;break}for(let e of t)e.type!==`op`&&!n.includes(e.text)&&n.push(e.text)}n.length&&(r[0]===`=`||n.length===1)&&(t=n)}}}catch{t=null}return ct.set(e,t),t}function Et(e){if(st.has(e))return st.get(e);let t=null,n=I[e-1]??``;try{let r=s(n).filter(e=>e.type!==`indent`&&e.type!==`dedent`&&e.type!==`newline`&&e.type!==`comment`);if(r.length&&r[0].type===`keyword`&&ie.has(r[0].text)){let i=0,a=-1;for(let e=1;e<r.length;e++){let t=r[e];if(t.type===`op`){if(`([{`.includes(t.text))i++;else if(`)]}`.includes(t.text))i--;else if(t.text===`:`&&i===0){a=e;break}}}if(a>0){let i=r.slice(1,a),o=i.length?n.slice(i[0].col,r[a].col).trim():``,s=i.length>0;for(let e=0;e<i.length&&s;e++){let t=i[e];if(t.type===`keyword`&&(t.text===`lambda`||t.text===`await`||t.text===`yield`))s=!1;else if(t.type===`op`&&t.text===`:=`)s=!1;else if(t.type===`fstring`&&t.text.includes(`(`))s=!1;else if(t.type===`op`&&t.text===`(`&&e>0){let t=i[e-1];t.type===`name`||t.type===`builtin`?(!re.has(t.text)||e>1&&i[e-2].text===`.`)&&(s=!1):t.type===`op`&&(t.text===`)`||t.text===`]`)&&(s=!1)}}let c=e=>/^[ \t]*/.exec(e)[0].length,l=c(n),u=e;for(let t=e;t<I.length;t++){let e=I[t];if(e.trim()&&!/^\s*#/.test(e)){if(c(e)<=l)break;u=t+1}}let d=null;if(r[0].text===`for`){let e=i.findIndex(e=>e.type===`keyword`&&e.text===`in`);e>0&&(d=i.slice(0,e).filter(e=>e.type===`name`||e.type===`builtin`).map(e=>e.text))}t={kw:r[0].text,expr:o,safe:s,oneLiner:a<r.length-1,body:[e+1,u],names:i.filter(e=>e.type===`name`).map(e=>e.text),targets:d}}}}catch{t=null}return st.set(e,t),t}function Dt(e,t){if(!e.safe||!e.expr)return null;let n=new Map;for(let e of t[0].locals)n.set(e.name,e.value);if(t.length>1)for(let e of t[t.length-1].locals)n.set(e.name,e.value);let r={};for(let t of e.names){let e=n.get(t);if(e){if(!oe(e,0))return null;r[t]=e}}try{let t=o(e.expr,r,{maxSteps:h});if(!t.ok||!t.steps.length)return null;let n=t.steps,i=n[n.length-1],a=e.expr;return n.length>=3&&n[1].length<=36?a=n[1]:n.length>=3&&n[n.length-2].length<=36&&(a=n[n.length-2]),{shown:a,value:i}}catch{return null}}function Ot(e,t){let n=z[e-1].depth;for(let r=e;r<z.length&&r<e+4e3;r++){let e=z[r];if(e.status===`error`)return null;if(e.line==null||e.depth<n)return!1;if(!(e.depth>n))return e.line>=t.body[0]&&e.line<=t.body[1]}return null}let kt=(e,t)=>t===0?`g`:`f${e.id}`,At=e=>e?e.type===`function`?`function ${e.name||``}${ot.get(e.name)||``}`.trim():e.type===`module`?`module ${String(e.repr).replace(/^<module '([^']*)'.*$/,`$1`)}`:v(String(e.repr),44):``;function jt(e,t,n){let r=new Map;e.forEach((e,t)=>r.set(kt(e,t),new Map(e.locals.map(e=>[e.name,e.value]))));let i=[];return t.forEach((e,t)=>{let a=r.get(kt(e,t));if(a)for(let r of e.locals){let o=a.get(r.name);(!o||!se(o,r.value))&&i.push({name:r.name,value:r.value,frame:t===0?null:e.name,own:t===n})}}),i.sort((e,t)=>Number(t.own)-Number(e.own)),i}function Mt(e,t){let n=[],r=0;for(let i of V){let a=r,o=r+i.text.length;if(r=o,!(o<=e)){if(a>=t)break;Math.min(o,t)<=Math.max(a,e)||n.push({kind:i.kind,text:i.text.slice(Math.max(0,e-a),Math.min(i.text.length,t-a))})}}return n}function Nt(e){if(H[e])return H[e];let t=z[e],n=z[e-1],r=n.line,i={line:r,changes:jt(n.frames,t.frames,n.depth-1),out:Mt(n.outLen,t.outLen),calls:t.calls,rets:t.rets.filter(e=>!e.unwind),error:t.status===`error`?t.error:null,hdr:null,cond:null,outcome:null},a=!0,o=r?Et(r):null;o&&!o.oneLiner&&(i.hdr=o,!i.error&&(o.kw===`if`||o.kw===`elif`||o.kw===`while`||o.kw===`match`)&&(i.cond=Dt(o,n.frames)),o.kw!==`match`&&(i.outcome=Ot(e,o),i.outcome==null&&!i.error&&(a=!1)));let s=n.depth-1,c=null;r&&!i.error&&!t.calls.length&&(c=o?o.kw===`for`&&i.outcome===!0?o.targets:null:Tt(r));let l=n.frames[s],u=t.frames[s];if(c&&l&&u&&kt(l,s)===kt(u,s)){for(let e of c){if(i.changes.some(t=>t.own&&t.name===e))continue;let t=u.locals.find(t=>t.name===e);t&&i.changes.push({name:e,value:t.value,frame:s===0?null:u.name,own:!0})}i.changes.sort((e,t)=>Number(t.own)-Number(e.own))}return a&&(H[e]=i),i}function Pt(e){let t=[],{hdr:n,cond:r,outcome:i}=e;if(n){let e=i==null?null:i?`True`:`False`;if(n.kw===`if`||n.kw===`elif`||n.kw===`while`){let a=e??r?.value,o=v(r?r.shown:n.expr,40);a!=null&&t.push({text:o===a?a:`${o} → ${a}`,cls:`res`}),n.kw===`while`&&i===!1&&t.push({text:b(`loop ends`,`perulangan selesai`),cls:`res`})}else n.kw===`for`?i===!1&&t.push({text:b(`loop ends`,`perulangan selesai`),cls:`res`}):n.kw===`case`?i!=null&&t.push({text:i?b(`match ✓`,`cocok ✓`):b(`no match`,`tidak cocok`),cls:`res`}):n.kw===`match`?r&&t.push({text:`${v(n.expr,24)} → ${v(r.value,30)}`,cls:`res`}):n.kw===`except`&&i!=null&&t.push({text:i?b(`caught`,`tertangkap`):b(`not this one`,`bukan yang ini`),cls:`res`})}for(let n of e.calls){let e=n.args.map(e=>`${e.name}=${v(At(e.value),24)}`).join(`, `);t.push({text:`${b(`call`,`panggil`)} ${n.name}(${e})`,cls:`call`,isCall:!0})}for(let n of e.rets)t.push({text:`${n.name} ${b(`returns`,`mengembalikan`)} ${At(n.value)}`,cls:`call`});for(let n of e.changes)t.push({text:`${n.name} = ${At(n.value)}`,cls:``,tag:n.own?null:n.frame||b(`global`,`global`)});return e.error&&t.push({text:Lt(e.error)?Rt(e.error):`${e.error.type}: ${v(e.error.message,70)}`,cls:`err`}),t}function Ft(e,t){if(!t)return;let n=V[V.length-1];n&&n.kind===e?n.text+=t:V.push({kind:e,text:t}),lt+=t.length}let It=()=>V.map(e=>e.text).join(``),Lt=e=>!!e&&e.simulatorLimit===!0,Rt=e=>e.limitKind===`iterations`?b(`stopped: too many loop rounds in one step`,`dihentikan: terlalu banyak putaran dalam satu langkah`):b(`stopped: limit of ${e.limit??h} steps`,`dihentikan: batas ${e.limit??h} langkah`);function zt(e){if(!Lt(e))return String(e.traceback).replace(/\n*$/,`
`);let t=e.limitKind===`iterations`?b(`one step ran too many loop rounds`,`satu langkah menjalankan terlalu banyak putaran`):b(`the program reached the limit of ${e.limit??h} traced steps`,`program mencapai batas ${e.limit??h} langkah penelusuran`);return`⏹ ${b(`Stopped by the simulator`,`Dihentikan oleh simulasi`)}: ${t}.\n`+b(`It may be stuck in an endless loop, or it is too long to trace here. This is not a Python error: real Python has no step limit (an endless loop keeps running until you press Ctrl+C).
`,`Mungkin program terjebak dalam perulangan tak berujung, atau terlalu panjang untuk ditelusuri di sini. Ini bukan galat Python: Python sungguhan tidak punya batas langkah (perulangan tak berujung terus berjalan sampai kamu menekan Ctrl+C).
`)}function Bt(e,t,n){let r=L.snapshot(),i=J();z.push({line:e,status:r.status,error:t||r.error||null,frames:r.frames,depth:r.frames.length,outLen:lt,calls:n.calls,rets:n.rets,execLine:i?i.line:null})}function Vt(){if(!L||!z.length)return`none`;if(Y(J()))return`end`;if(L.status===`waiting-input`)return`wait`;let e=ut||(ut={calls:[],rets:[]});for(let t=0;t<2e5;t++){let t=L.step();if(t.kind===`output`)Ft(t.echo?`in`:t.stderr?`err`:`out`,t.text);else if(t.kind===`call`)e.calls.push({name:t.name,args:t.args||[]});else if(t.kind===`return`)e.rets.push({name:t.name,value:t.value,unwind:!!t.unwind});else if(t.kind===`input`){if(t.wait||L.status===`waiting-input`)return`wait`;`value`in t&&t.value!=null&&dt.push(String(t.value))}else if(t.kind===`line`){Bt(t.line,null,e);break}else if(t.kind===`exception`){let n=It();Lt(t.error)&&n&&!n.endsWith(`
`)&&Ft(`out`,`
`),Ft(`err`,zt(t.error)),Bt(null,t.error,e);break}else if(t.kind===`done`){Bt(null,null,e);break}else break}return ut=null,`step`}function X(){Z(),clearTimeout(gt),clearTimeout(_t),w.cancelPrompt(),q=null,z=[],B=0,V=[],lt=0,ut=null,dt=[],H=[],R=null,L=null,ft=!1,vt=``,gn();let e=S.value;wt(e);let t=l(e,{filename:`main.py`});if(!t.ok)R=t.error;else{L=d(t.program,{inputs:Ct(),echoInput:!0,maxSteps:h});let e=L.step();e.kind===`line`?Bt(e.line,null,{calls:[],rets:[]}):e.kind===`exception`?(Ft(`err`,zt(e.error)),Bt(null,e.error,{calls:[],rets:[]})):Bt(null,null,{calls:[],rets:[]})}Q()}function Ht(){return(ft||!L&&!R||!z.length&&!R)&&X(),!R&&z.length>0}function Ut(e){if(e&&U&&Z(),!Ht())return Q(),!1;if(B<z.length-1)B++;else{let t=Vt();if(t===`wait`)return Q(),Zt(e),!1;if(t!==`step`)return Q(),!1;B=z.length-1}return Q(),e&&Tn(),!0}function Wt(){Z(),B>0&&(B--,Q(),Tn())}function Gt(){Z(),Ht()?Y(J())?(B=z.length-1,Q()):(U=!0,ht=!0,Kt()):Q()}function Kt(){if(W=0,!U||!ht||bt)return;let e=performance.now(),t=`step`;for(;t===`step`&&!Y(J())&&performance.now()-e<30;)t=Vt();B=z.length-1,t===`wait`?(Z(),mt=!0,Q(),Zt(!0)):t!==`step`||Y(J())?(Z(),Q(),$(an().replace(/<[^>]+>/g,``))):(on(b(`Running… ${z.length-1} steps so far (press Pause to stop here).`,`Sedang berjalan… sudah ${z.length-1} langkah (tekan Jeda untuk berhenti di sini).`)),W=setTimeout(Kt,0))}function qt(){U?(Z(),B=z.length?Math.min(B,z.length-1):0,Q()):Ht()?B===z.length-1&&Y(J())||(U=!0,Q(),Jt(!0)):Q()}function Z(){U=!1,ht=!1,pt=!1,mt=!1,clearTimeout(W),W=0}function Jt(e){clearTimeout(W),W=setTimeout(Yt,e?60:Math.round(1e3/te[et]))}function Yt(){if(W=0,U&&!bt){if(B<z.length-1)B++,Q();else{let e=Vt();if(e===`wait`){U=!1,pt=!0,Q(),Zt(!0);return}if(e!==`step`){Z(),Q();return}B=z.length-1,Q()}B===z.length-1&&Y(J())?(Z(),Q(),$(an().replace(/<[^>]+>/g,``))):Jt()}}function Xt(){let e=B===z.length-1;if(!L||!e||L.status!==`waiting-input`){w.waiting&&w.cancelPrompt(),q=null;return}if(w.waiting&&q===L)return;let t=L;q=L,w.prompt({echo:!1,focus:!1,placeholder:b(`type + Enter`,`ketik + Enter`),ariaLabel:b(`The program is waiting for input: type a value and press Enter`,`Program menunggu masukan: ketik nilai lalu tekan Enter`)}).then(e=>{if(q===t&&(q=null),e==null||bt||L!==t||t.status!==`waiting-input`)return;let n=String(e).replace(/\r?\n[\s\S]*$/,``);dt.push(n),j.value=j.value&&!j.value.endsWith(`
`)?`${j.value}\n${n}`:`${j.value}${n}`,t.provideInput(n);let r=Vt();r===`step`&&(B=z.length-1),Q(),r===`wait`?Zt(!0):mt&&!Y(J())?Gt():(mt=!1,Tn(),pt&&!Y(J())&&(pt=!1,U=!0,Q(),Jt()))})}function Zt(e){requestAnimationFrame(()=>{let t=w.el.querySelector(`.cp-con-in`);if(t){if(e){let e=w.el.getBoundingClientRect();(e.bottom>window.innerHeight||e.top<0)&&w.el.scrollIntoView({block:`nearest`})}t.focus({preventScroll:!0})}}),$(b(`The program is waiting for input. Type a value in the console and press Enter.`,`Program menunggu masukan. Ketik nilai di konsol lalu tekan Enter.`))}function Qt(){Ye||(Ye=document.createElement(`option`),Ye.value=`custom`,Je.appendChild(Ye)),Ye.textContent=b(`✎ My code (from ${F.name.en})`,`✎ Kode saya (dari ${F.name.id})`)}function $t(){at=S.value,P!==`custom`&&(P=`custom`,F=N,Qt()),Je.value=`custom`,C.disabled=!1,tn(b(`Code changed. Press Step or Run to trace the new program.`,`Kode berubah. Tekan Langkah atau Jalankan untuk menelusuri program baru.`)),clearTimeout(gt),gt=setTimeout(()=>{ft&&l(S.value).ok&&X()},700)}function en(){clearTimeout(_t),_t=setTimeout(()=>{U||X()},350),tn(b(`Input values changed. The program will restart with them.`,`Nilai masukan berubah. Program akan dimulai ulang dengannya.`))}function tn(e){Z(),w.cancelPrompt(),q=null,ft=!0,L=null,z=[],B=0,V=[],lt=0,ut=null,dt=[],H=[],R=null,vt=``,gn(),Q(e)}function nn(){M.textContent=``;let e=de(N.tests)||[];if(!e.length){M.hidden=!0;return}M.hidden=!1;let t=document.createElement(`span`);t.textContent=b(`Test data:`,`Data uji:`),M.appendChild(t);for(let t of e){let e=document.createElement(`button`);e.type=`button`,e.className=`btn`,e.textContent=t.join(`, `),e.setAttribute(`aria-label`,`${b(`Use test data`,`Pakai data uji`)} ${t.join(`, `)}`),e.addEventListener(`click`,()=>{j.value=t.join(`
`),X(),$(`${b(`Inputs set to`,`Masukan diatur ke`)} ${t.join(`, `)}.`)}),M.appendChild(e)}}function rn(e){if(e===`custom`){at!=null&&F?(P=`custom`,N!==F&&(N=F,nn()),S.value=at,C.disabled=!1,X()):Je.value=P;return}let t=m.find(t=>t.key===e)||m[0];N=t,P=t.key,Je.value=t.key,S.value=t.code[g],j.value=(de(t.inputs)||[]).join(`
`),C.disabled=!0,D.value=``,nn(),X()}function an(){if(ft&&!z.length&&!R)return _(b(`Press Step or Run to trace the program.`,`Tekan Langkah atau Jalankan untuk menelusuri program.`));if(R)return`<b>${_(R.type)} ${_(b(`on line`,`di baris`))} ${R.line}:</b> ${_(R.message)} — `+_(b(`Python checks the whole program before running, so no line has run yet.`,`Python memeriksa seluruh program sebelum berjalan, jadi belum ada baris yang dijalankan.`));let e=z[B];if(!e)return``;let t=B===z.length-1;if(t&&L&&L.status===`waiting-input`)return`<b>${_(b(`Waiting for input:`,`Menunggu masukan:`))}</b> ${_(b(`the input box has no more values. Type one in the console and press Enter.`,`kotak masukan sudah habis. Ketik nilainya di konsol lalu tekan Enter.`))}`;if(e.status===`error`){let t=e.error||{};return Lt(t)?`<b>${_(b(`Stopped after ${B} steps`,`Dihentikan setelah ${B} langkah`))}</b> — ${_(b(`the simulator's step limit, not a Python error. Is there a loop whose condition never becomes False?`,`batas langkah simulasi, bukan galat Python. Adakah perulangan yang kondisinya tidak pernah menjadi False?`))}`:`<b>${_(b(`Stopped by an error`,`Berhenti karena galat`))} ${_(b(`on line`,`di baris`))} ${t.line}: ${_(t.type)}</b> — ${_(v(t.message||``,120))}`}if(e.status===`done`)return`<b>${_(b(`Finished`,`Selesai`))}</b> ${_(b(`after ${B} steps.`,`setelah ${B} langkah.`))}`+(B>0&&t?` ${_(b(`Use Step back or the slider to look at any step again.`,`Gunakan Mundur atau penggeser untuk melihat langkah mana pun lagi.`))}`:``);let n=`<b>${_(b(`Line`,`Baris`))} ${e.line}</b> ${_(b(`runs next`,`dijalankan berikutnya`))}`;if(B===0)return`${_(b(`Ready.`,`Siap.`))} ${n}. ${_(b(`Nothing has run yet.`,`Belum ada yang dijalankan.`))}`;let r=Pt(Nt(B));return`${n}.${r.length?` ${_(b(`Just ran line`,`Baris`))} ${z[B-1].line}${_(b(`:`,` baru saja dijalankan:`))} ${_(v(r.map(e=>e.text).join(`; `),90))}.`:``}`}function Q(e){bt||(sn(),mn(),cn(),bn(),on(e),Cn())}function on(e){let t=z.length?z.length-1:0,n=z[B],r=B===z.length-1&&Y(n);be.el.disabled=B===0||!z.length,xe.el.disabled=!ft&&!R&&(r||!z.length),Ce.el.disabled=xe.el.disabled,Se.el.disabled=xe.el.disabled&&!U,Se.el.textContent=U?b(`⏸ Pause`,`⏸ Jeda`):b(`▶ Run`,`▶ Jalankan`),Se.el.setAttribute(`aria-label`,U?b(`Pause`,`Jeda`):b(`Run step by step at the chosen speed`,`Jalankan langkah demi langkah dengan kecepatan terpilih`)),x.max=String(t),x.value=String(B),x.disabled=t===0,x.setAttribute(`aria-valuetext`,`${b(`Step`,`Langkah`)} ${B} ${b(`of`,`dari`)} ${t}`),Ee.textContent=`${b(`Step`,`Langkah`)} ${B} / ${t}`;let i=e?_(e):an();De.innerHTML=i,De.classList.toggle(`is-err`,!!R||!!n&&n.status===`error`),De.classList.toggle(`is-ok`,!!n&&n.status===`done`)}function sn(){if(R){let e=R,t={line:e.line,kind:`error`,note:e.type};Number.isFinite(e.col)&&e.col>0&&(t.col=e.col-1,Number.isFinite(e.endCol)&&(e.endLine==null||e.endLine===e.line)&&e.endCol>e.col&&(t.endCol=e.endCol-1)),S.setActiveLine(null),S.setMarks([t]);return}if(!z.length){S.setActiveLine(null),S.setMarks([]);return}let e=z[B],t=[],n=new Set;for(let e=1;e<=B;e++){let t=z[e].execLine;t&&n.add(t)}for(let e of n)t.push({line:e,kind:`visited`});if(B>0&&e.status!==`error`){let e=z[B-1].line,n=Pt(Nt(B)),r=n.filter(e=>!e.isCall||n.length===1).slice(0,2).map(e=>e.text).join(`; `);e&&t.push({line:e,kind:`done`,note:r?v(r,52):null})}e.status===`error`&&e.error&&e.error.line&&t.push({line:e.error.line,kind:`error`,note:Lt(e.error)?b(`step limit`,`batas langkah`):e.error.type}),S.setMarks(t),S.setActiveLine(e.line??null)}function cn(){let e,t;if(R)e=`c|${R.traceback}`,t=[{kind:`err`,text:`${R.traceback}\n`}];else{let n=z[B],r=B===z.length-1,i=n?r?lt:n.outLen:0;e=`r|${i}|${V.length}`,t=i?Mt(0,i):[]}e!==vt&&(vt=e,q=null,w.set(t)),Xt()}function ln(e,t){let n=e=>{if(y(e)&&!t.has(e.id)){t.set(e.id,e);for(let t of e.items||[])n(t);for(let[t,r]of e.entries||[])n(t),n(r)}};for(let t of e)for(let e of t.locals)n(e.value);return t}function un(e,t){let n=String(e.repr);return`<span class="pyt-box ${le(e)}${t?` is-chg`:``}" title="${_(v(n,400))}">${_(v(n,48))}</span><span class="pyt-ty ${le(e)}">${_(e.type===`function`?`function`:e.typeName||e.type)}</span>`}function dn(e,t,n){if(y(e)){let r=n.length>1?` ${b(`(shared with`,`(dipakai bersama`)} ${n.length-1} ${b(`other name`,`nama lain`)}${g===`en`&&n.length>2?`s`:``})`:``;return`<span class="pyt-box pyt-ref ${le(e)}${t?` is-chg`:``}" title="${_(e.typeName||e.type)}"><span class="pyt-dot" data-to="${e.id}"></span></span><span class="pyt-sr">${_(e.typeName||e.type)}, ${_(b(`arrow to`,`panah ke`))} ${_(v(String(e.repr),200))}${_(r)}</span>`}if(e.type===`function`){let n=ot.get(e.name)||`(…)`;return`<span class="pyt-box t-fn${t?` is-chg`:``}" title="def ${_(e.name||``)}${_(n)}">${_(v(n,34))}</span><span class="pyt-ty t-fn">function</span>`}return un(e,t)}function fn(e,t){if(y(e))return`<span class="pyt-dot${t?` is-chg`:``}" data-to="${e.id}" title="${_(v(String(e.repr),200))}"></span>`;let n=String(e.repr);return`<span class="pyt-cv ${le(e)}${t?` is-chg`:``}" title="${_(v(n,300))}">${_(v(n,26))}</span>`}function pn(e,t,n){let r=!!z[B-1]&&!t,i=`<div class="pyt-obj ${le(e)}${r?` is-chg`:``}" data-id="${e.id}">`,a=n.get(e.id)||[];if(i+=`<div class="pyt-obj-h"><span>${_(e.typeName||e.type)}</span>${a.length?`<span class="pyt-refs">← ${_(a.join(`, `))}</span>`:``}${e.truncated?`<span class="pyt-refs">${_(b(`${e.truncated} items`,`${e.truncated} elemen`))}</span>`:``}</div>`,e.entries){if(!e.entries.length)i+=`<div class="pyt-emptyobj">${_(b(`empty`,`kosong`))}</div>`;else{let n=new Map((t?.entries||[]).map(([e,t])=>[e.repr,t]));i+=`<div class="pyt-kvs">`;for(let[a,o]of e.entries){let e=n.get(a.repr),s=!r&&!!t&&ce(e,o);i+=`<div class="pyt-k">${fn(a,!1)}</div><div class="pyt-v">${fn(o,s)}</div>`}i+=`</div>`}}else{let n=e.items||[];if(!n.length)i+=`<div class="pyt-emptyobj">${_(b(`empty`,`kosong`))}</div>`;else{let a=e.type!==`set`;i+=`<div class="pyt-cells">`,n.forEach((n,o)=>{let s=t?.items?.[o],c=!r&&!!t&&e.type!==`set`&&ce(s,n);i+=`<div class="pyt-cell">${fn(n,c)}${a?`<span class="pyt-ci">${o}</span>`:``}</div>`}),e.truncated&&e.truncated>n.length&&(i+=`<div class="pyt-cell pyt-more">+${e.truncated-n.length}</div>`),i+=`</div>`}}return i+`</div>`}function mn(){let e=z[B];if(!e){T.classList.remove(`has-heap`),T.innerHTML=`<div class="pyt-frames"><p class="pyt-empty">${_(R?b(`The program did not start: fix the SyntaxError first.`,`Program tidak dimulai: perbaiki dulu SyntaxError-nya.`):b(`Press Step or Run to start tracing.`,`Tekan Langkah atau Jalankan untuk mulai menelusuri.`))}</p></div>`;return}let t=B>0?z[B-1]:null,n=e.frames,r=[...ln(n,new Map).values()],i=t?ln(t.frames,new Map):new Map,a=new Map;t&&t.frames.forEach((e,t)=>e.locals.forEach(n=>a.set(`${kt(e,t)}\u0000${n.name}`,n.value)));let o=new Map;n.forEach((e,t)=>e.locals.forEach(n=>{y(n.value)&&(o.has(n.value.id)||o.set(n.value.id,[]),o.get(n.value.id).push(t===0?n.name:`${n.name} (${e.name})`))}));let s=`<div class="pyt-frames">`,c=n.length>14?n.length-13:0;n.forEach((r,i)=>{if(c&&i>0&&i<=c){i===1&&(s+=`<p class="pyt-empty">⋮ ${_(b(`${c} more function frames (calls still waiting to return)`,`${c} bingkai fungsi lain (pemanggilan yang masih menunggu kembali)`))}</p>`);return}let l=i===n.length-1&&!Y(e);if(s+=`<div class="pyt-frame${l?` is-cur`:``}"><div class="pyt-frame-h"><span>${_(i===0?b(`Global frame`,`Bingkai global`):`${r.name}()`)}</span>${i>0?`<small>${_(b(`function call`,`pemanggilan fungsi`))}</small>`:``}${l&&n.length>1?`<small>${_(b(`running`,`sedang berjalan`))}</small>`:``}</div>`,!r.locals.length)s+=`<div class="pyt-empty">${_(b(`(no variables yet)`,`(belum ada variabel)`))}</div>`;else{s+=`<div class="pyt-vars">`;for(let e of r.locals){let n=a.get(`${kt(r,i)}\u0000${e.name}`),c=!!t&&ce(n,e.value);s+=`<div class="pyt-vn">${_(e.name)}</div><div class="pyt-vv">${dn(e.value,c,y(e.value)?o.get(e.value.id):[])}</div>`}s+=`</div>`}s+=`</div>`});for(let t of e.rets)t.unwind||(s+=`<div class="pyt-ret">↩ ${_(t.name)}() ${_(b(`returned`,`mengembalikan`))} ${y(t.value)?`<span class="pyt-box ${le(t.value)}">${_(v(String(t.value.repr),40))}</span>`:un(t.value,!1)}</div>`);s+=`</div><div class="pyt-heap">`;for(let e of r)s+=pn(e,i.get(e.id),o);s+=`</div><svg class="pyt-arrows" aria-hidden="true" focusable="false"></svg>`,T.classList.toggle(`has-heap`,r.length>0),T.innerHTML=s,cancelAnimationFrame(yt),yt=requestAnimationFrame(hn)}function hn(){yt=0;let e=T.querySelector(`.pyt-arrows`);if(!e||!T.isConnected)return;let t=T.getBoundingClientRect();e.setAttribute(`width`,String(Math.round(t.width))),e.setAttribute(`height`,String(Math.round(t.height)));let n=`<defs><marker id="pyt-ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#cbd5e1" stroke="none"/></marker></defs>`,r=e=>(Math.round(e*10)/10).toFixed(1),i=T.querySelector(`.pyt-frames`),a=T.querySelector(`.pyt-heap`),o=!!i&&!!a&&a.getBoundingClientRect().top>=i.getBoundingClientRect().bottom-2,s=new Map;T.querySelectorAll(`.pyt-dot[data-to]`).forEach(e=>{let i=T.querySelector(`.pyt-obj[data-id="${e.dataset.to}"]`);if(!i)return;let a=e.getBoundingClientRect(),c=i.getBoundingClientRect();if(!a.width||!c.width)return;let l=a.left+a.width/2-t.left,u=a.top+a.height/2-t.top,d=c.left-t.left,f=c.top-t.top,p,m,h;if(o){s.has(e.dataset.to)||s.set(e.dataset.to,s.size);let i=t.width-9-s.get(e.dataset.to)%4*6;p=c.right-t.left+3,m=f+9;let a=Math.min(6,Math.abs(m-u)/2),o=m>=u?1:-1;p>i-8&&(p=i-8),n+=`<path d="M${r(l)} ${r(u)} H${r(i-a)} Q${r(i)} ${r(u)} ${r(i)} ${r(u+o*a)} V${r(m-o*a)} Q${r(i)} ${r(m)} ${r(i-a)} ${r(m)} H${r(p)}" marker-end="url(#pyt-ah)"/>`}else{if(d>l+18){p=d-2,m=f+8;let e=Math.max(18,(p-l)*.45);h=`C${r(l+e)} ${r(u)} ${r(p-e)} ${r(m)} ${r(p)} ${r(m)}`}else if(f>u+10){p=Math.min(d+14,c.right-t.left-6),m=f-2;let e=Math.max(16,(m-u)*.45);h=`C${r(l+22)} ${r(u+e*.4)} ${r(p)} ${r(m-e)} ${r(p)} ${r(m)}`}else{p=d-2,m=f+8;let e=Math.min(l,p)-26;h=`C${r(e)} ${r(u)} ${r(e)} ${r(m)} ${r(p)} ${r(m)}`}n+=`<path d="M${r(l)} ${r(u)} ${h}" marker-end="url(#pyt-ah)"/>`}}),e.innerHTML=n}function gn(){A.textContent=``,G=1,K=0,St.clear()}function _n(e){let t=Nt(e);H[e]?St.delete(e):St.add(e);let n=document.createElement(`tr`);n.dataset.k=String(e),t.error&&(n.className=`is-err`);let r=t.line,i=r?(I[r-1]||``).trim():``,a=Pt(t),o=a.length?a.map(e=>`<span class="pyt-chg${e.cls?` ${e.cls}`:``}">${_(e.text)}${e.tag?`<span class="tag">${_(e.tag)}</span>`:``}</span>`).join(``):t.out.length?``:`<span class="pyt-chg" style="color:#7d8ba6">–</span>`,s=t.out.filter(e=>!(t.error&&e.kind===`err`)).map(e=>{let t=e.text.replace(/\n$/,``).replace(/\n/g,` ↵ `);return`<span class="k-${e.kind}">${_(v(t,160))}</span>`}).join(``);return n.innerHTML=`<td class="c-step"><button type="button" class="pyt-step" tabindex="-1" aria-label="${_(b(`Go to step ${e}`,`Ke langkah ${e}`))}">${e}</button></td><td class="c-line">${r??``}</td><td class="c-code">${i?u(i,`python`)[0]:``}</td><td class="c-chg">${o}</td><td class="c-out">${s}</td>`,n}function vn(e){let t=document.createElement(`tr`);return t.className=`pyt-tnote`,t.innerHTML=`<td colspan="5">${_(e)}</td>`,t}let yn=e=>b(`${e-1} earlier steps not shown (use the step slider to see them)`,`${e-1} langkah sebelumnya tidak ditampilkan (pakai penggeser langkah untuk melihatnya)`);function bn(){let e=z.length?z.length-1:0,t=B,n=Math.max(1,t-ee+1);if(t===0)gn(),A.appendChild(vn(R?b(`No steps: the program has a syntax error.`,`Tidak ada langkah: program memiliki kesalahan sintaks.`):b(`Each step you run adds a row here.`,`Setiap langkah yang dijalankan menambah satu baris di sini.`)));else if(K>=G&&t===K+1&&n<=K){for(A.querySelector(`.pyt-tnote`)?.remove(),A.appendChild(_n(t));G<n;)A.querySelector(`tr[data-k="${G}"]`)?.remove(),G++;K=t,n>1&&A.insertBefore(vn(yn(n)),A.firstChild)}else if(K>=G&&t<K&&n===G){for(let e=K;e>t;e--)A.querySelector(`tr[data-k="${e}"]`)?.remove();K=t}else if(K!==t||G!==n){gn();let e=document.createDocumentFragment();n>1&&e.appendChild(vn(yn(n)));for(let r=n;r<=t;r++)e.appendChild(_n(r));A.appendChild(e),G=n,K=t}for(let e of[...St])e<G||e>K?St.delete(e):(Nt(e),H[e]&&A.querySelector(`tr[data-k="${e}"]`)?.replaceWith(_n(e)));A.querySelectorAll(`tr.is-cur`).forEach(e=>{e.classList.remove(`is-cur`);let t=e.querySelector(`.pyt-step`);t&&(t.tabIndex=-1)});let r=t>0?A.querySelector(`tr[data-k="${t}"]`):null;if(r){r.classList.add(`is-cur`);let e=r.querySelector(`.pyt-step`);e&&(e.tabIndex=0);let t=r.offsetTop,n=t+r.offsetHeight,i=k.tHead?k.tHead.offsetHeight:0;n>O.scrollTop+O.clientHeight?O.scrollTop=n-O.clientHeight:t-i<O.scrollTop&&(O.scrollTop=Math.max(0,t-i))}Ke.textContent=e?b(`${t} of ${e} steps`,`${t} dari ${e} langkah`):``}function xn(){let e=e=>{let t=e.replace(/\r\n?/g,`
`).split(`
`).map(e=>e.replace(/\s+$/,``));for(;t.length&&t[t.length-1]===``;)t.pop();return t},t=e(D.value),n=e(It()),r=-1,i=0;for(let e=0;e<Math.max(t.length,n.length);e++)if(t[e]!==n[e]){r=e;let a=t[e]??``,o=n[e]??``;for(;i<a.length&&i<o.length&&a[i]===o[i];)i++;break}return{p:t,a:n,line:r,col:i,match:r<0}}function Sn(){let e=J();return!nt||!e||!Y(e)||!D.value.trim()?null:xn()}function Cn(){if(!nt)return;let e=z.length>1||z.length===1&&Y(z[0])||!!L&&L.status===`waiting-input`;D.readOnly=e,Ve.textContent=e?b(`Locked: the program has started. Press Reset to change your prediction.`,`Terkunci: program sudah berjalan. Tekan Mulai ulang untuk mengubah tebakan.`):b(`Write your prediction first, then press Step, Run or To end. Spaces inside a line count; spaces at the end of a line are ignored.`,`Tulis tebakan dulu, lalu tekan Langkah, Jalankan, atau Ke akhir. Spasi di dalam baris dihitung; spasi di akhir baris diabaikan.`);let t=J(),n=!!t&&B===z.length-1&&Y(t),r=``;if(!n)r=`<p class="pyt-verdict wait">${_(b(`The verdict appears when the program has finished.`,`Hasil penilaian muncul setelah program selesai.`))}</p>`;else if(!D.value.trim())r=`<p class="pyt-verdict wait">${_(b(`No prediction was written for this run. Press Reset, write one, and run again.`,`Tidak ada tebakan untuk proses ini. Tekan Mulai ulang, tulis tebakan, lalu jalankan lagi.`))}</p>`;else{let e=xn();r=e.match?`<p class="pyt-verdict ok">✓ ${_(b(`Correct! Your prediction matches the output exactly.`,`Benar! Tebakanmu sama persis dengan keluaran.`))}</p>`:`<p class="pyt-verdict bad">✗ ${_(b(`Not quite: the first difference is in line ${e.line+1}, character ${e.col+1}.`,`Belum tepat: perbedaan pertama ada di baris ${e.line+1}, karakter ${e.col+1}.`))}</p>`;let t=``,n=Math.max(e.p.length,e.a.length);for(let r=0;r<n;r++){let n=e.p[r],i=e.a[r],a=n!==i,o=(t,n)=>t==null?`<td class="${n}"><span class="none">${_(b(`(no line)`,`(tidak ada baris)`))}</span></td>`:r===e.line?`<td class="${n}">${_(t.slice(0,e.col))}<mark>${_(t.slice(e.col)||` `)}</mark></td>`:`<td class="${n}">${_(t)||` `}</td>`;t+=`<tr class="${a?`diff`:``}${r===e.line?` first`:``}"><td class="n">${r+1}</td>${o(n,`p`)}${o(i,`a`)}</tr>`}r+=`<div class="pyt-cmpw"><table class="pyt-cmp"><thead><tr><th>#</th><th>${_(b(`Your prediction`,`Tebakanmu`))}</th><th>${_(b(`Actual output`,`Keluaran sebenarnya`))}</th></tr></thead><tbody>${t}</tbody></table></div>`}xt!==r&&(xt=r,He.innerHTML=r)}function wn(){let e=J();if(!e||!Y(e)||R)return null;let t=P===`custom`?`My code (from ${N.name.en})`:N.name.en,n=V.filter(e=>e.kind!==`err`).map(e=>e.text).join(``),r=n?n.replace(/\n$/,``).split(`
`).length:0,i=Sn();return{program:t,inputs:dt.length?dt.join(` | `):`–`,steps:z.length-1,lines:r,ended:e.status===`done`?`done`:Lt(e.error)?`step limit`:e.error?.type||`error`,prediction:i?i.match?`match`:`differ (line ${i.line+1})`:`–`}}function $(e){Oe.textContent=``,Oe.textContent=e}function Tn(){U||$(an().replace(/<[^>]+>/g,``))}x.addEventListener(`input`,()=>{Z();let e=Number(x.value);Number.isFinite(e)&&e>=0&&e<z.length&&(B=e,Q())}),A.addEventListener(`click`,e=>{let t=e.target.closest(`.pyt-step`);if(!t)return;let n=Number(t.closest(`tr`)?.dataset.k);Number.isFinite(n)&&n>=0&&n<z.length&&(Z(),B=n,Q(),Tn())}),j.addEventListener(`input`,en);let En=new ResizeObserver(()=>{yt||(yt=requestAnimationFrame(hn))});return En.observe(T),rn(ne),()=>{bt=!0,Z(),clearTimeout(gt),clearTimeout(_t),cancelAnimationFrame(yt),En.disconnect(),w.destroy(),S.destroy(),he.remove(),_e.remove(),me.remove()}}export{de as mount};