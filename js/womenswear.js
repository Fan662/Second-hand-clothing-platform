// 初始化資料
function init() {
  getProductList();
}
init();

let productData = [];
// 女裝商品資料取得
function getProductList() {
  axios
    .get(`http://localhost:3000/products?gender=女`)
    .then(function (response) {
      productData = response.data;
      renderProductList(productData);
    });
}

const womenswearList = document.querySelector(".womenswearList");
// 女裝商品資料渲染
function renderProductList(productData) {
  let str = "";
  productData.forEach(function (item) {
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
  });
  womenswearList.innerHTML = str;
}

const categoryList = document.querySelector(".categoryList");
// 篩選器
categoryList.addEventListener("click", function (e) {
  let filter = [];
  productData.forEach(function (item) {
    if (e.target.getAttribute("data-category") == item.category) {
      filter.push(item);
    }
  });
  renderProductList(filter);
});

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

womenswearList.addEventListener("click", function (e) {
  if (e.target.getAttribute("data-class") == "addCart") {
    const productId = e.target.getAttribute("data-id");
    addCartItem(productId);
  } else {
    return;
  }
});
