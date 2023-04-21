import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method
   const prisma = new PrismaClient()
   let result
   switch(method){
    case "POST":
      result = await prisma.courses.create({
       data:req.body
      })
      return res.status(200).send(result)
    case "GET":
      result = await prisma.courses.findMany()
      return res.status(200).send(result)
    case "PUT":
      result  = await prisma.courses.findUnique({
        where:{
          //@ts-ignore
          id:String(req.body.id)
        }
      })
      result = await prisma.courses.update({
        where:{
          id:req.body.id
        },
        data:req.body
      })
      return res.status(200).send(result)
   }
 
}
