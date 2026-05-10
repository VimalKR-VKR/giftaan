# Giftaan 🎁
### Your Amazon Wishlist, Shared with Love

A free, hostable wishlist web app for sharing Amazon gift wishes with family and friends.

---

## 🚀 Full Setup Guide

Follow these steps in order. Total time: ~20 minutes.

---

## STEP 1 — Set Up Firebase (10 min)

### 1.1 Create Firebase Project
1. Go to **https://firebase.google.com** → click **Get Started**
2. Click **Add Project** → name it `giftaan-vkr` → Disable analytics → **Create Project**

### 1.2 Enable Authentication
1. Left sidebar → **Build → Authentication** → **Get Started**
2. **Sign-in method** tab:
   - Click **Email/Password** → Enable → Save
   - Click **Google** → Enable → set your Gmail as support email → Save

### 1.3 Create Firestore Database
1. Left sidebar → **Build → Firestore Database** → **Create database**
2. Choose **Start in test mode** → Next
3. Region: **asia-south1 (Mumbai)** → **Enable**

### 1.4 Add Firestore Security Rules
1. In Firestore → **Rules** tab
2. Delete all existing content and paste the contents of `firestore.rules` (included in this repo)
3. Click **Publish**

### 1.5 Add Firestore Indexes
1. In Firestore → **Indexes** tab
2. Click **Import** (if available) or manually add:
   - Collection: `users` | Field: `displayNameLower` (Ascending)
   - Collection: `products` | Fields: `addedAt` (Descending)
   - Collection: `products` | Fields: `price` (Ascending)

> **Note:** Firestore will also prompt you to create missing indexes the first time a query runs — just click the link in the browser console.

### 1.6 Get Firebase Config
1. **Project Settings** (gear icon, top left) → scroll to **Your apps**
2. Click **</>** (Web) → register with nickname `giftaan-web`
3. Copy the config block shown

---

## STEP 2 — Add Your Affiliate Tag

1. Open the file `js/firebase-config.js`
2. Find this line:
   ```js
   export const AFFILIATE_TAG = "YOUR-AFFILIATE-TAG-21";
   ```
3. Replace `YOUR-AFFILIATE-TAG-21` with your actual Amazon affiliate tag (e.g. `vimalkr-21`)
4. Save the file

> **Don't have an affiliate tag yet?** Leave the placeholder. The app still works — you just won't earn commissions until you add it. You can update this anytime.

---

## STEP 3 — Upload to GitHub (5 min)

### 3.1 Create Repository
1. Go to **https://github.com** → click **+** → **New repository**
2. Repository name: `giftaan`
3. Set to **Public** → check **Add a README file** → **Create repository**

### 3.2 Upload Files
**Option A — GitHub Web Interface (easiest)**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop ALL files from the giftaan folder (maintain folder structure)
3. Write a commit message: "Initial upload" → click **Commit changes**

**Option B — GitHub Desktop App**
1. Download GitHub Desktop from https://desktop.github.com
2. Clone your repo → copy all giftaan files into the cloned folder
3. Commit and push

**Your file structure should look like:**
```
giftaan/
├── index.html
├── auth.html
├── dashboard.html
├── profile.html
├── profile-edit.html
├── connections.html
├── firestore.rules
├── firestore.indexes.json
├── css/
│   └── styles.css
└── js/
    ├── firebase-config.js
    ├── utils.js
    └── README.md
```

### 3.3 Enable GitHub Pages
1. In your repo → **Settings** → left sidebar → **Pages**
2. Under **Source** → **Deploy from a branch**
3. Branch: `main` | Folder: `/ (root)` → **Save**
4. Wait 2–3 minutes. Your site will be live at:
   > **https://VimalKR-VKR.github.io/giftaan**

---

## STEP 4 — Connect Domain to Firebase (2 min)

1. Copy your GitHub Pages URL: `https://VimalKR-VKR.github.io`
2. In Firebase Console → **Authentication** → **Settings** tab
3. Under **Authorized domains** → **Add domain**
4. Paste `vimalkr-vkr.github.io` → **Add**

---

## STEP 5 — Add Your Website to Amazon Associates

Once your site is live:
1. Go to **https://affiliate-program.amazon.in**
2. Sign in → click your name → **Account Settings**
3. Find **Website and Mobile App List** → **Edit**
4. Add: `https://VimalKR-VKR.github.io/giftaan`
5. Save

---

## ✅ You're Live!

Your app is now available at: **https://VimalKR-VKR.github.io/giftaan**

**Test it:**
1. Visit the URL → create an account
2. Go to Edit Profile → fill in your details
3. Go to Dashboard → add a product from Amazon
4. Copy your profile link and share it on WhatsApp!

---

## 🔮 Future Improvements

### Easy to add
- Profile photo upload (Firebase Storage)
- Amazon product image auto-fetch
- Email notifications for connection requests (Firebase Functions)
- Priority levels for products (High / Medium / Low)
- "Already gifted" mark by connections

### Medium term
- Occasions/events tagging (Birthday, Wedding, etc.)
- Group gifting (multiple people chip in)
- QR code generator for your profile
- PWA — install as app on phone

### Long term
- Custom domain (gifta.in or similar)
- Flipkart / Meesho affiliate support
- Analytics (who viewed your wishlist)
- Premium features

---

## 🛠️ Making Changes Later

To update any file:
1. Go to your GitHub repo
2. Click on the file → click the **pencil icon** (Edit)
3. Make your changes → **Commit changes**
4. GitHub Pages will update automatically in ~2 minutes

---

## ❓ Troubleshooting

| Problem | Solution |
|---|---|
| Google Sign-In popup fails | Make sure your domain is in Firebase Authorized Domains |
| "Permission denied" errors | Re-check your Firestore Security Rules |
| Products not saving | Make sure you're signed in |
| Search not working | Firestore needs `displayNameLower` index — check browser console for link |
| Page shows blank | Open browser DevTools (F12) → Console tab — check for error messages |

---

## 📞 Updating Your Affiliate Tag

When you get your Amazon affiliate tag:
1. Open `js/firebase-config.js` on GitHub
2. Replace `YOUR-AFFILIATE-TAG-21` with your tag
3. Commit the change
4. All new product links will use your tag going forward

---

*Built with Firebase + Vanilla JS · Hosted on GitHub Pages · No monthly cost*
