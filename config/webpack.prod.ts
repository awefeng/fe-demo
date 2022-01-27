import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'
import commonConfig from './webpack.common'
import { merge } from 'webpack-merge'

const prodConfig: Configuration = {
  mode: 'production',
  devtool: 'nosources-source-map',
  module: {
    rules: [
      // less css 文件的处理
      {
        test: /\.(le|c)ss$/i,
        exclude: /node_modules/,
        use: [
          // 生产环境进行压缩  本地dev直接使用style-loader
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            /**
             * 开启css module
             * css文件处理之前先加载上一个loader 即postcss-loader 来处理兼容问题
             */
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[hash:base64]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // 自动添加不同浏览器前缀 并处理新特性
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    })
  ]
}

export default merge<Configuration>(commonConfig, prodConfig)
