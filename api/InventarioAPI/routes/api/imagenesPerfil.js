const { Perfiles } = require('../../db');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const diskstorage = multer.diskStorage({
    destination: 'storage/img',
    filename:(req,file,cb) => {
        cb(null,Date.now()+'-upp-'+file.originalname);
    }
});


const fileUpload = multer({
    storage:diskstorage
}).single('image')

router.post('/',fileUpload,async(req,res)=>{
    const {nameFotoUsuario,typeFotoUsuario} =  req.body;
    console.log(req.file);
    
    const NewPhoto = {
        nameFotoUsuario : nameFotoUsuario,
        typeFotoUsuario : typeFotoUsuario,
        dataFotoUsuario : (req.file.filename)
    }

    const Foto = await Perfiles.create(NewPhoto);

    res.json(Foto);
});





module.exports = router;