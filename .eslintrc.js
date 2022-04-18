module.exports = {
    env: {
      node: true, // 添加 node 环境
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // 支持 jsx
      },
    },
    plugins: [
      "vue", // 添加 eslint-plugin-vue 插件
    ],
    extends: [
      "eslint:recommended", // eslint 推荐语法
      "plugin:vue/vue3-recommended", // 使用 vue3.0 推荐语法
    ],
    rules: {
      // 自定义规则
      semi: [
        // 代码结尾必须使用 “;“ 符号
        "error",
        "always",
      ],
      quotes: [
        // 代码中字符串必须使用 ”” 符号
        "error",
        "double",
      ],
      "no-console": "error", // 代码中不允许出现 console
      "vue/no-unused-components": "off"
    },
  };