import type { NextApiResponse, NextApiRequest } from "next";
import { HTTP_METHODS } from "../enums";

type CheckParams = {
  req: NextApiRequest;
  res: NextApiResponse;
  method: HTTP_METHODS;
};
const checkMethod = function (params: CheckParams) {
  if (params.req.method !== params.method) {
    return params.res.status(400).send("Bad request");
  }
};
export default checkMethod;
