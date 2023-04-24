import { PrismaClient } from "@prisma/client";

export interface IPrismaDal {
  Prisma: PrismaClient;
}

export interface ICreateItem {
  resources: string;
  data: any;
}

export interface IPriamaGetItem {
  resource: string;
  queryObj?: {
    where?: {
      [feild: string]:
        | {
            contains: string | number | null | undefined | any;
          }
        | undefined
        | null
        | number
        | string
        | any
    };
  };
}
