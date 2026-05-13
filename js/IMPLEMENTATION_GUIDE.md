# 🚀 Panduan Implementasi Animasi Smooth

Dokumentasi lengkap untuk mengimplementasikan animasi naik turun yang lebih smooth di aplikasi Investra.

## 📋 Daftar Isi

1. [Quick Start](#quick-start)
2. [Vanilla JavaScript](#vanilla-javascript)
3. [React/Next.js](#reactnextjs)
4. [Integrasi dengan Kode Existing](#integrasi-dengan-kode-existing)
5. [Customization](#customization)
6. [Performance Tips](#performance-tips)

---

## 🎯 Quick Start

### 1. Include Files

Tambahkan file-file berikut ke dalam HTML Anda:

```html
<!-- CSS untuk animasi -->
<link rel="stylesheet" href="js/smooth-animations.css">

<!-- JavaScript untuk animasi -->
<script src="js/smooth-price-updater.js"></script>
```

### 2. Basic Usage

```javascript
// Daftarkan element untuk animasi smooth
priceManager.register('balance', {
  duration: 800,
  easing: 'easeInOutCubic',
  decimals: 0,
  prefix: 'Rp ',
  showDirection: true
});

// Update harga dengan animasi smooth
priceManager.update('balance', 1000000);
```

---

## 💻 Vanilla JavaScript

### Setup Dasar

```javascript
// Inisialisasi price manager (sudah otomatis di window.priceManager)
const priceManager = new SmoothPriceManager();

// Register elements yang ingin di-animate
priceManager.register('balance', {
  duration: 800,           // Durasi animasi (ms)
  easing: 'easeInOutCubic', // Jenis easing
  decimals: 0,             // Jumlah desimal
  prefix: 'Rp ',           // Prefix (Rp, $, dll)
  suffix: '',              // Suffix (%, dll)
  showDirection: true,     // Tampilkan panah naik/turun
  useGlow: true           // Gunakan efek glow
});
```

### Update Single Price

```javascript
// Update satu harga
priceManager.update('balance', 5000000);
```

### Batch Update

```javascript
// Update banyak harga sekaligus
priceManager.batchUpdate({
  'balance': 5000000,
  'totalDeposit': 10000000,
  'totalWithdraw': 5000000
});
```

### Standalone Animator

```javascript
// Untuk element spesifik tanpa manager
const element = document.getElementById('myPrice');
const animator = new SmoothPriceAnimator(element, {
  duration: 1000,
  easing: 'easeOutBack',
  decimals: 2
});

// Animate ke nilai baru
animator.animateTo(123456.78);
```

### Card Animation

```javascript
// Animate card saat harga berubah
const card = document.getElementById('stockCard');
const cardAnimator = new CardAnimator(card, {
  animationDuration: 1200,
  scaleIntensity: 0.05,
  glowIntensity: 20
});

// Trigger animasi
if (priceGoesUp) {
  cardAnimator.animateUp();
} else {
  cardAnimator.animateDown();
}
```

---

## ⚛️ React/Next.js

### Import Component

```jsx
import { 
  SmoothPrice, 
  AnimatedPriceCard,
  useCountAnimation 
} from './js/SmoothPriceAnimation';
```

### Basic Price Display

```jsx
function BalanceDisplay({ balance }) {
  return (
    <div>
      <h2>Saldo Anda:</h2>
      <SmoothPrice 
        value={balance}
        prefix="Rp "
        decimals={0}
        duration={800}
        easing="easeInOutCubic"
        showDirection={true}
      />
    </div>
  );
}
```

### Custom Hook Usage

```jsx
function MyComponent() {
  const [targetValue, setTargetValue] = useState(1000000);
  
  // Hook akan otomatis animate saat targetValue berubah
  const animatedValue = useCountAnimation(
    targetValue,
    800,  // duration
    'easeInOutCubic'  // easing
  );

  return (
    <div>
      Rp {animatedValue.toLocaleString('id-ID')}
    </div>
  );
}
```

### Animated Card Component

```jsx
function StockCard({ stock }) {
  return (
    <AnimatedPriceCard
      id={stock.id}
      name={stock.name}
      price={stock.price}
      changePercent={stock.changePercent}
      owned={stock.owned}
      onBuy={(id) => handleBuy(id)}
      onSell={(id) => handleSell(id)}
      icon="📈"
      sector={stock.sector}
    />
  );
}
```

### Next.js App Router

```jsx
// app/components/PriceDisplay.tsx
'use client';

import { SmoothPrice } from '@/js/SmoothPriceAnimation';

export default function PriceDisplay({ price }) {
  return (
    <SmoothPrice 
      value={price}
      prefix="Rp "
      duration={600}
      easing="easeOutBack"
    />
  );
}
```

---

## 🔧 Integrasi dengan Kode Existing

### Mengganti Animasi Lama

**SEBELUM (main.js):**
```javascript
// Animasi lama yang kurang smooth
function updateStockPrice(stock) {
  const priceElement = document.getElementById(`price-${stock.id}`);
  priceElement.textContent = formatCurrency(stock.price);
  
  if (stock.priceDirection === 'up') {
    priceElement.classList.add('price-up');
  } else {
    priceElement.classList.add('price-down');
  }
}
```

**SESUDAH (dengan smooth animation):**
```javascript
// Animasi baru yang lebih smooth
function updateStockPrice(stock) {
  const priceElement = document.getElementById(`price-${stock.id}`);
  
  // Gunakan smooth animator
  if (!priceElement.animator) {
    priceElement.animator = new SmoothPriceAnimator(priceElement, {
      duration: 800,
      easing: 'easeInOutCubic',
      decimals: 0,
      prefix: 'Rp ',
      useGlow: true
    });
  }
  
  priceElement.animator.animateTo(stock.price);
  
  // Animate card juga
  const card = priceElement.closest('.stock-card');
  if (card && !card.cardAnimator) {
    card.cardAnimator = new CardAnimator(card);
  }
  
  if (stock.priceDirection === 'up') {
    card.cardAnimator?.animateUp();
  } else if (stock.priceDirection === 'down') {
    card.cardAnimator?.animateDown();
  }
}
```

### Update Function untuk Balance

```javascript
// Tambahkan di bagian initialization
window.addEventListener('DOMContentLoaded', () => {
  // Register balance elements
  priceManager.register('balance', {
    duration: 800,
    easing: 'easeInOutCubic',
    decimals: 0,
    prefix: 'Rp ',
    showDirection: false
  });
  
  priceManager.register('totalDeposit', {
    duration: 600,
    easing: 'easeOutExpo',
    decimals: 0,
    prefix: 'Rp '
  });
  
  priceManager.register('totalWithdraw', {
    duration: 600,
    easing: 'easeOutExpo',
    decimals: 0,
    prefix: 'Rp '
  });
});

// Update display function
function updateDisplay() {
  // Gunakan smooth animation
  priceManager.batchUpdate({
    'balance': balance,
    'totalDeposit': totalDeposit,
    'totalWithdraw': totalWithdraw
  });
}
```

### Update Stock Rendering

```javascript
function renderStocks() {
  const stockList = document.getElementById('stockList');
  
  stockList.innerHTML = stocks.map(stock => {
    const changeClass = stock.changePercent >= 0 ? 'positive' : 'negative';
    const changeIcon = stock.changePercent >= 0 ? '▲' : '▼';
    
    return `
      <div class="animated-price-card stock-card" id="card-${stock.id}">
        <div class="card-header">
          <div class="card-icon">📈</div>
          <div class="card-info">
            <h3 class="card-id">${stock.id}</h3>
            <p class="card-name">${stock.name}</p>
            <span class="card-sector">${stock.sector}</span>
          </div>
        </div>
        
        <div class="card-price">
          <span id="price-${stock.id}" class="smooth-price">
            Rp ${formatCurrency(stock.price)}
          </span>
        </div>
        
        <div class="card-change ${changeClass}">
          <span class="change-icon">${changeIcon}</span>
          <span id="change-${stock.id}">
            ${Math.abs(stock.changePercent).toFixed(2)}%
          </span>
        </div>
        
        <div class="card-actions">
          <button onclick="openBuyModal('${stock.id}')" class="btn-buy">
            Beli
          </button>
          ${stock.owned > 0 ? `
            <button onclick="openSellModal('${stock.id}')" class="btn-sell">
              Jual
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  // Initialize animators untuk setiap stock
  stocks.forEach(stock => {
    const priceElement = document.getElementById(`price-${stock.id}`);
    const cardElement = document.getElementById(`card-${stock.id}`);
    
    if (priceElement && !priceElement.animator) {
      priceElement.animator = new SmoothPriceAnimator(priceElement, {
        duration: 800,
        easing: 'easeInOutCubic',
        decimals: 0,
        prefix: 'Rp ',
        useGlow: true
      });
    }
    
    if (cardElement && !cardElement.cardAnimator) {
      cardElement.cardAnimator = new CardAnimator(cardElement);
    }
  });
}
```

---

## 🎨 Customization

### Easing Functions

Pilih easing function sesuai kebutuhan:

```javascript
// Smooth dan natural (recommended)
easing: 'easeInOutCubic'

// Elastic bounce (playful)
easing: 'easeOutElastic'

// Smooth bounce
easing: 'easeOutBounce'

// Exponential (fast start, slow end)
easing: 'easeOutExpo'

// Back (slight overshoot)
easing: 'easeOutBack'

// Sine (very smooth)
easing: 'easeInOutSine'
```

### Custom Duration

```javascript
// Cepat (400ms)
duration: 400

// Normal (800ms) - recommended
duration: 800

// Slow (1200ms)
duration: 1200

// Very slow (2000ms)
duration: 2000
```

### Custom Colors

Edit `smooth-animations.css`:

```css
/* Custom color untuk harga naik */
@keyframes smoothPriceUp {
  50% {
    background-color: rgba(34, 197, 94, 0.4); /* Hijau lebih terang */
  }
}

/* Custom color untuk harga turun */
@keyframes smoothPriceDown {
  50% {
    background-color: rgba(248, 113, 113, 0.4); /* Merah lebih terang */
  }
}
```

### Custom Glow Intensity

```javascript
const cardAnimator = new CardAnimator(card, {
  glowIntensity: 30,  // Default: 20
  scaleIntensity: 0.08  // Default: 0.05
});
```

---

## ⚡ Performance Tips

### 1. Batch Updates

```javascript
// ❌ BURUK - Update satu per satu
priceManager.update('balance', 1000000);
priceManager.update('totalDeposit', 2000000);
priceManager.update('totalWithdraw', 1000000);

// ✅ BAIK - Batch update
priceManager.batchUpdate({
  'balance': 1000000,
  'totalDeposit': 2000000,
  'totalWithdraw': 1000000
});
```

### 2. Cleanup

```javascript
// Cleanup saat component unmount atau page change
function cleanup() {
  priceManager.destroy();
}

// Atau unregister specific element
priceManager.unregister('balance');
```

### 3. Reduce Motion

Animasi otomatis dinonaktifkan untuk user yang prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. GPU Acceleration

Sudah built-in di CSS:

```css
.smooth-price {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 5. Throttle Updates

```javascript
// Throttle price updates untuk performa lebih baik
let updateTimeout;
function throttledUpdate(elementId, value) {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    priceManager.update(elementId, value);
  }, 100);
}
```

---

## 🎬 Demo Examples

### Example 1: Simple Counter

```html
<div id="counter">0</div>
<button onclick="increment()">+1000</button>

<script>
let count = 0;
priceManager.register('counter', {
  duration: 600,
  easing: 'easeOutBack',
  prefix: 'Rp ',
  decimals: 0
});

function increment() {
  count += 1000;
  priceManager.update('counter', count);
}
</script>
```

### Example 2: Stock Price Simulator

```html
<div class="animated-price-card" id="stockCard">
  <h3>BBCA</h3>
  <div id="stockPrice" class="card-price">Rp 9,500</div>
</div>

<script>
const priceElement = document.getElementById('stockPrice');
const card = document.getElementById('stockCard');

const animator = new SmoothPriceAnimator(priceElement, {
  duration: 800,
  easing: 'easeInOutCubic',
  useGlow: true
});

const cardAnimator = new CardAnimator(card);

// Simulate price changes
setInterval(() => {
  const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9]/g, ''));
  const change = (Math.random() - 0.5) * 200;
  const newPrice = currentPrice + change;
  
  animator.animateTo(newPrice);
  
  if (change > 0) {
    cardAnimator.animateUp();
  } else {
    cardAnimator.animateDown();
  }
}, 3000);
</script>
```

### Example 3: React Component

```jsx
import { useState, useEffect } from 'react';
import { SmoothPrice } from './SmoothPriceAnimation';

function CryptoPrice() {
  const [btcPrice, setBtcPrice] = useState(950000000);

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      setBtcPrice(prev => {
        const change = (Math.random() - 0.5) * 10000000;
        return prev + change;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crypto-card">
      <h2>Bitcoin (BTC)</h2>
      <SmoothPrice
        value={btcPrice}
        prefix="Rp "
        decimals={0}
        duration={800}
        easing="easeInOutCubic"
        showDirection={true}
      />
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Animasi tidak muncul

1. Pastikan CSS sudah di-include:
```html
<link rel="stylesheet" href="js/smooth-animations.css">
```

2. Pastikan JavaScript sudah di-load:
```html
<script src="js/smooth-price-updater.js"></script>
```

3. Check console untuk error

### Animasi tersendat

1. Reduce duration:
```javascript
duration: 400  // Lebih cepat
```

2. Gunakan easing yang lebih simple:
```javascript
easing: 'easeInOutCubic'  // Paling smooth
```

3. Batch updates:
```javascript
priceManager.batchUpdate({ ... });
```

### Memory leak

Pastikan cleanup saat tidak digunakan:
```javascript
// Cleanup saat page change
priceManager.destroy();

// Atau unregister specific
priceManager.unregister('elementId');
```

---

## 📚 API Reference

### SmoothPriceAnimator

```javascript
new SmoothPriceAnimator(element, options)
```

**Options:**
- `duration` (number): Durasi animasi dalam ms (default: 800)
- `easing` (string): Easing function (default: 'easeInOutCubic')
- `decimals` (number): Jumlah desimal (default: 0)
- `prefix` (string): Prefix text (default: 'Rp ')
- `suffix` (string): Suffix text (default: '')
- `showDirection` (boolean): Tampilkan panah (default: true)
- `useGlow` (boolean): Gunakan glow effect (default: false)

**Methods:**
- `animateTo(value)`: Animate ke nilai baru
- `updateDisplay()`: Update tampilan
- `destroy()`: Cleanup animator

### SmoothPriceManager

```javascript
const manager = new SmoothPriceManager()
```

**Methods:**
- `register(elementId, options)`: Register element
- `update(elementId, value)`: Update single price
- `batchUpdate(updates)`: Update multiple prices
- `unregister(elementId)`: Unregister element
- `destroy()`: Cleanup all

### CardAnimator

```javascript
new CardAnimator(cardElement, options)
```

**Options:**
- `animationDuration` (number): Durasi (default: 1200)
- `scaleIntensity` (number): Intensitas scale (default: 0.05)
- `glowIntensity` (number): Intensitas glow (default: 20)

**Methods:**
- `animateUp()`: Animate harga naik
- `animateDown()`: Animate harga turun
- `pulse()`: Pulse animation

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository atau hubungi developer.

**Happy Coding! 🚀**
