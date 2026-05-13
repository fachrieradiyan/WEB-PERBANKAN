/**
 * Smooth Price Updater - Vanilla JavaScript
 * Sistem animasi harga yang lebih smooth untuk aplikasi Investra
 * 
 * Features:
 * - Smooth number transitions dengan easing
 * - GPU-accelerated animations
 * - Optimized performance dengan requestAnimationFrame
 * - Support untuk format Rupiah Indonesia
 */

// ===== EASING FUNCTIONS =====
const EasingFunctions = {
  // Smooth cubic easing (paling smooth dan natural)
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Elastic bounce (seperti pegas)
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  
  // Smooth bounce
  easeOutBounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  
  // Exponential easing
  easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  
  // Back easing (slight overshoot)
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  
  // Smooth sine
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2
};

// ===== SMOOTH PRICE ANIMATOR CLASS =====
class SmoothPriceAnimator {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: options.duration || 800,
      easing: options.easing || 'easeInOutCubic',
      decimals: options.decimals || 0,
      prefix: options.prefix || 'Rp ',
      suffix: options.suffix || '',
      showDirection: options.showDirection !== false,
      useGlow: options.useGlow || false,
      ...options
    };
    
    // Parse current value
    const currentText = element.textContent.replace(/[^0-9.-]/g, '');
    this.currentValue = parseFloat(currentText) || 0;
    this.targetValue = this.currentValue;
    this.previousValue = this.currentValue;
    this.animationFrame = null;
    this.direction = 'neutral';
  }

  /**
   * Animate to new value with smooth transition
   */
  animateTo(newValue) {
    if (newValue === this.currentValue) return;

    // Determine direction
    if (newValue > this.currentValue) {
      this.direction = 'up';
    } else if (newValue < this.currentValue) {
      this.direction = 'down';
    }

    this.targetValue = newValue;
    const startValue = this.currentValue;
    const startTime = performance.now();

    // Cancel previous animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Add animation class
    this.addAnimationClass();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);
      
      // Apply easing function
      const easingFunc = EasingFunctions[this.options.easing] || EasingFunctions.easeInOutCubic;
      const easedProgress = easingFunc(progress);
      
      // Calculate current value
      this.currentValue = startValue + (this.targetValue - startValue) * easedProgress;

      // Update display
      this.updateDisplay();

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.currentValue = this.targetValue;
        this.updateDisplay();
        this.removeAnimationClass();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  /**
   * Update element display
   */
  updateDisplay() {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: this.options.decimals,
      maximumFractionDigits: this.options.decimals
    }).format(this.currentValue);

    let displayText = this.options.prefix + formatted + this.options.suffix;

    // Add direction indicator if enabled
    if (this.options.showDirection && this.direction !== 'neutral') {
      const arrow = this.direction === 'up' ? '↑' : '↓';
      displayText += ` <span class="direction-indicator ${this.direction}">${arrow}</span>`;
    }

    this.element.innerHTML = displayText;
  }

  /**
   * Add animation CSS class
   */
  addAnimationClass() {
    this.element.classList.remove('price-animate-up', 'price-animate-down');
    
    if (this.direction === 'up') {
      this.element.classList.add('price-animate-up');
      if (this.options.useGlow) {
        this.element.classList.add('with-glow');
      }
    } else if (this.direction === 'down') {
      this.element.classList.add('price-animate-down');
      if (this.options.useGlow) {
        this.element.classList.add('with-glow');
      }
    }
  }

  /**
   * Remove animation CSS class
   */
  removeAnimationClass() {
    setTimeout(() => {
      this.element.classList.remove('price-animate-up', 'price-animate-down', 'with-glow');
      this.direction = 'neutral';
    }, this.options.duration + 200);
  }

  /**
   * Destroy animator and cleanup
   */
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.element.classList.remove('price-animate-up', 'price-animate-down', 'with-glow');
  }
}

// ===== SMOOTH PRICE MANAGER =====
class SmoothPriceManager {
  constructor() {
    this.animators = new Map();
  }

  /**
   * Register element for smooth price updates
   */
  register(elementId, options = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return null;
    }

    const animator = new SmoothPriceAnimator(element, options);
    this.animators.set(elementId, animator);
    return animator;
  }

  /**
   * Update price for registered element
   */
  update(elementId, newValue) {
    const animator = this.animators.get(elementId);
    if (animator) {
      animator.animateTo(newValue);
    } else {
      console.warn(`No animator registered for "${elementId}"`);
    }
  }

  /**
   * Batch update multiple prices
   */
  batchUpdate(updates) {
    Object.entries(updates).forEach(([elementId, value]) => {
      this.update(elementId, value);
    });
  }

  /**
   * Unregister element
   */
  unregister(elementId) {
    const animator = this.animators.get(elementId);
    if (animator) {
      animator.destroy();
      this.animators.delete(elementId);
    }
  }

  /**
   * Cleanup all animators
   */
  destroy() {
    this.animators.forEach(animator => animator.destroy());
    this.animators.clear();
  }
}

// ===== ENHANCED STOCK/CRYPTO CARD ANIMATOR =====
class CardAnimator {
  constructor(cardElement, options = {}) {
    this.card = cardElement;
    this.options = {
      animationDuration: options.animationDuration || 1200,
      scaleIntensity: options.scaleIntensity || 0.05,
      glowIntensity: options.glowIntensity || 20,
      ...options
    };
  }

  /**
   * Animate card when price goes up
   */
  animateUp() {
    this.card.style.transition = `all ${this.options.animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
    
    // Add glow effect
    this.card.style.boxShadow = `0 0 ${this.options.glowIntensity}px rgba(16, 185, 129, 0.6)`;
    
    // Scale up slightly
    this.card.style.transform = `scale(${1 + this.options.scaleIntensity})`;
    
    // Add background flash
    const originalBg = this.card.style.backgroundColor;
    this.card.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
    
    // Reset after animation
    setTimeout(() => {
      this.card.style.transform = 'scale(1)';
      this.card.style.boxShadow = '';
      this.card.style.backgroundColor = originalBg;
    }, this.options.animationDuration);
  }

  /**
   * Animate card when price goes down
   */
  animateDown() {
    this.card.style.transition = `all ${this.options.animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
    
    // Add glow effect
    this.card.style.boxShadow = `0 0 ${this.options.glowIntensity}px rgba(239, 68, 68, 0.6)`;
    
    // Scale down slightly
    this.card.style.transform = `scale(${1 - this.options.scaleIntensity})`;
    
    // Add background flash
    const originalBg = this.card.style.backgroundColor;
    this.card.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
    
    // Reset after animation
    setTimeout(() => {
      this.card.style.transform = 'scale(1)';
      this.card.style.boxShadow = '';
      this.card.style.backgroundColor = originalBg;
    }, this.options.animationDuration);
  }

  /**
   * Pulse animation for live updates
   */
  pulse() {
    this.card.style.animation = 'smoothPulse 0.6s ease-in-out';
    setTimeout(() => {
      this.card.style.animation = '';
    }, 600);
  }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Format number to Indonesian Rupiah
 */
function formatRupiah(number, decimals = 0) {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
}

/**
 * Animate number change in element
 */
function animateNumber(element, targetValue, options = {}) {
  const animator = new SmoothPriceAnimator(element, options);
  animator.animateTo(targetValue);
  return animator;
}

/**
 * Create smooth counter animation
 */
function createSmoothCounter(elementId, startValue, endValue, duration = 1000) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const startTime = performance.now();
  const diff = endValue - startValue;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = EasingFunctions.easeOutExpo(progress);
    const currentValue = startValue + (diff * easedProgress);
    
    element.textContent = formatRupiah(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===== EXPORT =====
// Make available globally
window.SmoothPriceAnimator = SmoothPriceAnimator;
window.SmoothPriceManager = SmoothPriceManager;
window.CardAnimator = CardAnimator;
window.EasingFunctions = EasingFunctions;
window.animateNumber = animateNumber;
window.createSmoothCounter = createSmoothCounter;
window.formatRupiah = formatRupiah;

// Create global instance
window.priceManager = new SmoothPriceManager();

console.log('✅ Smooth Price Updater loaded successfully!');
