module.exports = (sequelize,type)=>{
    return sequelize.define('ComentariosContabilidad',{
        id_comentarioContabilidad: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        titulo: {
            type:type.STRING(255)
        },
        comentario:{
            type:type.TEXT
        },
        estado:{
            type:type.STRING
        },
        id_Factura:{
            type: type.INTEGER
        }
    })
}