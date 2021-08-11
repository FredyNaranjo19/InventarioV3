import axios from 'axios';

const ENDPOINT = 'http://localhost:4000/api'


export async function getUsuarios(){
    try{
        const resData = await axios({
            url:`${ENDPOINT}/usuarios`,
            method: 'GET'
        })

        return resData;
    }catch(e){
        console.log(e);
    }
}

