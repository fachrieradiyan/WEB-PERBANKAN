# 🚀 Smooth Animation Cheat Sheet

Quick reference untuk implementasi smooth animations.

## 📦 Setup (2 Langkah)

```html
<!-- 1. CSS -->
<link rel="stylesheet" href="js/smooth-animations.css">

<!-- 2. JavaScript -->
<script src="js/smooth-price-updater.js"></script>
```

## 💻 Vanilla JavaScript

### Basic Usage
```javascript
// Register
priceManager.register('balance', {
  duration: 800,
  easing: 'easeInOutCubic',
  prefix: 'Rp '
});

// Update
priceManager.update('balance', 1000000);
```

### Batch Update
```javascript
priceManager.batchUpdate({
  'balance': 1000000,
  'deposit': 2000000,
  'withdraw': 500000
});
```

### Standalone Animator
```javascript
const animator = new SmoothPriceAnimator(element, {
  duration: 800,
  easing: 'easeInOutCubic',
  useGlow: true
});

animator.animateTo(5000000);
```

### Card Animation
```javascript
const cardAnimator = new CardAnimator(cardElement);

// Harga naik
cardAnimator.animateUp();

// Harga turun
cardAnimator.animateDown();

// Pulse
cardAnimator.pulse();
```

## ⚛️ React

### Import
```jsx
import { 
  SmoothPrice, 
  AnimatedPriceCard,
  useCountAnimation 
} from './SmoothPriceAnimation';
```

### SmoothPrice Component
```jsx
<SmoothPrice 
  value={balance}
  prefix="Rp "
  decimals={0}
  duration={800}
  easing="easeInOutCubic"
  showDirection={true}
/>
```

### useCountAnimation Hook
```jsx
const animatedValue = useCountAnimation(
  targetValue,
  800,  // duration
  'easeInOutCubic'  // easing
);

return <div>Rp {animatedValue.toLocaleString('id-ID')}</div>;
```

### AnimatedPriceCard
```jsx
<AnimatedPriceCard
  id="BBCA"
  name="Bank Central Asia"
  price={9500}
  changePercent={2.5}
  owned={100}
  onBuy={(id) => handleBuy(id)}
  onSell={(id) => handleSell(id)}
  icon="🏦"
  sector="Perbankan"
/>
```

## 🎨 Easing Functions

```javascript
'easeInOutCubic'   // Smooth & natural ⭐
'easeOutElastic'   // Bouncy & playful
'easeOutBounce'    // Smooth bounce
'easeOutExpo'      // Fast & snappy
'easeOutBack'      // Slight overshoot
'easeInOutSine'    // Very smooth
```

## ⚙️ Options

### SmoothPriceAnimator Options
```javascript
{
  duration: 800,           // Animation duration (ms)
  easing: 'easeInOutCubic', // Easing function
  decimals: 0,             // Decimal places
  prefix: 'Rp ',           // Prefix text
  suffix: '',              // Suffix text
  showDirection: true,     // Show ↑↓ arrows
  useGlow: false          // Glow effect
}
```

### CardAnimator Options
```javascript
{
  animationDuration: 1200,  // Duration (ms)
  scaleIntensity: 0.05,     // Scale amount (0-1)
  glowIntensity: 20         // Glow size (px)
}
```

## 🎯 Common Patterns

### Balance Display
```javascript
priceManager.register('balance', {
  duration: 800,
  easing: 'easeInOutCubic',
  prefix: 'Rp ',
  decimals: 0
});
```

### Stock Price
```javascript
const animator = new SmoothPriceAnimator(element, {
  duration: 800,
  easing: 'easeInOutCubic',
  useGlow: true,
  showDirection: false
});
```

### Crypto Price
```javascript
const animator = new SmoothPriceAnimator(element, {
  duration: 600,
  easing: 'easeOutBack',
  decimals: 8,
  useGlow: true
});
```

### Percentage
```javascript
const animator = new SmoothPriceAnimator(element, {
  duration: 400,
  easing: 'easeInOutCubic',
  prefix: '',
  suffix: '%',
  decimals: 2
});
```

## 🔄 Update Patterns

### Single Update
```javascript
priceManager.update('balance', 1000000);
```

### Multiple Updates
```javascript
priceManager.batchUpdate({
  'balance': 1000000,
  'deposit': 2000000
});
```

### Conditional Update
```javascript
if (priceChanged) {
  animator.animateTo(newPrice);
  
  if (priceUp) {
    cardAnimator.animateUp();
  } else {
    cardAnimator.animateDown();
  }
}
```

## 🧹 Cleanup

### Unregister Single
```javascript
priceManager.unregister('balance');
```

### Destroy All
```javascript
priceManager.destroy();
```

### Destroy Animator
```javascript
animator.destroy();
```

## 🎨 CSS Classes

### Animation Classes
```css
.price-animate-up      /* Harga naik */
.price-animate-down    /* Harga turun */
.smooth-price          /* Base class */
.with-glow            /* Glow effect */
```

### Card Classes
```css
.animated-price-card   /* Card container */
.card-hover           /* Hover effect */
.direction-indicator  /* Arrow indicator */
```

## 🎬 Quick Examples

### Example 1: Simple Counter
```javascript
let count = 0;
priceManager.register('counter', {
  duration: 600,
  prefix: '',
  decimals: 0
});

function increment() {
  count += 100;
  priceManager.update('counter', count);
}
```

### Example 2: Stock Price Update
```javascript
const priceElement = document.getElementById('stock-price');
const animator = new SmoothPriceAnimator(priceElement, {
  duration: 800,
  easing: 'easeInOutCubic',
  useGlow: true
});

setInterval(() => {
  const newPrice = Math.random() * 10000;
  animator.animateTo(newPrice);
}, 2000);
```

### Example 3: React Balance
```jsx
function Balance() {
  const [balance, setBalance] = useState(1000000);
  
  return (
    <div>
      <SmoothPrice value={balance} prefix="Rp " />
      <button onClick={() => setBalance(b => b + 100000)}>
        +100k
      </button>
    </div>
  );
}
```

## 🐛 Troubleshooting

### Not Working?
```javascript
// Check if loaded
console.log(window.priceManager);
console.log(window.SmoothPriceAnimator);
```

### Laggy?
```javascript
// Reduce duration
duration: 400

// Simpler easing
easing: 'easeInOutCubic'
```

### Memory Leak?
```javascript
// Always cleanup
priceManager.destroy();
```

## 📊 Performance Tips

### ✅ DO
```javascript
// Batch updates
priceManager.batchUpdate({ ... });

// Cleanup on unmount
priceManager.destroy();

// Use simple easing
easing: 'easeInOutCubic'
```

### ❌ DON'T
```javascript
// Multiple single updates
priceManager.update('a', 1);
priceManager.update('b', 2);
priceManager.update('c', 3);

// Forget cleanup
// No destroy() call

// Complex easing everywhere
easing: 'easeOutElastic'
```

## 🎯 Duration Guide

```javascript
400ms  // Fast & snappy
600ms  // Quick & smooth
800ms  // Normal (recommended)
1000ms // Slow & dramatic
1200ms // Very slow
```

## 🌈 Color Customization

### CSS Variables
```css
:root {
  --price-up-color: #10B981;
  --price-down-color: #EF4444;
  --glow-up-color: rgba(16, 185, 129, 0.6);
  --glow-down-color: rgba(239, 68, 68, 0.6);
}
```

## 📱 Responsive

### Mobile Optimization
```javascript
const isMobile = window.innerWidth < 768;

priceManager.register('balance', {
  duration: isMobile ? 400 : 800,
  easing: 'easeInOutCubic'
});
```

## 🔗 Quick Links

| Link | Description |
|------|-------------|
| `demo-smooth-animation.html` | Interactive demo |
| `js/IMPLEMENTATION_GUIDE.md` | Full docs |
| `UPGRADE_GUIDE.md` | Upgrade guide |
| `js/README.md` | Quick reference |

## 💡 Pro Tips

1. **Use batch updates** untuk multiple elements
2. **Cleanup** saat component unmount
3. **Test di mobile** untuk performance
4. **Use easeInOutCubic** untuk most cases
5. **Reduce duration** jika laggy

## 🎓 Learning Order

1. ✅ Buka `demo-smooth-animation.html`
2. ✅ Copy basic example
3. ✅ Experiment dengan options
4. ✅ Read `IMPLEMENTATION_GUIDE.md`
5. ✅ Implement di project

---

**Quick Start:**
```bash
1. Include CSS & JS
2. Register elements
3. Update values
4. Done! 🎉
```

**Need Help?**  
👉 Read `js/IMPLEMENTATION_GUIDE.md`  
👉 Check `demo-smooth-animation.html`  
👉 See `js/NextJsExample.tsx`

---

**Made with ❤️ for Investra**
