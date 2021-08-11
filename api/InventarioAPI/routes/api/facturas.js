const router = require("express").Router();
const { Factura } = require("../../db");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const diskstorage = multer.diskStorage({
    destination: 'storage/img',
    filename:(req,file,cb) => {
        cb(null,Date.now()+'-upp-factura-'+file.originalname);
    }
});

const fileUpload = multer({
    storage:diskstorage
}).single('archive')


router.get("/", async (req, res) => {
  const facturas = await Factura.findAll();
  res.json(facturas);
});

router.post("/",fileUpload, async (req, res) => {
  const{
      numeroFactura,
      fechaFactura,
      fechaRecepcion,
      folioFiscal,
      RFC,
      licitacion,
      fechaAdquisicion,
      seguimientoComite,
      modalidad,
      costo,
      id_Proveedor,
      id_Trimestre
  }= req.body;
  const newFactura = {
    numeroFactura: numeroFactura,
    fechaFactura: fechaFactura,
    fechaRecepcion: fechaRecepcion,
    folioFiscal: folioFiscal,
    RFC: RFC,
    licitacion: licitacion,
    fechaAdquisicion: fechaAdquisicion,
    seguimientoComite: seguimientoComite,
    modalidad: modalidad,
    costo: costo,
    archivoFactura:req.file.filename,
    id_Proveedor: id_Proveedor,
    id_Trimestre: id_Trimestre,
  }
  const factura = await Factura.create(newFactura);
  res.json(factura);
});

router.put("/:facturaId", async (req, res) => {
  await Factura.update(req.body, {
    where: { id_Factura: req.params.facturaId },
  });
  res.json({ sucess: "proyecto se ha actualizado con exito" });
});

router.delete("/:facturaId", async (req, res) => {
  await Factura.destroy({
    where: { id_Factura: req.params.facturaId },
  });
  res.json({ sucess: "factura se ha eliminado con exito" });
});

module.exports = router;