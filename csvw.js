import sinkToDuplex from '@rdfjs/sink-to-duplex'
import rdf from 'rdf-ext'
import CsvwParser from 'rdf-parser-csvw'

function toDataset (streamOrDataset) {
  if (!streamOrDataset.readable) {
    return Promise.resolve(streamOrDataset)
  }

  return rdf.dataset().import(streamOrDataset)
}

function parse (args) {
  let metadata
  let relaxColumnCount = false
  let skipLinesWithError = false
  let timezone = 'local'

  if (args.metadata) {
    metadata = args.metadata

    if (typeof args.relaxColumnCount !== 'undefined') {
      relaxColumnCount = Boolean(args.relaxColumnCount)
    }

    if (typeof args.skipLinesWithError !== 'undefined') {
      skipLinesWithError = Boolean(args.skipLinesWithError)
    }

    if (typeof args.timezone !== 'undefined') {
      timezone = args.timezone
    }
  } else {
    metadata = args
  }

  return toDataset(metadata).then(dataset => {
    return sinkToDuplex(new CsvwParser({
      metadata: dataset,
      relaxColumnCount,
      skipLinesWithError,
      timezone
    }), {
      readableObjectMode: true
    })
  })
}

export {
  parse
}
