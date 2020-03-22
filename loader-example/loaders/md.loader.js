
const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const html = require('remark-html')
const report = require('vfile-reporter')

async function getFile(content, sourceMaps, meta) {
    const res = await remark()
        .use(recommended)
        .use(html)
        .process(content, function (err, file, sourceMaps, meta) {
            // console.error(report(err || file))
            console.log(file)
            return file
        })
    return res
}

class MarkdownParser {
    constructor(file) {
        this.data = this.traverse(file);
    }

    traverse(file) {
        console.log("file", file)
        // switch (type) {

        //     default:
        //         throw Error("unvalid node");
        // }
    }
}
module.exports = async function (content, map, meta) {
    // 涉及到加载模块，异步loader
    try {
        // let callback = this.async();
        this.cacheable && this.cacheable();
        let res = await getFile(content, map, meta)
        console.log(res)
        const parser = new MarkdownParser(res)
        console.log("parser", parser)
        return "content"
        // 当调用 callback() 时总是返回 undefined
    } catch (err) {
        this.emitError(err);
        return null
    }

};

