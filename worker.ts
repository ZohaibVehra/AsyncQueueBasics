import { Worker, Job} from 'bullmq'
import dotenv from "dotenv"

dotenv.config()

const worker = new Worker('myqueue', async (job: Job) => {
    console.log('starting job, ', job.id);

    return 'fin'
},
{
    connection: {
      host: process.env.REDIS,
      password: process.env.TOKEN,
      port: 6379,
      tls: {},
      maxRetriesPerRequest: null
    }
  }
)

worker.on("completed", (job) => {
  console.log("completed", job.id)
})

worker.on("failed", (job, err) => {
  console.log("failed", job?.id, err.message)
})