const express = require('express')
const request = require('superagent')
const app = express()

let result = []
app.use('/public', express.static('./public'))
app.engine('html', require('express-art-template'))

let pageSize = 20
let params = {
    page: 0,
    pageSize
}

function fuzzyQuery(list, keyWord) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].title.toLowerCase().split(keyWord.toLowerCase()).length > 1) {
            arr.push(list[i]);
        }
    }
    return arr;
}
function getInfo(page = 0, userId) {
    let url = `https://user-like-wrapper-ms.juejin.im/v1/user/${userId}/like/entry`
    params.page = page
    request.get(`${url}?page=0&pageSize=${pageSize}`).set("X-Juejin-Src", "web").send(params).end((err, res) => {
        if (err) {
            return console.log(err)
        }

        let entryList = JSON.parse(res.text).d.entryList
        const total = JSON.parse(res.text).d.total
        let pages = Math.ceil(total / pageSize)
    
        result = [...entryList]
        for (var i = 1; i < pages; i++) {
            params.page = i
            request.get(`${url}?page=${i}&pageSize=${pageSize}`).set("X-Juejin-Src", "web").send(params).end((err, res) => {
                if (err) {
                    return console.log(err)
                }
                let entryList = JSON.parse(res.text).d.entryList
                result = [...result, ...entryList]
                 
            })
        }

    })
}

app.get('/', (req, res, next) => {

    res.render('index.html', {
        result
    })
})

app.get('/getList/:userId', (req, res, next) => {
    // getInfo(0, req.params.userId, req.query)
    // res.render('index.html', {
    //     result
    // })
    res.status(200),
        res.json([...result])
})
app.listen(3000, () => {
    console.log('running...')
})