const path = require("path");
const config = new (require("webpack-chain"))();
const isDev = !!process.env.WEBPACK_DEV_SERVER; // 判断是否是开发环境
const genUrlLoaderOptions = (dir) => {
  return {
    limit: 4 * 1024, // url-loader 对于文件大小限制 4kb
    fallback: {
      loader: require.resolve("file-loader"),
      options: {
        name: `${dir}/[name].[contenthash:8].[ext]`,
      },
    },
  };
};
config
  .target("web") // 设置 target 为 web
  .context(path.resolve(__dirname, ".")) // webpack 上下文目录为项目根目录
  .entry("app") // 入口文件名称为 app
  .add("./src/main.js") // 入口文件为 ./src/main.js
  .end()
  .output.path(path.join(__dirname, "./dist")) // webpack 输出的目录为根目录的 dist 目录
  .filename("[name].[contenthash:8].js") // 打包出来的 bundle 名称为 "[name].[hash:8].js"
  .publicPath("/") // publicpath 配置为 "/"
  .end()
  .resolve.extensions.add(".js")
  .add(".jsx")
  .add(".vue") // 配置以 .js 等结尾的文件当模块使用的时候都可以省略后缀
  .end()
  .end()
  .module.rule("images") // 配置图片
  .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  .use("url-loader")
  .loader(require.resolve("url-loader"))
  .options(genUrlLoaderOptions("img"))
  .end()
  .end()
  .rule("svg") // 配置 svg
  .test(/\.(svg)(\?.*)?$/)
  .use("file-loader")
  .loader(require.resolve("file-loader"))
  .options({
    name: "img/[name].[contenthash:8].[ext]",
  })
  .end()
  .end()
  .rule("media") // 配置 media
  .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
  .use("url-loader")
  .loader(require.resolve("url-loader"))
  .options(genUrlLoaderOptions("media"))
  .end()
  .end()
  .rule("fonts") // 配置字体文件
  .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
  .use("url-loader")
  .loader(require.resolve("url-loader"))
  .options(genUrlLoaderOptions("fonts"))
  .end()
  .end()
  .rule("css") // css 相关配置
  .test(/\.css$/)
  .use("extract-loader") // 提取 css 样式到单独 css 文件
  .loader(require("mini-css-extract-plugin").loader)
  .end()
  .use("css-loader") // 加载 css 模块
  .loader("css-loader")
  .end()
  .use("postcss-loader") // 处理 css 样式
  .loader("postcss-loader")
  .end()
  .end()
  .rule("sass") // sass-loader 相关配置
  .test(/\.(sass|scss)$/) // Sass 和 Scss 文件
  .use("extract-loader") // 提取 css 样式到单独 css 文件
  .loader(require("mini-css-extract-plugin").loader)
  .end()
  .use("css-loader") // 加载 css 模块
  .loader("css-loader")
  .end()
  .use("postcss-loader") // 处理 css 样式
  .loader("postcss-loader")
  .end()
  .use("sass-loader") // Sass 语法转 css 语法
  .loader("sass-loader")
  .end()
  .end()
  .rule("js")
  .test(/\.m?jsx?$/) // 对 mjs、mjsx、js、jsx文 件进行 babel 配置
  .exclude.add((filepath) => {
    // Don't transpile node_modules
    return /node_modules/.test(filepath);
  })
  .end()
  .use("babel-loader")
  .loader("babel-loader")
  .end()
  .end()
  .rule("vue") // vue-loader 相关配置
  .test(/\.vue$/) // 匹配 .vue 文件
  .use("vue-loader")
  .loader("vue-loader")
  .end()
  .end()
  .rule("eslint") // 添加 eslint-loader
  .exclude.add(/node_modules/) // 校验的文件除 node_modules 以外
  .end()
  .test(/\.(vue|(j)sx?)$/) // 加载 .vue、.js、.jsx 文件
  .use("eslint-loader")
  .loader(require.resolve("eslint-loader"))
  .options({
    emitWarning: true, // 出现警告是否终止 webpack 编译
    emitError: !isDev, // 生成环境编译报错
  })
  .end()
  .end()
  .end()
  .plugin("vue-loader-plugin") // vue-loader 必须要添加 vue-loader-plugin
  .use(require("vue-loader").VueLoaderPlugin, [])
  .end()
  .plugin("html") // 添加 html-webpack-plugin 插件
  .use(require("html-webpack-plugin"), [
    {
      template: path.resolve(__dirname, "./public/index.html"), // 指定模版文件
      chunks: ["app"], // 指定需要加载的 chunk
      inject: "body", // 指定 script 脚本注入的位置为 body
    },
  ])
  .end()
  .plugin("extract-css") // 提取 css 样式到单独 css 文件
  .use(require("mini-css-extract-plugin"), [
    {
      filename: isDev ? "css/[name].css" : "css/[name].[contenthash].css",
      chunkFilename: isDev ? "css/[id].css" : "css/[id].[contenthash].css",
    },
  ])
  .end()
  .devServer.host("localhost") // 服务器外部可访问
  .disableHostCheck(true) // 关闭白名单校验
  .contentBase([path.resolve(__dirname, "./public")]) // 设置一个 express 静态目录
  .port(8080) // 当前端口号
  .hot(true) // 打开页面热载功能
  .sockPort("location") // 设置成平台自己的端口
  .open(true)
  .before((app, devServer, compiler) => {
    const glob = require("glob");
    const mockPaths = `${path.join(__dirname, "./mock")}/*.js`; // 获取所有的 mock 函数
    glob(mockPaths, function (er, files) {
      files.forEach((mockFile) => {
        // 遍历所有的 mock 函数
        const mockFunc = require(mockFile); // 获取当前 mock 函数
        const methodName = path.basename(mockFile).split(".")[0]; // 获取当前 mock 名称
        app.all("/api/" + methodName, mockFunc); // 添加 mock 函数到服务器
      });
    });
  });
//----- optimization start-----
config.when(
  !isDev,
  () => {
    // 生成环境的时候
    config.optimization
      .minimize(true) // 打开压缩代码开关
      .minimizer("terser")
      .use(require("terser-webpack-plugin"), [
        {
          extractComments: false, // 去除注释
          terserOptions: {
            output: {
              comments: false, // 去除注释
            },
          },
        },
      ]);
  },
  () => {
    // 开发环境的时候
    config.devtool("eval-source-map");
  }
);
config.optimization
  .splitChunks({
    cacheGroups: {
      vendors: {
        // 分离入口文件引用 node_modules 的 module（vue、@babel/xxx）
        name: `chunk-vendors`,
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: "initial",
      },
      common: {
        // 分离入口文件引用次数 >=2 的 module
        name: `chunk-common`,
        minChunks: 2,
        priority: -20,
        chunks: "initial",
        reuseExistingChunk: true,
      },
    },
  })
  .runtimeChunk("single"); // 分离 webpack 的一些帮助函数，比如 webpackJSONP 等等
//----- optimization end-------
module.exports = config.toConfig();