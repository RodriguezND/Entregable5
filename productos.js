const express = require("express");
const { Router } = express;

const router = Router();

const productos = []

//GET PRINCIPAL FORMULARIO
router.get("/", (req, res) => {

    res.render("main", {productos: productos})

})



//GET
router.get("/productos", (req,res) => {

    res.render("verProdu", {productos: productos})

})

router.get("/api/productos/:id", (req,res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){     
            res.json(productos[i]);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

// POST

router.post("/api/productos", (req, res) => {

    if(productos.length == 0){

        const productoNuevo = req.body
        
        productoNuevo.id = 1 

        productos.push(productoNuevo)

        /* res.json(productoNuevo) */

        res.render("main", {productos: productos})

    }
    else{

        const cantidad = productos.length

        const productoUltimo = productos[cantidad-1]

        const productoNuevo = req.body
        
        productoNuevo.id = productoUltimo.id +1 

        productos.push(productoNuevo)

        res.render("main", {productos: productos})
    }

})

//PUT

router.put("/api/productos/:id", (req, res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){    
            
            productos[i] = req.body
            productos[i].id = id

            res.json(productos[i]);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

// DELETE

router.delete("/api/productos/:id", (req,res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){ 
            
            productos.splice(i,1)

            res.send(productos);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

module.exports = router;