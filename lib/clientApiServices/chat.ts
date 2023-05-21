import axios, { AxiosResponse } from "axios";
import BASE_URL from "../shared/constants";

interface IChatServices {
  relativepath: string;
}

interface ICreateRooms {
  topic: string;
}
class ChatServices implements IChatServices {
  relativepath: string;
  constructor() {
    this.relativepath = "api/chats";
    this.createRoom = this.createRoom.bind(this);
    this.getRooms = this.getRooms.bind(this)
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
    const response = await axios.get(`${BASE_URL}/${this.relativepath}/getChats?id=${id}`)
    return response as AxiosResponse
  }
}

export const useChatServices = () => new ChatServices()
