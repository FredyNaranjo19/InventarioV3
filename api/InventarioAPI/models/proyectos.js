module.exports = (sequelize,type)=>{
    return sequelize.define('Proyectos',{
        id_Proyecto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        claveProyecto: {
            type:type.STRING
        },
        nombrProyecto: {
            type:type.STRING
        },
        partidaPresupuestal: {
            type:type.STRING
        },
        fuenteFinanciamiento: {
            type:type.STRING
        },
        numeroCuenta: {
            type:type.STRING
        }
    })
}