//config.js

module.exports = {
  bundle: {
    dir: './dist/',
    main: {
      jade: {
        in: './src/*.jade',
        out: 'index.html'
      },
      indexJsx: './src/index.jsx',
      js: {
        in: [
          './src/**/*.js',
          './src/components/**/*.jsx',
          './src/index.jsx'
        ],
        out: 'bundle.js'
      },
      styles: {
        in: [
          './src/**/*.less'
        ],
        out: 'bundle.css'
      }
    },
    vendor: {
      scripts: {
        in: [],
        out: 'vendor.js'
      },
      styles: {
        in: [
          './bower_components/pure/pure.css',
          './bower_components/pure/grids-responsive.css'
        ],
        out: 'vendor.css'
      }
    }
  },
  eslint: {
    configFile: './eslint.config.json'
  }
};