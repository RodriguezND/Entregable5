const express = require("express")

const app = express()
const PORT = 8080

app.set('views','./views');
app.set('view engine', 'pug');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server = app.listen(PORT, () => {

    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)

})

server.on("ERROR", error => console.log(`Error en el servidor ${error}`))

const productos = []

let hayProductos = false

//GET PRINCIPAL FORMULARIO
app.get("/", (req, res) => {

    res.render("index.pug", {productos: productos})

})


//GET
app.get("/productos", (req,res) => {


    if(productos.length == 0){
        hayProductos = false
    }
    else{

        hayProductos = true
    }
    res.render("verProdu.pug", {productos: productos, hayProductos: hayProductos})

})


app.post("/", (req, res) => {

    if(productos.length == 0){

        const productoNuevo = req.body
        
        productoNuevo.id = 1 

        productos.push(productoNuevo)

        res.render("index.pug", {productos: productos})

    }
    else{

        const cantidad = productos.length

        const productoUltimo = productos[cantidad-1]

        const productoNuevo = req.body
        
        productoNuevo.id = productoUltimo.id +1 

        productos.push(productoNuevo)

        res.render("index.pug", {productos: productos})
    }

})