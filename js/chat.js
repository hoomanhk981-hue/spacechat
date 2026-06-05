import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentUser = null;
let selectedUser = null;
let currentChatId = "public";

// عناصر DOM
const userList = document.getElementById("userList");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatTitle = document.getElementById("chatTitle");

// ساخت chatId استاندارد
function getChatId(uid1, uid2) {
return [uid1, uid2].sort().join("_");
}

// محافظت از ورود
onAuthStateChanged(auth, (user) => {

if (!user) {
window.location = "index.html";
return;
}

currentUser = user;

// نمایش پروفایل
document.getElementById("myAvatar").src = user.photoURL;
document.getElementById("myName").innerText = user.displayName;

// لود اولیه
loadPublicChat();
loadUsers();

});

// دریافت کاربران
function loadUsers() {

onSnapshot(collection(db, "users"), (snapshot) => {

userList.innerHTML = "";

snapshot.forEach((docItem) => {

const data = docItem.data();

// خودت را نشان نده
if (data.uid === currentUser.uid) return;

const div = document.createElement("div");
div.className = "user";

div.innerHTML = `
<img src="${data.photoURL}">
<span>${data.username}</span>
<div class="status ${data.online ? "online" : "offline"}"></div>
`;

// کلیک برای PV
div.onclick = () => {

selectedUser = data;

currentChatId = getChatId(
currentUser.uid,
data.uid
);

chatTitle.innerText = data.username;

loadPrivateChat();

};

userList.appendChild(div);

});

});

}

// ارسال پیام
sendBtn.onclick = async () => {

const text = messageInput.value.trim();
if (!text) return;

// PUBLIC CHAT
if (currentChatId === "public") {

await addDoc(collection(db, "publicMessages"), {
text,
senderId: currentUser.uid,
senderName: currentUser.displayName,
photoURL: currentUser.photoURL,
timestamp: serverTimestamp()
});

}
// PRIVATE CHAT
else {

await addDoc(
collection(db, "privateChats", currentChatId, "messages"),
{
text,
senderId: currentUser.uid,
senderName: currentUser.displayName,
photoURL: currentUser.photoURL,
timestamp: serverTimestamp()
}
);

}

messageInput.value = "";
};

// چت عمومی
function loadPublicChat() {

currentChatId = "public";
chatTitle.innerText = "چت عمومی";

onSnapshot(collection(db, "publicMessages"), (snapshot) => {

messagesDiv.innerHTML = "";

snapshot.forEach((docItem) => {

const m = docItem.data();

messagesDiv.innerHTML += `
<div style="margin:10px; color:white;">
<strong style="color:#00e5ff">${m.senderName}</strong>
<br/>
<div style="background:#172554; padding:10px; border-radius:10px; display:inline-block;">
${m.text}
</div>
</div>
`;

});

});

}

// چت خصوصی
function loadPrivateChat() {

onSnapshot(
collection(db, "privateChats", currentChatId, "messages"),
(snapshot) => {

messagesDiv.innerHTML = "";

snapshot.forEach((docItem) => {

const m = docItem.data();

const isMe = m.senderId === currentUser.uid;

messagesDiv.innerHTML += `
<div style="display:flex; justify-content:${isMe ? "flex-end" : "flex-start"}; margin:8px;">
<div style="
background:${isMe ? "#00e5ff" : "#172554"};
color:${isMe ? "black" : "white"};
padding:10px;
border-radius:10px;
max-width:250px;
">
${m.text}
</div>
</div>
`;

});

});

}

// دکمه برگشت به چت عمومی
document.getElementById("publicBtn").onclick = () => {
loadPublicChat();
};