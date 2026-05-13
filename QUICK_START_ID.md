# 🚀 Quick Start Guide - Animasi Smooth untuk Investra

Panduan cepat untuk memulai menggunakan sistem animasi smooth dalam bahasa Indonesia.

## 📋 Pilih Versi Anda

### Versi Basic (Mudah)
- ✅ Cocok untuk pemula
- ✅ Setup cepat
- ✅ 6 jenis easing
- ✅ Performa bagus

### Versi Advanced (Recommended) ⭐
- ✅ Spring Physics (animasi seperti pegas)
- ✅ 60 FPS konsisten
- ✅ Lebih smooth dan natural
- ✅ 7+ jenis easing
- ✅ GPU acceleration

---

## 🎯 Cara 1: Vanilla JavaScript (Paling Mudah)

### Step 1: Include File

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Investra</title>
    
    <!-- Pilih salah satu: -->
    
    <!-- Basic Version -->
    <script src="js/smooth-price-updater.js"></script>
    
    <!-- ATAU Advanced Version (Recommended) -->
    <script src="js/advanced-smooth-animation.js"></script>
    <link rel="stylesheet" href="js/advanced-animations.css">
</head>
<body>
    <!-- Konten Anda -->
</body>
</html>
```

### Step 2: Buat Element HTML

```html
<div id="saldo">Rp 1,000,000</div>
<button onclick="tambahSaldo()">Tambah Rp 500,000</button>
```

### Step 3: Tambahkan JavaScript

#### Menggunakan Basic Version:

```javascript
// Buat animator
const animator = new SmoothPriceAnimator(
    document.getElementById('saldo'),
    {
        duration: 800,              // Durasi animasi (ms)
        easing: 'easeInOutCubic',  // Jenis easing
        decimals: 0,               // Jumlah desimal
        prefix: 'Rp ',             // Prefix (Rp)
        useGlow: true              // Efek glow
    }
);

// Fungsi untuk update
function tambahSaldo() {
    animator.animateTo(5000000);
}
```

#### Menggunakan Advanced Version (Recommended):

```javascript
// Buat animator dengan Spring Physics
const animator = new AdvancedSmoothAnimator(
    document.getElementById('saldo'),
    {
        useSpring: true,           // Gunakan spring physics
        springConfig: {
            stiffness: 170,        // Kekakuan (50-300)
            damping: 26,           // Redaman (10-50)
            mass: 1                // Massa (0.5-3)
        },
        decimals: 0,
        prefix: 'Rp ',
        useGlow: true
    }
);

// Fungsi untuk update
function tambahSaldo() {
    animator.animateTo(5000000);
}
```

---

## ⚛️ Cara 2: React

### Step 1: Import Component

```jsx
// Basic Version
import { SmoothPrice } from './js/SmoothPriceAnimation';

// ATAU Advanced Version (Recommended)
import { AdvancedSmoothPrice } from './js/ReactAdvancedAnimation';
```

### Step 2: Gunakan Component

#### Basic Version:

```jsx
import { useState } from 'react';
import { SmoothPrice } from './js/SmoothPriceAnimation';

function App() {
  const [saldo, setSaldo] = useState(1000000);

  return (
    <div>
      <h2>Saldo Anda:</h2>
      <SmoothPrice 
        value={saldo}
        prefix="Rp "
        decimals={0}
        duration={800}
        easing="easeInOutCubic"
        showDirection={true}
      />
      
      <button onClick={() => setSaldo(saldo + 500000)}>
        Tambah Rp 500,000
      </button>
    </div>
  );
}
```

#### Advanced Version (Recommended):

```jsx
import { useState } from 'react';
import { AdvancedSmoothPrice } from './js/ReactAdvancedAnimation';

function App() {
  const [saldo, setSaldo] = useState(1000000);

  return (
    <div>
      <h2>Saldo Anda:</h2>
      <AdvancedSmoothPrice 
        value={saldo}
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
      
      <button onClick={() => setSaldo(saldo + 500000)}>
        Tambah Rp 500,000
      </button>
    </div>
  );
}
```

---

## 🎨 Cara 3: Next.js (Complete App)

### Step 1: Copy Files

Copy semua file dari folder `js/` ke project Next.js Anda:
- `ReactAdvancedAnimation.jsx`
- `NextJsAdvancedExample.tsx`
- `advanced-animations.css`

### Step 2: Buat Page

```tsx
// app/page.tsx
import InvestraAdvancedPage from '@/components/InvestraAdvancedPage';

export default function Home() {
  return <InvestraAdvancedPage />;
}
```

### Step 3: Import CSS

```tsx
// app/layout.tsx
import './globals.css';
import '@/js/advanced-animations.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
```

### Step 4: Run

```bash
npm run dev
```

---

## 🎯 Contoh Lengkap: Aplikasi Saldo

### HTML + JavaScript (Copy-Paste Ready)

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Investra - Saldo Saya</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="js/advanced-smooth-animation.js"></script>
    <link rel="stylesheet" href="js/advanced-animations.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .card {
            background: white;
            border-radius: 2rem;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 100%;
        }
        
        .saldo-display {
            font-size: 3rem;
            font-weight: 700;
            color: #1f2937;
            text-align: center;
            margin: 2rem 0;
        }
        
        .btn {
            padding: 1rem 2rem;
            border-radius: 1rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            width: 100%;
            margin: 0.5rem 0;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        
        .btn-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }
        
        .btn-danger {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1 style="text-align: center; color: #1f2937; margin-bottom: 1rem;">
            💰 Saldo Investra
        </h1>
        <p style="text-align: center; color: #6b7280; margin-bottom: 2rem;">
            Lihat animasi smooth saat saldo berubah
        </p>
        
        <div class="saldo-display" id="saldo">
            Rp 1,000,000
        </div>
        
        <button class="btn btn-success" onclick="setor()">
            ➕ Setor Rp 500,000
        </button>
        <button class="btn btn-danger" onclick="tarik()">
            ➖ Tarik Rp 500,000
        </button>
        <button class="btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;" onclick="random()">
            🎲 Random
        </button>
    </div>

    <script>
        // Inisialisasi
        let saldo = 1000000;
        
        const animator = new AdvancedSmoothAnimator(
            document.getElementById('saldo'),
            {
                useSpring: true,
                springConfig: {
                    stiffness: 170,
                    damping: 26,
                    mass: 1
                },
                decimals: 0,
                prefix: 'Rp ',
                useGlow: true
            }
        );

        // Fungsi setor
        function setor() {
            saldo += 500000;
            animator.animateTo(saldo);
        }

        // Fungsi tarik
        function tarik() {
            if (saldo >= 500000) {
                saldo -= 500000;
                animator.animateTo(saldo);
            } else {
                alert('Saldo tidak cukup!');
            }
        }

        // Fungsi random
        function random() {
            saldo = Math.floor(Math.random() * 10000000) + 1000000;
            animator.animateTo(saldo);
        }

        console.log('✅ Aplikasi siap digunakan!');
    </script>
</body>
</html>
```

---

## 🎨 Kustomisasi

### 1. Ubah Kecepatan Animasi

```javascript
// Lebih lambat (smooth)
springConfig: {
    stiffness: 100,
    damping: 30,
    mass: 2
}

// Lebih cepat (snappy)
springConfig: {
    stiffness: 250,
    damping: 35,
    mass: 0.8
}
```

### 2. Ubah Warna Glow

```javascript
glowColor: {
    up: '#10b981',    // Hijau untuk naik
    down: '#ef4444'   // Merah untuk turun
}
```

### 3. Ubah Format Angka

```javascript
// Dengan desimal
decimals: 2,
prefix: 'Rp ',
suffix: ''

// Tanpa prefix
decimals: 0,
prefix: '',
suffix: ' IDR'
```

### 4. Matikan Efek Tertentu

```javascript
showDirection: false,  // Matikan arrow ↑↓
useGlow: false        // Matikan efek glow
```

---

## 📱 Contoh Use Cases

### 1. Saldo Bank

```javascript
const saldoAnimator = new AdvancedSmoothAnimator(element, {
    useSpring: true,
    springConfig: { stiffness: 170, damping: 26, mass: 1 },
    decimals: 0,
    prefix: 'Rp ',
    useGlow: true
});
```

### 2. Harga Saham

```javascript
const sahamAnimator = new AdvancedSmoothAnimator(element, {
    useSpring: true,
    springConfig: { stiffness: 200, damping: 30, mass: 0.8 },
    decimals: 0,
    prefix: 'Rp ',
    useGlow: true,
    showDirection: true
});
```

### 3. Harga Crypto

```javascript
const cryptoAnimator = new AdvancedSmoothAnimator(element, {
    useSpring: true,
    springConfig: { stiffness: 180, damping: 28, mass: 1 },
    decimals: 8,  // Banyak desimal untuk crypto
    prefix: 'Rp ',
    useGlow: true
});
```

### 4. Counter Transaksi

```javascript
const counterAnimator = new AdvancedSmoothAnimator(element, {
    useSpring: false,
    easing: 'easeOutExpo',
    duration: 600,
    decimals: 0,
    prefix: '',
    showDirection: false,
    useGlow: false
});
```

---

## 🎓 Tips & Tricks

### 1. Multiple Animators

```javascript
// Buat beberapa animator sekaligus
const animators = {
    saldo: new AdvancedSmoothAnimator(document.getElementById('saldo'), {...}),
    saham: new AdvancedSmoothAnimator(document.getElementById('saham'), {...}),
    crypto: new AdvancedSmoothAnimator(document.getElementById('crypto'), {...})
};

// Update semuanya
animators.saldo.animateTo(5000000);
animators.saham.animateTo(9500);
animators.crypto.animateTo(950000000);
```

### 2. Live Updates

```javascript
// Simulasi update real-time
setInterval(() => {
    const newPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.05);
    animator.animateTo(newPrice);
}, 2000);
```

### 3. Cleanup

```javascript
// Destroy animator saat tidak digunakan
animator.destroy();
```

---

## 🐛 Troubleshooting

### Animasi tidak jalan?
1. Pastikan file JS sudah di-include
2. Check console untuk error
3. Pastikan element ID benar

### Animasi patah-patah?
1. Gunakan Advanced Version
2. Reduce jumlah animasi simultan
3. Check FPS dengan Performance Monitor

### Terlalu cepat/lambat?
1. Adjust `stiffness`, `damping`, `mass`
2. Atau gunakan `duration` untuk easing

---

## 📚 File Demo

Coba file demo untuk melihat contoh lengkap:

1. **demo-smooth-animation.html** - Demo basic
2. **demo-advanced-animation.html** - Demo advanced ⭐

Buka di browser untuk melihat animasi bekerja!

---

## 🎉 Selesai!

Anda sudah siap menggunakan sistem animasi smooth untuk Investra!

### Next Steps:
1. ✅ Coba demo files
2. ✅ Baca dokumentasi lengkap di `ADVANCED_ANIMATION_GUIDE.md`
3. ✅ Eksperimen dengan parameter
4. ✅ Build aplikasi Anda!

---

**Selamat Coding! 🚀**

Dibuat dengan ❤️ untuk Platform Investra
