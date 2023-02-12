import {promises as fs} from 'fs';

export class CartManager {
    
    constructor(path){
        this.path = path;
    }

    async crearCarrito(){
        const array = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        let carrito = {
                        id: (array.length +1), 
                        products: new Array
                    };
        array.push(carrito);
        await fs.writeFile(this.path, JSON.stringify(array));
        return "Se creo el nuevo Carrito";
    }

    async addCart(cid, pid){

        const array = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const cartExiste = array.some(item => item.id === parseInt(cid));

        if(cartExiste){
            const arrayProds = JSON.parse(await fs.readFile('src/models/productos.json', 'utf-8'));
            const prodExiste = arrayProds.some(item => item.id === parseInt(pid));
            if(prodExiste){

                let carrito = array.find(item => item.id === parseInt(cid));
                const prodExisteCart = carrito.products.some(item => item.product === (pid));
                console.log(prodExisteCart)
                if(prodExisteCart){

                    const variable = carrito.products.find(item => item.product === (pid));
                    //carrito.products.variable.quantity++;
                    variable.quantity++;
                } else {
                    carrito.products.push({product: pid, quantity: 1});
                }

                await fs.writeFile(this.path, JSON.stringify(array));
                return "El Producto se agrego al Carrito";

            } else {
                return "El producto que intenta agregar al carrito No existe";
            }

        } else {
            return "No existe carrito con el ID proporcionado";
        }
    }

    async getCart(id){
        const array = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const carritoExiste =array.some(item => item.id === parseInt(id));
        if(carritoExiste){
            let arrayFilter = array.find(item => item.id === parseInt(id));
            return arrayFilter.products;
        } else {
            return "No existe carrito con el ID proporcionado";
        }
    }

}



