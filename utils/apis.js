import axios from "axios";
import {base_api_url} from './../const'

export const handlePostApi = async(endpoint,payload)=>{
    try{

        var {data} = await axios.post(base_api_url+endpoint,payload);
        return data

    }catch(err){
        return {
            status:'Error',
            message:err.message
        }
    }

}


export const handleGetApi = async(endpoint)=>{

    try{

        var {data} = await axios.get(base_api_url+endpoint);
        return data

    }catch(err){
        return {
            status:'Error',
            message:err.message
        }
    }

}