# 🎨 Smooth Animation System

Sistem animasi naik turun yang lebih smooth untuk aplikasi Investra dengan dukungan React, Next.js, dan Vanilla JavaScript.

## 📦 File Structure

```
js/
├── SmoothPriceAnimation.jsx      # React/Next.js components
├── smooth-animations.css          # CSS animations
├── smooth-price-updater.js        # Vanilla JavaScript
├── IMPLEMENTATION_GUIDE.md        # Dokumentasi lengkap
└── README.md                      # File ini

demo-smooth-animation.html         # Demo interaktif
```

## 🚀 Quick Start

### 1. Include Files

```html
<!-- CSS -->
<link rel="stylesheet" href="js/smooth-animations.css">

<!-- JavaScript -->
<script src="js/smooth-price-updater.js"></script>
```

### 2. Basic Usage

```javascript
// Register element
priceManager.register('balance', {
  duration: 800,
  easing: 'easeInOutCubic',
  prefix: 'Rp ',
  decimals: 0
});

// Update dengan animasi smooth
priceManager.update('balance', 1000000);
```

## 🎯 Features

✅ **6 Easing Functions** - Smooth, Elastic, Bounce, Expo, Back, Sine  
✅ **GPU Accelerated** - Performa optimal dengan requestAnimationFrame  
✅ **Customizable** - Duration, colors, glow, scale  
✅ **React Support** - Hooks dan components siap pakai  
✅ **Dark Mode** - Support dark mode otomatis  
✅ **Responsive** - Mobile-friendly  
✅ **Accessibility** - Respect prefers-reduced-motion  

## 📖 Documentation

Lihat [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) untuk dokumentasi lengkap.

## 🎬 Demo

Buka `demo-smooth-animation.html` di browser untuk melihat demo interaktif.

## 💡 Examples

### Vanilla JavaScript

```javascript
// Simple animation
const animator = new SmoothPriceAnimator(element, {
  duration: 800,
  easing: 'easeInOutCubic',
  useGlow: true
});

animator.animateTo(5000000);
```

### React

```jsx
import { SmoothPrice } from './SmoothPriceAnimation';

<SmoothPrice 
  value={balance}
  prefix="Rp "
  duration={800}
  showDirection={true}
/>
```

### Card Animation

```javascript
const cardAnimator = new CardAnimator(cardElement);

if (priceUp) {
  cardAnimator.animateUp();
} else {
  cardAnimator.animateDown();
}
```

## 🎨 Easing Functions

- `easeInOutCubic` - Smooth dan natural (recommended)
- `easeOutElastic` - Elastic bounce effect
- `easeOutBounce` - Smooth bounce
- `easeOutExpo` - Exponential easing
- `easeOutBack` - Slight overshoot
- `easeInOutSine` - Very smooth sine

## ⚡ Performance

- ✅ Batch updates untuk multiple elements
- ✅ GPU acceleration dengan transform3d
- ✅ RequestAnimationFrame untuk smooth 60fps
- ✅ Automatic cleanup untuk prevent memory leaks

## 🔧 API Reference

### SmoothPriceAnimator

```javascript
new SmoothPriceAnimator(element, {
  duration: 800,           // Animation duration (ms)
  easing: 'easeInOutCubic', // Easing function
  decimals: 0,             // Decimal places
  prefix: 'Rp ',           // Prefix text
  suffix: '',              // Suffix text
  showDirection: true,     // Show arrow indicator
  useGlow: false          // Use glow effect
})
```

### SmoothPriceManager

```javascript
// Register
priceManager.register(elementId, options)

// Update single
priceManager.update(elementId, value)

// Batch update
priceManager.batchUpdate({
  'balance': 1000000,
  'deposit': 2000000
})

// Cleanup
priceManager.destroy()
```

### CardAnimator

```javascript
new CardAnimator(cardElement, {
  animationDuration: 1200,  // Duration (ms)
  scaleIntensity: 0.05,     // Scale amount
  glowIntensity: 20         // Glow size (px)
})

// Methods
cardAnimator.animateUp()
cardAnimator.animateDown()
cardAnimator.pulse()
```

## 🐛 Troubleshooting

**Animasi tidak muncul?**
- Pastikan CSS sudah di-include
- Check console untuk error
- Pastikan element ID benar

**Animasi tersendat?**
- Reduce duration (400-600ms)
- Gunakan easing 'easeInOutCubic'
- Batch updates untuk multiple elements

**Memory leak?**
- Call `priceManager.destroy()` saat cleanup
- Unregister unused elements

## 📝 License

MIT License - Free to use and modify

## 👨‍💻 Support

Untuk pertanyaan atau issue, silakan hubungi developer atau buat issue di repository.

---

**Made with ❤️ for Investra**
