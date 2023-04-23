import { ICreateItem } from "../interfaces/mongo";
import { PrismaClient } from "@prisma/client";
import { IPrismaDal } from "../interfaces/prisma";
export class PrismaDal implements IPrismaDal {
  Prisma: PrismaClient;

  constructor() {
    this.Prisma = new PrismaClient();
    this.createItem = this.createItem.bind(this);
  }

  async createItem({ resource, data }: ICreateItem) {
    //@ts-ignore
    const response = await this.Prisma[resource].create({
        data
    });
    return response
  }
}
