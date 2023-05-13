import { STUDY_RESOURCE_TYPE } from "@/lib/shared/enums";
import { IMongoGetItemQuery } from "@/lib/shared/interfaces";
import { MongoDal } from "@/lib/utils/mongoDal";
import { getVideoId } from "@/lib/utils/youtube";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mongoDal = new MongoDal();
  const method = req.method;
  let result;
  try{

    switch (method) {
      case "POST":
          if(req.body.typeId === STUDY_RESOURCE_TYPE.YOUTUBE_VIDEO){
            req.body.url = getVideoId(req.body.url as string)
          }
          console.log(req.body)
          result = await mongoDal.createItem({resource:"Resource", data:req.body, uniqueCheck:null})
          return res.status(200).send(result)
      case "GET":
        const queryObj = req.query as IMongoGetItemQuery
        result = await mongoDal.getItem({resource:"Resource", queryObj})
        return res.status(200).send(result)
        }
  }catch(error:any){
    return res.status(400).send(error.message);
  }
}
