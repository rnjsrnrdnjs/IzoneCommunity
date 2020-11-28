function twostart() {
  var headChild=elt("div",{id:"header"});
  headChild.style.width=100+"vw";
  headChild.style.height=20+"vh";
  document.body.appendChild(headChild);
  $("#header").load("header.html");

  var navChild=elt("div",{id:"nav"});
  document.body.appendChild(navChild);
  $("#nav").load("nav.html");
  
  var sectionChild=elt("div",{id:"section"});
  sectionChild.style.width=100+"vw";
  sectionChild.style.height=400+"vh";
  document.body.appendChild(sectionChild);
  $("#section").load("section.html");
  
  var footerChild=elt("div",{id:"footer"});
  footerChild.style.width=100+"vw";
  footerChild.style.height=200+"px";
  footerChild.style.position="absolute";
  footerChild.style.clear="left";
  footerChild.style.backgroundColor="#81ffee";
  document.body.appendChild(footerChild);
  $("#footer").load("footer.html");
}