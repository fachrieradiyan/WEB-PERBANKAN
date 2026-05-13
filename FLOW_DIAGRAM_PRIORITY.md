# 🔄 FLOW DIAGRAM - PRIORITY ACCOUNT AUTO-UPDATE

## 📊 VISUAL FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER LOGIN                                   │
│                              ↓                                       │
│                    Load User Data from localStorage                  │
│                              ↓                                       │
│                    Check: isPriority = true?                         │
│                         ↙         ↘                                  │
│                    YES              NO                               │
│                     ↓                ↓                               │
│            Show Priority Badge   Show Regular Badge                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    USER DEPOSITS MONEY                               │
│                              ↓                                       │
│                    totalDeposit += amount                            │
│                              ↓                                       │
│              Check: totalDeposit >= 100 Miliar?                      │
│                         ↙         ↘                                  │
│                    YES              NO                               │
│                     ↓                ↓                               │
│            UPGRADE PRIORITY      Normal Deposit                      │
│                     ↓                ↓                               │
│            isPriority = true     End Process                         │
│                     ↓                                                │
│         Show Upgrade Notification Modal                              │
│                     ↓                                                │
│            Update Badge Display                                      │
│                     ↓                                                │
│    ┌────────────────────────────────────────┐                       │
│    │ Check: User on Profile Page?           │                       │
│    │         ↙              ↘                │                       │
│    │      YES               NO               │                       │
│    │       ↓                 ↓               │                       │
│    │ renderProfilePage()   Wait for user    │ ⭐ AUTO-REFRESH!      │
│    │       ↓              to open Profile    │                       │
│    │ Section Priority                        │                       │
│    │ Account Info                            │                       │
│    │ appears instantly!                      │                       │
│    └────────────────────────────────────────┘                       │
│                     ↓                                                │
│            Save to localStorage                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    USER OPENS PROFILE PAGE                           │
│                              ↓                                       │
│                    renderProfilePage() called                        │
│                              ↓                                       │
│                    Check: isPriority = true?                         │
│                         ↙         ↘                                  │
│                    YES              NO                               │
│                     ↓                ↓                               │
│    Show Priority Account Info    Hide Priority Section              │
│    - Badge: ⭐ PRIORITY Account                                      │
│    - 4 Benefit Cards                                                 │
│    - Gold Background                                                 │
│    - Animation: slideIn                                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 DETAILED FLOW: UPGRADE SCENARIO

### Scenario 1: User di Dashboard saat Upgrade

```
┌──────────────┐
│   Dashboard  │
│   (Active)   │
└──────┬───────┘
       │
       ↓
┌──────────────────────┐
│ User Setor 100M      │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ isPriority = true    │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Modal Notification   │
│ "SELAMAT!"           │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Badge Update         │
│ ⭐ PRIORITY          │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Check currentPage    │
│ = "dashboard"        │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ NO auto-refresh      │
│ (not on profile)     │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ User clicks Profile  │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ renderProfilePage()  │
│ Section appears ✅   │
└──────────────────────┘
```

### Scenario 2: User di Profil saat Upgrade ⭐ BARU!

```
┌──────────────┐
│   Profile    │
│   (Active)   │
└──────┬───────┘
       │
       ↓
┌──────────────────────┐
│ User clicks Dashboard│
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ User Setor 100M      │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ isPriority = true    │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Modal Notification   │
│ "SELAMAT!"           │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Badge Update         │
│ ⭐ PRIORITY          │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Check currentPage    │
│ = "profile"          │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ YES! Auto-refresh    │ ⭐ KEY FEATURE!
│ renderProfilePage()  │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ User clicks Profile  │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│ Section ALREADY      │
│ visible! ✅          │
│ (no manual refresh)  │
└──────────────────────┘
```

---

## 🔍 CODE FLOW DIAGRAM

### deposit() Function Flow:

```javascript
function deposit() {
    // 1. Get amount
    const amount = getNumericValue(amountInput);
    
    // 2. Validation
    if (!amount || amount <= 0) return;
    
    // 3. Check Priority status BEFORE deposit
    const wasNotPriority = !isPriority && !isVIP;
    
    // 4. Update balance
    balance += amount;
    totalDeposit += amount;
    
    // 5. Check for Priority upgrade
    if (wasNotPriority && totalDeposit >= 100000000000) {
        isPriority = true;
        
        // 6. Show notification after 500ms
        setTimeout(() => {
            showPriorityUpgradeNotification();
            updateUserDisplay();
            
            // 7. ⭐ AUTO-REFRESH PROFILE IF ACTIVE
            const currentPage = localStorage.getItem('currentPage');
            if (currentPage === 'profile') {
                renderProfilePage();  // ← KEY LINE!
            }
        }, 500);
    }
    
    // 8. Update display & save
    updateDisplay();
    saveUserData();
}
```

### renderProfilePage() Function Flow:

```javascript
function renderProfilePage() {
    // 1. Get user data
    const displayName = getCurrentDisplayName();
    
    // 2. Update profile header
    updateProfileHeader(displayName);
    
    // 3. Update badge display
    if (isVIP) {
        showVIPBadge();
    } else if (isPriority) {
        showPriorityBadge();  // ⭐ PRIORITY
    } else {
        showRegularBadge();
    }
    
    // 4. ⭐ SHOW/HIDE PRIORITY SECTION
    const prioritySection = document.getElementById('priorityAccountInfo');
    if (isPriority && !isVIP) {
        prioritySection.style.display = 'block';
        prioritySection.style.animation = 'slideIn 0.5s ease-out';
    } else {
        prioritySection.style.display = 'none';
    }
    
    // 5. Update portfolio values
    updatePortfolioValues();
}
```

---

## 🎨 STATE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                      USER STATES                             │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │   LOGGED     │
    │     OUT      │
    └──────┬───────┘
           │ login()
           ↓
    ┌──────────────┐
    │   REGULAR    │
    │   ACCOUNT    │
    │ isPriority=  │
    │    false     │
    └──────┬───────┘
           │ deposit()
           │ totalDeposit >= 100M
           ↓
    ┌──────────────┐
    │  PRIORITY    │
    │   ACCOUNT    │
    │ isPriority=  │
    │    true      │
    └──────┬───────┘
           │ logout()
           ↓
    ┌──────────────┐
    │   LOGGED     │
    │     OUT      │
    └──────────────┘
```

---

## 📱 PAGE STATE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                      PAGE STATES                             │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  Dashboard   │
    │ currentPage= │
    │ "dashboard"  │
    └──────┬───────┘
           │ switchPage('profile')
           ↓
    ┌──────────────┐
    │   Profile    │
    │ currentPage= │
    │  "profile"   │
    │      ↓       │
    │ renderProfile│
    │   Page()     │
    │      ↓       │
    │ Check        │
    │ isPriority   │
    │      ↓       │
    │ Show/Hide    │
    │ Priority     │
    │ Section      │
    └──────────────┘
```

---

## 🔄 DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA FLOW                               │
└─────────────────────────────────────────────────────────────┘

User Input (Deposit)
        ↓
    JavaScript
    (main.js)
        ↓
    Update State
    (isPriority)
        ↓
    localStorage
    (persist)
        ↓
    ┌─────────────────┐
    │ Check Page      │
    │ currentPage?    │
    └────┬────────────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
Profile    Other
Page       Page
    │         │
    ↓         │
renderProfile │
Page()        │
    │         │
    ↓         │
Update UI     │
    │         │
    └────┬────┘
         │
         ↓
    User sees
    Priority
    Section
```

---

## ✅ DECISION TREE

```
User Deposits Money
        │
        ↓
totalDeposit >= 100M?
        │
    ┌───┴───┐
    │       │
   YES     NO
    │       │
    ↓       ↓
Upgrade   Normal
Priority  Deposit
    │       │
    ↓       └──→ END
isPriority
= true
    │
    ↓
Show Modal
    │
    ↓
Update Badge
    │
    ↓
currentPage
= "profile"?
    │
┌───┴───┐
│       │
YES    NO
│       │
↓       ↓
Auto    Wait
Refresh for
Profile User
│       │
↓       ↓
Section User
appears opens
instant Profile
│       │
└───┬───┘
    │
    ↓
  END
```

---

## 🎯 SUMMARY

### Key Points:

1. **Auto-Upgrade**: Terjadi saat `totalDeposit >= 100000000000`
2. **Badge Update**: Otomatis update di header dan profil
3. **Modal Notification**: Muncul dengan delay 500ms
4. **Auto-Refresh**: ⭐ Profil refresh otomatis jika `currentPage === 'profile'`
5. **Data Persistence**: Status tersimpan di localStorage
6. **Edge Cases**: Semua skenario sudah di-handle

### Flow Highlights:

- ✅ Smooth transition dari Regular ke Priority
- ✅ Visual feedback yang jelas (modal + badge)
- ✅ Auto-refresh profil tanpa reload manual ⭐
- ✅ Data persistence yang reliable
- ✅ Edge cases covered

---

**Dibuat:** 12 Mei 2026  
**Status:** ✅ SELESAI  
**Versi:** 2.0 (Final)
