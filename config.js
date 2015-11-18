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
        './src/**/*.css'
      ]
    },
    vendor: {
      scripts: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/react/react-with-addons.js',
        './bower_components/react/react-dom.js'
      ],
      styles: [
        './bower_components/pure/pure.css',
        './bower_components/pure/grids.css'
      ]
    }
  }
};