const router = require('express').Router();
const {Reporte} = require('../../db');

router.get('/',async(req,res)=>{
    const reportes = await Reporte.findAll();
    res.json(reportes);
});

router.post('/',async(req,res)=>{
    const reporte= await Reporte.create(req.body);
    res.json(reporte);
});


router.put('/:reporteId',async (req,res)=>{
    await Reporte.update(req.body,{
        where: {id_Reporte: req.params.reporteId}
    });
    res.json({sucess:'actualizado con exito'});
});

router.delete('/:reporteId',async(req,res)=>{
    await Reporte.destroy({
        where: {id_Reporte: req.params.reporteId}
    });
    res.json({sucess:'se ha eliminado con exito'})
});

module.exports = router;