import { promises as fs } from "fs";

//const fs = require("fs")

class ProductManager {

    constructor (path){
        this.product = new Array  
        this.path = this.crearTxt()
    }

    async crearTxt (path) {

        let resultado = await fs.exist("./listaProductos.txt")

        if(resultado){

        } else {
            await fs.writeFile("./listaProductos.txt", JSON.stringify(this.product));
        }
    }

    
    async getProduct(){
        let resultado = await fs.readFile("./listaProductos.txt", "utf-8");
        console.log(resultado)
        return JSON.parse(resultado); 
    }

    async addProduct(title, description, price, thumbnail, code, stock){

        let lectura = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(lectura);

        const existeCode = arrayProductos.some(item => item.code === code);

        if(existeCode){
            return "Error: Code Duplicado";
        } else {
        let id = ProductManager.generarIdUnico(); 
        arrayProductos.push({title,description,price,thumbnail,code,stock,id});
        await fs.writeFile(this.path, JSON.stringify(arrayProductos))
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

    getProductById(code){
        const productoId = this.product.find(item => item.code === code);
        if(productoId){
            return productoId;
        } else {
            return "No se encontro el producto";
        }
    }
}

const producto1 = new ProductManager();

console.log(producto1.getProduct());