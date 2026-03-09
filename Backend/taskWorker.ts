import { Worker } from "bullmq"
import { redisConnection } from "./redis"
import { TaskJobData } from "./taskQueue"

export const taskWorker = new Worker<TaskJobData>(
    "tasks",
    async (job) => {
        console.log(`Processing job ${job.id}: ${job.data.message}`)

        const delay = Math.floor(Math.random() * 15000) + 5000
        await new Promise((resolve) => setTimeout(resolve, delay))

        console.log(`Finished job ${job.id}`)
    },
    {
        connection: redisConnection
    }
)

taskWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`)
})

taskWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`)
})