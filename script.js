// Datos ODS
const odsData = [
    { number: 1, title: "Fin de la pobreza", description: "Erradicar la pobreza en todas sus formas en todo el mundo." },
    { number: 2, title: "Hambre cero", description: "Poner fin al hambre, lograr la seguridad alimentaria." },
    { number: 3, title: "Salud y bienestar", description: "Garantizar una vida saludable y promover el bienestar." },
    { number: 4, title: "Educación de calidad", description: "Educación inclusiva, equitativa y de calidad." },
    { number: 5, title: "Igualdad de género", description: "Alcanzar la igualdad de género y empoderar a mujeres." },
    { number: 6, title: "Agua limpia y saneamiento", description: "Garantizar disponibilidad de agua y saneamiento." },
    { number: 7, title: "Energía asequible", description: "Acceso a energía asequible y sostenible." },
    { number: 8, title: "Trabajo decente", description: "Promover crecimiento económico y trabajo decente." },
    { number: 9, title: "Industria e innovación", description: "Infraestructura resiliente e innovación." },
    { number: 10, title: "Reducción de desigualdades", description: "Reducir la desigualdad dentro de países." },
    { number: 11, title: "Ciudades sostenibles", description: "Ciudades inclusivas y sostenibles." },
    { number: 12, title: "Producción responsable", description: "Consumo y producción sostenibles." },
    { number: 13, title: "Acción por el clima", description: "Tomar medidas urgentes contra cambio climático." },
    { number: 14, title: "Vida submarina", description: "Conservar océanos y recursos marinos." },
    { number: 15, title: "Vida de ecosistemas", description: "Proteger ecosistemas terrestres." },
    { number: 16, title: "Paz y justicia", description: "Promover sociedades pacíficas e inclusivas." },
    { number: 17, title: "Alianzas para lograr objetivos", description: "Fortalecer alianzas globales." }
];

let exploredODS = JSON.parse(localStorage.getItem('exploredODS')) || [];

// Renderizar tarjetas con filtro
function renderODSCards(filterText = '') {
    const grid = document.getElementById('odsGrid');
    if (!grid) return;
    
    const filtered = odsData.filter(ods => 
        ods.title.toLowerCase().includes(filterText.toLowerCase())
    );
    
    grid.innerHTML = '';
    filtered.forEach(ods => {
        const isExplored = exploredODS.includes(ods.number);
        const card = document.createElement('div');
        card.className = 'ods-card';
        card.setAttribute('data-id', ods.number);
        card.style.animationDelay = `${ods.number * 0.03}s`;
        
        card.innerHTML = `
            <div class="card-header" style="background: linear-gradient(145deg, #1f6e55, #124f3e);">
                <div class="ods-number">${ods.number}</div>
                <h3 class="ods-title">${ods.title} ${isExplored ? '✅' : ''}</h3>
            </div>
            <div class="card-body">
                <p class="ods-description">${ods.description}</p>
                <button class="btn-card explorar-btn" data-num="${ods.number}" data-title="${ods.title}" data-desc="${ods.description}">📖 Explorar ODS</button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    updateCounter();
    attachCardEvents();
}

function attachCardEvents() {
    document.querySelectorAll('.explorar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const num = parseInt(btn.getAttribute('data-num'));
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            
            if (!exploredODS.includes(num)) {
                exploredODS.push(num);
                localStorage.setItem('exploredODS', JSON.stringify(exploredODS));
                updateCounter();
                renderODSCards(document.getElementById('searchInput')?.value || '');
            }
            showODSModal(title, desc);
        });
    });
}

function updateCounter() {
    const counterSpan = document.getElementById('odsCounter');
    if (counterSpan) {
        counterSpan.textContent = exploredODS.length;
        if (exploredODS.length === 17) {
            counterSpan.innerHTML = '🎉 ¡Completaste los 17! 🎉';
        }
    }
}

function showODSModal(title, description) {
    let overlay = document.querySelector('.ods-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay ods-modal-overlay';
        overlay.innerHTML = `
            <div class="modal-container">
                <h3 id="odsModalTitle"></h3>
                <p id="odsModalDesc"></p>
                <button class="close-modal">Cerrar</button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('.close-modal').addEventListener('click', () => {
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    }
    overlay.querySelector('#odsModalTitle').textContent = title;
    overlay.querySelector('#odsModalDesc').textContent = description;
    overlay.classList.add('active');
}

// Modal de ciudadanía digital con temporizador
function initDigitalModal() {
    const modal = document.getElementById('digitalModal');
    const openBtns = [document.getElementById('digitalTipsBtn'), document.getElementById('floatingTipBtn')];
    const closeBtn = document.getElementById('closeDigitalModal');
    let timerInterval = null;
    
    function openModal() {
        modal.classList.add('active');
        let seconds = 6;
        const timerSpan = document.getElementById('timerSeconds');
        if (timerSpan) timerSpan.textContent = seconds;
        
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            seconds--;
            if (timerSpan) timerSpan.textContent = seconds;
            if (seconds <= 0) {
                clearInterval(timerInterval);
                modal.classList.remove('active');
            }
        }, 1000);
    }
    
    openBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openModal);
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (timerInterval) clearInterval(timerInterval);
            modal.classList.remove('active');
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (timerInterval) clearInterval(timerInterval);
            modal.classList.remove('active');
        }
    });
}

// Modo oscuro
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️ Modo claro';
    }
    
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        toggleBtn.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
    });
}

// Carrusel Swiper
function initSwiper() {
    new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        speed: 800,
    });
}

// Búsqueda en tiempo real
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderODSCards(e.target.value);
        });
    }
}

// Botón explorar scroll
function setupHeroButton() {
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const odsSection = document.getElementById('odsGrid');
            if (odsSection) {
                odsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    renderODSCards();
    initSwiper();
    initDigitalModal();
    initDarkMode();
    initSearch();
    setupHeroButton();
});