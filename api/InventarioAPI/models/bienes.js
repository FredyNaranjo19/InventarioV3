module.exports = (sequelize,type)=>{
    return sequelize.define('Bienes',{
        id_Bien: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nombreBien:{
            type:type.STRING
        },
        descripcionBien:{
            type:type.TEXT
        },
        claveControl:{
            type:type.STRING
        },
        numeroInventarioAnterior:{
            type:type.STRING
        },
        numeroInventarioArmonizado:{
            type:type.STRING
        },
        clasificacionAdicional:{
            type: type.STRING
        },
        numeroSerie:{
            type:type.STRING
        },
        fotografiaBien:{
            type: type.STRING
        },
        fechaAlta:{
            type: type.DATE
        },
        estatusBien:{
            type:type.STRING
        },
        etiquetaBien:{
            type : type.STRING
        },
        tratamientoAdministrativo:{
            type:type.STRING
        },
        numeroResguardo:{
            type: type.STRING
        },
        costoBien:{
            type: type.DECIMAL(10,2)
        },
        costoContable:{
            type: type.DECIMAL(10,2)
        },
        tipoBien:{
            type: type.STRING
        },
        motivoBaja:{
            type: type.TEXT
        },
        fechaBaja:{
            type:type.DATE
        },
        montoDepreciacion:{
            type:type.DECIMAL(10,2)
        },
        mesesDepreciacion:{
            type:type.DECIMAL(10,2)
        },
        id_clasificacionConac:{
            type: type.INTEGER
        },
        id_Proyecto:{
            type:type.INTEGER
        },
        id_Departamento:{
            type:type.INTEGER
        },
        id_catalogoDepreciacion:{
            type: type.INTEGER
        },
        id_Modelo:{
            type:type.INTEGER
        },
        id_Factura:{
            type:type.INTEGER
        }
    })
}