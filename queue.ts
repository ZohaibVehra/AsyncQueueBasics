import { Queue }  from "bullmq"
import dotenv from "dotenv"

dotenv.config() 

export const myQueue = new Queue('myqueue', {
  connection: {
    host: process.env.REDIS,
    password: process.env.TOKEN,
    port: 6379,
    tls: {}
  },
});


myQueue.on("error", (err) => console.log('error is ', err)
)


const test = async () => {
 try {
    const job = await myQueue.add("test-job", {hello: 'world'})
    console.log('job added', job.id);
 } catch(err) {
    console.log('err found: ', err);
 }
}
