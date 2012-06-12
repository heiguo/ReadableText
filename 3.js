(function() {
  const MAGIC_TEXT_LENGTH = 30;
  const PREFERRED_FONT_SIZE = 18;

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

  var getMainFontSize = function(nodeList) {
    var fontSizes = new Array();
    var maxCount = 0, mainFontSize = -1;
    for (var i = 0; i < nodeList.length; i++) {
      var elem = nodeList[i];
      if (getElemTextLength(elem) > MAGIC_TEXT_LENGTH) {
        var fontSize = getElemFontSize(elem);
        if (fontSizes[fontSize]) {
          fontSizes[fontSize]++;
        } else {
          fontSizes[fontSize] = 1;
        }
        
        if (fontSizes[fontSize] > maxCount) {
          maxCount = fontSizes[fontSize];
          mainFontSize = fontSize;
        }
      }
    }
    return parseFloat(mainFontSize);
  };
  
  var processDoc = function(doc) {
    var mainFontSize = getMainFontSize(doc.querySelectorAll("p, span, pre"));
    console.log(mainFontSize);
    if (mainFontSize != -1) {
      var zoom = PREFERRED_FONT_SIZE / mainFontSize;
      doc.body.style.zoom = zoom;
    }
  }

  // commit the zoom
  var magicZoom = function() {
    // document
    processDoc(document);
    
    // iframes
    var iframes = document.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      processDoc(iframes[i].contentDocument);
    }
  };

  magicZoom();

}).call(this);
