import mongoose from "mongoose";
import { ICreateItem, IGetItem, IMongoDal } from "../interfaces/mongo"
import { MongoSchema } from "../db/mongo/schema";

export class MongoDal implements IMongoDal {
    mongoUrl: string;
    schema: any;
    constructor() {
        this.mongoUrl = process.env.DATABASE_URL!;
        this.createItem = this.createItem.bind(this);
        this.getItem = this.getItem.bind(this);
        this.schema = new MongoSchema()
    }

    async createItem({ data, resource, uniqueCheck }: ICreateItem) {
        await mongoose.connect(this.mongoUrl)
        const model = mongoose.model(resource)
        console.log(uniqueCheck)
        if (uniqueCheck !== null) {
            const duplicate = await model.findOne(uniqueCheck)
            console.log("Duplicate data", duplicate)
            if (duplicate) {
                const errorObj = new Error()
                errorObj.message = "Duplicate entry"
                errorObj.name = "401 error"
                throw errorObj
            }
        }
        const result = await model.create(data)
        return result
    }
    async getItem({ resource, queryObj }: IGetItem) {
        await mongoose.connect(this.mongoUrl)
        const model = mongoose.model(resource)
        try {
            const result = await model.find(queryObj)
            return result
        } catch (error) {
            throw error
        }
    }
}
