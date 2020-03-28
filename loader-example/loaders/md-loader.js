const md = require('markdown-ast');
const loaderUtils = require("loader-utils");
// 利用 AST 作源码转换
class MdParser {
    constructor(content) {
        this.data = md(content);
        this.parse()
    }
    parse() {
        console.log("md转抽象语法树")
        this.data = this.traverse(this.data);
    }
    traverse(node) {
        console.log(node)

        switch (node) {
            case "bold":
            // **text**

            case "image":

            case "link":

            case "list":

            case "title":

            //...更多就不列举了
            default:
                throw Error("error");
        }
    }
}
module.exports = function (content) {
    this.cacheable && this.cacheable();

    const options = loaderUtils.getOptions(this);

    try {
        const parser = new MdParser(content);
        // console.log(md(content))
        return "md(content)"
    } catch (err) {
        this.emitError(err);
        return null
    }

};

