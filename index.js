const fs   = require('fs')
const path = require('path')

const presets = {
  pug:  { prefix: 'include ', suffix: '',        extension: false },
  scss: { prefix: '@use "',   suffix: '" as *;', extension: false },
}

function transform(files, type, options) {
  let { prefix, suffix, extension } = Object.assign(options, presets[type])
  return files
    .map(val => prefix + (extension ? val : val.split('.').shift()) + suffix)
    .join('\n')
}

module.exports = function(directory, type, options = {}) {
  let directoryPath = path.join(path.resolve('./'), directory)
  let indexPath = `${directoryPath}/_index.${type}`
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to index directory: ' + err)
    } else {
      fs.writeFileSync(indexPath, transform(files.filter(file => file !== `_index.${type}`), type, options))
    }
  })
}
