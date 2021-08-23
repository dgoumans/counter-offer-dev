import path from 'path'

module.exports = {
  root: 'widget',
  build: {
    lib: {
      entry: path.resolve(__dirname, '..', 'widget', 'index.js'),
      name: 'counter-offer',
    },
    outDir: path.resolve(__dirname, '..', 'public', 'js'),
  },
  plugins: [
    require('rollup-plugin-svelte')({
      emitCss: false,
    }),
  ],
}
