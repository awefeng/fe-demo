import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import prodConfig from './webpack.prod'

const analyzerConfig: Configuration = {
  plugins: [new BundleAnalyzerPlugin()]
}

export default merge<Configuration>(prodConfig, analyzerConfig)
