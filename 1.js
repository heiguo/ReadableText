var MAGIC_TEXT_LENGTH = 30;

function reStyle(elem) {
  //elem.style.fontFamily = "Corbel, Georgia, 'Microsoft Yahei'";
  elem.style.fontSize = '18px';
  elem.style.lineHeight = '155%';
}

function reStyleList(listElem) {
  var lis = listElem.getElementsByTagName("li");;
  if (lis != null) {
    for (var i = 0; i < lis.length; i++) {
      reStyle(lis[i]);
    }
  }
}

function processBlocks(blocks) {
  for (var i = 0; i < blocks.length; i++) {
    var text = blocks[i].textContent;
    if (text.length > MAGIC_TEXT_LENGTH) {
      reStyle(blocks[i]);
    }
  }  
}

function processP() {
  var paragraphs = document.getElementsByTagName("p");
  processBlocks(paragraphs);
}

function processPRE() {
  var pres = document.getElementsByTagName("pre");
  processBlocks(pres);
}

function processLists(lists) {
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];

    //check if it's valid list
    var lis = list.getElementsByTagName("li");
    for (var j = 0; j < lis.length; j++) {
      if (lis[j].textContent.length > MAGIC_TEXT_LENGTH) {
        console.log(lis[j].textContent);
        reStyleList(list);
        break;
      }
    }
  }
}

function processOL() {
  var ols = document.getElementsByTagName("ol");
  processLists(ols);
}

function processUL() {
  var uls = document.getElementsByTagName("ul");
  processLists(uls);
}

processP();
processPRE();
processOL();
processUL();