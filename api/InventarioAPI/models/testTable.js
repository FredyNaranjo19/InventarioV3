module.exports = (sequelize,type)=>{
    return sequelize.define('testTable',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: type.STRING,
        descripcion:type.STRING
    })
}