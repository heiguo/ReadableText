(function() {
  var MAGIC_TEXT_LENGTH, PREFERRED_FONT_SIZE, getElemFontSize, getLongElemInfos, getMainFontSize, getTextLength, magicZoom;

  var MAGIC_TEXT_LENGTH = 30;
  var PREFERRED_FONT_SIZE = 18;

  var getTextLength = function(elem) {
    var totalLength = 0;
    var nodes = elem.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        totalLength += node.textContent.length;
      }
    }
    return totalLength;
  };

  var getLongElemInfos = function() {
    var longElemInfos = [];
    var paragraphs = document.getElementsByTagName("p");
    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i];
      var textLen = getTextLength(p);
      if (textLen > MAGIC_TEXT_LENGTH) {
        longElemInfos.push({
          elem: p,
          textLength: textLen
        });
      }
    }
    console.log(longElemInfos);
    return longElemInfos;
  };

  // util function: get font size of an element
  var getElemFontSize = function(el) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(el, null).getPropertyValue("font-size");
    } else {
      return el.style["fontSize"];
    }
  };
  
  var getParentNodeInfos = function() {
    var longElemInfos = getLongElemInfos();
    var parentNodeInfos = [];
    for (var i = 0; i < longElemInfos.length; i++) {
      var longElemInfo = longElemInfos[i];
      var longElem = longElemInfo.elem;
      var alreadyIn = false;
      for (var j = 0; j < parentNodeInfos.length; j++) {
        var nodeInfo = parentNodeInfos[j];
        if (nodeInfo.node === longElem.parentNode) {
          alreadyIn = true;
          nodeInfo.count++;
          nodeInfo.textLength += longElemInfo.textLength;
        }
      }
      if (!alreadyIn) {
        var parentNodeInfo = {
          node: longElem.parentNode,
          sample: longElem,
          count: 1,
          textLength: longElemInfo.textLength
        };
        parentNodeInfos.push(parentNodeInfo);
      }
    }
    
    return parentNodeInfos;
  }

  // get the sample and its font size
  var getMainFontSize = function() {
    var parentNodeInfos = getParentNodeInfos();
    var maxTextLength = 0;
    var theSample;
    for (var k = 0; k < parentNodeInfos.length; k++) {
      var parentNodeInfo = parentNodeInfos[k];
      if (parentNodeInfo.textLength > maxTextLength) {
        maxTextLength = parentNodeInfo.textLength;
        theSample = parentNodeInfo.sample;
      }
    }
    console.log(theSample);
    return parseFloat(getElemFontSize(theSample));
  };

  // commit the zoom
  var magicZoom = function() {
    var zoom;
    zoom = PREFERRED_FONT_SIZE / getMainFontSize();
    return document.body.style.zoom = zoom;
  };

  magicZoom();

}).call(this);
