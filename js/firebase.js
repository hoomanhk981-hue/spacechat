import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAX9wkyfDiz3MrNQeXXW97bwDB4SCqdTY",
  authDomain: "spacechat-61dce.firebaseapp.com",
  projectId: "spacechat-61dce",
  storageBucket: "spacechat-61dce.firebasestorage.app",
  messagingSenderId: "106971433331",
  appId: "1:106971433331:web:4aa33a36421d6b60f9dd06"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

