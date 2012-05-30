var ps = document.getElementsByTagName("p");
var parents = new Array();
for (var i = 0; i < ps.length; i++) {
  var parent = ps[i].parentNode;
  var existed = false;
  for (var j = 0; j < parents.length; j++) {
    if (parents[j] == parent) {
      existed = true;
      break;
    }
  }
  
  if (existed)
    continue;

  parents.push(parent);
  validPs = parent.getElementsByTagName("p");
  if (validPs.length < 3)
    continue;

  for (var j = 0; j < validPs.length; j++) {
    validPs[j].style.fontFamily = "Corbel, Georgia, 'Microsoft Yahei'";
    validPs[j].style.fontSize = '16px';
    validPs[j].style.lineHeight = '155%';
  }
  parent.style.width = '500px';
}
