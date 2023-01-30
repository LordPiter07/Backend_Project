const fs = require("fs");

class ProductManager {

// funcion constructora crea .txt y le imprime un array vacio.
    constructor (){
        this.product = new Array  
        this.path = this.crearTxt()
    }

// crea el archivo.txt con una direccion fija. 
// En una primera instancia la direccion la pasaba como parametro en el constructor, pero tuve problemas con getProductById().
    crearTxt () {
        if(fs.existsSync("./listaProductos.txt")){

        } else {
            fs.writeFile("./listaProductos.txt", JSON.stringify(this.product), (error) => {
                if(error) {
                    console.log(`Error: ${error}`)
                }
            });
        }
    }
    
// Lee el archivo.txt y devuelve todo lo que contiene.
    getProducts(){
        fs.readFile("./listaProductos.txt", "utf-8", (error, data) => {
            if(!error){
                console.log(JSON.parse(data))
            } else{
                console.log(`Error: ${error}`)
            }
        });
    }

// Funcion creadora de productos. Crea el objeto en base a los parametros, los agrega al array y los imprime en el archivo.txt
    addProduct(title, description, price, thumbnail, code, stock){

        fs.readFile("./listaProductos.txt", "utf-8", (error, data) => {

            if(!error){
                const arrayProductos = (JSON.parse(data))
                const existeCode = arrayProductos.some(item => item.code === code);

                if(!existeCode){
                    let id = arrayProductos.length + 1; 
                    arrayProductos.push({title,description,price,thumbnail,code,stock,id});

                    fs.writeFile("./listaProductos.txt", JSON.stringify(arrayProductos), (error) => {
                        if(error) {
                            console.log(`Error: ${error}`)
                        } else {
                            console.log("Producto agregado exitosamente!")
                        }
                    });

                } else {
                    return "Error: Code Duplicado"; 
                }

            } else{
                console.log(`Error: ${error}`)
            }     
        });     
    }

// En base al codigo pasado por parametro, consulta el array impreso en el archivo.txt y si existe el codigo te devuelve el objeto producto.   
    getProductById(code){

        fs.readFile("./listaProductos.txt", "utf-8", (error, data) => {

            if(!error){
                const arrayProductos = (JSON.parse(data));
                const productoId = arrayProductos.find(item => item.code === code);

                if(productoId){
                    console.log(productoId);
                } else {
                    console.log("No se encontro el producto") ;
                }
            } else{
                console.log(`Error: ${error}`)
            } 
        });        
    }

// Busca el producto por el ID pasado como parametro, lo quita y actualiza el archivo.txt
    deleteProduct(id) {

        fs.readFile("./listaProductos.txt", "utf-8", (error, data) => {

            if(!error){
                const arrayProductos = (JSON.parse(data));
                const arrayFilter = arrayProductos.filter(item => item.id !== id);
                fs.writeFile("./listaProductos.txt", JSON.stringify(arrayFilter), (error) => {
                    if(error) {
                        console.log(`Error: ${error}`)
                    } else {
                        console.log("El Producto fue Eliminado.")
                    }
                });
            } else{
                console.log(`Error: ${error}`)
            } 
        });
    }


    updateProduct(id, ...producto){

    }

}

