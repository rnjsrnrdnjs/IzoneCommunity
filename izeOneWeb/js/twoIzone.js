function twostart() {
  var headChild=elt("div",{id:"header"});
  headChild.style.width=100+"vw";
  headChild.style.height=20+"vh";
  document.body.appendChild(headChild);
  $("#header").load("header.html");

  var navChild=elt("div",{id:"nav"});
  navChild.style.width=30+"vw";
  navChild.style.height=65+"vh";
  navChild.style.float="left";
  document.body.appendChild(navChild);
  $("#nav").load("nav.html");
  
  var sectionChild=elt("div",{id:"section"});
  sectionChild.style.width=50+"vw";
  sectionChild.style.height=65+"vh";
  sectionChild.style.float="left";
  document.body.appendChild(sectionChild);
  $("#section").load("section.html");
  
  var footerChild=elt("div",{id:"footer"});
  footerChild.style.width=100+"vw";
  footerChild.style.height=15+"vh";
  footerChild.style.clear="left";
  document.body.appendChild(footerChild);
  $("#footer").load("footer.html");
}