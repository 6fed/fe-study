const express = require('express')
const request = require('superagent')
const app = express()

let result = []
 

let pageSize = 30
let params = {
    page: 0,
    pageSize
}

// function fuzzyQuery(list, keyWord) {
//     var arr = [];
//     for (var i = 0; i < list.length; i++) {
//         if (list[i].title.toLowerCase().split(keyWord.toLowerCase()).length > 1) {
//             arr.push(list[i]);
//         }
//     }
//     return arr;
// }
function handleResult(list) {
    let newList = []
    list.map(item => {
        let obj = {}
        const { tags, category, collectionCount, content:description, createdAt, hot, originalUrl, title, user, viewsCount, objectId } = item
        const { username: author } = user
        const { name: type } = category
        obj = {
            tags, type, collectionCount, createdAt, description,hot, originalUrl, title, author, viewsCount, objectId
        }
        newList.push(obj)
    })
    return newList
}
function getInfo(userId) {
    let url = `https://user-like-wrapper-ms.juejin.im/v1/user/${userId}/like/entry`
 
    request.get(`${url}?page=0&pageSize=${pageSize}`).set("X-Juejin-Src", "web").end((err, res) => {
        if (err) {
            return console.log(err)
        }
        // console.log(res.text)
        let entryList = res.body.d.entryList
        const total = res.body.d.total
        let pages = Math.ceil(total / pageSize)
        entryList = handleResult(entryList)
        result = [...entryList]
        for (var i = 1; i < pages; i++) {
          request.get(`${url}?page=${i}&pageSize=${pageSize}`).set("X-Juejin-Src", "web").end((err, res) => {
              if (err) {
                  return console.log(err)
              }
              let entryList = JSON.parse(res.text).d.entryList
              entryList = handleResult(entryList)
              result = [...result, ...entryList]
          })
        }
    })
}
 
app.get('/api/getList/:userId', (req, res, next) => {
    getInfo(req.params.userId)
    res.status(200),
        res.json([...result])
})
app.listen(7000, () => {
    console.log('running...')
})