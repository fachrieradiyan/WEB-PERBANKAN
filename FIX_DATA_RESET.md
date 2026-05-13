# 🔧 FIX: Data Reset Issue

## 🐛 Masalah
Portofolio saham dan crypto ter-reset setelah refresh halaman.

## 🔍 Cara Debug

### Step 1: Buka Test Storage Tool
```
Double-click: test-storage.html
```

Tool ini akan menampilkan:
- ✅ Status localStorage
- 👤 Data user saat ini
- 📊 Semua stocks dan cryptos yang tersimpan
- 🔍 Semua users yang terdaftar

### Step 2: Test Persistence

1. **Buka aplikasi** (index.html)
2. **Login** dengan akun Anda
3. **Buka Console** (F12)
4. **Lakukan transaksi**:
   ```
   - Setor Rp 10.000.000
   - Beli saham BBCA 10 lembar
   - Beli crypto BTC 0.001 koin
   ```

5. **Cek Console Log** - Harus muncul:
   ```
   Deposit saved - Balance: 10000000
   Stock bought - BBCA: 10 shares, Balance: XXXX
   Data saved for user: username
   Crypto bought - BTC: 0.001 coins, Balance: XXXX
   Data saved for user: username
   ```

6. **Buka test-storage.html**
7. **Klik "Show Current User"**
8. **Verifikasi data**:
   - Balance harus sesuai
   - Stocks harus ada (BBCA: 10 shares)
   - Cryptos harus ada (BTC: 0.001 coins)

9. **Kembali ke aplikasi** (index.html)
10. **Refresh halaman** (F5)
11. **Login lagi**
12. **Cek Console Log** - Harus muncul:
    ```
    === LOADING USER DATA ===
    Current user: username
    Loaded balance: XXXX
    Loading stocks: 1
      - BBCA: 10 shares @ Rp 9500
    Loading cryptos: 1
      - BTC: 0.001 coins @ Rp 950000000
    === DATA LOADED ===
    ```

13. **Cek Dashboard**:
    - Balance harus sama
    - Saham harus masih ada
    - Crypto harus masih ada

## ❌ Jika Data Masih Reset

### Kemungkinan 1: Browser Mode
- ✅ Pastikan BUKAN Incognito/Private mode
- ✅ Pastikan localStorage tidak disabled

### Kemungkinan 2: Browser Settings
1. Buka Settings
2. Cari "Site Settings" atau "Privacy"
3. Pastikan "Cookies and site data" ALLOWED
4. Pastikan "Block third-party cookies" TIDAK aktif untuk localhost

### Kemungkinan 3: File Protocol Issue
Jika membuka dengan `file:///`:
1. Beberapa browser membatasi localStorage untuk file protocol
2. **Solusi**: Gunakan local server
   ```
   # Python 3
   python -m http.server 8000
   
   # Atau gunakan VS Code Live Server
   ```
3. Buka: `http://localhost:8000/index.html`

### Kemungkinan 4: Console Error
1. Buka Console (F12)
2. Cek apakah ada error merah
3. Screenshot dan laporkan

## 🧪 Manual Test di Console

Paste code ini di Console (F12):

```javascript
// Test 1: Cek localStorage
console.log('=== TEST LOCALSTORAGE ===');
console.log('Available:', typeof(Storage) !== "undefined");

// Test 2: Simpan data test
localStorage.setItem('test', 'hello');
console.log('Test write:', localStorage.getItem('test'));

// Test 3: Cek current user
console.log('Current user:', localStorage.getItem('currentUser'));

// Test 4: Cek user data
const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
const currentUser = localStorage.getItem('currentUser');
console.log('User data:', users[currentUser]);

// Test 5: Cek stocks
if (users[currentUser] && users[currentUser].stocks) {
    console.log('Stocks:', users[currentUser].stocks);
} else {
    console.log('No stocks data');
}

// Test 6: Cek cryptos
if (users[currentUser] && users[currentUser].cryptos) {
    console.log('Cryptos:', users[currentUser].cryptos);
} else {
    console.log('No cryptos data');
}
```

## 📊 Expected Output

Setelah transaksi dan refresh, Console harus menampilkan:

```
=== LOADING USER DATA ===
Current user: testuser
Users in localStorage: ["testuser"]
Loaded balance: 9050000
Loaded transactions: 3
Loading stocks: 1
  - BBCA: 10 shares @ Rp 9500
Loading cryptos: 1
  - BTC: 0.001 coins @ Rp 950000000
=== DATA LOADED ===
```

## 🔧 Force Save Function

Jika data tidak tersimpan otomatis, paste ini di Console:

```javascript
// Force save current state
function forceSave() {
    const users = JSON.parse(localStorage.getItem('bankAppUsers') || '{}');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser || !users[currentUser]) {
        console.error('No user logged in');
        return;
    }
    
    // Get current state from global variables
    users[currentUser].balance = balance;
    users[currentUser].totalDeposit = totalDeposit;
    users[currentUser].totalWithdraw = totalWithdraw;
    users[currentUser].transactions = transactions;
    users[currentUser].stocks = stocks.filter(s => s.owned > 0).map(s => ({
        id: s.id,
        owned: s.owned,
        buyPrice: s.buyPrice || s.price
    }));
    users[currentUser].cryptos = cryptos.filter(c => c.owned > 0).map(c => ({
        id: c.id,
        owned: c.owned,
        buyPrice: c.buyPrice || c.price
    }));
    
    localStorage.setItem('bankAppUsers', JSON.stringify(users));
    console.log('✓ Data force saved!');
    console.log('Balance:', balance);
    console.log('Stocks:', users[currentUser].stocks);
    console.log('Cryptos:', users[currentUser].cryptos);
}

// Run it
forceSave();
```

## 📞 Support

Jika masih bermasalah:
1. Screenshot Console log
2. Screenshot test-storage.html output
3. Sebutkan browser & versi
4. Sebutkan OS (Windows/Mac/Linux)

---

**Tools:**
- `test-storage.html` - Debug localStorage
- `DEBUG_GUIDE.txt` - Panduan lengkap
- Console (F12) - Lihat log real-time
