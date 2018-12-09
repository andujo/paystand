'use strict'
exports.test = function (req, res) {
    res.send('OK') // simple test
}

exports.convert = function (req, res) {
    var xmlText = req.body
    if (xmlText.length > 0) res.send(getContentChild(xmlText))
    res.send('Invalid XML')
}

function getContentChild(strXml) {
    var json = ''
    do {
        var startNodeName = strXml.indexOf('<') // search childs
        if (startNodeName === -1) { // if hasn't childs
            return '"' + strXml + '"' // only has data
        }
        var nodeName = strXml.substring(startNodeName + 1, strXml.indexOf('>'))
        var inNode = strXml.slice(strXml.indexOf(createNodeName(nodeName)) + nodeName.length + 2, strXml.indexOf(createNodeName(nodeName, true)))
        strXml = removeUsedText(strXml, inNode, nodeName)
        json += (json ? ',' : '') // add comma when are more than 1
        json += (json ? '' : '{') + '"' + nodeName + '":' + getContentChild(inNode)  // recursive
    } while (strXml.indexOf('<') >= 0)
    json += "}" // add close element at the end
    return json
}

function createNodeName(name, isClose) {
    // change element by <element> and </element>
    if (isClose) return '</' + name + '>'
    return '<' + name + '>'
}

function removeUsedText(str, used, nodeName) {
    return str.replace(createNodeName(nodeName) + used + createNodeName(nodeName, true), '')
}