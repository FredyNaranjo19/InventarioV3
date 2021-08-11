const router = require('express').Router();
const {Contabilidad} = require('../../db');

router.get('/',async(req,res)=>{
    const contabilidades = await Contabilidad.findAll();
    res.json(contabilidades);
});

router.post('/',async(req,res)=>{
    const contabilidad= await Contabilidad.create(req.body);
    res.json(contabilidad);
});


router.put('/:contabilidadId',async (req,res)=>{
    await Contabilidad.update(req.body,{
        where: {id: req.params.contabilidadId}
    });
    res.json({sucess:'actualizado con exito'});
});

router.delete('/:contabilidadId',async(req,res)=>{
    await Contabilidad.destroy({
        where: {id_comentarioContabilidad: req.params.contabilidadId}
    });
    res.json({sucess:'se ha eliminado con exito'})
});

module.exports = router;