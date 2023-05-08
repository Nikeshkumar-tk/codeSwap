import { IBlog, IConfig, IResourceSchema, ISchemaExport, ITagSchema } from "@/lib/interfaces/mongo";
import { timeStamp } from "console";
import mongoose, { DefaultSchemaOptions } from "mongoose";

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
const userSchema = new mongoose.Schema({}, { strict: false });

const configSchema = new mongoose.Schema<IConfig>(
  {
    rootId: {
      type: String,
    },
    rootName: {
      type: String,
    },
    children: [
      {
        id: String,
        name: String,
      },
    ],
  },
  { strict: false }
);

const resourceSchema = new mongoose.Schema<IResourceSchema>({
description:{
  type:String
},
tags:[String],
title:{
  type:String
},
typeId:{
  type:String
},
url:{
  type:String
},
userEmail:{
  type:String
}
}, {timestamps:true})


const tagSchema = new mongoose.Schema<ITagSchema>({
name:{
  type:String,
  required:true
}
})
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Config = mongoose.models.Config || mongoose.model("Config", configSchema);
const Resource = mongoose.models.Resource || mongoose.model("Resource", resourceSchema)
const Tags = mongoose.models.Tags || mongoose.model("Tags", tagSchema)
export class MongoSchema implements ISchemaExport {
  Blog: any;
  User: any;
  Config: any;
  Resource: any;
  Tags: any;
  constructor() {
    this.Blog = Blog;
    this.User = User;
    this.Config = Config;
    this.Resource = Resource
    this.Tags = Tags
  }
}
