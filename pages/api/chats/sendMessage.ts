import RedisClient from "@/lib/shared/cache/redis";
import checkMethod from "@/lib/shared/controllers/checkMethod";
import { HTTP_METHODS } from "@/lib/shared/enums";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  roomId?: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  checkMethod({ method: HTTP_METHODS.POST, req, res });
  const Prisma = new PrismaClient();
  const redisClient = new RedisClient();
  const requestBody = req.body as RequestBody;
  try {
    const { roomId } = requestBody;
    delete requestBody["roomId"];
    const existingChats = await redisClient.getValue(roomId);
    const chats = JSON.parse(existingChats!);
    chats.push(requestBody);
    const result = await redisClient.setValue(roomId, JSON.stringify(chats));
    res.status(200).send(result);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
