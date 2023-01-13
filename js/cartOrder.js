// 初始化
function init() {
  getCheckList();
}
init();

let checkData = [];
// 取得購物車列表
function getCheckList() {
  axios.get(`http://localhost:3000/checks`).then(function (response) {
    checkData = response.data;
    renderCheckList();
  });
}

const checkList = document.querySelector(".checkList");
const tbodyList = document.querySelector("tbody");
const totalPrice = document.querySelector(".totalPrice");

function renderCheckList() {
  let str = "";
  let tbodyStr = "";
  let total = 0;
  checkData.forEach(function (item) {
    item.checkAry.forEach(function (item) {
      total += item.product.price;
      str += `<div class="row align-items-center g-0 bg-secondary bg-opacity-25 mb-5">
      <div class="col-md-2 text-center">
        <input
          class="form-check-input p-3"
          type="checkbox"
          value=""
          id="invalidCheck2"
          checked="checked"
          data-id="${item.id}"
          data-productId="${item.product.id}"
          disabled
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
      tbodyStr += `
        <tr class="border-bottom border-dark">
            <td>
            <div>
                <img
                src=${item.product.images}
                width="30%"
                alt=${item.product.title}
                />
                <span>${item.product.title}</span>
            </div>
            </td>
            <td>1</td>
            <td>NT$${item.product.price}</td>
        </tr>`;
    });
  });
  checkList.innerHTML = str;
  tbodyList.innerHTML = tbodyStr;
  totalPrice.innerHTML = `<h4>NT$${total + 60 - 100}</h4>`;
}

// 清除確認訂單內全部產品
function deleteAllCheckList(cartId) {
  axios
    .delete(`http://localhost:3000/checks/${cartId}`)
    .then(function (response) {
      //   alert(response.data);
      getCheckList();
    })
    .catch(function (error) {
      //   alert(error.response.data);
    });
}

// 清除購物車內相對應產品
function deleteCartList(cartId) {
  axios
    .delete(`http://localhost:3000/carts/${cartId}`)
    .then(function (response) {
      //   alert(response.data);
    })
    .catch(function (error) {
      //   alert(error.response.data);
    });
}

// 刪除確認訂單內特定產品
function deleteCheckItem(cartId) {
  axios
    .delete(`http://localhost:3000/checks/${cartId}`)
    .then(function (response) {
      alert("成功刪除單筆購物車物品！");
      getCheckList();
    });
}
// 點擊按鈕刪除單筆品項
checkList.addEventListener("click", function (e) {
  const cartId = e.target.getAttribute("data-id");
  const cartClass = e.target.getAttribute("data-class");
  if (cartId !== null && cartClass == "deleteBtn") {
    deleteCheckItem(cartId);
  } else {
    return;
  }
});

// 送出訂單給後台
function checkCartItem(checkData) {
  axios
    .post(`http://localhost:3000/orders`, {
      orderList: checkData,
      createTime: new Date().getTime(),
    })
    .then(function (response) {
      alert("訂單已送出");
    });
}

const confirmBtn = document.querySelector(".confirmBtn");
// 點擊確定付款後將購物車清單、確認清單中的商品刪除
confirmBtn.addEventListener("click", function (e) {
  //   e.preventDefault();
  checkCartItem(checkData);
  checkData.forEach(function (item) {
    deleteAllCheckList(item.id);
    item.checkAry.forEach(function (item) {
      deleteCartList(item.id);
    });
  });
});
