import { PrismaDal } from "@/lib/utils/prismaDal";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const PrismaClient = new PrismaDal();
  const method = req.method;
  let result;
  try{

    switch (method) {
      case "POST":
          result = await PrismaClient.createItem({resource:"Resources", data:req.body})
          return res.status(200).send(result)
        }
  }catch(error:any){
    return res.status(400).send(error.message);
  }
}
