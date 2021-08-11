const Sequelize = require("sequelize");
require("dotenv").config();
//MODELS
const TestModel = require("./models/testTable");
const AreasModel = require("./models/areas");
const DepartamentosModel = require("./models/departamentos");
const BienesModel = require("./models/bienes");
const DepreciacionModel = require("./models/catalogosDepreciacion");
const ConacModel = require("./models/clasificacionesCONAC");
const ComentariosModel = require("./models/comentarios");
const ComentariosContabilidadModel = require("./models/comentariosContabilidad");
const FacturasModel = require("./models/facturas");
const ModelosModel = require("./models/modelos");
const ProveedoresModel = require("./models/proveedores");
const ProyectosModel = require("./models/proyectos");
const ReportesModel = require("./models/reportes");
const ResguardosModel = require("./models/resguardos");
const TrimestresModel = require("./models/trimestres");
const UsuariosModel = require("./models/usuarios");
const Perfil = require("./models/fotosPerfil");
//variables
let database_port = process.env.DATABASE_PORT;
let database_name = process.env.DATABASE_NAME;
let database_user = process.env.DATABASE_USER;
let database_password = process.env.DATABASE_PASSWORD;
let database_host = process.env.DATABASE_HOST;
const sequelize = new Sequelize(
  database_name,
  database_user,
  database_password,
  { host: database_host, dialect: "mysql" }
);
//verificaciones
const Test = TestModel(sequelize, Sequelize);
const Area = AreasModel(sequelize, Sequelize);
const Departamento = DepartamentosModel(sequelize, Sequelize);
const Bien = BienesModel(sequelize, Sequelize);
const Depreciacion = DepreciacionModel(sequelize, Sequelize);
const Conac = ConacModel(sequelize, Sequelize);
const Comentarios = ComentariosModel(sequelize, Sequelize);
const Contabilidad = ComentariosContabilidadModel(sequelize, Sequelize);
const Factura = FacturasModel(sequelize, Sequelize);
const Modelo = ModelosModel(sequelize, Sequelize);
const Proveedor = ProveedoresModel(sequelize, Sequelize);
const Proyecto = ProyectosModel(sequelize, Sequelize);
const Reporte = ReportesModel(sequelize, Sequelize);
const Resguardo = ResguardosModel(sequelize, Sequelize);
const Trimestre = TrimestresModel(sequelize, Sequelize);
const Usuario = UsuariosModel(sequelize, Sequelize);
const Perfiles = Perfil(sequelize, Sequelize);
// relations
//Bien.hasMany(Comentarios,{as:"comentarios",foreignKey:"id_Comentario"});
//Bien.hasMany(Resguardo,{as:"resguardo",foreignKey:"id_Resguardo"});
//Bien.hasMany(Reporte,{as:"reporte",foreignKey:'id_Reporte'});
//Bien.hasOne(Conac,{as:"conac",foreignKey:'id_clasificacionConac'});
//Bien.hasOne(Proyecto,{as:"proyecto",foreignKey:"id_Proyecto"});
//Bien.hasOne(Departamento,{as:"Departamento",foreignKey:"id_Departamento"});
//Bien.hasOne(Depreciacion,{as:"depreciacion",foreignKey:"id_CatalogoDepreciacion"});
//Bien.hasOne(Modelo,{as:"modelo",foreignKey:'id_Modelo'});
//Bien.hasOne(Factura,{as:Factura,foreignKey:'id_Factura'});
//Usuario.hasOne(Departamento,{as:"Departamento",foreignKey:"id_Departamento"});
//Usuario.hasOne(Area,{as:"area",foreignKey:'id_Area'});
//Factura.hasOne(Proveedor,{as:'proveedor',foreignKey:'id_Proveedor'});
//Factura.hasOne(Trimestre,{as:'Trimestre',foreignKey:'id_Trimestre'});
//Factura.hasMany(Contabilidad,{as:'contabilidad',foreignKey:' id_comentarioContabilidad'});
//sincronizacion
sequelize
  .sync({ force: false }) //cambiar a true para dropear tablas
  .then(() => {
    console.log("Base de Datos conectada correctamente");
  })
  .catch((error) => {
    console.log("Se ha producido un error: ", error);
  });

module.exports = {
  Test,
  Area,
  Departamento,
  Bien,
  Depreciacion,
  Conac,
  Comentarios,
  Contabilidad,
  Factura,
  Modelo,
  Proveedor,
  Proyecto,
  Reporte,
  Resguardo,
  Trimestre,
  Usuario,
  Perfiles
};
