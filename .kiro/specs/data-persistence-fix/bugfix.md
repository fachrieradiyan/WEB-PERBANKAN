# Bugfix Requirements Document

## Introduction

This document addresses a critical data persistence bug in the banking web application where user data (balance, stock portfolio, and cryptocurrency portfolio) resets to zero after a page refresh. The application uses localStorage for data persistence, but the data is not being properly restored when users log back in after refreshing the page. This bug severely impacts user experience as all transaction history, investments, and account balances are lost, requiring users to start from scratch after each page refresh.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user logs in, makes transactions (deposit, buy stocks, buy crypto), refreshes the page (F5), and logs in again THEN the system resets balance to 0, stocks portfolio to empty, and crypto portfolio to empty

1.2 WHEN a user has owned stocks with quantity > 0 and refreshes the page THEN the system displays owned = 0 for all stocks after re-login

1.3 WHEN a user has owned cryptos with quantity > 0 and refreshes the page THEN the system displays owned = 0 for all cryptos after re-login

1.4 WHEN a user has a non-zero balance and refreshes the page THEN the system displays balance = 0 after re-login

1.5 WHEN a user has transaction history and refreshes the page THEN the system may lose transaction records after re-login

### Expected Behavior (Correct)

2.1 WHEN a user logs in, makes transactions (deposit, buy stocks, buy crypto), refreshes the page (F5), and logs in again THEN the system SHALL restore the exact balance, stocks portfolio (with correct owned quantities and buyPrice), and crypto portfolio (with correct owned quantities and buyPrice) from localStorage

2.2 WHEN a user has owned stocks with quantity > 0 and refreshes the page THEN the system SHALL display the correct owned quantity for each stock after re-login by loading from localStorage

2.3 WHEN a user has owned cryptos with quantity > 0 and refreshes the page THEN the system SHALL display the correct owned quantity for each crypto after re-login by loading from localStorage

2.4 WHEN a user has a non-zero balance and refreshes the page THEN the system SHALL display the exact same balance after re-login by loading from localStorage

2.5 WHEN a user has transaction history and refreshes the page THEN the system SHALL restore all transaction records after re-login by loading from localStorage

### Expected Behavior (Correct) - Browser-Specific Edge Cases

2.6 WHEN localStorage is not available (browser in private/incognito mode or localStorage disabled) THEN the system SHALL display a warning notification to the user that data will not persist across sessions

2.7 WHEN localStorage quota is exceeded during saveUserData() THEN the system SHALL catch the QuotaExceededError and display an error notification to the user

2.8 WHEN localStorage data is corrupted or invalid JSON THEN the system SHALL handle the parsing error gracefully and initialize with default values without crashing

2.9 WHEN a user opens the application in file:// protocol and localStorage is restricted THEN the system SHALL detect the restriction and notify the user to use a local server instead

2.10 WHEN existing user data in localStorage is missing the stocks or cryptos arrays (old data format) THEN the system SHALL initialize those arrays as empty arrays without losing other user data

2.11 WHEN existing user data in localStorage has stocks or cryptos without buyPrice property THEN the system SHALL default buyPrice to the current price for those assets

2.12 WHEN existing user data in localStorage has invalid or negative values for balance, owned quantities, or prices THEN the system SHALL sanitize the data by setting invalid values to 0 or default values

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user registers a new account THEN the system SHALL CONTINUE TO create a new user with balance = 0, empty stocks array, empty cryptos array, and empty transactions array

3.2 WHEN a user makes a deposit transaction THEN the system SHALL CONTINUE TO save the updated balance immediately to localStorage via saveUserData()

3.3 WHEN a user buys or sells stocks THEN the system SHALL CONTINUE TO save the updated stock portfolio immediately to localStorage via saveUserData()

3.4 WHEN a user buys or sells crypto THEN the system SHALL CONTINUE TO save the updated crypto portfolio immediately to localStorage via saveUserData()

3.5 WHEN a user logs out THEN the system SHALL CONTINUE TO clear currentUser from localStorage and reset all in-memory state variables

3.6 WHEN saveUserData() is called THEN the system SHALL CONTINUE TO filter stocks and cryptos to only save items with owned > 0

3.7 WHEN a VIP account logs in THEN the system SHALL CONTINUE TO skip saving data to localStorage (VIP accounts are hardcoded)

3.8 WHEN loadUserData() is called for a non-existent user THEN the system SHALL CONTINUE TO initialize with default values (balance = 0, empty arrays)

3.9 WHEN the browser supports localStorage and it is enabled THEN the system SHALL CONTINUE TO use localStorage for data persistence

3.10 WHEN multiple browser tabs are open with the same user THEN the system SHALL CONTINUE TO operate independently per tab (no cross-tab synchronization required)
