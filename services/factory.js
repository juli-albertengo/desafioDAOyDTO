//Para pasar el argumento por consola
const chosenTypeOfConnection = process.argv[2] || 'MONGO';
//Uso lo que ya arme de Singleton
const dbConnection = require('../repositories/db');
const fs = require('fs');

//Requiero los DAOs y los DTOs
const {ProductosDAOMongo} = require('../dao/ProductosDAOMongo')
const ProductosDAOFs = require('../dao/ProductosDAOFs')
const {productoConInfo} = require('../dto/DTOproductos');

//Clase generica para todas las connections
class Connection {
    constructor(type){
        this.type = type
    }

    showTypeOfConnectionChosen(){
        return this.type;
    }
}

//Connection de MONGO
class MongoConnection extends Connection{
    constructor(){
        super('MONGO');
        this.productosDaoMongo = new ProductosDAOMongo()
    }

    async connect(){
        try{
            //Usando lo que ya estama de Singleton en repositories/db
            const connected = await dbConnection.Get();
            return connected;
        } catch(error){
            console.log(error);
        }
    }

    //TODO: UTILIZO EL DAO DE MONGO - Entiendo que esto seria mi clase de ProductosApi

    async agregar(prodParaAgregar) {
        const prodAgregado = await this.productosDaoMongo.addProduct(prodParaAgregar)
        return prodAgregado
    }

    async buscar(id) {
        let productos
        if (id) {
            productos = await this.productosDaoMongo.getProductById(id)

        } else {
            productos = await this.productosDaoMongo.getAllProducts()
        }
        return productos
    }

    async borrar(id) {
        if(id) {
            await this.productosDaoMongo.deleteProduct(id)
        }
        else {
            console.log('Provide an id to delete the product')
        }
    }

    async reemplazar(id, prodParaReemplazar) {
        const prodReemplazado = await this.productosDaoMongo.updateProductById(id, prodParaReemplazar)
        return prodReemplazado
    }

    async buscardto(id) {
        let producto
        if (id) {
            producto = await this.productosDaoMongo.getProductById(id)
            let productodto = productoConInfo(producto);
            return productodto;
        } 
        else {
            producto = {}
        }
        return producto
    }

}

//Connection de FS
class FileConnection extends Connection{
    constructor(){
        super('FILE');
        this.productosDaoFs = new ProductosDAOFs()
    }

    async connect(){
        try {
            await fs.promises.readFile('datos.txt') 
        }
        catch {
            await fs.promises.writeFile('datos.txt', JSON.stringify([]))
        }
        return "File System Established";
    }

    //TODO: UTILIZO EL DAO DE FS - Entiendo que esto seria mi clase de ProductosApi (solo hice agregar y buscar)
    async agregar(prodParaAgregar) {
        const prodAgregado = await this.productosDaoFs.agregarProducto(prodParaAgregar)
        return prodAgregado
    }

    async obtenerProductos() {
        let productos = await this.productosDaoFs.obtenerProductos()
        return productos
    }

}

class ConnectionFactory {
    create(type){
        switch(type){
            case 'MONGO':
                return new MongoConnection();
            case 'FILE':
                return new FileConnection();
            default:
                {
                    console.log(`No connection name was provided.`)
                }
        }   
    }
}

const connection = new ConnectionFactory().create(chosenTypeOfConnection);


const showInfo = async()=> {
    const typeOfCon = connection.showTypeOfConnectionChosen()
    console.log(`TYPE OF CONNECTION CHOSEN => ${typeOfCon}`)
    const connectionEstablished = await connection.connect();
    //console.log(connectionEstablished);  

    if(typeOfCon === 'FILE'){
        await connection.agregar({name: "PRUEBA", category: "PRUEBA"});
        const data = await connection.obtenerProductos();
        console.log(data);
    }

    if(typeOfCon === 'MONGO'){
        await connection.agregar({name: "PRUEBA", category: "PRUEBA", description: "prueba", foto: 'someurl', price: 400});
        const productosMongo = await connection.buscar('');
        const pruebaDTO = await connection.buscardto('60cfd04afce9d83454c91e70')
        console.log(`TODOS LOS PRODUCTOS => ${productosMongo}`);
        console.log(`PRUEBA DTO => ${pruebaDTO.producto}, FECHA ${pruebaDTO.fyh}, PRECIO ${pruebaDTO.precioEnPesos}`);
    }
}

showInfo();
