const fs = require('fs')
const path = require('path')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const { terser } = require('rollup-plugin-terser')
const version = process.env.EVENTX_VERSION || require('./package.json').version
const banner =
`/**
 * eventx v${version}
 * (c) ${new Date().getFullYear()} zhaosaisai
 * @license MIT
 */`

const resolve = target => path.resolve(__dirname, target)

const configs = {
  umdDev: {
    file: resolve('dist/eventx.js'),
    format: 'umd'
  },
  umdProd: {
    file: resolve('dist/eventx.min.js'),
    format: 'umd',
    env: 'production'
  },
  commonjs: {
    file: resolve('dist/eventx.common.js'),
    format: 'cjs'
  },
  esm: {
    file: resolve('dist/eventx.esm.js'),
    format: 'es'
  }
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}

module.exports = generateConfig(configs)

function generateConfig(configs) {
  return {
    input: resolve('src/index.js'),
    output: Object.keys(configs).map(env => {
      const config = configs[env]
      const _config = {}

      _config.file = config.file
      _config.format = config.format
      _config.banner = banner
      _config.plugins = []

      if (config.format === 'umd') {
        _config.name = 'eventx'
      }

      if (config.env === 'production') {
        _config.plugins.push(terser())
      }

      return _config
    }),
    plugins: [
      replace({
        __VERSION__: version,
      }),
      babel()
    ]
  }
}
