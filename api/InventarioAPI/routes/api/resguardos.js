const router = require('express').Router();
const {Resguardo} = require('../../db');

router.get('/',async(req,res)=>{
    const resguardos = await Resguardo.findAll();
    res.json(resguardos);
});

router.post('/',async(req,res)=>{
    const resguardo = await Resguardo.create(req.body);
    res.json(resguardo);
});


router.put('/:resguardoId',async (req,res)=>{
    await Resguardo.update(req.body,{
        where: {id_Resguardo: req.params.resguardoId}
    });
    res.json({sucess:'actualizado con exito'});
});

router.delete('/:resguardoId',async(req,res)=>{
    await Resguardo.destroy({
        where: {id_Resguardo: req.params.resguardoId}
    });
    res.json({sucess:'se ha eliminado con exito'})
});

module.exports = router;