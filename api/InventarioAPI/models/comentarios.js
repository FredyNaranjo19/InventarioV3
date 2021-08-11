
module.exports = (sequelize,type)=>{
    return sequelize.define('Comentarios',{
        id_Comentario: {
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
        id_Bien:{
            type:type.INTEGER,
            
        }
    })
}