MAGIC_TEXT_LENGTH = 30
PREFERRED_FONT_SIZE = 18

getTextLength = (elem) ->
    totalLength = 0
    for node in elem.childNodes
        if node.nodeType == Node.TEXT_NODE
            totalLength += node.textContent.length
    totalLength

getLongElemInfos = () ->
    longElemInfos = []
    paragraphs = document.getElementsByTagName("p")
    for p in paragraphs
        textLen = getTextLength(p)
        if textLen > MAGIC_TEXT_LENGTH
            longElemInfos.push {elem: p, length: textLen} 
    console.log longElemInfos
    longElemInfos

getElemFontSize = (el) ->
    if document.defaultView && document.defaultView.getComputedStyle
        document.defaultView.getComputedStyle(el,null).getPropertyValue("font-size");
    else
        el.style["fontSize"]

getMainFontSize = () ->
    longElemInfos = getLongElemInfos()
    parentNodeInfos = []
    for longElemInfo in longElemInfos
        longElem = longElemInfo.elem
        alreadyIn = false
        for nodeInfo in parentNodeInfos
            if nodeInfo.node == longElem.parentNode
                alreadyIn = true
                nodeInfo.count++
                nodeInfo.length += longElemInfo.length
                
        if !alreadyIn
            parentNodeInfo = {node: longElem.parentNode, sample: longElem, count: 1, length: longElemInfo.length}
            parentNodeInfos.push parentNodeInfo
            
    console.log parentNodeInfos
    
    maxLen = 0
    for parentNodeInfo in parentNodeInfos
        if (parentNodeInfo.length > maxLen)
            maxLen = parentNodeInfo.length
            theSample = parentNodeInfo.sample
    console.log theSample
    parseFloat(getElemFontSize(theSample))

magicZoom = () ->
    zoom = PREFERRED_FONT_SIZE / getMainFontSize()
    document.body.style.zoom = zoom
    
magicZoom()