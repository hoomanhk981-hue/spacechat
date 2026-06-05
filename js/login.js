import { auth }
from "./firebase.js";

import {
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider =
new GoogleAuthProvider();

document
.getElementById("googleLogin")
.addEventListener(
"click",
async()=>{

try{

await signInWithPopup(
auth,
provider
);

window.location =
"setup.html";

}
catch(err){

console.log(err);

}

}
);

onAuthStateChanged(
auth,
(user)=>{

if(user){

window.location =
"setup.html";

}

}
);