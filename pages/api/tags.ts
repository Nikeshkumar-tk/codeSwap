import { HTTP_METHODS, HTTP_RESOURCES } from "@/lib/shared/enums";
import { IMongoGetItemQuery } from "@/lib/shared/interfaces";
import { MongoDal } from "@/lib/utils/mongoDal";
import type { NextApiRequest, NextApiResponse } from "next";

interface ITagsApiRequestBody{
    name:string
}

interface ITagAiRequestQuery extends IMongoGetItemQuery{
    name?:string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  const requestBody = req.body as ITagsApiRequestBody
  const mongoDal = new MongoDal();
  let result;
try{

    switch (method) {
      case HTTP_METHODS.POST:
        result = await mongoDal.createItem({ resource: HTTP_RESOURCES.TAGS, data: requestBody, uniqueCheck:{name:requestBody.name}});
        break;
      case HTTP_METHODS.GET:
        let queryObj:any = {}
        if(req.query.isPrefix === "true"){
          delete req.query["isPrefix"]
          queryObj = req.query
          queryObj.isPrefix = true
        }
        result = await mongoDal.getItem({resource:HTTP_RESOURCES.TAGS, queryObj})
          break
    }
    return res.status(200).send(result);
}catch(error:any){
    res.status(500).send(error.message)
}
}
