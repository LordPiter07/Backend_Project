import express, { urlencoded } from "express";
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js'
import { __dirname } from "./path.js";
import multer from "multer";

const app = express();
const PUERTO = 8080;

/*const imgStorage = multer.diskStorage({ destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({storage: imgStorage});*/

//Middlewares
app.use(express.json()); //Mi app va a entender JSON.
app.use(urlencoded({extended: true})); //Esta funcion es la que permite busquedas de URL complejas.

//Routes
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts)


/*app.post('/upload', upload.single('product'), (req,res) =>{
    console.log(req.file);
    res.send("Se cargo la imagen de manera exitosa");
})*/


app.listen(PUERTO, () =>{
    console.log(`Server On Port ${PUERTO}`)
});