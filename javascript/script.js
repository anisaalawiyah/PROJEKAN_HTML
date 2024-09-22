// menyimpannya dalam variabel header
const header = document.querySelector("header");

// ini fungsinya untuk memunculkan elemen header ketika di scroll
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 0);
});

// elemen di bawah ini utuk membuka dan menutup menu
let menu = document.querySelector("#menu-icon");
let navmenu = document.querySelector(".navmenu");

//ketika mengklik ikon menu, fungsi yang ditentukan akan dijalankan.
menu.addEventListener("click", () => {
  menu.classList.toggle("bx-x");//ini fungsinya memberikan efek menjadi "X" ketika menu sedang terbuka.
  navmenu.classList.toggle("open");//ini fungsinya ketika  mengklik ikon menu, menu navigasi akan muncul atau tersembunyi.
});



