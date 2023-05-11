import axios, { AxiosResponse } from "axios"
import { ROOT_CONFIGS_IDS } from "../shared/enums"

interface IGetConfig{
    rootId:ROOT_CONFIGS_IDS
}

export class ConfigService{
   relativePath:string
   constructor(){
    this.relativePath = "api/config"
    this.getConfig = this.getConfig.bind(this)
   }
    async getConfig(params:IGetConfig){
        console.log(params)
        const response = await axios.get(`${this.relativePath}?rootId=${params.rootId}`)
        return response as AxiosResponse
    }
}

export const useConfigService = () => new ConfigService()