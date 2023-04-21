// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoDal } from "@/lib/utils/mongoDal";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const method = req.method;
    const queryObj = req.query
    const mongoDal = new MongoDal();
    let result
    try{

        switch(method){
            case "GET":
                result = await mongoDal.getItem({resource:"User",queryObj})
                return res.status(200).send(result);
        }
    }catch(error:any){
        res.status(500).send(error.message)
    }
   
}
