// ============================================================
// GIFTAAN - Firebase Configuration
// Replace these values with your own if you ever change projects
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Rowdndh4L0qgZNhk_loCxBiQ2jjkotI",
  authDomain: "giftaan-vkr1.firebaseapp.com",
  projectId: "giftaan-vkr1",
  storageBucket: "giftaan-vkr1.firebasestorage.app",
  messagingSenderId: "1078703740457",
  appId: "1:1078703740457:web:61eb30c030a6f528eaae38",
  measurementId: "G-EDFVK78HXS"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ============================================================
// AMAZON AFFILIATE TAG
// Replace with your actual affiliate tag once you have it
// ============================================================
export const AFFILIATE_TAG = "29081-21";

export function buildAffiliateUrl(amazonUrl) {
  try {
    const url = new URL(amazonUrl);
    // Extract ASIN from various Amazon URL formats
    const asinMatch = amazonUrl.match(/\/dp\/([A-Z0-9]{10})/i) ||
                      amazonUrl.match(/\/gp\/product\/([A-Z0-9]{10})/i) ||
                      amazonUrl.match(/asin=([A-Z0-9]{10})/i);
    if (asinMatch) {
      return `https://www.amazon.in/dp/${asinMatch[1]}?tag=${AFFILIATE_TAG}`;
    }
    // If no ASIN found, just append tag
    url.searchParams.set("tag", AFFILIATE_TAG);
    return url.toString();
  } catch {
    return amazonUrl;
  }
}
