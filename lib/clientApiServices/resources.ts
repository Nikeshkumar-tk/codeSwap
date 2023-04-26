import axios from "axios";
import { IServices } from "../interfaces";
import { STUDY_RESOURCE_TYPE } from "../shared/enums";
interface IGetResourse {
  typeId: STUDY_RESOURCE_TYPE;
}
type IAddResourse = {
  data: {
    title: string;
    userEmail: string;
    description: string;
    url: string;
    typeId: string;
  };
};
export class ResourceService implements IServices {
  baseUrl: string;

  constructor() {
    this.baseUrl = "api/resource";

    this.getResources = this.getResources.bind(this);
  }

  async getResources(params: IGetResourse) {
    const response = await axios.get(`${this.baseUrl}?typeId=${params.typeId}`);
    return response;
  }

  async addResource(params: IAddResourse) {
    const response = await axios.post(`${this.baseUrl}`, params);
    return response
  }
}

export const useResourceService = () => new ResourceService();
