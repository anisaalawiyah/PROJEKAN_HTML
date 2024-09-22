let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

//elemen openShopping  fungsinya untuk menambahkan kelas active pada elemen body ketika tombol openShopping di-kli
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
//elemen closeShopping  fungsinya untuk menghapus kelas active pada elemen body ketika tombol closeShopping di-kli
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})
// ini untuk menampilkan sebuah peringatan "Maaf fitur ini belum tersedia di website ini" ketika elemen tersebut di-klik.
document.querySelector('.total').addEventListener('click',function (){
    alert('Maaf fitur ini belum tersedia di website ini')
})

// ini untuk Mendeklarasikan dan  menyimpan data produk.
let products;
// ini untuk Mendeklarasikan dan menyimpan data produk yang telah ditambahkan ke dalam keranjang belanja.
let listCards  = [];

// function ini  digunakan untuk membuat elemen produk yang akan ditampilkan di halaman. Fungsi ini menerima value sebagai data produk dan key sebagai kunci produk
function createProductElement(value, key) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('item');

  let imgElement = document.createElement('img');
  // imgElement.src = value.images[0];
  imgElement.src = value.images;
  newDiv.appendChild(imgElement);

  let titleElement = document.createElement('div');
  titleElement.classList.add('title');
  titleElement.textContent = value.name;
  newDiv.appendChild(titleElement);

  let priceElement = document.createElement('div');
  priceElement.classList.add('price');
  priceElement.textContent = "$" + value.price.toLocaleString('id-ID'); // Menggunakan format lokal Indonesia
  newDiv.appendChild(priceElement);
  

  let buttonElement = document.createElement('button');
  buttonElement.textContent = 'ADD TO CART';
  buttonElement.addEventListener('click', function() {
    addToCard(key);
    alert('belanjaan anda telah di tambahkan dalam keranjang');
  });
  newDiv.appendChild(buttonElement);

  return newDiv;
}
// function ini akan memuat data di URl menggunakn API
  function initApp(){
    fetch("http://localhost:8081/api")
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    // products = data.products;
    products = data;
    products.forEach((value, key) => {
      let productElement = createProductElement(value, key);
      list.appendChild(productElement);
    });
  })
   
  }
  
initApp();

// function ini fungsinya untuk menambahkan produk kedalam keranjang
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    // Fungsi ini untuk memperbarui tampilan harga total dan jumlah produk yang ditampilkan di halaman
    reloadCard();
}

//Fungsi ini membuat elemen HTML untuk merepresentasikan suatu produk dalam keranjang belanja.
function createCardElement(value, key) {
    let newDiv = document.createElement('li');
    let imgDiv = document.createElement('div');
    let imgElement = document.createElement('img');
    // imgElement.src = value.images[0];
    imgElement.src = value.images;
    imgDiv.appendChild(imgElement);
    newDiv.appendChild(imgDiv);
  
    let nameDiv = document.createElement('div');
    // nameDiv.textContent = value.title;
    nameDiv.textContent = value.name;
    newDiv.appendChild(nameDiv);
  
    let priceDiv = document.createElement('div');
    // priceDiv.textContent = '$'+value.price.toLocaleString();
    priceDiv.textContent = '$'+value.price;
    newDiv.appendChild(priceDiv);
  
    let quantityDiv = document.createElement('div');
    let minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.onclick = function () {
      changeQuantity(key, value.quantity - 1);
    };
    quantityDiv.appendChild(minusButton);
  
    let countDiv = document.createElement('div');
    countDiv.classList.add('count');
    countDiv.textContent = value.quantity;
    quantityDiv.appendChild(countDiv);
  
    let plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.onclick = function () {
      changeQuantity(key, value.quantity + 1);
    };
    quantityDiv.appendChild(plusButton);
    newDiv.appendChild(quantityDiv);
    return newDiv;
  }
  //Fungsi ini memperbarui tampilan keranjang belanja setiap kali keranjang di ubah
  function reloadCard() {
    while (listCard.firstChild) {
      listCard.removeChild(listCard.firstChild);
    }
    let count = 0;
    let totalPrice = 0;
    // untuk menghitung total harga dan menambahkan setiap eleemn produk ke elemen listcard
    listCards.forEach((value, key) => {
      if (value != null) {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        let cardElement = createCardElement(value, key);
        listCard.appendChild(cardElement);
      }
    });
    // Fungsi ini juga memperbarui tampilan harga total dan jumlah produk yang ditampilkan di halaman
    total.textContent ='$'+ totalPrice.toLocaleString();
    quantity.textContent = count;
  }
// Fungsi ini untuk  mengklik tombol plus atau minus untuk mengubah kuantitas suatu produk di keranjang belanja
  function changeQuantity(key, quantity) {
    if (quantity === 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    //fungsi ini memanggil kembali fungsi reloadCard() untuk memperbarui tampilan keranjang belanja
    reloadCard();
}
