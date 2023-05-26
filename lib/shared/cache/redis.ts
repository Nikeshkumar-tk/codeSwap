import { createClient } from "redis";

const redisClient = createClient({
  disableOfflineQueue: true,
  username:process.env.REDIS_USERNAME,
  password:process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL || "localhost",
    tls:true,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    reconnectStrategy(retries: any) {
      if (retries > 2) return new Error("Unable to connect");
      return false;
    },
  },
});
redisClient.on("error",(error) => {
  console.log(error)
})
export class RedisClient {
  constructor() {
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this)
  }
  async setValue(key: any, value: string) {
    await redisClient.connect();
    const result = await redisClient.set(key, value);
    await redisClient.disconnect();
  }

  async getValue(key:any){
    await redisClient.connect()
    const result = await redisClient.get(key)
    await redisClient.disconnect()
    return result
  }
}

export default RedisClient;
