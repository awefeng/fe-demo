import { HotModuleReplacementPlugin, Configuration } from 'webpack'
import { resolve } from 'path'
import { merge } from 'webpack-merge'
import commonConfig from './webpack.common'
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

//https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
const devConfig: Configuration & { devServer: { [key: string]: any } } = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: resolve(__dirname, '../dist'),
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 8080
  },
  module: {
    rules: [
      // less css 文件的处理
      {
        test: /\.(le|c)ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new HotModuleReplacementPlugin()]
}

export default merge<Configuration>(commonConfig, devConfig)
