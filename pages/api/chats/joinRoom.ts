import { HTTP_METHODS } from "@/lib/shared/enums";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface IRequestBody{
    id:string
    passCode?:string
    email:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  const Prisma = new PrismaClient();
  let result;

  try{
      switch (method) {
        case HTTP_METHODS.POST:
          let userEmail:string 
          const requestBody = req.body as IRequestBody
          if(process.env.APP_ENV === "prod"){
            const session = await getServerSession(req, res, authOptions);
            userEmail = session?.user?.email!
          }else{
            userEmail = requestBody.email
          }
          const room = await Prisma.chatRooms.findUnique({
            where: {
              id: req.body.id,
            },
          });
          if (room?.secured) {
            if (req.body.passCode !== room.passCode) {
              return res.status(203).send("Incorrect passcode");
            }
          }
          const members:string[] = JSON.parse(room?.members!)
          members.push(userEmail)
          result = await Prisma.chatRooms.update({
            where: { id: req.body.id },
            data: { members:JSON.stringify(members)},
          });
          break;
        case HTTP_METHODS.GET:
            break
      }
      return res.status(200).send(result);
  }catch(error:any){
    console.log(error)
    return res.status(500).send(error)
  }
}
