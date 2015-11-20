//config.js

module.exports = {
  bundle: {
    dir: './dist/',
    main: {
      jade: './src/*.jade',
      indexJsx: './src/index.jsx',
      jsx: [
        './src/components/**/*.jsx',
        './src/index.jsx'
      ],
      styles: [
        './src/**/*.less'
      ]
    },
    vendor: {
      scripts: [],
      styles: [
        './bower_components/pure/pure.css',
        './bower_components/pure/grids-responsive.css'
      ]
    }
  },
  lint:{
    configFile: './eslint.config.json'
  }
};