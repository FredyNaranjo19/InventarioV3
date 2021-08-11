module.exports = (sequelize,type)=>{
    return sequelize.define('CatalogosDepreciacion',{
        id_CatalogoDepreciacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        concepto: {
            type:type.STRING
        },
        vidaUtil: {
            type:type.INTEGER
        },
        porcentajeDepreciacionAnuall:{
            type: type.DECIMAL(10,2)
        },
        porcentajeDepreciacionMensual:{
            type: type.DECIMAL(10,2)
        }

    })
}