import { auth, db }
from "./firebase.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(
auth,
(user)=>{

if(!user){

window.location =
"index.html";

}

}
);

document
.getElementById("saveBtn")
.onclick = async()=>{

const username =
document
.getElementById("username")
.value
.trim();

if(!username){

alert("نام کاربری وارد نشده");

return;

}

await setDoc(
doc(
db,
"users",
auth.currentUser.uid
),
{
uid:auth.currentUser.uid,
username,
email:auth.currentUser.email,
photoURL:auth.currentUser.photoURL,

online:true,
lastSeen:Date.now()
}
);

window.location =
"chat.html";

};