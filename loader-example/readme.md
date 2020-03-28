
Webpack中loader文件处理器是一个CommonJs风格的函数，该函数接收一个 String/Buffer 类型的入参，并返回一个 String/Buffer 类型的返回值。
```js
import { getOptions } from 'loader-utils'; 
import { validateOptions } from 'schema-utils';  
const schema = {
  // ...
}
export default function(source) {
  // 获取 options
  const options = getOptions(this);
  // 检验loader的options是否合法
  validateOptions(schema, options, 'Demo Loader');

  // 在这里写转换 loader 的逻辑
  // ...
};
```
- content: 表示源文件字符串或者buffer
- map: 表示sourcemap对象
- meta: 表示元数据，辅助对象

## loader 的配置
方案1:
```js

// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /.vue$/,
      loader: 'vue-loader'
    }, {
      test: /.scss$/,
      // 先经过 sass-loader，然后将结果传入 css-loader，最后再进入 style-loader。
      use: [
        'style-loader',//从JS字符串创建样式节点
        'css-loader',// 把  CSS 翻译成 CommonJS
        {
          loader: 'sass-loader',
          options: {
            data: '$color: red;'// 把 Sass 编译成 CSS
          }
        }
      ]
    }]
  }
  ...
}
```
方法2（右到左地被调用）
```js
// module
import a from '"./loader1?xyz!loader2!./resource?rrr"'
```

当链式调用多个 loader 的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。

三、loader的一些开发技巧
1. 单一性：一个loader制作一件事情，可以用不同的loader组合不同的场景需求,一个loader做两件事情，不如拆成2个loader来实现
2. 模块化：保证 loader 是模块化的。loader 生成模块需要遵循和普通模块一样的设计原则。
2. 无状态：在多次模块的转化之间，我们不应该在 loader 中保留状态。loader必须是一个无任何副作用的纯函数，loader 支持异步，因此是可以在 loader 中有 I/O 操作的。
模块化：保证 loader 是模块化的。loader 生成模块需要遵循和普通模块一样的设计原则。
4. 尽可能使用缓存
合理的缓存能够降低重复编译带来的成本。loader 执行时默认是开启缓存的，这样一来， webpack 在编译过程中执行到判断是否需要重编译 loader 实例的时候，会直接跳过 rebuild 环节，节省不必要重建带来的开销。
但是当且仅当有你的 loader 有其他不稳定的外部依赖（如 I/O 接口依赖）时，可以关闭缓存：
```js
this.cacheable&&this.cacheable(false);
```


同步 loader，我们可以通过`return`和`this.callback`返回输出的内容，异步loader，使用 this.async 来获取 callback 函数。详情请参考[官网API](https://www.webpackjs.com/api/loaders/#%E5%90%8C%E6%AD%A5-loader)

