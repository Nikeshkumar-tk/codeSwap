// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 
  const response = await mongoose.connect(process.env.DATABASE_URL!)
  if(response){
    console.log("connected")
  }

  res.status(200).send({name:"sucess"})

}
