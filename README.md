# 🏦 INVANKRI - Investasi & BANK NKRI

Platform Perbankan, Investasi Saham & Cryptocurrency Modern berbasis Web.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://fachrieradiyan.github.io/WEB-PERBANKAN/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://github.com/fachrieradiyan/WEB-PERBANKAN)

---

## 🌟 Features

### 💰 Banking
- **Deposit & Withdraw** - Setor dan tarik saldo dengan mudah
- **Transaction History** - Riwayat transaksi lengkap
- **Balance Management** - Kelola saldo dengan aman
- **Multi-User Support** - Sistem login untuk banyak pengguna

### 📊 Stock Trading
- **30+ Saham Indonesia** - BBCA, BBRI, TLKM, ASII, dan lainnya
- **Live Price Updates** - Harga update real-time
- **Buy & Sell** - Beli dan jual saham
- **Portfolio Management** - Kelola portofolio saham
- **Profit/Loss Tracking** - Lacak keuntungan/kerugian

### 🪙 Cryptocurrency
- **25+ Cryptocurrencies** - BTC, ETH, BNB, SOL, dan lainnya
- **Live Price Updates** - Harga update real-time
- **Buy & Sell** - Trading cryptocurrency
- **Portfolio Management** - Kelola portofolio crypto
- **Profit/Loss Tracking** - Lacak keuntungan/kerugian

### 📈 Advanced Features
- **Interactive Charts** - Grafik pergerakan harga
- **Smooth Animations** - Spring physics engine
- **Dark Mode** - Toggle light/dark theme
- **Priority Account** - Gold badge untuk deposit 100M+
- **Data Persistence** - LocalStorage untuk menyimpan data
- **Responsive Design** - Mobile-friendly

---

## 🚀 Quick Start

### Demo Account
```
Username: dirut
Password: dirut2026
Role: Direktur Utama (VIP Account)
```

### Local Development
1. Clone repository:
   ```bash
   git clone https://github.com/fachrieradiyan/WEB-PERBANKAN.git
   cd WEB-PERBANKAN
   ```

2. Open `index.html` in browser:
   ```bash
   # Windows
   start index.html
   
   # Mac
   open index.html
   
   # Linux
   xdg-open index.html
   ```

3. Login dengan demo account atau register akun baru

### Deployment
Website ini sudah di-deploy di GitHub Pages:
```
https://fachrieradiyan.github.io/WEB-PERBANKAN/
```

---

## 📋 Usage Guide

### 1. Login/Register
- **Login**: Gunakan demo account atau akun yang sudah terdaftar
- **Register**: Buat akun baru dengan username dan password
- **Remember Me**: Centang untuk tetap login

### 2. Dashboard
- **Deposit**: Masukkan jumlah dan klik "Setor Uang"
- **Withdraw**: Masukkan jumlah dan klik "Tarik Uang"
- **Balance**: Lihat saldo, total setoran, dan total penarikan

### 3. Stock Trading
- **Browse Stocks**: Lihat daftar 30+ saham Indonesia
- **Buy Stock**: Klik "Beli", masukkan jumlah lot
- **Sell Stock**: Klik "Jual" pada saham yang dimiliki
- **Portfolio**: Lihat portofolio dan profit/loss

### 4. Cryptocurrency
- **Browse Crypto**: Lihat daftar 25+ cryptocurrency
- **Buy Crypto**: Klik "Beli", masukkan jumlah
- **Sell Crypto**: Klik "Jual" pada crypto yang dimiliki
- **Portfolio**: Lihat portofolio dan profit/loss

### 5. Charts
- **Select Asset**: Pilih saham atau crypto
- **View Chart**: Lihat grafik pergerakan harga
- **Price Info**: Current, High, Low, Change %

### 6. Profile
- **User Info**: Lihat informasi akun
- **Statistics**: Total transaksi, investasi, dll
- **Priority Account**: Badge gold untuk deposit 100M+
- **Edit Name**: Ubah display name

---

## 💎 Priority Account

### Auto-Upgrade
Akun otomatis upgrade ke **Priority Account** saat:
- Total deposit mencapai **Rp 100 Miliar** atau lebih

### Benefits
- ⭐ **Gold Badge** - Badge priority berwarna gold
- 🎯 **Prioritas Layanan** - Customer service prioritas
- 💎 **Fitur Eksklusif** - Akses fitur khusus
- 🚀 **Limit Lebih Tinggi** - Transaksi tanpa batas

### Notification
- Modal notifikasi muncul saat upgrade
- Badge gold otomatis muncul di header
- Halaman profil auto-refresh
- 4 benefit cards di halaman profil

---

## 🎨 Technology Stack

### Frontend
- **HTML5** - Structure
- **Tailwind CSS** - Styling (CDN)
- **JavaScript (ES6+)** - Logic
- **Font Awesome** - Icons (CDN)

### Animation
- **Spring Physics Engine** - Smooth animations
- **60 FPS Performance** - GPU acceleration
- **Custom Easing Functions** - Natural movements

### Storage
- **LocalStorage** - Client-side data persistence
- **JSON** - Data format
- **Multi-User Support** - Separate data per user

### Deployment
- **GitHub Pages** - Static hosting
- **Git** - Version control
- **No Backend Required** - Fully client-side

---

## 📁 Project Structure

```
WEB-PERBANKAN/
├── js/
│   ├── advanced-smooth-animation.js    # Spring physics engine
│   ├── advanced-animations.css         # Animation styles
│   ├── smooth-price-updater.js         # Price animations
│   ├── smooth-animations.css           # Smooth styles
│   ├── ReactAdvancedAnimation.jsx      # React component
│   ├── NextJsAdvancedExample.tsx       # Next.js example
│   └── README.md                       # Animation docs
├── .nojekyll                           # GitHub Pages config
├── index.html                          # Main website
├── main.js                             # Application logic
└── README.md                           # This file
```

---

## 🔧 Configuration

### VIP Accounts
Edit `main.js` untuk menambah VIP account:
```javascript
const VIP_ACCOUNTS = {
    'username': {
        password: 'password',
        name: 'Display Name',
        isVIP: true
    }
};
```

### Stock List
Edit `main.js` untuk menambah saham:
```javascript
stocks.push({
    id: 'CODE',
    name: 'Company Name',
    price: 1000,
    basePrice: 1000,
    owned: 0,
    sector: 'Sector'
});
```

### Crypto List
Edit `main.js` untuk menambah cryptocurrency:
```javascript
cryptos.push({
    id: 'SYMBOL',
    name: 'Crypto Name',
    symbol: 'SYM',
    price: 1000000,
    basePrice: 1000000,
    owned: 0,
    category: 'Category',
    icon: '🔷'
});
```

---

## 🐛 Troubleshooting

### Login Button Tidak Berfungsi
1. Clear browser cache (Ctrl+Shift+R)
2. Check browser console (F12) untuk errors
3. Pastikan JavaScript enabled
4. Try incognito/private mode

### Data Hilang Setelah Refresh
1. Check localStorage enabled di browser
2. Pastikan "Remember Me" dicentang saat login
3. Jangan clear browser data/cookies

### Animasi Tidak Smooth
1. Check browser console untuk errors
2. Pastikan `js/advanced-smooth-animation.js` loaded
3. Try disable browser extensions
4. Update browser ke versi terbaru

### GitHub Pages 404
1. Buka Settings → Pages di GitHub
2. Set Source: "Deploy from a branch"
3. Set Branch: "main" + "/ (root)"
4. Klik "Save"
5. Tunggu 2-5 menit untuk build

---

## 📊 Performance

### Load Time
- Initial load: < 2 seconds
- Page switch: < 100ms
- Animation: 60 FPS

### File Sizes
- index.html: ~66 KB
- main.js: ~112 KB
- animations.js: ~16 KB
- **Total: ~194 KB**

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

---

## 🔐 Security

### Client-Side Only
- No backend server required
- No API calls to external services
- All data stored locally in browser

### Data Privacy
- Data never leaves user's browser
- No tracking or analytics
- No cookies (except localStorage)

### Best Practices
- Passwords stored in localStorage (demo only)
- For production: use proper authentication
- For production: use HTTPS
- For production: implement backend

---

## 🚀 Deployment Guide

### GitHub Pages (Current)
1. Push code to GitHub
2. Go to Settings → Pages
3. Set Source: "Deploy from a branch"
4. Set Branch: "main" + "/ (root)"
5. Click "Save"
6. Wait 2-5 minutes
7. Access at: `https://username.github.io/repository/`

### Other Platforms
- **Netlify**: Drag & drop folder
- **Vercel**: Import from GitHub
- **Cloudflare Pages**: Connect repository
- **Any Static Host**: Upload files

---

## 📝 Development

### Adding Features
1. Edit `main.js` for logic
2. Edit `index.html` for UI
3. Test locally
4. Commit and push
5. Wait for deployment

### Testing
1. Open `index.html` in browser
2. Open console (F12)
3. Test all features
4. Check for errors
5. Test on mobile

### Contributing
1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## 📜 License

This project is open source and available for educational purposes.

---

## 👤 Author

**Fachrie Radiyan**
- GitHub: [@fachrieradiyan](https://github.com/fachrieradiyan)
- Repository: [WEB-PERBANKAN](https://github.com/fachrieradiyan/WEB-PERBANKAN)

---

## 🙏 Acknowledgments

- Tailwind CSS for styling framework
- Font Awesome for icons
- GitHub Pages for hosting
- Spring physics for smooth animations

---

## 📞 Support

### Issues
Report bugs or request features:
- GitHub Issues: [Create Issue](https://github.com/fachrieradiyan/WEB-PERBANKAN/issues)

### Questions
- Check this README first
- Check browser console for errors
- Try clearing cache and cookies

---

## 🎯 Roadmap

### Current Version: 2.0
- ✅ Banking features
- ✅ Stock trading
- ✅ Cryptocurrency
- ✅ Charts
- ✅ Priority account
- ✅ Dark mode

### Future Plans
- [ ] Backend integration
- [ ] Real-time data from APIs
- [ ] Multi-language support
- [ ] PWA features
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Two-factor authentication

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Stock Trading
![Stocks](https://via.placeholder.com/800x400?text=Stock+Trading+Screenshot)

### Cryptocurrency
![Crypto](https://via.placeholder.com/800x400?text=Cryptocurrency+Screenshot)

---

## ⭐ Star This Repository

If you find this project useful, please give it a star! ⭐

---

**Made with ❤️ by Fachrie Radiyan**

**INVANKRI - Investasi & BANK NKRI** 🏦
