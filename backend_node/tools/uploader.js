const multer = require('multer');
const uuidv1 = require('uuid/v1');
const path = require('path');
var fs = require('fs');
const up_dir = __dirname + '/uploads';
if (!fs.existsSync(up_dir)) {
    fs.mkdirSync(up_dir);
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
        let v = uuidv1() + path.extname(file.originalname);
        // console.log(v);

        cb(null, v)
    }
})

var upload = multer({
    storage: storage
})
module.exports = app => {
    app.post('/uploadfile', upload.single('file'), (req, res, next) => {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.json({
            url: req.protocol + '://' + req.get('host') + `/download?file=${file.filename}`
        })

    })
    //Uploading multiple files
    app.post('/uploadmultiple', upload.array('file', 12), (req, res, next) => {
        const files = req.files
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }

        res.send(files)

    })

    app.get('/download', function (req, res) {
        var file = req.query.file;
        res.sendfile(__dirname + '/uploads/' + file);
    });

}