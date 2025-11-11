# 💰 React Native Expense Tracker

A mobile app for managing daily expenses with real-time sync, monthly reports, and visual analytics.

## 🚀 Features
* Email/password authentication (Firebase Auth)
* Add, view, categorize, and delete expenses
* Real-time expense list updates (Firestore listener)
* Monthly summary (total + breakdown by category)
* Pie chart analytics for current month
* Simple, extensible architecture (services, screens, components)

## 🛠️ Tech Stack
Expo, React Native, Firebase (Auth + Firestore), react-native-chart-kit, React Navigation

## 📂 Structure
```
react-native-expense-tracker/
	App.js
	app.json
	package.json
	firebaseConfig.js
	services/expenses.js
	navigation/AppNavigator.js
	components/ExpenseItem.js
	screens/
		LoginScreen.js
		SignupScreen.js
		ExpenseListScreen.js
		AddExpenseScreen.js
		ReportsScreen.js
		AnalyticsScreen.js
	utils/date.js
	.env.example
```

## 🔐 Environment Variables
Copy `.env.example` to `.env` (or configure another method) and fill in your Firebase project values:
```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```
For Expo, consider using `expo-constants` or `expo-config-plugins` / `react-native-dotenv` for private keys.

## ▶️ Getting Started
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Run the development server:
	 ```bash
	 npx expo start
	 ```
3. Press **i** for iOS Simulator, **a** for Android, or scan the QR code with Expo Go.

## 🧪 Testing Ideas (Not yet included)
Add Jest + React Native Testing Library for:
* Expense service logic (mock Firestore)
* Rendering of list and summary components

## 🛠️ Extensibility
* Add editing of existing expenses (currently add-only)
* Add user profile & settings (currency, dark mode)
* Offline persistence (e.g. with AsyncStorage + queue)
* Advanced charts (trend over time, category over months)

## ⚠️ Notes
* Basic validation only (amount required). Enhance for stronger UX.
* Secrets must not be committed—always use environment management.

## ✅ Next Steps
* Integrate error boundaries
* Add loading placeholders/skeletons
* Implement optimistic updates & undo

Enjoy tracking smarter spending! 💸
