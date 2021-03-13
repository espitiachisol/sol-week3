"use strict";
// 專門用來和伺服器做連線
const req = new XMLHttpRequest();
let src =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json";

req.onload = function () {
  // onload 偵測連線的狀態結束，當連線送出並請透過網際網路，並請成功的取回資料後會觸發 XMLHttpRequest() 的load事件
  //   連線完成
  let load_more = function () {
    let pics_section = document.getElementById("pics-section");
    for (let i = start; i < end; i++) {
      let div_box = document.createElement("div");
      let div_img = document.createElement("img");
      let div_p_img_title = document.createElement("P");
      let div_p_img_title_span = document.createElement("span");
      pics_section.appendChild(div_box);
      div_box.appendChild(div_img);
      div_box.appendChild(div_p_img_title);
      div_p_img_title.appendChild(div_p_img_title_span);
      pics_section.lastChild.classList.add("box");
      div_box = document.querySelectorAll(".box")[i + 8];
      div_box.firstChild.src = "imgs/loading.png";
      div_box.firstChild.classList.add("img");
      div_box.lastChild.classList.add("img-title");
    }
    start += 8;
    end += 8;
    console.log(start, end);
    set_content(start, end);
  };

  let load_more_btn = document.getElementById("load-more_btn");
  load_more_btn.addEventListener("click", load_more);
  const data = JSON.parse(this.response);
  let image_array = [];
  let stitle_array = [];
  let start = 0;
  let end = 8;
  let set_content = function (start, end) {
    for (let i = start; i < end; i++) {
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

    for (let i = start; i < end; i++) {
      let images = document.querySelectorAll(".img");
      console.log(images);
      console.log(images[i].src);
      console.log(image_array[i]);
      images[i].src = "http://" + image_array[i];

      let img_title = document.querySelectorAll(".img-title")[i];

      let old_title = document.querySelectorAll("span")[i];
      let new_title = document.createElement("span");

      let text_title = document.createTextNode(stitle_array[i]);

      new_title.appendChild(text_title);
      img_title.replaceChild(new_title, old_title);
    }
  };
  set_content(start, end);
};

req.open("get", src);
req.send();
