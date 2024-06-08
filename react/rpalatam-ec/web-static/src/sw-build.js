// eslint-disable-next-line @typescript-eslint/no-var-requires
const workboxBuild = require('workbox-build')

/* const workboxConfig = {
  globDirectory: 'build',
  globPatterns: [
    'favicon.ico',
    'index.html',
    '*.css',
    '*.js'
  ],
  swSrc: 'src/sw.js',
  swDest: 'build/sw.js'
}; */

// NOTE: This should be run *AFTER* all your assets are built
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const buildSW = () => {
  // This will return a Promise
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globPatterns: ['**/*.{js,css,png}'],
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn)
      console.log(`${count} files will be precached, totaling ${size} bytes.`)
    })
}

buildSW()
