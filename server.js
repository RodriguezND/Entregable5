const express = require("express");
const productos = require("./productos.js")

const app = express();

//carga el modulo handlebars
const handlebars = require("express-handlebars");

//establecememos la configuracion de handlebars
app.engine(
    "hbs", //nombre referencia a la plantilla, se usa luego en set
    handlebars.engine({ // funcion configuracion handlebars
        extname: ".hbs", // extension a utilizar (en lugar de .handlebars por defecto)
        defaultLayout: "index.hbs", //plantilla principal
        layoutDir: __dirname + "/views/layouts", //ruta a la plantilla principal
        partialsDir: __dirname + "/views/partials/" // ruta a las plantillas parciales
    })
);

//establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");
//establecemos directorio donde se encuentran los archivos de plantilla
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/", productos)


/* app.use("/formulario", express.static("public")) */
 
const server = app.listen(8080, () => {

    console.log("Servidor ok puerto 8080")

})

server.on("ERROR", error => console.log(`Error en el servidor ${error}`))



