const express = require("express");
const app = express();
app.use(express.json())

const port = 3000;
app.listen(port, ()=>{
    console.log(`server is listening at port ${port}`)
})

const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

//post -- its to create 
app.post("/items", (req, res)=>{
    const newItem=req.body; //recieves via body
    data.push(newItem);
    res.status(201).json(newItem);
})

//get - it only shows data - for get data is only fetched
app.get("/items",(req,res)=>{
    res.json(data)
})

// Read (GET) a specific item by ID -- via params ie url
app.get("/items/:id",(req,res)=>{
    console.log("initial id",req.params.id)
    const id= parseInt(req.params.id);
    console.log("id",id)
    let index = data.findIndex((e)=>e.id == id) ;
    console.log("index",index,data)
    if(index > -1){
        let item = data[index];
        res.json(item)
    }
    else{
        res.status(404).json({error:"Item not found"})
    }
})

//put
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      data[index] = { ...data[index], ...updatedItem };
      res.json(data[index]);
    }
});

//delete
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      const deletedItem = data.splice(index, 1);
      res.json(deletedItem[0]);
    }
});