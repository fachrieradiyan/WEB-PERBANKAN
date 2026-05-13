/**
 * Next.js Example Implementation
 * Contoh lengkap penggunaan Smooth Animation di Next.js App Router
 */

'use client';

import React, { useState, useEffect } from 'react';
import { SmoothPrice, AnimatedPriceCard, useCountAnimation } from './SmoothPriceAnimation';

// ===== TYPE DEFINITIONS =====

interface Stock {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  owned: number;
  sector: string;
  changePercent: number;
}

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  basePrice: number;
  owned: number;
  category: string;
  icon: string;
  changePercent: number;
}

// ===== EXAMPLE 1: BALANCE DISPLAY =====

export function BalanceCard() {
  const [balance, setBalance] = useState(1000000);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  const deposit = (amount: number) => {
    setBalance(prev => prev + amount);
    setTotalDeposit(prev => prev + amount);
  };

  const withdraw = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setTotalWithdraw(prev => prev + amount);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm opacity-75 mb-2">Total Saldo</p>
          <h2 className="text-5xl font-bold mb-1">
            <SmoothPrice 
              value={balance}
              prefix="Rp "
              decimals={0}
              duration={800}
              easing="easeInOutCubic"
              showDirection={true}
            />
          </h2>
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
          <i className="fas fa-wallet text-2xl"></i>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-xs opacity-75 mb-1">Total Setoran</p>
          <p className="text-lg font-bold">
            <SmoothPrice 
              value={totalDeposit}
              prefix="Rp "
              decimals={0}
              duration={600}
              easing="easeOutExpo"
              showDirection={false}
            />
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-xs opacity-75 mb-1">Total Penarikan</p>
          <p className="text-lg font-bold">
            <SmoothPrice 
              value={totalWithdraw}
              prefix="Rp "
              decimals={0}
              duration={600}
              easing="easeOutExpo"
              showDirection={false}
            />
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => deposit(500000)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition"
        >
          + Rp 500,000
        </button>
        <button 
          onClick={() => withdraw(500000)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
        >
          - Rp 500,000
        </button>
      </div>
    </div>
  );
}

// ===== EXAMPLE 2: STOCK PRICE DISPLAY =====

export function StockPriceDisplay({ stock }: { stock: Stock }) {
  const animatedPrice = useCountAnimation(stock.price, 800, 'easeInOutCubic');
  const animatedChange = useCountAnimation(stock.changePercent, 400, 'easeInOutCubic');

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">📈</div>
        <div>
          <h3 className="text-xl font-bold">{stock.id}</h3>
          <p className="text-sm text-gray-500">{stock.name}</p>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {stock.sector}
          </span>
        </div>
      </div>

      <div className="text-3xl font-bold mb-2">
        <SmoothPrice 
          value={animatedPrice}
          prefix="Rp "
          decimals={0}
          duration={800}
          easing="easeInOutCubic"
          showDirection={true}
        />
      </div>

      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
        isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        <span>{isPositive ? '▲' : '▼'}</span>
        <span className="font-semibold">
          {Math.abs(animatedChange).toFixed(2)}%
        </span>
      </div>

      {stock.owned > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Kepemilikan</p>
          <p className="text-lg font-bold">
            <SmoothPrice 
              value={stock.owned}
              prefix=""
              suffix=" lot"
              decimals={0}
              showDirection={false}
            />
          </p>
        </div>
      )}
    </div>
  );
}

// ===== EXAMPLE 3: CRYPTO CARD WITH LIVE UPDATES =====

export function CryptoCard({ crypto }: { crypto: Crypto }) {
  const [currentPrice, setCurrentPrice] = useState(crypto.price);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.05;
        return prev * (1 + change);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const changePercent = ((currentPrice - crypto.basePrice) / crypto.basePrice) * 100;

  return (
    <AnimatedPriceCard
      id={crypto.id}
      name={crypto.name}
      price={currentPrice}
      changePercent={changePercent}
      owned={crypto.owned}
      onBuy={(id) => console.log('Buy', id)}
      onSell={(id) => console.log('Sell', id)}
      icon={crypto.icon}
      sector={crypto.category}
    />
  );
}

// ===== EXAMPLE 4: PORTFOLIO SUMMARY =====

export function PortfolioSummary({ stocks }: { stocks: Stock[] }) {
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    let value = 0;
    let cost = 0;

    stocks.forEach(stock => {
      if (stock.owned > 0) {
        value += stock.price * stock.owned;
        cost += stock.basePrice * stock.owned;
      }
    });

    setTotalValue(value);
    setTotalProfit(value - cost);
  }, [stocks]);

  const profitPercent = totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0;
  const isProfit = totalProfit >= 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-2xl border border-blue-100">
      <h3 className="text-lg font-semibold mb-4">Portfolio Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Total Nilai Portofolio
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            <SmoothPrice 
              value={totalValue}
              prefix="Rp "
              decimals={0}
              duration={800}
              easing="easeInOutCubic"
              showDirection={false}
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
            <SmoothPrice 
              value={totalProfit}
              prefix="Rp "
              decimals={0}
              duration={600}
              easing="easeOutBack"
              showDirection={true}
            />
          </p>
          <p className={`text-sm ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}>
            {isProfit ? '+' : ''}{profitPercent.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== EXAMPLE 5: LIVE STOCK MARKET =====

export function LiveStockMarket() {
  const [stocks, setStocks] = useState<Stock[]>([
    { id: 'BBCA', name: 'Bank Central Asia', price: 9500, basePrice: 9500, owned: 0, sector: 'Perbankan', changePercent: 0 },
    { id: 'BBRI', name: 'Bank Rakyat Indonesia', price: 5200, basePrice: 5200, owned: 0, sector: 'Perbankan', changePercent: 0 },
    { id: 'TLKM', name: 'Telkom Indonesia', price: 3800, basePrice: 3800, owned: 0, sector: 'Telekomunikasi', changePercent: 0 },
  ]);

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const change = (Math.random() - 0.5) * 0.03;
          const newPrice = Math.round(stock.basePrice * (1 + change));
          const changePercent = ((newPrice - stock.basePrice) / stock.basePrice) * 100;
          
          return {
            ...stock,
            price: newPrice,
            changePercent
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Stock Market</h2>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isLive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isLive ? '⏸ Stop' : '▶ Start'} Live Updates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stocks.map(stock => (
          <StockPriceDisplay key={stock.id} stock={stock} />
        ))}
      </div>

      <PortfolioSummary stocks={stocks} />
    </div>
  );
}

// ===== EXAMPLE 6: TRANSACTION COUNTER =====

export function TransactionCounter() {
  const [count, setCount] = useState(0);
  const animatedCount = useCountAnimation(count, 600, 'easeOutBack');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
      <p className="text-sm text-gray-500 mb-2">Total Transaksi</p>
      <p className="text-5xl font-bold text-blue-600 mb-4">
        {Math.round(animatedCount).toLocaleString('id-ID')}
      </p>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        + Transaksi Baru
      </button>
    </div>
  );
}

// ===== EXAMPLE 7: COMPLETE PAGE =====

export default function InvestraPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Investra - Investment Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Platform investasi dengan smooth animations
          </p>
        </header>

        {/* Balance Card */}
        <BalanceCard />

        {/* Live Stock Market */}
        <LiveStockMarket />

        {/* Transaction Counter */}
        <TransactionCounter />
      </div>
    </div>
  );
}

// ===== USAGE IN APP =====

/*
// app/page.tsx
import InvestraPage from '@/components/InvestraPage';

export default function Home() {
  return <InvestraPage />;
}

// app/layout.tsx
import './globals.css';
import '@/js/smooth-animations.css';

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
*/
