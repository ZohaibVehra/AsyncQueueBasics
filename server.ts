import express from "express"
import { myQueue } from "./queue"

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.json({
        message: 'runnin'
    })
})

app.post('/test', async (req,res) => {
    try{
        await myQueue.add('sheesh', {}, {delay: 3000})
        res.sendStatus(201)
    }catch(err){
        res.json({err: err})
    }
})

app.listen(port, () => {
    console.log('Server started at port', port);
})