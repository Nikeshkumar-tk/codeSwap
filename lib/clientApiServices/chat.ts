import axios from "axios";

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
    return response;
  }
  async getRooms() {
    const response = await axios.get(`${this.relativepath}/chatRoom`);
    return response;
  }
}

export const useChatServices = () => new ChatServices()
