import { HTTP_METHODS } from "@/lib/shared/enums";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
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
        const session = await getServerSession(req, res, authOptions);
        req.body.host = session?.user?.email
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
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
