const express = require("express")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')

const server = app.listen(PORT, () => {

    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)

})

server.on("ERROR", error => console.log(`Error en el servidor ${error}`))

const productos = []

let hayProductos = false

//GET PRINCIPAL FORMULARIO
app.get("/", (req, res) => {

    res.render("index.ejs", {productos: productos})

})


//GET
app.get("/productos", (req,res) => {


    if(productos.length == 0){
        hayProductos = false
    }
    else{

        hayProductos = true
    }

    console.log(productos[0].title)

    res.render("verProdu.ejs", {productos: productos, hayProductos: hayProductos})

})


app.post("/", (req, res) => {

    if(productos.length == 0){

        const productoNuevo = req.body
        
        productoNuevo.id = 1 

        productos.push(productoNuevo)

        res.render("index.ejs", {productos: productos})

    }
    else{

        const cantidad = productos.length

        const productoUltimo = productos[cantidad-1]

        const productoNuevo = req.body
        
        productoNuevo.id = productoUltimo.id +1 

        productos.push(productoNuevo)

        res.render("index.ejs", {productos: productos})
    }

})

