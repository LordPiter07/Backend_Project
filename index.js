import { promises as fs } from "fs";

class ProductManager {

    constructor (){
        this.product = new Array  
        this.path = this.crearTxt()
    }

    async crearTxt () {
        await fs.writeFile("./listaProductos.txt", JSON.stringify(this.product));
    }

    
    async getProduct(){
        let leer = await fs.readFile("./listaProductos.txt", "utf-8");
        return JSON.parse(leer); 
    }

    async addProduct(title, description, price, thumbnail, code, stock){

        let leer = await fs.readFile("./listaProductos.txt", "utf-8");
        const arrayProductos = JSON.parse(leer);

        const existeCode = arrayProductos.some(item => item.code === code);

        if(existeCode){
            return "Error: Code Duplicado";
        } else {
        let id = ProductManager.generarIdUnico(); 
        arrayProductos.push({title,description,price,thumbnail,code,stock,id});
        await fs.writeFile("./listaProductos.txt", JSON.stringify(arrayProductos))
        }
    }

    static generarIdUnico(){ 
        if(this.incrementarId){
            this.incrementarId++
        } else {
            this.incrementarId = 1
        }
        return this.incrementarId;         
    } 

    async getProductById(code){

        let leer = await fs.readFile("./listaProductos.txt", "utf-8");
        const arrayProductos = JSON.parse(leer);

        const productoId = arrayProductos.find(item => item.code === code);
        if(productoId){
            return productoId;
        } else {
            return "No se encontro el producto";
        }
    }

    async updateProduct(id, producto){

    }

    async deleteProduct(id) {

        let leer = await fs.readFile("./listaProductos.txt", "utf-8");
        const arrayProductos = JSON.parse(leer);
        const arrayFilter = arrayProductos.filter(item => item.id !== id);
        await fs.writeFile("./listaProductos.txt", JSON.stringify(arrayFilter));

    }
}
