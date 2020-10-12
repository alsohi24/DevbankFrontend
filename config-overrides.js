const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@styles' : 'src/styles',
    '@pages': 'src/pages',
    '@icons': 'public/icons',
  })(config)

  return config
}