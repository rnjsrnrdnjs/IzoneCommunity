var canvas;
var ctx;
var cpyImg=[];
var izeMem = ["../img/0.jpg", "../img/1.jpg", "../img/2.jpg", "../img/3.jpg", "../img/4.jpg", "../img/5.jpg", "../img/6.jpg", "../img/7.jpg", "../img/8.jpg", "../img/9.jpg", "../img/10.jpg", "../img/11.jpg"];
//mvc? 모델 적용할지 아직모르겠으나 처음 시작 페이지 로딩
function reboot(parent) {
  var skip = elt("button", { class: "btn btn-outline-primary" }, "Skip");
  var p = document.createElement("p");
  [canvas, ctx] = createCanvas();
  parent.appendChild(elt("div", null, skip, p, canvas));
  izoneAni();
  skip.onclick = function (e) {
    parent.removeChild(parent.childNodes[1]);
    twostart();
  }


}
//캔버스 초기화 
function createCanvas() {
  canvas = elt("canvas", { width: 1600, height: 1600 });
  ctx = canvas.getContext("2d");
  canvas.style.border = "1px solid #f2bef4";
  return [canvas, ctx];
}

//아이즈원 애니메이션
function izoneAni() {

  var izeVideo = document.createElement("video");
  izeVideo.src = "../img/teaser.mp4";
  izeVideo.autoplay = "autoplay";
  izeVideo.muted = "muted";
  izeVideo.loop = false;
  izeVideo.oncanplaythrough = readyToPlayVideo;
  var end = false;
  function readyToPlayVideo(event) {
    izeVideo.addEventListener("ended", function (e) {
      end = true;
    }, false);
    izeVideo.play();
    requestAnimationFrame(updateCanvas);
  }
  function updateCanvas() {
    if (end) return;
    var vidH = 200;
    var vidW = 300;
    var top = canvas.height / 2 - (vidH / 2);
    var left = canvas.width / 2 - (vidW / 2);
    ctx.drawImage(izeVideo, left, top, vidW, vidH);
    requestAnimationFrame(updateCanvas);
  }
  
  var izeone = [];
  var moveIze = [[0, -1], [1 / 3, -2 / 3], [2 / 3, -1 / 3], [1, 0], [2 / 3, 1 / 3], [1 / 3, 2 / 3], [0, 1], [-1 / 3, 2 / 3], [-2 / 3, 1 / 3], [-1, 0], [-2 / 3, -1 / 3], [-1 / 3, -2 / 3]];
  var colorToIze = ["red", "tomato", "lightsalmon", "gold", "lime", "springgreen", "lightseagreen", "skyblue", "royalblue", "mediumslateblue", "blueviolet", "fuchsia",];
  

  for (let i = 0; i < 12; i++) {
    let plus = 110;
    if (i == 0 || i == 6) plus -= 30;
    izeone[i] = new IZEONE(canvas.width / 2 + moveIze[i][0] * plus, canvas.height / 2 + moveIze[i][1] * plus, colorToIze[i]);
  }
  var promise = new Promise(function (resolve, reject) {
    var cnt = 0;
    var aniTimer = setInterval(function (e) {
      for (let i = 0; i < 12; i++) {
        let plus = 4;
        if (i == 3 || i == 9)
          plus += 1;
        else if (i == 2 || i == 4 || i == 8 || i == 10)
          plus += 1;
        else if (i == 0 || i == 6) plus += 0.5;
        izeone[i].draw(ctx).move(moveIze[i][0] * plus, moveIze[i][1] * plus);
      }
      cnt++;
      if (cnt > 100) {
        clearInterval(aniTimer);
        resolve();
      }
    }, 33);
  });
  promise.then(function () {
    for (let i = 0; i < 12; i++) {
      cpyImg[i] = new Image();
      cpyImg[i].onload = function () {
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cpyImg[i], izeone[i].x - (75 * 3) / 2, izeone[i].y - (317) / 2, 75 * 3, 317);
      };
      cpyImg[i].src = izeMem[i];
    }
  })
  .then(function () {
      setTimeout(function (e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 1000;
        canvas.height = 666;
        var cpyImg2 = new Image();
        cpyImg2.onload = function () {
          ctx.webkitImageSmoothingEnabled = false;
          ctx.mozImageSmoothingEnabled = false;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(cpyImg2, 0, 0);
        }
        cpyImg2.src = "../img/izeOne.jpg";
        
      }, 21500);
    });
}

// x,y 는 경로 움직임 위치, order은 하나 증가할때마다 30씩 추가 한 각도 ,color는 선의 색깔
function IZEONE(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}
IZEONE.prototype = {
  draw: function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    return this;
  },
  move: function (nx, ny) {
    this.x += nx;
    this.y += ny;
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    return this;
  }
};
