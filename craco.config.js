module.exports = {
  webpack: {
    configure: {
      output: {
        filename: 'static/js/[name].js',
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false
          },
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          let mcep
          webpackConfig.plugins.some((p) => {
            if (p.constructor.name === 'MiniCssExtractPlugin') {
              mcep = p
              return true
            }
          })
          if (mcep) {
            mcep.options.filename = 'static/css/[name].css'
          }

          return webpackConfig
        },
      },
      options: {},
    },
  ],
}
