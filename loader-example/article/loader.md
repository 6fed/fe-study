
Webpack中loader文件处理器是一个CommonJs风格的函数，该函数接收一个 String/Buffer 类型的入参，并返回一个 String/Buffer 类型的返回值。
```js
import { getOptions } from 'loader-utils';
import { validateOptions } from 'schema-utils';
module.exports = function(content, map, meta) {
 // 获取 options
  const options = getOptions(this);
  // 检验loader的options是否合法
  validateOptions(schema, options, 'Demo Loader');
   // 在这里写转换 loader 的逻辑
  // ...
}
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
import a from 'raw-loader!../../utils.js'
```

三、loader 的一些开发技巧
1、单一任务
只做一件事情，做好一件事情。loader 的管道（pipeline）设计正是希望能够将任务拆解并独立成一个个子任务，由多个 loader 分别处理，以此来保证每个 loader 的可复用性。因此我们在开发 loader 前一定要先给 loader 一个准确的功能定位，从通用的角度出发去设计，避免做多余的事。

2、无状态
loader 应该是不保存状态的。这样的好处一方面是使我们 loader 中的数据流简单清晰，另一方面是保证 loader 具有良好可测性。因此我们的 loader 每次运行都不应该依赖于自身之前的编译结果，也不应该通过除出入参外的其他方式与其他编译模块进行数据交流。当然，这并不代表 loader 必须是一个无任何副作用的纯函数，loader 支持异步，因此是可以在 loader 中有 I/O 操作的。

3、尽可能使用缓存
在开发时，loader 可能会被不断地执行，合理的缓存能够降低重复编译带来的成本。loader 执行时默认是开启缓存的，这样一来， webpack 在编译过程中执行到判断是否需要重编译 loader 实例的时候，会直接跳过 rebuild 环节，节省不必要重建带来的开销。

当且仅当有你的 loader 有其他不稳定的外部依赖（如 I/O 接口依赖）时，可以关闭缓存：
```js
this.cacheable&&this.cacheable(false);
```
 

 这样一来，我们需要的 md-loader，就只做一件事情：将 md 的数据转化成为一个 JSON 字符串。因此，我们可以很简单地实现这样一个 md-loader：