//Para pasar el argumento por consola
const chosenTypeOfConnection = process.argv[2] || 'MONGO';
//Uso lo que ya arme de Singleton
const dbConnection = require('../repositories/db');
const fs = require('fs');

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

    //Para los metodos de leer y agregar utilizaria los que tengo en productServices
}

//Connection de FS
class FileConnection extends Connection{
    constructor(){
        super('FILE');
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

    obtenerProductos = async () => {
        try {
            let datos = await fs.promises.readFile('datos.txt')
            return JSON.parse(datos)
        }
        catch(error) {
            console.log(error)
        }
    }
    agregarProducto = async producto => {
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
    console.log(connectionEstablished);

    //Prueba solo para FILE
    if(typeOfCon === 'FILE'){
        await connection.agregarProducto({name: "PRUEBA", category: "PRUEBA"});
        const data = await connection.obtenerProductos()
        console.log(data);
    }   
}

showInfo();

