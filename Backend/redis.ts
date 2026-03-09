import { Redis } from "ioredis"
import dotenv from "dotenv"

dotenv.config()

const host = process.env.REDIS_HOST
const port = Number(process.env.REDIS_PORT)
const password = process.env.REDIS_PASSWORD

console.log("REDIS_HOST:", host)
console.log("REDIS_PORT raw:", process.env.REDIS_PORT)
console.log("REDIS_PORT parsed:", port)
console.log("REDIS_PASSWORD exists:", !!password)

if (!host) {
  throw new Error("Missing REDIS_HOST in .env")
}

if (!Number.isInteger(port)) {
  throw new Error("REDIS_PORT is missing or invalid in .env")
}

if (!password) {
  throw new Error("Missing REDIS_PASSWORD in .env")
}

export const redisConnection = new Redis({
  host,
  port,
  password,
  tls: {},
  maxRetriesPerRequest: null,
})

redisConnection.on("connect", () => {
  console.log("Redis connected")
})

redisConnection.on("error", (err: Error) => {
  console.log("Redis error:", err)
})