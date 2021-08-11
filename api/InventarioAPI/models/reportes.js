module.exports = (sequelize,type)=>{
    return sequelize.define('Reportes',{
        id_Reporte: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        archivo: {
            type:type.STRING(255)
        },
        id_Bien:{
            type:type.INTEGER
        }
    })
}