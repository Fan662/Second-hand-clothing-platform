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
// 首頁特價商品資料取得
function getProductList() {
  axios.get(`http://localhost:3000/products`).then(function (response) {
    productData = response.data;
    renderProductList();
    // 首頁限時特價商品swiper設定
    var swiper = new Swiper(".mySwiper", {
      autoplay: {
        disableOnInteraction: false,
      },
      speed: 1500,
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}
const promotionsList = document.querySelector(".promotionsList");
// 首頁特價商品資料渲染
function renderProductList() {
  let str = "";
  productData.forEach(function (item) {
    if (item.category == "限時特價商品") {
      str += ` 
              <div class="swiper-slide">
                <div class="py-3 border-0 bg-white text-start">
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
                    <button class="text-white btn btn-darkGreen px-3">
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

// box動畫設定
const box = document.querySelector(".box");

ScrollTrigger.create({
  //以box作為觸發時機
  trigger: box,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated(box);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(box);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated(box);
  },
});

function animated(element) {
  let x = -100;

  //設定元素初始值
  element.style.transform = `translate(${x}px, 0px)`;

  gsap.fromTo(
    element,
    { x: x, y: 0, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 0.5,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "expo", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}

function hide(element) {
  gsap.set(element, { opacity: 0, visibility: "hidden" });
}

// 新增打字效果
gsap.to(".boxText", {
  text: "不知道<br />如何處理二手衣物?", //text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 2,
  scrollTrigger: {
    trigger: ".boxText",
    toggleActions: "play pause resume reset", //見備註
  },
});

gsap.fromTo(
  ".cursor",
  0,
  {
    visibility: "hidden",
  },
  {
    visibility: "visible",
    repeat: -1,
    yoyo: true, // 若為true，則動畫repeat運行順序將會以倒放的形式回去，如溜溜球一樣
    repeatDelay: 0, // 下一次repeat的delay時間
  }
);

// box2動畫設定
const box2 = document.querySelector(".box2");

ScrollTrigger.create({
  //以box2作為觸發時機
  trigger: box2,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated2(box2);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(box2);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated2(box2);
  },
});

function animated2(element) {
  let x = -100;

  //設定元素初始值
  element.style.transform = `translate(${x}px, 0px)`;

  gsap.fromTo(
    element,
    { x: x, y: 0, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 1.5,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "expo", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}

// 新增打字效果
gsap.to(".boxText2", {
  text: "二手衣物捨不得丟<br />又怕回收沒價值?", //text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 4,
  scrollTrigger: {
    trigger: ".boxText2",
    toggleActions: "play pause resume reset", //見備註
  },
});

gsap.fromTo(
  ".cursor2",
  0,
  {
    visibility: "hidden",
  },
  {
    visibility: "visible",
    repeat: -1,
    yoyo: true, // 若為true，則動畫repeat運行順序將會以倒放的形式回去，如溜溜球一樣
    repeatDelay: 0, // 下一次repeat的delay時間
  }
);

// box3動畫設定
const box3 = document.querySelector(".box3");

ScrollTrigger.create({
  //以box3作為觸發時機
  trigger: box3,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated3(box3);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(box3);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated3(box3);
  },
});

function animated3(element) {
  let x = -100;

  //設定元素初始值
  element.style.transform = `translate(${x}px, 0px)`;

  gsap.fromTo(
    element,
    { x: x, y: 0, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 3,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "expo", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}

// 新增打字效果
gsap.to(".boxText3", {
  text: "想去二手店估價寄賣<br />又怕價錢不滿意?", //text屬性將自動為DOM元素嵌入我們所輸入的文字
  duration: 5.5,
  scrollTrigger: {
    trigger: ".boxText3",
    toggleActions: "play pause resume reset", //見備註
  },
});

gsap.fromTo(
  ".cursor3",
  0,
  {
    visibility: "hidden",
  },
  {
    visibility: "visible",
    repeat: -1,
    yoyo: true, // 若為true，則動畫repeat運行順序將會以倒放的形式回去，如溜溜球一樣
    repeatDelay: 0, // 下一次repeat的delay時間
  }
);

// service1動畫設定
const service1 = document.querySelector(".service1");

ScrollTrigger.create({
  //以service1作為觸發時機
  trigger: service1,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated4(service1);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(box3);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated4(service1);
  },
});

function animated4(element) {
  let y = -100;

  //設定元素初始值
  element.style.transform = `translate(${y}px, 0px)`;

  gsap.fromTo(
    element,
    { x: 0, y: y, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 0.5,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "bounce", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}

// service2動畫設定
const service2 = document.querySelector(".service2");

ScrollTrigger.create({
  //以service2作為觸發時機
  trigger: service2,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated5(service2);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(service2);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated5(service2);
  },
});

function animated5(element) {
  let y = -100;

  //設定元素初始值
  element.style.transform = `translate(${y}px, 0px)`;

  gsap.fromTo(
    element,
    { x: 0, y: y, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 1.5,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "bounce", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}

// service3動畫設定
const service3 = document.querySelector(".service3");

ScrollTrigger.create({
  //以service3作為觸發時機
  trigger: service3,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated6(service3);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(service3);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated6(service3);
  },
});

function animated6(element) {
  let y = -100;

  //設定元素初始值
  element.style.transform = `translate(${y}px, 0px)`;

  gsap.fromTo(
    element,
    { x: 0, y: y, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 2.3,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "bounce", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}

// service4動畫設定
const service4 = document.querySelector(".service4");

ScrollTrigger.create({
  //以service3作為觸發時機
  trigger: service4,
  markers: false,

  //向下滾動進入start點時觸發callback
  onEnter: function () {
    animated7(service4);
  },

  //向下滾動超過end點時觸發callback
  onLeave: function () {
    hide(service4);
  },

  //向上滾動超過end點時觸發（回滾時觸發）callback
  onEnterBack: function () {
    animated7(service4);
  },
});

function animated7(element) {
  let y = -100;

  //設定元素初始值
  element.style.transform = `translate(${y}px, 0px)`;

  gsap.fromTo(
    element,
    { x: 0, y: y, opacity: 0, visibility: "hidden" },
    {
      duration: 1.5,
      delay: 3,
      x: 0,
      y: 0,
      visibility: "visible",
      opacity: "1",
      ease: "bounce", // 元素的運動速度變化
      overwrite: "auto",
    }
  );
}
