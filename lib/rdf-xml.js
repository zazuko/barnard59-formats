const sinkToDuplex = require('@rdfjs/sink-to-duplex')
const Parser = require('rdfxml-streaming-parser').RdfXmlParser

function parse () {
  return sinkToDuplex(new Parser(), {
    readableObjectMode: true,
    writableObjectMode: true
  })
}

module.exports = {
  parse
}