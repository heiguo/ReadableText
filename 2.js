(function() {
  var MAGIC_TEXT_LENGTH = 30;
  var PREFERRED_FONT_SIZE = 18;

  // get text length of imediate child text
  var getElemTextLength = function(elem) {
    var totalLength = 0;
    for (var i = 0; i < elem.childNodes.length; i++) {
      var childNode = elem.childNodes[i];
      if (childNode.nodeType === Node.TEXT_NODE) {
        totalLength += childNode.textContent.length;
      }
    }
    return totalLength;
  };

  // util function: get font size of an element
  var getElemFontSize = function(elem) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(elem, null).getPropertyValue("font-size");
    } else {
      return elem.style["fontSize"];
    }
  };

  var getLongElems = function() {
    var paragraphs = document.getElementsByTagName("p");
    var parentNodeInfos = [];
    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i], textLen = getElemTextLength(p);
      if (textLen > MAGIC_TEXT_LENGTH) {
        var parentNode = p.parentNode;
        var alreadyIn = false;
        for (var j = 0; j < parentNodeInfos.length; j++) {
          var nodeInfo = parentNodeInfos[j];
          if (nodeInfo.node === parentNode) {
            alreadyIn = true;
            nodeInfo.textLength += textLen;
            break;
          }
        }
        if (!alreadyIn) {
          var parentNodeInfo = {
            node: parentNode,
            sampleChild: p,
            textLength: textLen
          };
          parentNodeInfos.push(parentNodeInfo);
        }
      }
    }
    console.log(parentNodeInfos);
    return parentNodeInfos;
  };

  // get the sample and its font size
  var getMainFontSize = function() {
    var longElems = getLongElems();
    var maxTextLength = 0;
    var theSampleChild = null;
    for (var k = 0; k < longElems.length; k++) {
      var longElem = longElems[k];
      if (longElem.textLength > maxTextLength) {
        maxTextLength = longElem.textLength;
        theSampleChild = longElem.sampleChild;
      }
    }
    if (theSampleChild == null)
      return -1;

    console.log(theSampleChild);
    return parseFloat(getElemFontSize(theSampleChild));
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
