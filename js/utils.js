// ============================================================
// GIFTAAN - Shared Utilities
// ============================================================
import { db, auth } from './firebase-config.js';
import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp,
  collection, getDocs, query, where, orderBy, limit,
  addDoc, deleteDoc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── Toast Notifications ──────────────────────────────────────
export function toast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── Get User Document ────────────────────────────────────────
export async function getUser(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}

// ── Get User by Username ─────────────────────────────────────
export async function getUserByUsername(username) {
  const q = query(collection(db, 'users'), where('username', '==', username.toLowerCase()), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { uid: d.id, ...d.data() };
}

// ── Render Navbar ────────────────────────────────────────────
export async function renderNav(currentUser) {
  const actions = document.getElementById('navActions');
  if (!actions) return;
  if (!currentUser) {
    actions.innerHTML = `
      <a href="auth.html" class="btn btn-ghost btn-sm">Sign In</a>
      <a href="auth.html?mode=register" class="btn btn-primary btn-sm">Join Free</a>
    `;
    return;
  }
  const u = await getUser(currentUser.uid);
  // Check pending requests
  const pendingQ = query(collection(db, 'users', currentUser.uid, 'connectionRequests'), where('status','==','pending'));
  const pendingSnap = await getDocs(pendingQ);
  const hasPending = !pendingSnap.empty;

  actions.innerHTML = `
    <a href="profile.html?u=${u?.username||''}" class="btn btn-ghost btn-sm">My Profile</a>
    <div class="dropdown">
      <div class="nav-avatar" id="navAvatarBtn" style="cursor:pointer;position:relative;">
        ${u?.avatarEmoji ? `<span style="font-size:20px">${u.avatarEmoji}</span>` : u?.photoURL ? `<img src="${u.photoURL}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;" referrerpolicy="no-referrer"/>` : (u?.displayName||'U')[0].toUpperCase()}
        ${hasPending ? '<span class="nav-dot"></span>' : ''}
      </div>
      <div class="dropdown-menu" id="navDropdown">
        <a href="dashboard.html" class="dropdown-item">🏠 Dashboard</a>
        <a href="connections.html" class="dropdown-item">🤝 Connections ${hasPending?'<span class="notification-badge">'+pendingSnap.size+'</span>':''}</a>
        <a href="profile-edit.html" class="dropdown-item">✏️ Edit Profile</a>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item danger" id="signOutBtn">🚪 Sign Out</div>
      </div>
    </div>
  `;

  document.getElementById('navAvatarBtn').addEventListener('click', () => {
    document.getElementById('navDropdown').classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) document.getElementById('navDropdown')?.classList.remove('open');
  });
  document.getElementById('signOutBtn').addEventListener('click', async () => {
    const { signOut } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    await signOut(auth);
    window.location.href = 'index.html';
  });
}

// ── Search Component ─────────────────────────────────────────
export function initSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;
  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    const v = input.value.trim();
    if (v.length < 2) { results.classList.add('hidden'); return; }
    t = setTimeout(async () => {
      const q = query(collection(db, 'users'),
        where('displayNameLower', '>=', v.toLowerCase()),
        where('displayNameLower', '<=', v.toLowerCase() + '\uf8ff'),
        limit(6));
      const snap = await getDocs(q);
      if (snap.empty) { results.classList.add('hidden'); return; }
      results.innerHTML = '';
      snap.forEach(d => {
        const u = d.data();
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
          <div class="search-result-avatar">${u.avatarEmoji ? `<span style="font-size:18px">${u.avatarEmoji}</span>` : (u.displayName||'U')[0].toUpperCase()}</div>
          <div>
            <div class="search-result-name">${u.displayName||'Unknown'}</div>
            <div class="search-result-user">@${u.username||''} · ${u.connectionCount||0} connections</div>
          </div>
        `;
        item.addEventListener('click', () => { window.location.href = `profile.html?u=${u.username}`; });
        results.appendChild(item);
      });
      results.classList.remove('hidden');
    }, 300);
  });
  document.addEventListener('click', e => { if (!e.target.closest('#'+inputId) && !e.target.closest('#'+resultsId)) results.classList.add('hidden'); });
}

// ── Word Count ───────────────────────────────────────────────
export function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// ── Available Avatars ────────────────────────────────────────
export const AVATARS = ['🦁','🐯','🦊','🐻','🐼','🐨','🦋','🌸','🌺','🎭','🎪','🎨','🌈','⭐','🌙','🎁','💎','🔮','🏆','🎯'];

// ── Preset Categories ────────────────────────────────────────
export const PRESET_CATEGORIES = [
  'Electronics','Books','Clothing','Home & Kitchen','Beauty & Personal Care',
  'Toys & Games','Sports & Fitness','Gaming','Health','Jewellery','Other'
];

// ── Format Price ─────────────────────────────────────────────
export function formatPrice(p) {
  if (!p && p !== 0) return '';
  return '₹' + Number(p).toLocaleString('en-IN');
}
