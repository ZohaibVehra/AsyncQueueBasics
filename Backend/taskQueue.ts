import { Queue } from "bullmq"
import { redisConnection } from "./redis"

export interface TaskJobData {
  message: string
}

export const taskQueue = new Queue<TaskJobData>("tasks", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
})