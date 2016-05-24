var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'), // 生成html模板插件
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // 外联css样式插件

var args = require('node-args') // 获取参数
var projectName = require('./p') // 项目名称

var path = require('path'),
  projectPath = path.join(__dirname, 'src', projectName), // 项目绝对路径
  modulePath = path.join(__dirname, 'node_modules')

var config = {
  entry: {
    server: path.join(projectPath, 'server.js'),
    app: path.join(projectPath, 'main.js'), //入口js文件
    vender: ['vue', 'vue-router', 'vue-async-data']
  },
  output: {
    path: 'dist',
    filename: '[name].js?[hash:7]' //此处的name与entry中的键名一样
  },
  // externals: {
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vue-async-data': 'VueAsyncData',
  // },
  module: {
    // noParse: [/.\/server.js?noNeedParse/], //会直接打包而进行扫文件解析 省去了时间 注意此项会忽略此包依赖
    loaders: [{
      test: /\.vue$/,
      loader: 'vue',
    }, {
      test: /\.js/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.json/,
      loader: 'json'
    }, {
      test: /\.(png|jpg|gif|svg|mp3|ogg)$/,
      loader: 'url',
      query: {
        limit: 1000,
        name: '[name].[ext]?[hash:7]'
      }
    }, {
      test: /favicon.ico/,
      loader: 'file',
      query: {
        name: 'favicon.ico'
      }
    }, ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vender', 'vender.js'),
    new ExtractTextWebpackPlugin('app.css?[hash:7]', { allChunks: true }),
    new HtmlWebpackPlugin({
      // filename: '../index.html', //以生成资源path路径为基本路径的上一级目录
      template: path.join(projectPath, 'index.html'), //模板路径位置
      inject: true, // js css 插入模板
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.vue'],
    alias: {
      'jo': path.join(__dirname, 'public/js/jo.js'), // jo组件路径别名
      'api': path.join(__dirname, 'public/api/api.js'),
    }
  },
  vue: {
    loaders: {
      css: ExtractTextWebpackPlugin.extract('css'),
      sass: ExtractTextWebpackPlugin.extract('css!sass')
    }
  }
}

/** Development **/
if (args.dev) {
  config.devtool = 'source-map'
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        DEBUG: true // 自定义环境参数
      }
    })
  )
  config.resolve.alias['vue'] = path.join(modulePath, 'vue/dist/vue.js')
  config.resolve.alias['vue-router'] = path.join(modulePath, 'vue-router/dist/vue-router.js')
}

/** Production **/
if (args.production) {
  config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        margle: false,
        sourcemap: false,
      }),
      new webpack.optimize.DedupePlugin(), // 依赖去重
      new webpack.optimize.OccurenceOrderPlugin() // 序列化压缩后的代码排序
    ),
    config.resolve.alias['vue'] = path.join(modulePath, 'vue/dist/vue.min.js')
  config.resolve.alias['vue-router'] = path.join(modulePath, 'vue-router/dist/vue-router.min.js')
}

module.exports = config;
