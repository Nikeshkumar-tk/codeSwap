import { IBlog, IResource, ISchemaExport } from "@/lib/interfaces/mongo";
import { strict } from "assert";
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
  },
  username: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

//UsersSchema for mongo adapter
const userSchema = new mongoose.Schema({},{strict:false})


const resourceSchema = new mongoose.Schema<IResource>({
name:{
  type:String,
},
category:{
  type:String,
},
description:{
  type:String
},
url:{
  type:String
},
userEmail:{
  type:String
}

},{strict:false})



const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);
// const Resource = mongoose.model("Resource") || mongoose.model("Resource", resourceSchema)

export class MongoSchema implements ISchemaExport {
  Blog: any;
  User:any
  Resource: any;
  constructor() {
    this.Blog = Blog;
    this.User = User
    // this.Resource = Resource
  }

}
