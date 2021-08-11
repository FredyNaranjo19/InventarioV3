const router = require('express').Router();
const {Conac} = require('../../db');


router.get('/',async(req,res)=>{
    const conacs =  await Conac.findAll();
    res.json(conacs);
});


router.post('/',async(req,res)=>{
    const conacs= await Conac.create(req.body);
    res.json(conacs);
});


router.put('/:id_clasificacionConac',async (req,res)=>{
    await Conac.update(req.body,{
        where: {id_clasificacionConac: req.params.id_clasificacionConac}
    });
    res.json({sucess:'Clasificacion actualizada con exito'});
});

router.delete('/:id_clasificacionConac',async(req,res)=>{
    await Conac.destroy({
        where: {id_clasificacionConac: req.params.id_clasificacionConac}
    });
    res.json({sucess:'Clasificacion Eliminada con Exito'});
});


module.exports = router;