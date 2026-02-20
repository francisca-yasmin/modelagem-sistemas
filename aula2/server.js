import express from 'express'

// app é como um apelido para o express
const app = express()
app.use(express.json())

const users = []

//rota post
app.post('/usuarios', (req, res) => {
    users.push(req.body)
    res.status(201).json(req.body)
})

//rota GET
app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
})

app.listen(3000)