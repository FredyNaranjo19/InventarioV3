module.exports = (sequelize,type)=>{
    return sequelize.define('Proveedores',{
        id_Proveedor: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nombreProveedor: {
            type: type.STRING
        },
        RFCproveedor:{
            type:type.STRING
        },
        domicilioFiscalProveedor:{
            type:type.TEXT
        },
        telefonoProveedor:{
            type:type.STRING
        },
        correoProveedor:{
            type:type.STRING
        },
        giro:{
            type:type.TEXT
        }

    })
}