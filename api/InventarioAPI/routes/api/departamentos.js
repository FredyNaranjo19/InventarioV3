const router = require("express").Router();
const { Departamento } = require("../../db");

router.get("/", async (req, res) => {
  const departamentos = await Departamento.findAll();
  res.json(departamentos);
});

router.post("/", async (req, res) => {
  const departamentos = await Departamento.create(req.body);
  res.json(departamentos);
});

router.put("/:id_Departamento", async (req, res) => {
  await Departamento.update(req.body, {
    where: { id_Departamento: req.params.id_Departamento },
  });
  res.json({ sucess: "Departamento actualizado con exito" });
});

router.delete("/:id_Departamento", async (req, res) => {
  await Departamento.destroy({
    where: { id_Departamento: req.params.id_Departamento },
  });
  res.json({ sucess: "Departamento Eliminado con Exito" });
});

router.get('/departamento/:id_Departamento',async(req,res)=>{
  const departamentos = await Departamento.findOne({
      where:{id_Departamento: req.params.id_Departamento}});
  res.json(departamentos);
});
module.exports = router;

