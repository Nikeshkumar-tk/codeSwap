import mongoose from "mongoose";


export interface IMongoDal{
    mongoUrl: string;
    schema:any
}

export interface  ICreateItem{
    data:any
    resource:string
    uniqueCheck?:any
}

export interface IAuthService{
    relativePath:string
}

export interface IGetItem{
resource:string
queryObj:any
}

export interface IBlog{
    title:string,
    userEmail:any,
    description:string,
    username:string
    imageUrl?:string
}

export interface ISchemaExport{
    Blog:any
    User:any
}

export interface IClientBlog{
relativePath:string
baseUrl:string
}