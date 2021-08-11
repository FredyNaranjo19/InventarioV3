const router = require('express').Router();
const {Trimestre} = require('../../db');

router.get('/',async(req,res)=>{
    const trimestres = await Trimestre.findAll();
    res.json(trimestres);
});

router.post('/',async(req,res)=>{
    const trimestres = await Trimestre.create(req.body);
    res.json(trimestres);
});


router.put('/:id_Trimestre',async (req,res)=>{
    await Trimestre.update(req.body,{
        where: {id_Trimestre: req.params.id_Trimestre}
    });
    res.json({sucess:'trimestre actualizado con exito'});
});

router.delete('/:id_Trimestre',async(req,res)=>{
    await Trimestre.destroy({
        where: {id_Trimestre: req.params.id_Trimestre}
    });
    res.json({sucess:'trimestre se ha eliminado con exito'})
});

module.exports = router;