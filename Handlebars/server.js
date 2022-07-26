const express = require("express");
const productos = require("./productos.js")

const app = express();

const handlebars = require("express-handlebars");

app.engine(
    "hbs", 
    handlebars.engine({ 
        extname: ".hbs",
        defaultLayout: "index.hbs", 
        layoutDir: __dirname + "/views/layouts", 
        partialsDir: __dirname + "/views/partials/"
    })
);

app.set("view engine", "hbs");

app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", productos)

 
const server = app.listen(8080, () => {

    console.log("Servidor ok puerto 8080")

})

server.on("ERROR", error => console.log(`Error en el servidor ${error}`))



