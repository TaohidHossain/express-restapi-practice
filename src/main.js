import express from 'express'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

let users = [
    {id: 1, name: "taohid", displayName: "MD. Taohid Alam"},
    {id: 2, name: "arif", displayName: "MD. Arif"},
    {id: 3, name: "rokib", displayName: "Rokibul Islam Shakil"},
    {id: 4, name: "showrov", displayName: "Abdul Kader Showrov"},
    {id: 5, name: "milhan", displayName: "Sayem Shiddik Milhan"},
    {id: 6, name: "asif", displayName: "Asif Rayhan"},
]


app.listen(PORT)
app.get("/", (req, res)=>{
    res.status(200).send({
        "message": "Working fine!"
    })
})

app.get("/api/users", (req, res)=>{
    const { query: {filter, value} } = req
    if(!filter && !value) res.status(200).send(users)
    if(filter && value) res.status(200).send(users.filter(user => user[filter].includes(value)))
})

app.get("/api/users/:id", (req, res)=>{
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)){
        res.status(400).send({"message": "Bad request. Invalid ID."})
    }
    const user = users.find(user => user.id === parsedId)
    if (!user){
        res.status(404).send({"message": "User not found"})
    }
    res.status(200).send(user)
})

app.post("/api/users", (req, res)=> {
    const { body } = req
    const newUser = { id: users[users.length - 1].id + 1, ...body}
    users.push(newUser)
    res.status(201).status(201).send(newUser)
})

app.put("/api/users/:id", (req, res)=>{
    const { body, params: { id }} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) res.status(400).send({"message": "Bad request. Invalid ID"})
    const userIndex = users.findIndex(user => user.id === parsedId)
    if (userIndex === -1){
        res.status(404).send({"message": "User not found"})
    }
    users[userIndex] = { id: parsedId, ...body }
    res.status(200).send(users[userIndex])
})

app.patch("/api/users/:id", (req, res)=>{
    const { body, params: { id }} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) res.status(400).send({"message": "Bad request. Invalid ID"})
    const userIndex = users.findIndex(user => user.id === parsedId)
    if (userIndex === -1 ){
        res.status(404).send({"message": "User not found"})
    }
    users[userIndex] = { ...users[userIndex], ...body }
    res.status(200).send(users[userIndex])
})

app.delete("/api/users/:id", (req,res)=>{
    const { params: { id }} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) res.sendStatus(400)
    const userIndex = users.findIndex(user => user.id === parsedId)
    if (userIndex === -1 ){
        res.sendStatus(404)
    }
    const deletedUser = users.splice(userIndex, 1)
    console.log(deletedUser)
    res.sendStatus(204)
})