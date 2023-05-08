import axios from "axios"

interface ITagSrvices{
    relativePath:string
}
class TagServices implements ITagSrvices{
relativePath: string
constructor(){
    this.relativePath = "/api/tags"
    this.getTags = this.getTags.bind(this)
}


async getTags(tagQuery:string){
    const response = await axios.get(`${this.relativePath}?name=${tagQuery}&&isPrefix=true`)
    return response

}
}


export const useTagServices = () => new TagServices()

