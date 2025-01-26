const express = require('express')
const axios = require('axios')

const addr = require('./Utility/address.cjs')
const Request = require('./Utility/request.cjs')

module.exports = router = express.Router()

router.use('/home', express.static('View/Library'))
router.use('/home', express.static('View/Res'))
router.get('/home', home)


//  Router logic
function home(req, res, next) {
    getNoteList()
    .then(sendHomeView)
    .then(next)
    .catch(console.log)


    function getNoteList() {
        var request = new Request()
        request.method = 'GET'
        request.url = `${addr.apiAddress}:${addr.apiPort}/notes`
        
        return new Promise((resolve, reject) => {
            axios(request)
            .then((response) => {
                resolve(response.data)
            }).catch(reject)
        })
    }

    function sendHomeView(noteList) {
        var viewConfig = {}
        viewConfig.noteList = noteList
        viewConfig.addr = `${addr.address}:${addr.port}`

        return new Promise((resolve, reject) => {
            res.render('home', viewConfig)
            resolve()
        })
    }
}
