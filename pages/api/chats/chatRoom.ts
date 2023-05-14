import { HTTP_METHODS } from "@/lib/shared/enums";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

interface IRequestBody{

}

interface IUserInfo{
  email?:string
  name?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  let result;
  const Prisma = new PrismaClient();
  try {
    switch (method) {
      case HTTP_METHODS.POST:
        let userInfo:IUserInfo = {}
        if(process.env.APP_ENV === "prod"){
          const session = await getServerSession(req, res, authOptions);
          if(!session){
            const errObj = new Error()
            errObj.message = "Not authorized"
            throw errObj
          }
          userInfo.email = session.user?.email!
          userInfo.name = session.user?.name!
        }else{
          userInfo.email = req.body.hostEmail
          userInfo.name = req.body.hostName
        }
        req.body.hostEmail = userInfo.email
        req.body.hostName = userInfo.name
        req.body.members = JSON.stringify(req.body.members)
        //@ts-ignore
        result = await Prisma.ChatRooms.create({
          data: req.body,
        });
        break;
      case HTTP_METHODS.GET:
        //@ts-ignore
        result = await Prisma.ChatRooms.findMany();
        break;
    }
    return res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
