# 🎨 INVANKRI - Brand Identity Guide

## 📋 Brand Overview

**Nama:** INVANKRI  
**Kepanjangan:** Investasi & BANK NKRI  
**Tagline:** Platform Perbankan, Investasi Saham & Cryptocurrency Modern  
**Versi:** 2.0  
**Tahun:** 2026

---

## 🎯 Brand Positioning

### Mission
Menyediakan platform investasi dan perbankan yang modern, mudah digunakan, dan terpercaya untuk seluruh masyarakat Indonesia.

### Vision
Menjadi platform investasi #1 di Indonesia yang menggabungkan banking, saham, dan cryptocurrency dalam satu ekosistem.

### Values
- 🇮🇩 **Nasionalisme** - Mendukung NKRI dan ekonomi Indonesia
- 💎 **Kepercayaan** - Transparansi dan keamanan data
- 🚀 **Inovasi** - Teknologi modern dan user-friendly
- 🤝 **Inklusif** - Untuk semua kalangan masyarakat

---

## 🎨 Visual Identity

### Logo & Typography

#### Primary Logo
```
🏦 INVANKRI
```

#### Logo Variations
1. **Full Logo:** `INVANKRI - Investasi & BANK NKRI`
2. **Short Logo:** `INVANKRI`
3. **Icon Only:** `🏦`

#### Typography
- **Primary Font:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Heading:** Bold (700)
- **Body:** Regular (400)
- **Small Text:** Medium (500)

---

## 🎨 Color Palette

### Primary Colors

#### Accent Green (Primary)
- **Hex:** `#10B981`
- **RGB:** `rgb(16, 185, 129)`
- **Usage:** Buttons, highlights, success states
- **Tailwind:** `bg-accent`, `text-accent`

#### Dark Slate (Secondary)
- **Hex:** `#0F172A`
- **RGB:** `rgb(15, 23, 42)`
- **Usage:** Headers, dark backgrounds
- **Tailwind:** `bg-primary`

#### Medium Slate
- **Hex:** `#1E293B`
- **RGB:** `rgb(30, 41, 59)`
- **Usage:** Cards, secondary backgrounds
- **Tailwind:** `bg-secondary`

### Accent Colors

#### Gold (Priority)
- **Hex:** `#FBBF24` (yellow-400)
- **RGB:** `rgb(251, 191, 36)`
- **Usage:** Priority badges, premium features
- **Gradient:** `from-yellow-400 via-yellow-500 to-yellow-600`

#### Red (Danger)
- **Hex:** `#EF4444`
- **RGB:** `rgb(239, 68, 68)`
- **Usage:** Withdraw, delete, errors
- **Tailwind:** `bg-danger`, `text-danger`

#### Blue (Info)
- **Hex:** `#3B82F6`
- **RGB:** `rgb(59, 130, 246)`
- **Usage:** Stocks, information, links
- **Tailwind:** `bg-blue-500`

#### Orange (Crypto)
- **Hex:** `#F97316`
- **RGB:** `rgb(249, 115, 22)`
- **Usage:** Cryptocurrency features
- **Tailwind:** `bg-orange-500`

### Neutral Colors

#### Light Mode
- **Background:** `#F9FAFB` (gray-50)
- **Card:** `#FFFFFF` (white)
- **Text Primary:** `#1F2937` (gray-800)
- **Text Secondary:** `#6B7280` (gray-500)

#### Dark Mode
- **Background:** `#0F172A` (slate-900)
- **Card:** `#1E293B` (slate-800)
- **Text Primary:** `#E2E8F0` (slate-200)
- **Text Secondary:** `#94A3B8` (slate-400)

---

## 🎭 Brand Voice & Tone

### Voice Characteristics
- **Professional** - Terpercaya dan kredibel
- **Friendly** - Mudah dipahami dan approachable
- **Modern** - Up-to-date dengan teknologi terkini
- **Nasionalis** - Bangga Indonesia

### Tone Guidelines

#### Do's ✅
- Gunakan bahasa Indonesia yang baik dan benar
- Sapa user dengan ramah ("Selamat datang!")
- Berikan feedback yang jelas
- Gunakan emoji secukupnya (✅, 🎉, ⭐)

#### Don'ts ❌
- Jangan gunakan bahasa yang terlalu formal/kaku
- Hindari jargon yang sulit dipahami
- Jangan gunakan emoji berlebihan
- Hindari bahasa yang ambigu

---

## 📱 UI Components

### Buttons

#### Primary Button (Accent)
```html
<button class="bg-accent hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl">
    Setor Uang
</button>
```

#### Danger Button
```html
<button class="bg-danger hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl">
    Tarik Uang
</button>
```

#### Secondary Button
```html
<button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl">
    Batal
</button>
```

### Cards

#### Standard Card
```html
<div class="bg-white dark:bg-secondary rounded-2xl shadow-lg p-6">
    <!-- Content -->
</div>
```

#### Gradient Card (Balance)
```html
<div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 text-white">
    <!-- Content -->
</div>
```

### Badges

#### Regular Badge
```html
<span class="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
    Akun Regular
</span>
```

#### Priority Badge
```html
<span class="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white text-sm font-bold rounded-full shadow-lg">
    ⭐ PRIORITY
</span>
```

#### VIP Badge
```html
<span class="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-bold rounded-full animate-pulse">
    👑 VIP
</span>
```

---

## 🎯 Icon System

### Primary Icons (Font Awesome)

#### Banking
- 💰 Wallet: `fa-wallet`
- 💵 Money: `fa-money-bill-wave`
- 📊 Chart: `fa-chart-line`
- 🏦 Bank: `fa-university`

#### Actions
- ➕ Deposit: `fa-plus-circle`
- ➖ Withdraw: `fa-minus-circle`
- 🔄 Transfer: `fa-exchange-alt`
- 📜 History: `fa-history`

#### User
- 👤 Profile: `fa-user`
- 🚪 Logout: `fa-sign-out-alt`
- 🔐 Login: `fa-sign-in-alt`
- ⚙️ Settings: `fa-cog`

#### Status
- ✅ Success: `fa-check-circle`
- ❌ Error: `fa-times-circle`
- ⚠️ Warning: `fa-exclamation-triangle`
- ℹ️ Info: `fa-info-circle`

---

## 📐 Spacing & Layout

### Spacing Scale (Tailwind)
- **xs:** `2px` (0.5)
- **sm:** `4px` (1)
- **md:** `8px` (2)
- **lg:** `16px` (4)
- **xl:** `24px` (6)
- **2xl:** `32px` (8)
- **3xl:** `48px` (12)

### Border Radius
- **Small:** `rounded-lg` (8px)
- **Medium:** `rounded-xl` (12px)
- **Large:** `rounded-2xl` (16px)
- **Extra Large:** `rounded-3xl` (24px)
- **Full:** `rounded-full` (9999px)

### Shadows
- **Small:** `shadow-sm`
- **Medium:** `shadow-lg`
- **Large:** `shadow-xl`
- **Extra Large:** `shadow-2xl`

---

## 🎬 Animation Guidelines

### Timing
- **Fast:** 200ms - Hover effects, small transitions
- **Medium:** 300ms - Modal open/close, page transitions
- **Slow:** 500ms - Complex animations, spring physics

### Easing Functions
- **Default:** `ease-in-out`
- **Smooth:** `cubic-bezier(0.4, 0, 0.2, 1)`
- **Spring:** Custom spring physics (stiffness: 170, damping: 26)

### Animation Types
1. **Fade In/Out** - Opacity transitions
2. **Slide In/Out** - Transform translateY/X
3. **Scale** - Transform scale
4. **Spring** - Physics-based smooth animation

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints
- **Mobile:** `< 640px` (default)
- **Tablet:** `640px - 768px` (sm:)
- **Desktop:** `768px - 1024px` (md:)
- **Large Desktop:** `1024px - 1280px` (lg:)
- **Extra Large:** `> 1280px` (xl:)

### Layout Guidelines
- **Mobile:** Single column, full width
- **Tablet:** 2 columns for cards
- **Desktop:** 3-4 columns for cards
- **Large Desktop:** 4+ columns, max-width container

---

## 🌙 Dark Mode

### Implementation
```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
localStorage.setItem('darkMode', 'enabled');
```

### Color Adjustments
- **Background:** `bg-gray-50` → `dark:bg-slate-900`
- **Card:** `bg-white` → `dark:bg-slate-800`
- **Text:** `text-gray-800` → `dark:text-slate-200`
- **Border:** `border-gray-200` → `dark:border-slate-700`

---

## 📝 Copywriting Guidelines

### Notifications

#### Success
- ✅ "Login berhasil! Selamat datang, [username]!"
- ✅ "Berhasil menyetor Rp [amount]"
- ✅ "Registrasi berhasil! Silakan login."

#### Error
- ❌ "Username atau password salah!"
- ❌ "Saldo tidak mencukupi!"
- ❌ "Username sudah digunakan!"

#### Warning
- ⚠️ "Jumlah terlalu besar! Maksimal Rp [amount]"
- ⚠️ "Apakah Anda yakin ingin keluar?"

#### Info
- ℹ️ "Total setoran Anda: Rp [amount]"
- ℹ️ "Anda memiliki [count] transaksi"

### Button Labels
- **Primary Actions:** "Setor Uang", "Tarik Uang", "Beli Saham"
- **Secondary Actions:** "Batal", "Tutup", "Kembali"
- **Confirmations:** "Ya, Lanjutkan", "Konfirmasi", "Setuju"

---

## 🎯 Brand Applications

### Website Header
```
🏦 INVANKRI
Investasi & BANK NKRI
```

### Page Titles
```
INVANKRI - Investasi & BANK NKRI
INVANKRI - Dashboard
INVANKRI - Saham Trading
INVANKRI - Cryptocurrency
```

### Social Media
- **Facebook:** INVANKRI - Investasi & BANK NKRI
- **Twitter:** @INVANKRI
- **Instagram:** @invankri.official
- **LinkedIn:** INVANKRI Indonesia

---

## 📊 Brand Metrics

### Success Metrics
- User satisfaction score
- Transaction volume
- Active users
- Portfolio growth
- Feature adoption rate

### Brand Health
- Brand awareness
- Brand preference
- Brand loyalty
- Net Promoter Score (NPS)

---

## 🚀 Brand Evolution

### Version History

#### v2.0 (Current)
- Rebranding dari "Investra" ke "INVANKRI"
- Focus pada nasionalisme (NKRI)
- Enhanced features (Priority Account, Auto-login)

#### v1.0 (Previous)
- Original branding "Investra"
- Basic banking & investment features

---

## 📞 Brand Contact

### Official Channels
- **Website:** https://github.com/fachrieradiyan/WEB-PERBANKAN
- **Email:** support@invankri.id (placeholder)
- **Phone:** +62 xxx xxxx xxxx (placeholder)

### Support
- **Documentation:** See `/docs` folder
- **Issues:** GitHub Issues
- **Community:** GitHub Discussions

---

## ✅ Brand Checklist

### Before Launch
- [ ] Logo finalized
- [ ] Color palette implemented
- [ ] Typography consistent
- [ ] UI components standardized
- [ ] Dark mode tested
- [ ] Responsive design verified
- [ ] Copywriting reviewed
- [ ] Icons consistent
- [ ] Animations smooth
- [ ] Brand guide documented

---

## 🎉 Conclusion

**INVANKRI** adalah brand yang modern, terpercaya, dan nasionalis. Dengan fokus pada user experience yang excellent dan teknologi yang inovatif, INVANKRI siap menjadi platform investasi terdepan di Indonesia.

---

**Made with ❤️ for Indonesia 🇮🇩**

© 2026 INVANKRI - Investasi & BANK NKRI. All rights reserved.
