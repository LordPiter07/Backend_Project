import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";

const routerCarts = Router();
const cartAdmin = new CartManager('src/models/carrito.json');

//routes

//Crea un nuevo objeto carrito (RAIZ POST/)
routerCarts.post('/', async (req, res) => {
    let msj = await cartAdmin.crearCarrito()
    res.send(msj);
})

//Listar productos del carrito con el parametro ID carrito.
routerCarts.get('/:cid', async (req, res) => {
    const producto = await cartAdmin.getCart(req.params.cid);
    console.log(producto);
    res.send(JSON.stringify(producto));
})

routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const respuesta = await cartAdmin.addCart(req.params.cid, req.params.pid);
    res.send(respuesta);
})

export default routerCarts;