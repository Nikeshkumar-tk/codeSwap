import { IBlog, ISchemaExport } from "@/lib/interfaces/mongo";
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

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

const userSchema = new mongoose.Schema({},{strict:false})
const User = mongoose.models.User || mongoose.model("User", userSchema);
export class MongoSchema implements ISchemaExport {
  Blog: any;
  User:any
  constructor() {
    this.Blog = Blog;
    this.User = User
    this.initializeSchemas = this.initializeSchemas.bind(this);
  }

  initializeSchemas(){

    return {Blog:this.Blog} 

  }
}
