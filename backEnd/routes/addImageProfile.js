module.exports = function (db,app,multer,fileExtension) {


    var storage = multer.diskStorage({

        // Setting directory on disk to save uploaded files
        destination: function (req, file, cb) {
            cb(null, 'profileImages');
        },
    
        // Setting name of file saved
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
        }
    })
    var upload = multer({
        storage: storage,
        limits: {
            // Setting Image Size Limit to 2MBs
            fileSize: 2000000
        },
        fileFilter(req, file, cb) {
         
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                //Error 
                cb(new Error('Please upload JPG and PNG images only!'))
            }
            //Success 
            console.log("In File uplaod",file.originalname);
            cb(undefined, true)
        }
    })    









    app.post('/uploadProfileImage', upload.single('uploadedImage'), (req, res, next) => {
       
        console.log("in image file upload");
        const file = req.file
        console.log(req);
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            uploadedFile: file
        })
    
    }, (error, req, res, next) => {
        res.status(400).send({
            error: error.message
        })
    })
}                                                                                           









