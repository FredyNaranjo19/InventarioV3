const jwt = require('jwt-simple');
const moment = require('moment');
const checkToken = (req, res, next) =>{
    if(!req.headers['user-token']){
        return res.json({auth: false,error:'Token missing'});
    }

    const usuarioToken = req.headers['user-token'];

    let payload = {};
    try{
        payload =  jwt.decode(usuarioToken,'arriba la octogloriosa');
    }catch{
        return res.json({auth:false, error:'token invalido'});
    }


    if(payload.expiredAt<moment().unix()){
        return res.json({auth:false , error:'token expired'});
    }

    req.id_Usuario= payload.id_Usuario;

    next();
}


module.exports = {
    checkToken: checkToken
}