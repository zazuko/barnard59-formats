const sinkToDuplex = require('@rdfjs/sink-to-duplex')
const Serializer = require('@rdfjs/parser-n3')

function parse () {
  return sinkToDuplex(new Serializer(), {
    readableObjectMode: true,
    writableObjectMode: true
  })
}

module.exports = {
  parse
}
