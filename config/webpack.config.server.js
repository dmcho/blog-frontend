const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: paths.ssrJs,
  target: 'node',
  output: {
    path: paths.ssrBuild,
    filename: 'render.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            loader: require.resolve('css-loader/locals'),
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: require.resolve('css-loader/locals'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]' // 'css module 사용할것이다' 라는 선언
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  includePaths: [paths.globalStyles]
                }
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              // 경로만 만들고, 실제로 파일을 따로 저장하지는 않습니다.
              emitFile: false
            },
          }

        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified), // 현재 빌드의 환경변수를 가져오는것
  ]
}

