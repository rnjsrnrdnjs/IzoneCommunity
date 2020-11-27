var canvas;
var ctx;
//mvc? 모델 적용할지 아직모르겠으나 처음 시작 페이지 로딩
function reboot(parent) {
  var skip = elt("button", { class: "btn btn-outline-primary" }, "Skip");
  var p=document.createElement("p");
  [canvas, ctx] = createCanvas();
  parent.appendChild(elt("div", null, skip,p, canvas));
  izoneAni();
  skip.onclick = function (e) {
    parent.removeChild(parent.childNodes[1]);
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
  //https://likejirak.tistory.com/45

  var imgIze = new Image();
  imgIze.onload = function () {
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(imgIze, Math.floor(canvas.width / 2) - 75, Math.floor(canvas.height / 2) - 53, 150, 106)
  };
  imgIze.src = "../IZONE_Logo.png";
  var izeone = [];
  var moveIze = [[0, -1], [1 / 3, -2 / 3], [2 / 3, -1 / 3], [1, 0], [2 / 3, 1 / 3], [1 / 3, 2 / 3], [0, 1], [-1 / 3, 2 / 3], [-2 / 3, 1 / 3], [-1, 0], [-2 / 3, -1 / 3], [-1 / 3, -2 / 3]];
  var colorToIze = ["red", "tomato", "lightsalmon", "gold", "lime", "springgreen", "lightseagreen",  "skyblue","royalblue", "mediumslateblue", "blueviolet", "fuchsia",];
  var izeMem = ["../0.jpg", "../1.jpg", "../2.jpg", "../3.jpg", "../4.jpg", "../5.jpg", "../6.jpg", "../7.jpg", "../8.jpg", "../9.jpg", "../10.jpg", "../11.jpg"];

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
        resolve(ctx);
      }
    }, 33);
  });
  promise.then(function (ctx) {
    for (let i = 0; i < 12; i++) {
      let cpyImg = new Image();
      cpyImg.onload=function(){
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cpyImg, izeone[i].x-(75*3)/2, izeone[i].y-(317)/2, 75*3, 317);
      };
      cpyImg.src = izeMem[i];
    }

    setTimeout(function(e){
      canvas.width=1000;
      canvas.height=666;
      let cpyImg=new Image();
      cpyImg.onload=function(){
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cpyImg,0,0);
      }
      cpyImg.src="../izeOne.jpg";
    },3000);
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
