import express, { urlencoded } from "express";
import routerProducts from "./routes/products.js";
import routerCarts from "./routes/carts.js";
import routerRealTime from "./routes/realTimeProducts.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { ProductManager } from "../src/controllers/ProductManager.js";
import { Server } from "socket.io";

const app = express();
const PUERTO = 8080;
const productManager = new ProductManager('src/models/productos.json');

const server = app.listen(PUERTO, () =>{
    console.log(`Server On Port ${PUERTO}`);
})
const io = new Server(server);


//Middlewares
app.use(express.json()); //Mi app va a entender JSON.
app.use(urlencoded({extended: true})); //Esta funcion es la que permite busquedas de URL complejas.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, './views'));

//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/', routerRealTime);// saque --> realtimeproducts de la url



io.on("connection", (socket) =>{
    console.log("Cliente conectado");
    socket.on('mensaje', info=>{
        console.log(info);
    })

    socket.emit('evento-admin', "desde server ADMIN")
})





