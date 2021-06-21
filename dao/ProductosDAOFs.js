const fs = require('fs');


class ProductosDAOFs{
    
    constructor(arrayProducts){
        this.products = arrayProducts;
    }

    async obtenerProductos(){
        try {
            let datos = await fs.promises.readFile('datos.txt')
            return JSON.parse(datos)
        }
        catch(error) {
            console.log(error)
        }
    }
    async agregarProducto(producto){
        try {
            let productos = JSON.parse(await fs.promises.readFile('datos.txt'))
            productos.push(producto)
            await fs.promises.writeFile('datos.txt', JSON.stringify(productos))
        }
        catch(error) {
            console.log(error)
        }
    }
    
}

module.exports = ProductosDAOFs;




