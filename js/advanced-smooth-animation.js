/**
 * Advanced Smooth Animation System
 * Sistem animasi yang lebih smooth dengan berbagai teknik advanced
 * Compatible dengan Vanilla JS, React, dan Next.js
 * 
 * Features:
 * - Spring physics untuk animasi natural
 * - Momentum-based animation
 * - Interpolasi yang lebih halus
 * - GPU acceleration
 * - Adaptive frame rate
 */

// ===== SPRING PHYSICS ENGINE =====
class SpringPhysics {
  constructor(options = {}) {
    this.stiffness = options.stiffness || 170; // Kekakuan pegas
    this.damping = options.damping || 26; // Redaman
    this.mass = options.mass || 1; // Massa
    this.velocity = 0;
    this.position = 0;
    this.target = 0;
  }

  update(deltaTime) {
    // Spring force: F = -k * x
    const springForce = -this.stiffness * (this.position - this.target);
    
    // Damping force: F = -c * v
    const dampingForce = -this.damping * this.velocity;
    
    // Total force
    const force = springForce + dampingForce;
    
    // Acceleration: a = F / m
    const acceleration = force / this.mass;
    
    // Update velocity and position
    this.velocity += acceleration * deltaTime;
    this.position += this.velocity * deltaTime;
    
    // Check if settled
    const isSettled = Math.abs(this.velocity) < 0.01 && 
                     Math.abs(this.position - this.target) < 0.01;
    
    return isSettled;
  }

  setTarget(target) {
    this.target = target;
  }

  reset(position) {
    this.position = position;
    this.velocity = 0;
  }
}

// ===== ADVANCED EASING FUNCTIONS =====
const AdvancedEasing = {
  // Smooth cubic bezier
  smoothCubic: (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },

  // Anticipate (mundur sedikit sebelum maju)
  anticipate: (t) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },

  // Overshoot (melewati target sedikit)
  overshoot: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  // Smooth step (sangat halus)
  smoothStep: (t) => {
    return t * t * (3 - 2 * t);
  },

  // Smoother step (lebih halus lagi)
  smootherStep: (t) => {
    return t * t * t * (t * (t * 6 - 15) + 10);
  },

  // Circular easing
  circularInOut: (t) => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
  },

  // Exponential smooth
  exponentialSmooth: (t) => {
    return t === 0 ? 0 : t === 1 ? 1 : 
           t < 0.5 
             ? Math.pow(2, 20 * t - 10) / 2
             : (2 - Math.pow(2, -20 * t + 10)) / 2;
  }
};

// ===== ADVANCED SMOOTH PRICE ANIMATOR =====
class AdvancedSmoothAnimator {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: options.duration || 1000,
      easing: options.easing || 'smoothCubic',
      useSpring: options.useSpring !== false, // Default true
      springConfig: options.springConfig || {
        stiffness: 170,
        damping: 26,
        mass: 1
      },
      decimals: options.decimals || 0,
      prefix: options.prefix || 'Rp ',
      suffix: options.suffix || '',
      showDirection: options.showDirection !== false,
      useGlow: options.useGlow !== false,
      useMomentum: options.useMomentum !== false,
      glowColor: options.glowColor || { up: '#10b981', down: '#ef4444' },
      ...options
    };

    // Parse current value
    const currentText = element.textContent.replace(/[^0-9.-]/g, '');
    this.currentValue = parseFloat(currentText) || 0;
    this.displayValue = this.currentValue;
    this.targetValue = this.currentValue;
    this.previousValue = this.currentValue;
    
    // Animation state
    this.animationFrame = null;
    this.direction = 'neutral';
    this.isAnimating = false;
    
    // Spring physics
    if (this.options.useSpring) {
      this.spring = new SpringPhysics(this.options.springConfig);
      this.spring.reset(this.currentValue);
    }

    // Momentum tracking
    this.velocityHistory = [];
    this.lastUpdateTime = performance.now();
  }

  /**
   * Animate to new value dengan spring physics atau easing
   */
  animateTo(newValue, options = {}) {
    if (newValue === this.targetValue && !this.isAnimating) return;

    // Determine direction
    if (newValue > this.currentValue) {
      this.direction = 'up';
    } else if (newValue < this.currentValue) {
      this.direction = 'down';
    }

    this.targetValue = newValue;
    this.previousValue = this.currentValue;

    // Cancel previous animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Add animation class
    this.addAnimationClass();

    if (this.options.useSpring) {
      this.animateWithSpring();
    } else {
      this.animateWithEasing();
    }
  }

  /**
   * Animate using spring physics (lebih natural)
   */
  animateWithSpring() {
    this.spring.setTarget(this.targetValue);
    this.isAnimating = true;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016); // Cap at 60fps
      lastTime = currentTime;

      // Update spring
      const isSettled = this.spring.update(deltaTime);
      this.currentValue = this.spring.position;

      // Track velocity for momentum
      if (this.options.useMomentum) {
        this.trackVelocity(this.spring.velocity);
      }

      // Update display
      this.updateDisplay();

      if (!isSettled) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.currentValue = this.targetValue;
        this.updateDisplay();
        this.removeAnimationClass();
        this.isAnimating = false;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  /**
   * Animate using easing function (lebih controlled)
   */
  animateWithEasing() {
    const startValue = this.currentValue;
    const startTime = performance.now();
    this.isAnimating = true;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);
      
      // Apply easing function
      const easingFunc = AdvancedEasing[this.options.easing] || AdvancedEasing.smoothCubic;
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
        this.isAnimating = false;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  /**
   * Track velocity for momentum effects
   */
  trackVelocity(velocity) {
    const now = performance.now();
    this.velocityHistory.push({ velocity, time: now });

    // Keep only recent history (last 100ms)
    this.velocityHistory = this.velocityHistory.filter(
      v => now - v.time < 100
    );
  }

  /**
   * Get average velocity (for momentum effects)
   */
  getAverageVelocity() {
    if (this.velocityHistory.length === 0) return 0;
    
    const sum = this.velocityHistory.reduce((acc, v) => acc + v.velocity, 0);
    return sum / this.velocityHistory.length;
  }

  /**
   * Update element display dengan format yang lebih baik
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
      const color = this.direction === 'up' ? '#10b981' : '#ef4444';
      displayText += ` <span class="direction-indicator ${this.direction}" style="color: ${color}; font-weight: bold;">${arrow}</span>`;
    }

    this.element.innerHTML = displayText;
  }

  /**
   * Add animation CSS class dengan glow effect
   */
  addAnimationClass() {
    this.element.classList.remove('price-animate-up', 'price-animate-down');
    
    if (this.direction === 'up') {
      this.element.classList.add('price-animate-up');
      if (this.options.useGlow) {
        this.applyGlow(this.options.glowColor.up);
      }
    } else if (this.direction === 'down') {
      this.element.classList.add('price-animate-down');
      if (this.options.useGlow) {
        this.applyGlow(this.options.glowColor.down);
      }
    }
  }

  /**
   * Apply glow effect
   */
  applyGlow(color) {
    this.element.style.transition = 'all 0.3s ease';
    this.element.style.textShadow = `0 0 20px ${color}, 0 0 30px ${color}`;
    this.element.style.transform = 'scale(1.05)';
  }

  /**
   * Remove animation CSS class
   */
  removeAnimationClass() {
    setTimeout(() => {
      this.element.classList.remove('price-animate-up', 'price-animate-down');
      this.element.style.textShadow = '';
      this.element.style.transform = '';
      this.direction = 'neutral';
    }, 300);
  }

  /**
   * Update spring configuration
   */
  updateSpringConfig(config) {
    if (this.spring) {
      Object.assign(this.spring, config);
    }
  }

  /**
   * Destroy animator and cleanup
   */
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.element.classList.remove('price-animate-up', 'price-animate-down');
    this.element.style.textShadow = '';
    this.element.style.transform = '';
  }
}

// ===== ADVANCED CARD ANIMATOR =====
class AdvancedCardAnimator {
  constructor(cardElement, options = {}) {
    this.card = cardElement;
    this.options = {
      animationDuration: options.animationDuration || 1200,
      scaleIntensity: options.scaleIntensity || 0.08,
      glowIntensity: options.glowIntensity || 25,
      rotateIntensity: options.rotateIntensity || 2,
      useParallax: options.useParallax !== false,
      use3D: options.use3D !== false,
      ...options
    };

    // Setup 3D transform
    if (this.options.use3D) {
      this.card.style.transformStyle = 'preserve-3d';
      this.card.style.perspective = '1000px';
    }

    // Parallax effect
    if (this.options.useParallax) {
      this.setupParallax();
    }
  }

  /**
   * Setup parallax effect on hover
   */
  setupParallax() {
    this.card.addEventListener('mousemove', (e) => {
      const rect = this.card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * 10;
      const rotateY = (centerX - x) / centerX * 10;
      
      this.card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    });

    this.card.addEventListener('mouseleave', () => {
      this.card.style.transform = '';
    });
  }

  /**
   * Animate card when price goes up (lebih smooth)
   */
  animateUp() {
    const duration = this.options.animationDuration;
    
    // Keyframe animation
    this.card.animate([
      { 
        transform: 'scale(1) translateY(0) rotateZ(0deg)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      { 
        transform: `scale(${1 + this.options.scaleIntensity}) translateY(-5px) rotateZ(${this.options.rotateIntensity}deg)`,
        boxShadow: `0 0 ${this.options.glowIntensity}px rgba(16, 185, 129, 0.8), 0 10px 30px rgba(16, 185, 129, 0.3)`,
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        offset: 0.3
      },
      { 
        transform: `scale(${1 + this.options.scaleIntensity * 0.5}) translateY(-2px) rotateZ(${this.options.rotateIntensity * 0.5}deg)`,
        boxShadow: `0 0 ${this.options.glowIntensity * 0.5}px rgba(16, 185, 129, 0.5)`,
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        offset: 0.7
      },
      { 
        transform: 'scale(1) translateY(0) rotateZ(0deg)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards'
    });
  }

  /**
   * Animate card when price goes down (lebih smooth)
   */
  animateDown() {
    const duration = this.options.animationDuration;
    
    // Keyframe animation
    this.card.animate([
      { 
        transform: 'scale(1) translateY(0) rotateZ(0deg)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      { 
        transform: `scale(${1 - this.options.scaleIntensity * 0.5}) translateY(3px) rotateZ(-${this.options.rotateIntensity}deg)`,
        boxShadow: `0 0 ${this.options.glowIntensity}px rgba(239, 68, 68, 0.8), 0 10px 30px rgba(239, 68, 68, 0.3)`,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        offset: 0.3
      },
      { 
        transform: `scale(${1 - this.options.scaleIntensity * 0.25}) translateY(1px) rotateZ(-${this.options.rotateIntensity * 0.5}deg)`,
        boxShadow: `0 0 ${this.options.glowIntensity * 0.5}px rgba(239, 68, 68, 0.5)`,
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        offset: 0.7
      },
      { 
        transform: 'scale(1) translateY(0) rotateZ(0deg)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards'
    });
  }

  /**
   * Pulse animation for live updates
   */
  pulse(color = '#667eea') {
    this.card.animate([
      { 
        transform: 'scale(1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      { 
        transform: 'scale(1.03)',
        boxShadow: `0 0 20px ${color}40`
      },
      { 
        transform: 'scale(1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    ], {
      duration: 600,
      easing: 'ease-in-out'
    });
  }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
  }

  update() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    return this.fps;
  }

  getFPS() {
    return this.fps;
  }
}

// ===== EXPORT =====
window.AdvancedSmoothAnimator = AdvancedSmoothAnimator;
window.AdvancedCardAnimator = AdvancedCardAnimator;
window.SpringPhysics = SpringPhysics;
window.AdvancedEasing = AdvancedEasing;
window.PerformanceMonitor = PerformanceMonitor;

console.log('✅ Advanced Smooth Animation System loaded!');
