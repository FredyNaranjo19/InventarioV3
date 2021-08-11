module.exports = (sequelize,type)=>{
    return sequelize.define('Areas',{
        id_Area: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nombreArea: {
            type:type.STRING(255)
        },
        ubicacionArea:{
            type:type.TEXT
        }
    })
}