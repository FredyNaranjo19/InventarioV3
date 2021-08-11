module.exports = (sequelize,type)=>{
    return sequelize.define('Trimestres',{
        id_Trimestre: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        ejercicio: {
            type:type.STRING
        },
        fechaInicio:{
            type:type.DATE
        },
        fechaFin:{
            type:type.DATE
        },
        numeroTrimestre:{
            type:type.INTEGER
        }

    })
}