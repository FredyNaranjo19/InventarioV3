const router = require("express").Router();
const { Proyecto } = require("../../db");

router.get("/", async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.json(proyectos);
});

router.post("/", async (req, res) => {
  const proyecto = await Proyecto.create(req.body);
  res.json(proyecto);
});

router.put("/:proyectoId", async (req, res) => {
  await Proyecto.update(req.body, {
    where: { id_Proyecto: req.params.proyectoId },
  });
  res.json({ sucess: "proyecto se ha actualizado con exito" });
});

router.delete("/:proyectoId", async (req, res) => {
  await Proyecto.destroy({
    where: { id_Proyecto: req.params.proyectoId },
  });
  res.json({ sucess: "proyecto se ha eliminado con exito" });
});

module.exports = router;
