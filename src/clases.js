import express, { urlencoded } from "express";
import { ProductManager } from "./models/ProductManager.js";

const app = express();
const PUERTO = 4000;

const productManager = new ProductManager('src/models/listaProductos.txt');

app.use(express.json()); //Mi app va a entender JSON.
app.use(urlencoded({extended: true})); //Esta funcion es la que permite busquedas de URL complejas.


//Routes

//Pagina de Inicio
app.get('/', (req, res) =>{
    res.send('Bienvenido! Pagina de Inicio')
});

//Lista de productos
app.get('/products', async (req, res) => {
    const { category } = req.query;
    console.log(category);
    const productos = await productManager.getProducts();
    console.log(productos);
    res.send(JSON.stringify(productos));
});

//Productos filtrados por ID
app.get('/products/:id', async (req, res) =>{
    const producto = await productManager.getProductById(req.params.id);
    console.log(producto);
    res.send(JSON.stringify(producto));
});

//Agregar un nuevo producto a la lista
app.post('/products', async (req, res) => {
    let msj = await productManager.addProducts(req.body);
    res.send(msj);
})

//Borrar un producto de la lista
app.delete('/products/:id', async (req, res) => {
    let msj = await productManager.deleteProduct(req.params.id);
    res.send(msj);
})

//actualizar un producto de la lista
app.put('/products/:id', async (req, res) => {
    let msj = await productManager.updateProduct(req.params.id, req.body);
    res.send(msj);
})


app.listen(PUERTO, () =>{
    console.log(`Server On Port ${PUERTO}`)
});