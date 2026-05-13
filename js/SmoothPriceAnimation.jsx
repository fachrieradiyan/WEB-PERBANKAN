/**
 * Smooth Price Animation Component
 * Compatible with React, Next.js, and Vanilla JavaScript
 * 
 * Features:
 * - Smooth spring-based animations
 * - Customizable easing functions
 * - Support for multiple animation types
 * - Performance optimized with requestAnimationFrame
 */

import React, { useState, useEffect, useRef } from 'react';

// Easing functions untuk animasi yang lebih smooth
const easingFunctions = {
  // Smooth ease-in-out (paling smooth)
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Spring effect (bouncy)
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
  
  // Smooth exponential
  easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  
  // Smooth back (slight overshoot)
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }
};

/**
 * Hook untuk animasi angka yang smooth
 */
export const useCountAnimation = (targetValue, duration = 800, easing = 'easeInOutCubic') => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef(null);
  const startValueRef = useRef(targetValue);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (targetValue === displayValue) return;

    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing function
      const easedProgress = easingFunctions[easing](progress);
      
      const currentValue = startValueRef.current + 
        (targetValue - startValueRef.current) * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, easing]);

  return displayValue;
};

/**
 * Component untuk menampilkan harga dengan animasi smooth
 */
export const SmoothPrice = ({ 
  value, 
  prefix = 'Rp ', 
  decimals = 0,
  duration = 800,
  easing = 'easeInOutCubic',
  showDirection = true,
  className = ''
}) => {
  const [previousValue, setPreviousValue] = useState(value);
  const [direction, setDirection] = useState('neutral');
  const animatedValue = useCountAnimation(value, duration, easing);

  useEffect(() => {
    if (value > previousValue) {
      setDirection('up');
    } else if (value < previousValue) {
      setDirection('down');
    }
    setPreviousValue(value);

    // Reset direction after animation
    const timer = setTimeout(() => setDirection('neutral'), duration + 200);
    return () => clearTimeout(timer);
  }, [value, previousValue, duration]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const directionClass = direction === 'up' ? 'price-animate-up' : 
                        direction === 'down' ? 'price-animate-down' : '';

  return (
    <span className={`smooth-price ${directionClass} ${className}`}>
      {prefix}{formatNumber(animatedValue)}
      {showDirection && direction !== 'neutral' && (
        <span className={`direction-indicator ${direction}`}>
          {direction === 'up' ? '↑' : '↓'}
        </span>
      )}
    </span>
  );
};

/**
 * Component untuk card saham/crypto dengan animasi smooth
 */
export const AnimatedPriceCard = ({ 
  id,
  name, 
  price, 
  changePercent,
  owned = 0,
  onBuy,
  onSell,
  icon,
  sector
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const animatedPrice = useCountAnimation(price, 600, 'easeOutBack');
  const animatedChange = useCountAnimation(changePercent, 400, 'easeInOutCubic');

  const isPositive = changePercent >= 0;

  return (
    <div 
      className={`animated-price-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <div className="card-info">
          <h3 className="card-id">{id}</h3>
          <p className="card-name">{name}</p>
          {sector && <span className="card-sector">{sector}</span>}
        </div>
      </div>

      <div className="card-price">
        <SmoothPrice 
          value={price} 
          decimals={price < 1 ? 8 : 0}
          duration={600}
          easing="easeOutBack"
        />
      </div>

      <div className={`card-change ${isPositive ? 'positive' : 'negative'}`}>
        <span className="change-icon">{isPositive ? '▲' : '▼'}</span>
        <SmoothPrice 
          value={Math.abs(animatedChange)} 
          prefix=""
          suffix="%"
          decimals={2}
          duration={400}
          showDirection={false}
        />
      </div>

      {owned > 0 && (
        <div className="card-owned">
          Dimiliki: <SmoothPrice value={owned} prefix="" decimals={2} />
        </div>
      )}

      <div className="card-actions">
        <button 
          className="btn-buy"
          onClick={() => onBuy(id)}
        >
          Beli
        </button>
        {owned > 0 && (
          <button 
            className="btn-sell"
            onClick={() => onSell(id)}
          >
            Jual
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Vanilla JavaScript version (tanpa React)
 */
export class VanillaSmoothPrice {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: options.duration || 800,
      easing: options.easing || 'easeInOutCubic',
      decimals: options.decimals || 0,
      prefix: options.prefix || 'Rp ',
      ...options
    };
    
    this.currentValue = parseFloat(element.textContent.replace(/[^0-9.-]/g, '')) || 0;
    this.targetValue = this.currentValue;
    this.animationFrame = null;
  }

  animateTo(newValue) {
    this.targetValue = newValue;
    const startValue = this.currentValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);
      
      const easedProgress = easingFunctions[this.options.easing](progress);
      
      this.currentValue = startValue + (this.targetValue - startValue) * easedProgress;

      this.updateDisplay();

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(animate);
  }

  updateDisplay() {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: this.options.decimals,
      maximumFractionDigits: this.options.decimals
    }).format(this.currentValue);

    this.element.textContent = this.options.prefix + formatted;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

export default {
  useCountAnimation,
  SmoothPrice,
  AnimatedPriceCard,
  VanillaSmoothPrice,
  easingFunctions
};
