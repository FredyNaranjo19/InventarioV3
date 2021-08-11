module.exports = (sequelize,type)=>{
    return sequelize.define('FotosPerfil',{
        id_Foto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nameFotoUsuario:{
            type:type.STRING
        },typeFotoUsuario:{
            type:type.STRING
        },dataFotoUsuario:{
            type:type.BLOB('long')
        },
        id_Usuario:{
            type:type.INTEGER
        }

    })
}