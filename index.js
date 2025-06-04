import express from "express"

const app = express()
const port = 3000
app.use(express.json())

let teaData = []
let nextId = 1


//Add a tea in teaData
app.post("/tea", (req, res) => {
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//Get all the tea inside teaData
app.get("/tea", (req, res) => {
    res.status(200).send(teaData)
})


//Find a specific tea from teaData
app.get("/tea/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) {
        res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})

// Update tea data
app.put("/tea/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    
    if(!tea) {
        res.status(404).send("Tea not found")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// Delete tea
app.delete("/tea/:id", (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1) {
        res.status(404).send("Tea not found")
    }
    teaData.splice(index, 1)
    res.status(204).send("Deleted Successfully")
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`)
})