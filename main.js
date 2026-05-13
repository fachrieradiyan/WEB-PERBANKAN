// Bank Account State
let balance = 0;
let totalDeposit = 0;
let totalWithdraw = 0;
let transactions = [];
let currentUser = null;
let isVIP = false;
let isPriority = false; // Status akun prioritas (Gold)

// ===== SMOOTH ANIMATION SYSTEM =====
let animators = {};

// Initialize animators for smooth animations
function initAnimators() {
    console.log('🎨 Initializing smooth animators...');
    
    // Animator untuk balance
    if (document.getElementById('balance')) {
        animators.balance = new AdvancedSmoothAnimator(
            document.getElementById('balance'),
            {
                useSpring: true,
                springConfig: { stiffness: 170, damping: 26, mass: 1 },
                decimals: 0,
                prefix: '',
                suffix: '',
                showDirection: false,
                useGlow: false
            }
        );
    }

    // Animator untuk total deposit
    if (document.getElementById('totalDeposit')) {
        animators.totalDeposit = new AdvancedSmoothAnimator(
            document.getElementById('totalDeposit'),
            {
                useSpring: true,
                springConfig: { stiffness: 170, damping: 26, mass: 1 },
                decimals: 0,
                prefix: '',
                suffix: '',
                showDirection: false,
                useGlow: false
            }
        );
    }

    // Animator untuk total withdraw
    if (document.getElementById('totalWithdraw')) {
        animators.totalWithdraw = new AdvancedSmoothAnimator(
            document.getElementById('totalWithdraw'),
            {
                useSpring: true,
                springConfig: { stiffness: 170, damping: 26, mass: 1 },
                decimals: 0,
                prefix: '',
                suffix: '',
                showDirection: false,
                useGlow: false
            }
        );
    }

    console.log('✅ Smooth animators initialized!');
}
// ===== END SMOOTH ANIMATION SYSTEM =====

// VIP Account Configuration
const VIP_ACCOUNTS = {
    'dirut': {
        password: 'dirut2026',
        name: 'Direktur Utama',
        title: 'CEO & Founder',
        badge: 'VIP',
        balanceLimit: Infinity,
        features: ['analytics', 'unlimited', 'priority', 'exclusive']
    }
};

// Stock Market State
let stocks = [
    // Perbankan
    { id: 'BBCA', name: 'Bank Central Asia', price: 9500, basePrice: 9500, owned: 0, sector: 'Perbankan' },
    { id: 'BBRI', name: 'Bank Rakyat Indonesia', price: 5200, basePrice: 5200, owned: 0, sector: 'Perbankan' },
    { id: 'BMRI', name: 'Bank Mandiri', price: 6100, basePrice: 6100, owned: 0, sector: 'Perbankan' },
    { id: 'BBNI', name: 'Bank Negara Indonesia', price: 5400, basePrice: 5400, owned: 0, sector: 'Perbankan' },
    { id: 'BBTN', name: 'Bank Tabungan Negara', price: 1450, basePrice: 1450, owned: 0, sector: 'Perbankan' },
    
    // Telekomunikasi
    { id: 'TLKM', name: 'Telkom Indonesia', price: 3800, basePrice: 3800, owned: 0, sector: 'Telekomunikasi' },
    { id: 'EXCL', name: 'XL Axiata', price: 2500, basePrice: 2500, owned: 0, sector: 'Telekomunikasi' },
    { id: 'ISAT', name: 'Indosat Ooredoo', price: 2200, basePrice: 2200, owned: 0, sector: 'Telekomunikasi' },
    
    // Otomotif & Transportasi
    { id: 'ASII', name: 'Astra International', price: 6700, basePrice: 6700, owned: 0, sector: 'Otomotif' },
    { id: 'AUTO', name: 'Astra Otoparts', price: 1800, basePrice: 1800, owned: 0, sector: 'Otomotif' },
    { id: 'GGRM', name: 'Gudang Garam', price: 24500, basePrice: 24500, owned: 0, sector: 'Otomotif' },
    
    // Konsumen
    { id: 'UNVR', name: 'Unilever Indonesia', price: 4300, basePrice: 4300, owned: 0, sector: 'Konsumen' },
    { id: 'ICBP', name: 'Indofood CBP', price: 10800, basePrice: 10800, owned: 0, sector: 'Konsumen' },
    { id: 'INDF', name: 'Indofood Sukses Makmur', price: 6500, basePrice: 6500, owned: 0, sector: 'Konsumen' },
    { id: 'KLBF', name: 'Kalbe Farma', price: 1550, basePrice: 1550, owned: 0, sector: 'Konsumen' },
    { id: 'MYOR', name: 'Mayora Indah', price: 2400, basePrice: 2400, owned: 0, sector: 'Konsumen' },
    
    // Teknologi
    { id: 'GOTO', name: 'GoTo Gojek Tokopedia', price: 150, basePrice: 150, owned: 0, sector: 'Teknologi' },
    { id: 'BUKA', name: 'Bukalapak', price: 95, basePrice: 95, owned: 0, sector: 'Teknologi' },
    { id: 'EMTK', name: 'Elang Mahkota Teknologi', price: 850, basePrice: 850, owned: 0, sector: 'Teknologi' },
    
    // Pertambangan
    { id: 'ANTM', name: 'Aneka Tambang', price: 1850, basePrice: 1850, owned: 0, sector: 'Pertambangan' },
    { id: 'INCO', name: 'Vale Indonesia', price: 4200, basePrice: 4200, owned: 0, sector: 'Pertambangan' },
    { id: 'ADRO', name: 'Adaro Energy', price: 2900, basePrice: 2900, owned: 0, sector: 'Pertambangan' },
    { id: 'PTBA', name: 'Bukit Asam', price: 3100, basePrice: 3100, owned: 0, sector: 'Pertambangan' },
    { id: 'ITMG', name: 'Indo Tambangraya Megah', price: 28500, basePrice: 28500, owned: 0, sector: 'Pertambangan' },
    { id: 'MDKA', name: 'Merdeka Copper Gold', price: 1650, basePrice: 1650, owned: 0, sector: 'Pertambangan' },
    
    // Properti & Konstruksi
    { id: 'BSDE', name: 'Bumi Serpong Damai', price: 1200, basePrice: 1200, owned: 0, sector: 'Properti' },
    { id: 'SMRA', name: 'Summarecon Agung', price: 950, basePrice: 950, owned: 0, sector: 'Properti' },
    { id: 'WIKA', name: 'Wijaya Karya', price: 1350, basePrice: 1350, owned: 0, sector: 'Properti' },
    { id: 'PTPP', name: 'PP (Persero)', price: 1100, basePrice: 1100, owned: 0, sector: 'Properti' },
    
    // Energi
    { id: 'PGAS', name: 'Perusahaan Gas Negara', price: 1500, basePrice: 1500, owned: 0, sector: 'Energi' },
    { id: 'MEDC', name: 'Medco Energi', price: 1250, basePrice: 1250, owned: 0, sector: 'Energi' },
    
    // Retail
    { id: 'ACES', name: 'Ace Hardware Indonesia', price: 850, basePrice: 850, owned: 0, sector: 'Retail' },
    { id: 'MAPI', name: 'Mitra Adiperkasa', price: 1800, basePrice: 1800, owned: 0, sector: 'Retail' }
];

// Cryptocurrency Market State
let cryptos = [
    // Top Market Cap
    { id: 'BTC', name: 'Bitcoin', symbol: '₿', price: 950000000, basePrice: 950000000, owned: 0, category: 'Layer 1', icon: '🟠' },
    { id: 'ETH', name: 'Ethereum', symbol: 'Ξ', price: 52000000, basePrice: 52000000, owned: 0, category: 'Layer 1', icon: '⬢' },
    { id: 'BNB', name: 'Binance Coin', symbol: 'BNB', price: 8500000, basePrice: 8500000, owned: 0, category: 'Exchange', icon: '🟡' },
    
    // Layer 1 Blockchains
    { id: 'SOL', name: 'Solana', symbol: 'SOL', price: 2800000, basePrice: 2800000, owned: 0, category: 'Layer 1', icon: '🟣' },
    { id: 'ADA', name: 'Cardano', symbol: 'ADA', price: 950000, basePrice: 950000, owned: 0, category: 'Layer 1', icon: '🔵' },
    { id: 'AVAX', name: 'Avalanche', symbol: 'AVAX', price: 680000, basePrice: 680000, owned: 0, category: 'Layer 1', icon: '🔴' },
    { id: 'DOT', name: 'Polkadot', symbol: 'DOT', price: 1200000, basePrice: 1200000, owned: 0, category: 'Layer 0', icon: '🔴' },
    { id: 'ATOM', name: 'Cosmos', symbol: 'ATOM', price: 1500000, basePrice: 1500000, owned: 0, category: 'Layer 0', icon: '⚛️' },
    { id: 'NEAR', name: 'NEAR Protocol', symbol: 'NEAR', price: 850000, basePrice: 850000, owned: 0, category: 'Layer 1', icon: '🌈' },
    
    // Layer 2 Solutions
    { id: 'MATIC', name: 'Polygon', symbol: 'MATIC', price: 1800000, basePrice: 1800000, owned: 0, category: 'Layer 2', icon: '🟣' },
    { id: 'ARB', name: 'Arbitrum', symbol: 'ARB', price: 1350000, basePrice: 1350000, owned: 0, category: 'Layer 2', icon: '�' },
    { id: 'OP', name: 'Optimism', symbol: 'OP', price: 3200000, basePrice: 3200000, owned: 0, category: 'Layer 2', icon: '🔴' },
    
    // DeFi Tokens
    { id: 'UNI', name: 'Uniswap', symbol: 'UNI', price: 1450000, basePrice: 1450000, owned: 0, category: 'DeFi', icon: '🦄' },
    { id: 'LINK', name: 'Chainlink', symbol: 'LINK', price: 2800000, basePrice: 2800000, owned: 0, category: 'DeFi', icon: '🔗' },
    { id: 'AAVE', name: 'Aave', symbol: 'AAVE', price: 1950000, basePrice: 1950000, owned: 0, category: 'DeFi', icon: '👻' },
    { id: 'MKR', name: 'Maker', symbol: 'MKR', price: 42000000, basePrice: 42000000, owned: 0, category: 'DeFi', icon: '🟢' },
    
    // Stablecoins
    { id: 'USDT', name: 'Tether', symbol: 'USDT', price: 15800, basePrice: 15800, owned: 0, category: 'Stablecoin', icon: '💵' },
    { id: 'USDC', name: 'USD Coin', symbol: 'USDC', price: 15800, basePrice: 15800, owned: 0, category: 'Stablecoin', icon: '💲' },
    
    // Meme Coins
    { id: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', price: 1500, basePrice: 1500, owned: 0, category: 'Meme', icon: '🐕' },
    { id: 'SHIB', name: 'Shiba Inu', symbol: 'SHIB', price: 0.35, basePrice: 0.35, owned: 0, category: 'Meme', icon: '�' },
    { id: 'PEPE', name: 'Pepe', symbol: 'PEPE', price: 0.15, basePrice: 0.15, owned: 0, category: 'Meme', icon: '🐸' },
    
    // Gaming & Metaverse
    { id: 'SAND', name: 'The Sandbox', symbol: 'SAND', price: 850000, basePrice: 850000, owned: 0, category: 'Metaverse', icon: '🏖️' },
    { id: 'MANA', name: 'Decentraland', symbol: 'MANA', price: 750000, basePrice: 750000, owned: 0, category: 'Metaverse', icon: '🌐' },
    { id: 'AXS', name: 'Axie Infinity', symbol: 'AXS', price: 1200000, basePrice: 1200000, owned: 0, category: 'Gaming', icon: '🎮' },
    
    // Other Popular
    { id: 'XRP', name: 'Ripple', symbol: 'XRP', price: 9500, basePrice: 9500, owned: 0, category: 'Payment', icon: '💧' },
    { id: 'LTC', name: 'Litecoin', symbol: 'LTC', price: 1850000, basePrice: 1850000, owned: 0, category: 'Payment', icon: '⚡' },
    { id: 'TRX', name: 'TRON', symbol: 'TRX', price: 3200, basePrice: 3200, owned: 0, category: 'Layer 1', icon: '⚫' },
    { id: 'TON', name: 'Toncoin', symbol: 'TON', price: 4500000, basePrice: 4500000, owned: 0, category: 'Layer 1', icon: '�' }
];

let stockPriceInterval = null;
let cryptoPriceInterval = null;
let currentStockAction = null;
let currentStockId = null;
let currentCryptoAction = null;
let currentCryptoId = null;

// Load data from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadDarkModePreference();
    checkAuth();
});

// Check authentication status
function checkAuth() {
    const loggedInUser = localStorage.getItem('currentUser');
    const vipStatus = localStorage.getItem('isVIP');
    
    if (loggedInUser) {
        currentUser = loggedInUser;
        isVIP = vipStatus === 'true';
        
        // Load user data FIRST before showing app
        loadUserData();
        
        showApp();
        
        // Initialize smooth animators
        setTimeout(() => {
            initAnimators();
        }, 100);
        
        updateDisplay();
        renderTransactionHistory();
        renderStocks();
        renderMyStocks();
        updatePortfolioValue();
        startStockPriceUpdates();
        
        // Start crypto price updates (data already loaded)
        startCryptoPriceUpdates();
        
        // Load last page or default to dashboard
        const lastPage = localStorage.getItem('currentPage') || 'dashboard';
        switchPage(lastPage);
    } else {
        showAuth();
    }
}

// ===== DARK MODE FUNCTIONS =====

// Load dark mode preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.documentElement.classList.add('dark');
        updateDarkModeIcon();
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    updateDarkModeIcon();
}

// Update dark mode icon
function updateDarkModeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunIcon = document.querySelector('.dark-icon-sun');
    const moonIcon = document.querySelector('.dark-icon-moon');
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }
}

// ===== PAGE NAVIGATION FUNCTIONS =====

// Switch between pages
function switchPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    const selectedPage = document.getElementById('page' + pageName.charAt(0).toUpperCase() + pageName.slice(1));
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
    
    // Update tab styles
    const tabs = ['Dashboard', 'Transactions', 'Stocks', 'Crypto', 'Chart', 'Profile'];
    tabs.forEach(tab => {
        const tabElement = document.getElementById('tab' + tab);
        if (tabElement) {
            if (tab.toLowerCase() === pageName.toLowerCase()) {
                tabElement.className = 'flex-1 py-3 px-4 rounded-xl font-semibold transition duration-200 bg-accent text-white';
            } else {
                tabElement.className = 'flex-1 py-3 px-4 rounded-xl font-semibold transition duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
            }
        }
    });
    
    // Render content based on page
    if (pageName === 'stocks') {
        renderStocks();
        renderMyStocks();
        updatePortfolioValue();
    } else if (pageName === 'transactions') {
        renderTransactionHistory();
    } else if (pageName === 'crypto') {
        renderCryptos();
        renderMyCryptos();
        updateCryptoPortfolioValue();
    } else if (pageName === 'chart') {
        initChartPage();
    } else if (pageName === 'profile') {
        renderProfilePage();
    }
    
    // Save current page
    localStorage.setItem('currentPage', pageName);
}

// Show authentication screen
function showAuth() {
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
}

// Show main app screen
function showApp() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    
    // Update user display
    updateUserDisplay();
}

// Update user display with badges
function updateUserDisplay() {
    const userDisplay = document.getElementById('currentUser');
    
    if (isVIP && VIP_ACCOUNTS[currentUser]) {
        // VIP Account
        userDisplay.innerHTML = `
            ${VIP_ACCOUNTS[currentUser].name}
            <span class="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold rounded-full animate-pulse">
                👑 ${VIP_ACCOUNTS[currentUser].badge}
            </span>
        `;
    } else if (isPriority) {
        // Priority Account (Gold)
        userDisplay.innerHTML = `
            ${currentUser}
            <span class="ml-2 px-3 py-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full shadow-lg" style="box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);">
                ⭐ PRIORITY
            </span>
        `;
    } else {
        // Regular Account
        userDisplay.textContent = currentUser;
    }
}

// Show Priority upgrade notification
function showPriorityUpgradeNotification() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in';
    overlay.style.animation = 'fadeIn 0.3s ease-out';
    
    // Create modal content
    overlay.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center transform scale-0" 
             style="animation: scaleIn 0.5s ease-out forwards;">
            <div class="mb-6">
                <div class="text-6xl mb-4 animate-bounce">⭐</div>
                <h2 class="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    SELAMAT!
                </h2>
                <p class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Akun Anda Telah Ditingkatkan!
                </p>
            </div>
            
            <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-xl p-6 mb-6">
                <div class="flex items-center justify-center gap-3 mb-3">
                    <span class="text-2xl">🎉</span>
                    <span class="text-lg font-bold text-gray-800 dark:text-white">
                        AKUN PRIORITY
                    </span>
                    <span class="text-2xl">🎉</span>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Total setoran Anda telah mencapai<br>
                    <span class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                        Rp 100 Miliar+
                    </span>
                </p>
                <div class="bg-white dark:bg-gray-700 rounded-lg p-4 mb-3">
                    <p class="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                        ✨ Keuntungan Priority:
                    </p>
                    <ul class="text-xs text-left text-gray-700 dark:text-gray-300 space-y-1">
                        <li>⭐ Badge Priority berwarna Gold</li>
                        <li>🎯 Prioritas layanan customer service</li>
                        <li>💎 Akses fitur eksklusif</li>
                        <li>🚀 Limit transaksi lebih tinggi</li>
                    </ul>
                </div>
            </div>
            
            <button onclick="closePriorityModal()" 
                    class="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200 transform hover:scale-105">
                Luar Biasa! 🎊
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add to global scope for closing
    window.closePriorityModal = function() {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(overlay);
            delete window.closePriorityModal;
        }, 300);
    };
    
    // Play celebration sound (optional)
    console.log('🎉 PRIORITY ACCOUNT UNLOCKED!');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes scaleIn {
        from { 
            transform: scale(0);
            opacity: 0;
        }
        to { 
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Reset stock ownership (clear all owned stocks)
function resetStockOwnership() {
    stocks.forEach(stock => {
        stock.owned = 0;
        stock.buyPrice = stock.price;
    });
}

// Switch between login and register tabs
function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        loginTab.className = 'flex-1 py-4 font-semibold text-accent border-b-2 border-accent';
        registerTab.className = 'flex-1 py-4 font-semibold text-gray-500';
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginTab.className = 'flex-1 py-4 font-semibold text-gray-500';
        registerTab.className = 'flex-1 py-4 font-semibold text-accent border-b-2 border-accent';
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

// Register new user
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Validation
    if (!username || !password || !passwordConfirm) {
        showNotification('Semua field harus diisi!', 'error');
        return;
    }
    
    if (username.length < 3) {
        showNotification('Username minimal 3 karakter!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password minimal 6 karakter!', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showNotification('Password tidak cocok!', 'error');
        return;
    }
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    if (users[username]) {
        showNotification('Username sudah digunakan!', 'error');
        return;
    }
    
    // Save new user
    users[username] = {
        password: password,
        balance: 0,
        totalDeposit: 0,
        totalWithdraw: 0,
        transactions: []
    };
    localStorage.setItem('bankAppUsers', JSON.stringify(users));
    
    // Clear form
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerPasswordConfirm').value = '';
    
    showNotification('Registrasi berhasil! Silakan login.', 'success');
    switchAuthTab('login');
}

// Login user
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validation
    if (!username || !password) {
        showNotification('Username dan password harus diisi!', 'error');
        return;
    }
    
    // Check VIP account first
    if (VIP_ACCOUNTS[username]) {
        if (VIP_ACCOUNTS[username].password === password) {
            // VIP Login
            currentUser = username;
            isVIP = true;
            localStorage.setItem('currentUser', username);
            localStorage.setItem('isVIP', 'true');
            
            // Clear form
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
            
            showNotification('Selamat datang, ' + VIP_ACCOUNTS[username].name + '! 👑', 'success');
            
            // Load user data FIRST
            loadUserData();
            
            showApp();
            updateDisplay();
            renderTransactionHistory();
            return;
        } else {
            showNotification('Password salah!', 'error');
            return;
        }
    }
    
    // Check regular credentials
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    if (!users[username]) {
        showNotification('Username tidak ditemukan!', 'error');
        return;
    }
    
    if (users[username].password !== password) {
        showNotification('Password salah!', 'error');
        return;
    }
    
    // Login successful
    currentUser = username;
    isVIP = false;
    localStorage.setItem('currentUser', username);
    localStorage.setItem('isVIP', 'false');
    
    // Clear form
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    
    showNotification('Login berhasil!', 'success');
    
    // Load user data FIRST
    loadUserData();
    
    showApp();
    updateDisplay();
    renderTransactionHistory();
}

// Logout user
function logout() {
    console.log('Logout function called');
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        try {
            console.log('User confirmed logout');
            saveUserData();
            stopStockPriceUpdates();
            stopCryptoPriceUpdates();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isVIP');
            currentUser = null;
            isVIP = false;
            isPriority = false; // Reset Priority status
            balance = 0;
            totalDeposit = 0;
            totalWithdraw = 0;
            transactions = [];
            
            // Reset all stock ownership
            resetStockOwnership();
            
            // Reset all crypto ownership
            resetCryptoOwnership();
            
            showAuth();
            showNotification('Logout berhasil!', 'success');
            console.log('Logout completed successfully');
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Terjadi error saat logout: ' + error.message);
        }
    } else {
        console.log('User cancelled logout');
    }
}

// Load user-specific data
function loadUserData() {
    if (!currentUser) return;
    
    console.log('=== LOADING USER DATA ===');
    console.log('Current user:', currentUser);
    
    // Reset stocks and cryptos to zero FIRST (clean slate)
    stocks.forEach(stock => {
        stock.owned = 0;
        stock.buyPrice = stock.price;
    });
    
    cryptos.forEach(crypto => {
        crypto.owned = 0;
        crypto.buyPrice = crypto.price;
    });
    
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    console.log('Users in localStorage:', Object.keys(users));
    
    if (users[currentUser]) {
        balance = users[currentUser].balance || 0;
        totalDeposit = users[currentUser].totalDeposit || 0;
        totalWithdraw = users[currentUser].totalWithdraw || 0;
        transactions = users[currentUser].transactions || [];
        isPriority = users[currentUser].isPriority || false; // Load Priority status
        
        console.log('Loaded balance:', balance);
        console.log('Loaded totalDeposit:', totalDeposit);
        console.log('Loaded transactions:', transactions.length);
        console.log('Priority status:', isPriority);
        
        // Auto-check Priority status based on totalDeposit
        if (!isPriority && totalDeposit >= 100000000000) {
            isPriority = true;
            console.log('✨ Auto-upgraded to Priority based on total deposit');
        }
        
        // Load stock portfolio
        if (users[currentUser].stocks) {
            console.log('Loading stocks:', users[currentUser].stocks.length);
            users[currentUser].stocks.forEach(userStock => {
                const stock = stocks.find(s => s.id === userStock.id);
                if (stock) {
                    stock.owned = userStock.owned || 0;
                    stock.buyPrice = userStock.buyPrice || stock.price;
                    console.log(`  - ${stock.id}: ${stock.owned} shares @ Rp ${stock.buyPrice}`);
                }
            });
        }
        
        // Load crypto portfolio
        if (users[currentUser].cryptos) {
            console.log('Loading cryptos:', users[currentUser].cryptos.length);
            users[currentUser].cryptos.forEach(userCrypto => {
                const crypto = cryptos.find(c => c.id === userCrypto.id);
                if (crypto) {
                    crypto.owned = userCrypto.owned || 0;
                    crypto.buyPrice = userCrypto.buyPrice || crypto.price;
                    console.log(`  - ${crypto.id}: ${crypto.owned} coins @ Rp ${crypto.buyPrice}`);
                }
            });
        }
    } else {
        console.log('No data found for user:', currentUser);
        isPriority = false;
    }
    
    console.log('=== DATA LOADED ===');
}

// Save user-specific data
function saveUserData() {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    
    // Don't save VIP accounts (they're hardcoded)
    if (VIP_ACCOUNTS[currentUser]) {
        console.log('VIP account - data not saved to localStorage');
        return;
    }
    
    // Make sure user exists in localStorage before saving
    if (!users[currentUser]) {
        console.error('User not found in localStorage:', currentUser);
        return;
    }
    
    // Preserve existing displayName if exists
    const existingDisplayName = users[currentUser].displayName || currentUser;
    
    users[currentUser] = {
        password: users[currentUser].password,
        displayName: existingDisplayName,
        isPriority: isPriority, // Save Priority status
        balance,
        totalDeposit,
        totalWithdraw,
        transactions,
        stocks: stocks.filter(s => s.owned > 0).map(s => ({ 
            id: s.id, 
            owned: s.owned,
            buyPrice: s.buyPrice || s.price
        })),
        cryptos: cryptos.filter(c => c.owned > 0).map(c => ({ 
            id: c.id, 
            owned: c.owned,
            buyPrice: c.buyPrice || c.price
        }))
    };
    localStorage.setItem('bankAppUsers', JSON.stringify(users));
    console.log('Data saved for user:', currentUser, '| Priority:', isPriority);
}

// Format number to Indonesian Rupiah format
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID').format(amount);
}

// Format quantity (stocks/crypto) with thousand separators
function formatQuantity(quantity, decimals = 0) {
    if (decimals > 0) {
        // For crypto with decimals
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(quantity);
    } else {
        // For stocks (whole numbers)
        return new Intl.NumberFormat('id-ID').format(quantity);
    }
}

// Convert number to Indonesian words (terbilang)
function numberToWords(num) {
    if (num === 0) return 'nol';
    
    const ones = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
    const teens = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 
                   'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
    
    function convertLessThanThousand(n) {
        if (n === 0) return '';
        if (n < 10) return ones[n];
        if (n >= 10 && n < 20) return teens[n - 10];
        if (n < 100) {
            const tens = Math.floor(n / 10);
            const remainder = n % 10;
            return ones[tens] + ' puluh' + (remainder > 0 ? ' ' + ones[remainder] : '');
        }
        if (n < 1000) {
            const hundreds = Math.floor(n / 100);
            const remainder = n % 100;
            const hundredWord = hundreds === 1 ? 'seratus' : ones[hundreds] + ' ratus';
            return hundredWord + (remainder > 0 ? ' ' + convertLessThanThousand(remainder) : '');
        }
    }
    
    if (num < 1000) {
        return convertLessThanThousand(num);
    }
    
    // Ribuan
    if (num < 1000000) {
        const thousands = Math.floor(num / 1000);
        const remainder = num % 1000;
        const thousandWord = thousands === 1 ? 'seribu' : convertLessThanThousand(thousands) + ' ribu';
        return thousandWord + (remainder > 0 ? ' ' + convertLessThanThousand(remainder) : '');
    }
    
    // Jutaan
    if (num < 1000000000) {
        const millions = Math.floor(num / 1000000);
        const remainder = num % 1000000;
        let result = convertLessThanThousand(millions) + ' juta';
        if (remainder >= 1000) {
            const thousands = Math.floor(remainder / 1000);
            const finalRemainder = remainder % 1000;
            const thousandWord = thousands === 1 ? 'seribu' : convertLessThanThousand(thousands) + ' ribu';
            result += ' ' + thousandWord;
            if (finalRemainder > 0) {
                result += ' ' + convertLessThanThousand(finalRemainder);
            }
        } else if (remainder > 0) {
            result += ' ' + convertLessThanThousand(remainder);
        }
        return result;
    }
    
    // Miliaran
    if (num < 1000000000000) {
        const billions = Math.floor(num / 1000000000);
        const remainder = num % 1000000000;
        let result = convertLessThanThousand(billions) + ' miliar';
        if (remainder >= 1000000) {
            const millions = Math.floor(remainder / 1000000);
            const millionRemainder = remainder % 1000000;
            result += ' ' + convertLessThanThousand(millions) + ' juta';
            if (millionRemainder >= 1000) {
                const thousands = Math.floor(millionRemainder / 1000);
                const finalRemainder = millionRemainder % 1000;
                const thousandWord = thousands === 1 ? 'seribu' : convertLessThanThousand(thousands) + ' ribu';
                result += ' ' + thousandWord;
                if (finalRemainder > 0) {
                    result += ' ' + convertLessThanThousand(finalRemainder);
                }
            } else if (millionRemainder > 0) {
                result += ' ' + convertLessThanThousand(millionRemainder);
            }
        } else if (remainder >= 1000) {
            const thousands = Math.floor(remainder / 1000);
            const finalRemainder = remainder % 1000;
            const thousandWord = thousands === 1 ? 'seribu' : convertLessThanThousand(thousands) + ' ribu';
            result += ' ' + thousandWord;
            if (finalRemainder > 0) {
                result += ' ' + convertLessThanThousand(finalRemainder);
            }
        } else if (remainder > 0) {
            result += ' ' + convertLessThanThousand(remainder);
        }
        return result;
    }
    
    return 'angka terlalu besar';
}

// Format input with comma separator
function formatInputWithComma(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Format with comma separator
    if (value) {
        value = parseInt(value).toLocaleString('id-ID');
    }
    
    input.value = value;
    
    // Update terbilang display
    updateTerbilangDisplay(input);
}

// Update terbilang (words) display
function updateTerbilangDisplay(input) {
    const numericValue = getNumericValue(input);
    const terbilangId = input.id === 'depositAmount' ? 'depositTerbilang' : 'withdrawTerbilang';
    const terbilangElement = document.getElementById(terbilangId);
    
    if (terbilangElement) {
        if (numericValue > 0) {
            const words = numberToWords(numericValue);
            terbilangElement.textContent = words.charAt(0).toUpperCase() + words.slice(1) + ' rupiah';
            terbilangElement.classList.remove('hidden');
        } else {
            terbilangElement.classList.add('hidden');
        }
    }
}

// Get numeric value from formatted input
function getNumericValue(input) {
    return parseFloat(input.value.replace(/\./g, '').replace(/,/g, '')) || 0;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationContent = document.getElementById('notificationContent');
    const notificationMessage = document.getElementById('notificationMessage');
    
    // Set message
    notificationMessage.textContent = message;
    
    // Set color based on type
    if (type === 'success') {
        notificationContent.className = 'bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-green-500';
    } else if (type === 'error') {
        notificationContent.className = 'bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-red-500';
    } else if (type === 'warning') {
        notificationContent.className = 'bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-yellow-500';
    }
    
    // Show notification
    notification.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Update display dengan smooth animation
function updateDisplay() {
    // Gunakan smooth animation jika tersedia
    if (animators.balance) {
        animators.balance.animateTo(balance);
    } else {
        document.getElementById('balance').textContent = formatCurrency(balance);
    }

    if (animators.totalDeposit) {
        animators.totalDeposit.animateTo(totalDeposit);
    } else {
        document.getElementById('totalDeposit').textContent = formatCurrency(totalDeposit);
    }

    if (animators.totalWithdraw) {
        animators.totalWithdraw.animateTo(totalWithdraw);
    } else {
        document.getElementById('totalWithdraw').textContent = formatCurrency(totalWithdraw);
    }
}

// Save data (deprecated - now using saveUserData)
function saveData() {
    saveUserData();
}

// Load data (deprecated - now using loadUserData)
function loadData() {
    loadUserData();
}

// Deposit money
function deposit() {
    const amountInput = document.getElementById('depositAmount');
    const amount = getNumericValue(amountInput);
    
    // Validation
    if (!amount || amount <= 0) {
        showNotification('Masukkan jumlah yang valid!', 'error');
        return;
    }
    
    // VIP accounts have unlimited balance
    const balanceLimit = isVIP ? Infinity : 100000000000;
    
    if (amount > balanceLimit) {
        showNotification(`Jumlah terlalu besar! Maksimal Rp ${formatCurrency(balanceLimit)}`, 'warning');
        return;
    }
    
    // Check if balance after deposit exceeds limit (skip for VIP)
    if (!isVIP && balance + amount > balanceLimit) {
        const remaining = balanceLimit - balance;
        showNotification(`Saldo maksimal Rp ${formatCurrency(balanceLimit)}! Anda hanya bisa menyetor Rp ${formatCurrency(remaining)} lagi`, 'warning');
        return;
    }
    
    // Check if user will become Priority after this deposit
    const wasNotPriority = !isPriority && !isVIP;
    const oldTotalDeposit = totalDeposit;
    
    // Update balance
    balance += amount;
    totalDeposit += amount;
    
    // Check for Priority upgrade (100 miliar total deposit)
    if (wasNotPriority && totalDeposit >= 100000000000) {
        isPriority = true;
        
        // Show upgrade notification with animation
        setTimeout(() => {
            showPriorityUpgradeNotification();
            updateUserDisplay();
            
            // Refresh profile page if user is currently on it
            const currentPage = localStorage.getItem('currentPage');
            if (currentPage === 'profile') {
                renderProfilePage();
            }
        }, 500);
    }
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'deposit',
        amount: amount,
        date: new Date().toLocaleString('id-ID'),
        balanceAfter: balance
    };
    transactions.unshift(transaction);
    
    // Update display
    updateDisplay();
    renderTransactionHistory();
    
    // SAVE DATA IMMEDIATELY
    saveUserData();
    console.log('Deposit saved - Balance:', balance, 'Total Deposit:', totalDeposit);
    
    // Clear input
    amountInput.value = '';
    document.getElementById('depositTerbilang').classList.add('hidden');
    
    // Show notification
    showNotification(`Berhasil menyetor Rp ${formatCurrency(amount)}`, 'success');
}

// Withdraw money
function withdraw() {
    const amountInput = document.getElementById('withdrawAmount');
    const amount = getNumericValue(amountInput);
    
    // Validation
    if (!amount || amount <= 0) {
        showNotification('Masukkan jumlah yang valid!', 'error');
        return;
    }
    
    if (amount > balance) {
        showNotification('Saldo tidak mencukupi!', 'error');
        return;
    }
    
    // Update balance
    balance -= amount;
    totalWithdraw += amount;
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'withdraw',
        amount: amount,
        date: new Date().toLocaleString('id-ID'),
        balanceAfter: balance
    };
    transactions.unshift(transaction);
    
    // Update display
    updateDisplay();
    renderTransactionHistory();
    
    // SAVE DATA IMMEDIATELY
    saveUserData();
    console.log('Withdraw saved - Balance:', balance);
    
    // Clear input
    amountInput.value = '';
    document.getElementById('withdrawTerbilang').classList.add('hidden');
    
    // Show notification
    showNotification(`Berhasil menarik Rp ${formatCurrency(amount)}`, 'success');
}

// Render transaction history
function renderTransactionHistory() {
    const historyContainer = document.getElementById('transactionHistory');
    
    if (transactions.length === 0) {
        historyContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Belum ada transaksi</p>';
        return;
    }
    
    historyContainer.innerHTML = transactions.map(transaction => {
        let icon, colorClass, bgClass, borderClass, typeText, amountText;
        
        if (transaction.type === 'deposit') {
            icon = 'fa-arrow-down';
            colorClass = 'text-green-600';
            bgClass = 'bg-green-50';
            borderClass = 'border-green-200';
            typeText = 'Setoran';
            amountText = `+ Rp ${formatCurrency(transaction.amount)}`;
        } else if (transaction.type === 'withdraw') {
            icon = 'fa-arrow-up';
            colorClass = 'text-red-600';
            bgClass = 'bg-red-50';
            borderClass = 'border-red-200';
            typeText = 'Penarikan';
            amountText = `- Rp ${formatCurrency(transaction.amount)}`;
        } else if (transaction.type === 'stock_buy') {
            icon = 'fa-shopping-cart';
            colorClass = 'text-blue-600';
            bgClass = 'bg-blue-50';
            borderClass = 'border-blue-200';
            typeText = `Beli Saham ${transaction.stockId}`;
            amountText = `- Rp ${formatCurrency(transaction.total)}`;
        } else if (transaction.type === 'stock_sell') {
            icon = 'fa-hand-holding-usd';
            colorClass = 'text-purple-600';
            bgClass = 'bg-purple-50';
            borderClass = 'border-purple-200';
            typeText = `Jual Saham ${transaction.stockId}`;
            amountText = `+ Rp ${formatCurrency(transaction.total)}`;
        } else if (transaction.type === 'crypto_buy') {
            icon = 'fa-shopping-cart';
            colorClass = 'text-orange-600';
            bgClass = 'bg-orange-50';
            borderClass = 'border-orange-200';
            typeText = `Beli Crypto ${transaction.cryptoId}`;
            amountText = `- Rp ${formatCurrency(transaction.total)}`;
        } else if (transaction.type === 'crypto_sell') {
            icon = 'fa-hand-holding-usd';
            colorClass = 'text-yellow-600';
            bgClass = 'bg-yellow-50';
            borderClass = 'border-yellow-200';
            typeText = `Jual Crypto ${transaction.cryptoId}`;
            amountText = `+ Rp ${formatCurrency(transaction.total)}`;
        }
        
        return `
            <div class="${bgClass} p-4 rounded-lg border ${borderClass} flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="${colorClass} text-xl">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div>
                        <p class="font-semibold ${colorClass}">${typeText}</p>
                        ${transaction.quantity ? `<p class="text-xs text-gray-600">${transaction.type.includes('crypto') ? formatQuantity(transaction.quantity, 8) : formatQuantity(transaction.quantity)} ${transaction.type.includes('crypto') ? 'koin' : 'lembar'} @ Rp ${formatCurrency(transaction.price)}</p>` : ''}
                        <p class="text-sm text-gray-600">${transaction.date}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold ${colorClass}">
                        ${amountText}
                    </p>
                    <p class="text-sm text-gray-600">
                        Saldo: Rp ${formatCurrency(transaction.balanceAfter)}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    document.getElementById('loginUsername')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    // Register form
    document.getElementById('registerUsername')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            register();
        }
    });
    
    document.getElementById('registerPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            register();
        }
    });
    
    document.getElementById('registerPasswordConfirm')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            register();
        }
    });
    
    // Deposit and withdraw forms with Enter key
    document.getElementById('depositAmount')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            deposit();
        }
    });

    document.getElementById('withdrawAmount')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            withdraw();
        }
    });
    
    // Format input with comma on typing
    document.getElementById('depositAmount')?.addEventListener('input', function() {
        formatInputWithComma(this);
    });
    
    document.getElementById('withdrawAmount')?.addEventListener('input', function() {
        formatInputWithComma(this);
    });
    
    // Stock quantity input listener
    document.getElementById('stockQuantity')?.addEventListener('input', function() {
        updateModalTotalPrice();
    });
    
    // Crypto quantity input listener
    document.getElementById('cryptoQuantity')?.addEventListener('input', function() {
        updateCryptoModalTotalPrice();
    });
});

// ===== STOCK MARKET FUNCTIONS =====

// Start automatic stock price updates
function startStockPriceUpdates() {
    stopStockPriceUpdates();
    
    // Initialize changePercent for all stocks
    stocks.forEach(stock => {
        if (!stock.changePercent) {
            stock.changePercent = '0.00';
        }
    });
    
    stockPriceInterval = setInterval(() => {
        updateStockPrices();
        renderStocks();
        updatePortfolioValue();
        
        // Update profile page if it's currently active
        const currentPage = localStorage.getItem('currentPage');
        if (currentPage === 'profile') {
            renderProfilePage();
        }
        
        // Update chart page if it's currently active
        if (currentPage === 'chart') {
            updateChartPage();
        }
    }, 2000); // Update every 2 seconds for real-time feel
}

// Stop stock price updates
function stopStockPriceUpdates() {
    if (stockPriceInterval) {
        clearInterval(stockPriceInterval);
        stockPriceInterval = null;
    }
}

// Update stock prices with random fluctuation
function updateStockPrices() {
    stocks.forEach(stock => {
        // Store old price for animation
        stock.oldPrice = stock.price;
        
        // Random price change between -3% to +3% (more noticeable movement)
        const changePercent = (Math.random() - 0.5) * 0.06;
        
        // Apply change to current price (not rounded yet for precision)
        let newPrice = stock.price * (1 + changePercent);
        
        // Keep price within reasonable bounds (50% to 200% of base price)
        const minPrice = stock.basePrice * 0.5;
        const maxPrice = stock.basePrice * 2;
        
        // Clamp and then round
        newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));
        stock.price = Math.round(newPrice);
        
        // Ensure price actually changes (avoid stuck at same value)
        if (stock.price === stock.oldPrice && Math.random() > 0.5) {
            stock.price += (Math.random() > 0.5 ? 1 : -1) * Math.max(1, Math.round(stock.basePrice * 0.001));
            // Re-clamp after forced change
            stock.price = Math.max(Math.round(minPrice), Math.min(Math.round(maxPrice), stock.price));
        }
        
        // Calculate percentage change from base price
        stock.changePercent = ((stock.price - stock.basePrice) / stock.basePrice * 100).toFixed(2);
        
        // Track price direction for animation
        if (stock.price > stock.oldPrice) {
            stock.priceDirection = 'up';
        } else if (stock.price < stock.oldPrice) {
            stock.priceDirection = 'down';
        } else {
            stock.priceDirection = 'same';
        }
    });
}

// Render stock list
function renderStocks() {
    const stockList = document.getElementById('stockList');
    if (!stockList) return;
    
    stockList.innerHTML = stocks.map((stock, index) => {
        const priceChange = stock.price - stock.basePrice;
        const priceChangePercent = stock.changePercent || ((priceChange / stock.basePrice) * 100).toFixed(2);
        const isPositive = priceChange >= 0;
        const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
        const changeBg = isPositive ? 'bg-green-100' : 'bg-red-100';
        const changeIcon = isPositive ? 'fa-arrow-up' : 'fa-arrow-down';
        
        // Animation class based on price direction
        let animationClass = '';
        if (stock.priceDirection === 'up') {
            animationClass = 'price-up';
        } else if (stock.priceDirection === 'down') {
            animationClass = 'price-down';
        }
        
        // Sector badge color
        let sectorBadgeColor = 'bg-gray-100 text-gray-700';
        if (stock.sector === 'Pertambangan') {
            sectorBadgeColor = 'bg-amber-100 text-amber-700';
        } else if (stock.sector === 'Perbankan') {
            sectorBadgeColor = 'bg-blue-100 text-blue-700';
        } else if (stock.sector === 'Teknologi') {
            sectorBadgeColor = 'bg-purple-100 text-purple-700';
        } else if (stock.sector === 'Telekomunikasi') {
            sectorBadgeColor = 'bg-cyan-100 text-cyan-700';
        } else if (stock.sector === 'Otomotif') {
            sectorBadgeColor = 'bg-red-100 text-red-700';
        } else if (stock.sector === 'Konsumen') {
            sectorBadgeColor = 'bg-green-100 text-green-700';
        } else if (stock.sector === 'Properti') {
            sectorBadgeColor = 'bg-orange-100 text-orange-700';
        } else if (stock.sector === 'Energi') {
            sectorBadgeColor = 'bg-yellow-100 text-yellow-700';
        } else if (stock.sector === 'Retail') {
            sectorBadgeColor = 'bg-pink-100 text-pink-700';
        }
        
        return `
            <div class="bg-white dark:bg-secondary p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 hover:shadow-lg transition-all card-hover ${animationClass}" data-stock-id="${stock.id}">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-bold text-lg text-gray-800 dark:text-white">${stock.id}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${stock.name}</p>
                    </div>
                    <div class="${changeBg} px-2 py-1 rounded-lg">
                        <p class="text-xs font-bold ${changeColor}">
                            <i class="fas ${changeIcon}"></i> ${isPositive ? '+' : ''}${priceChangePercent}%
                        </p>
                    </div>
                </div>
                <div class="mb-2">
                    <span class="text-xs px-2 py-1 rounded-lg ${sectorBadgeColor} font-semibold">
                        ${stock.sector}
                    </span>
                </div>
                <div class="mb-3">
                    <p class="text-2xl font-bold text-gray-800 dark:text-white price-transition">Rp ${formatCurrency(stock.price)}</p>
                    <p class="text-xs text-gray-400">per lembar</p>
                </div>
                ${stock.owned > 0 ? `
                    <p class="text-sm text-blue-600 font-semibold mb-3">
                        <i class="fas fa-briefcase mr-1"></i>${formatQuantity(stock.owned)} lembar
                    </p>
                ` : ''}
                <div class="flex gap-2">
                    <button 
                        onclick="openStockModal('buy', '${stock.id}')" 
                        class="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105">
                        <i class="fas fa-shopping-cart text-xs"></i>
                    </button>
                    ${stock.owned > 0 ? `
                        <button 
                            onclick="openStockModal('sell', '${stock.id}')" 
                            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105">
                            <i class="fas fa-hand-holding-usd text-xs"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Render my stocks portfolio
function renderMyStocks() {
    const myStocksContainer = document.getElementById('myStocks');
    if (!myStocksContainer) return;
    
    const ownedStocks = stocks.filter(s => s.owned > 0);
    
    if (ownedStocks.length === 0) {
        myStocksContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Anda belum memiliki saham</p>';
        return;
    }
    
    myStocksContainer.innerHTML = ownedStocks.map(stock => {
        const totalValue = stock.price * stock.owned;
        const buyValue = (stock.buyPrice || stock.price) * stock.owned;
        const profit = totalValue - buyValue;
        const profitPercent = ((profit / buyValue) * 100).toFixed(2);
        const isProfit = profit >= 0;
        const profitColor = isProfit ? 'text-green-600' : 'text-red-600';
        const profitBg = isProfit ? 'bg-green-50' : 'bg-red-50';
        
        return `
            <div class="bg-white dark:bg-secondary p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-200 transition">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <p class="font-bold text-gray-800 dark:text-white">${stock.id} - ${stock.name}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            ${formatQuantity(stock.owned)} lembar × Rp ${formatCurrency(stock.price)}
                        </p>
                        <p class="text-xl font-bold text-gray-800 dark:text-white mt-2">
                            Rp ${formatCurrency(totalValue)}
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="${profitBg} px-3 py-2 rounded-lg">
                            <p class="text-xs text-gray-600 dark:text-gray-300">Profit/Loss</p>
                            <p class="font-bold ${profitColor}">
                                ${isProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(profit))}
                            </p>
                            <p class="text-xs font-semibold ${profitColor}">
                                ${isProfit ? '+' : '-'}${profitPercent}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update portfolio value
function updatePortfolioValue() {
    const totalValue = stocks.reduce((sum, stock) => sum + (stock.price * stock.owned), 0);
    const totalBuyValue = stocks.reduce((sum, stock) => {
        const buyPrice = stock.buyPrice || stock.price;
        return sum + (buyPrice * stock.owned);
    }, 0);
    const profit = totalValue - totalBuyValue;
    const isProfit = profit >= 0;
    
    document.getElementById('portfolioValue').textContent = formatCurrency(totalValue);
    
    const profitElement = document.getElementById('portfolioProfit');
    profitElement.textContent = `${isProfit ? '+' : ''}Rp ${formatCurrency(Math.abs(profit))}`;
    profitElement.className = `text-xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`;
}

// Open stock buy/sell modal
function openStockModal(action, stockId) {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return;
    
    currentStockAction = action;
    currentStockId = stockId;
    
    const modal = document.getElementById('stockModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalStockName = document.getElementById('modalStockName');
    const modalStockPrice = document.getElementById('modalStockPrice');
    const modalBalance = document.getElementById('modalBalance');
    const modalActionButton = document.getElementById('modalActionButton');
    const stockQuantityInput = document.getElementById('stockQuantity');
    const modalBalanceInfo = document.getElementById('modalBalanceInfo');
    const sellAllBtn = document.getElementById('stockSellAllBtn');
    
    modalTitle.textContent = action === 'buy' ? 'Beli Saham' : 'Jual Saham';
    modalStockName.textContent = `${stock.id} - ${stock.name}`;
    modalStockPrice.textContent = formatCurrency(stock.price);
    modalBalance.textContent = formatCurrency(balance);
    stockQuantityInput.max = action === 'sell' ? stock.owned : '';
    
    if (action === 'buy') {
        stockQuantityInput.value = '';
        modalActionButton.textContent = 'Beli';
        modalActionButton.className = 'flex-1 bg-accent hover:bg-green-600 text-white font-bold py-3 rounded-xl transition duration-200';
        modalBalanceInfo.classList.remove('hidden');
        sellAllBtn.classList.add('hidden');
    } else {
        stockQuantityInput.value = stock.owned; // Auto-fill with owned quantity
        modalActionButton.textContent = 'Jual';
        modalActionButton.className = 'flex-1 bg-danger hover:bg-red-600 text-white font-bold py-3 rounded-xl transition duration-200';
        modalBalanceInfo.classList.add('hidden');
        sellAllBtn.classList.remove('hidden');
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    updateModalTotalPrice();
}

// Fill max stock quantity for sell all
function fillMaxStockQuantity() {
    const stock = stocks.find(s => s.id === currentStockId);
    if (!stock) return;
    
    const stockQuantityInput = document.getElementById('stockQuantity');
    stockQuantityInput.value = stock.owned;
    updateModalTotalPrice();
}

// Close stock modal
function closeStockModal() {
    const modal = document.getElementById('stockModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    currentStockAction = null;
    currentStockId = null;
}

// Update modal total price
function updateModalTotalPrice() {
    const stock = stocks.find(s => s.id === currentStockId);
    if (!stock) return;
    
    const quantity = parseInt(document.getElementById('stockQuantity').value) || 0;
    const totalPrice = stock.price * quantity;
    
    document.getElementById('modalTotalPrice').textContent = formatCurrency(totalPrice);
}

// Execute stock transaction
function executeStockTransaction() {
    const stock = stocks.find(s => s.id === currentStockId);
    if (!stock) return;
    
    const quantity = parseInt(document.getElementById('stockQuantity').value);
    
    if (!quantity || quantity <= 0) {
        showNotification('Masukkan jumlah lembar yang valid!', 'error');
        return;
    }
    
    if (currentStockAction === 'buy') {
        buyStock(stock, quantity);
    } else if (currentStockAction === 'sell') {
        sellStock(stock, quantity);
    }
}

// Buy stock
function buyStock(stock, quantity) {
    const totalPrice = stock.price * quantity;
    
    if (totalPrice > balance) {
        showNotification('Saldo tidak mencukupi!', 'error');
        return;
    }
    
    // Deduct balance
    balance -= totalPrice;
    
    // Calculate weighted average buy price
    const currentValue = (stock.buyPrice || stock.price) * stock.owned;
    const newValue = stock.price * quantity;
    const totalOwned = stock.owned + quantity;
    stock.buyPrice = (currentValue + newValue) / totalOwned;
    
    // Add to owned stocks
    stock.owned += quantity;
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'stock_buy',
        stockId: stock.id,
        stockName: stock.name,
        quantity: quantity,
        price: stock.price,
        total: totalPrice,
        date: new Date().toLocaleString('id-ID'),
        balanceAfter: balance
    };
    transactions.unshift(transaction);
    
    // Update display
    updateDisplay();
    renderTransactionHistory();
    renderStocks();
    renderMyStocks();
    updatePortfolioValue();
    
    // SAVE DATA IMMEDIATELY
    saveUserData();
    console.log(`Stock bought - ${stock.id}: ${stock.owned} shares, Balance: ${balance}`);
    
    closeStockModal();
    showNotification(`Berhasil membeli ${formatQuantity(quantity)} lembar saham ${stock.id}!`, 'success');
}

// Sell stock
function sellStock(stock, quantity) {
    if (quantity > stock.owned) {
        showNotification('Jumlah saham tidak mencukupi!', 'error');
        return;
    }
    
    const totalPrice = stock.price * quantity;
    
    // Add to balance
    balance += totalPrice;
    
    // Reduce owned stocks
    stock.owned -= quantity;
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'stock_sell',
        stockId: stock.id,
        stockName: stock.name,
        quantity: quantity,
        price: stock.price,
        total: totalPrice,
        date: new Date().toLocaleString('id-ID'),
        balanceAfter: balance
    };
    transactions.unshift(transaction);
    
    // Update display
    updateDisplay();
    renderTransactionHistory();
    renderStocks();
    renderMyStocks();
    updatePortfolioValue();
    
    // SAVE DATA IMMEDIATELY
    saveUserData();
    console.log(`Stock sold - ${stock.id}: ${stock.owned} shares remaining, Balance: ${balance}`);
    
    closeStockModal();
    showNotification(`Berhasil menjual ${formatQuantity(quantity)} lembar saham ${stock.id}!`, 'success');
}

// ===== CRYPTOCURRENCY FUNCTIONS =====

// Reset crypto ownership
function resetCryptoOwnership() {
    if (cryptos && cryptos.length > 0) {
        cryptos.forEach(crypto => {
            crypto.owned = 0;
            crypto.buyPrice = crypto.price;
        });
    }
}

// Start automatic crypto price updates
function startCryptoPriceUpdates() {
    stopCryptoPriceUpdates();
    
    // Initialize changePercent for all cryptos
    cryptos.forEach(crypto => {
        if (!crypto.changePercent) {
            crypto.changePercent = '0.00';
        }
    });
    
    cryptoPriceInterval = setInterval(() => {
        updateCryptoPrices();
        renderCryptos();
        updateCryptoPortfolioValue();
        
        // Update profile page if it's currently active
        const currentPage = localStorage.getItem('currentPage');
        if (currentPage === 'profile') {
            renderProfilePage();
        }
        
        // Update chart page if it's currently active
        if (currentPage === 'chart') {
            updateChartPage();
        }
    }, 1500); // Update every 1.5 seconds for volatile crypto market
}

// Stop crypto price updates
function stopCryptoPriceUpdates() {
    if (cryptoPriceInterval) {
        clearInterval(cryptoPriceInterval);
        cryptoPriceInterval = null;
    }
}

// Update crypto prices with random fluctuation
function updateCryptoPrices() {
    cryptos.forEach(crypto => {
        // Store old price for animation
        crypto.oldPrice = crypto.price;
        
        // Random price change between -5% to +5% (crypto is more volatile)
        const changePercent = (Math.random() - 0.5) * 0.1;
        
        // Apply change to current price (not rounded yet for precision)
        let newPrice = crypto.price * (1 + changePercent);
        
        // Keep price within reasonable bounds (30% to 300% of base price)
        const minPrice = crypto.basePrice * 0.3;
        const maxPrice = crypto.basePrice * 3;
        
        // Clamp and then round
        newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));
        crypto.price = Math.round(newPrice);
        
        // Ensure price actually changes (avoid stuck at same value)
        if (crypto.price === crypto.oldPrice && Math.random() > 0.5) {
            crypto.price += (Math.random() > 0.5 ? 1 : -1) * Math.max(1, Math.round(crypto.basePrice * 0.002));
            // Re-clamp after forced change
            crypto.price = Math.max(Math.round(minPrice), Math.min(Math.round(maxPrice), crypto.price));
        }
        
        // Calculate percentage change from base price
        crypto.changePercent = ((crypto.price - crypto.basePrice) / crypto.basePrice * 100).toFixed(2);
        
        // Track price direction for animation
        if (crypto.price > crypto.oldPrice) {
            crypto.priceDirection = 'up';
        } else if (crypto.price < crypto.oldPrice) {
            crypto.priceDirection = 'down';
        } else {
            crypto.priceDirection = 'same';
        }
    });
}

// Render crypto list
function renderCryptos() {
    const cryptoList = document.getElementById('cryptoList');
    if (!cryptoList) return;
    
    if (!cryptos || cryptos.length === 0) {
        cryptoList.innerHTML = '<p class="text-gray-500 text-center py-4 col-span-full">Data crypto tidak tersedia</p>';
        return;
    }
    
    cryptoList.innerHTML = cryptos.map(crypto => {
        const priceChange = crypto.price - crypto.basePrice;
        const priceChangePercent = ((priceChange / crypto.basePrice) * 100).toFixed(2);
        const isPositive = priceChange >= 0;
        const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
        const changeBg = isPositive ? 'bg-green-100' : 'bg-red-100';
        const changeIcon = isPositive ? 'fa-arrow-up' : 'fa-arrow-down';
        
        // Animation class based on price direction
        let animationClass = '';
        if (crypto.priceDirection === 'up') {
            animationClass = 'price-up';
        } else if (crypto.priceDirection === 'down') {
            animationClass = 'price-down';
        }
        
        // Category badge color
        let categoryBadgeColor = 'bg-gray-100 text-gray-700';
        if (crypto.category === 'Layer 1') {
            categoryBadgeColor = 'bg-blue-100 text-blue-700';
        } else if (crypto.category === 'Layer 2') {
            categoryBadgeColor = 'bg-purple-100 text-purple-700';
        } else if (crypto.category === 'Layer 0') {
            categoryBadgeColor = 'bg-indigo-100 text-indigo-700';
        } else if (crypto.category === 'Exchange') {
            categoryBadgeColor = 'bg-yellow-100 text-yellow-700';
        } else if (crypto.category === 'Meme') {
            categoryBadgeColor = 'bg-pink-100 text-pink-700';
        } else if (crypto.category === 'DeFi') {
            categoryBadgeColor = 'bg-green-100 text-green-700';
        } else if (crypto.category === 'Stablecoin') {
            categoryBadgeColor = 'bg-gray-100 text-gray-700';
        } else if (crypto.category === 'Metaverse') {
            categoryBadgeColor = 'bg-cyan-100 text-cyan-700';
        } else if (crypto.category === 'Gaming') {
            categoryBadgeColor = 'bg-red-100 text-red-700';
        } else if (crypto.category === 'Payment') {
            categoryBadgeColor = 'bg-teal-100 text-teal-700';
        }
        
        return `
            <div class="bg-white dark:bg-secondary p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-orange-300 hover:shadow-lg transition-all card-hover ${animationClass}" data-crypto-id="${crypto.id}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">${crypto.icon}</span>
                        <div>
                            <p class="font-bold text-lg text-gray-800 dark:text-white">${crypto.id}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${crypto.name}</p>
                        </div>
                    </div>
                    <div class="${changeBg} px-2 py-1 rounded-lg">
                        <p class="text-xs font-bold ${changeColor}">
                            <i class="fas ${changeIcon}"></i> ${isPositive ? '+' : ''}${priceChangePercent}%
                        </p>
                    </div>
                </div>
                <div class="mb-2">
                    <span class="text-xs px-2 py-1 rounded-lg ${categoryBadgeColor} font-semibold">
                        ${crypto.category}
                    </span>
                </div>
                <div class="mb-3">
                    <p class="text-2xl font-bold text-gray-800 dark:text-white">Rp ${formatCurrency(crypto.price)}</p>
                    <p class="text-xs text-gray-400">per koin</p>
                </div>
                ${crypto.owned > 0 ? `
                    <p class="text-sm text-orange-600 font-semibold mb-3">
                        <i class="fas fa-wallet mr-1"></i>${formatQuantity(crypto.owned, 8)} koin
                    </p>
                ` : ''}
                <div class="flex gap-2">
                    <button 
                        onclick="openCryptoModal('buy', '${crypto.id}')" 
                        class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105">
                        <i class="fas fa-shopping-cart text-xs"></i>
                    </button>
                    ${crypto.owned > 0 ? `
                        <button 
                            onclick="openCryptoModal('sell', '${crypto.id}')" 
                            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105">
                            <i class="fas fa-hand-holding-usd text-xs"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Render my cryptos portfolio
function renderMyCryptos() {
    const myCryptosContainer = document.getElementById('myCryptos');
    if (!myCryptosContainer) return;
    
    const ownedCryptos = cryptos.filter(c => c.owned > 0);
    
    if (ownedCryptos.length === 0) {
        myCryptosContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Anda belum memiliki cryptocurrency</p>';
        return;
    }
    
    myCryptosContainer.innerHTML = ownedCryptos.map(crypto => {
        const totalValue = crypto.price * crypto.owned;
        const buyValue = (crypto.buyPrice || crypto.price) * crypto.owned;
        const profit = totalValue - buyValue;
        const profitPercent = ((profit / buyValue) * 100).toFixed(2);
        const isProfit = profit >= 0;
        const profitColor = isProfit ? 'text-green-600' : 'text-red-600';
        const profitBg = isProfit ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900';
        
        return `
            <div class="bg-white dark:bg-secondary p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-orange-200 transition">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-2xl">${crypto.icon}</span>
                            <p class="font-bold text-gray-800 dark:text-white">${crypto.id} - ${crypto.name}</p>
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            ${formatQuantity(crypto.owned, 8)} koin × Rp ${formatCurrency(crypto.price)}
                        </p>
                        <p class="text-xl font-bold text-gray-800 dark:text-white mt-2">
                            Rp ${formatCurrency(totalValue)}
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="${profitBg} px-3 py-2 rounded-lg">
                            <p class="text-xs text-gray-600 dark:text-gray-300">Profit/Loss</p>
                            <p class="font-bold ${profitColor}">
                                ${isProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(profit))}
                            </p>
                            <p class="text-xs font-semibold ${profitColor}">
                                ${isProfit ? '+' : '-'}${profitPercent}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update crypto portfolio value
function updateCryptoPortfolioValue() {
    const totalValue = cryptos.reduce((sum, crypto) => sum + (crypto.price * crypto.owned), 0);
    const totalBuyValue = cryptos.reduce((sum, crypto) => {
        const buyPrice = crypto.buyPrice || crypto.price;
        return sum + (buyPrice * crypto.owned);
    }, 0);
    const profit = totalValue - totalBuyValue;
    const isProfit = profit >= 0;
    
    const portfolioValueElement = document.getElementById('cryptoPortfolioValue');
    if (portfolioValueElement) {
        portfolioValueElement.textContent = formatCurrency(totalValue);
    }
    
    const profitElement = document.getElementById('cryptoPortfolioProfit');
    if (profitElement) {
        profitElement.textContent = `${isProfit ? '+' : ''}Rp ${formatCurrency(Math.abs(profit))}`;
        profitElement.className = `text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`;
    }
}

// Open crypto buy/sell modal
function openCryptoModal(action, cryptoId) {
    const crypto = cryptos.find(c => c.id === cryptoId);
    if (!crypto) return;
    
    currentCryptoAction = action;
    currentCryptoId = cryptoId;
    
    const modal = document.getElementById('cryptoModal');
    const modalTitle = document.getElementById('cryptoModalTitle');
    const modalCryptoName = document.getElementById('cryptoModalName');
    const modalCryptoPrice = document.getElementById('cryptoModalPrice');
    const modalBalance = document.getElementById('cryptoModalBalance');
    const modalActionButton = document.getElementById('cryptoModalActionButton');
    const cryptoQuantityInput = document.getElementById('cryptoQuantity');
    const modalBalanceInfo = document.getElementById('cryptoModalBalanceInfo');
    const sellAllBtn = document.getElementById('cryptoSellAllBtn');
    
    modalTitle.textContent = action === 'buy' ? 'Beli Crypto' : 'Jual Crypto';
    modalCryptoName.textContent = `${crypto.icon} ${crypto.id} - ${crypto.name}`;
    modalCryptoPrice.textContent = formatCurrency(crypto.price);
    modalBalance.textContent = formatCurrency(balance);
    cryptoQuantityInput.max = action === 'sell' ? crypto.owned : '';
    
    if (action === 'buy') {
        cryptoQuantityInput.value = '';
        modalActionButton.textContent = 'Beli';
        modalActionButton.className = 'flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-200';
        modalBalanceInfo.classList.remove('hidden');
        sellAllBtn.classList.add('hidden');
    } else {
        cryptoQuantityInput.value = crypto.owned; // Auto-fill with owned quantity
        modalActionButton.textContent = 'Jual';
        modalActionButton.className = 'flex-1 bg-danger hover:bg-red-600 text-white font-bold py-3 rounded-xl transition duration-200';
        modalBalanceInfo.classList.add('hidden');
        sellAllBtn.classList.remove('hidden');
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    updateCryptoModalTotalPrice();
}

// Fill max crypto quantity for sell all
function fillMaxCryptoQuantity() {
    const crypto = cryptos.find(c => c.id === currentCryptoId);
    if (!crypto) return;
    
    const cryptoQuantityInput = document.getElementById('cryptoQuantity');
    cryptoQuantityInput.value = crypto.owned;
    updateCryptoModalTotalPrice();
}

// Close crypto modal
function closeCryptoModal() {
    const modal = document.getElementById('cryptoModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    currentCryptoAction = null;
    currentCryptoId = null;
}

// Update crypto modal total price
function updateCryptoModalTotalPrice() {
    const crypto = cryptos.find(c => c.id === currentCryptoId);
    if (!crypto) return;
    
    const quantity = parseFloat(document.getElementById('cryptoQuantity').value) || 0;
    const totalPrice = Math.round(crypto.price * quantity);
    
    document.getElementById('cryptoModalTotalPrice').textContent = formatCurrency(totalPrice);
}

// Execute crypto transaction
function executeCryptoTransaction() {
    const crypto = cryptos.find(c => c.id === currentCryptoId);
    if (!crypto) return;
    
    const quantity = parseFloat(document.getElementById('cryptoQuantity').value);
    
    if (!quantity || quantity <= 0) {
        showNotification('Masukkan jumlah koin yang valid!', 'error');
        return;
    }
    
    if (currentCryptoAction === 'buy') {
        buyCrypto(crypto, quantity);
    } else if (currentCryptoAction === 'sell') {
        sellCrypto(crypto, quantity);
    }
}

// Buy crypto
function buyCrypto(crypto, quantity) {
    const totalPrice = Math.round(crypto.price * quantity);
    
    if (totalPrice > balance) {
        showNotification('Saldo tidak mencukupi!', 'error');
        return;
    }
    
    // Deduct balance
    balance -= totalPrice;
    
    // Calculate weighted average buy price
    const currentValue = (crypto.buyPrice || crypto.price) * crypto.owned;
    const newValue = crypto.price * quantity;
    const totalOwned = crypto.owned + quantity;
    crypto.buyPrice = (currentValue + newValue) / totalOwned;
    
    // Add to owned cryptos
    crypto.owned += quantity;
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'crypto_buy',
        cryptoId: crypto.id,
        cryptoName: crypto.name,
        quantity: quantity,
        price: crypto.price,
        total: totalPrice,
        date: new Date().toLocaleString('id-ID'),
        balanceAfter: balance
    };
    transactions.unshift(transaction);
    
    // Update display
    updateDisplay();
    renderTransactionHistory();
    renderCryptos();
    renderMyCryptos();
    updateCryptoPortfolioValue();
    
    // SAVE DATA IMMEDIATELY
    saveUserData();
    console.log(`Crypto bought - ${crypto.id}: ${crypto.owned} coins, Balance: ${balance}`);
    
    closeCryptoModal();
    showNotification(`Berhasil membeli ${formatQuantity(quantity, 8)} koin ${crypto.id}!`, 'success');
}

// Sell crypto
function sellCrypto(crypto, quantity) {
    if (quantity > crypto.owned) {
        showNotification('Jumlah crypto tidak mencukupi!', 'error');
        return;
    }
    
    const totalPrice = Math.round(crypto.price * quantity);
    
    // Add to balance
    balance += totalPrice;
    
    // Reduce owned cryptos
    crypto.owned -= quantity;
    
    // Add transaction
    const transaction = {
        id: Date.now(),
        type: 'crypto_sell',
        cryptoId: crypto.id,
        cryptoName: crypto.name,
        quantity: quantity,
        price: crypto.price,
        total: totalPrice,
        date: new Date().toLocaleString('id-ID'),
        balanceAfter: balance
    };
    transactions.unshift(transaction);
    
    // Update display
    updateDisplay();
    renderTransactionHistory();
    renderCryptos();
    renderMyCryptos();
    updateCryptoPortfolioValue();
    
    // SAVE DATA IMMEDIATELY
    saveUserData();
    console.log(`Crypto sold - ${crypto.id}: ${crypto.owned} coins remaining, Balance: ${balance}`);
    
    closeCryptoModal();
    showNotification(`Berhasil menjual ${formatQuantity(quantity, 8)} koin ${crypto.id}!`, 'success');
}

// ===== REMOVED VIP DASHBOARD FUNCTIONS =====
// VIP dashboard features have been removed for simplicity

// ===== PROFILE PAGE FUNCTIONS =====

// Render profile page
function renderProfilePage() {
    // Get display name
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    let displayName = currentUser;
    
    if (!isVIP && users[currentUser] && users[currentUser].displayName) {
        displayName = users[currentUser].displayName;
    } else if (isVIP && VIP_ACCOUNTS[currentUser]) {
        displayName = VIP_ACCOUNTS[currentUser].name;
    }
    
    // Update username and display name
    const profileDisplayName = document.getElementById('profileDisplayName');
    const profileUsername = document.getElementById('profileUsername');
    const profileAccountType = document.getElementById('profileAccountType');
    const profileMemberSince = document.getElementById('profileMemberSince');
    
    if (profileDisplayName) {
        profileDisplayName.textContent = displayName;
    }
    
    if (profileUsername) {
        profileUsername.textContent = currentUser;
    }
    
    if (profileAccountType) {
        if (isVIP && VIP_ACCOUNTS[currentUser]) {
            // VIP Account
            profileAccountType.innerHTML = `
                <span class="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-bold rounded-full animate-pulse">
                    👑 ${VIP_ACCOUNTS[currentUser].badge} Account
                </span>
            `;
        } else if (isPriority) {
            // Priority Account (Gold)
            profileAccountType.innerHTML = `
                <span class="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-sm font-bold rounded-full shadow-lg" style="box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);">
                    ⭐ PRIORITY Account
                </span>
            `;
        } else {
            // Regular Account
            profileAccountType.innerHTML = `
                <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full">
                    Akun Regular
                </span>
            `;
        }
    }
    
    if (profileMemberSince) {
        // For demo purposes, show current date
        profileMemberSince.textContent = 'Bergabung sejak: ' + new Date().toLocaleDateString('id-ID');
    }
    
    // Show/Hide Priority Account Info Section
    const priorityAccountInfo = document.getElementById('priorityAccountInfo');
    if (priorityAccountInfo) {
        if (isPriority && !isVIP) {
            priorityAccountInfo.style.display = 'block';
            // Add animation
            priorityAccountInfo.style.animation = 'slideIn 0.5s ease-out';
        } else {
            priorityAccountInfo.style.display = 'none';
        }
    }
    
    // Calculate portfolio values
    const stockValue = stocks.reduce((sum, stock) => sum + (stock.price * stock.owned), 0);
    const stockBuyValue = stocks.reduce((sum, stock) => {
        const buyPrice = stock.buyPrice || stock.price;
        return sum + (buyPrice * stock.owned);
    }, 0);
    const stockProfit = stockValue - stockBuyValue;
    
    const cryptoValue = cryptos.reduce((sum, crypto) => sum + (crypto.price * crypto.owned), 0);
    const cryptoBuyValue = cryptos.reduce((sum, crypto) => {
        const buyPrice = crypto.buyPrice || crypto.price;
        return sum + (buyPrice * crypto.owned);
    }, 0);
    const cryptoProfit = cryptoValue - cryptoBuyValue;
    
    const totalNetWorth = balance + stockValue + cryptoValue;
    const totalProfit = stockProfit + cryptoProfit;
    
    // Update balance and portfolio values
    document.getElementById('profileBalance').textContent = formatCurrency(balance);
    document.getElementById('profileStockValue').textContent = formatCurrency(stockValue);
    document.getElementById('profileCryptoValue').textContent = formatCurrency(cryptoValue);
    
    // Update profit displays
    const profileStockProfit = document.getElementById('profileStockProfit');
    if (profileStockProfit) {
        const isStockProfit = stockProfit >= 0;
        profileStockProfit.textContent = `Profit: ${isStockProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(stockProfit))}`;
        profileStockProfit.className = `text-sm ${isStockProfit ? 'text-green-600' : 'text-red-600'}`;
    }
    
    const profileCryptoProfit = document.getElementById('profileCryptoProfit');
    if (profileCryptoProfit) {
        const isCryptoProfit = cryptoProfit >= 0;
        profileCryptoProfit.textContent = `Profit: ${isCryptoProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(cryptoProfit))}`;
        profileCryptoProfit.className = `text-sm ${isCryptoProfit ? 'text-green-600' : 'text-red-600'}`;
    }
    
    // Update total net worth
    document.getElementById('profileTotalNetWorth').textContent = formatCurrency(totalNetWorth);
    
    const profileTotalProfit = document.getElementById('profileTotalProfit');
    if (profileTotalProfit) {
        const isTotalProfit = totalProfit >= 0;
        profileTotalProfit.textContent = `${isTotalProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(totalProfit))}`;
        profileTotalProfit.className = isTotalProfit ? 'font-bold text-green-300' : 'font-bold text-red-300';
    }
    
    // Update banking statistics
    document.getElementById('profileTotalDeposit').textContent = formatCurrency(totalDeposit);
    document.getElementById('profileTotalWithdraw').textContent = formatCurrency(totalWithdraw);
    document.getElementById('profileTotalTransactions').textContent = transactions.length;
    
    // Update investment statistics
    const ownedStocksCount = stocks.filter(s => s.owned > 0).length;
    const ownedCryptosCount = cryptos.filter(c => c.owned > 0).length;
    
    document.getElementById('profileStockCount').textContent = `${ownedStocksCount} jenis`;
    document.getElementById('profileCryptoCount').textContent = `${ownedCryptosCount} jenis`;
    
    // Calculate asset allocation
    const cashPercent = totalNetWorth > 0 ? ((balance / totalNetWorth) * 100).toFixed(1) : 0;
    const stockPercent = totalNetWorth > 0 ? ((stockValue / totalNetWorth) * 100).toFixed(1) : 0;
    const cryptoPercent = totalNetWorth > 0 ? ((cryptoValue / totalNetWorth) * 100).toFixed(1) : 0;
    
    document.getElementById('profileAssetAllocation').textContent = 
        `${cashPercent}% Kas, ${stockPercent}% Saham, ${cryptoPercent}% Crypto`;
    
    // Render stock holdings
    renderProfileStockHoldings();
    
    // Render crypto holdings
    renderProfileCryptoHoldings();
}

// Render profile stock holdings
function renderProfileStockHoldings() {
    const container = document.getElementById('profileStockHoldings');
    if (!container) return;
    
    const ownedStocks = stocks.filter(s => s.owned > 0);
    
    if (ownedStocks.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Tidak ada saham</p>';
        return;
    }
    
    container.innerHTML = ownedStocks.map(stock => {
        const totalValue = stock.price * stock.owned;
        const buyValue = (stock.buyPrice || stock.price) * stock.owned;
        const profit = totalValue - buyValue;
        const isProfit = profit >= 0;
        
        return `
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex-1">
                    <p class="font-bold text-gray-800 dark:text-white">${stock.id}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${formatQuantity(stock.owned)} lembar × Rp ${formatCurrency(stock.price)}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-gray-800 dark:text-white">Rp ${formatCurrency(totalValue)}</p>
                    <p class="text-sm ${isProfit ? 'text-green-600' : 'text-red-600'}">
                        ${isProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(profit))}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// Render profile crypto holdings
function renderProfileCryptoHoldings() {
    const container = document.getElementById('profileCryptoHoldings');
    if (!container) return;
    
    const ownedCryptos = cryptos.filter(c => c.owned > 0);
    
    if (ownedCryptos.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Tidak ada cryptocurrency</p>';
        return;
    }
    
    container.innerHTML = ownedCryptos.map(crypto => {
        const totalValue = crypto.price * crypto.owned;
        const buyValue = (crypto.buyPrice || crypto.price) * crypto.owned;
        const profit = totalValue - buyValue;
        const isProfit = profit >= 0;
        
        return `
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex-1">
                    <p class="font-bold text-gray-800 dark:text-white">${crypto.icon} ${crypto.id}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${formatQuantity(crypto.owned, 8)} koin × Rp ${formatCurrency(crypto.price)}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-gray-800 dark:text-white">Rp ${formatCurrency(totalValue)}</p>
                    <p class="text-sm ${isProfit ? 'text-green-600' : 'text-red-600'}">
                        ${isProfit ? '+' : '-'}Rp ${formatCurrency(Math.abs(profit))}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// ===== EDIT NAME MODAL FUNCTIONS =====

// Open edit name modal
function openEditNameModal() {
    // VIP accounts cannot edit their name
    if (isVIP && VIP_ACCOUNTS[currentUser]) {
        showNotification('Akun VIP tidak dapat mengubah nama tampilan', 'warning');
        return;
    }
    
    const modal = document.getElementById('editNameModal');
    const editModalUsername = document.getElementById('editModalUsername');
    const editDisplayNameInput = document.getElementById('editDisplayNameInput');
    
    // Set current username
    if (editModalUsername) {
        editModalUsername.textContent = currentUser;
    }
    
    // Get current display name
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    const currentDisplayName = users[currentUser]?.displayName || currentUser;
    
    // Set current display name in input
    if (editDisplayNameInput) {
        editDisplayNameInput.value = currentDisplayName;
    }
    
    // Show modal
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        editDisplayNameInput.focus();
    }
}

// Close edit name modal
function closeEditNameModal() {
    const modal = document.getElementById('editNameModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Save display name
function saveDisplayName() {
    const editDisplayNameInput = document.getElementById('editDisplayNameInput');
    const newDisplayName = editDisplayNameInput.value.trim();
    
    // Validation
    if (!newDisplayName) {
        showNotification('Nama tampilan tidak boleh kosong!', 'error');
        return;
    }
    
    if (newDisplayName.length < 2) {
        showNotification('Nama tampilan minimal 2 karakter!', 'error');
        return;
    }
    
    if (newDisplayName.length > 50) {
        showNotification('Nama tampilan maksimal 50 karakter!', 'error');
        return;
    }
    
    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    if (users[currentUser]) {
        users[currentUser].displayName = newDisplayName;
        localStorage.setItem('bankAppUsers', JSON.stringify(users));
        
        // Update profile page
        renderProfilePage();
        
        // Close modal
        closeEditNameModal();
        
        showNotification('Nama tampilan berhasil diubah!', 'success');
    } else {
        showNotification('Terjadi kesalahan saat menyimpan!', 'error');
    }
}


// ===== CHART PAGE FUNCTIONS =====

let currentChartAsset = null;
let currentChartType = 'stock'; // 'stock' or 'crypto'
let priceHistory = [];
let chartCanvas = null;
let chartContext = null;
let animationFrame = null;
let isAnimating = false;
let animationProgress = 0;
let oldPriceHistory = [];

// Initialize chart page
function initChartPage() {
    populateAssetSelector();
    setupChart();
    renderTopGainersLosers();
    
    // Select first stock by default
    if (stocks.length > 0) {
        currentChartAsset = stocks[0];
        currentChartType = 'stock';
        document.getElementById('chartAssetSelect').value = 'stock_' + stocks[0].id;
        initPriceHistory();
        updateChartDisplay();
    }
}

// Populate asset selector dropdown
function populateAssetSelector() {
    const select = document.getElementById('chartAssetSelect');
    if (!select) return;
    
    let html = '<optgroup label="Saham">';
    stocks.forEach(stock => {
        html += `<option value="stock_${stock.id}">${stock.id} - ${stock.name}</option>`;
    });
    html += '</optgroup><optgroup label="Cryptocurrency">';
    cryptos.forEach(crypto => {
        html += `<option value="crypto_${crypto.id}">${crypto.icon} ${crypto.id} - ${crypto.name}</option>`;
    });
    html += '</optgroup>';
    
    select.innerHTML = html;
}

// Switch chart asset
function switchChartAsset() {
    const select = document.getElementById('chartAssetSelect');
    const value = select.value;
    const [type, id] = value.split('_');
    
    currentChartType = type;
    
    if (type === 'stock') {
        currentChartAsset = stocks.find(s => s.id === id);
    } else {
        currentChartAsset = cryptos.find(c => c.id === id);
    }
    
    initPriceHistory();
    updateChartDisplay();
}

// Initialize price history for selected asset
function initPriceHistory() {
    if (!currentChartAsset) return;
    
    // Initialize with 30 data points
    priceHistory = [];
    const basePrice = currentChartAsset.basePrice;
    
    for (let i = 0; i < 30; i++) {
        const variation = (Math.random() - 0.5) * 0.1; // ±5%
        const price = Math.round(basePrice * (1 + variation));
        priceHistory.push({
            price: price,
            timestamp: Date.now() - (30 - i) * 2000
        });
    }
    
    // Initialize old history for smooth animation
    oldPriceHistory = priceHistory.map(p => ({ ...p }));
}

// Setup chart canvas
function setupChart() {
    chartCanvas = document.getElementById('priceChart');
    if (!chartCanvas) return;
    
    chartContext = chartCanvas.getContext('2d');
    
    // Set canvas size
    chartCanvas.width = chartCanvas.parentElement.clientWidth - 48;
    chartCanvas.height = 350;
}

// Update chart display
function updateChartDisplay(animProgress = 1) {
    if (!currentChartAsset || !chartContext) return;
    
    // Update info cards
    const currentPrice = currentChartAsset.price;
    const prices = priceHistory.map(h => h.price);
    const highPrice = Math.max(...prices, currentPrice);
    const lowPrice = Math.min(...prices, currentPrice);
    const changePercent = currentChartAsset.changePercent || '0.00';
    
    document.getElementById('chartCurrentPrice').textContent = 'Rp ' + formatCurrency(currentPrice);
    document.getElementById('chartHighPrice').textContent = 'Rp ' + formatCurrency(highPrice);
    document.getElementById('chartLowPrice').textContent = 'Rp ' + formatCurrency(lowPrice);
    document.getElementById('chartChangePercent').textContent = (parseFloat(changePercent) >= 0 ? '+' : '') + changePercent + '%';
    
    // Draw chart with animation progress
    drawChart(animProgress);
}

// Draw chart on canvas
function drawChart(animProgress = 1) {
    if (!chartContext || priceHistory.length === 0) return;
    
    const canvas = chartCanvas;
    const ctx = chartContext;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Interpolate prices for smooth animation
    const interpolatedHistory = priceHistory.map((point, index) => {
        if (oldPriceHistory.length > 0 && oldPriceHistory[index]) {
            const oldPrice = oldPriceHistory[index].price;
            const newPrice = point.price;
            const interpolatedPrice = oldPrice + (newPrice - oldPrice) * animProgress;
            return { ...point, price: interpolatedPrice };
        }
        return point;
    });
    
    // Get price range
    const prices = interpolatedHistory.map(h => h.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    // Draw grid
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height - padding * 2) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Price labels
        const price = maxPrice - (priceRange * i / 5);
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(formatCurrency(Math.round(price)), padding - 5, y + 4);
    }
    
    // Draw line chart with color based on each segment's direction
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    interpolatedHistory.forEach((point, index) => {
        if (index === 0) return; // Skip first point
        
        const prevPoint = interpolatedHistory[index - 1];
        const x1 = padding + (width - padding * 2) * ((index - 1) / (interpolatedHistory.length - 1));
        const y1 = padding + (height - padding * 2) * (1 - (prevPoint.price - minPrice) / priceRange);
        const x2 = padding + (width - padding * 2) * (index / (interpolatedHistory.length - 1));
        const y2 = padding + (height - padding * 2) * (1 - (point.price - minPrice) / priceRange);
        
        // Determine color based on price direction
        const isUp = point.price >= prevPoint.price;
        ctx.strokeStyle = isUp ? '#10B981' : '#EF4444'; // Green if up, red if down
        
        // Draw segment
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    });
    
    // Draw area under line (use overall direction for area color)
    const basePrice = interpolatedHistory[0].price;
    const currentPrice = interpolatedHistory[interpolatedHistory.length - 1].price;
    const isPriceUp = currentPrice >= basePrice;
    const areaColor = isPriceUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    
    ctx.beginPath();
    interpolatedHistory.forEach((point, index) => {
        const x = padding + (width - padding * 2) * (index / (interpolatedHistory.length - 1));
        const y = padding + (height - padding * 2) * (1 - (point.price - minPrice) / priceRange);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = areaColor;
    ctx.fill();
    
    // Draw current price point with pulsing effect
    const lastPoint = interpolatedHistory[interpolatedHistory.length - 1];
    const lastX = width - padding;
    const lastY = padding + (height - padding * 2) * (1 - (lastPoint.price - minPrice) / priceRange);
    const lineColor = isPriceUp ? '#10B981' : '#EF4444';
    
    // Outer glow (pulsing)
    const pulseSize = 3 + Math.sin(Date.now() / 300) * 1.5;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 6 + pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = lineColor + '40'; // Semi-transparent
    ctx.fill();
    
    // Main point
    ctx.beginPath();
    ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Update chart with new price (with smooth animation)
function updateChart() {
    if (!currentChartAsset) return;
    
    // Save old history for interpolation
    oldPriceHistory = priceHistory.map(p => ({ ...p }));
    
    // Add new price point
    priceHistory.push({
        price: currentChartAsset.price,
        timestamp: Date.now()
    });
    
    // Keep only last 30 points
    if (priceHistory.length > 30) {
        priceHistory.shift();
        oldPriceHistory.shift();
    }
    
    // Start smooth animation
    animationProgress = 0;
    isAnimating = true;
    animateChart();
}

// Animate chart smoothly
function animateChart() {
    if (!isAnimating) return;
    
    animationProgress += 0.05; // Animation speed (0.05 = 20 frames for full animation)
    
    if (animationProgress >= 1) {
        animationProgress = 1;
        isAnimating = false;
    }
    
    // Ease-out function for smooth deceleration
    const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
    
    updateChartDisplay(easeProgress);
    
    if (isAnimating) {
        animationFrame = requestAnimationFrame(animateChart);
    }
}

// Render top gainers and losers
function renderTopGainersLosers() {
    // Combine stocks and cryptos
    const allAssets = [
        ...stocks.map(s => ({ ...s, type: 'stock' })),
        ...cryptos.map(c => ({ ...c, type: 'crypto' }))
    ];
    
    // Sort by change percent
    const sorted = allAssets.sort((a, b) => {
        const aChange = parseFloat(a.changePercent || 0);
        const bChange = parseFloat(b.changePercent || 0);
        return bChange - aChange;
    });
    
    // Top 5 gainers
    const gainers = sorted.slice(0, 5);
    const gainersHtml = gainers.map(asset => {
        const changePercent = parseFloat(asset.changePercent || 0);
        return `
            <div class="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                    <p class="font-bold text-gray-800 dark:text-white">${asset.type === 'crypto' ? asset.icon + ' ' : ''}${asset.id}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${asset.name}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-green-600">+${changePercent.toFixed(2)}%</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Rp ${formatCurrency(asset.price)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Top 5 losers
    const losers = sorted.slice(-5).reverse();
    const losersHtml = losers.map(asset => {
        const changePercent = parseFloat(asset.changePercent || 0);
        return `
            <div class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                    <p class="font-bold text-gray-800 dark:text-white">${asset.type === 'crypto' ? asset.icon + ' ' : ''}${asset.id}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${asset.name}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-red-600">${changePercent.toFixed(2)}%</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Rp ${formatCurrency(asset.price)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('topGainers').innerHTML = gainersHtml;
    document.getElementById('topLosers').innerHTML = losersHtml;
}

// Update chart page when on chart tab
function updateChartPage() {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage === 'chart') {
        updateChart();
        renderTopGainersLosers();
    }
}
