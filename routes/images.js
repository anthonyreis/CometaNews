const express = require('express')
const Image = require('../src/models/image')
const fs = require('fs')
const path = require('path')
const { upload } = require('../src/middleware/multer')

const router = new express.Router()

router.get('/images', (req, res) => {
    Image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err)
        }
        else {
            res.render('images', { items: items })
        }
    })
})

router.post('/images', upload.single('image'), (req, res) => {
   
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/images');
        }
    })
})

module.exports = router