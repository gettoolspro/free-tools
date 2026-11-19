import{a as e}from"./index-BrO3c2l1.js";import{n as t}from"./canvas-CdVdNBG8.js";import{a as n,i as r,n as i,r as a,t as o}from"./controls-LEl6-qCH.js";import{t as s}from"./lab-BSD-2J2M.js";import{n as c,o as l,s as u,t as d}from"./codepanel-D34ICvuV.js";var f=(t,n)=>e()===`id`?n:t,p=(e,t)=>({en:e,id:t}),m=2e4,h=300,ee=[{key:`kuadrat`,name:p(`Square of a number (sequence)`,`Hitung kuadrat (urutan)`),source:p(`A classic first-program example`,`Contoh klasik program pertama`),problem:p(`Write a program that asks for a whole number and shows its square.`,`Buat program yang meminta sebuah angka bulat lalu menampilkan kuadratnya.`),known:p([`a whole number, for example 12`],[`sebuah angka bulat, misalnya 12`]),asked:p([`the square of that number (12 × 12 = 144)`],[`kuadrat angka itu (12 × 12 = 144)`]),note:p(`A pure sequence: three boxes one after another, no branch.`,`Sekuensial murni: tiga kotak berurutan tanpa cabang.`),ipo:{i:p(`number: a whole number typed on the keyboard`,`angka: bilangan bulat yang diketik di keyboard`),p:p(`square = number × number`,`kuadrat = angka × angka`),o:p(`the sentence "The square of … is …"`,`kalimat "Kuadrat dari … adalah …"`)},desc:{title:p(`Title: Algorithm_SquareNumber`,`Judul: Algoritma_HitungKuadrat`),comment:p(`{computes the square of a whole number}`,`{menghitung kuadrat dari sebuah bilangan bulat}`),decl:p(`Declaration: number, square : whole numbers`,`Deklarasi: angka, kuadrat : bilangan bulat`),steps:p([`Read number.`,`Compute square = number × number.`,`Display "The square of", number, "is", square.`,`Finish.`],[`Baca angka.`,`Hitung kuadrat = angka × angka.`,`Tampilkan "Kuadrat dari", angka, "adalah", kuadrat.`,`Selesai.`])},pseudo:p(`ALGORITHM SquareNumber
DECLARATION
    number, square : integer
START
    READ number
    square ← number × number
    DISPLAY "The square of", number, "is", square
END`,`ALGORITMA HitungKuadrat
DEKLARASI
    angka, kuadrat : integer
MULAI
    READ angka
    kuadrat ← angka × angka
    DISPLAY "Kuadrat dari", angka, "adalah", kuadrat
SELESAI`),py:p(`number = int(input("Enter a number: "))
square = number * number
print("The square of", number, "is", square)
`,`angka = int(input("Masukkan sebuah angka: "))
kuadrat = angka * angka
print("Kuadrat dari", angka, "adalah", kuadrat)
`),mistake:{py:p(`number = input("Enter a number: ")
square = number * number
print("The square of", number, "is", square)
`,`angka = input("Masukkan sebuah angka: ")
kuadrat = angka * angka
print("Kuadrat dari", angka, "adalah", kuadrat)
`),note:p(`Common mistake inserted: int() was left out of line 1. input() always gives text (str), and text × text is a TypeError. Run any test to read the traceback.`,`Kesalahan umum disisipkan: int() lupa ditulis di baris 1. input() selalu menghasilkan teks (str), dan teks × teks menimbulkan TypeError. Jalankan salah satu data uji untuk membaca traceback-nya.`)},inputs:[p(`number`,`angka`)],tests:[{v:[`12`]},{v:[`0`],tag:p(`zero`,`nol`)},{v:[`-3`],tag:p(`negative`,`negatif`)}],vars:p([`number`,`square`],[`angka`,`kuadrat`]),units:[{id:`start`,ps:[4]},{id:`in`,py:[1],ps:[5],d:1,ipo:`i`},{id:`p`,py:[2],ps:[6],d:2,ipo:`p`},{id:`out`,py:[3],ps:[7],d:3,ipo:`o`},{id:`end`,ps:[8],d:4}],chart:{w:300,h:344,nodes:[{id:`start`,t:`term`,x:150,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:150,y:100,text:p(`READ number`,`READ angka`)},{id:`p`,t:`proc`,x:150,y:172,text:p(`square ← number × number`,`kuadrat ← angka × angka`),w:236},{id:`out`,t:`io`,x:150,y:244,text:p(`DISPLAY number, square`,`DISPLAY angka, kuadrat`),w:236},{id:`end`,t:`term`,x:150,y:314,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`p`},{f:`p`,t:`out`},{f:`out`,t:`end`}]}},{key:`luas`,name:p(`Area of a square (sequence)`,`Luas persegi (urutan)`),source:p(`A classic geometry example`,`Contoh klasik soal geometri`),problem:p(`Find the area of a square when the length of its side is known.`,`Hitung luas sebuah persegi jika panjang sisinya diketahui.`),known:p([`side: the length of one side (a whole number)`],[`sisi: panjang salah satu sisi (bilangan bulat)`]),asked:p([`the area of the square = side × side`],[`luas persegi = sisi × sisi`]),note:p(`Some textbooks write this one with DESCRIPTION, Input and Output instead of START, READ and DISPLAY: both notations are fine.`,`Sebagian buku menulis contoh ini dengan DESKRIPSI, Input, dan Output, bukan MULAI, READ, dan DISPLAY: keduanya boleh.`),ipo:{i:p(`side (whole number)`,`sisi (bilangan bulat)`),p:p(`area = side × side`,`luas = sisi × sisi`),o:p(`area`,`luas`)},desc:{title:p(`Title: Algorithm_AreaOfSquare`,`Judul: Algoritma_Menghitung_Luas_Persegi`),comment:p(`{computes the area of a square from its side}`,`{menghitung luas persegi dari panjang sisinya}`),decl:p(`Declaration: side, area : whole numbers`,`Deklarasi: sisi, luas : bilangan bulat`),steps:p([`Input the side.`,`Compute area = side × side.`,`Output the area.`,`Finish.`],[`Masukkan sisi.`,`Hitung luas = sisi × sisi.`,`Tampilkan luas.`,`Selesai.`])},pseudo:p(`ALGORITHM Area_Of_Square
DECLARATION
    side, area : integer
DESCRIPTION
    Input side
    area ← side × side
    Output area`,`ALGORITMA Menghitung_Luas_Persegi
DEKLARASI
    sisi, luas : integer
DESKRIPSI
    Input sisi
    luas ← sisi × sisi
    Output luas`),py:p(`side = int(input("Enter the side: "))
area = side * side
print("Area of the square =", area)
`,`sisi = int(input("Masukkan sisi: "))
luas = sisi * sisi
print("Luas persegi =", luas)
`),mistake:{py:p(`side = int(input("Enter the side: "))
area = side + side
print("Area of the square =", area)
`,`sisi = int(input("Masukkan sisi: "))
luas = sisi + sisi
print("Luas persegi =", luas)
`),note:p(`Common mistake inserted: area became side + side. Test all data: side 2 still passes (2 + 2 = 2 × 2) and so does 0 (0 + 0 = 0 × 0); only 5 catches the bug, so a lucky test proves nothing.`,`Kesalahan umum disisipkan: luas menjadi sisi + sisi. Uji semua data: sisi 2 tetap lolos (2 + 2 = 2 × 2), begitu pula 0 (0 + 0 = 0 × 0); hanya 5 yang menangkap bug-nya, jadi data uji yang kebetulan benar belum membuktikan apa-apa.`)},inputs:[p(`side`,`sisi`)],tests:[{v:[`5`]},{v:[`2`]},{v:[`0`],tag:p(`zero`,`nol`)}],vars:p([`side`,`area`],[`sisi`,`luas`]),units:[{id:`start`,ps:[4]},{id:`in`,py:[1],ps:[5],d:1,ipo:`i`},{id:`p`,py:[2],ps:[6],d:2,ipo:`p`},{id:`out`,py:[3],ps:[7],d:3,ipo:`o`},{id:`end`,ps:[],d:4}],chart:{w:300,h:344,nodes:[{id:`start`,t:`term`,x:150,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:150,y:100,text:p(`Input side`,`Input sisi`)},{id:`p`,t:`proc`,x:150,y:172,text:p(`area ← side × side`,`luas ← sisi × sisi`)},{id:`out`,t:`io`,x:150,y:244,text:p(`Output area`,`Output luas`)},{id:`end`,t:`term`,x:150,y:314,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`p`},{f:`p`,t:`out`},{f:`out`,t:`end`}]}},{key:`suhu`,name:p(`Temperature conversion (sequence)`,`Konversi suhu (urutan)`),source:p(`A classic unit-conversion example`,`Contoh klasik soal konversi satuan`),problem:p(`Convert a temperature in Celsius to Réaumur and Fahrenheit, using R = 4/5 × C and F = 9/5 × C + 32.`,`Ubah suhu dalam Celsius ke Reamur dan Fahrenheit dengan rumus R = 4/5 × C dan F = 9/5 × C + 32.`),known:p([`C: the temperature in degrees Celsius (may have decimals)`,`the two conversion formulas`],[`C: suhu dalam derajat Celsius (boleh desimal)`,`dua rumus konversi`]),asked:p([`R (Réaumur) and F (Fahrenheit)`],[`R (Reamur) dan F (Fahrenheit)`]),note:p(`The program shows R and F rounded to one decimal; the trace table shows the full values the variables hold.`,`Program menampilkan R dan F dibulatkan satu desimal; trace table menunjukkan nilai lengkap yang disimpan variabel.`),ipo:{i:p(`C (real number)`,`C (bilangan real)`),p:p(`R = 4/5 × C;  F = 9/5 × C + 32`,`R = 4/5 × C;  F = 9/5 × C + 32`),o:p(`R and F, rounded to one decimal`,`R dan F, dibulatkan satu desimal`)},desc:{title:p(`Title: Algorithm_TemperatureConversion`,`Judul: Algoritma_KonversiSuhu`),comment:p(`{converts Celsius to Réaumur and Fahrenheit}`,`{mengubah suhu Celsius ke Reamur dan Fahrenheit}`),decl:p(`Declaration: C, R, F : real numbers`,`Deklarasi: C, R, F : bilangan real`),steps:p([`Read the temperature C in Celsius.`,`Convert to Réaumur: R = 4/5 × C.`,`Convert to Fahrenheit: F = 9/5 × C + 32.`,`Display R and F.`,`Finish.`],[`Baca suhu C dalam Celsius.`,`Konversi ke Reamur: R = 4/5 × C.`,`Konversi ke Fahrenheit: F = 9/5 × C + 32.`,`Tampilkan R dan F.`,`Selesai.`])},pseudo:p(`ALGORITHM TemperatureConversion
DECLARATION
    C, R, F : real
START
    READ C
    R ← 4/5 × C          {convert to Réaumur}
    F ← 9/5 × C + 32     {convert to Fahrenheit}
    DISPLAY R, F
END`,`ALGORITMA KonversiSuhu
DEKLARASI
    C, R, F : real
MULAI
    READ C
    R ← 4/5 × C          {konversi ke Reamur}
    F ← 9/5 × C + 32     {konversi ke Fahrenheit}
    DISPLAY R, F
SELESAI`),py:p(`C = float(input("Temperature in Celsius: "))
R = 4 / 5 * C          # convert to Reaumur
F = 9 / 5 * C + 32     # convert to Fahrenheit
print(f"Reaumur    : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`,`C = float(input("Masukkan suhu dalam Celsius: "))
R = 4 / 5 * C          # konversi ke Reamur
F = 9 / 5 * C + 32     # konversi ke Fahrenheit
print(f"Reamur     : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`),mistake:{py:p(`C = float(input("Temperature in Celsius: "))
R = 4 / 5 * C          # convert to Reaumur
F = 9 / 5 * (C + 32)   # convert to Fahrenheit
print(f"Reaumur    : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`,`C = float(input("Masukkan suhu dalam Celsius: "))
R = 4 / 5 * C          # konversi ke Reamur
F = 9 / 5 * (C + 32)   # konversi ke Fahrenheit
print(f"Reamur     : {R:.1f}")
print(f"Fahrenheit : {F:.1f}")
`),note:p(`Common mistake inserted: brackets in line 3 make Python add 32 before multiplying. 9/5 × C + 32 means (9/5 × C) + 32, so every Fahrenheit test now fails.`,`Kesalahan umum disisipkan: tanda kurung di baris 3 membuat Python menjumlahkan 32 sebelum mengalikan. 9/5 × C + 32 artinya (9/5 × C) + 32, sehingga semua uji Fahrenheit kini gagal.`)},inputs:[p(`C`,`C`)],tests:[{v:[`100`]},{v:[`37.5`]},{v:[`0`],tag:p(`freezing`,`titik beku`)},{v:[`-40`],tag:p(`C = F`,`C = F`)}],vars:p([`C`,`R`,`F`],[`C`,`R`,`F`]),units:[{id:`start`,ps:[4]},{id:`in`,py:[1],ps:[5],d:1,ipo:`i`},{id:`r`,py:[2],ps:[6],d:2,ipo:`p`},{id:`f`,py:[3],ps:[7],d:3,ipo:`p`},{id:`out`,py:[4,5],ps:[8],d:4,ipo:`o`},{id:`end`,ps:[9],d:5}],chart:{w:300,h:416,nodes:[{id:`start`,t:`term`,x:150,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:150,y:100,text:p(`READ C`,`READ C`)},{id:`r`,t:`proc`,x:150,y:172,text:p(`R ← 4/5 × C`,`R ← 4/5 × C`)},{id:`f`,t:`proc`,x:150,y:244,text:p(`F ← 9/5 × C + 32`,`F ← 9/5 × C + 32`)},{id:`out`,t:`io`,x:150,y:316,text:p(`DISPLAY R, F`,`DISPLAY R, F`)},{id:`end`,t:`term`,x:150,y:386,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`r`},{f:`r`,t:`f`},{f:`f`,t:`out`},{f:`out`,t:`end`}]}},{key:`diskon`,name:p(`Price after discount (HitungDiskon)`,`Hitung diskon (HitungDiskon)`),source:p(`A classic percentage-discount example`,`Contoh klasik soal diskon persentase`),problem:p(`A shop gives a discount of a given percentage. Compute the price after the discount; the price can never drop below 0.`,`Sebuah toko memberi diskon sebesar persentase tertentu. Hitung harga setelah diskon; harga tidak boleh kurang dari 0.`),known:p([`price: the original price`,`percent: the discount in %`],[`hargaAwal: harga awal produk`,`besaranDiskon: besar diskon dalam %`]),asked:p([`finalPrice: the price after the discount (at least 0)`],[`hargaDiskon: harga setelah diskon (minimal 0)`]),note:p(`The IF only changes something when the discount is more than 100%, so test 100% (exactly 0) and 120% (below 0). Python prints 0.0 for the first and 0 for the second, because the IF stores the whole number 0.`,`IF hanya mengubah sesuatu jika diskon lebih dari 100%, jadi uji 100% (tepat 0) dan 120% (di bawah 0). Python menampilkan 0.0 untuk yang pertama dan 0 untuk yang kedua, karena IF menyimpan bilangan bulat 0.`),ipo:{i:p(`price, percent`,`hargaAwal, besaranDiskon`),p:p(`reduction = price × percent ÷ 100; finalPrice = price − reduction; if finalPrice < 0, make it 0`,`potongan = hargaAwal × besaranDiskon ÷ 100; hargaDiskon = hargaAwal − potongan; jika hargaDiskon < 0, jadikan 0`),o:p(`finalPrice`,`hargaDiskon`)},desc:{title:p(`Title: Algorithm_DiscountedPrice`,`Judul: Algoritma_HitungDiskon`),comment:p(`{computes the price after a discount from the original price and the size of the discount}`,`{menghitung harga setelah diskon dari harga awal produk dan besaran diskonnya}`),decl:p(`Declaration: price, percent, reduction, finalPrice : numbers`,`Deklarasi: hargaAwal, besaranDiskon, potongan, hargaDiskon : bilangan`),steps:p([`Read price and percent (%).`,`Compute reduction = price × percent ÷ 100.`,`Compute finalPrice = price − reduction.`,`If finalPrice is less than 0, set finalPrice to 0.`,`Display finalPrice.`,`Finish.`],[`Baca hargaAwal dan besaranDiskon (%).`,`Hitung potongan = hargaAwal × besaranDiskon ÷ 100.`,`Hitung hargaDiskon = hargaAwal − potongan.`,`Jika hargaDiskon kurang dari 0, ubah hargaDiskon menjadi 0.`,`Tampilkan hargaDiskon.`,`Selesai.`])},pseudo:p(`ALGORITHM DiscountedPrice
DECLARATION
    price, percent : real
    reduction, finalPrice : real
START
    READ price, percent
    reduction ← price * percent / 100
    finalPrice ← price - reduction
    IF finalPrice < 0 THEN
        finalPrice ← 0
    ENDIF
    DISPLAY finalPrice
END`,`ALGORITMA HitungDiskon
DEKLARASI
    hargaAwal, besaranDiskon : real
    potongan, hargaDiskon : real
MULAI
    READ hargaAwal, besaranDiskon
    potongan ← hargaAwal * besaranDiskon / 100
    hargaDiskon ← hargaAwal - potongan
    IF hargaDiskon < 0 THEN
        hargaDiskon ← 0
    ENDIF
    DISPLAY hargaDiskon
SELESAI`),py:p(`price = float(input("Original price: "))
percent = float(input("Discount (%): "))
reduction = price * percent / 100
finalPrice = price - reduction
if finalPrice < 0:
    finalPrice = 0
print("Price after discount:", finalPrice)
`,`hargaAwal = float(input("Harga awal: "))
besaranDiskon = float(input("Besaran diskon (%): "))
potongan = hargaAwal * besaranDiskon / 100
hargaDiskon = hargaAwal - potongan
if hargaDiskon < 0:
    hargaDiskon = 0
print("Harga setelah diskon:", hargaDiskon)
`),mistake:{py:p(`price = float(input("Original price: "))
percent = float(input("Discount (%): "))
reduction = price * percent
finalPrice = price - reduction
if finalPrice < 0:
    finalPrice = 0
print("Price after discount:", finalPrice)
`,`hargaAwal = float(input("Harga awal: "))
besaranDiskon = float(input("Besaran diskon (%): "))
potongan = hargaAwal * besaranDiskon
hargaDiskon = hargaAwal - potongan
if hargaDiskon < 0:
    hargaDiskon = 0
print("Harga setelah diskon:", hargaDiskon)
`),note:p(`Common mistake inserted: "÷ 100" was dropped from line 3, so a 25% discount takes 25 times the price off. The IF then hides the bug by printing 0, so the 120% test still passes. The first test exposes it (0 instead of 150000.0); the 100% test fails only because the IF prints 0 where the original prints 0.0.`,`Kesalahan umum disisipkan: "÷ 100" terlupa di baris 3, sehingga diskon 25% memotong 25 kali harga. IF lalu menutupi bug ini dengan menampilkan 0, sehingga data uji 120% tetap lolos. Data uji pertama membongkarnya (0, bukan 150000.0); data uji 100% gagal hanya karena IF menampilkan 0, sedangkan program asli menampilkan 0.0.`)},inputs:[p(`price`,`hargaAwal`),p(`percent`,`besaranDiskon`)],tests:[{v:[`200000`,`25`]},{v:[`50000`,`100`],tag:p(`exactly 0`,`tepat 0`)},{v:[`50000`,`120`],tag:p(`below 0`,`di bawah 0`)}],vars:p([`price`,`percent`,`reduction`,`finalPrice`],[`hargaAwal`,`besaranDiskon`,`potongan`,`hargaDiskon`]),units:[{id:`start`,ps:[5]},{id:`in`,py:[1,2],ps:[6],d:1,ipo:`i`},{id:`p1`,py:[3],ps:[7],d:2,ipo:`p`},{id:`p2`,py:[4],ps:[8],d:3,ipo:`p`},{id:`dec`,py:[5],ps:[9,11],d:4,ipo:`p`},{id:`yes`,py:[6],ps:[10],d:4,ipo:`p`},{id:`out`,py:[7],ps:[12],d:5,ipo:`o`},{id:`end`,ps:[13],d:6}],chart:{w:440,h:560,nodes:[{id:`start`,t:`term`,x:150,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:150,y:102,h:52,text:p(`READ price,
percent`,`READ hargaAwal,
besaranDiskon`)},{id:`p1`,t:`proc`,x:150,y:182,h:52,text:p(`reduction ← price ×
percent / 100`,`potongan ← hargaAwal ×
besaranDiskon / 100`)},{id:`p2`,t:`proc`,x:150,y:260,h:52,text:p(`finalPrice ←
price − reduction`,`hargaDiskon ←
hargaAwal − potongan`)},{id:`dec`,t:`dec`,x:150,y:352,w:190,h:76,text:p(`finalPrice
< 0 ?`,`hargaDiskon
< 0 ?`)},{id:`yes`,t:`proc`,x:355,y:352,w:150,text:p(`finalPrice ← 0`,`hargaDiskon ← 0`)},{id:`out`,t:`io`,x:150,y:452,h:52,text:p(`DISPLAY
finalPrice`,`DISPLAY
hargaDiskon`)},{id:`end`,t:`term`,x:150,y:526,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`p1`},{f:`p1`,t:`p2`},{f:`p2`,t:`dec`},{f:`dec`,t:`yes`,from:`right`,to:`left`,label:`yes`},{f:`dec`,t:`out`,label:`no`,ls:`left`},{f:`yes`,t:`out`,pts:[[355,404],[150,404]]},{f:`out`,t:`end`}]}},{key:`diskon10`,name:p(`10% discount over Rp100,000`,`Diskon 10% di atas Rp100.000`),source:p(`A classic cashier example`,`Contoh klasik soal kasir`),problem:p(`A shop gives a 10% discount if the total shopping is more than Rp100,000. Compute the total the customer has to pay.`,`Sebuah toko memberikan diskon 10% jika total belanja melebihi Rp100.000. Hitung total yang harus dibayar pelanggan.`),known:p([`total_shopping: the total before the discount`],[`total_belanja: total belanja sebelum diskon`]),asked:p([`total_to_pay: what the customer pays after the discount`],[`total_bayar: total yang harus dibayar setelah diskon`]),note:p(`"More than" means > 100000: exactly Rp100,000 gets no discount. That is the boundary case to test.`,`"Melebihi" artinya > 100000: tepat Rp100.000 tidak mendapat diskon. Itulah kasus batas yang perlu diuji.`),ipo:{i:p(`total_shopping`,`total_belanja`),p:p(`if total_shopping > 100,000 then discount = 10% × total_shopping, otherwise 0; total_to_pay = total_shopping − discount`,`jika total_belanja > 100.000 maka diskon = 10% × total_belanja, selain itu 0; total_bayar = total_belanja − diskon`),o:p(`discount and total_to_pay`,`diskon dan total_bayar`)},desc:{title:p(`Title: Algorithm_TotalToPay`,`Judul: Algoritma_HitungTotalBayar`),comment:p(`{10% discount when the shopping total is more than Rp100,000}`,`{diskon 10% jika total belanja melebihi Rp100.000}`),decl:p(`Declaration: total_shopping, discount, total_to_pay : numbers`,`Deklarasi: total_belanja, diskon, total_bayar : bilangan`),steps:p([`Read total_shopping.`,`Set discount to 0.`,`If total_shopping is more than 100,000, discount = 10% × total_shopping.`,`Compute total_to_pay = total_shopping − discount.`,`Display discount and total_to_pay.`,`Finish.`],[`Baca total_belanja.`,`Isi diskon dengan 0.`,`Jika total_belanja lebih dari 100.000, diskon = 10% × total_belanja.`,`Hitung total_bayar = total_belanja − diskon.`,`Tampilkan diskon dan total_bayar.`,`Selesai.`])},pseudo:p(`ALGORITHM TotalToPay
DECLARATION
    total_shopping, discount, total_to_pay : real
START
    READ total_shopping
    discount ← 0
    IF total_shopping > 100000 THEN
        discount ← total_shopping × 10 / 100
    ENDIF
    total_to_pay ← total_shopping − discount
    DISPLAY discount, total_to_pay
END`,`ALGORITMA HitungTotalBayar
DEKLARASI
    total_belanja, diskon, total_bayar : real
MULAI
    READ total_belanja
    diskon ← 0
    IF total_belanja > 100000 THEN
        diskon ← total_belanja × 10 / 100
    ENDIF
    total_bayar ← total_belanja − diskon
    DISPLAY diskon, total_bayar
SELESAI`),py:p(`total_shopping = int(input("Total shopping (Rp): "))
discount = 0
if total_shopping > 100000:
    discount = total_shopping * 10 / 100
total_to_pay = total_shopping - discount
print("Discount     :", discount)
print("Total to pay :", total_to_pay)
`,`total_belanja = int(input("Total belanja (Rp): "))
diskon = 0
if total_belanja > 100000:
    diskon = total_belanja * 10 / 100
total_bayar = total_belanja - diskon
print("Diskon      :", diskon)
print("Total bayar :", total_bayar)
`),mistake:{py:p(`total_shopping = int(input("Total shopping (Rp): "))
discount = 0
if total_shopping >= 100000:
    discount = total_shopping * 10 / 100
total_to_pay = total_shopping - discount
print("Discount     :", discount)
print("Total to pay :", total_to_pay)
`,`total_belanja = int(input("Total belanja (Rp): "))
diskon = 0
if total_belanja >= 100000:
    diskon = total_belanja * 10 / 100
total_bayar = total_belanja - diskon
print("Diskon      :", diskon)
print("Total bayar :", total_bayar)
`),note:p(`Common mistake inserted: > became >= in line 3. Exactly Rp100,000 now gets a discount although the problem says "more than"; only the boundary test catches it.`,`Kesalahan umum disisipkan: > berubah menjadi >= di baris 3. Tepat Rp100.000 sekarang mendapat diskon padahal syaratnya "melebihi"; hanya data uji batas yang menangkapnya.`)},inputs:[p(`total_shopping`,`total_belanja`)],tests:[{v:[`150000`]},{v:[`100000`],tag:p(`boundary`,`batas`)},{v:[`100001`],tag:p(`just above`,`tepat di atas`)}],vars:p([`total_shopping`,`discount`,`total_to_pay`],[`total_belanja`,`diskon`,`total_bayar`]),units:[{id:`start`,ps:[4]},{id:`in`,py:[1],ps:[5],d:1,ipo:`i`},{id:`p0`,py:[2],ps:[6],d:2,ipo:`p`},{id:`dec`,py:[3],ps:[7,9],d:3,ipo:`p`},{id:`yes`,py:[4],ps:[8],d:3,ipo:`p`},{id:`p2`,py:[5],ps:[10],d:4,ipo:`p`},{id:`out`,py:[6,7],ps:[11],d:5,ipo:`o`},{id:`end`,ps:[12],d:6}],chart:{w:460,h:556,nodes:[{id:`start`,t:`term`,x:150,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:150,y:100,text:p(`READ total_shopping`,`READ total_belanja`)},{id:`p0`,t:`proc`,x:150,y:172,text:p(`discount ← 0`,`diskon ← 0`)},{id:`dec`,t:`dec`,x:150,y:262,w:200,h:80,text:p(`total_shopping
> 100000 ?`,`total_belanja
> 100000 ?`)},{id:`yes`,t:`proc`,x:368,y:262,w:160,h:64,text:p(`discount ←
total_shopping
× 10 / 100`,`diskon ←
total_belanja
× 10 / 100`)},{id:`p2`,t:`proc`,x:150,y:362,h:52,text:p(`total_to_pay ←
total_shopping − discount`,`total_bayar ←
total_belanja − diskon`),w:230},{id:`out`,t:`io`,x:150,y:446,h:52,text:p(`DISPLAY discount,
total_to_pay`,`DISPLAY diskon,
total_bayar`)},{id:`end`,t:`term`,x:150,y:520,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`p0`},{f:`p0`,t:`dec`},{f:`dec`,t:`yes`,from:`right`,to:`left`,label:`yes`},{f:`dec`,t:`p2`,label:`no`,ls:`left`},{f:`yes`,t:`p2`,pts:[[368,318],[150,318]]},{f:`p2`,t:`out`},{f:`out`,t:`end`}]}},{key:`predikat`,name:p(`Pass or not (PredikatKelulusan)`,`Predikat kelulusan (PredikatKelulusan)`),source:p(`A classic grading example`,`Contoh klasik penentuan kelulusan`),problem:p(`A course decides: a final score ≥ 75 means PASSED, anything else NOT PASSED. Write the algorithm.`,`Sebuah kursus menetapkan: nilai akhir ≥ 75 dinyatakan LULUS, selain itu TIDAK LULUS. Buat algoritmanya.`),known:p([`score: the final score (may have decimals)`,`the pass mark, 75`],[`nilai: nilai akhir (boleh desimal)`,`batas lulus 75`]),asked:p([`result: PASSED or NOT PASSED`],[`predikat: LULUS atau TIDAK LULUS`]),note:p(`Suggested test data: 80, 75 (the boundary case) and 74.9. Python needs a decimal point: float("74,9") is a ValueError.`,`Data uji yang disarankan: 80, 75 (kasus batas), dan 74,9. Python memakai titik desimal: float("74,9") menimbulkan ValueError, jadi ketik 74.9.`),ipo:{i:p(`score (the final score)`,`nilai (nilai akhir)`),p:p(`compare score with 75: score ≥ 75 → PASSED, otherwise NOT PASSED`,`bandingkan nilai dengan 75: nilai ≥ 75 → LULUS, selain itu TIDAK LULUS`),o:p(`result: PASSED / NOT PASSED`,`predikat: LULUS / TIDAK LULUS`)},desc:{title:p(`Title: Algorithm_PassResult`,`Judul: Algoritma_PredikatKelulusan`),comment:p(`{decides PASSED / NOT PASSED from the final score}`,`{menentukan predikat LULUS / TIDAK LULUS dari nilai akhir}`),decl:p(`Declaration: score : real number; result : text`,`Deklarasi: nilai : bilangan real; predikat : teks`),steps:p([`Read score.`,`If score is at least 75, result = "PASSED".`,`Otherwise, result = "NOT PASSED".`,`Display result.`,`Finish.`],[`Baca nilai.`,`Jika nilai minimal 75, predikat = "LULUS".`,`Jika tidak, predikat = "TIDAK LULUS".`,`Tampilkan predikat.`,`Selesai.`])},pseudo:p(`ALGORITHM PassResult
DECLARATION
    score : real; result : string
START
    READ score
    IF score >= 75 THEN
        result ← "PASSED"
    ELSE
        result ← "NOT PASSED"
    ENDIF
    DISPLAY result
END`,`ALGORITMA PredikatKelulusan
DEKLARASI
    nilai : real; predikat : string
MULAI
    READ nilai
    IF nilai >= 75 THEN
        predikat ← "LULUS"
    ELSE
        predikat ← "TIDAK LULUS"
    ENDIF
    DISPLAY predikat
SELESAI`),py:p(`score = float(input("Enter the score: "))
if score >= 75:
    result = "PASSED"
else:
    result = "NOT PASSED"
print(result)
`,`nilai = float(input("Masukkan nilai: "))
if nilai >= 75:
    predikat = "LULUS"
else:
    predikat = "TIDAK LULUS"
print(predikat)
`),mistake:{py:p(`score = float(input("Enter the score: "))
if score > 75:
    result = "PASSED"
else:
    result = "NOT PASSED"
print(result)
`,`nilai = float(input("Masukkan nilai: "))
if nilai > 75:
    predikat = "LULUS"
else:
    predikat = "TIDAK LULUS"
print(predikat)
`),note:p(`Common mistake inserted: >= became > in line 2. 80 and 74.9 still give the right result; only the boundary case 75 shows the bug.`,`Kesalahan umum disisipkan: >= berubah menjadi > di baris 2. 80 dan 74.9 tetap benar; hanya kasus batas 75 yang menunjukkan bug.`)},inputs:[p(`score`,`nilai`)],tests:[{v:[`80`]},{v:[`75`],tag:p(`boundary`,`batas`)},{v:[`74.9`]}],vars:p([`score`,`result`],[`nilai`,`predikat`]),units:[{id:`start`,ps:[4]},{id:`in`,py:[1],ps:[5],d:1,ipo:`i`},{id:`dec`,py:[2],ps:[6,10],d:2,ipo:`p`},{id:`yes`,py:[3],ps:[7],d:2,ipo:`p`},{id:`no`,py:[5,4],ps:[9,8],d:3,ipo:`p`},{id:`out`,py:[6],ps:[11],d:4,ipo:`o`},{id:`end`,ps:[12],d:5}],chart:{w:440,h:490,nodes:[{id:`start`,t:`term`,x:220,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:220,y:100,text:p(`READ score`,`READ nilai`)},{id:`dec`,t:`dec`,x:220,y:192,w:180,text:p(`score ≥ 75 ?`,`nilai ≥ 75 ?`)},{id:`yes`,t:`proc`,x:95,y:282,w:170,h:52,text:p(`result ←
"PASSED"`,`predikat ←
"LULUS"`)},{id:`no`,t:`proc`,x:345,y:282,w:170,h:52,text:p(`result ←
"NOT PASSED"`,`predikat ←
"TIDAK LULUS"`)},{id:`out`,t:`io`,x:220,y:382,text:p(`DISPLAY result`,`DISPLAY predikat`)},{id:`end`,t:`term`,x:220,y:452,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`dec`},{f:`dec`,t:`yes`,from:`left`,pts:[[95,192]],label:`yes`},{f:`dec`,t:`no`,from:`right`,pts:[[345,192]],label:`no`},{f:`yes`,t:`out`,pts:[[95,334],[220,334]]},{f:`no`,t:`out`,pts:[[345,334],[220,334]]},{f:`out`,t:`end`}]}},{key:`jumlah`,name:p(`Sum 1 to n (loop)`,`Jumlah 1 sampai n (perulangan)`),source:p(`for + range() and the accumulator pattern`,`for + range() dan pola akumulator`),problem:p(`Add up all whole numbers from 1 to n, for example 1 + 2 + 3 + 4 + 5 = 15 when n = 5.`,`Jumlahkan semua bilangan bulat dari 1 sampai n, misalnya 1 + 2 + 3 + 4 + 5 = 15 untuk n = 5.`),known:p([`n: the last number (a whole number, 0 or more)`],[`n: bilangan terakhir (bilangan bulat, 0 atau lebih)`]),asked:p([`total: the sum 1 + 2 + … + n`],[`jumlah: hasil 1 + 2 + … + n`]),note:p(`n = 0 is the boundary case: the loop body runs zero times and the sum stays 0. The number of repetitions is known in advance, so this is a counted loop (FOR, hexagon).`,`n = 0 adalah kasus batas: badan perulangan berjalan nol kali dan jumlah tetap 0. Banyak pengulangan sudah diketahui, jadi ini perulangan terhitung (FOR, segi enam).`),ipo:{i:p(`n`,`n`),p:p(`total starts at 0; for every i from 1 to n: total = total + i (accumulator)`,`jumlah mulai dari 0; untuk setiap i dari 1 sampai n: jumlah = jumlah + i (akumulator)`),o:p(`total`,`jumlah`)},desc:{title:p(`Title: Algorithm_Sum1ToN`,`Judul: Algoritma_Jumlah1SampaiN`),comment:p(`{adds 1 + 2 + … + n with a counted loop}`,`{menjumlahkan 1 + 2 + … + n dengan perulangan terhitung}`),decl:p(`Declaration: n, i, total : whole numbers`,`Deklarasi: n, i, jumlah : bilangan bulat`),steps:p([`Read n.`,`Set total to 0.`,`For every i from 1 to n, add i to total.`,`Display total.`,`Finish.`],[`Baca n.`,`Isi jumlah dengan 0.`,`Untuk setiap i dari 1 sampai n, tambahkan i ke jumlah.`,`Tampilkan jumlah.`,`Selesai.`])},pseudo:p(`ALGORITHM Sum1ToN
DECLARATION
    n, i, total : integer
START
    READ n
    total ← 0
    FOR i ← 1 TO n DO
        total ← total + i
    ENDFOR
    DISPLAY total
END`,`ALGORITMA Jumlah1SampaiN
DEKLARASI
    n, i, jumlah : integer
MULAI
    READ n
    jumlah ← 0
    FOR i ← 1 TO n DO
        jumlah ← jumlah + i
    ENDFOR
    DISPLAY jumlah
SELESAI`),py:p(`n = int(input("Enter n: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("Sum of 1 to", n, "=", total)
`,`n = int(input("Masukkan n: "))
jumlah = 0
for i in range(1, n + 1):
    jumlah = jumlah + i
print("Jumlah 1 sampai", n, "=", jumlah)
`),mistake:{py:p(`n = int(input("Enter n: "))
total = 0
for i in range(1, n):
    total = total + i
print("Sum of 1 to", n, "=", total)
`,`n = int(input("Masukkan n: "))
jumlah = 0
for i in range(1, n):
    jumlah = jumlah + i
print("Jumlah 1 sampai", n, "=", jumlah)
`),note:p(`Common mistake inserted: range(1, n) stops before n, so the last number is never added (an off-by-one error). n = 0 still passes; the other tests catch it.`,`Kesalahan umum disisipkan: range(1, n) berhenti sebelum n, sehingga bilangan terakhir tidak pernah dijumlahkan (kesalahan selisih satu). n = 0 tetap lolos; data uji lain menangkapnya.`)},inputs:[p(`n`,`n`)],tests:[{v:[`5`]},{v:[`1`]},{v:[`0`],tag:p(`boundary`,`batas`)}],vars:p([`n`,`total`,`i`],[`n`,`jumlah`,`i`]),units:[{id:`start`,ps:[4]},{id:`in`,py:[1],ps:[5],d:1,ipo:`i`},{id:`p0`,py:[2],ps:[6],d:2,ipo:`p`},{id:`loop`,py:[3],ps:[7,9],d:3,ipo:`p`},{id:`body`,py:[4],ps:[8],d:3,ipo:`p`},{id:`out`,py:[5],ps:[10],d:4,ipo:`o`},{id:`end`,ps:[11],d:5}],chart:{w:440,h:440,nodes:[{id:`start`,t:`term`,x:150,y:30,text:p(`START`,`MULAI`)},{id:`in`,t:`io`,x:150,y:100,text:p(`READ n`,`READ n`)},{id:`p0`,t:`proc`,x:150,y:170,w:200,text:p(`total ← 0`,`jumlah ← 0`)},{id:`loop`,t:`prep`,x:150,y:252,text:p(`i ← 1 TO n`,`i ← 1 TO n`)},{id:`body`,t:`proc`,x:150,y:340,w:200,text:p(`total ← total + i`,`jumlah ← jumlah + i`)},{id:`out`,t:`io`,x:345,y:340,w:170,text:p(`DISPLAY total`,`DISPLAY jumlah`)},{id:`end`,t:`term`,x:345,y:412,text:p(`END`,`SELESAI`)}],edges:[{f:`start`,t:`in`},{f:`in`,t:`p0`},{f:`p0`,t:`loop`},{f:`loop`,t:`body`,label:`yes`},{f:`body`,t:`loop`,to:`left`,pts:[[150,392],[28,392],[28,252]]},{f:`loop`,t:`out`,from:`right`,pts:[[345,252]],label:`no`},{f:`out`,t:`end`}]}}],te=`predikat`,ne=[{n:1,name:p(`Problem`,`Masalah`)},{n:2,name:p(`IPO`,`IPO`)},{n:3,name:p(`Descriptive`,`Deskriptif`)},{n:4,name:p(`Pseudocode`,`Pseudocode`)},{n:5,name:p(`Flowchart`,`Flowchart`)},{n:6,name:p(`Python`,`Python`)},{n:7,name:p(`Trace table`,`Trace table`)}],re={2:p(`What goes in, what has to be worked out, and what comes out?`,`Apa masukannya, apa yang harus diolah, dan apa keluarannya?`),3:p(`Write the steps in plain words, in order. Is every step clear, and does the list end?`,`Tulis langkahnya dengan kalimat biasa, berurutan. Apakah tiap langkah jelas, dan apakah daftarnya berakhir?`),4:p(`Rewrite the steps with READ, ←, IF … THEN … ELSE … ENDIF, FOR … DO … ENDFOR and DISPLAY.`,`Tulis ulang langkahnya dengan READ, ←, IF … THEN … ELSE … ENDIF, FOR … DO … ENDFOR, dan DISPLAY.`),5:p(`Which symbol does each pseudocode line become: terminal, parallelogram, rectangle, diamond or hexagon?`,`Setiap baris pseudocode menjadi simbol apa: terminal, jajar genjang, persegi panjang, belah ketupat, atau segi enam?`),6:p(`Translate line by line: READ → input(), ← → =, IF … THEN → if …:, DISPLAY → print().`,`Terjemahkan baris demi baris: READ → input(), ← → =, IF … THEN → if …:, DISPLAY → print().`),7:p(`Predict the output for every test value, including the boundary case, before you run it.`,`Tebak keluaran untuk setiap data uji, termasuk kasus batas, sebelum menjalankannya.`)},ie={term:p(`terminal`,`terminal`),io:p(`parallelogram (input/output)`,`jajar genjang (input/output)`),proc:p(`rectangle (process)`,`persegi panjang (proses)`),dec:p(`diamond (decision)`,`belah ketupat (keputusan)`),prep:p(`hexagon (preparation: counted loop)`,`segi enam (persiapan: perulangan terhitung)`)},g={term:[140,38],io:[220,44],proc:[220,44],dec:[190,72],prep:[200,50]},_=14,ae=e=>({w:e.w??g[e.t][0],h:e.h??g[e.t][1]});function v(e,t){let{w:n,h:r}=ae(e),i=e.t===`io`?_/2:0;return t===`top`?[e.x,e.y-r/2]:t===`left`?[e.x-n/2+i,e.y]:t===`right`?[e.x+n/2-i,e.y]:[e.x,e.y+r/2]}function oe(e,t){let n=e.get(t.f),r=e.get(t.t),i=v(n,t.from||`bottom`),a=v(r,t.to||(t.pts&&t.pts.length&&t.pts[t.pts.length-1][1]===r.y?t.pts[t.pts.length-1][0]<r.x?`left`:`right`:`top`)),o=[i,...t.pts||[],a];return!t.pts&&i[0]!==a[0]&&i[1]!==a[1]&&o.splice(1,0,t.from===`right`||t.from===`left`?[a[0],i[1]]:[i[0],a[1]]),o}function se(e){let{w:t,h:n}=ae(e),r=e.x-t/2,i=e.x+t/2,a=e.y-n/2,o=e.y+n/2,s=e=>`<polygon class="ptp-shape" points="${e.map(e=>e.map(e=>+e.toFixed(1)).join(`,`)).join(` `)}"/>`;return e.t===`term`?`<rect class="ptp-shape" x="${r}" y="${a}" width="${t}" height="${n}" rx="${n/2}"/>`:e.t===`proc`?`<rect class="ptp-shape" x="${r}" y="${a}" width="${t}" height="${n}" rx="3"/>`:e.t===`io`?s([[r+_,a],[i,a],[i-_,o],[r,o]]):e.t===`dec`?s([[e.x,a],[i,e.y],[e.x,o],[r,e.y]]):s([[r+18,a],[i-18,a],[i,e.y],[i-18,o],[r+18,o],[r,e.y]])}var y=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),ce=e=>e.map((e,t)=>(t?`L`:`M`)+e[0]+` `+e[1]).join(` `),le=()=>e()===`id`?`id`:`en`,b=e=>e==null?``:typeof e==`string`?e:e[le()],x=e=>b(e).replace(/\n+$/,``),S=/^(\s*)(if|elif|while|for)\b(.*?):\s*(#.*)?$/,ue=e=>e.match(/^\s*/)[0].length,C=e=>e.trim()!==``&&!e.trim().startsWith(`#`);function de(e,t){let n=S.exec(e[t-1]||``);if(!n)return null;let r=n[1].length,i=e.length+1;for(let n=t+1;n<=e.length;n++)if(C(e[n-1])&&ue(e[n-1])<=r){i=n;break}let a=n[2],o=n[3].trim(),s=null;if(a===`for`){let e=/^(\w+)\s+in\s+/.exec(o);s=e?e[1]:null}return{kw:a,cond:o,bodyStart:t+1,bodyEnd:i,loopVar:s}}var w=e=>{let t=new Map;for(let n of e?.frames?.[0]?.locals||[])[`function`,`module`].includes(n.value.type)||n.value.typeName===`type`||t.set(n.name,n.value);return t};function fe(e,t){return{src:e,lines:e.replace(/\r\n?/g,`
`).split(`
`),inputs:t.slice(),hist:[],run:null,cerr:null,segs:[],finished:!1}}function pe(e){if(e.finished)return!1;if(!e.hist.length){e.hist.push({kind:`start`});let t=l(e.src,{filename:`main.py`});return t.ok?e.run=u(t.program,{inputs:e.inputs,echoInput:!0,eofWhenExhausted:!0,maxSteps:m,seed:0,locale:le()}):e.cerr=t.error,!0}if(e.cerr)return e.segs.push({text:e.cerr.traceback+`
`,kind:`err`}),e.hist.push({kind:`error`,error:e.cerr,compile:!0}),e.finished=!0,!0;let t=e.hist[e.hist.length-1],n=[];for(let r=0;r<1e6;r++){let r=e.run.step();if(r.kind===`output`)e.segs.push({text:r.text,kind:r.echo?`in`:r.stderr?`err`:`out`}),r.echo||n.push({t:`out`,text:r.text});else if(r.kind===`input`){let e=n[n.length-1];r.prompt&&e&&e.t===`out`&&e.text===r.prompt&&n.pop(),n.push({t:`in`,text:r.value==null?``:String(r.value)})}else{if(r.kind===`line`||r.kind===`done`||r.kind===`exception`){if(t.kind===`line`&&(t.io=n),r.kind===`line`){let n={kind:`line`,line:r.line,snap:e.run.snapshot()};return t.kind===`line`&&t.hdr&&(t.branch=r.line>=t.hdr.bodyStart&&r.line<t.hdr.bodyEnd?`yes`:`no`),n.hdr=de(e.lines,r.line),e.hist.push(n),!0}if(r.kind===`done`)t.kind===`line`&&t.hdr&&(t.branch=`no`),e.hist.push({kind:`done`,snap:e.run.snapshot()});else{let t=e.segs[e.segs.length-1];he(r.error)&&t&&!t.text.endsWith(`
`)&&e.segs.push({text:`
`,kind:`out`}),e.segs.push({text:(r.error.traceback||`${r.error.type}: ${r.error.message}`)+`
`,kind:`err`}),e.hist.push({kind:`error`,error:r.error,snap:e.run.snapshot()})}return e.finished=!0,!0}if(e.run.status===`waiting-input`||e.run.status===`done`||e.run.status===`error`)break}}return e.finished=!0,e.hist.push({kind:`error`,error:{type:`RuntimeError`,message:`stopped`,line:null,traceback:`RuntimeError: stopped`}}),!0}var me=e=>e.hist.flatMap(e=>(e.io||[]).filter(e=>e.t===`out`).map(e=>e.text)).join(``),T=(e,t)=>e.length>t?e.slice(0,t-1)+`…`:e,he=e=>!!e&&e.simulatorLimit===!0,ge=e=>e?.limitKind===`iterations`?f(`${e.limit} loop rounds inside one step`,`${e.limit} putaran di dalam satu langkah`):f(`${e?.limit??m} steps`,`${e?.limit??m} langkah`),_e=(e,t,n)=>!!e&&t===e.out&&(n?!!e.err&&e.err.type===n.type&&e.err.message===n.message:!e.err);function ve(e,t){let n=fe(e,t),r=0;for(;pe(n)&&r++<20010;);return n}var E=`
.ptp{padding:12px;display:grid;gap:12px;min-width:0}
.ptp-nav{display:flex;flex-wrap:wrap;gap:5px;align-items:center}
.ptp-logo{flex:none;fill:none;stroke:var(--accent,var(--color-accent));stroke-width:1.6;stroke-linejoin:round}
.ptp-chip{display:inline-flex;align-items:center;gap:5px;min-height:36px;padding:3px 9px 3px 4px;border-radius:999px;border:1px solid var(--color-border);background:var(--color-surface-2);color:var(--color-fg);font:inherit;font-size:var(--type-sm);cursor:pointer;line-height:1.2}
.ptp-chip .ptp-n{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--color-surface);border:1px solid var(--color-border);font-weight:700;font-size:12px}
.ptp-chip[aria-current="step"]{border-color:var(--accent,var(--color-accent));background:color-mix(in srgb,var(--accent,var(--color-accent)) 16%,var(--color-surface));font-weight:600}
.ptp-chip[aria-current="step"] .ptp-n{background:var(--accent,var(--color-accent));border-color:var(--accent,var(--color-accent));color:#fff}
.ptp-chip.is-veiled{border-style:dashed;color:var(--color-muted)}
.ptp-chip:focus-visible,.ptp-link:focus-visible,.ptp-tbtn:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:2px}
.ptp-next{margin-left:auto}
.ptp-next[hidden]{display:none}
.ptp-plan{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.ptp--wide .ptp-plan{grid-template-columns:repeat(3,minmax(0,1fr))}
.ptp-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px;padding:10px 12px;min-width:0;font-size:var(--type-sm);line-height:1.45;scroll-margin:16px}
.ptp--wide .ptp-card.is-tab{box-shadow:0 0 0 2px color-mix(in srgb,var(--accent,var(--color-accent)) 55%,transparent)}
.ptp-card:focus{outline:none}
.ptp-card:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:2px}
.ptp-h{display:flex;align-items:center;gap:8px;margin:0 0 8px;font-size:var(--type-sm);font-weight:700;line-height:1.3}
.ptp-h .ptp-n{display:inline-grid;place-items:center;flex:none;width:22px;height:22px;border-radius:50%;background:var(--accent,var(--color-accent));color:#fff;font-size:12px}
.ptp-h small{font-weight:400;color:var(--color-muted)}
.ptp-card p{margin:0 0 6px}
.ptp-kv{display:grid;gap:2px}
.ptp-kv b{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--color-muted)}
.ptp-kv ul{margin:0 0 4px;padding-left:18px}
.ptp-note{color:var(--color-fg);border-left:3px solid var(--color-warn);padding:2px 0 2px 8px;margin-top:6px!important}
.ptp-src{color:var(--color-muted);font-size:12px;margin-top:6px!important}
.ptp-ipo{width:100%;border-collapse:collapse}
.ptp-ipo th,.ptp-ipo td{border-top:1px solid var(--color-border);padding:6px 4px;vertical-align:top;text-align:left}
.ptp-ipo tr:first-child th,.ptp-ipo tr:first-child td{border-top:0}
.ptp-ipo th{width:5.6em}
.ptp-link{font:inherit;color:inherit;text-align:left;background:none;border:1px solid transparent;border-radius:6px;padding:2px 5px;margin:-2px -5px;cursor:pointer;line-height:inherit}
.ptp-link:hover{background:var(--color-surface-2)}
.ptp-link.is-match{background:rgba(96,165,250,.20);border-color:#60a5fa}
.ptp-link.is-cur{background:rgba(251,191,36,.24);border-color:#d97706}
.ptp-ipo .ptp-link{font-weight:700}
.ptp-desc{display:grid;gap:3px}
.ptp-mono{font-family:var(--font-mono);font-size:12.5px;overflow-wrap:anywhere}
.ptp-cmt{color:var(--color-muted);font-style:italic}
.ptp-desc ol{margin:2px 0 0;padding:0;list-style:none;display:grid;gap:3px}
.ptp-desc ol .ptp-link{display:grid;grid-template-columns:1.5em minmax(0,1fr);width:calc(100% + 10px)}
.ptp-desc ol .ptp-link>span:first-child{color:var(--color-muted)}
.ptp-live{display:grid;gap:8px;padding:8px 10px;border-radius:10px;background:var(--color-surface-2);border:1px solid var(--color-border)}
.ptp-runbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ptp-runbar .btn{min-height:36px}
.ptp--narrow .ptp-runbar .btn{padding:8px 11px}
.ptp-sync{font-size:var(--type-sm);line-height:1.45;min-height:2.9em}
.ptp-sync b{font-weight:600}
.ptp-sync .ptp-vars{font-family:var(--font-mono);font-size:12.5px;color:var(--color-muted);overflow-wrap:anywhere}
.ptp-run{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.ptp--wide .ptp-run{grid-template-columns:minmax(0,1.22fr) minmax(0,1fr);grid-template-rows:auto auto 1fr}
.ptp--wide .ptp-c4{grid-column:1;grid-row:1}
.ptp--wide .ptp-c5{grid-column:2;grid-row:1/span 3}
.ptp--wide .ptp-c6{grid-column:1;grid-row:2}
.ptp--wide .ptp-con{grid-column:1;grid-row:3;align-self:start}
.ptp-con{min-width:0}
.ptp-fc{display:block;width:100%;height:auto;margin:0 auto;border-radius:8px;background:#0b1220}
.ptp-fc text{font:15px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;fill:#e2e8f0;pointer-events:none}
.ptp-fc .ptp-node{cursor:pointer;outline:none}
.ptp-fc .ptp-shape{fill:#131c31;stroke:#64748b;stroke-width:2;transition:fill .2s,stroke .2s}
.ptp-fc .ptp-node:hover .ptp-shape{stroke:#cbd5e1}
.ptp-fc .ptp-node:focus-visible .ptp-ring{stroke:#f8fafc;stroke-width:2.5;stroke-dasharray:5 4;fill:none}
.ptp-fc .ptp-ring{fill:none;stroke:none}
.ptp-fc .is-visited .ptp-shape{fill:#1b2740;stroke:#94a3b8}
.ptp-fc .is-match .ptp-shape{fill:rgba(96,165,250,.22);stroke:#60a5fa;stroke-width:2.5}
.ptp-fc .is-cur .ptp-shape{fill:rgba(251,191,36,.22);stroke:#fbbf24;stroke-width:3.5}
.ptp-fc .is-err .ptp-shape{fill:rgba(248,113,113,.22);stroke:#f87171;stroke-width:3.5}
.ptp-fc .ptp-edge path{fill:none;stroke:#475569;stroke-width:2;transition:stroke .2s}
.ptp-fc .ptp-edge.is-taken path{stroke:#cbd5e1;stroke-width:2.6}
.ptp-fc .ptp-edge.is-cur path{stroke:#fbbf24;stroke-width:3.4}
.ptp-fc .ptp-lbl rect{fill:#0b1220;stroke:#475569;stroke-width:1}
.ptp-fc .ptp-lbl text{font-size:12.5px;font-weight:600;fill:#cbd5e1}
.ptp-fc .ptp-lbl.is-taken rect{fill:#334155;stroke:#cbd5e1}
.ptp-fc .ptp-lbl.is-cur rect{fill:#fbbf24;stroke:#fbbf24}
.ptp-fc .ptp-lbl.is-cur text{fill:#1f1300}
.ptp-fc .ptp-token{fill:#fbbf24;stroke:#0b1220;stroke-width:2;pointer-events:none}
.ptp-legend{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:6px;font-size:12px;color:var(--color-muted)}
.ptp-legend i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:4px;vertical-align:-2px;border:2px solid}
.ptp-scroll{overflow:auto;max-height:340px;border:1px solid var(--color-border);border-radius:8px}
.ptp-scroll:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:2px}
.ptp-tbl{width:100%;border-collapse:collapse;font-size:13px}
.ptp-tbl th,.ptp-tbl td{padding:4px 8px;border-bottom:1px solid var(--color-border);text-align:left;vertical-align:top;white-space:nowrap}
.ptp-tbl thead th{position:sticky;top:0;background:var(--color-surface-2);font-weight:600;z-index:1}
.ptp-tbl td.v{font-family:var(--font-mono);font-size:12.5px}
.ptp-tbl td.wrap{white-space:pre-wrap;min-width:9em}
.ptp-tbl td.wrap2{white-space:normal;min-width:10em;max-width:16em}
.ptp-tbl td.chg{background:color-mix(in srgb,#f59e0b 24%,transparent);font-weight:600}
.ptp-tbl td.dim,.ptp-tbl span.dim{color:var(--color-muted)}
.ptp-tbl .ok{color:var(--color-ok);font-weight:700}
.ptp-tbl .bad{color:var(--color-danger);font-weight:700}
.ptp-tbl tr.is-sel td{background:color-mix(in srgb,var(--accent,var(--color-accent)) 10%,transparent)}
.ptp-tbtn{font:inherit;font-family:var(--font-mono);font-size:12.5px;padding:2px 8px;border-radius:6px;border:1px solid var(--color-border);background:var(--color-surface-2);color:var(--color-fg);cursor:pointer;white-space:nowrap}
.ptp-sub{margin:10px 0 6px;font-size:var(--type-sm);font-weight:700}
.ptp-sub small{font-weight:400;color:var(--color-muted)}
.ptp-hint{color:var(--color-muted);font-size:12px;margin:6px 0 0}
.ptp-veil{display:none;padding:10px;border:1px dashed var(--color-border);border-radius:8px;color:var(--color-muted)}
.ptp-veil p{margin:0 0 8px}
.ptp-card.is-veiled>.ptp-body{display:none}
.ptp-card.is-veiled>.ptp-veil{display:block}
.ptp--narrow .ptp-live{order:-1}
.ptp--narrow .ptp-nav{order:-2}
.ptp--narrow .ptp-card[data-stage]:not(.is-tab){display:none}
.ptp--narrow:not(.show-con) .ptp-con{display:none}
.ptp--narrow .ptp-plan:not(.has-tab){display:none}
.ptp--narrow .ptp-run:not(.has-tab){display:none}
.ptp-ctl-group{display:grid;gap:6px}
.ptp-ctl-label{font-size:var(--type-sm);color:var(--color-muted)}
.ptp-tests{display:flex;flex-wrap:wrap;gap:6px}
.ptp-tests .btn{min-height:36px;font-family:var(--font-mono);font-size:13px}
.ptp-tests .btn[aria-pressed="true"]{border-color:var(--accent,var(--color-accent));background:color-mix(in srgb,var(--accent,var(--color-accent)) 16%,var(--color-surface))}
.ptp-tests .btn small{font-family:var(--font-sans);color:var(--color-muted);margin-left:4px}
.ptp-inrow{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 8px;align-items:center}
.ptp-inrow label{font-family:var(--font-mono);font-size:13px}
.ptp-inrow input{font:inherit;font-family:var(--font-mono);font-size:16px;padding:6px 8px;border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-fg);min-width:0;width:100%}
.ptp-inrow input:focus-visible{outline:3px solid color-mix(in srgb,var(--accent,var(--color-accent)) 65%,transparent);outline-offset:1px}
.ptp-msg{font-size:var(--type-sm);line-height:1.45;padding:8px 10px;border-radius:8px;background:var(--color-surface-2);border:1px solid var(--color-border)}
.ptp-msg:empty{display:none}
.ptp-msg.warn{border-color:var(--color-warn)}
.ptp-msg.ok{border-color:var(--color-ok)}
.ptp-msg.bad{border-color:var(--color-danger)}
@media (max-width:480px){.ptp{padding:10px 8px}.ptp-card{padding:9px 10px}}
`;function ye(){if(document.getElementById(`ptp-styles`))return;let e=document.createElement(`style`);e.id=`ptp-styles`,e.textContent=E,document.head.appendChild(e)}function D(e){ye();let l=`ptp`+Math.random().toString(36).slice(2,8),u=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches,m=ee.find(e=>e.key===te),g=new Map,_=new Map,v=new Map,S=new Map,ue=0,C=`original`,E=null,D=!1,be=0,xe=2,O=null,k=1,A=7,j=!1,M=!0,N=0,P=[],Se=null,F=null,I=document.createElement(`div`);I.className=`ptp ptp--wide`,e.appendChild(I);let L=document.createElement(`div`);L.className=`sim-controls`,L.style.alignContent=`start`,e.appendChild(L);let R=document.createElement(`nav`);R.className=`ptp-nav`,R.setAttribute(`aria-label`,f(`Translation stages`,`Tahap translasi`)),R.insertAdjacentHTML(`afterbegin`,`<svg class="ptp-logo" viewBox="0 0 44 20" width="35" height="16" aria-hidden="true" focusable="false">
    <rect x="1" y="5" width="10" height="10" rx="2"/><path d="M11 10h4"/><path d="M21 4l6 6-6 6-6-6z"/><path d="M27 10h4"/><path d="M33 5h10l-2 10H31z"/></svg>`);let Ce=new Map;for(let e of ne){let t=document.createElement(`button`);t.type=`button`,t.className=`ptp-chip`,t.innerHTML=`<span class="ptp-n" aria-hidden="true">${e.n}</span><span>${y(b(e.name))}</span>`,t.setAttribute(`aria-label`,`${f(`Stage`,`Tahap`)} ${e.n}: ${b(e.name)}`),t.addEventListener(`click`,()=>tt(e.n,!0)),Ce.set(e.n,t),R.appendChild(t)}let z=document.createElement(`button`);z.type=`button`,z.className=`btn ptp-next`,z.addEventListener(`click`,()=>tt(Math.min(7,(j?A:k)+1),!0)),R.appendChild(z);let we=(e,t=``)=>{let n=document.createElement(`section`);n.className=`ptp-card `+t,n.dataset.stage=String(e),n.tabIndex=-1;let r=document.createElement(`h3`);r.className=`ptp-h`,r.id=`${l}-h${e}`,n.setAttribute(`aria-labelledby`,r.id);let i=document.createElement(`div`);i.className=`ptp-body`;let a=document.createElement(`div`);return a.className=`ptp-veil`,n.append(r,i,a),{el:n,h:r,body:i,veil:a}},Te=document.createElement(`div`);Te.className=`ptp-plan`;let B=new Map;for(let e of[1,2,3]){let t=we(e);B.set(e,t),Te.appendChild(t.el)}let Ee=document.createElement(`div`);Ee.className=`ptp-live`;let De=document.createElement(`div`);De.className=`ptp-runbar`;let Oe=(e,t,n)=>o({label:e,primary:t,onClick:n}).el,ke=Oe(f(`Step`,`Langkah`),!1,()=>{X(),O=null,gt()}),Ae=Oe(f(`Run`,`Jalankan`),!0,()=>{O=null,vt()}),je=Oe(f(`Back`,`Mundur`),!1,()=>{X(),O=null,_t()}),Me=Oe(f(`Reset`,`Ulang`),!1,()=>{X(),O=null,Y(),$()});De.append(ke,Ae,je,Me);let Ne=document.createElement(`div`);Ne.className=`ptp-sync`,Ne.setAttribute(`role`,`status`),Ne.setAttribute(`aria-live`,`polite`),Ee.append(De,Ne);let Pe=document.createElement(`div`);Pe.className=`ptp-run`;for(let e of[4,5,6]){let t=we(e,`ptp-c`+e);B.set(e,t),Pe.appendChild(t.el)}let Fe=document.createElement(`div`);Fe.className=`ptp-con`,Pe.appendChild(Fe);let Ie=we(7);B.set(7,Ie),I.append(R,Te,Ee,Pe,Ie.el);let V=d({value:``,language:`pseudo`,editable:!1,minLines:7,maxLines:16,ariaLabel:f(`Pseudocode`,`Pseudocode`),onGutterClick:e=>Z(`ps`,e)}),H=d({value:``,language:`python`,editable:!0,minLines:6,maxLines:14,title:`main.py`,ariaLabel:f(`Python program (editable)`,`Program Python (bisa diedit)`),onChange:mt,onGutterClick:e=>Z(`py`,e)}),Le=c({minLines:3,maxLines:9,title:f(`Output`,`Keluaran`),ariaLabel:f(`Program output`,`Keluaran program`),placeholder:f(`Press Step or Run: the output appears here.`,`Tekan Langkah atau Jalankan: keluaran muncul di sini.`)});Fe.appendChild(Le.el);let Re=null,ze=()=>{if(document.activeElement!==H.textarea)return;let e=H.cursorLine;e&&e!==Re&&(Re=e,g.has(e)&&J()&&Z(`py`,e,!0))};H.textarea?.addEventListener(`keyup`,ze),H.textarea?.addEventListener(`mouseup`,ze),H.textarea?.addEventListener(`blur`,()=>{Re=null});let U=document.createElement(`div`),Be=a({label:f(`Problem`,`Masalah`),key:`preset`,value:m.key,options:ee.map(e=>({value:e.key,label:b(e.name)})),onChange:e=>{let t=ee.find(t=>t.key===e);t&&dt(t)}});L.appendChild(Be.el);let Ve=document.createElement(`div`);Ve.className=`ptp-ctl-group`,Ve.setAttribute(`role`,`group`),Ve.setAttribute(`aria-label`,f(`Test data`,`Data uji`));let He=document.createElement(`div`);He.className=`ptp-ctl-label`,He.textContent=f(`Test data (pick one, or type your own values)`,`Data uji (pilih satu, atau ketik nilai sendiri)`);let Ue=document.createElement(`div`);Ue.className=`ptp-tests`;let We=document.createElement(`div`);We.className=`ptp-inrow`,Ve.append(He,Ue,We),L.appendChild(Ve);let Ge=[],Ke=r({label:f(`Run speed (steps per second)`,`Kecepatan (langkah per detik)`),key:`speed`,min:1,max:10,step:1,value:xe,onInput:e=>{xe=e}});L.appendChild(Ke.el);let qe=o({label:f(`Test all data`,`Uji semua data`),primary:!0,onClick:()=>Et()});L.appendChild(i(qe));let Je=o({label:f(`Insert a common mistake`,`Sisipkan kesalahan umum`),onClick:()=>pt(`mistake`)}),Ye=o({label:f(`Restore original code`,`Pulihkan kode asli`),onClick:()=>pt(`original`)});L.appendChild(i(Je,Ye));let Xe=n({label:f(`Reveal the stages one at a time`,`Buka tahap satu per satu`),key:`guided`,value:!1,onChange:e=>{j=e,A=e?1:7,e&&(k=1),K()}});L.appendChild(Xe.el);let W=document.createElement(`div`);W.className=`ptp-msg`,W.setAttribute(`role`,`status`),W.setAttribute(`aria-live`,`polite`),L.appendChild(W);let G=(e,t=``)=>{W.textContent=e||``,W.className=`ptp-msg`+(t?` `+t:``)},Ze=s({title:`Problem-to-program lab`,filename:`problem-to-program-data.csv`,columns:[{key:`preset`,label:`Problem`},{key:`code`,label:`Code`},{key:`input`,label:`Input`},{key:`output`,label:`Output`},{key:`branch`,label:`Branch taken`},{key:`steps`,label:`Steps`},{key:`expected`,label:`As expected`}],procedure:[`Pick a problem and read stages 1-3 (problem, IPO, descriptive steps).`,`Click symbols in the flowchart to see the matching pseudocode and Python lines.`,`Run each test value, including the boundary case, and record each run.`,`Insert the common mistake, run the tests again and record which test catches it.`],predict:`Before running: which test value is the boundary case, and which branch should it take?`,source:()=>Se});L.appendChild(Ze.el);let Qe=0,$e=()=>{Qe=0;let e=I.clientWidth;if(!e)return;let t=e>=720;t!==M&&(M=t,K())},et=new ResizeObserver(()=>{Qe||(Qe=requestAnimationFrame($e))});et.observe(I);function K(){I.classList.toggle(`ptp--wide`,M),I.classList.toggle(`ptp--narrow`,!M),I.classList.toggle(`show-con`,k>=4&&k<=6),Te.classList.toggle(`has-tab`,k<=3),Pe.classList.toggle(`has-tab`,k>=4&&k<=6);for(let[e,t]of B)t.el.classList.toggle(`is-tab`,e===k),t.el.classList.toggle(`is-veiled`,e>A);for(let[e,t]of Ce)e===k?t.setAttribute(`aria-current`,`step`):t.removeAttribute(`aria-current`),t.classList.toggle(`is-veiled`,e>A);j&&A<7?(z.hidden=!1,z.textContent=f(`Reveal next stage`,`Buka tahap berikutnya`)+` ▸`):!M&&k<7?(z.hidden=!1,z.textContent=f(`Next stage`,`Tahap berikutnya`)+` ▸`):z.hidden=!0}function tt(e,t){j&&e>A&&(A=e),k=e,K(),t&&M&&B.get(e).el.scrollIntoView({block:`nearest`,behavior:u?`auto`:`smooth`})}function nt(e){let t=B.get(e).veil;t.innerHTML=``;let n=document.createElement(`p`);n.textContent=`${f(`Hidden for now. Think first:`,`Disembunyikan dulu. Pikirkan dulu:`)} ${b(re[e])}`;let r=o({label:`${f(`Reveal stage`,`Buka tahap`)} ${e}`,onClick:()=>{A=Math.max(A,e),k=e,K(),B.get(e).el.focus({preventScroll:!0})}});t.append(n,r.el)}function q(e,t){let n=B.get(e);n.h.innerHTML=`<span class="ptp-n" aria-hidden="true">${e}</span><span>${y(b(ne[e-1].name))}</span>${t?` <small>${y(t)}</small>`:``}`}function rt(){let e=m;q(1,f(`understand it`,`pahami`));let t=B.get(1).body;t.innerHTML=`<p>${y(b(e.problem))}</p>
      <div class="ptp-kv"><b>${f(`Known (input)`,`Diketahui (input)`)}</b><ul>${b(e.known).map(e=>`<li>${y(e)}</li>`).join(``)}</ul>
      <b>${f(`Asked (output)`,`Ditanya (output)`)}</b><ul>${b(e.asked).map(e=>`<li>${y(e)}</li>`).join(``)}</ul></div>
      ${e.note?`<p class="ptp-note">${y(b(e.note))}</p>`:``}
      <p class="ptp-src">${y(b(e.source))}</p>`,q(2,f(`input, process, output`,`input, proses, output`));let n=B.get(2).body,r={i:`Input`,p:f(`Process`,`Proses`),o:`Output`};n.innerHTML=`<table class="ptp-ipo"><tbody>${[`i`,`p`,`o`].map(t=>`<tr><th scope="row"><button type="button" class="ptp-link" data-ipo="${t}">${r[t]}</button></th><td>${y(b(e.ipo[t]))}</td></tr>`).join(``)}</tbody></table>
      <p class="ptp-hint">${f(`Click Input, Process or Output to see where it ends up in every notation.`,`Klik Input, Proses, atau Output untuk melihat letaknya di setiap notasi.`)}</p>`,n.querySelectorAll(`[data-ipo]`).forEach(e=>e.addEventListener(`click`,()=>Z(`ipo`,e.dataset.ipo))),q(3,f(`steps in plain words`,`langkah dalam kalimat`));let i=B.get(3).body;i.innerHTML=`<div class="ptp-desc"><div class="ptp-mono">${y(b(e.desc.title))}</div>
      <div class="ptp-mono ptp-cmt">${y(b(e.desc.comment))}</div>
      <div class="ptp-mono">${y(b(e.desc.decl))}</div>
      <div class="ptp-mono">${f(`Description:`,`Deskripsi:`)}</div>
      <ol>${b(e.desc.steps).map((e,t)=>`<li><button type="button" class="ptp-link" data-d="${t+1}"><span>${t+1}.</span><span>${y(e)}</span></button></li>`).join(``)}</ol></div>`,i.querySelectorAll(`[data-d]`).forEach(e=>e.addEventListener(`click`,()=>Z(`d`,Number(e.dataset.d))))}function it(){let e=m;q(4,f(`code-like notation`,`notasi mirip kode`));let t=B.get(4).body;t.contains(V.el)||t.appendChild(V.el),V.value=b(e.pseudo),q(5,f(`standard symbols`,`simbol baku`));let n=B.get(5).body;n.contains(U)||n.appendChild(U),at(),q(6,f(`runs in the browser; you may edit it`,`berjalan di browser; boleh diedit`));let r=B.get(6).body;r.contains(H.el)||r.appendChild(H.el),H.value=x(e.py),q(7,f(`test data and step-by-step values`,`data uji dan nilai langkah demi langkah`));for(let e of[2,3,4,5,6,7])nt(e)}function at(){let e=m.chart;S=new Map(e.nodes.map(e=>[e.id,e]));let t=(e,t)=>`<marker id="${l}-${e}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${t}"/></marker>`,n=`<svg class="ptp-fc" viewBox="0 0 ${e.w} ${e.h}" style="max-width:${Math.round(e.w*1.18)}px" role="group" aria-label="${y(f(`Flowchart. Each symbol is a button that shows the matching lines.`,`Flowchart. Setiap simbol adalah tombol yang menunjukkan baris yang cocok.`))}">
      <defs>${t(`a0`,`#475569`)}${t(`a1`,`#cbd5e1`)}${t(`a2`,`#fbbf24`)}</defs>`;n+=`<g class="ptp-edges">`,e.edges.forEach((e,t)=>{let r=oe(S,e);n+=`<g class="ptp-edge" data-e="${t}"><path d="${ce(r)}" marker-end="url(#${l}-a0)"/></g>`}),n+=`</g>`,e.edges.forEach((e,t)=>{if(!e.label)return;let r=oe(S,e),[i,a]=r[0],[o,s]=r[1],c=Math.abs(s-a)<1,l=e.label===`yes`?f(`Yes`,`Ya`):f(`No`,`Tidak`),u=l.length*7.6+11,d,p;c?(d=i+Math.sign(o-i)*Math.max(u/2+2,Math.min(24,Math.abs(o-i)/2)),p=a-13):(d=e.ls===`left`?i-8-u/2:i+8+u/2,p=a+15),n+=`<g class="ptp-lbl" data-l="${t}"><rect x="${(d-u/2).toFixed(1)}" y="${p-9}" width="${u.toFixed(1)}" height="18" rx="9"/><text x="${d.toFixed(1)}" y="${p}" text-anchor="middle" dominant-baseline="central">${y(l)}</text></g>`});for(let t of e.nodes){let e=v.get(t.id),r=b(t.text).split(`
`),{w:i,h:a}=ae(t),o=[];e?.ps?.length&&o.push(`${f(`pseudocode line`,`baris pseudocode`)} ${e.ps[0]}`),e?.py?.length&&o.push(`${f(`Python line`,`baris Python`)} ${e.py.slice().sort((e,t)=>e-t).join(`, `)}`);let s=`${b(ie[t.t])}: ${r.join(` `)}${o.length?` (`+o.join(`; `)+`)`:``}`;n+=`<g class="ptp-node" data-n="${t.id}" tabindex="0" role="button" aria-label="${y(s)}"><title>${y(s)}</title>${se(t)}`,n+=`<rect class="ptp-ring" x="${t.x-i/2-5}" y="${t.y-a/2-5}" width="${i+10}" height="${a+10}" rx="8"/>`;let c=t.y-(r.length-1)*18/2;n+=`<text x="${t.x}" y="${c}" text-anchor="middle" dominant-baseline="central">${r.map((e,n)=>`<tspan x="${t.x}" ${n?`dy="18"`:``}>${y(e)}</tspan>`).join(``)}</text></g>`}n+=`<circle class="ptp-token" r="6" cx="-20" cy="-20" opacity="0"/></svg>`,U.innerHTML=n+`<div class="ptp-legend" aria-hidden="true">
      <span><i style="border-color:#fbbf24;background:rgba(251,191,36,.25)"></i>${f(`runs next`,`berikutnya`)}</span>
      <span><i style="border-color:#94a3b8;background:#1b2740"></i>${f(`already run`,`sudah dijalankan`)}</span>
      <span><i style="border-color:#60a5fa;background:rgba(96,165,250,.25)"></i>${f(`matches your click`,`cocok dengan klikmu`)}</span></div>
      <p class="ptp-hint">${f(`Click (or Tab to) a symbol to see the same step in the other notations.`,`Klik (atau Tab ke) sebuah simbol untuk melihat langkah yang sama di notasi lain.`)}</p>`,U.querySelectorAll(`.ptp-node`).forEach(e=>{let t=()=>Z(`node`,e.dataset.n);e.addEventListener(`click`,t),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),t())})}),F=U.querySelector(`.ptp-token`)}function ot(){Ue.innerHTML=``,m.tests.forEach((e,t)=>{let n=document.createElement(`button`);n.type=`button`,n.className=`btn`,n.innerHTML=`${y(e.v.join(`, `))}${e.tag?`<small>${y(b(e.tag))}</small>`:``}`,n.setAttribute(`aria-pressed`,String(t===N)),n.addEventListener(`click`,()=>lt(t)),Ue.appendChild(n)}),We.innerHTML=``,Ge=m.inputs.map((e,t)=>{let n=`${l}-in${t}`,r=document.createElement(`label`);r.htmlFor=n,r.textContent=`${b(e)} =`;let i=document.createElement(`input`);return i.id=n,i.type=`text`,i.autocomplete=`off`,i.spellcheck=!1,i.setAttribute(`aria-describedby`,`${l}-inhint`),i.addEventListener(`input`,()=>{N=-1,ct(),X(),Y(),$()}),We.append(r,i),i});let e=document.createElement(`div`);e.id=`${l}-inhint`,e.className=`ptp-hint`,e.style.gridColumn=`1 / -1`,e.style.margin=`0`,e.textContent=m.inputs.length>1?f(`Each value answers one input() call, in order.`,`Setiap nilai menjawab satu panggilan input(), berurutan.`):f(`This value answers the input() call.`,`Nilai ini menjawab panggilan input().`),We.appendChild(e),st()}function st(){let e=m.tests[N];e&&Ge.forEach((t,n)=>{t.value=e.v[n]??``})}function ct(){[...Ue.children].forEach((e,t)=>e.setAttribute(`aria-pressed`,String(t===N)))}function lt(e){N=e,ct(),st(),X(),Y(),$()}let ut=()=>Ge.map(e=>e.value);function dt(e){X(),m=e,v=new Map(e.units.map(e=>[e.id,e])),g=new Map,_=new Map;for(let t of e.units){for(let e of t.py||[])g.set(e,t);for(let e of t.ps||[])_.set(e,t)}ue=ft(x(e.py)).length,C=`original`,O=null,N=0,P=[],Se=null,j&&(A=1,k=1),rt(),it(),ot(),Y(),G(``),K(),$()}let ft=e=>e.replace(/\r\n?/g,`
`).replace(/\n$/,``).split(`
`),J=()=>ft(H.value).length===ue;function pt(e){X(),H.value=x(e===`mistake`?m.mistake.py:m.py),C=e,O=null,P=[],Y(),G(e===`mistake`?b(m.mistake.note):f(`Original code restored.`,`Kode asli dipulihkan.`),e===`mistake`?`warn`:``),$()}function mt(){X();let e=H.value.replace(/\n+$/,``);C=e===x(m.py)?`original`:e===x(m.mistake.py)?`mistake`:`edited`,O=null,P=[],Y(),J()?G(C===`edited`?f(`Code edited. Run it, or test all data to compare with the expected output.`,`Kode diedit. Jalankan, atau uji semua data untuk membandingkan dengan keluaran yang diharapkan.`):``):G(f(`You changed the number of lines, so the links to the pseudocode and the flowchart are switched off. Restore the original code to switch them on again.`,`Jumlah baris berubah, sehingga tautan ke pseudocode dan flowchart dimatikan. Pulihkan kode asli untuk menyalakannya lagi.`),`warn`),$()}function Y(){E=null,It()}function ht(){return E||(E=fe(H.value,ut())),E}function gt(e=!0){if(E&&E.finished)return!1;let t=ht(),n=!M&&k<=3;(n||j&&A<6)&&(n&&(k=6),j&&(A=Math.max(A,6)),K());let r=pe(t);return t.finished&&St(t),$(e),r}function _t(){if(!E||!E.hist.length)return;let e=E.hist.length-1;for(E=fe(H.value,ut());E.hist.length<e&&pe(E););$(!1)}function vt(){D?X():(E&&E.finished&&Y(),D=!0,be=1,yt.start(),$(!1))}function X(){D&&(D=!1,yt.stop(),Nt())}let yt=t(e=>{D&&(be+=e*xe,be>=1&&(be=Math.min(be-1,1),gt(),E&&E.finished&&X()))});function bt(e,t=!1){let n=e.lines,r=[],i=new Map;for(let t of e.hist)t.kind===`line`&&t.hdr&&t.branch&&(i.has(t.line)||(i.set(t.line,[]),r.push(t.line)),i.get(t.line).push(t.branch));if(!r.length)return f(`none (a sequence)`,`tidak ada (urutan)`);let a=f(`Yes`,`Ya`),o=f(`No`,`Tidak`);return r.map(e=>{let r=i.get(e),s=xt(e,n),c=r.filter(e=>e===`yes`).length,l=de(n,e),u;return u=l&&(l.kw===`for`||l.kw===`while`)?`${a} ×${c}${r[r.length-1]===`no`?`, ${o}`:``}`:r.length>4?`${a} ×${c}, ${o} ×${r.length-c}`:r.map(e=>e===`yes`?a:o).join(`, `),t?u:`${s} ${u}`}).join(`; `)}function xt(e,t){let n=ft(x(m.py))[e-1],r=J()&&n!=null&&n.trim()===(t[e-1]||``).trim()?g.get(e):null,i=r&&S.get(r.id);if(i&&(i.t===`dec`||i.t===`prep`))return b(i.text).replace(/\n/g,` `)+(i.t===`prep`?`:`:``);let a=de(t,e);return a?`${a.kw} ${a.cond}:`:``}function St(e){let t=T(me(e).replace(/\n$/,``).split(`
`).join(` / `),200),n=e.hist[e.hist.length-1],r=wt(ut()),i=me(e),a=n.kind===`error`?n.error:null;Se={preset:m.key,code:C,input:ut().join(`, `),output:a?T(`${a.type}: ${a.message}`,200):t,branch:T(bt(e),200),steps:n.snap?.steps??0,expected:r?_e(r,i,a)?`yes`:`no`:`–`},N>=0&&(P[N]=Tt(e,r))}let Ct=new Map;function wt(e){let t=le()+`|`+m.key+`|`+JSON.stringify(e);if(!Ct.has(t)){let n=ve(x(m.py),e),r=n.hist[n.hist.length-1];Ct.set(t,{out:me(n),err:r.kind===`error`?r.error:null,path:bt(n,!0)})}return Ct.get(t)}function Tt(e,t){let n=e.hist[e.hist.length-1],r=n.kind===`error`?n.error:null,i=me(e);return{out:i,err:r,path:bt(e,!0),ok:_e(t,i,r)}}function Et(){X(),P=m.tests.map(e=>Tt(ve(H.value,e.v),wt(e.v)));let e=P.filter(e=>e.ok).length,t=m.tests.length;M?j&&(A=7,K()):(k=7,j&&(A=7),K());let n=`${f(`Tests passed`,`Data uji lolos`)}: ${e} / ${t}. `;if(e===t)n+=C===`original`?f(`The program gives the expected output for every test value, including the boundary case.`,`Program memberi keluaran yang diharapkan untuk setiap data uji, termasuk kasus batas.`):f(`Every test passes, so these tests cannot tell this code from the original.`,`Semua data uji lolos, jadi data uji ini tidak bisa membedakan kode ini dari kode asli.`);else{let e=m.tests.map((e,t)=>P[t].ok?null:e.v.join(`, `)).filter(Boolean);n+=`${f(`Failing test data`,`Data uji yang gagal`)}: ${e.join(` | `)}. ${f(`See the trace table (stage 7).`,`Lihat trace table (tahap 7).`)}`}G(n,e===t?`ok`:`bad`),$(!1)}function Z(e,t,n=!1){if(e!==`ipo`&&e!==`d`&&e!==`node`&&!J()){G(f(`The links are off because the number of Python lines changed.`,`Tautan mati karena jumlah baris Python berubah.`),`warn`);return}let r=[];e===`node`?r=[t]:e===`py`?r=g.has(t)?[g.get(t).id]:[]:e===`ps`?r=_.has(t)?[_.get(t).id]:[]:e===`d`?r=m.units.filter(e=>e.d===t).map(e=>e.id):e===`ipo`&&(r=m.units.filter(e=>e.ipo===t).map(e=>e.id));let i=O&&O.kind===e&&O.key===t;O=!r.length||i&&!n?null:{ids:new Set(r),kind:e,key:t},$(!1)}let Q=e=>e?e.repr:``;function Dt(){return E&&E.hist.length?E.hist[E.hist.length-1]:null}function Ot(e){return J()&&g.get(e)||null}function kt(){let e={visited:new Set,taken:new Set,cur:null,curEdge:null,err:null,curPs:null,curPy:null,visitedPy:new Set,visitedPs:new Set,yesNoCur:null};if(!E||!E.hist.length)return e;let t=J(),n=e=>t&&g.get(e)||null,r=m.chart.edges,i=(e,t,n)=>{let i=r.map((e,t)=>[e,t]).filter(([n])=>n.f===e&&n.t===t);return i.length?(i.find(([e])=>!e.label||e.label===n)||i[0])[1]:null},a=null,o=null,s=E.hist;s.forEach((r,c)=>{let l=null;if(r.kind===`start`)l=`start`;else if(r.kind===`line`){let e=n(r.line);l=e?e.id:null}else r.kind===`done`?l=t?`end`:null:r.kind===`error`&&(l=null);if(r.kind===`line`&&c<s.length-1&&e.visitedPy.add(r.line),l&&a&&l!==a){let t=i(a,l,o&&o.branch);t!=null&&(e.taken.add(t),c===s.length-1&&(e.curEdge=t))}l&&(c<s.length-1&&e.visited.add(l),c===s.length-1&&(e.cur=l),a=l),o=r});let c=s[s.length-1];if(c.kind===`error`&&c.error.line&&!c.compile){let t=n(c.error.line);t&&(he(c.error)?e.cur=t.id:(e.err=t.id,e.cur=null))}if(e.curEdge==null&&e.cur&&c.kind===`line`)for(let t=s.length-2;t>=0;t--){let r=s[t],a=r.kind===`start`?`start`:r.kind===`line`?n(r.line)?.id:null;if(a!==e.cur){if(a){let t=i(a,e.cur,r.branch);t!=null&&(e.curEdge=t)}break}}for(let t of e.visited)for(let n of v.get(t)?.ps||[])e.visitedPs.add(n);return e}function $(e=!1){let t=kt(),n=Dt(),r=J(),i=O?O.ids:new Set,a=[];for(let e of t.visitedPy)a.push({line:e,kind:`visited`});if(r)for(let e of i)for(let t of v.get(e)?.py||[])a.push({line:t,kind:`match`});let o=null;if(n?.kind===`line`&&(o=n.line),n?.kind===`error`&&he(n.error)&&n.error.line)o=n.error.line;else if(n?.kind===`error`&&n.error.line){let e=n.error,t={line:e.line,kind:`error`,note:e.type};n.compile&&e.col&&(t.col=Math.max(0,e.col-1),e.endCol&&(e.endLine==null||e.endLine===e.line)&&e.endCol>e.col&&(t.endCol=e.endCol-1)),a.push(t)}H.setMarks(a),H.setActiveLine(o,{scroll:!0});let s=[];if(r){for(let e of t.visitedPs)s.push({line:e,kind:`visited`});for(let e of i)for(let t of v.get(e)?.ps||[])s.push({line:t,kind:`match`})}let c=null,u=t.cur?v.get(t.cur):null;if(u&&u.ps?.length){c=u.ps[0];for(let e of u.ps.slice(1))s.push({line:e,kind:`match`})}if(t.err){let e=v.get(t.err);e?.ps?.length&&s.push({line:e.ps[0],kind:`error`,note:n.error.type})}V.setMarks(s),V.setActiveLine(c,{scroll:!0}),U.querySelectorAll(`.ptp-node`).forEach(e=>{let n=e.dataset.n;e.classList.toggle(`is-visited`,t.visited.has(n)),e.classList.toggle(`is-cur`,t.cur===n),e.classList.toggle(`is-err`,t.err===n),e.classList.toggle(`is-match`,i.has(n)),e.setAttribute(`aria-pressed`,String(i.has(n))),t.cur===n?e.setAttribute(`aria-current`,`step`):e.removeAttribute(`aria-current`)});let d=U.querySelector(`.ptp-edges`),f=d?[...d.children]:[];f.forEach(e=>{let n=Number(e.dataset.e),r=t.curEdge===n,i=t.taken.has(n);e.classList.toggle(`is-cur`,r),e.classList.toggle(`is-taken`,i&&!r),e.firstChild.setAttribute(`marker-end`,`url(#${l}-${r?`a2`:i?`a1`:`a0`})`)}),f.filter(e=>e.classList.contains(`is-taken`)).forEach(e=>d.appendChild(e)),f.filter(e=>e.classList.contains(`is-cur`)).forEach(e=>d.appendChild(e)),U.querySelectorAll(`.ptp-lbl`).forEach(e=>{let n=Number(e.dataset.l);e.classList.toggle(`is-cur`,t.curEdge===n),e.classList.toggle(`is-taken`,t.taken.has(n)&&t.curEdge!==n)}),e&&t.curEdge!=null?Lt(t.curEdge):e||It();let p=u?.d,m=u?.ipo;B.get(3).body.querySelectorAll(`[data-d]`).forEach(e=>{let t=Number(e.dataset.d);e.classList.toggle(`is-cur`,t===p),e.classList.toggle(`is-match`,[...i].some(e=>v.get(e)?.d===t)),e.setAttribute(`aria-pressed`,String(O?.kind===`d`&&O.key===t))}),B.get(2).body.querySelectorAll(`[data-ipo]`).forEach(e=>{let t=e.dataset.ipo;e.classList.toggle(`is-cur`,t===m),e.classList.toggle(`is-match`,[...i].some(e=>v.get(e)?.ipo===t)),e.setAttribute(`aria-pressed`,String(O?.kind===`ipo`&&O.key===t))}),At(),Mt(t),Pt(),Nt()}function At(){!E||!E.segs.length?Le.clear():Le.set(E.segs.map(e=>({text:e.text,kind:e.kind})))}function jt(e){let t=S.get(e);return t?`${b(ie[t.t])} “${b(t.text).replace(/\n/g,` `)}”`:``}function Mt(e){let t=Dt(),n=[],r=``;if(O&&!(E&&E.hist.length&&D)){let e=[...O.ids],t=e.map(e=>v.get(e)),r=e=>[...new Set(e)].sort((e,t)=>e-t),i=r(t.flatMap(e=>e.ps?.length?[e.ps[0]]:[])),a=J()?r(t.flatMap(e=>e.py||[])):[],o=r(t.map(e=>e.d).filter(Boolean)),s=[...new Set(t.map(e=>e.ipo).filter(Boolean))].map(e=>e===`i`?`Input`:e===`o`?`Output`:f(`Process`,`Proses`)),c=[`${e.map(jt).join(`, `)}`];i.length&&c.push(`${f(i.length>1?`pseudocode lines`:`pseudocode line`,`baris pseudocode`)} ${i.join(`, `)}`),a.length&&c.push(`${f(a.length>1?`Python lines`:`Python line`,`baris Python`)} ${a.join(`, `)}`),o.length&&c.push(`${f(o.length>1?`descriptive steps`:`descriptive step`,`langkah deskriptif`)} ${o.join(`, `)}`),s.length&&c.push(`IPO: ${s.join(`, `)}`),n.push(`<b>${f(`Same step in every notation`,`Langkah yang sama di setiap notasi`)}:</b> ${y(c.join(` ↔ `))}`)}if(!E||!E.hist.length)n.length||n.push(y(f(`Press Step to walk through the program one statement at a time, or Run to animate it. Click any symbol, step or line number to compare the notations.`,`Tekan Langkah untuk menelusuri program satu pernyataan demi satu, atau Jalankan untuk animasinya. Klik simbol, langkah, atau nomor baris untuk membandingkan notasi.`)));else if(t.kind===`start`)n.unshift(`<b>${f(`Start`,`Mulai`)}:</b> ${y(f(`the terminal symbol (START) begins the algorithm. Next: the first Python line.`,`simbol terminal (MULAI) mengawali algoritma. Berikutnya: baris Python pertama.`))}`);else if(t.kind===`line`){let e=E.hist[E.hist.length-2],i=``;if(e&&e.kind===`line`&&e.hdr&&e.branch){let n=e.branch===`yes`,r=n?f(`Yes`,`Ya`):f(`No`,`Tidak`);if(e.hdr.kw===`for`){let a=w(t.snap).get(e.hdr.loopVar);i=n?`${f(`Loop goes on`,`Perulangan berlanjut`)} (${e.hdr.loopVar} = ${y(Q(a))}) → ${f(`arrow`,`panah`)} <b>${r}</b>. `:`${f(`The range is used up`,`range sudah habis`)} → ${f(`arrow`,`panah`)} <b>${r}</b>. `}else i=`<span class="ptp-mono">${y(e.hdr.cond)}</span> ${f(`is`,`bernilai`)} <b>${n?`True`:`False`}</b> → ${f(`arrow`,`panah`)} <b>${r}</b>. `}let a=Ot(t.line),o=t.snap.steps,s=`${f(`Python line`,`baris Python`)} ${t.line}`;a&&(a.ps?.length&&(s+=` ↔ ${f(`pseudocode line`,`baris pseudocode`)} ${a.ps[0]}`),s+=` ↔ ${jt(a.id)}`),n.unshift(`${i}<b>${f(`Step`,`Langkah`)} ${o}, ${f(`runs next`,`berikutnya`)}:</b> ${y(s)}`),r=[...w(t.snap)].map(([e,t])=>`${e} = ${Q(t)}`).join(`  ·  `)}else if(t.kind===`done`){let e=me(E).replace(/\n$/,``);n.unshift(`<b>${f(`Finished (END)`,`Selesai (SELESAI)`)}.</b> ${f(`Output`,`Keluaran`)}: <span class="ptp-mono">${y(T(e.split(`
`).join(` / `),240)||`—`)}</span>. ${f(`Path`,`Jalur`)}: ${y(T(bt(E),240))}`),r=[...w(t.snap)].map(([e,t])=>`${e} = ${Q(t)}`).join(`  ·  `)}else if(t.kind===`error`){let e=t.error,i=e.line?`${f(`line`,`baris`)} ${e.line}`:``;he(e)?n.unshift(`<b>${f(`Stopped after`,`Dihentikan setelah`)} ${y(ge(e))}</b> (${y(i)}). ${y(f(`This is not a Python error: the simulator stops a program that runs this long. Real Python would keep going, probably forever, so check the loop: does its condition ever become False?`,`Ini bukan error Python: simulator menghentikan program yang berjalan selama ini. Python sungguhan akan terus berjalan, mungkin tanpa henti, jadi periksa perulangannya: apakah kondisinya pernah bernilai False?`))}`):n.unshift(`<b>${y(e.type)}</b> ${i?y(i)+`: `:``}<span class="ptp-mono">${y(e.message)}</span>${/[.?!]$/.test(e.message)?``:`.`} ${y(t.compile?f(`Python checks the syntax before running anything, so no line ran. Fix the code and press Step again.`,`Python memeriksa sintaks sebelum menjalankan apa pun, jadi belum ada baris yang berjalan. Perbaiki kode lalu tekan Langkah lagi.`):f(`The program stopped here (a runtime error). Read the last line of the traceback in the output.`,`Program berhenti di sini (runtime error). Baca baris terakhir traceback di keluaran.`))}`),t.snap&&(r=[...w(t.snap)].map(([e,t])=>`${e} = ${Q(t)}`).join(`  ·  `))}Ne.innerHTML=`<div>${n.join(`<br>`)}</div>${r?`<div class="ptp-vars">${y(r)}</div>`:``}`}function Nt(){let e=!!(E&&E.finished);ke.disabled=e,je.disabled=!E||!E.hist.length,Me.disabled=!E,Ae.textContent=D?f(`Pause`,`Jeda`):e?f(`Run again`,`Jalankan lagi`):f(`Run`,`Jalankan`),Ae.setAttribute(`aria-pressed`,String(D)),Ye.el.disabled=C===`original`,Je.el.disabled=C===`mistake`}function Pt(){let e=Ie.body,t=m,n=b(t.vars),r=`<div class="ptp-sub">${f(`Test data`,`Data uji`)} <small>${f(`(include the boundary case)`,`(sertakan kasus batas)`)}</small></div>`;r+=`<div class="ptp-scroll" tabindex="0" role="region" aria-label="${y(f(`Test data table`,`Tabel data uji`))}"><table class="ptp-tbl"><thead><tr>
      <th>${y(b(t.inputs.length>1?p(`Test data`,`Data uji`):t.inputs[0]))}</th><th>${f(`OK?`,`Cocok?`)}</th><th>${f(`Path taken`,`Jalur`)}</th><th>${f(`Expected output`,`Keluaran diharapkan`)}</th><th>${f(`Program output`,`Keluaran program`)}</th></tr></thead><tbody>`,t.tests.forEach((e,t)=>{let n=wt(e.v),i=P[t],a=n.err?`${n.err.type}`:n.out.replace(/\n$/,``),o=i?he(i.err)?`${f(`stopped after`,`dihentikan setelah`)} ${ge(i.err)} ${f(`(endless loop?)`,`(perulangan tanpa henti?)`)}`:i.err?`${i.err.type}: ${i.err.message}`:T(i.out.replace(/\n$/,``),600):``;r+=`<tr class="${t===N?`is-sel`:``}"><td><button type="button" class="ptp-tbtn" data-t="${t}" aria-label="${y(f(`Use test data`,`Pakai data uji`)+` `+e.v.join(`, `))}">${y(e.v.join(`, `))}</button>${e.tag?` <small>${y(b(e.tag))}</small>`:``}</td>
        <td>${i?i.ok?`<span class="ok">✓ ${f(`yes`,`ya`)}</span>`:`<span class="bad">✗ ${f(`no`,`tidak`)}</span>`:`<span class="dim">–</span>`}</td>
        <td>${i?y(T(i.path,120)):`<span class="dim">${y(n.path)} (${f(`expected`,`diharapkan`)})</span>`}</td><td class="v wrap">${y(a)}</td><td class="v wrap">${i?y(o):`<span class="dim">${f(`not run yet`,`belum dijalankan`)}</span>`}</td></tr>`}),r+=`</tbody></table></div><p class="ptp-hint">${f(`"Expected" comes from the original algorithm. Run a test (or Test all data) to fill in the program output.`,`"Diharapkan" berasal dari algoritma asli. Jalankan data uji (atau Uji semua data) untuk mengisi keluaran program.`)}</p>`,r+=`<div class="ptp-sub">${f(`Step-by-step trace`,`Penelusuran langkah demi langkah`)} <small>${y(E?`(${f(`input`,`masukan`)}: ${E.inputs.join(`, `)})`:``)}</small></div>`;let i=[],a=[];if(E){let e=E.hist;for(let t=0;t<e.length&&i.length<=h;t++){let r=e[t];if(r.kind!==`line`)continue;let o=e[t+1];if(!o)break;let s=o.snap||r.snap;if(i.push({r,after:s,next:o}),i.length<=h)for(let e of w(s).keys())!n.includes(e)&&!a.includes(e)&&a.push(e)}}let o=n.concat(a);r+=`<div class="ptp-scroll" tabindex="0" role="region" aria-label="${y(f(`Trace table`,`Trace table`))}"><table class="ptp-tbl"><thead><tr><th>#</th><th>Python</th><th>Pseudocode</th>${o.map(e=>`<th class="v">${y(e)}</th>`).join(``)}<th>${f(`Condition`,`Kondisi`)}</th><th>${f(`Input / output`,`Masukan / keluaran`)}</th></tr></thead><tbody>`,i.length||(r+=`<tr><td colspan="${o.length+5}" class="dim">${f(`Rows appear here as the program runs: one row per statement, with the value of every variable after it.`,`Baris muncul saat program berjalan: satu baris per pernyataan, dengan nilai setiap variabel sesudahnya.`)}</td></tr>`);let s=new Map,c=b(t.pseudo).split(`
`);i.slice(0,h).forEach(({r:e,after:t,next:n},i)=>{let a=w(t),l=Ot(e.line),u=l&&l.ps?.length?`${l.ps[0]}: ${c[l.ps[0]-1].trim()}`:``,d=``;if(e.hdr&&e.branch){let t=e.branch===`yes`,n=t?f(`Yes`,`Ya`):f(`No`,`Tidak`);d=e.hdr.kw===`for`?t?`${e.hdr.loopVar} = ${Q(a.get(e.hdr.loopVar))} → ${n}`:`${f(`range used up`,`range habis`)} → ${n}`:`${e.hdr.cond} → ${t?`True`:`False`} (${n})`}let p=(e.io||[]).map(e=>e.t===`in`?`${f(`in`,`masuk`)}: ${e.text}`:e.text.replace(/\n$/,``)).join(`
`);r+=`<tr><td>${i+1}</td><td class="v">${e.line}</td><td class="v wrap2">${y(u)}</td>`;for(let e of o){let t=a.get(e),n=s.get(e),i=t&&(!n||n.repr!==t.repr||n.type!==t.type);r+=`<td class="v${i?` chg`:t?` dim`:``}">${t?y(Q(t)):``}</td>`}r+=`<td class="v wrap2">${y(d)}</td><td class="v wrap">${y(p)}</td></tr>`,n.kind===`error`&&(r+=`<tr><td></td><td colspan="${o.length+4}" class="bad">${y(n.error.type+`: `+n.error.message)}</td></tr>`),s=a}),i.length>h&&(r+=`<tr><td colspan="${o.length+5}" class="dim">${f(`Only the first ${h} steps are shown.`,`Hanya ${h} langkah pertama yang ditampilkan.`)}</td></tr>`),E&&E.hist.length&&E.hist[E.hist.length-1].kind===`error`&&E.hist[E.hist.length-1].compile&&(r+=`<tr><td colspan="${o.length+5}" class="bad">${y(E.hist[E.hist.length-1].error.type+`: `+E.hist[E.hist.length-1].error.message)}</td></tr>`),r+=`</tbody></table></div><p class="ptp-hint">${f(`Highlighted cells changed in that step. Each row shows the values after its statement ran.`,`Sel yang disorot berubah pada langkah itu. Setiap baris menunjukkan nilai sesudah pernyataannya dijalankan.`)}</p>`;let l=[...e.querySelectorAll(`.ptp-scroll`)].map(e=>[e.scrollTop,e.scrollLeft,e.scrollHeight-e.clientHeight-e.scrollTop<4]);e.innerHTML=r,e.querySelectorAll(`.ptp-scroll`).forEach((e,t)=>{l[t]&&(e.scrollLeft=l[t][1],e.scrollTop=t===1&&l[t][2]?e.scrollHeight:l[t][0])}),e.querySelectorAll(`[data-t]`).forEach(e=>e.addEventListener(`click`,()=>lt(Number(e.dataset.t))))}let Ft=0;function It(){cancelAnimationFrame(Ft),Ft=0,F&&F.setAttribute(`opacity`,`0`)}function Lt(e){if(It(),u||!F)return;let t=oe(S,m.chart.edges[e]),n=[],r=0;for(let e=1;e<t.length;e++){let i=Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1]);n.push(i),r+=i}if(!r)return;let i=Math.min(450,700/Math.max(1,xe)),a=performance.now(),o=e=>{let s=Math.min(1,(e-a)/i),c=s*r,l=0;for(;l<n.length-1&&c>n[l];)c-=n[l],l++;let u=t[l],d=t[l+1],f=n[l]?c/n[l]:0;F.setAttribute(`cx`,(u[0]+(d[0]-u[0])*f).toFixed(1)),F.setAttribute(`cy`,(u[1]+(d[1]-u[1])*f).toFixed(1)),F.setAttribute(`opacity`,s<1?`1`:`0`),Ft=s<1?requestAnimationFrame(o):0};Ft=requestAnimationFrame(o)}return M=I.clientWidth===0||I.clientWidth>=720,dt(m),()=>{D=!1,yt.stop(),It(),et.disconnect(),cancelAnimationFrame(Qe),V.destroy(),H.destroy(),Le.destroy(),I.remove(),L.remove()}}export{D as mount};