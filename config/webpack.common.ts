import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { Configuration, ProgressPlugin } from 'webpack'
import LodashWebpackPlugin from 'lodash-webpack-plugin'

const commonConfig: Configuration = {
  // 入口
  entry: {
    app: resolve(__dirname, '../src', 'app')
  },
  // 输出
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '#': resolve(__dirname, '../config')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
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
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[file]'
        }
      }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new LodashWebpackPlugin(),
    // 打包之前清理dist
    new CleanWebpackPlugin(),
    // 从模板自动生成html
    new HtmlWebpackPlugin({ template: 'index.html' })
  ]
}

export default commonConfig
