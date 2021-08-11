const router =  require('express').Router();
const middlewares = require('../libs/middlewares');
const apiTestRouter = require('./api/tests');
const apiAreaRouter = require('./api/areas');
const apiDepartamentoRouter = require('./api/departamentos');
const apiTrimestresRouter = require('./api/trimestres');
const apiProveedoresRouter = require('./api/proveedores');
const apiModelosRouter = require('./api/modelos');
const apiConacRouter = require('./api/clasificacionesCONAC');
const apiDepreciacionRouter = require('./api/depreciaciones');
const apiProyectosRouter = require('./api/proyectos');
const apiUsuariosRouter = require('./api/usuarios');
const apiPerfilesRouter = require('./api/imagenesPerfil');
const apiFacturaRouter = require('./api/facturas')
const apiBienesRouter = require('./api/bienes');
const apiComentariosRouter = require('./api/comentarios')

router.use('/tests', apiTestRouter);
router.use('/areas',apiAreaRouter);
router.use('/departamentos',apiDepartamentoRouter);
router.use('/proveedores',apiProveedoresRouter);
router.use('/trimestre',apiTrimestresRouter);
router.use('/modelos',apiModelosRouter);
router.use('/conac',apiConacRouter);
router.use('/depreciacion',apiDepreciacionRouter);
router.use('/proyectos',apiProyectosRouter);
router.use('/usuarios',apiUsuariosRouter);
router.use('/perfil',apiPerfilesRouter);
router.use('/facturas',apiFacturaRouter);
router.use('/bienes',apiBienesRouter);
router.use('/comentarios',apiComentariosRouter);

module.exports= router;
