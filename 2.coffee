MAGIC_TEXT_LENGTH = 30

getTextLength = (elem) ->
    totalLength = 0
    for node in elem.childNodes
        if node.nodeType == Node.TEXT_NODE
            totalLength += node.textContent.length
    totalLength

getLongElements = () ->
    longElements = []
    paragraphs = document.getElementsByTagName("p")
    for p in paragraphs
        longElements.push p if getTextLength(p) > MAGIC_TEXT_LENGTH
    console.log longElements
    longElements
    
getLongElements()