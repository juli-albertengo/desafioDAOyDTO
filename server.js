const express = require('express');
//const {connectToDB} = require('./repositories/db');
const dbConnection = require('./repositories/db');
const {productsRouter} = require('./routes/productRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.json({message: `Welcome page`})
})

app.use('/products', productsRouter);


const startServer = async() => {
    try{
        const connected = await dbConnection.Get();
        console.log(connected);
        app.listen(8080, ()=> {
            console.log(`App listening on port 8080`);
        })
    } catch(error){
        console.log(error);
    }
}

startServer();

/* Prueba
const main = async() => {
    await dbConnection.Get();
    await dbConnection.Get();
    await dbConnection.Get();
}

main();
*/