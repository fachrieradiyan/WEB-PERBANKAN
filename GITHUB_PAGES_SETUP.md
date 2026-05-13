# 🔧 GitHub Pages Setup - Fix 404 Error

## ❌ Problem: 404 Error
URL `https://fachrieradiyan.github.io/WEB-PERBANKAN/` menampilkan 404.

## 🔍 Possible Causes:
1. GitHub Pages belum diaktifkan
2. Branch settings salah
3. Repository visibility (private vs public)
4. Build masih dalam proses

## ✅ Solution: Aktifkan GitHub Pages

### Method 1: Via GitHub Web Interface (RECOMMENDED)

#### Step 1: Buka Repository Settings
1. Buka browser, login ke GitHub
2. Go to: `https://github.com/fachrieradiyan/WEB-PERBANKAN`
3. Klik tab **"Settings"** (icon gear ⚙️)

#### Step 2: Aktifkan GitHub Pages
1. Scroll ke bawah di sidebar kiri
2. Klik **"Pages"** (di bawah section "Code and automation")
3. Di section **"Build and deployment"**:
   - **Source**: Pilih **"Deploy from a branch"**
   - **Branch**: Pilih **"main"** dan folder **"/ (root)"**
   - Klik **"Save"**

#### Step 3: Tunggu Build
1. Akan muncul notifikasi: "GitHub Pages source saved"
2. Tunggu 1-2 menit untuk build
3. Refresh halaman Settings → Pages
4. Akan muncul: **"Your site is live at https://fachrieradiyan.github.io/WEB-PERBANKAN/"**

### Method 2: Check Repository Visibility

#### Pastikan Repository PUBLIC:
1. Di Settings → General
2. Scroll ke bawah ke section **"Danger Zone"**
3. Check visibility:
   - Jika **Private**: Klik "Change visibility" → "Make public"
   - Jika **Public**: ✅ Sudah benar

**Note:** GitHub Pages gratis hanya untuk public repositories!

### Method 3: Force Rebuild

#### Trigger rebuild dengan empty commit:
```bash
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin main
```

## 🧪 Verification Steps

### 1. Check GitHub Pages Status
Go to: `https://github.com/fachrieradiyan/WEB-PERBANKAN/settings/pages`

Should show:
```
✅ Your site is live at https://fachrieradiyan.github.io/WEB-PERBANKAN/
```

### 2. Check GitHub Actions
Go to: `https://github.com/fachrieradiyan/WEB-PERBANKAN/actions`

Should show:
```
✅ pages build and deployment (green checkmark)
```

### 3. Test URL
Open: `https://fachrieradiyan.github.io/WEB-PERBANKAN/`

Should show: INVANKRI login page

## 🐛 Troubleshooting

### Still 404 after enabling?
1. **Wait longer**: First build can take 5-10 minutes
2. **Clear cache**: Ctrl+Shift+R or Incognito mode
3. **Check Actions**: Look for errors in GitHub Actions tab

### Repository is Private?
GitHub Pages free tier requires **public repository**:
1. Settings → General → Danger Zone
2. "Change visibility" → "Make public"
3. Confirm

### Wrong branch?
Make sure:
- Branch: **main** (not master, not gh-pages)
- Folder: **/ (root)** (not /docs)

### Build failed?
Check GitHub Actions for errors:
1. Go to Actions tab
2. Click latest workflow
3. Check logs for errors

## 📋 Quick Checklist

Before testing URL, verify:
- [ ] Repository is **PUBLIC**
- [ ] GitHub Pages is **ENABLED** in Settings
- [ ] Source is set to **"main" branch, "/ (root)" folder**
- [ ] Latest commit shows in Actions with **green checkmark**
- [ ] Settings → Pages shows **"Your site is live at..."**
- [ ] Waited at least **2-5 minutes** after enabling

## 🎯 Expected Timeline

```
Enable GitHub Pages     → 0 minutes
First build starts      → 30 seconds
Build completes         → 1-2 minutes
DNS propagation         → 2-5 minutes
Site is live            → 5 minutes total (first time)
```

Subsequent updates: 1-2 minutes

## 📞 Next Steps

1. **Go to GitHub Settings → Pages NOW**
2. **Enable GitHub Pages** (main branch, root folder)
3. **Wait 5 minutes**
4. **Test URL again**
5. **Report back** with result

## 🔗 Quick Links

- Repository: https://github.com/fachrieradiyan/WEB-PERBANKAN
- Settings: https://github.com/fachrieradiyan/WEB-PERBANKAN/settings
- Pages Settings: https://github.com/fachrieradiyan/WEB-PERBANKAN/settings/pages
- Actions: https://github.com/fachrieradiyan/WEB-PERBANKAN/actions
- Expected URL: https://fachrieradiyan.github.io/WEB-PERBANKAN/

---

**IMPORTANT:** GitHub Pages harus diaktifkan **MANUAL** via web interface!
