const { Proveedor } = require('../../db');
const router = require('express').Router();

router.get('/',async(req,res)=>{
    const proveedores =  await Proveedor.findAll();
    res.json(proveedores);
});


router.post('/',async(req,res)=>{
    const proveedores= await Proveedor.create(req.body);
    res.json(proveedores);
});


router.put('/:id_Proveedor',async (req,res)=>{
    await Proveedor.update(req.body,{
        where: {id_Proveedor: req.params.id_Proveedor}
    });
    res.json({sucess:'Proveedor actualizado con exito'});
});

router.delete('/:id_Proveedor',async(req,res)=>{
    await Proveedor.destroy({
        where: {id_Proveedor: req.params.id_Proveedor}
    });
    res.json({sucess:'Proveedor Eliminado con Exito'});
});

module.exports = router;