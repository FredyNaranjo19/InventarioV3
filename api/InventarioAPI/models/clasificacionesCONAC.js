module.exports = (sequelize,type)=>{
    return sequelize.define('ClasificacionesConac',{
        id_clasificacionConac: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nombre: {
            type:type.STRING(1234)
        },
        grupoBienes:{
            type:type.STRING(1234)
        },
        subcategoria:{
            type: type.STRING(1234)
        },
        categoria: {
            type: type.STRING(1234)
        },
        descripcion: {
            type: type.TEXT 
        } 
    })
}