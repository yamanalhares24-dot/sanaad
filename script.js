// ========== البيانات ==========
const feturedProduct = [
  { id: 1, title: "Burnikk", shortDesc: "Sexbomb", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2F7l3FMZqY8JdfssalDgx2?alt=media&token=be15689c-e12c-4829-9d78-32395ef1e3f7", price: 250 },
  { id: 2, title: "Kibal Batal", shortDesc: "Kibal Black", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FALz5M4DI7MF7CdZrq3gS?alt=media&token=8d33ea34-2de3-466b-9b3d-27015e9cd540", price: 380 },
  { id: 3, title: "Very Nice", shortDesc: "Salt maaalat", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FLIu8tS4yHSU28Xi8BXCj?alt=media&token=31e796ad-dbd6-4e4f-a8a9-192f5158684a", price: 720 },
  { id: 4, title: "Buldit", shortDesc: "Salt Maalat", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FYVPdTsyxJybMCsdKpXhq?alt=media&token=23d7673c-a0bf-4dcb-89f1-8482446b56be", price: 260 },
  { id: 5, title: "Balakubak", shortDesc: "Betsin Maalat", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FYZ7LM3vZjWbIIJH2tgEb?alt=media&token=5e722063-a792-4502-9f6e-c3df1581aa9c", price: 130 },
  { id: 6, title: "Kutu", shortDesc: "Sexbomb", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FbS1hHdO7NvbR1yN5ZPlR?alt=media&token=809a3249-f83d-4aec-b134-34a65ce2ce10", price: 310 },
  { id: 7, title: "Tiktilaok Manok", shortDesc: "Sexbomb", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2F7l3FMZqY8JdfssalDgx2?alt=media&token=be15689c-e12c-4829-9d78-32395ef1e3f7", price: 100 },
  { id: 8, title: "Quake Overload", shortDesc: "Yezyow", img: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2F7l3FMZqY8JdfssalDgx2?alt=media&token=be15689c-e12c-4829-9d78-32395ef1e3f7", price: 155 },
];

// ========== العناصر ==========
const container = document.getElementById("products");
const searchInput = document.querySelector(".search-box input");
const cartCount = document.getElementById("cart-count");
const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const navLinks = document.querySelector(".nav-links");

// ========== سجل البحث ==========
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
const historyList = document.createElement("ul");
historyList.id = "search-history";
historyList.style.cssText = `
  position:absolute;
  top:40px;
  left:0;
  width:100%;
  background:white;
  border:1px solid #ccc;
  border-radius:4px;
  max-height:200px;
  overflow-y:auto;
  display:none;
  z-index:999;
  list-style:none;
  padding:0;
  margin:5px 0 0 0;
`;
searchInput.parentElement.style.position = "relative";
searchInput.parentElement.appendChild(historyList);

function saveSearch(query) {
  query = query.trim();
  if (!query) return;
  if (!searchHistory.includes(query)) {
    searchHistory.unshift(query);
    if (searchHistory.length > 10) searchHistory.pop();
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  searchHistory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.style.cssText = "padding:8px;cursor:pointer;border-bottom:1px solid #eee;";
    li.addEventListener("click", () => {
      searchInput.value = item;
      triggerSearch(item);
      historyList.style.display = "none";
    });
    historyList.appendChild(li);
  });
  if (searchHistory.length > 0) {
    const clearLi = document.createElement("li");
    clearLi.textContent = "Clear History";
    clearLi.style.cssText = "padding:8px;cursor:pointer;background:#f5f5f5;text-align:center;";
    clearLi.addEventListener("click", () => {
      searchHistory = [];
      localStorage.removeItem("searchHistory");
      renderHistory();
    });
    historyList.appendChild(clearLi);
  }
}

// ========== Cart ==========
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
const cartSidebar = document.createElement("div");
cartSidebar.id = "cart-sidebar";
cartSidebar.style.cssText = `position:fixed; top:0; right:-350px; width:300px; height:100%; background:white; border-left:1px solid #ccc; box-shadow:-2px 0 5px rgba(0,0,0,0.3); transition: right 0.3s; padding:10px; z-index:1000; overflow-y:auto;`;

// تحديث عرض السلة حسب حجم الشاشة
function updateCartWidth() {
  if (window.innerWidth <= 768) {
    cartSidebar.style.width = "100%";
    cartSidebar.style.right = cartSidebar.classList.contains("open") ? "0" : "-100%";
  } else {
    cartSidebar.style.width = "300px";
    cartSidebar.style.right = cartSidebar.classList.contains("open") ? "0" : "-350px";
  }
}

window.addEventListener("resize", updateCartWidth);
cartSidebar.innerHTML = `
  <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
    <h2>My Cart</h2>
    <span id="close-cart" style="cursor:pointer; font-size:20px;">&times;</span>
  </header>
  <div id="cart-items"></div>
  <div id="cart-total" style="margin-top:10px; font-weight:bold;">Total: $0</div>
  <button id="clear-cart" style="margin-top:15px; padding:8px 12px; background:#e53935; color:white; border:none; cursor:pointer; border-radius:4px;">Clear Cart</button>
`;
document.body.appendChild(cartSidebar);

const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

// ========== Cart Functions ==========
document.querySelector(".cart-icon-container").addEventListener("click", () => {
  cartSidebar.classList.toggle("open");
  updateCartWidth();
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
  updateCartWidth();
});

function saveCart() {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function addToCart(id) {
  const existing = cartProducts.find(c => c.product.id === id);
  if (existing) existing.quantity++;
  else {
    const product = feturedProduct.find(p => p.id === id);
    if (product) cartProducts.push({ product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  cartCount.textContent = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cartProducts.forEach(({ product, quantity }) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    const subtotal = product.price * quantity;
    total += subtotal;
    item.innerHTML = `
      <img src="${product.img}" alt="${product.title}" style="width:50px;height:50px;object-fit:cover;margin-right:10px;">
      <div class="cart-item-info" style="display:inline-block;vertical-align:top;">
        <h4>${product.title}</h4>
        <p>${product.shortDesc}</p>
        <p>Price: $${product.price}</p>
        <p>Subtotal: $<span class="subtotal">${subtotal}</span></p>
        <div class="quantity-controls">
          <button class="decrease">-</button>
          <span class="quantity">${quantity}</span>
          <button class="increase">+</button>
        </div>
        <button class="remove-item" style="margin-top:5px;padding:4px 8px;background:#555;color:white;border:none;cursor:pointer;border-radius:3px;">Remove</button>
      </div>
    `;
    item.querySelector(".increase").addEventListener("click", () => {
      const f = cartProducts.find(c => c.product.id === product.id);
      if (f) f.quantity++;
      saveCart(); updateCartCount(); renderCartItems();
    });
    item.querySelector(".decrease").addEventListener("click", () => {
      const f = cartProducts.find(c => c.product.id === product.id);
      if (f) {
        f.quantity--;
        if (f.quantity <= 0) cartProducts = cartProducts.filter(c => c.product.id !== product.id);
        saveCart(); updateCartCount(); renderCartItems();
      }
    });
    item.querySelector(".remove-item").addEventListener("click", () => {
      cartProducts = cartProducts.filter(c => c.product.id !== product.id);
      saveCart(); updateCartCount(); renderCartItems();
    });
    cartItemsContainer.appendChild(item);
  });
  cartTotal.textContent = `Total: $${total}`;
}

clearCartBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the entire cart?")) {
    cartProducts = [];
    saveCart(); updateCartCount(); renderCartItems();
  }
});

// ========== Popup ==========
const popup = document.getElementById("product-popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const popupPrice = document.getElementById("popup-price");
const popupClose = document.querySelector(".popup-close");
const popupAddCartBtn = document.getElementById("popup-add-cart");

let currentProductId = null;

function openPopup(product) {
  currentProductId = product.id;
  popupImg.src = product.img;
  popupTitle.textContent = product.title;
  popupDesc.textContent = product.shortDesc;
  popupPrice.textContent = "Price: $" + product.price;
  popup.style.display = "flex";
}

popupClose.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

popupAddCartBtn.addEventListener("click", () => {
  if (currentProductId) {
    addToCart(currentProductId);
    popup.style.display = "none";
  }
});

// ========== Products ==========
function renderProducts(products) {
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="card-body">
        <h3>${product.title}</h3>
        <p>${product.shortDesc}</p>
        <p>Price: $${product.price}</p>
      </div>
      <button>Add to Cart</button>
    `;
    
    card.querySelector("img").addEventListener("click", () => openPopup(product));
    card.querySelector("button").addEventListener("click", () => addToCart(product.id));
    container.appendChild(card);
  });
}

// ========== Search ==========
function triggerSearch(value) {
  const cards = document.querySelectorAll("#products .card");
  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();
    if (title.includes(value.toLowerCase()) || desc.includes(value.toLowerCase())) {
      card.style.opacity = "1";
      card.style.pointerEvents = "auto";
    } else {
      card.style.opacity = "0";
      card.style.pointerEvents = "none";
    }
  });
}

searchInput.addEventListener("input", (e) => {
  triggerSearch(e.target.value);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveSearch(searchInput.value);
    triggerSearch(searchInput.value);
    historyList.style.display = "none";
  }
});

searchInput.addEventListener("focus", () => {
  if (searchHistory.length > 0) historyList.style.display = "block";
});

searchInput.addEventListener("blur", () => {
  setTimeout(() => historyList.style.display = "none", 200);
});

// ========== Burger Menu ==========
burgerMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !burgerMenuBtn.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

// إغلاق القائمة عند تغيير حجم الشاشة
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("show");
  }
});

// ========== Dark Mode Toggle ==========
const toggleBtn = document.getElementById("toggle-mode");
const circle = toggleBtn.querySelector(".circle");

const darkModeStored = localStorage.getItem("darkMode") === "true";
applyDarkMode(darkModeStored);

function applyDarkMode(state) {
  if (state) {
    document.body.classList.add("dark-mode");
    toggleBtn.style.background = "#555";
    circle.style.transform = "translateX(25px)";
  } else {
    document.body.classList.remove("dark-mode");
    toggleBtn.style.background = "#ffc107";
    circle.style.transform = "translateX(0)";
  }
  localStorage.setItem("darkMode", state);
}

toggleBtn.addEventListener("click", () => {
  applyDarkMode(!document.body.classList.contains("dark-mode"));
});

// ========== Initialize ==========
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(feturedProduct);
  updateCartCount();
  renderCartItems();
  renderHistory();
  updateCartWidth();
});

// إضافة touch events للموبايل
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - إغلاق السلة
    if (cartSidebar.classList.contains("open")) {
      cartSidebar.classList.remove("open");
      updateCartWidth();
    }
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right - فتح السلة (فقط إذا كانت مغلقة)
    if (!cartSidebar.classList.contains("open") && touchStartX < 50) {
      cartSidebar.classList.add("open");
      updateCartWidth();
    }
  }
}

