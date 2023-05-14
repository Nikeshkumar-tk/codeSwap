import { HTTP_METHODS } from "@/lib/shared/enums";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface IRequestBody{
    id:string
    email?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
 
  const Prisma = new PrismaClient();

  try{
     if(req.method !== HTTP_METHODS.PATCH) return res.status(404).send("method not allowed")
     const requestBody = req.body as IRequestBody
     if(process.env.APP_ENV === "prod"){
        const session = await getServerSession(req, res, authOptions);
        if(!session) return res.status(401).send("Not authorized")
        requestBody.email = session?.user?.email!
      }

      const room = await Prisma.chatRooms.findUnique({
        where:{
            id:requestBody.id
        }
      })
      const members:string[] = JSON.parse(room?.members!)
      const filteredMembers = members.filter((member:string) => member !== requestBody.email)

      const updatedRoom = await Prisma.chatRooms.update({
        where:{
            id:requestBody.id
        },
        data:{
            members:JSON.stringify(filteredMembers)
        }
      })

      return res.status(200).send(updatedRoom)
  }catch(error:any){
    console.log(error)
    return res.status(500).send(error)
  }
}
