export interface IMongoGetItemQuery{
    isPrefix?:boolean
    [key: string]: boolean | string | undefined;
}