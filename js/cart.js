// 初始化
function init() {
  getCartList();
}
init();

let cartData = [];
// 取得購物車列表
function getCartList() {
  axios
    .get(`https://vercel-blue-alpha.vercel.app/carts?_expand=product`)
    .then(function (response) {
      cartData = response.data;
      renderCartList();
    });
}

const cartList = document.querySelector(".cartList");
function renderCartList() {
  let str = "";
  cartData.forEach(function (item) {
    str += `<div class="row align-items-center g-0 bg-secondary bg-opacity-25 mb-5">
    <div class="col-md-2 text-center">
      <input
        class="form-check-input p-3"
        type="checkbox"
        value=""
        id="invalidCheck"
        role="button"
        data-id="${item.id}"
        data-productId="${item.product.id}"
        required
      />
    </div>

    <div class="col-md-3">
      <img
      width="80%"
        class="cartImg"
        src=${item.product.images}
        alt=${item.product.title}
      />
    </div>

    <div class="col-md-5 fs-5">
      <div class="row align-items-center">
        <p class="col-md-3 text-center fw-bold mx-3 mb-0">賣家</p>
        <p class="col-md-3 bg-darkGreen bg-opacity-25 mb-0">
          <i class="fa-solid fa-circle-user fs-5 text-darkGreen"></i>
          衣舉兩得
        </p>
      </div>

      <div class="row align-items-center py-4">
        <p class="col-md-3 text-center fw-bold mx-3 mb-0">商品名稱</p>
        <p class="col-md-3 bg-darkGreen bg-opacity-25 mb-0">${item.product.title}</p>
      </div>

      <div class="row align-items-center pb-4">
        <p class="col-md-3 text-center fw-bold mx-3 mb-0">商品狀況</p>
        <p class="col-md-3 bg-darkGreen bg-opacity-25 mb-0">${item.product.status}</p>
      </div>

      <div class="row align-items-center pb-4">
        <p class="col-md-3 text-center fw-bold mx-3 mb-0">數量</p>
        <p class="col-md-3 bg-darkGreen bg-opacity-25 mb-0">${item.product.quantity}件</p>
      </div>

      <div class="row align-items-center">
        <p class="col-md-3 text-center fw-bold mx-3 mb-0">金額</p>
        <p class="col-md-3 bg-darkGreen bg-opacity-25 mb-0">
          <i class="fa-solid fa-dollar-sign"></i>
          ${item.product.price}
        </p>
      </div>
    </div>

    <div class="col-md-2 text-center text-danger">
      <i class="fa-solid fa-trash fa-2x" role="button" data-class="deleteBtn"  data-id="${item.id}"></i>
    </div>
  </div>`;
  });
  cartList.innerHTML = str;
}

// 刪除購物車內特定產品
function deleteCartItem(cartId) {
  axios
    .delete(`https://vercel-blue-alpha.vercel.app/carts/${cartId}`)
    .then(function (response) {
      alert("成功刪除單筆購物車物品！");
      getCartList();
    });
}
// 點擊按鈕刪除單筆品項
cartList.addEventListener("click", function (e) {
  const cartId = e.target.getAttribute("data-id");
  const cartClass = e.target.getAttribute("data-class");
  if (cartId !== null && cartClass == "deleteBtn") {
    deleteCartItem(cartId);
  } else {
    return;
  }
});

// 加入訂單確認
function checkCartItem() {
  axios
    .post(`https://vercel-blue-alpha.vercel.app/checks`, {
      checkAry,
    })
    .then(function (response) {
      alert("成功加入訂單確認");
    });
}

let checkbox;
// let cartId;
// let productId;
let ary = [];
let checkAry = [];
// 點擊前往結帳時確認是否有勾選並加入訂單確認
const checkBtn = document.querySelector(".checkBtn");
checkBtn.addEventListener("click", function (e) {
  //   e.preventDefault();
  ary.forEach(function (aryItem) {
    let aryItemId = aryItem.getAttribute("data-id");
    let aryItemProductId = aryItem.getAttribute("data-productId");

    if (aryItem.checked) {
      cartData.forEach(function (item) {
        if (item.id == aryItemId && item.product.id == aryItemProductId) {
          checkAry.push(item);
        }
      });
    }
  });
  checkCartItem();
});

// 先將有勾選的input放進陣列裡
cartList.addEventListener("click", function (e) {
  checkbox = e.target.checked;
  //   cartId = e.target.getAttribute("data-id");
  //   productId = e.target.getAttribute("data-productId");
  if (checkbox == true) {
    ary.push(e.target);
  }
});
