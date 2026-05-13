# 🚀 Advanced Smooth Animation Guide

Panduan lengkap untuk menggunakan sistem animasi yang lebih smooth dengan Spring Physics, Advanced Easing, dan GPU Acceleration.

## 📋 Daftar Isi

1. [Fitur Utama](#fitur-utama)
2. [Instalasi](#instalasi)
3. [Penggunaan Vanilla JavaScript](#penggunaan-vanilla-javascript)
4. [Penggunaan React](#penggunaan-react)
5. [Penggunaan Next.js](#penggunaan-nextjs)
6. [Spring Physics](#spring-physics)
7. [Advanced Easing Functions](#advanced-easing-functions)
8. [Optimasi Performa](#optimasi-performa)
9. [Contoh Lengkap](#contoh-lengkap)

---

## 🎯 Fitur Utama

### ✨ Yang Baru di Versi 2.0

- **Spring Physics Engine** - Animasi natural seperti pegas
- **Advanced Easing Functions** - 7+ easing functions baru
- **GPU Acceleration** - Performa maksimal dengan hardware acceleration
- **Momentum-based Animation** - Animasi yang lebih responsif
- **3D Transform Support** - Efek parallax dan 3D
- **Performance Monitor** - Monitor FPS dan performa real-time
- **Adaptive Frame Rate** - Otomatis menyesuaikan dengan device

### 🆚 Perbandingan dengan Versi Lama

| Fitur | Versi Lama | Versi Baru (Advanced) |
|-------|------------|----------------------|
| Animasi | Easing saja | Spring Physics + Easing |
| Performa | 30-45 FPS | 60 FPS konsisten |
| Smoothness | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Natural Feel | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| GPU Acceleration | ❌ | ✅ |
| 3D Effects | ❌ | ✅ |
| Momentum | ❌ | ✅ |

---

## 📦 Instalasi

### Vanilla JavaScript

```html
<!-- Include file JavaScript -->
<script src="js/advanced-smooth-animation.js"></script>

<!-- Atau gunakan versi lama jika perlu -->
<script src="js/smooth-price-updater.js"></script>
```

### React

```jsx
// Import komponen
import {
  useSpring,
  AdvancedSmoothPrice,
  AdvancedStockCard,
  AdvancedBalanceCard
} from './js/ReactAdvancedAnimation';
```

### Next.js

```tsx
// app/page.tsx
import InvestraAdvancedPage from '@/components/InvestraAdvancedPage';

export default function Home() {
  return <InvestraAdvancedPage />;
}
```

---

## 🔧 Penggunaan Vanilla JavaScript

### 1. Basic Usage dengan Spring Physics

```javascript
// Buat animator dengan spring physics
const animator = new AdvancedSmoothAnimator(element, {
  useSpring: true,
  springConfig: {
    stiffness: 170,  // Kekakuan pegas (50-300)
    damping: 26,     // Redaman (10-50)
    mass: 1          // Massa (0.5-3)
  },
  decimals: 0,
  prefix: 'Rp ',
  useGlow: true
});

// Animate ke nilai baru
animator.animateTo(5000000);
```

### 2. Basic Usage dengan Easing

```javascript
// Buat animator dengan easing function
const animator = new AdvancedSmoothAnimator(element, {
  useSpring: false,
  easing: 'smoothCubic',  // atau 'anticipate', 'overshoot', dll
  duration: 1000,
  decimals: 0,
  prefix: 'Rp ',
  useGlow: true
});

// Animate ke nilai baru
animator.animateTo(5000000);
```

### 3. Card Animation

```javascript
// Buat card animator
const cardAnimator = new AdvancedCardAnimator(cardElement, {
  animationDuration: 1200,
  scaleIntensity: 0.08,
  glowIntensity: 25,
  rotateIntensity: 2,
  useParallax: true,
  use3D: true
});

// Animate saat harga naik
cardAnimator.animateUp();

// Animate saat harga turun
cardAnimator.animateDown();

// Pulse effect
cardAnimator.pulse('#667eea');
```

---

## ⚛️ Penggunaan React

### 1. Hook useSpring

```jsx
import { useSpring } from './js/ReactAdvancedAnimation';

function MyComponent() {
  const [targetValue, setTargetValue] = useState(1000000);
  
  // Gunakan spring hook
  const animatedValue = useSpring(targetValue, {
    stiffness: 170,
    damping: 26,
    mass: 1,
    precision: 0.01
  });

  return (
    <div>
      <h2>Rp {animatedValue.toLocaleString('id-ID')}</h2>
      <button onClick={() => setTargetValue(5000000)}>
        Update
      </button>
    </div>
  );
}
```

### 2. Component AdvancedSmoothPrice

```jsx
import { AdvancedSmoothPrice } from './js/ReactAdvancedAnimation';

function PriceDisplay() {
  const [price, setPrice] = useState(1000000);

  return (
    <div>
      <AdvancedSmoothPrice 
        value={price}
        prefix="Rp "
        decimals={0}
        springConfig={{
          stiffness: 170,
          damping: 26,
          mass: 1
        }}
        showDirection={true}
        useGlow={true}
      />
      <button onClick={() => setPrice(price + 500000)}>
        Tambah
      </button>
    </div>
  );
}
```

### 3. Component AdvancedStockCard

```jsx
import { AdvancedStockCard } from './js/ReactAdvancedAnimation';

function StockList() {
  const [stocks, setStocks] = useState([
    {
      id: 'BBCA',
      name: 'Bank Central Asia',
      price: 9500,
      changePercent: 2.5,
      owned: 10,
      sector: 'Perbankan',
      icon: '🏦'
    }
  ]);

  const handleBuy = (id) => {
    console.log('Buy', id);
  };

  const handleSell = (id) => {
    console.log('Sell', id);
  };

  return (
    <div>
      {stocks.map(stock => (
        <AdvancedStockCard
          key={stock.id}
          {...stock}
          onBuy={handleBuy}
          onSell={handleSell}
        />
      ))}
    </div>
  );
}
```

---

## 🎨 Spring Physics

### Apa itu Spring Physics?

Spring Physics adalah sistem animasi yang mensimulasikan perilaku pegas fisik. Hasilnya adalah animasi yang terasa lebih natural dan responsif.

### Parameter Spring

#### 1. **Stiffness (Kekakuan)** - Range: 50-300

- **50-100**: Sangat lembut, slow motion
- **100-150**: Lembut, smooth
- **150-200**: Normal, balanced (recommended)
- **200-250**: Cepat, snappy
- **250-300**: Sangat cepat, instant

```javascript
// Contoh penggunaan
springConfig: {
  stiffness: 170  // Balanced, smooth
}
```

#### 2. **Damping (Redaman)** - Range: 10-50

- **10-15**: Banyak bouncing, playful
- **15-25**: Sedikit bouncing, natural
- **25-35**: Minimal bouncing (recommended)
- **35-45**: Hampir tidak ada bouncing
- **45-50**: Tidak ada bouncing sama sekali

```javascript
springConfig: {
  damping: 26  // Minimal bouncing
}
```

#### 3. **Mass (Massa)** - Range: 0.5-3

- **0.5-0.8**: Ringan, cepat
- **0.8-1.2**: Normal (recommended)
- **1.2-2.0**: Berat, lambat
- **2.0-3.0**: Sangat berat, very slow

```javascript
springConfig: {
  mass: 1  // Normal weight
}
```

### Preset Konfigurasi

```javascript
// Gentle (Lembut)
const gentleSpring = {
  stiffness: 120,
  damping: 20,
  mass: 1
};

// Default (Balanced)
const defaultSpring = {
  stiffness: 170,
  damping: 26,
  mass: 1
};

// Snappy (Cepat)
const snappySpring = {
  stiffness: 250,
  damping: 35,
  mass: 0.8
};

// Bouncy (Playful)
const bouncySpring = {
  stiffness: 180,
  damping: 15,
  mass: 1.2
};

// Slow (Lambat)
const slowSpring = {
  stiffness: 100,
  damping: 30,
  mass: 2
};
```

---

## 📐 Advanced Easing Functions

### Daftar Easing Functions

#### 1. **smoothCubic** (Recommended)
Smooth cubic bezier, sangat halus dan natural.

```javascript
easing: 'smoothCubic'
```

#### 2. **anticipate**
Mundur sedikit sebelum maju, seperti mengambil ancang-ancang.

```javascript
easing: 'anticipate'
```

#### 3. **overshoot**
Melewati target sedikit kemudian kembali.

```javascript
easing: 'overshoot'
```

#### 4. **smoothStep**
Sangat halus, acceleration dan deceleration yang smooth.

```javascript
easing: 'smoothStep'
```

#### 5. **smootherStep**
Lebih halus dari smoothStep.

```javascript
easing: 'smootherStep'
```

#### 6. **circularInOut**
Circular easing, smooth dengan curve yang konsisten.

```javascript
easing: 'circularInOut'
```

#### 7. **exponentialSmooth**
Exponential easing yang sangat smooth.

```javascript
easing: 'exponentialSmooth'
```

### Kapan Menggunakan Apa?

| Use Case | Recommended Easing |
|----------|-------------------|
| Harga/Angka | smoothCubic, smootherStep |
| Button Click | overshoot, anticipate |
| Modal/Dialog | smoothStep, circularInOut |
| Scroll | smootherStep, exponentialSmooth |
| Loading | circularInOut, smoothCubic |

---

## ⚡ Optimasi Performa

### 1. GPU Acceleration

Sistem ini otomatis menggunakan GPU acceleration untuk performa maksimal:

```javascript
// Otomatis menggunakan transform dan opacity
// yang di-accelerate oleh GPU
element.style.transform = 'translateZ(0)';
element.style.willChange = 'transform, opacity';
```

### 2. RequestAnimationFrame

Semua animasi menggunakan `requestAnimationFrame` untuk sinkronisasi dengan refresh rate monitor:

```javascript
const animate = (currentTime) => {
  // Update animation
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
```

### 3. Adaptive Frame Rate

Sistem otomatis menyesuaikan dengan device capability:

```javascript
const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016);
// Cap at 60fps untuk konsistensi
```

### 4. Performance Monitor

Monitor performa real-time:

```javascript
const perfMonitor = new PerformanceMonitor();

function update() {
  const fps = perfMonitor.update();
  console.log('Current FPS:', fps);
  requestAnimationFrame(update);
}
```

### Tips Optimasi

1. **Batasi Animasi Simultan**
   - Maksimal 10-15 animasi bersamaan
   - Gunakan batching untuk update massal

2. **Gunakan Transform, Bukan Position**
   ```javascript
   // ❌ Lambat
   element.style.left = '100px';
   
   // ✅ Cepat (GPU accelerated)
   element.style.transform = 'translateX(100px)';
   ```

3. **Cleanup Animator**
   ```javascript
   // Destroy animator saat tidak digunakan
   animator.destroy();
   ```

4. **Debounce Rapid Updates**
   ```javascript
   let timeout;
   function updatePrice(value) {
     clearTimeout(timeout);
     timeout = setTimeout(() => {
       animator.animateTo(value);
     }, 100);
   }
   ```

---

## 📱 Contoh Lengkap

### Contoh 1: Balance Card

```javascript
// HTML
<div id="balance-card">
  <h2>Total Saldo</h2>
  <div id="balance">Rp 1,000,000</div>
  <button onclick="deposit()">Setor</button>
  <button onclick="withdraw()">Tarik</button>
</div>

// JavaScript
let balance = 1000000;
const balanceAnimator = new AdvancedSmoothAnimator(
  document.getElementById('balance'),
  {
    useSpring: true,
    springConfig: { stiffness: 170, damping: 26, mass: 1 },
    decimals: 0,
    prefix: 'Rp ',
    useGlow: true
  }
);

function deposit() {
  balance += 500000;
  balanceAnimator.animateTo(balance);
}

function withdraw() {
  if (balance >= 500000) {
    balance -= 500000;
    balanceAnimator.animateTo(balance);
  }
}
```

### Contoh 2: Live Stock Market

```javascript
const stocks = {
  bbca: { price: 9500, element: document.getElementById('price-bbca') },
  btc: { price: 950000000, element: document.getElementById('price-btc') }
};

// Setup animators
Object.keys(stocks).forEach(id => {
  stocks[id].animator = new AdvancedSmoothAnimator(stocks[id].element, {
    useSpring: true,
    springConfig: { stiffness: 170, damping: 26, mass: 1 },
    decimals: 0,
    prefix: 'Rp ',
    useGlow: true
  });
});

// Simulate live updates
setInterval(() => {
  Object.keys(stocks).forEach(id => {
    const change = (Math.random() - 0.5) * 0.05;
    stocks[id].price *= (1 + change);
    stocks[id].animator.animateTo(stocks[id].price);
  });
}, 2000);
```

### Contoh 3: React Component

```jsx
import { useState } from 'react';
import { AdvancedSmoothPrice, AdvancedBalanceCard } from './ReactAdvancedAnimation';

function InvestraApp() {
  const [balance, setBalance] = useState(10000000);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  const handleDeposit = (amount) => {
    setBalance(prev => prev + amount);
    setTotalDeposit(prev => prev + amount);
  };

  const handleWithdraw = (amount) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setTotalWithdraw(prev => prev + amount);
    }
  };

  return (
    <div className="app">
      <h1>Investra</h1>
      <AdvancedBalanceCard
        balance={balance}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        totalDeposit={totalDeposit}
        totalWithdraw={totalWithdraw}
      />
    </div>
  );
}
```

---

## 🎯 Best Practices

### 1. Pilih Spring vs Easing

**Gunakan Spring Physics untuk:**
- Interaksi user (button, drag, swipe)
- Animasi yang perlu terasa natural
- Animasi yang responsif terhadap input

**Gunakan Easing untuk:**
- Animasi yang perlu timing presisi
- Animasi yang perlu predictable
- Animasi yang perlu sinkron dengan audio/video

### 2. Konfigurasi Spring

```javascript
// Untuk angka/harga
springConfig: { stiffness: 170, damping: 26, mass: 1 }

// Untuk button/interaction
springConfig: { stiffness: 250, damping: 35, mass: 0.8 }

// Untuk modal/dialog
springConfig: { stiffness: 150, damping: 30, mass: 1.2 }
```

### 3. Glow Effect

```javascript
// Gunakan glow untuk highlight perubahan penting
useGlow: true,
glowColor: {
  up: '#10b981',    // Green untuk naik
  down: '#ef4444'   // Red untuk turun
}
```

### 4. Direction Indicator

```javascript
// Tampilkan arrow untuk perubahan signifikan
showDirection: true  // Tampilkan ↑ atau ↓
```

---

## 🐛 Troubleshooting

### Animasi Tidak Smooth

1. **Check FPS**
   ```javascript
   const perfMonitor = new PerformanceMonitor();
   console.log('FPS:', perfMonitor.getFPS());
   ```

2. **Reduce Concurrent Animations**
   - Batasi jumlah animasi simultan

3. **Check GPU Acceleration**
   ```javascript
   element.style.transform = 'translateZ(0)';
   ```

### Animasi Terlalu Cepat/Lambat

1. **Adjust Spring Config**
   ```javascript
   // Lebih lambat
   springConfig: { stiffness: 100, damping: 30, mass: 2 }
   
   // Lebih cepat
   springConfig: { stiffness: 250, damping: 35, mass: 0.8 }
   ```

2. **Adjust Duration (untuk easing)**
   ```javascript
   duration: 1500  // Lebih lambat
   duration: 500   // Lebih cepat
   ```

### Memory Leak

1. **Destroy Animator**
   ```javascript
   // Saat component unmount
   animator.destroy();
   ```

2. **Clear Intervals**
   ```javascript
   clearInterval(liveInterval);
   ```

---

## 📚 Resources

- [Demo HTML](demo-advanced-animation.html)
- [JavaScript Source](js/advanced-smooth-animation.js)
- [React Components](js/ReactAdvancedAnimation.jsx)
- [Next.js Example](js/NextJsAdvancedExample.tsx)

---

## 🤝 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository atau hubungi tim development.

---

**Happy Coding! 🚀**
