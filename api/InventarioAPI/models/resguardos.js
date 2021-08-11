module.exports = (sequelize,type)=>{
    return sequelize.define('Resguardos',{
        id_Resguardo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        fechaResguardo: {
            type:type.DATE
        },
        id_Bien:{
            type:type.INTEGER
        }
    })
}