const ENDPOINT = 'http://localhost:4000'

export default function login({correoUsuario,passwordUsuario}){
    return fetch(`${ENDPOINT}/api/usuarios/login`,{

        method:'POST',
        headers: {
            "Content-Type": " application/JSON"

        },
        body: JSON.stringify({correoUsuario,passwordUsuario})
    }).then(res=>{
        if(!res.ok)throw new Error('Respuesta invalida')
        return res.json()
    }).then(res=>{
        const{jwt} = res
        const{usuario} = res
        return {jwt,usuario}
    })
}