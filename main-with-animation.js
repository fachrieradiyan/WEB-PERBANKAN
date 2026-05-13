/**
 * Investra - Main JavaScript dengan Advanced Smooth Animation
 * 
 * File ini berisi modifikasi untuk mengintegrasikan sistem animasi smooth
 * ke aplikasi Investra yang sudah ada.
 * 
 * CARA PENGGUNAAN:
 * 1. Backup main.js Anda
 * 2. Copy kode dari file ini
 * 3. Paste ke main.js Anda, replace fungsi-fungsi yang ada
 */

// ===== INISIALISASI ANIMATORS =====
// Tambahkan di bagian atas file main.js, setelah deklarasi variabel global

let animators = {};

// Inisialisasi animators setelah DOM loaded
function initAnimators() {
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

    console.log('✅ Animators initialized');
}

// ===== MODIFIKASI FUNGSI updateDisplay =====
// Replace fungsi updateDisplay yang ada dengan ini:

function updateDisplay() {
    // Jika animators sudah diinisialisasi, gunakan animasi smooth
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

// ===== MODIFIKASI FUNGSI deposit =====
// Replace fungsi deposit yang ada dengan ini:

function deposit() {
    const amountInput = document.getElementById('depositAmount');
    const amount = getNumericValue(amountInput);
    
    if (amount <= 0) {
        showNotification('Jumlah harus lebih dari 0!', 'error');
        return;
    }
    
    // Check balance limit for regular users
    if (!isVIP && (balance + amount) > 100000000000) {
        showNotification('Saldo maksimal untuk akun regular adalah Rp 100 miliar!', 'error');
        return;
    }
    
    // Update balance dengan animasi smooth
    balance += amount;
    totalDeposit += amount;
    
    // Add transaction
    transactions.unshift({
        type: 'Setor',
        amount: amount,
        balance: balance,
        date: new Date().toLocaleString('id-ID')
    });
    
    // Update display dengan animasi
    updateDisplay();
    renderTransactionHistory();
    saveUserData();
    
    // Clear input
    amountInput.value = '';
    document.getElementById('depositTerbilang').classList.add('hidden');
    
    showNotification(`Berhasil setor Rp ${formatCurrency(amount)}`, 'success');
}

// ===== MODIFIKASI FUNGSI withdraw =====
// Replace fungsi withdraw yang ada dengan ini:

function withdraw() {
    const amountInput = document.getElementById('withdrawAmount');
    const amount = getNumericValue(amountInput);
    
    if (amount <= 0) {
        showNotification('Jumlah harus lebih dari 0!', 'error');
        return;
    }
    
    if (amount > balance) {
        showNotification('Saldo tidak mencukupi!', 'error');
        return;
    }
    
    // Update balance dengan animasi smooth
    balance -= amount;
    totalWithdraw += amount;
    
    // Add transaction
    transactions.unshift({
        type: 'Tarik',
        amount: amount,
        balance: balance,
        date: new Date().toLocaleString('id-ID')
    });
    
    // Update display dengan animasi
    updateDisplay();
    renderTransactionHistory();
    saveUserData();
    
    // Clear input
    amountInput.value = '';
    document.getElementById('withdrawTerbilang').classList.add('hidden');
    
    showNotification(`Berhasil tarik Rp ${formatCurrency(amount)}`, 'success');
}

// ===== MODIFIKASI FUNGSI renderStocks =====
// Tambahkan animasi untuk harga saham

function renderStocks() {
    const stockList = document.getElementById('stockList');
    if (!stockList) return;
    
    stockList.innerHTML = '';
    
    // Group stocks by sector
    const sectors = {};
    stocks.forEach(stock => {
        if (!sectors[stock.sector]) {
            sectors[stock.sector] = [];
        }
        sectors[stock.sector].push(stock);
    });
    
    // Render each sector
    Object.keys(sectors).forEach(sector => {
        // Sector header
        const sectorHeader = document.createElement('div');
        sectorHeader.className = 'col-span-full mt-4 mb-2';
        sectorHeader.innerHTML = `
            <h3 class="text-lg font-bold text-gray-800 dark:text-white border-b-2 border-accent pb-2">
                ${sector}
            </h3>
        `;
        stockList.appendChild(sectorHeader);
        
        // Render stocks in this sector
        sectors[sector].forEach(stock => {
            const changePercent = ((stock.price - stock.basePrice) / stock.basePrice * 100).toFixed(2);
            const isPositive = changePercent >= 0;
            
            const stockCard = document.createElement('div');
            stockCard.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 card-hover spring-animated-card';
            stockCard.id = `stock-card-${stock.id}`;
            
            stockCard.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-bold text-lg text-gray-800 dark:text-white">${stock.id}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${stock.name}</p>
                    </div>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${isPositive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">
                        ${isPositive ? '▲' : '▼'} ${Math.abs(changePercent)}%
                    </span>
                </div>
                <div class="mb-3">
                    <p class="text-2xl font-bold text-gray-900 dark:text-white smooth-price" id="stock-price-${stock.id}">
                        Rp ${formatCurrency(stock.price)}
                    </p>
                </div>
                <div class="flex gap-2">
                    <button onclick="openStockModal('buy', '${stock.id}')" 
                            class="flex-1 bg-accent hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Beli
                    </button>
                    ${stock.owned > 0 ? `
                        <button onclick="openStockModal('sell', '${stock.id}')" 
                                class="flex-1 bg-danger hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                            Jual
                        </button>
                    ` : ''}
                </div>
            `;
            
            stockList.appendChild(stockCard);
            
            // Inisialisasi animator untuk harga saham ini
            const priceElement = document.getElementById(`stock-price-${stock.id}`);
            if (priceElement && !animators[`stock-${stock.id}`]) {
                animators[`stock-${stock.id}`] = new AdvancedSmoothAnimator(priceElement, {
                    useSpring: true,
                    springConfig: { stiffness: 200, damping: 30, mass: 0.8 },
                    decimals: 0,
                    prefix: 'Rp ',
                    suffix: '',
                    showDirection: false,
                    useGlow: true
                });
            }
            
            // Inisialisasi card animator
            const cardElement = document.getElementById(`stock-card-${stock.id}`);
            if (cardElement && !animators[`card-${stock.id}`]) {
                animators[`card-${stock.id}`] = new AdvancedCardAnimator(cardElement, {
                    animationDuration: 1200,
                    scaleIntensity: 0.05,
                    glowIntensity: 20,
                    rotateIntensity: 1,
                    useParallax: true,
                    use3D: true
                });
            }
        });
    });
}

// ===== MODIFIKASI FUNGSI updateStockPrices =====
// Tambahkan animasi saat harga berubah

function updateStockPrices() {
    stocks.forEach(stock => {
        const oldPrice = stock.price;
        const change = (Math.random() - 0.5) * 0.06; // ±3%
        stock.price = Math.round(stock.price * (1 + change));
        
        // Animate price change
        if (animators[`stock-${stock.id}`]) {
            animators[`stock-${stock.id}`].animateTo(stock.price);
        }
        
        // Animate card
        if (animators[`card-${stock.id}`]) {
            if (stock.price > oldPrice) {
                animators[`card-${stock.id}`].animateUp();
            } else if (stock.price < oldPrice) {
                animators[`card-${stock.id}`].animateDown();
            }
        }
        
        // Update change percentage
        const changePercent = ((stock.price - stock.basePrice) / stock.basePrice * 100).toFixed(2);
        const isPositive = changePercent >= 0;
        
        // Update badge if element exists
        const stockCard = document.getElementById(`stock-card-${stock.id}`);
        if (stockCard) {
            const badge = stockCard.querySelector('.px-2.py-1');
            if (badge) {
                badge.className = `px-2 py-1 text-xs font-semibold rounded-full ${isPositive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`;
                badge.textContent = `${isPositive ? '▲' : '▼'} ${Math.abs(changePercent)}%`;
            }
        }
    });
    
    // Update portfolio value dengan animasi
    updatePortfolioValue();
}

// ===== MODIFIKASI FUNGSI checkAuth =====
// Tambahkan inisialisasi animators setelah login

// Modifikasi bagian akhir fungsi checkAuth:
// Tambahkan initAnimators() setelah showApp()

// CONTOH:
/*
function checkAuth() {
    const loggedInUser = localStorage.getItem('currentUser');
    const vipStatus = localStorage.getItem('isVIP');
    
    if (loggedInUser) {
        currentUser = loggedInUser;
        isVIP = vipStatus === 'true';
        
        loadUserData();
        showApp();
        
        // TAMBAHKAN INI:
        initAnimators();
        
        updateDisplay();
        renderTransactionHistory();
        renderStocks();
        renderMyStocks();
        updatePortfolioValue();
        startStockPriceUpdates();
        startCryptoPriceUpdates();
        
        const lastPage = localStorage.getItem('currentPage') || 'dashboard';
        switchPage(lastPage);
    } else {
        showAuth();
    }
}
*/

// ===== INSTRUKSI IMPLEMENTASI =====

console.log(`
╔════════════════════════════════════════════════════════════╗
║  ADVANCED SMOOTH ANIMATION - READY TO USE!                 ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  ✅ Sistem animasi sudah ter-load                         ║
║  ✅ Animators siap digunakan                              ║
║                                                            ║
║  LANGKAH IMPLEMENTASI:                                     ║
║  1. Backup main.js Anda                                    ║
║  2. Copy fungsi-fungsi dari main-with-animation.js        ║
║  3. Replace fungsi yang sama di main.js                    ║
║  4. Tambahkan initAnimators() di checkAuth()               ║
║  5. Refresh browser dan lihat animasi smooth! 🚀           ║
║                                                            ║
║  FITUR:                                                    ║
║  • Spring Physics untuk animasi natural                   ║
║  • 60 FPS smooth performance                               ║
║  • Animasi saldo, deposit, withdraw                        ║
║  • Animasi harga saham real-time                           ║
║  • Card animation saat harga berubah                       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);
