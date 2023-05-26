import axios, { AxiosResponse } from "axios";
import BASE_URL from "../shared/constants";
import type { RequestBody as MessageType } from "@/pages/api/chats/sendMessage";
interface IChatServices {
  relativepath: string;
}

interface ICreateRooms {
  topic: string;
}
export class ChatServices implements IChatServices {
  relativepath: string;
  constructor() {
    this.relativepath = "api/chats";
    this.createRoom = this.createRoom.bind(this);
    this.getRooms = this.getRooms.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.getChats = this.getChats.bind(this)
  }

  async createRoom(params: ICreateRooms) {
    const response = await axios.post(`${this.relativepath}/chatRoom`, params);
    return response as AxiosResponse;
  }
  async getRooms() {
    const response = await axios.get(`${this.relativepath}/chatRoom`);
    return response as AxiosResponse;
  }

  async getChats(id:string){
    const response = await axios.get(`https://learn-in-public.vercel.app/${this.relativepath}/getChats?id=${id}`)
    return response as AxiosResponse
  }
  async sendMessage(param:MessageType){
    const response  = await axios.post(`https://learn-in-public.vercel.app/${this.relativepath}/sendMessage`, param)
    return response as AxiosResponse
  }
}

export const useChatServices = () => new ChatServices()
