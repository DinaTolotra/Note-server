const express = require('express')
const axios = require('axios')

const addr = require('./Utility/address.cjs')
const Request = require('./Utility/request.cjs')

module.exports = router = express.Router()

router.use('/edit/:id', express.static('View/Library'))
router.use('/edit/:id', express.static('View/Res'))

router.get('/edit/:id', editNote)
router.post('/edit/:id', saveUpdate)


//  Router logic
function editNote(req, res, next) {
    const id = Number(req.params.id)

    getNote()
    .then(sendEditView)
    .then(next)
    .catch(console.log)

    function getNote() {
        var request = new Request();
        request.method = 'GET'
        request.url= `${addr.apiAddress}:${addr.apiPort}/notes/${id}`

        return new Promise((resolve, reject) => {
            axios(request)
            .then((response) => {
                resolve(response.data)
            }).catch(reject)
        })
    }

    function sendEditView(note) {
        var viewConfig = {}
        viewConfig.note = note,
        viewConfig.addr = `${addr.address}:${addr.port}/edit/${note.id}`

        return new Promise((resolve, reject) => {
            res.render('edit', viewConfig)
            resolve()
        })
    }
}

function saveUpdate(req, res, next) {
    sendNote()
    .then(redirect)
    .then(next)
    .catch(console.log)


    function sendNote() {
        var request = new Request()
        request.method = 'PUT',
        request.data = req.body
        request.url = `${addr.apiAddress}:${addr.apiPort}/notes/${req.body.id}`

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
