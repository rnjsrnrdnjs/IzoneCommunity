function twostart(){
  includeHTML(callback);
  var header=elt("header",{})  
  
  
  //로고 추가
  var imgIze = new Image();
  imgIze.onload = function () {
    imgIze.width=150;
    imgIze.height=106;
  }
  imgIze.src = "../img/IZONE_Logo.png";
var imgIze2 = new Image();
  imgIze2.onload = function () {
    imgIze2.width=250;
    imgIze2.height=96;
  }
  imgIze2.src = "../img/wizOne.png";
let p_1=elt("p",null);
 
  document.body.appendChild(leftSide);
  document.body.appendChild(main);
  document.body.appendChild(footer);
  

}