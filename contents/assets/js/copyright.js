var startDate = 2016;
var endDate = new Date().getFullYear();

if(startDate === endDate) {
  var copyright = startDate;
}
else {
  copyright = startDate + " - " + endDate;
}

document.getElementById("copyright-date").textContent = copyright;