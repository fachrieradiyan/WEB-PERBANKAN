/**
 * React Advanced Animation Components
 * Komponen React dengan animasi yang lebih smooth menggunakan spring physics
 * Compatible dengan React 18+ dan Next.js 13+
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ===== SPRING PHYSICS HOOK =====
export const useSpring = (targetValue, config = {}) => {
  const {
    stiffness = 170,
    damping = 26,
    mass = 1,
    precision = 0.01
  } = config;

  const [value, setValue] = useState(targetValue);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let currentValue = value;
    let currentVelocity = velocity;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016);
      lastTime = currentTime;

      // Spring physics
      const springForce = -stiffness * (currentValue - targetValue);
      const dampingForce = -damping * currentVelocity;
      const force = springForce + dampingForce;
      const acceleration = force / mass;

      currentVelocity += acceleration * deltaTime;
      currentValue += currentVelocity * deltaTime;

      setValue(currentValue);
      setVelocity(currentVelocity);

      // Check if settled
      const isSettled = 
        Math.abs(currentVelocity) < precision && 
        Math.abs(currentValue - targetValue) < precision;

      if (!isSettled) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setValue(targetValue);
        setVelocity(0);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, stiffness, damping, mass, precision]);

  return value;
};

// ===== ADVANCED SMOOTH PRICE COMPONENT =====
export const AdvancedSmoothPrice = ({ 
  value, 
  prefix = 'Rp ', 
  suffix = '',
  decimals = 0,
  springConfig = {},
  showDirection = true,
  useGlow = true,
  className = '',
  style = {}
}) => {
  const [previousValue, setPreviousValue] = useState(value);
  const [direction, setDirection] = useState('neutral');
  const animatedValue = useSpring(value, springConfig);
  const elementRef = useRef(null);

  useEffect(() => {
    if (value > previousValue) {
      setDirection('up');
    } else if (value < previousValue) {
      setDirection('down');
    }
    setPreviousValue(value);

    // Reset direction after animation
    const timer = setTimeout(() => setDirection('neutral'), 1200);
    return () => clearTimeout(timer);
  }, [value, previousValue]);

  // Apply glow effect
  useEffect(() => {
    if (!useGlow || !elementRef.current || direction === 'neutral') return;

    const color = direction === 'up' ? '#10b981' : '#ef4444';
    const element = elementRef.current;

    element.style.textShadow = `0 0 20px ${color}, 0 0 30px ${color}`;
    element.style.transform = 'scale(1.05)';
    element.style.transition = 'all 0.3s ease';

    const timer = setTimeout(() => {
      element.style.textShadow = '';
      element.style.transform = '';
    }, 300);

    return () => clearTimeout(timer);
  }, [direction, useGlow]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const directionClass = direction === 'up' ? 'price-animate-up' : 
                        direction === 'down' ? 'price-animate-down' : '';

  const directionColor = direction === 'up' ? '#10b981' : '#ef4444';

  return (
    <span 
      ref={elementRef}
      className={`smooth-price ${directionClass} ${className}`}
      style={style}
    >
      {prefix}{formatNumber(animatedValue)}{suffix}
      {showDirection && direction !== 'neutral' && (
        <span 
          className={`direction-indicator ${direction}`}
          style={{ 
            color: directionColor, 
            fontWeight: 'bold',
            marginLeft: '0.5rem'
          }}
        >
          {direction === 'up' ? '↑' : '↓'}
        </span>
      )}
    </span>
  );
};

// ===== ANIMATED CARD WITH SPRING PHYSICS =====
export const SpringAnimatedCard = ({ 
  children, 
  isUp = false,
  isDown = false,
  className = '',
  style = {},
  animationConfig = {}
}) => {
  const {
    scaleIntensity = 0.08,
    glowIntensity = 25,
    rotateIntensity = 2,
    duration = 1200
  } = animationConfig;

  const cardRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!cardRef.current || (!isUp && !isDown)) return;

    setIsAnimating(true);
    const card = cardRef.current;
    const direction = isUp ? 'up' : 'down';
    const color = isUp ? 'rgba(16, 185, 129' : 'rgba(239, 68, 68';
    const scale = isUp ? 1 + scaleIntensity : 1 - scaleIntensity * 0.5;
    const translateY = isUp ? -5 : 3;
    const rotate = isUp ? rotateIntensity : -rotateIntensity;

    // Keyframe animation
    const animation = card.animate([
      { 
        transform: 'scale(1) translateY(0) rotateZ(0deg)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      { 
        transform: `scale(${scale}) translateY(${translateY}px) rotateZ(${rotate}deg)`,
        boxShadow: `0 0 ${glowIntensity}px ${color}, 0.8), 0 10px 30px ${color}, 0.3)`,
        backgroundColor: `${color}, 0.15)`,
        offset: 0.3
      },
      { 
        transform: `scale(${1 + (scale - 1) * 0.5}) translateY(${translateY * 0.4}px) rotateZ(${rotate * 0.5}deg)`,
        boxShadow: `0 0 ${glowIntensity * 0.5}px ${color}, 0.5)`,
        backgroundColor: `${color}, 0.08)`,
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

    animation.onfinish = () => setIsAnimating(false);

    return () => animation.cancel();
  }, [isUp, isDown, scaleIntensity, glowIntensity, rotateIntensity, duration]);

  return (
    <div 
      ref={cardRef}
      className={`spring-animated-card ${className}`}
      style={{
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// ===== STOCK CARD WITH ADVANCED ANIMATION =====
export const AdvancedStockCard = ({ 
  id,
  name, 
  price, 
  changePercent,
  owned = 0,
  onBuy,
  onSell,
  icon = '📈',
  sector = '',
  springConfig = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lastPrice, setLastPrice] = useState(price);
  const [priceDirection, setPriceDirection] = useState('neutral');

  useEffect(() => {
    if (price > lastPrice) {
      setPriceDirection('up');
    } else if (price < lastPrice) {
      setPriceDirection('down');
    }
    setLastPrice(price);

    const timer = setTimeout(() => setPriceDirection('neutral'), 1200);
    return () => clearTimeout(timer);
  }, [price, lastPrice]);

  const isPositive = changePercent >= 0;

  return (
    <SpringAnimatedCard
      isUp={priceDirection === 'up'}
      isDown={priceDirection === 'down'}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 cursor-pointer"
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(0, 0, 0, 0.15)' 
          : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{id}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
          {sector && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded mt-1 inline-block">
              {sector}
            </span>
          )}
        </div>
      </div>

      <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        <AdvancedSmoothPrice 
          value={price}
          prefix="Rp "
          decimals={price < 1 ? 8 : 0}
          springConfig={{
            stiffness: 170,
            damping: 26,
            mass: 1,
            ...springConfig
          }}
          showDirection={true}
          useGlow={true}
        />
      </div>

      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
        isPositive 
          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
          : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
      }`}>
        <span>{isPositive ? '▲' : '▼'}</span>
        <AdvancedSmoothPrice 
          value={Math.abs(changePercent)}
          prefix=""
          suffix="%"
          decimals={2}
          springConfig={{ stiffness: 200, damping: 30 }}
          showDirection={false}
          useGlow={false}
        />
      </div>

      {owned > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Kepemilikan</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            <AdvancedSmoothPrice 
              value={owned}
              prefix=""
              suffix=" lot"
              decimals={2}
              showDirection={false}
              useGlow={false}
            />
          </p>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => onBuy?.(id)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
        >
          Beli
        </button>
        {owned > 0 && (
          <button 
            onClick={() => onSell?.(id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Jual
          </button>
        )}
      </div>
    </SpringAnimatedCard>
  );
};

// ===== BALANCE CARD WITH SPRING ANIMATION =====
export const AdvancedBalanceCard = ({ 
  balance, 
  onDeposit, 
  onWithdraw,
  totalDeposit = 0,
  totalWithdraw = 0
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm opacity-75 mb-2">Total Saldo</p>
          <h2 className="text-5xl font-bold mb-1">
            <AdvancedSmoothPrice 
              value={balance}
              prefix="Rp "
              decimals={0}
              springConfig={{
                stiffness: 150,
                damping: 25,
                mass: 1.2
              }}
              showDirection={true}
              useGlow={true}
            />
          </h2>
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
          <span className="text-2xl">💰</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-xs opacity-75 mb-1">Total Setoran</p>
          <p className="text-lg font-bold">
            <AdvancedSmoothPrice 
              value={totalDeposit}
              prefix="Rp "
              decimals={0}
              springConfig={{ stiffness: 180, damping: 28 }}
              showDirection={false}
              useGlow={false}
            />
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-xs opacity-75 mb-1">Total Penarikan</p>
          <p className="text-lg font-bold">
            <AdvancedSmoothPrice 
              value={totalWithdraw}
              prefix="Rp "
              decimals={0}
              springConfig={{ stiffness: 180, damping: 28 }}
              showDirection={false}
              useGlow={false}
            />
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => onDeposit?.(500000)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-105"
        >
          + Rp 500,000
        </button>
        <button 
          onClick={() => onWithdraw?.(500000)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-105"
        >
          - Rp 500,000
        </button>
      </div>
    </div>
  );
};

// ===== LIVE MARKET COMPONENT =====
export const LiveMarket = ({ stocks, onBuy, onSell }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map(stock => (
        <AdvancedStockCard
          key={stock.id}
          {...stock}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
};

// ===== PORTFOLIO SUMMARY WITH SPRING =====
export const AdvancedPortfolioSummary = ({ totalValue, totalProfit, profitPercent }) => {
  const isProfit = totalProfit >= 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Portfolio Summary
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Total Nilai Portofolio
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            <AdvancedSmoothPrice 
              value={totalValue}
              prefix="Rp "
              decimals={0}
              springConfig={{ stiffness: 160, damping: 26 }}
              showDirection={false}
              useGlow={false}
            />
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Keuntungan/Kerugian
          </p>
          <p className={`text-2xl font-bold ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}>
            <AdvancedSmoothPrice 
              value={totalProfit}
              prefix="Rp "
              decimals={0}
              springConfig={{ stiffness: 170, damping: 26 }}
              showDirection={true}
              useGlow={true}
            />
          </p>
          <p className={`text-sm ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}>
            <AdvancedSmoothPrice 
              value={profitPercent}
              prefix={isProfit ? '+' : ''}
              suffix="%"
              decimals={2}
              showDirection={false}
              useGlow={false}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default {
  useSpring,
  AdvancedSmoothPrice,
  SpringAnimatedCard,
  AdvancedStockCard,
  AdvancedBalanceCard,
  LiveMarket,
  AdvancedPortfolioSummary
};
