const router = require('express').Router();
const {Area} = require('../../db');


router.get('/',async(req,res)=>{
    const areas =  await Area.findAll();
    res.json(areas);
});


router.post('/',async(req,res)=>{
    const areas= await Area.create(req.body);
    res.json(areas);
});


router.put('/:id_Area',async (req,res)=>{
    await Area.update(req.body,{
        where: {id_Area: req.params.id_Area}
    });
    res.json({sucess:'Area actualizada con exito'});
});

router.delete('/:id_Area',async(req,res)=>{
    await Area.destroy({
        where: {id_Area: req.params.id_Area}
    });
    res.json({sucess:'Area Eliminada con Exito'});
});

router.get('/area/:id_Area',async(req,res)=>{
    const areas = await Area.findOne({
        where:{id_Area: req.params.id_Area}});
    res.json(areas);
});

module.exports = router;