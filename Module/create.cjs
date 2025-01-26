const express = require('express')
const axios = require('axios')

const addr = require('./Utility/address.cjs')
const Request = require('./Utility/request.cjs')

module.exports = router = express.Router()

router.use('/create', express.static('View/Library'))
router.use('/create', express.static('View/Res'))

router.get('/create', createNote)
router.post('/create', saveNote)


//  Router logic
function createNote(req, res, next) {
    sendView()
    .then(next)
    .catch(console.log)

    function sendView() {
        var viewConfig = {}
        viewConfig.addr = `${addr.address}:${addr.port}/create`

        return new Promise((resolve, reject) => {
            res.render('create', viewConfig)
            resolve()
        })
    }
}

function saveNote(req, res, next) {
    sendNote()
    .then(redirect)
    .then(next)
    .catch(console.log)


    function sendNote() {
        var request = new Request()
        request.method = 'POST',
        request.data = req.body
        request.url = `${addr.apiAddress}:${addr.apiPort}/notes`

        return new Promise((resolve, reject) => {
            axios(request)
            .then(resolve)
            .catch(reject)
        })
    }
    
    function redirect() {
        return new Promise((resolve, reject) => {
            res.redirect('/home')
            resolve()
        })
    }
}
