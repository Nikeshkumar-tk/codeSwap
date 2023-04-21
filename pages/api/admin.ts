import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
 const method = req.method
 const prisma = new PrismaClient()
 let result

 switch(method){
    case "GET":
        //@ts-ignore
        result = await prisma.admins.findMany()
        return res.status(200).send(result)
    case "POST":
        //@ts-ignore
        result = await prisma.admins.create({
            data:req.body
        })
        return res.status(200).send(result)
 }
  
}
