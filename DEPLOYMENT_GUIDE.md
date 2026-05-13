# 🚀 Panduan Deployment INVANKRI

## 📋 Overview

Panduan lengkap untuk deploy aplikasi INVANKRI ke berbagai platform hosting.

---

## 🌐 GitHub Pages (Recommended)

### Setup GitHub Pages:

#### Step 1: Push ke GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Enable GitHub Pages
1. Buka repository: https://github.com/fachrieradiyan/WEB-PERBANKAN
2. Klik **Settings**
3. Scroll ke **Pages** (di sidebar kiri)
4. Di **Source**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
5. Klik **Save**
6. Wait 1-2 menit untuk deployment

#### Step 3: Access Website
```
URL: https://fachrieradiyan.github.io/WEB-PERBANKAN/
```

---

## 🔧 Troubleshooting Deployment

### Issue 1: Halaman Blank / Tidak Muncul

**Penyebab:**
- File path salah
- Script tidak dimuat
- CORS error

**Solusi:**
```html
<!-- Pastikan semua path relatif, bukan absolute -->
✅ BENAR: <script src="main.js"></script>
❌ SALAH: <script src="/main.js"></script>

✅ BENAR: <script src="js/advanced-smooth-animation.js"></script>
❌ SALAH: <script src="/js/advanced-smooth-animation.js"></script>
```

### Issue 2: Login Button Tidak Berfungsi

**Penyebab:**
- JavaScript error
- Animation script tidak dimuat

**Solusi:**
Sudah ditambahkan fallback di index.html:
```javascript
// Fallback if AdvancedSmoothAnimator is not loaded
if (typeof AdvancedSmoothAnimator === 'undefined') {
    window.AdvancedSmoothAnimator = class {
        constructor(element, options) {
            this.element = element;
        }
        animateTo(value) {
            if (this.element) {
                this.element.textContent = Math.floor(value).toLocaleString('id-ID');
            }
        }
        destroy() {}
    };
}
```

### Issue 3: CSS Tidak Muncul

**Penyebab:**
- Tailwind CDN blocked
- CSS file tidak dimuat

**Solusi:**
```html
<!-- Pastikan CDN dimuat -->
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Issue 4: Data Tidak Tersimpan

**Penyebab:**
- localStorage tidak support di beberapa browser
- Private/Incognito mode

**Solusi:**
- Gunakan browser normal (bukan incognito)
- Enable cookies & localStorage
- Test di browser lain

---

## 🧪 Testing Deployment

### Pre-Deployment Checklist:

- [ ] Test di localhost dulu
- [ ] Semua file ada di repository
- [ ] Path file semua relatif (tidak ada `/` di awal)
- [ ] Console tidak ada error
- [ ] Login berfungsi
- [ ] Data tersimpan
- [ ] Animation berfungsi (atau gracefully fallback)

### Post-Deployment Testing:

1. **Buka URL Deployment**
   ```
   https://fachrieradiyan.github.io/WEB-PERBANKAN/
   ```

2. **Test Login**
   - Klik tombol "Masuk"
   - Cek console (F12) untuk error
   - Login dengan demo account:
     - Username: `dirut`
     - Password: `dirut2026`

3. **Test Register**
   - Klik tab "Daftar"
   - Register user baru
   - Login dengan user baru

4. **Test Features**
   - Setor uang
   - Tarik uang
   - Beli saham
   - Beli crypto
   - Cek data tersimpan (refresh page)

---

## 📊 Debugging Deployed Site

### Check Console Logs:

```javascript
// Logs yang harus muncul:
🚀 INVANKRI Application Starting...
📍 Current URL: https://fachrieradiyan.github.io/WEB-PERBANKAN/
📂 Base Path: /WEB-PERBANKAN/
🌐 Deployed: true
```

### Check Network Tab:

```
F12 → Network → Reload page
```

**Look for:**
- ✅ main.js (200 OK)
- ✅ js/advanced-smooth-animation.js (200 OK or 404 with fallback)
- ✅ Tailwind CDN (200 OK)
- ✅ Font Awesome CDN (200 OK)

### Check Elements:

```
F12 → Elements → Find #authScreen
```

**Verify:**
- `#authScreen` visible
- `#appScreen` hidden
- Login form rendered
- Buttons have onclick handlers

---

## 🔐 Security Notes

### localStorage Security:

⚠️ **PENTING:**
- Data disimpan di browser (client-side)
- Tidak encrypted
- Bisa dilihat di DevTools
- Untuk production, gunakan backend + database

### Recommendations:

1. **Untuk Demo/Prototype:**
   - ✅ localStorage OK
   - ✅ Client-side only

2. **Untuk Production:**
   - ❌ Jangan gunakan localStorage untuk data sensitif
   - ✅ Gunakan backend server
   - ✅ Encrypt password dengan bcrypt
   - ✅ Gunakan JWT authentication
   - ✅ Database (MySQL/MongoDB)
   - ✅ HTTPS/SSL

---

## 🌍 Alternative Hosting

### 1. Netlify

**Steps:**
1. Buat account di https://netlify.com
2. Connect GitHub repository
3. Deploy settings:
   - Build command: (kosongkan)
   - Publish directory: `/`
4. Deploy!

**URL:** `https://invankri.netlify.app` (custom)

### 2. Vercel

**Steps:**
1. Buat account di https://vercel.com
2. Import GitHub repository
3. Deploy settings:
   - Framework: Other
   - Root directory: `/`
4. Deploy!

**URL:** `https://invankri.vercel.app` (custom)

### 3. Cloudflare Pages

**Steps:**
1. Buat account di https://pages.cloudflare.com
2. Connect GitHub repository
3. Deploy settings:
   - Build command: (kosongkan)
   - Build output: `/`
4. Deploy!

**URL:** `https://invankri.pages.dev` (custom)

---

## 📱 Mobile Testing

### Test on Mobile:

1. **Deploy ke GitHub Pages**
2. **Buka di mobile browser:**
   ```
   https://fachrieradiyan.github.io/WEB-PERBANKAN/
   ```
3. **Test features:**
   - Login
   - Register
   - Setor/Tarik
   - Beli saham/crypto

### Responsive Design:

- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

---

## 🔄 Update Deployment

### Update Code:

```bash
# 1. Make changes
# 2. Commit
git add .
git commit -m "Update: description"

# 3. Push
git push origin main

# 4. Wait 1-2 minutes
# 5. Refresh deployed site
```

### Force Refresh:

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

## 📊 Performance

### Optimization Tips:

1. **Minify JavaScript**
   ```bash
   # Use terser or uglify-js
   npm install -g terser
   terser main.js -o main.min.js
   ```

2. **Optimize Images**
   - Compress images
   - Use WebP format
   - Lazy loading

3. **CDN Usage**
   - ✅ Tailwind CDN
   - ✅ Font Awesome CDN
   - Fast loading

4. **Caching**
   - Browser cache enabled
   - Service worker (optional)

---

## 🎯 Custom Domain (Optional)

### Setup Custom Domain:

1. **Buy Domain:**
   - Namecheap
   - GoDaddy
   - Cloudflare

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: www
   Value: fachrieradiyan.github.io
   ```

3. **GitHub Settings:**
   - Settings → Pages
   - Custom domain: `www.invankri.com`
   - Save

4. **Wait for DNS propagation** (24-48 hours)

---

## ✅ Deployment Checklist

### Before Deploy:
- [x] All files committed
- [x] No console errors locally
- [x] Login works locally
- [x] Data persistence works
- [x] Animation works (or fallback)
- [x] Responsive design tested
- [x] All paths are relative

### After Deploy:
- [ ] Site accessible via URL
- [ ] No 404 errors
- [ ] Login button works
- [ ] Register works
- [ ] Data persists after refresh
- [ ] Mobile responsive
- [ ] No console errors
- [ ] All features working

---

## 🆘 Common Errors

### Error 1: 404 Page Not Found

**Solution:**
```
Check GitHub Pages settings
Ensure branch is 'main' and folder is '/'
Wait 1-2 minutes after enabling
```

### Error 2: Blank Page

**Solution:**
```
F12 → Console → Check errors
Verify all scripts loaded
Check Network tab for failed requests
```

### Error 3: Login Not Working

**Solution:**
```
Check console for JavaScript errors
Verify main.js loaded
Test with test-login.html
Clear localStorage and retry
```

### Error 4: Styles Not Applied

**Solution:**
```
Check Tailwind CDN loaded
Verify Font Awesome CDN loaded
Clear browser cache
Hard refresh (Ctrl + Shift + R)
```

---

## 📞 Support

### If Deployment Fails:

1. **Check Repository:**
   - https://github.com/fachrieradiyan/WEB-PERBANKAN

2. **Check GitHub Pages Status:**
   - Settings → Pages
   - Look for green checkmark

3. **Check Console:**
   - F12 → Console
   - Look for errors

4. **Test Locally First:**
   - Open index.html locally
   - Ensure it works before deploying

5. **Read Documentation:**
   - TROUBLESHOOTING_LOGIN.md
   - README.md

---

## 🎉 Success!

**Jika deployment berhasil:**

✅ Site accessible: https://fachrieradiyan.github.io/WEB-PERBANKAN/  
✅ Login works  
✅ Register works  
✅ Data persists  
✅ All features working  
✅ Mobile responsive  

**Share your site:**
```
🏦 INVANKRI - Investasi & BANK NKRI
🌐 https://fachrieradiyan.github.io/WEB-PERBANKAN/

Platform Perbankan, Investasi Saham & Cryptocurrency Modern
Made with ❤️ for Indonesia 🇮🇩
```

---

**Last Updated:** 12 Mei 2026  
**Status:** ✅ Ready for Deployment  
**Version:** 2.1
