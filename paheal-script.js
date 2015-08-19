// ==UserScript==
// @name        Paheal Show Image
// @namespace   Paheal Show Image
// @description Paheal Show Image
// @include     /(http[s]?:)?([\/]{2})?([w]{3})?[\.]?paheal\.net.*/
// @version     1
// @grant       none
// ==/UserScript==
/*global document, window */
var images = document.getElementsByClassName("shm-image-list")[0],
    divs = images.getElementsByClassName("shm-thumb"),
    link = [],
    box = [],
    i,
    number;

function getFullImages() {
    "use strict";
    var links = {iLink: [], iImg: []};
    for (i = 0; i < divs.length; i += 1) {
        links.iLink[i] = divs[i].getElementsByTagName("a")[1];
        links.iImg[i] = divs[i].getElementsByTagName("img")[0];
    }
    return links;
}

function getWindow() {
    "use strict";
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.body || d.getElementsByTagName('body')[0],
        size = {
            x: w.innerWidth || e.clientWidth || g.clientWidth,
            y: w.innerHeight || e.clientHeight || g.clientHeight
        };
    return size;
}

function showBox(imgsrc) {
    "use strict";
    var image = document.getElementById("image_imgsrc"),
        Sbox = document.getElementById("image_handler"),
        Tbox = document.getElementById("image_title");
    image.src = "";
    image.src = imgsrc;
    image.style.maxWidth = (getWindow().x - 20) + "px";
    image.style.maxHeight = (getWindow().y - 20) + "px";
    Sbox.style.display = "block";
    Tbox.innerHTML = link.iImg[number].title;
    divs[number].style.background = "#7EB977";
}

function changeLink(i, links) {
    "use strict";
    var image = [];
    image[i] = divs[i].getElementsByTagName("a")[0];
    image[i].onclick = function () {
        number = i;
        showBox(links[i]);
        return false;
    };
}


box[0] = document.createElement("div");
box[0].id = "image_handler";

box[0].style.position = "fixed";
box[0].style.top = "0px";
box[0].style.left = "0px";
box[0].style.right = "0px";
box[0].style.bottom = "0px";
box[0].style.width = "100%";
box[0].style.height = "100%";
box[0].style.textAlign = "center";
box[0].style.zIndex = "9900";
box[0].style.display = "none";

box[1] = document.createElement("div");
box[1].id = "image_background";

box[1].style.background = "none repeat scroll 0% 0% #000";
box[1].style.opacity = "0.5";
box[1].style.position = "absolute";
box[1].style.top = "0px";
box[1].style.left = "0px";
box[1].style.right = "0px";
box[1].style.bottom = "0px";
box[1].style.width = "100%";
box[1].style.height = "100%";
box[1].style.zIndex = "-1";

box[1].onclick = function () {
    "use strict";
    var handler = document.getElementById("image_handler");
    handler.style.display = "none";
    divs[number].style.background = "";
    return false;
};

box[2] = document.createElement("div");
box[2].id = "image_div";

box[2].style.backgroundColor = "#ACE4A3";
box[2].style.border = "1px solid #7EB977";
box[2].style.display = "inline-block";
box[2].style.position = "relative";
box[2].style.margin = "5px";
box[2].style.padding = "5px 5px 0 5px";

box[3] = document.createElement("img");
box[3].id = "image_imgsrc";
box[3].style.maxWidth = (getWindow().x - 20) + "px";
box[3].style.maxHeight = (getWindow().y - 20) + "px";

box[4] = document.createElement("span");
box[4].id = "image_title";
box[4].style.position = "absolute";
box[4].style.top = "0px";
box[4].style.left = "0px";
box[4].style.background = "#ACE4A3";
box[4].style.padding = "2px 3px";



box[2].appendChild(box[3]);
box[0].appendChild(box[1]);
box[0].appendChild(box[2]);
box[0].appendChild(box[4]);
document.body.appendChild(box[0]);







link = getFullImages();
for (i = 0; i < divs.length; i += 1) {
    changeLink(i, link.iLink);
}

document.onkeydown = function (e) {
    "use strict";
    var imageHandler = document.getElementById("image_handler");
    if (imageHandler.style.display === "block") {
        e = e || event;
        if (e.keyCode === 27) {
            imageHandler.style.display = "none";
            divs[number].style.background = "";
            return false;
        }
        if (e.keyCode === 37 && number > 0) {
            divs[number].style.background = "";
            number -= 1;
            showBox(link.iLink[number]);
            return false;
        }
        if (e.keyCode === 39 && number < link.iLink.length - 1) {
            divs[number].style.background = "";
            number += 1;
            showBox(link.iLink[number]);
            return false;
        }
    }
};
