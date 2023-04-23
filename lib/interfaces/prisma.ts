import { PrismaClient } from "@prisma/client"

export interface IPrismaDal {
Prisma:PrismaClient

}

export interface ICreateItem{
    resources:string
    data:any
}