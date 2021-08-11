const router = require('express').Router();
const {Test} = require('../../db');

router.get('/',async(req,res)=>{
    const tests = await Test.findAll();
    res.json(tests);
});

router.post('/',async(req,res)=>{
    const test= await Test.create(req.body);
    res.json(test);
});


router.put('/:testId',async (req,res)=>{
    await Test.update(req.body,{
        where: {id: req.params.testId}
    });
    res.json({sucess:'actualizado con exito'});
});

router.delete('/:testId',async(req,res)=>{
    await Test.destroy({
        where: {id: req.params.testId}
    });
    res.json({sucess:'se ha eliminado con exito'})
});

module.exports = router;