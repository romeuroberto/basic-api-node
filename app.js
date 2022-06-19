const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');
const { json } = require('express');

const app = express();
app.use(express.json());

let products = [];
createProductFile();

app.get('/primeira-rota', (req, res) => {
    res.json({
        message: "Acessou nossa primeira rota"
    });
});

app.post("/products", (req, res)=> {
    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);
    fs.writeFile("products.json", JSON.stringify(products), (err) =>{
        if(err) {
            console.log(err);
        } else {
            console.log("Produto inserido!")
        }
    })

    return res.json(product);
});

app.get("/products", (req, res) => {
    return res.json(products);

});

app.get("/product/:id", (req, res)=> {
    const { id } = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);
});

app.put("/product/:id", (req, res)=> {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,

    }
    createProductFile();

    return res.json({message: "produto alterado com sucesso!"});
});

app.delete("/product/:id", (req,res)=> {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);
    products.splice(productIndex, 1);
    
    createProductFile();
    
    return res.json({message: "Produto removido com sucesso!"})
});

function createProductFile() {
    fs.readFile("products.json", "utf-8", (err, data)=>{
        if (err) {
            console.log(err);
        } else {
            products = JSON.parse(data);
        }
    });
}

app.listen(4002, () => console.log('Servidor rodando na porta 4002!'));