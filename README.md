# 📚 BookTracker v2.1 - Evidencija pročitanih knjiga & Internet baza

Moderna web aplikacija za praćenje knjiga sa direktnom vezom sa internet bazom (Open Library & Google Books), prikazom slika korica, brzim izračunom postotka napretka i pametnim preporukama.

---

## 🚀 Kako pokrenuti aplikaciju lokalno na svom računaru

1. Otvorite folder na računaru: `c:\Users\pc\Downloads\BookTracker antigravity`
2. **Dvaput kliknite lijevom tipkom miša** na datoteku **`pokreni_aplikaciju.bat`** (ili direktno na **`index.html`**).
3. Aplikacija se odmah otvara u vašem internet pretraživaču.

---

## 🌐 Kako objaviti aplikaciju na GitHub i Vercel (Korak po korak)

Želite da vaša aplikacija ima svoj **pravi internet link (npr. `https://tvoj-booktracker.vercel.app`)** tako da je možete otvoriti na telefonu i podijeliti s prijateljima? 
Evo najjednostavnijeg načina bez potrebe za komandnom linijom (terminalom):

### KORAK 1: Objavljivanje na GitHub (Besplatno)
1. Idite na web stranicu [**github.com**](https://github.com) i besplatno se registrujte (ili prijavite ako već imate račun).
2. U gornjem desnom uglu kliknite na ikonicu **`+`** i odaberite **`New repository`**.
3. U polje **Repository name** upišite npr.: `book-tracker`.
4. Označite da je **Public** (Javno).
5. Kliknite zeleno dugme na dnu: **`Create repository`**.
6. Na novoj stranici koja se otvori, kliknite na plavi link: **`uploading an existing file`** (u sekciji *Get started by creating a new file or uploading an existing file*).
7. Otvorite folder na svom računaru: `c:\Users\pc\Downloads\BookTracker antigravity`.
8. Označite sve datoteke iz tog foldera (`index.html`, `styles.css`, `app.js`, `README.md`, `vercel.json`) i **jednostavno ih prevucite mišem (Drag & Drop)** u GitHub prozor u pretraživaču.
9. Na dnu stranice kliknite zeleno dugme: **`Commit changes`**.
10. Vaš kod je sada uspješno objavljen na GitHubu! 🎉

---

### KORAK 2: Postavljanje (Deploy) na Vercel (Besplatno u 3 klika)
1. Idite na web stranicu [**vercel.com**](https://vercel.com) i kliknite na **`Sign Up`**.
2. Odaberite opciju **`Continue with GitHub`** (ovo će automatski povezati vaš GitHub račun).
3. Kada se nađete na Vercel kontrolnoj tabli (Dashboard), kliknite na dugme **`Add New...`** -> **`Project`**.
4. Vidjet ćete vaš repozitorij `book-tracker` sa GitHub-a. Pored njega kliknite na dugme **`Import`**.
5. Ne morate mijenjati nikakve postavke — samo kliknite na plavo dugme **`Deploy`**!
6. Sačekajte 10–20 sekundi dok Vercel pripremi stranicu.
7. Čestitamo! 🎊 Dobit ćete gotov internet link (npr. `https://book-tracker-xyz.vercel.app`) koji možete poslati bilo kome ili otvoriti na telefonu!

---

## 🛠️ Šta je popravljeno u verziji 2.1 (Multi-Source Search)?

- **Multi-Source pretraga:** Pretraga sada istovremeno koristi Open Library API, Google Books API i ugrađenu bazu. Više se ne dešava da pretraga stane ili prijavi da knjiga ne postoji.
- **Odvojeni prikazi:** Glavna stranica je fokusirana na "Trenutno čitam", dok se pretraga interneta prikazuje u jasnom, odvojenom dijelu sa stvarnim slikama korica.
- **Ručni unos:** Ako unesete rijetku knjigu koju internet baza ne prepozna, jednim klikom na dugme `+ Ručno dodaj knjigu` otvara se forma sa već upisanim nazivom.
# BookTracker_Antigravity
