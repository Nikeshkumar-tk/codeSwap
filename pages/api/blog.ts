import { MongoDal } from "@/lib/utils/mongoDal";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  const mongoDal = new MongoDal();
  let result
  try {

    switch(method){
      case "POST":
        result = await mongoDal.createItem({
          resource: "Blog",
          data: req.body,
          uniqueCheck:null
        });
        return res.status(200).send(result);
      case "GET":
        const queryObj = req.query
        result = await mongoDal.getItem({resource:"Blog",queryObj})
        return res.status(200).send(result);
        
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message);
  }
}
