var canvas;
var ctx;
//mvc? 모델 적용할지 아직모르겠으나 처음 시작 페이지 로딩
function reboot(parent){
  var skip=elt("button",{class:"btn btn-outline-primary"},"Skip");
  [canvas,ctx]=createCanvas();
  parent.appendChild(elt("div",null,canvas,skip));
  izoneAni();
  
}
//캔버스 초기화 
function createCanvas(){
  canvas=elt("canvas",{width:1600,height:900});
  ctx=canvas.getContext("2d");

  canvas.style.border="1px solid #f2bef4";
  return [canvas,ctx];
}

//아이즈원 애니메이션
function izoneAni(){
  var imgIze=new Image();
  imgIze.onload=function(){
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(imgIze,Math.floor(canvas.width/2)-98,Math.floor(canvas.height/2)-98,196,196)
  };
  imgIze.src="../ize.png";
  
}