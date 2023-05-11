import axios from "axios";

interface ITagSrvices {
  relativePath: string;
}
class TagServices implements ITagSrvices {
  relativePath: string;
  constructor() {
    this.relativePath = "/api/tags";
    this.getTags = this.getTags.bind(this);
  }

  async getTags() {
    const response = await axios.get(`${this.relativePath}`);
    return response;
  }
}

export const useTagServices = () => new TagServices();
