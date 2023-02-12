import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerProducts = Router();
const productManager = new ProductManager('src/models/productos.json');

//Routes

//Lista de productos
routerProducts.get("/", async (req, res) => {
    const { limit } = req.query;
    const productos = await productManager.getProducts();
    if(limit){
        console.log(productos.slice(0, limit));
        res.send(JSON.stringify(productos.slice(0, limit)));
    } else {
        console.log(productos);
        res.send(JSON.stringify(productos));
    }
});

//Productos filtrados por ID
routerProducts.get('/:pid', async (req, res) =>{
    const producto = await productManager.getProductById(req.params.pid);
    console.log(producto);
    res.send(JSON.stringify(producto));
});

//Agregar un nuevo producto a la lista (RAIZ POST)
routerProducts.post('/', async (req, res) => {
    let msj = await productManager.addProducts(req.body);
    res.send(msj);
})

//Borrar un producto de la lista
routerProducts.delete('/:pid', async (req, res) => {
    let msj = await productManager.deleteProduct(req.params.pid);
    res.send(msj);
})

//actualizar un producto de la lista
routerProducts.put('/:pid', async (req, res) => {
    let msj = await productManager.updateProduct(req.params.pid, req.body);
    res.send(msj);
})


export default routerProducts;