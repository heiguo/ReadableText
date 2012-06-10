(function() {
  var MAGIC_TEXT_LENGTH = 30;
  var PREFERRED_FONT_SIZE = 18;

  // get text length of imediate child text
  var getElemTextLength = function(elem) {
    var maxTextLength = 0;
    for (var i = 0; i < elem.childNodes.length; i++) {
      var childNode = elem.childNodes[i];
      var textLength = childNode.textContent.trim().length;
      if (childNode.nodeType === Node.TEXT_NODE && textLength > maxTextLength) {
        maxTextLength = textLength;
        //console.log(childNode);
      }
    }
    return maxTextLength;
  };

  // util function: get font size of an element
  var getElemFontSize = function(elem) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(elem, null).getPropertyValue("font-size");
    } else {
      return elem.style["fontSize"];
    }
  };

  var getMainFontSize = function() {
    //var paragraphs = document.getElementsByTagName("p");
    var elems = document.querySelectorAll("p, span");
    var fontSizes = new Array();
    var maxCount = 0, mainFontSize = -1;
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];
      if (getElemTextLength(elem) > MAGIC_TEXT_LENGTH) {
        var fontSize = getElemFontSize(elem);
        if (fontSizes[fontSize]) {
          fontSizes[fontSize]++;
          console.log("----");
          console.log(fontSize);
          console.log(fontSizes[fontSize]);
          console.log(maxCount);
          console.log(elem);
          console.log("----");
          if (fontSizes[fontSize] > maxCount) {
            maxCount = fontSizes[fontSize];
            mainFontSize = fontSize;
            console.log(mainFontSize);
          }
        } else {
          fontSizes[fontSize] = 1;
        }
      }
    }
    return parseFloat(mainFontSize);
  };

  // commit the zoom
  var magicZoom = function() {
    var zoom;
    var mainFontSize = getMainFontSize();
    console.log(mainFontSize);
    if (mainFontSize != -1) {
      zoom = PREFERRED_FONT_SIZE / getMainFontSize();
      document.body.style.zoom = zoom;
    }
  };

  magicZoom();

}).call(this);
