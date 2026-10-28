/**
 * BookTracker v2.1 - Glavna aplikativna logika (JavaScript)
 * 
 * Karakteristike:
 * 1. Otporna multi-source pretraga (OpenLibrary + Google Books + Lokalna baza)
 * 2. Glatka 60fps grafika i tranzicije
 * 3. Glavna stranica fokusirana na "Trenutno čitam"
 * 4. Pročitane knjige se čuvaju u posebnom odjeljku "Pročitane knjige"
 * 5. Novi registrovani korisnici počinju sa 100% čistom listom
 * 6. Pametne preporuke sa koricama knjiga prilagođene trenutnom čitanju
 */

// ============================================================================
// 1. BOGATA POČETNA BAZA PREPORUČENIH KNJIGA SA STVARNIM KORICAMA
// ============================================================================
const INICIJALNE_PREPORUKE = [
  {
    id: "rec_1",
    title: "Na Drini ćuprija",
    author: "Ivo Andrić",
    genre: "Klasici",
    totalPages: 360,
    coverUrl: "https://covers.openlibrary.org/b/id/10523420-M.jpg",
    desc: "Remek-djelo našeg nobelovca o višestoljetnoj historiji Višegrada, slavnog mosta i sudbinama ljudi kroz burne epohe."
  },
  {
    id: "rec_2",
    title: "Derviš i smrt",
    author: "Meša Selimović",
    genre: "Klasici",
    totalPages: 410,
    coverUrl: "https://covers.openlibrary.org/b/id/8381831-M.jpg",
    desc: "Duboko psihološko i filozofsko remek-djelo o dervišu Ahmedu Nurudinu, vlasti, pravdi i smislu postojanja."
  },
  {
    id: "rec_3",
    title: "Atomske navike",
    author: "James Clear",
    genre: "Psihologija i razvoj",
    totalPages: 320,
    coverUrl: "https://covers.openlibrary.org/b/id/12843477-M.jpg",
    desc: "Praktični svjetski bestseler o tome kako male, svakodnevne promjene od 1% dovode do nevjerovatnih životnih rezultata."
  },
  {
    id: "rec_4",
    title: "1984",
    author: "George Orwell",
    genre: "Klasici",
    totalPages: 328,
    coverUrl: "https://covers.openlibrary.org/b/id/8575743-M.jpg",
    desc: "Kultni distopijski roman o nadzoru, slobodi misli i borbi pojedinca protiv svevidećeg Velikog Brata."
  },
  {
    id: "rec_5",
    title: "Tihi pacijent",
    author: "Alex Michaelides",
    genre: "Triler i misterija",
    totalPages: 350,
    coverUrl: "https://covers.openlibrary.org/b/id/10389396-M.jpg",
    desc: "Psihološki triler o slavnoj slikarki koja nakon ubistva svog supruga odbija progovoriti ijednu jedinu riječ."
  },
  {
    id: "rec_6",
    title: "Dina (Dune)",
    author: "Frank Herbert",
    genre: "Fantastika i SF",
    totalPages: 600,
    coverUrl: "https://covers.openlibrary.org/b/id/11181284-M.jpg",
    desc: "Veličanstveni naučnofantastični ep o pustinjskoj planeti Arakis, začinu i sudbini mladog Pola Atreida."
  },
  {
    id: "rec_7",
    title: "Čovjek u potrazi za smislom",
    author: "Viktor E. Frankl",
    genre: "Psihologija i razvoj",
    totalPages: 210,
    coverUrl: "https://covers.openlibrary.org/b/id/8231996-M.jpg",
    desc: "Dirljivo svjedočanstvo psihijatra i preživjelog logoraša o tome kako čovjek u svakoj patnji može pronaći smisao."
  },
  {
    id: "rec_8",
    title: "Ime ruže",
    author: "Umberto Eco",
    genre: "Triler i misterija",
    totalPages: 530,
    coverUrl: "https://covers.openlibrary.org/b/id/8314115-M.jpg",
    desc: "Srednjovjekovni detektivski roman u zabačenom planinskom samostanu prepunom biblioteka, tajni i serijskih ubistava."
  },
  {
    id: "rec_9",
    title: "Gospodar prstenova: Prstenova družina",
    author: "J.R.R. Tolkien",
    genre: "Fantastika i SF",
    totalPages: 480,
    coverUrl: "https://covers.openlibrary.org/b/id/8406786-M.jpg",
    desc: "Vrhunac epske fantastike — putovanje hobita Froda i družine ka zloj zemlji Mordor s ciljem uništenja Prstena Moći."
  },
  {
    id: "rec_10",
    title: "Sapiens: Kratka istorija čovječanstva",
    author: "Yuval Noah Harari",
    genre: "Istorija i biografija",
    totalPages: 460,
    coverUrl: "https://covers.openlibrary.org/b/id/8617830-M.jpg",
    desc: "Fascinantno djelo o tome kako je nekada beznačajna vrsta primata ovladala čitavom planetom Zemljom."
  },
  {
    id: "rec_11",
    title: "Mali princ",
    author: "Antoine de Saint-Exupéry",
    genre: "Klasici",
    totalPages: 96,
    coverUrl: "https://covers.openlibrary.org/b/id/10543202-M.jpg",
    desc: "Bezvremenska priča o prijateljstvu, ljubavi, odraslima i jednostavnim istinama koje se vide samo srcem."
  },
  {
    id: "rec_12",
    title: "Zločin i kazna",
    author: "Fjodor Dostojevski",
    genre: "Klasici",
    totalPages: 580,
    coverUrl: "https://covers.openlibrary.org/b/id/8235113-M.jpg",
    desc: "Unutrašnja drama studenta Raskoljnikova o moralu, opravdanosti zločina i iskupljenju kroz savjest."
  },
  {
    id: "rec_13",
    title: "Harry Potter i Kamen mudraca",
    author: "J.K. Rowling",
    genre: "Fantastika i SF",
    totalPages: 310,
    coverUrl: "https://covers.openlibrary.org/b/id/10521270-M.jpg",
    desc: "Početak čuvenog serijala o dječaku čarobnjaku koji otkriva svijet magije u Hogwartsu."
  },
  {
    id: "rec_14",
    title: "Alhemičar",
    author: "Paulo Coelho",
    genre: "Roman",
    totalPages: 190,
    coverUrl: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
    desc: "Inspirativna priča o andaluzijskom pastiru Santjagu koji kreće u potragu za svojim ličnim snom."
  },
  {
    id: "rec_15",
    title: "Tvđava",
    author: "Meša Selimović",
    genre: "Klasici",
    totalPages: 440,
    coverUrl: "https://covers.openlibrary.org/b/id/8584285-M.jpg",
    desc: "Snažan roman o ratniku Ahmetu Šabi koji nakon povratka s ratišta traži ljubav i mir u nemirnom svijetu."
  }
];

// ============================================================================
// 2. STANJE APLIKACIJE (State Management)
// ============================================================================
let currentUser = null;
let userBooks = [];

// Glavna stranica prikazuje knjige koje se trenutno čitaju
let activeFilter = 'reading';   // 'reading' (glavna), 'completed', 'plan', 'favorites', 'online'
let activeGenre = 'all';
let searchQuery = '';
let currentSort = 'newest';

// Keš za online preporuke i rezultate pretrage
let onlineRecommendations = [];
let onlineSearchResults = [];
let activeRecCategory = 'smart';

// Debounce timer za pretragu
let searchDebounceTimer = null;
let bookIdToDelete = null;

// ============================================================================
// 3. POKRETANJE APLIKACIJE (Inicijalizacija)
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const savedSession = localStorage.getItem("booktracker_session");
  
  if (savedSession) {
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === savedSession);
    if (user) {
      setCurrentUser(user);
    } else {
      showAuthScreen();
    }
  } else {
    showAuthScreen();
  }
});

// ============================================================================
// 4. AUTENTIFIKACIJA KORISNIKA
// ============================================================================
function getUsersFromStorage() {
  const data = localStorage.getItem("booktracker_users");
  return data ? JSON.parse(data) : [];
}

function saveUsersToStorage(users) {
  localStorage.setItem("booktracker_users", JSON.stringify(users));
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLoginBtn = document.getElementById("tabLoginBtn");
  const tabRegisterBtn = document.getElementById("tabRegisterBtn");

  if (tab === 'login') {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    tabLoginBtn.classList.add("active");
    tabRegisterBtn.classList.remove("active");
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    tabLoginBtn.classList.remove("active");
    tabRegisterBtn.classList.add("active");
  }
}

function handleLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("loginUsername").value.trim().toLowerCase();
  const passwordInput = document.getElementById("loginPassword").value;

  const users = getUsersFromStorage();
  const foundUser = users.find(u => u.username.toLowerCase() === usernameInput && u.password === passwordInput);

  if (foundUser) {
    setCurrentUser(foundUser);
    showToast(`Dobrodošli nazad, ${foundUser.fullName}! 👋`, "toast-success");
  } else {
    showToast("Pogrešno korisničko ime ili lozinka. Pokušajte ponovo.", "toast-error");
  }
}

function handleRegister(event) {
  event.preventDefault();
  const fullName = document.getElementById("regFullName").value.trim();
  const username = document.getElementById("regUsername").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value;

  if (password.length < 4) {
    showToast("Lozinka mora imati barem 4 znaka.", "toast-error");
    return;
  }

  const users = getUsersFromStorage();
  const exists = users.some(u => u.username.toLowerCase() === username);

  if (exists) {
    showToast("Korisničko ime već postoji. Izaberite drugo.", "toast-error");
    return;
  }

  const newUser = {
    id: "user_" + Date.now(),
    username: username,
    password: password,
    fullName: fullName,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsersToStorage(users);

  // Novi korisnik počinje sa 100% čistom bibliotekom
  localStorage.setItem(`booktracker_books_${newUser.id}`, JSON.stringify([]));

  setCurrentUser(newUser);
  showToast(`Uspješno ste kreirali račun! Dobrodošli, ${fullName}! 🎉`, "toast-success");
}

function loginDemoUser() {
  const users = getUsersFromStorage();
  let demoUser = users.find(u => u.username === "demo");

  if (!demoUser) {
    demoUser = {
      id: "user_demo",
      username: "demo",
      password: "123",
      fullName: "Gost Čitalac",
      createdAt: new Date().toISOString()
    };
    users.push(demoUser);
    saveUsersToStorage(users);
    seedInitialBooksForUser(demoUser.id);
  }

  setCurrentUser(demoUser);
  showToast("Prijavljeni ste sa demo računom!", "toast-info");
}

function seedInitialBooksForUser(userId) {
  const sampleBooks = [
    {
      id: "b_" + Date.now() + "_1",
      title: "Atomske navike",
      author: "James Clear",
      genre: "Psihologija i razvoj",
      totalPages: 320,
      currentPage: 160,
      status: "reading",
      rating: 4,
      isFavorite: true,
      coverUrl: "https://covers.openlibrary.org/b/id/12843477-M.jpg",
      notes: "Sjajna knjiga za ličnu disciplinu i fokus.",
      createdAt: new Date().toISOString()
    },
    {
      id: "b_" + Date.now() + "_2",
      title: "Derviš i smrt",
      author: "Meša Selimović",
      genre: "Klasici",
      totalPages: 410,
      currentPage: 410,
      status: "completed",
      rating: 5,
      isFavorite: true,
      coverUrl: "https://covers.openlibrary.org/b/id/8381831-M.jpg",
      notes: "Jedno od najmoćnijih djela domaće književnosti.",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ];

  localStorage.setItem(`booktracker_books_${userId}`, JSON.stringify(sampleBooks));
}

function setCurrentUser(user) {
  currentUser = user;
  localStorage.setItem("booktracker_session", user.id);

  document.getElementById("userAvatarLetter").textContent = user.fullName.charAt(0).toUpperCase();
  document.getElementById("userNameDisplay").textContent = user.fullName;
  document.getElementById("userNavSection").style.display = "flex";

  document.getElementById("authSection").style.display = "none";
  document.getElementById("dashboardSection").style.display = "block";

  loadUserBooks();
  fetchSmartRecommendations();
}

function logout() {
  currentUser = null;
  userBooks = [];
  localStorage.removeItem("booktracker_session");
  showAuthScreen();
  showToast("Uspješno ste se odjavili.", "toast-info");
}

function showAuthScreen() {
  document.getElementById("userNavSection").style.display = "none";
  document.getElementById("authSection").style.display = "block";
  document.getElementById("dashboardSection").style.display = "none";
  switchAuthTab('login');
}

document.getElementById("logoutBtn").addEventListener("click", logout);

// ============================================================================
// 5. RAD SA KNJIGAMA
// ============================================================================
function loadUserBooks() {
  if (!currentUser) return;
  const data = localStorage.getItem(`booktracker_books_${currentUser.id}`);
  userBooks = data ? JSON.parse(data) : [];
  renderApp();
}

function saveUserBooks() {
  if (!currentUser) return;
  localStorage.setItem(`booktracker_books_${currentUser.id}`, JSON.stringify(userBooks));
  renderApp();
  fetchSmartRecommendations();
}

function renderApp() {
  updateStats();
  renderSectionBanner();
  renderBooksList();
}

function updateStats() {
  const reading = userBooks.filter(b => b.status === 'reading').length;
  const completed = userBooks.filter(b => b.status === 'completed').length;
  const plan = userBooks.filter(b => b.status === 'plan').length;
  const favorites = userBooks.filter(b => b.isFavorite).length;

  document.getElementById("statReadingBooks").textContent = reading;
  document.getElementById("statCompletedBooks").textContent = completed;
  document.getElementById("statPlanBooks").textContent = plan;
  document.getElementById("statFavBooks").textContent = favorites;

  document.getElementById("badgeReading").textContent = reading;
  document.getElementById("badgeCompleted").textContent = completed;
  document.getElementById("badgePlan").textContent = plan;
  document.getElementById("badgeFav").textContent = favorites;
}

function renderSectionBanner() {
  const titleElem = document.getElementById("currentSectionTitle");
  const subElem = document.getElementById("currentSectionSubtitle");
  const localFilters = document.getElementById("localFiltersSelectGroup");

  if (activeFilter === 'reading') {
    titleElem.innerHTML = "📖 Knjige koje trenutno čitate (Glavna stranica)";
    subElem.textContent = "Ovdje se nalaze samo knjige koje su u toku vašeg čitanja.";
    localFilters.style.display = "flex";
  } else if (activeFilter === 'completed') {
    titleElem.innerHTML = "✅ Pročitane knjige";
    subElem.textContent = "Kolekcija svih knjiga koje ste uspješno pročitali.";
    localFilters.style.display = "flex";
  } else if (activeFilter === 'plan') {
    titleElem.innerHTML = "📌 Želim pročitati (Lista želja)";
    subElem.textContent = "Knjige koje planirate pročitati. Kliknite 'Započni čitanje' da ih premjestite na glavnu stranicu.";
    localFilters.style.display = "flex";
  } else if (activeFilter === 'favorites') {
    titleElem.innerHTML = "❤️ Moje omiljene knjige";
    subElem.textContent = "Vaši najdraži naslovi označeni srcem.";
    localFilters.style.display = "flex";
  } else if (activeFilter === 'online') {
    titleElem.innerHTML = "🌐 Istraži internet bazu knjiga";
    subElem.textContent = "Pretražujte milione naslova iz Open Library i Google Books baze sa slikama korica.";
    localFilters.style.display = "none";
  }
}

function renderBooksList() {
  const booksContainer = document.getElementById("booksGrid");
  const onlineArea = document.getElementById("onlineSearchArea");

  if (activeFilter === 'online') {
    booksContainer.style.display = "none";
    onlineArea.style.display = "block";
    return;
  } else {
    booksContainer.style.display = "grid";
    if (!searchQuery) {
      onlineArea.style.display = "none";
    }
  }

  booksContainer.innerHTML = "";

  // 1. Filtriranje po odjeljku
  let filtered = userBooks.filter(book => {
    if (activeFilter === 'reading' && book.status !== 'reading') return false;
    if (activeFilter === 'completed' && book.status !== 'completed') return false;
    if (activeFilter === 'plan' && book.status !== 'plan') return false;
    if (activeFilter === 'favorites' && !book.isFavorite) return false;

    // Filter po žanru
    if (activeGenre !== 'all' && book.genre !== activeGenre) return false;

    // Lokalna pretraga
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor) return false;
    }

    return true;
  });

  // 2. Sortiranje
  filtered.sort((a, b) => {
    if (currentSort === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (currentSort === 'titleAsc') return a.title.localeCompare(b.title);
    if (currentSort === 'authorAsc') return a.author.localeCompare(b.author);
    if (currentSort === 'progressDesc') return calculatePercent(b.currentPage, b.totalPages) - calculatePercent(a.currentPage, a.totalPages);
    if (currentSort === 'ratingDesc') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  // 3. Prazna stanja
  if (filtered.length === 0) {
    if (searchQuery) {
      // Ako korisnik pretražuje nešto što nema u svojoj biblioteci
      booksContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3>Nema knjige "${escapeHtml(searchQuery)}" u vašoj biblioteci</h3>
          <p>Ova knjiga se još ne nalazi u vašoj ličnoj listi. Pogledajte rezultate sa interneta iznad ili kliknite ispod da je odmah dodate!</p>
          <button class="btn btn-primary" onclick="openAddBookModalWithTitle('${escapeHtml(searchQuery)}')">
            + Dodaj "${escapeHtml(searchQuery)}" u biblioteku
          </button>
        </div>
      `;
      return;
    }

    let emptyTitle = "Trenutno ne čitate nijednu knjigu";
    let emptyDesc = "Glavna stranica prikazuje knjige koje su u toku. Započnite čitanje iz liste želja ili dodajte novu!";
    let btnText = "📌 Pogledaj listu 'Želim pročitati'";
    let btnAction = "setFilter('plan')";

    if (activeFilter === 'completed') {
      emptyTitle = "Još nemate pročitanih knjiga";
      emptyDesc = "Kada završite knjigu sa glavne stranice (100%), ona će se automatski arhivirati ovdje.";
      btnText = "📖 Idi na trenutno čitanje";
      btnAction = "setFilter('reading')";
    } else if (activeFilter === 'plan') {
      emptyTitle = "Vaša lista želja je prazna";
      emptyDesc = "Ovdje čuvate knjige koje planirate pročitati. Dodajte ih ručno ili pretražite internet bazu!";
      btnText = "💡 Istraži prijedloge sa interneta";
      btnAction = "scrollToRecommendations()";
    } else if (activeFilter === 'favorites') {
      emptyTitle = "Nemate omiljenih knjiga";
      emptyDesc = "Kliknite na ikonicu srca (🤍) na bilo kojoj knjizi da biste je označili kao omiljenu.";
      btnText = "📖 Nazad na trenutno čitanje";
      btnAction = "setFilter('reading')";
    }

    booksContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📖</div>
        <h3>${emptyTitle}</h3>
        <p>${emptyDesc}</p>
        <button class="btn btn-primary" onclick="${btnAction}">${btnText}</button>
      </div>
    `;
    return;
  }

  // 4. Generisanje kartica sa slikama korica
  filtered.forEach(book => {
    const percent = calculatePercent(book.currentPage, book.totalPages);
    const genreClass = getGenreClass(book.genre);
    const statusBadge = getStatusBadge(book.status);
    const starString = getStarString(book.rating);

    const coverHtml = book.coverUrl
      ? `<img src="${escapeHtml(book.coverUrl)}" alt="${escapeHtml(book.title)}" class="book-cover-image" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div class="book-spine-accent ${genreClass}" style="display: none;">📚</div>`
      : `<div class="book-spine-accent ${genreClass}">📚</div>`;

    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div class="book-card-header">
        <div class="book-cover-container">
          ${coverHtml}
        </div>
        <div class="book-info-main">
          <h3 class="book-title" title="${escapeHtml(book.title)}">${escapeHtml(book.title)}</h3>
          <p class="book-author" title="${escapeHtml(book.author)}">✍️ ${escapeHtml(book.author)}</p>
          <div class="book-badges">
            ${statusBadge}
            <span class="badge badge-genre">${escapeHtml(book.genre || 'Ostalo')}</span>
          </div>
        </div>
        <button class="favorite-btn ${book.isFavorite ? 'active' : ''}" 
                onclick="toggleFavorite('${book.id}')" 
                title="${book.isFavorite ? 'Ukloni iz omiljenih' : 'Označi kao omiljenu'}">
          ${book.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <!-- Traka napretka -->
      <div class="book-progress-section">
        <div class="progress-header">
          <span class="progress-label">Napredak: ${book.currentPage} / ${book.totalPages} str.</span>
          <span class="progress-percentage">${percent}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill ${percent >= 100 ? 'completed' : ''}" style="width: ${percent}%;"></div>
        </div>
        <div class="quick-update-bar">
          <span style="color: var(--text-muted); font-size: 0.75rem;">
            ${percent >= 100 ? '🏆 Pročitano u cijelosti!' : `Preostalo: ${Math.max(0, book.totalPages - book.currentPage)} str.`}
          </span>
          ${book.status === 'reading' ? `
            <button class="quick-update-btn" onclick="openQuickUpdateModal('${book.id}')">
              ✏️ Ažuriraj stranicu
            </button>
          ` : (book.status === 'plan' ? `
            <button class="btn-start-reading" onclick="startReadingBook('${book.id}')">
              ▶️ Započni čitanje
            </button>
          ` : `
            <span style="font-size: 0.75rem; color: #059669; font-weight: 600;">Arhivirano u pročitane</span>
          `)}
        </div>
      </div>

      <!-- Bilješke i ocjena -->
      <div class="book-card-body">
        ${book.rating > 0 ? `<div class="book-rating" title="Ocjena: ${book.rating}/5">${starString}</div>` : ''}
        ${book.notes ? `<p class="book-notes" title="${escapeHtml(book.notes)}">"${escapeHtml(book.notes)}"</p>` : `<p style="font-size: 0.8rem; color: var(--text-light); font-style: italic;">Nema unesenih bilješki...</p>`}
      </div>

      <!-- Podnožje sa akcijama -->
      <div class="book-card-footer">
        <div>
          ${book.status === 'plan' ? `
            <button class="btn btn-primary btn-sm" onclick="startReadingBook('${book.id}')" title="Premjesti na glavnu stranicu">
              ▶️ Čitaj sada
            </button>
          ` : ''}
        </div>
        <div class="actions-right">
          <button class="btn btn-secondary btn-sm" onclick="openEditBookModal('${book.id}')">
            ✏️ Uredi
          </button>
          <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${book.id}')">
            🗑️ Obriši
          </button>
        </div>
      </div>
    `;

    booksContainer.appendChild(card);
  });
}

function startReadingBook(bookId) {
  const book = userBooks.find(b => b.id === bookId);
  if (!book) return;

  book.status = 'reading';
  if (book.currentPage === 0) book.currentPage = 1;
  saveUserBooks();

  setFilter('reading');
  showToast(`Knjiga "${book.title}" je na glavnoj stranici za čitanje! 📖`, "toast-success");
}

function scrollToRecommendations() {
  document.getElementById("recommendationsArea").scrollIntoView({ behavior: 'smooth' });
}

function calculatePercent(current, total) {
  if (!total || total <= 0) return 0;
  const p = Math.round((current / total) * 100);
  return Math.min(100, Math.max(0, p));
}

function getGenreClass(genre) {
  if (!genre) return 'genre-ostalo';
  const g = genre.toLowerCase();
  if (g.includes('roman')) return 'genre-roman';
  if (g.includes('triler')) return 'genre-triler';
  if (g.includes('fantastika')) return 'genre-fantastika';
  if (g.includes('psihologija')) return 'genre-psihologija';
  if (g.includes('klasici')) return 'genre-klasici';
  return 'genre-ostalo';
}

function getStatusBadge(status) {
  if (status === 'completed') {
    return `<span class="badge badge-completed">✅ Pročitano</span>`;
  } else if (status === 'reading') {
    return `<span class="badge badge-reading">📖 Čitam trenutno</span>`;
  } else {
    return `<span class="badge badge-plan">📌 Želim pročitati</span>`;
  }
}

function getStarString(rating) {
  const full = rating || 0;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= full ? '★' : '☆';
  }
  return stars;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toggleFavorite(bookId) {
  const book = userBooks.find(b => b.id === bookId);
  if (!book) return;

  book.isFavorite = !book.isFavorite;
  saveUserBooks();

  if (book.isFavorite) {
    showToast(`"${book.title}" dodana u omiljene! ❤️`, "toast-info");
  } else {
    showToast(`"${book.title}" uklonjena iz omiljenih.`, "toast-info");
  }
}

// ============================================================================
// 6. MULTI-SOURCE SEARCH ENGINE (OpenLibrary + Google Books + Lokalna baza)
// ============================================================================
function handleSearchInput(val) {
  clearTimeout(searchDebounceTimer);
  const clearBtn = document.getElementById("searchClearBtn");
  clearBtn.style.display = val.trim() ? "block" : "none";

  searchDebounceTimer = setTimeout(() => {
    executeSearch(val);
  }, 350);
}

function handleSearchSubmit(event) {
  if (event) event.preventDefault();
  clearTimeout(searchDebounceTimer);
  const val = document.getElementById("searchInput").value;
  executeSearch(val, true);
}

function executeSearch(val, immediate = false) {
  searchQuery = val.trim();
  const clearBtn = document.getElementById("searchClearBtn");
  clearBtn.style.display = searchQuery ? "block" : "none";

  renderBooksList();

  if (searchQuery.length >= 2) {
    fetchOnlineBooks(searchQuery);
  } else {
    document.getElementById("onlineSearchArea").style.display = "none";
  }
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  input.value = "";
  executeSearch("");
  input.focus();
}

/**
 * Višestruki (Multi-Source) mehanizam pretrage:
 * 1. Pretražuje lokalnu bogatu bazu (trenutan odziv za poznata djela)
 * 2. Pretražuje Open Library API (brz, pouzdan, bez restrikcija sa slikama korica)
 * 3. Pretražuje Google Books API (spaja rezultate)
 */
async function fetchOnlineBooks(query) {
  const cleanQuery = query.trim();
  const onlineArea = document.getElementById("onlineSearchArea");
  const spinner = document.getElementById("onlineLoadingSpinner");
  const grid = document.getElementById("onlineResultsGrid");
  const countText = document.getElementById("onlineResultCount");

  onlineArea.style.display = "block";
  spinner.style.display = "inline-block";
  countText.textContent = `Pretražujem internet bazu za "${cleanQuery}"...`;
  grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);"><span class="spinner"></span><p style="margin-top:0.5rem;">Preuzimam podatke sa interneta...</p></div>`;

  let results = [];

  // 1. Provjera lokalne baze
  const localMatches = INICIJALNE_PREPORUKE.filter(b => 
    b.title.toLowerCase().includes(cleanQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(cleanQuery.toLowerCase())
  );
  if (localMatches.length > 0) {
    results.push(...localMatches);
  }

  // 2. Pretraga preko Open Library (vrlo pouzdano za sve vrste književnosti sa koricama)
  try {
    const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(cleanQuery)}&fields=key,title,author_name,cover_i,number_of_pages_median,subject,first_publish_year&limit=8`;
    const olRes = await fetch(olUrl);
    if (olRes.ok) {
      const olData = await olRes.json();
      if (olData.docs && olData.docs.length > 0) {
        olData.docs.forEach(doc => {
          if (doc.title && !results.some(r => r.title.toLowerCase() === doc.title.toLowerCase())) {
            results.push({
              id: 'ol_' + (doc.cover_i || Math.random().toString(36).substring(7)),
              title: doc.title,
              author: doc.author_name ? doc.author_name.slice(0, 2).join(", ") : 'Nepoznat autor',
              genre: (doc.subject && doc.subject.length > 0) ? doc.subject[0] : 'Roman',
              totalPages: doc.number_of_pages_median || 300,
              coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
              desc: doc.first_publish_year ? `Prvo izdanje: ${doc.first_publish_year}. godina.` : 'Pronađeno u otvorenoj internet biblioteci.'
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn("Open Library pretraga privremeno nedostupna:", err);
  }

  // 3. Pretraga preko Google Books API-ja (dodatni rezultati)
  try {
    const gbUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(cleanQuery)}&maxResults=8`;
    const gbRes = await fetch(gbUrl);
    if (gbRes.ok) {
      const gbData = await gbRes.json();
      if (gbData.items && gbData.items.length > 0) {
        gbData.items.forEach(item => {
          const info = item.volumeInfo || {};
          const title = info.title || '';
          if (title && !results.some(r => r.title.toLowerCase() === title.toLowerCase())) {
            const img = info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail || '') : '';
            results.push({
              id: 'gb_' + item.id,
              title: title,
              author: info.authors ? info.authors.join(", ") : 'Nepoznat autor',
              genre: (info.categories && info.categories.length > 0) ? info.categories[0] : 'Roman',
              totalPages: info.pageCount || 280,
              coverUrl: img ? img.replace('http:', 'https:') : '',
              desc: info.description ? (info.description.slice(0, 160) + '...') : 'Pronađeno na Google Books.'
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn("Google Books API pretraga nedostupna:", err);
  }

  spinner.style.display = "none";
  onlineSearchResults = results;

  if (results.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem 1rem;">
        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1rem;">
          Nismo uspjeli automatski pronaći knjigu pod nazivom "<strong>${escapeHtml(cleanQuery)}</strong>".
        </p>
        <button class="btn btn-primary" onclick="openAddBookModalWithTitle('${escapeHtml(cleanQuery)}')">
          + Ručno dodaj knjigu "${escapeHtml(cleanQuery)}"
        </button>
      </div>
    `;
    countText.textContent = "0 rezultata";
  } else {
    countText.textContent = `Pronađeno ${results.length} knjiga na internetu sa koricama:`;
    renderOnlineResults(results);
  }
}

function renderOnlineResults(books) {
  const grid = document.getElementById("onlineResultsGrid");
  grid.innerHTML = "";

  books.forEach(book => {
    const exists = userBooks.some(b => b.title.toLowerCase() === book.title.toLowerCase());
    const card = document.createElement("div");
    card.className = "online-book-card";

    const coverHtml = book.coverUrl 
      ? `<img src="${escapeHtml(book.coverUrl)}" alt="${escapeHtml(book.title)}" loading="lazy" onerror="this.src=''; this.parentElement.style.background='#cbd5e1';">`
      : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.4rem;">📖</div>`;

    card.innerHTML = `
      <div class="online-cover-thumb">
        ${coverHtml}
      </div>
      <div class="online-book-details">
        <div>
          <h4 class="online-book-title" title="${escapeHtml(book.title)}">${escapeHtml(book.title)}</h4>
          <p class="online-book-author">✍️ ${escapeHtml(book.author)}</p>
          <p class="online-book-meta">${book.totalPages} str. • ${escapeHtml(book.genre)}</p>
        </div>
        <div style="display: flex; gap: 0.35rem; margin-top: 0.5rem;">
          ${exists ? `
            <span style="font-size: 0.75rem; color: #059669; font-weight: 600;">✓ Već u vašoj biblioteci</span>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="addOnlineBookToLibrary('${book.id}', 'reading')">
              📖 Čitaj
            </button>
            <button class="btn btn-secondary btn-sm" onclick="addOnlineBookToLibrary('${book.id}', 'plan')">
              📌 U plan
            </button>
          `}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function addOnlineBookToLibrary(bookId, targetStatus) {
  const book = onlineSearchResults.find(b => b.id === bookId) || onlineRecommendations.find(b => b.id === bookId) || INICIJALNE_PREPORUKE.find(b => b.id === bookId);
  if (!book) return;

  const newBook = {
    id: "b_" + Date.now(),
    title: book.title,
    author: book.author,
    genre: book.genre || 'Roman',
    status: targetStatus,
    totalPages: book.totalPages || 300,
    currentPage: targetStatus === 'reading' ? 1 : 0,
    coverUrl: book.coverUrl || '',
    notes: book.desc ? book.desc.slice(0, 200) + '...' : '',
    isFavorite: false,
    rating: 0,
    createdAt: new Date().toISOString()
  };

  userBooks.unshift(newBook);
  saveUserBooks();

  if (targetStatus === 'reading') {
    setFilter('reading');
    showToast(`"${book.title}" dodana na glavnu stranicu za čitanje! 📖`, "toast-success");
  } else {
    showToast(`"${book.title}" dodana u listu "Želim pročitati"! 📌`, "toast-success");
  }
}

// ============================================================================
// 7. PAMETNE PREPORUKE SA INTERNETA
// ============================================================================
async function fetchSmartRecommendations(forceRefresh = false) {
  const banner = document.getElementById("smartContextText");
  const spinner = document.getElementById("recLoadingIndicator");

  const readingBooks = userBooks.filter(b => b.status === 'reading');
  const readingAuthors = [...new Set(readingBooks.map(b => b.author.trim()))];
  const readingGenres = [...new Set(readingBooks.map(b => b.genre))];

  let targetAuthor = readingAuthors[0];
  let targetGenre = readingGenres[0];

  if (!targetAuthor && userBooks.length > 0) {
    const fav = userBooks.find(b => b.isFavorite) || userBooks[0];
    targetAuthor = fav.author;
    targetGenre = fav.genre;
  }

  if (targetAuthor || targetGenre) {
    banner.innerHTML = `🎯 <strong>Pametna preporuka:</strong> Na osnovu knjiga koje čitate <em>(Pisac: ${targetAuthor || 'Omiljeni'}, Žanr: ${targetGenre || 'Izbor'})</em>`;
  } else {
    banner.innerHTML = `🌟 <strong>Preporučeni svjetski klasici i bestseleri:</strong> Odaberite knjigu sa koricama za početak čitanja!`;
  }

  if (onlineRecommendations.length > 0 && !forceRefresh) {
    renderRecommendations(onlineRecommendations);
    return;
  }

  spinner.style.display = "inline-block";

  try {
    let query = targetAuthor ? `author:${targetAuthor}` : (targetGenre ? `subject:${targetGenre}` : "best books");
    const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,cover_i,number_of_pages_median,subject,first_publish_year&limit=10`;
    const res = await fetch(olUrl);
    
    spinner.style.display = "none";

    if (res.ok) {
      const data = await res.json();
      if (data.docs && data.docs.length > 0) {
        onlineRecommendations = data.docs.map(doc => {
          let matchReason = '';
          if (targetAuthor && doc.author_name && doc.author_name.some(a => a.toLowerCase().includes(targetAuthor.toLowerCase()))) {
            matchReason = `✍️ Isti pisac: ${targetAuthor}`;
          } else if (targetGenre) {
            matchReason = `🏷️ Žanr: ${targetGenre}`;
          }

          return {
            id: 'rec_ol_' + (doc.cover_i || Math.random().toString(36).substring(7)),
            title: doc.title,
            author: doc.author_name ? doc.author_name.slice(0, 2).join(", ") : (targetAuthor || 'Poznati autor'),
            genre: targetGenre || 'Roman',
            totalPages: doc.number_of_pages_median || 310,
            coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
            desc: doc.first_publish_year ? `Izdanje iz ${doc.first_publish_year}. godine. Odličan izbor za čitaoce.` : 'Preporučena knjiga sa interneta za vaše čitanje.',
            matchReason: matchReason
          };
        });

        renderRecommendations(onlineRecommendations);
        return;
      }
    }
    onlineRecommendations = [...INICIJALNE_PREPORUKE];
    renderRecommendations(onlineRecommendations);
  } catch (err) {
    spinner.style.display = "none";
    onlineRecommendations = [...INICIJALNE_PREPORUKE];
    renderRecommendations(onlineRecommendations);
  }
}

function renderRecommendations(list) {
  const grid = document.getElementById("recommendationsGrid");
  grid.innerHTML = "";

  list.forEach(rec => {
    const card = document.createElement("div");
    card.className = "rec-card";

    const coverHtml = rec.coverUrl
      ? `<img src="${escapeHtml(rec.coverUrl)}" alt="${escapeHtml(rec.title)}" loading="lazy" onerror="this.src=''; this.parentElement.style.background='#cbd5e1';">`
      : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.5rem;">📚</div>`;

    card.innerHTML = `
      <div>
        <div class="rec-card-top">
          <div class="rec-card-cover">
            ${coverHtml}
          </div>
          <div class="rec-card-details">
            ${rec.matchReason ? `<span class="rec-match-badge">${escapeHtml(rec.matchReason)}</span>` : ''}
            <h4>${escapeHtml(rec.title)}</h4>
            <div class="rec-card-author">✍️ ${escapeHtml(rec.author)}</div>
            <div style="font-size: 0.75rem; color: var(--text-light);">${rec.totalPages} str.</div>
          </div>
        </div>
        <p class="rec-card-desc">${escapeHtml(rec.desc)}</p>
      </div>
      <div class="rec-card-footer">
        <span class="badge badge-genre">${escapeHtml(rec.genre)}</span>
        <button class="btn btn-primary btn-sm" onclick="addRecommendedBook('${rec.id}')">
          + Dodaj u listu
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterRecommendations(category, btnElem) {
  document.querySelectorAll(".rec-category-tabs .filter-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElem) btnElem.classList.add("active");

  activeRecCategory = category;

  if (category === 'smart') {
    renderRecommendations(onlineRecommendations);
  } else if (category === 'same-author') {
    const readingAuthors = userBooks.filter(b => b.status === 'reading').map(b => b.author.toLowerCase());
    const filtered = onlineRecommendations.filter(r => readingAuthors.some(a => r.author.toLowerCase().includes(a)));
    renderRecommendations(filtered.length > 0 ? filtered : onlineRecommendations);
  } else if (category === 'same-genre') {
    const readingGenres = userBooks.filter(b => b.status === 'reading').map(b => b.genre);
    const filtered = onlineRecommendations.filter(r => readingGenres.includes(r.genre));
    renderRecommendations(filtered.length > 0 ? filtered : onlineRecommendations);
  } else {
    const filtered = INICIJALNE_PREPORUKE.filter(r => r.genre === category);
    renderRecommendations(filtered.length > 0 ? filtered : INICIJALNE_PREPORUKE);
  }
}

function addRecommendedBook(recId) {
  const rec = onlineRecommendations.find(r => r.id === recId) || INICIJALNE_PREPORUKE.find(r => r.id === recId);
  if (!rec) return;

  const alreadyExists = userBooks.some(b => b.title.toLowerCase() === rec.title.toLowerCase());
  if (alreadyExists) {
    showToast(`Knjiga "${rec.title}" se već nalazi na vašoj listi!`, "toast-info");
    return;
  }

  const newBook = {
    id: "b_" + Date.now(),
    title: rec.title,
    author: rec.author,
    genre: rec.genre,
    status: "plan",
    totalPages: rec.totalPages || 300,
    currentPage: 0,
    coverUrl: rec.coverUrl || '',
    notes: rec.desc,
    isFavorite: false,
    rating: 0,
    createdAt: new Date().toISOString()
  };

  userBooks.unshift(newBook);
  saveUserBooks();
  showToast(`"${rec.title}" je dodana u "Želim pročitati"! 📌`, "toast-success");
}

function pickRandomBookRecommendation() {
  const pool = onlineRecommendations.length > 0 ? onlineRecommendations : INICIJALNE_PREPORUKE;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  const luckyBox = document.getElementById("luckyPickBox");
  document.getElementById("luckyTitle").textContent = picked.title;
  document.getElementById("luckyAuthor").textContent = `Autor: ${picked.author} (${picked.genre}, ~${picked.totalPages} str.)`;
  document.getElementById("luckyDesc").textContent = picked.desc;

  const coverBox = document.getElementById("luckyCoverBox");
  coverBox.innerHTML = picked.coverUrl 
    ? `<img src="${picked.coverUrl}" style="width:100%;height:100%;object-fit:cover;">`
    : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.5rem;">📖</div>`;

  const addBtn = document.getElementById("luckyAddBtn");
  addBtn.onclick = () => addRecommendedBook(picked.id);

  luckyBox.style.display = "flex";
  luckyBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast(`Preporuka trenutka: "${picked.title}"! 🎲`, "toast-info");
}

// ============================================================================
// 8. KREIRANJE I UREĐIVANJE KNJIGE (Modal)
// ============================================================================
let currentRating = 0;

function openAddBookModal() {
  openAddBookModalWithTitle("");
}

function openAddBookModalWithTitle(title) {
  document.getElementById("bookModalTitle").textContent = "Dodaj novu knjigu";
  document.getElementById("editBookId").value = "";
  document.getElementById("bookTitleInput").value = title || "";
  document.getElementById("bookAuthorInput").value = "";
  document.getElementById("bookGenreInput").value = "Roman";
  document.getElementById("bookStatusInput").value = (activeFilter === 'plan') ? "plan" : "reading";
  document.getElementById("bookTotalPages").value = "";
  document.getElementById("bookCurrentPage").value = "0";
  document.getElementById("bookCoverUrlInput").value = "";
  document.getElementById("bookNotesInput").value = "";
  document.getElementById("bookFavoriteInput").checked = false;
  
  setRating(0);
  calculateModalPercentage();

  document.getElementById("bookModalOverlay").classList.add("open");
  setTimeout(() => {
    if (title) {
      document.getElementById("bookAuthorInput").focus();
    } else {
      document.getElementById("bookTitleInput").focus();
    }
  }, 80);
}

function openEditBookModal(bookId) {
  const book = userBooks.find(b => b.id === bookId);
  if (!book) return;

  document.getElementById("bookModalTitle").textContent = "Uredi knjigu";
  document.getElementById("editBookId").value = book.id;
  document.getElementById("bookTitleInput").value = book.title;
  document.getElementById("bookAuthorInput").value = book.author;
  document.getElementById("bookGenreInput").value = book.genre || "Roman";
  document.getElementById("bookStatusInput").value = book.status || "reading";
  document.getElementById("bookTotalPages").value = book.totalPages;
  document.getElementById("bookCurrentPage").value = book.currentPage || 0;
  document.getElementById("bookCoverUrlInput").value = book.coverUrl || "";
  document.getElementById("bookNotesInput").value = book.notes || "";
  document.getElementById("bookFavoriteInput").checked = !!book.isFavorite;

  setRating(book.rating || 0);
  calculateModalPercentage();

  document.getElementById("bookModalOverlay").classList.add("open");
}

function closeBookModal() {
  document.getElementById("bookModalOverlay").classList.remove("open");
}

function handleStatusChangeInModal(newStatus) {
  const totalInput = document.getElementById("bookTotalPages");
  const currentInput = document.getElementById("bookCurrentPage");
  const total = parseInt(totalInput.value, 10) || 0;

  if (newStatus === 'completed') {
    if (total > 0) currentInput.value = total;
  } else if (newStatus === 'plan') {
    currentInput.value = 0;
  }
  calculateModalPercentage();
}

function calculateModalPercentage() {
  const total = parseInt(document.getElementById("bookTotalPages").value, 10) || 0;
  const current = parseInt(document.getElementById("bookCurrentPage").value, 10) || 0;
  const percentElem = document.getElementById("modalCalculatedPercent");

  if (total <= 0) {
    percentElem.textContent = "0%";
    return;
  }

  const p = Math.min(100, Math.round((current / total) * 100));
  percentElem.textContent = `${p}%`;
}

function setRating(rating) {
  currentRating = rating;
  document.getElementById("bookRatingInput").value = rating;

  const stars = document.querySelectorAll("#modalStarRating .star-item");
  stars.forEach(star => {
    const val = parseInt(star.getAttribute("data-value"), 10);
    if (val <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function handleSaveBook(event) {
  event.preventDefault();

  const editId = document.getElementById("editBookId").value;
  const title = document.getElementById("bookTitleInput").value.trim();
  const author = document.getElementById("bookAuthorInput").value.trim();
  const genre = document.getElementById("bookGenreInput").value;
  let status = document.getElementById("bookStatusInput").value;
  const totalPages = parseInt(document.getElementById("bookTotalPages").value, 10) || 1;
  let currentPage = parseInt(document.getElementById("bookCurrentPage").value, 10) || 0;
  const coverUrl = document.getElementById("bookCoverUrlInput").value.trim();
  const notes = document.getElementById("bookNotesInput").value.trim();
  const isFavorite = document.getElementById("bookFavoriteInput").checked;
  const rating = parseInt(document.getElementById("bookRatingInput").value, 10) || 0;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  if (currentPage >= totalPages && status === 'reading') {
    status = 'completed';
  }

  if (editId) {
    const index = userBooks.findIndex(b => b.id === editId);
    if (index !== -1) {
      userBooks[index] = {
        ...userBooks[index],
        title,
        author,
        genre,
        status,
        totalPages,
        currentPage,
        coverUrl,
        notes,
        isFavorite,
        rating,
        updatedAt: new Date().toISOString()
      };
      showToast(`Knjiga "${title}" je ažurirana!`, "toast-success");
    }
  } else {
    const newBook = {
      id: "b_" + Date.now(),
      title,
      author,
      genre,
      status,
      totalPages,
      currentPage,
      coverUrl,
      notes,
      isFavorite,
      rating,
      createdAt: new Date().toISOString()
    };
    userBooks.unshift(newBook);
    showToast(`Knjiga "${title}" je dodana! 📚`, "toast-success");
  }

  saveUserBooks();
  closeBookModal();
}

// ============================================================================
// 9. BRZO AŽURIRANJE STRANICE
// ============================================================================
function openQuickUpdateModal(bookId) {
  const book = userBooks.find(b => b.id === bookId);
  if (!book) return;

  document.getElementById("quickUpdateBookId").value = book.id;
  document.getElementById("quickUpdateBookTitle").textContent = `${book.title} (ukupno ${book.totalPages} str.)`;
  
  const pageInput = document.getElementById("quickUpdatePageInput");
  pageInput.value = book.currentPage || 0;
  pageInput.max = book.totalPages;
  
  document.getElementById("quickUpdateHelper").textContent = `Trenutno ste na ${book.currentPage}. stranici (${calculatePercent(book.currentPage, book.totalPages)}%).`;

  document.getElementById("quickUpdateModalOverlay").classList.add("open");
  setTimeout(() => pageInput.focus(), 80);
}

function closeQuickUpdateModal() {
  document.getElementById("quickUpdateModalOverlay").classList.remove("open");
}

function handleQuickUpdateSubmit(event) {
  event.preventDefault();
  const bookId = document.getElementById("quickUpdateBookId").value;
  const newPage = parseInt(document.getElementById("quickUpdatePageInput").value, 10);

  const book = userBooks.find(b => b.id === bookId);
  if (!book) return;

  if (isNaN(newPage) || newPage < 0) {
    showToast("Molimo unesite validan broj stranice.", "toast-error");
    return;
  }

  book.currentPage = Math.min(newPage, book.totalPages);

  if (book.currentPage >= book.totalPages) {
    book.status = "completed";
    showToast(`Čestitamo! Knjiga "${book.title}" je pročitana i premještena u pročitane! 🏆`, "toast-success");
  } else {
    showToast(`Napredak: ${book.currentPage} / ${book.totalPages} str. (${calculatePercent(book.currentPage, book.totalPages)}%)`, "toast-info");
  }

  saveUserBooks();
  closeQuickUpdateModal();
}

// ============================================================================
// 10. BRISANJE KNJIGE
// ============================================================================
function openDeleteModal(bookId) {
  const book = userBooks.find(b => b.id === bookId);
  if (!book) return;

  bookIdToDelete = bookId;
  document.getElementById("deleteBookTitle").textContent = `"${book.title}" - ${book.author}`;
  document.getElementById("deleteModalOverlay").classList.add("open");
}

function closeDeleteModal() {
  bookIdToDelete = null;
  document.getElementById("deleteModalOverlay").classList.remove("open");
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (!bookIdToDelete) return;

  const index = userBooks.findIndex(b => b.id === bookIdToDelete);
  if (index !== -1) {
    const title = userBooks[index].title;
    userBooks.splice(index, 1);
    saveUserBooks();
    showToast(`Knjiga "${title}" je obrisana.`, "toast-info");
  }

  closeDeleteModal();
});

// ============================================================================
// 11. FILTERI I SORTIRANJE
// ============================================================================
function setFilter(filterType) {
  activeFilter = filterType;

  document.querySelectorAll(".filter-tabs .filter-btn").forEach(btn => {
    if (btn.getAttribute("data-filter") === filterType) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderApp();
}

function handleGenreFilter(genre) {
  activeGenre = genre;
  renderBooksList();
}

function handleSort(sortType) {
  currentSort = sortType;
  renderBooksList();
}

// ============================================================================
// 12. REZERVNA KOPIJA (Export / Import JSON)
// ============================================================================
document.getElementById("backupModalBtn").addEventListener("click", () => {
  document.getElementById("backupModalOverlay").classList.add("open");
});

function closeBackupModal() {
  document.getElementById("backupModalOverlay").classList.remove("open");
}

function exportUserData() {
  if (!currentUser) return;

  const exportPayload = {
    app: "BookTracker",
    version: "2.1",
    exportedAt: new Date().toISOString(),
    user: {
      username: currentUser.username,
      fullName: currentUser.fullName
    },
    books: userBooks
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `booktracker_backup_${currentUser.username}_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast("Rezervna kopija je preuzeta! 📥", "toast-success");
}

function importUserData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.books || !Array.isArray(parsed.books)) {
        throw new Error("Neispravan format.");
      }

      const confirmImport = confirm(`Pronađeno ${parsed.books.length} knjiga u datoteci. Želite li ih uvesti?`);
      if (confirmImport) {
        userBooks = parsed.books;
        saveUserBooks();
        closeBackupModal();
        showToast(`Uspješno uvezeno ${userBooks.length} knjiga! 📚`, "toast-success");
      }
    } catch (err) {
      showToast("Greška pri učitavanju datoteke.", "toast-error");
    }
  };
  reader.readAsText(file);
}

// ============================================================================
// 13. TOAST NOTIFIKACIJE
// ============================================================================
function showToast(message, type = "toast-info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translate3d(100%, 0, 0)";
    toast.style.transition = "transform 0.2s ease, opacity 0.2s ease";
    setTimeout(() => toast.remove(), 220);
  }, 3000);
}
