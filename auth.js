import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, GithubAuthProvider,
  signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCwZt8aT-p0m3SmFgK1d4Wf-NLA_gAS3QM",
  authDomain: "code-with-muaaz.firebaseapp.com",
  projectId: "code-with-muaaz",
  storageBucket: "code-with-muaaz.appspot.com",
  messagingSenderId: "1037723136909",
  appId: "1:1037723136909:web:fac0ae41446221b6e683c4",
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const vipEmails = [
  "muaazaliwork@gmail.com",
  "codewithmuaaz@gmail.com"
];


const loginBtn = document.getElementById("loginBtn");
const userProfile = document.getElementById("userProfile");
const navAvatar = document.getElementById("navAvatar");
const navName = document.getElementById("navName");
const logoutBtn = document.getElementById("logoutBtn");


const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const githubLoginBtn = document.getElementById("githubLoginBtn");

loginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});


closeModal.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});


googleLoginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    loginModal.classList.add("hidden");
  } catch (err) {
    alert(err.message);
  }
});


githubLoginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, githubProvider);
    loginModal.classList.add("hidden");
  } catch (err) {
    alert(err.message);
  }
});


logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});


onAuthStateChanged(auth, (user) => {
  if (user) {
   
    loginBtn.style.display = "none";
    userProfile.style.display = "flex";

    navAvatar.src = user.photoURL || "https://www.gravatar.com/avatar/?d=mp";

   
    const isVIP = vipEmails.includes((user.email || "").toLowerCase());

   
    navName.innerHTML = `
      ${user.displayName || "User"}
      ${isVIP ? `
        <span class="verified-badge" title="Verified account">
          <svg role="img" aria-label="Verified account" width="16" height="16" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#1d9bf0"></circle>
            <path d="M9.2 12.5l2.1 2.1 4.5-4.9" 
              stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </span>
      ` : ""}
    `;
  } else {
   
    loginBtn.style.display = "inline-block";
    userProfile.style.display = "none";
  }
});
