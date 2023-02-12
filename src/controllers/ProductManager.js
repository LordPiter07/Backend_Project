import {promises as fs} from 'fs';

export class ProductManager {
    
    constructor(path){
        this.path = path;
    }

    async addProducts(producto){

        const array = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        producto.id = (array.length + 1);
        producto.status = true;
        array.push(producto);
        await fs.writeFile(this.path, JSON.stringify(array));
        return "Producto creado exitosamente!";
    }

    async getProducts() {
        try{
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            return prods;
        } catch(error){
            return error;
        }
    }

    async getProductById(id){

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if(prods.some(prod => prod.id === parseInt(id))) {
            return prods.find(prod => prod.id === parseInt(id))
        } else {
            return "No se encontro el Producto";
        }
    }

    async updateProduct(id, {title, description, price, thumbnail, code, stock}){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if(prods.some(prod => prod.id === parseInt(id))){
            let indice = prods.findIndex(prod => prod.id === parseInt(id));
            prods[indice].title = title;
            prods[indice].description = description;
            prods[indice].price = price;
            prods[indice].thumbnail = thumbnail;
            prods[indice].code = code;
            prods[indice].stock = stock;

            await fs.writeFile(this.path, JSON.stringify(prods));
            return "El Producto fue actualizado.";
        } else {
            return "No se encontro el Producto";
        }
    }

    async deleteProduct(id){

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        if(prods.some(prod => prod.id === parseInt(id))){
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id));
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados));
            return "El Producto fue Eliminado.";
        } else {
            return "No se encontro el Producto";
        }
    }

}
