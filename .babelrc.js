const isProd = String(process.env.NODE_ENV) === 'production'
const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTest ? 'commonjs' : false }],
    "@babel/preset-typescript",
    [
      '@emotion/babel-preset-css-prop', // might be usefull
      {
        hoist: isProd ? "always" : "never",
        sourceMap: !isProd ? "always" : "never",
        autoLabel: !isProd ? "always" : "never",
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  // plugins: ['@babel/plugin-transform-runtime'],
}