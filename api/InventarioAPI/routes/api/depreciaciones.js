const { Depreciacion } = require("../../db");
const router = require("express").Router();

router.get("/", async (req, res) => {
    const depreciaciones = await Depreciacion.findAll();
    res.json(depreciaciones);
  });
  
  router.post("/", async (req, res) => {
    const depreciacion = await Depreciacion.create(req.body);
    res.json(depreciacion);
  });
  
  router.put("/:id_CatalogoDepreciacion", async (req, res) => {
    await Depreciacion.update(req.body, {
      where: { id_CatalogoDepreciacion: req.params.id_CatalogoDepreciacion },
    });
    res.json({ sucess: "Depreciacion actualizada con exito" });
  });
  
  router.delete("/:id_CatalogoDepreciacion", async (req, res) => {
    await Depreciacion.destroy({
      where: { id_CatalogoDepreciacion: req.params.id_CatalogoDepreciacion },
    });
    res.json({ sucess: "Depreciacion Eliminada con Exito" });
  });
  
  module.exports = router;