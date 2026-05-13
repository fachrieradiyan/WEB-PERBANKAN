# 🧪 Cara Test Aplikasi Lokal

## ❌ Masalah: Login Tidak Berfungsi di Deployed Site

Jika login tidak berfungsi di GitHub Pages, test dulu di lokal.

---

## ⚡ SOLUSI TERCEPAT

### Gunakan File Test Minimal

**File:** `login-test-minimal.html`

**Cara:**
```
1. Buka file: login-test-minimal.html
   (double click atau drag ke browser)

2. Login dengan:
   - Username: demo
   - Password: demo123

3. Jika berhasil:
   ✅ Browser OK
   ✅ JavaScript OK
   ✅ Masalah di file index.html atau deployment
```

**Demo Accounts:**
- `demo` / `demo123`
- `admin` / `admin123`
- `dirut` / `dirut2026`
- `test` / `test123`

---

## 🔍 Test Step by Step

### Step 1: Test File Minimal

```
File: login-test-minimal.html

1. Double click file
2. Atau drag ke browser
3. Login dengan demo/demo123
4. Jika berhasil → Browser OK
5. Jika gagal → Browser issue
```

### Step 2: Test File Simple

```
File: index-simple.html

1. Double click file
2. Login dengan demo/demo123
3. Jika berhasil → Tailwind CDN OK
4. Jika gagal → CDN blocked
```

### Step 3: Test File Asli

```
File: index.html

1. Double click file
2. F12 → Console
3. Lihat error (jika ada)
4. Coba login dengan dirut/dirut2026
5. Lihat console log
```

---

## 🌐 Test dengan Local Server

### Mengapa Perlu Local Server?

Beberapa fitur butuh HTTP server:
- CORS policy
- Module imports
- Fetch API

### Cara 1: Python Server

```bash
# Python 3
python -m http.server 8000

# Buka browser:
http://localhost:8000
```

### Cara 2: PHP Server

```bash
php -S localhost:8000

# Buka browser:
http://localhost:8000
```

### Cara 3: Node.js (http-server)

```bash
# Install
npm install -g http-server

# Run
http-server -p 8000

# Buka browser:
http://localhost:8000
```

### Cara 4: VS Code Live Server

```
1. Install extension "Live Server"
2. Right click index.html
3. "Open with Live Server"
4. Browser otomatis buka
```

---

## 🔧 Debugging Lokal

### Check 1: File Exists

```
Pastikan file ada:
✅ index.html
✅ main.js
✅ js/advanced-smooth-animation.js
✅ js/advanced-animations.css
```

### Check 2: Console Errors

```
1. Buka index.html
2. F12 → Console
3. Lihat error merah
4. Screenshot error
```

**Common Errors:**
```
❌ Failed to load resource: net::ERR_FILE_NOT_FOUND
   → File path salah atau file tidak ada

❌ Uncaught ReferenceError: login is not defined
   → main.js tidak dimuat atau ada syntax error

❌ Uncaught SyntaxError: Unexpected token
   → Syntax error di JavaScript
```

### Check 3: Network Tab

```
1. F12 → Network
2. Reload page
3. Lihat file mana yang gagal dimuat
4. Status code:
   ✅ 200 OK = Berhasil
   ❌ 404 Not Found = File tidak ada
   ❌ Failed = CORS atau network issue
```

### Check 4: Test Login Function

```javascript
// Di console, test:
typeof login
// Expected: "function"

// Test call login:
login()
// Expected: Error validation atau login attempt
```

---

## 📊 Comparison: Lokal vs Deployed

| Aspek | Lokal (file://) | Lokal (http://) | Deployed (https://) |
|-------|-----------------|-----------------|---------------------|
| **CORS** | ⚠️ Restricted | ✅ OK | ✅ OK |
| **Modules** | ❌ Not allowed | ✅ OK | ✅ OK |
| **localStorage** | ✅ OK | ✅ OK | ✅ OK |
| **CDN** | ✅ OK | ✅ OK | ✅ OK |
| **Relative paths** | ✅ OK | ✅ OK | ⚠️ Depends |

---

## 🎯 Recommended Testing Order

### 1. Test Minimal (Paling Simple)
```
File: login-test-minimal.html
Method: Double click
Expected: Login works
```

### 2. Test Simple (Dengan Tailwind)
```
File: index-simple.html
Method: Double click
Expected: Login works with styling
```

### 3. Test Full (Dengan Server)
```
File: index.html
Method: Local server (http://localhost:8000)
Expected: All features work
```

### 4. Test Deployed
```
URL: https://fachrieradiyan.github.io/WEB-PERBANKAN/
Method: Browser
Expected: Same as local server
```

---

## 🐛 Common Issues & Solutions

### Issue 1: File Not Found

**Error:** `Failed to load resource: net::ERR_FILE_NOT_FOUND`

**Solution:**
```
1. Check file path:
   ✅ js/advanced-smooth-animation.js
   ❌ /js/advanced-smooth-animation.js

2. Check file exists:
   ls js/
   
3. Check case sensitivity:
   main.js ≠ Main.js
```

### Issue 2: CORS Error

**Error:** `Access to script blocked by CORS policy`

**Solution:**
```
1. Jangan buka dengan file://
2. Gunakan local server (http://)
3. Atau disable CORS (temporary):
   Chrome: --disable-web-security
```

### Issue 3: Function Not Defined

**Error:** `Uncaught ReferenceError: login is not defined`

**Solution:**
```
1. Check main.js dimuat:
   F12 → Network → main.js (200 OK?)

2. Check syntax error:
   F12 → Console → Syntax error?

3. Check function exists:
   Console: typeof login
```

### Issue 4: localStorage Blocked

**Error:** `Failed to read the 'localStorage' property`

**Solution:**
```
1. Jangan gunakan Incognito
2. Enable cookies di Settings
3. Test di browser lain
```

---

## ✅ Success Checklist

### Lokal Testing:
- [ ] login-test-minimal.html works
- [ ] index-simple.html works
- [ ] index.html works (with local server)
- [ ] No console errors
- [ ] Login successful
- [ ] Data persists after refresh

### Deployed Testing:
- [ ] GitHub Pages enabled
- [ ] URL accessible
- [ ] No 404 errors
- [ ] Login works
- [ ] Same behavior as local

---

## 🎯 Quick Commands

### Test Lokal:
```bash
# Python
python -m http.server 8000

# PHP
php -S localhost:8000

# Node.js
npx http-server -p 8000
```

### Open Browser:
```
http://localhost:8000
http://localhost:8000/login-test-minimal.html
http://localhost:8000/index-simple.html
http://localhost:8000/index.html
```

---

## 📞 Jika Masih Gagal

### Langkah Terakhir:

1. **Test login-test-minimal.html**
   - Jika gagal → Browser issue
   - Jika berhasil → Lanjut step 2

2. **Test index-simple.html**
   - Jika gagal → CDN issue
   - Jika berhasil → Lanjut step 3

3. **Test index.html dengan local server**
   - Jika gagal → Code issue
   - Jika berhasil → Deployment issue

4. **Report dengan info:**
   ```
   - File mana yang berhasil?
   - File mana yang gagal?
   - Error message (screenshot)
   - Browser & version
   - Testing method (file:// atau http://)
   ```

---

## 🎉 Kesimpulan

**Test Order:**
1. ✅ login-test-minimal.html (double click)
2. ✅ index-simple.html (double click)
3. ✅ index.html (local server)
4. ✅ Deployed URL

**Jika Step 1 berhasil:**
→ Browser OK, masalah di code atau deployment

**Jika Step 1 gagal:**
→ Browser issue, test di browser lain

---

**Last Updated:** 12 Mei 2026  
**Status:** ✅ Ready for Testing  
**Version:** 2.3
