// untuk file login
const wrapper=document.querySelector(".wrapper");
signupHeader=document.querySelector(".signup header");
loginHeader= document.querySelector(".login header");
// ini kelas akan active ketika menklik .login
loginHeader.addEventListener("click",()=>{
  wrapper.classList.add("active")
})
// untuk mengkembalikan keadaan sebelumnya di klik sigup
signupHeader.addEventListener("click",()=>{
  wrapper.classList.remove("active")
})

// Function untuk menangani pengiriman data formulir signup
document.getElementById("signupForm").addEventListener("submit", function (event) {
event.preventDefault(); 

// untuk mendapatkan nilai dari data
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const savePassword = document.getElementById("savePassword").checked;

// untuk menyimpan data di local store
const signupData = {
  name: name,
  email: email,
  password: password,
  savePassword: savePassword,
};
localStorage.setItem("signupData", JSON.stringify(signupData));

// untuk mengarahkan ke halaman yang di tentukan
window.location.href = "index.html";
});

// untuk menangani pengiriman data login
document.getElementById("loginForm").addEventListener("submit", function (event) {
event.preventDefault(); // Prevent the default form submission behavior

// untuk mendapatkan nilai2 data
const loginEmail = document.getElementById("loginEmail").value;
const loginPassword = document.getElementById("loginPassword").value;


// menyimpan data di login store
const loginData = {
  email: loginEmail,
  password: loginPassword,
};
localStorage.setItem("loginData", JSON.stringify(loginData));

// untuk mengarahkan ke halaman yang di tentukan
window.location.href = "index.html";
});