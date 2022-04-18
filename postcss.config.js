module.exports = {
    plugins: [
      require("autoprefixer")(), // 添加 autoprefixer 插件做自动添加样式前缀
      require("cssnano")({
        // 添加 cssnano 插件做 css 代码压缩
        preset: [
          "default",
          {
            mergeLonghand: false,
            cssDeclarationSorter: false,
          },
        ],
      }),
    ],
  };