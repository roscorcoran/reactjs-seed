//config.js

//Get arguments given to gulp/node
var argv = require('minimist')(process.argv.slice(2), {
  default: {
    //--env.production=true
    env: {
      dev: true,
      production: false
    },
    bundle: {
      devDir: './dev/',
      prodDir: './prod/'
    }
  }
});

module.exports = {
  env: argv.env,
  bundle: {
    dir: (argv.env.production ? argv.prodDir : argv.devDir),
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