const marked = require("marked");
 
const loaderUtils = require("loader-utils");
module.exports = function (content, map, meta) {
    this.cacheable && this.cacheable();
    // merge params and default config
    const options = loaderUtils.getOptions(this);
    // 涉及到加载模块，异步loader
    try {
        marked.setOptions(options);
        console.log(marked(content))
        return marked(content)
    } catch (err) {
        this.emitError(err);
        return null
    }
    return
};

