"use strict";
// 專門用來和伺服器做連線
const req = new XMLHttpRequest();
let src =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json";

req.onload = function () {
  // onload 偵測連線的狀態結束，當連線送出並請透過網際網路，並請成功的取回資料後會觸發 XMLHttpRequest() 的load事件
  //   連線完成
  const data = JSON.parse(this.response);

  let image_array = [];
  let stitle_array = [];
  for (let i = 0; i < 8; i++) {
    let stitle = data.result.results[i].stitle;
    let longitude = data.result.results[i].longitude;
    let latitude = data.result.results[i].latitude;
    let file = data.result.results[i].file;

    file = file.split("http://");
    image_array.push(file[1]);
    stitle_array.push(stitle);
    // console.log(file[i]);
    // console.log(stitle);
    // console.log(longitude);
    // console.log(latitude);
  }

  for (let i = 0; i < 8; i++) {
    let images = document.querySelectorAll(".img");
    images[i].src = "http://" + image_array[i];

    let img_title = document.querySelectorAll(".img-title")[i];

    let old_title = document.querySelectorAll("span")[i];
    let new_title = document.createElement("span");

    let text_title = document.createTextNode(stitle_array[i]);

    new_title.appendChild(text_title);
    img_title.replaceChild(new_title, old_title);
  }
};

req.open("get", src);
req.send();
