const multer = require('multer');
const path = require('path');


const diskstorage = multer.diskStorage({
    destination:path.join(__dirname,'../storage/img'),
    filename:(req,file,cb) => {
        cb(null,Date.now()+'-upp-'+file.original.name);
    }
});



export default diskstorage;