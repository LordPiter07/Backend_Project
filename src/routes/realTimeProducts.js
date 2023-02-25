import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";


const routerRealTime = Router();
const productManager = new ProductManager('src/models/productos.json');

routerRealTime.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    res.render("home", {titulo: "E-commerce", productos});
})

routerRealTime.get('/realtimeproducts', async (req, res) => {
    const productos = await productManager.getProducts();
    res.render("realTimeProducts", {titulo: "Lista Real Time", productos});
})


export default routerRealTime;