//models
const TestModel = require('./models/testTable');
const AreasModel =  require('./models/areas');
const DepartamentosModel = require('./models/departamentos');
const BienesModel = require('./models/bienes');
const DepreciacionModel = require('./models/catalogosDepreciacion')
const ConacModel = require('./models/clasificacionesCONAC');
const ComentariosModel= require('./models/comentarios');
const ComentariosContabilidadModel= require('./models/comentariosContabilidad');
const FacturasModel = require('./models/facturas');
const ModelosModel = require('./models/modelos');
const ProveedoresModel = require('./models/proveedores');
const ProyectosModel = require('./models/proyectos');
const ReportesModel = require('./models/reportes');
const ResguardosModel = require('./models/resguardos');
const TrimestresModel = require('./models/trimestres');
const UsuariosModel= require('./models/usuarios');


// 1 to N

BienesModel.hasMany(ComentariosModel,{as:"comentarios"});
 