// 初始化資料
function init() {
  getProductList();
}
init();

let productData = [];
// 男裝商品資料取得
function getProductList() {
  axios
    .get(`https://vercel-blue-alpha.vercel.app/products?gender=男`)
    .then(function (response) {
      productData = response.data;
      renderProductList(productData);
    });
}

const menswearList = document.querySelector(".menswearList");
// 男裝商品資料渲染
function renderProductList(productData) {
  let str = "";
  let category;
  productData.forEach(function (item) {
    category = item.category;
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
  menswearList.innerHTML = str;
}

const menswearCategoryList = document.querySelector(".menswearCategoryList");
const womenswearCategoryList = document.querySelector(
  ".womenswearCategoryList"
);
// 篩選器
menswearCategoryList.addEventListener("click", function (e) {
  let filter = [];
  productData.forEach(function (item) {
    if (e.target.getAttribute("data-category") == item.category) {
      filter.push(item);
    } else if (
      e.target.getAttribute("data-category") == null ||
      e.target.getAttribute("data-category") == undefined
    ) {
      return;
    }
  });
  renderProductList(filter);
});

// 加入購物車
function addCartItem(id) {
  axios
    .post(`https://vercel-blue-alpha.vercel.app/carts`, {
      productId: id,
    })
    .then(function (response) {
      alert("成功加入購物車");
    });
}

menswearList.addEventListener("click", function (e) {
  if (e.target.getAttribute("data-class") == "addCart") {
    const productId = e.target.getAttribute("data-id");
    addCartItem(productId);
  } else {
    return;
  }
});
