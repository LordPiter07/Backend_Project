import express, { urlencoded } from "express";
import ProductManager from "../ProductManager.js";


const app = express();
const PUERTO = 8080; 


const productos = [
{"title":"Coca Cola","description":"Botella 2lt","price":200,"thumbnail":"Sin Imagen","code":"Co03","stock":10,"id":1},
{"title":"Detergente","description":"Botella","price":350,"thumbnail":"Sin Imagen","code":"Dt04","stock":10,"id":2},
{"title":"Pan","description":"Bolsa kg","price":180,"thumbnail":"Sin Imagen","code":"Pa05","stock":10,"id":3},
{"title":"Carne","description":"kg","price":800,"thumbnail":"Sin Imagen","code":"Ca06","stock":10,"id":4},
{"title":"Verdura","description":"Paquete","price":250,"thumbnail":"Sin Imagen","code":"Vo07","stock":10,"id":5},
{"title":"Fruta","description":"Bolsa kg","price":280,"thumbnail":"Sin Imagen","code":"Fr08","stock":10,"id":6},
{"title":"Servilletas","description":"Por rollo","price":170,"thumbnail":"Sin Imagen","code":"Se09","stock":10,"id":7},
{"title":"Jardinera","description":"Lata","price":180,"thumbnail":"Sin Imagen","code":"Ja10","stock":10,"id":8},
{"title":"Desinfectante","description":"Botella lt","price":800,"thumbnail":"Sin Imagen","code":"Ca11","stock":10,"id":9},
{"title":"Huevo","description":"Maple","price":600,"thumbnail":"Sin Imagen","code":"Hu12","stock":10,"id":10}
];

//Esta funcion es la que permite busquedas de URL complejas.
app.use(urlencoded({extended: true})); 

app.get("/products", (req, res) =>{
    let {limit} = req.query;
    if(limit){
        console.log(productos.slice(0, limit));
    } else {
        console.log(productos);
    }
    res.send("Lista de Productos")
});

//Request hecha por Params
app.get("/products/:id", (req, res) =>{
    console.log(productos.find(item => item.id === parseInt(req.params.id)));
    res.send("Productos filtro por ID");
});


//Pagina de Inicio
app.get("/", (req, res) =>{
    res.send('Bienvenido! Pagina de Inicio')
});

app.listen(PUERTO, () =>{
    console.log(`Server On Port ${PUERTO}`)
});