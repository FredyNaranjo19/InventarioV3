const router = require("express").Router();
const { Modelo } = require("../../db");

router.get("/", async (req, res) => {
  const modelos = await Modelo.findAll();
  res.json(modelos);
});

router.post("/", async (req, res) => {
  const modelos = await Modelo.create(req.body);
  res.json(modelos);
});

router.put("/:id_Modelo", async (req, res) => {
  await Modelo.update(req.body, {
    where: { id_Modelo: req.params.id_Modelo },
  });
  res.json({ sucess: "Modelo actualizado con exito" });
});

router.delete("/:id_Modelo", async (req, res) => {
  await Modelo.destroy({
    where: { id_Modelo: req.params.id_Modelo },
  });
  res.json({ sucess: "Modelo Eliminado con Exito" });
});

module.exports = router;
