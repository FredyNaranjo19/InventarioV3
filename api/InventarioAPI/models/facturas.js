module.exports = (sequelize,type)=>{
    return sequelize.define('Facturas',{
        id_Factura: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        numeroFactura:{
            type:type.STRING
        },
        fechaFactura:{
            type: type.DATE
        },
        fechaRecepcion:{
            type: type.DATE
        },
        folioFiscal:{
            type:type.STRING
        },
        RFC:{
            type:type.STRING
        },
        licitacion:{
            type:type.STRING
        },
        fechaAdquisicion:{
            type:type.DATE
        },
        seguimientoComite:{
            type:type.STRING
        },
        modalidad:{
            type:type.STRING
        },
        costo:{
            type:type.DECIMAL(10,2)
        },
        archivoFactura:{
            type:type.STRING
        },
        id_Proveedor:{
            type:type.INTEGER
        },id_Trimestre:{
            type:type.INTEGER
        }
    })
}