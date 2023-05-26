import { HTTP_METHODS } from "@/lib/shared/enums";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import RedisClient from "@/lib/shared/cache/redis";

interface IRequestBody {}

interface IUserInfo {
  email?: string;
  name?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  let result;
  const Prisma = new PrismaClient();
  const redisClient = new RedisClient();
  try {
    switch (method) {
      case HTTP_METHODS.POST:
        if (process.env.APP_ENV === "prod") {
          const session = await getServerSession(req, res, authOptions);
          if (!session) {
            const errObj = new Error();
            errObj.message = "Not authorized";
            throw errObj;
          }
          req.body.hostEmail = session.user?.email!;
          req.body.hostName = session.user?.name!;
        }
        req.body.members = JSON.stringify(req.body.members);
        //@ts-ignore
        result = await Prisma.ChatRooms.create({
          data: req.body,
        });
        let chats: any = [];
        const chatCache = await redisClient
          .setValue(req.body.id, JSON.stringify(chats))
          .then((response) =>
            console.log("Successfully created chat page values")
          );
        result.chatPage = chatCache;
        break;
      case HTTP_METHODS.GET:
        //@ts-ignore
        const rooms = await Prisma.ChatRooms.findMany();
       result = rooms.map((room:any) => {
        return {...room, members:JSON.parse(room?.members!)}
       })
        break;
    }
    return res.status(200).send(result);
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message);
  }
}
