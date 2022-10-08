const multer = require('multer');
const path=require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (path.extname(file.originalname)===".png"||path.extname(file.originalname)===".jpg") {
			cb(null, true);
            // console.log(true);
		} else {
			// You can always pass an error if something goes wrong:
			   cb(new Error('Uploads only jpg and png  files !'));
            //    cb(null,false);

			// cb(null, false);
		}
        // console.log(path.extname(file.originalname));
	},
}).array("image", 4);

const uploadImg=(req,res,next)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.status(400).json({"Error":err.message});
        } else if (err) {
            res.status(500).json({"Error":err.message})
          // An unknown error occurred when uploading.
        }else{
            next();
        }
    
        // Everything went fine.
      })
}
module.exports = { uploadImg };
