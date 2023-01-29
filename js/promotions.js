// 初始化資料
function init() {
  getProductList();
}
init();

// 倒數計時器
const clock = document.querySelector(".clock");
setInterval(function () {
  let time = new Date();
  let nowTime = time.getTime();
  time.setMonth(11);
  time.setDate(18);
  time.setHours(0);
  time.setMinutes(0);
  time.setSeconds(0);
  let endTime = time.getTime();
  let offsetTime = (endTime - nowTime) / 1000;
  let sec = parseInt(offsetTime % 60);
  let min = parseInt((offsetTime / 60) % 60);
  let hr = parseInt((offsetTime / 60 / 60) % 24);
  let day = parseInt(offsetTime / 24 / 60 / 60);
  clock.innerHTML = `<i class="fa-regular fa-clock"></i>
              倒數${day}天${hr}時${min}分${sec}秒結束`;
}, 1000);

let productData = [];
// 特價商品資料取得
function getProductList() {
  axios.get(`http://localhost:3000/products`).then(function (response) {
    productData = response.data;
    renderProductList();
  });
}
const promotionsList = document.querySelector(".promotionsList");
// 特價商品資料渲染
function renderProductList() {
  let str = "";
  productData.forEach(function (item) {
    if (item.category == "限時特價商品") {
      str += `
                <div class="col-md-4 pb-3">
                    <div class="py-3 border bg-white text-start">
                        <i
                        class="fa-solid fa-circle-user ps-3 pb-3 fs-5 text-darkGreen"
                        ></i>
                        <span>衣舉兩得</span>
                        <img
                        class="img-fluid"
                        src=${item.images}
                        alt=${item.title}
                        />
                        <div class="d-flex justify-content-between px-3 pt-3">
                        <p class="fw-bold">${item.title}</p>
                        <p
                            class="border border-darkGreen rounded-1 px-1 text-darkGreen"
                        >
                            ${item.status}
                        </p>
                        </div>
                        <p
                        class="ps-3 m-0 fs-7 text-decoration-line-through text-black-50"
                        >
                        NT $${item.origin_price}
                        </p>
                        <div
                        class="d-flex justify-content-between align-items-center px-3"
                        >
                        <p class="text-danger fw-bold m-0">NT $${item.price}</p>
                        <button class="text-white btn btn-darkGreen px-3" data-class="addCart" data-id="${item.id}">
                            加入購物車<i class="fa-solid fa-cart-shopping"></i>
                        </button>
                        </div>
                    </div>
                </div>
                `;
    } else {
      return;
    }
  });
  promotionsList.innerHTML = str;
}

// 加入購物車
function addCartItem(id) {
  axios
    .post(`http://localhost:3000/carts`, {
      productId: id,
    })
    .then(function (response) {
      alert("成功加入購物車");
    });
}

promotionsList.addEventListener("click", function (e) {
  if (e.target.getAttribute("data-class") == "addCart") {
    const productId = e.target.getAttribute("data-id");
    addCartItem(productId);
  } else {
    return;
  }
});
