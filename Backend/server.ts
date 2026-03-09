import express from "express"
import { taskQueue } from "./taskQueue"

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (_req, res) => {
  res.send("hellos")
})

app.post("/task", async (_req, res) => {
  const job = await taskQueue.add("simple-task", {
    message: "hello from server",
  })

  res.status(201).json({
    message: "task queued",
    jobId: job.id,
  })
})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})