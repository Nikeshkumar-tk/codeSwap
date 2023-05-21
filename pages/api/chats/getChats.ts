import RedisClient from "@/lib/shared/cache/redis";
import checkMethod from "@/lib/shared/controllers/checkMethod";
import { HTTP_METHODS } from "@/lib/shared/enums";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestQuery = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  checkMethod({ method: HTTP_METHODS.GET, req, res });
  const redisClient = new RedisClient();
  const requestBody = req.query as RequestQuery;
  try {
    const result = await redisClient.getValue(requestBody.id);
    res.status(200).send(JSON.parse(result as string));
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
}
