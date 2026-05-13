/**
 * Next.js Advanced Example - App Router
 * Implementasi lengkap dengan animasi yang lebih smooth
 * Compatible dengan Next.js 13+ (App Router)
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  useSpring,
  AdvancedSmoothPrice,
  AdvancedStockCard,
  AdvancedBalanceCard,
  LiveMarket,
  AdvancedPortfolioSummary
} from './ReactAdvancedAnimation';

// ===== TYPE DEFINITIONS =====

interface Stock {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  owned: number;
  sector: string;
  icon: string;
  changePercent: number;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  stockId?: string;
  amount: number;
  price?: number;
  timestamp: Date;
}

// ===== MAIN PAGE COMPONENT =====

export default function InvestraAdvancedPage() {
  // Balance state
  const [balance, setBalance] = useState(10000000);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  // Stocks state
  const [stocks, setStocks] = useState<Stock[]>([
    { 
      id: 'BBCA', 
      name: 'Bank Central Asia', 
      price: 9500, 
      basePrice: 9500, 
      owned: 0, 
      sector: 'Perbankan',
      icon: '🏦',
      changePercent: 0 
    },
    { 
      id: 'BBRI', 
      name: 'Bank Rakyat Indonesia', 
      price: 5200, 
      basePrice: 5200, 
      owned: 0, 
      sector: 'Perbankan',
      icon: '🏦',
      changePercent: 0 
    },
    { 
      id: 'TLKM', 
      name: 'Telkom Indonesia', 
      price: 3800, 
      basePrice: 3800, 
      owned: 0, 
      sector: 'Telekomunikasi',
      icon: '📡',
      changePercent: 0 
    },
    { 
      id: 'BTC', 
      name: 'Bitcoin', 
      price: 950000000, 
      basePrice: 950000000, 
      owned: 0, 
      sector: 'Cryptocurrency',
      icon: '🟠',
      changePercent: 0 
    },
    { 
      id: 'ETH', 
      name: 'Ethereum', 
      price: 52000000, 
      basePrice: 52000000, 
      owned: 0, 
      sector: 'Cryptocurrency',
      icon: '⬢',
      changePercent: 0 
    },
    { 
      id: 'GOTO', 
      name: 'GoTo Gojek Tokopedia', 
      price: 120, 
      basePrice: 120, 
      owned: 0, 
      sector: 'Teknologi',
      icon: '🚀',
      changePercent: 0 
    }
  ]);

  // Live market state
  const [isLiveMarket, setIsLiveMarket] = useState(false);

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Statistics
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  // ===== LIVE MARKET SIMULATION =====
  useEffect(() => {
    if (!isLiveMarket) return;

    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          // Random price change (-5% to +5%)
          const changePercent = (Math.random() - 0.5) * 0.1;
          const newPrice = stock.price * (1 + changePercent);
          const totalChangePercent = ((newPrice - stock.basePrice) / stock.basePrice) * 100;
          
          return {
            ...stock,
            price: newPrice,
            changePercent: totalChangePercent
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveMarket]);

  // ===== HANDLERS =====

  const handleDeposit = useCallback((amount: number) => {
    setBalance(prev => prev + amount);
    setTotalDeposit(prev => prev + amount);
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount,
      timestamp: new Date()
    };
    setTransactions(prev => [transaction, ...prev]);
    setTotalTransactions(prev => prev + 1);
  }, []);

  const handleWithdraw = useCallback((amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setTotalWithdraw(prev => prev + amount);
      
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'withdraw',
        amount,
        timestamp: new Date()
      };
      setTransactions(prev => [transaction, ...prev]);
      setTotalTransactions(prev => prev + 1);
    } else {
      alert('Saldo tidak cukup!');
    }
  }, [balance]);

  const handleBuy = useCallback((stockId: string) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return;

    const cost = stock.price * 1; // Buy 1 lot
    
    if (balance >= cost) {
      setBalance(prev => prev - cost);
      setStocks(prevStocks => 
        prevStocks.map(s => 
          s.id === stockId 
            ? { ...s, owned: s.owned + 1 }
            : s
        )
      );

      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'buy',
        stockId,
        amount: 1,
        price: stock.price,
        timestamp: new Date()
      };
      setTransactions(prev => [transaction, ...prev]);
      setTotalTransactions(prev => prev + 1);
    } else {
      alert('Saldo tidak cukup untuk membeli saham ini!');
    }
  }, [stocks, balance]);

  const handleSell = useCallback((stockId: string) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock || stock.owned === 0) return;

    const revenue = stock.price * 1; // Sell 1 lot
    
    setBalance(prev => prev + revenue);
    setStocks(prevStocks => 
      prevStocks.map(s => 
        s.id === stockId 
          ? { ...s, owned: s.owned - 1 }
          : s
      )
    );

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'sell',
      stockId,
      amount: 1,
      price: stock.price,
      timestamp: new Date()
    };
    setTransactions(prev => [transaction, ...prev]);
    setTotalTransactions(prev => prev + 1);
  }, [stocks]);

  // ===== CALCULATE PORTFOLIO =====
  const portfolioValue = stocks.reduce((total, stock) => {
    return total + (stock.price * stock.owned);
  }, 0);

  const portfolioCost = stocks.reduce((total, stock) => {
    return total + (stock.basePrice * stock.owned);
  }, 0);

  const portfolioProfit = portfolioValue - portfolioCost;
  const portfolioProfitPercent = portfolioCost > 0 
    ? (portfolioProfit / portfolioCost) * 100 
    : 0;

  // ===== RENDER =====

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Investra
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Platform Investasi dengan Smooth Spring Animations
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Transaksi</p>
              <p className="text-2xl font-bold text-blue-600">
                <AdvancedSmoothPrice 
                  value={totalTransactions}
                  prefix=""
                  decimals={0}
                  showDirection={false}
                  useGlow={false}
                />
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Aset</p>
              <p className="text-2xl font-bold text-green-600">
                <AdvancedSmoothPrice 
                  value={balance + portfolioValue}
                  prefix="Rp "
                  decimals={0}
                  showDirection={false}
                  useGlow={false}
                />
              </p>
            </div>
          </div>
        </header>

        {/* Balance Card */}
        <AdvancedBalanceCard
          balance={balance}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          totalDeposit={totalDeposit}
          totalWithdraw={totalWithdraw}
        />

        {/* Portfolio Summary */}
        {portfolioValue > 0 && (
          <AdvancedPortfolioSummary
            totalValue={portfolioValue}
            totalProfit={portfolioProfit}
            profitPercent={portfolioProfitPercent}
          />
        )}

        {/* Market Controls */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Live Stock Market
          </h2>
          <button
            onClick={() => setIsLiveMarket(!isLiveMarket)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
              isLiveMarket 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isLiveMarket ? '⏸ Stop Live' : '▶ Start Live'} Updates
          </button>
        </div>

        {/* Stock Market */}
        <LiveMarket
          stocks={stocks}
          onBuy={handleBuy}
          onSell={handleSell}
        />

        {/* Recent Transactions */}
        {transactions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Transaksi Terakhir
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.slice(0, 10).map(tx => (
                <div 
                  key={tx.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl ${
                      tx.type === 'buy' ? '🟢' :
                      tx.type === 'sell' ? '🔴' :
                      tx.type === 'deposit' ? '💰' : '💸'
                    }`}>
                      {tx.type === 'buy' ? '🟢' :
                       tx.type === 'sell' ? '🔴' :
                       tx.type === 'deposit' ? '💰' : '💸'}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {tx.type === 'buy' ? 'Beli' :
                         tx.type === 'sell' ? 'Jual' :
                         tx.type === 'deposit' ? 'Setor' : 'Tarik'} 
                        {tx.stockId && ` ${tx.stockId}`}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tx.timestamp.toLocaleTimeString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {tx.price && (
                      <p className="font-bold text-gray-900 dark:text-white">
                        Rp {tx.price.toLocaleString('id-ID')}
                      </p>
                    )}
                    {!tx.price && (
                      <p className="font-bold text-gray-900 dark:text-white">
                        Rp {tx.amount.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400 py-8">
          <p className="text-lg font-semibold mb-2">
            ⚡ Powered by Spring Physics Animation
          </p>
          <p className="text-sm">
            Dibuat dengan React, Next.js, dan JavaScript Advanced Animation
          </p>
        </footer>

      </div>
    </div>
  );
}

// ===== USAGE INSTRUCTIONS =====

/*
// 1. Install dependencies
npm install react react-dom next

// 2. Create app/page.tsx
import InvestraAdvancedPage from '@/components/InvestraAdvancedPage';

export default function Home() {
  return <InvestraAdvancedPage />;
}

// 3. Create app/layout.tsx
import './globals.css';

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

// 4. Add Tailwind CSS (tailwind.config.js)
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// 5. Run development server
npm run dev
*/
