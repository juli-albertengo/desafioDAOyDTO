const express = require('express');
const {Products} = require('../services/productServices');

const productsRouter = express.Router();

let productos = new Products([])

//GET /productos => Me permite listar todos los productos disponibles
productsRouter.get('/', async (req, res)=> {
    try{
        let products = await productos.getAllProducts();
        res.status(200);
        res.json(products);
    } catch (error){
        console.log(error);
        return []
    }
})


//GET /productos/:producto_id  =>  Obtener un producto por su id
productsRouter.get('/id/:id', async (req, res)=> {
    const {id} = req.params;
    let product = await productos.getProductById(id);
    res.status(200);
    res.json(product);
})


//GET /productos/:category => Obtener productos por su categoria
productsRouter.get('/category/:category', async (req, res)=> {
    const {category} = req.params;
    let products = await productos.getProductsByCategory(category);
    res.status(200);
    res.json(products);
})

//POST /productos => Para incorporar productos al listado
productsRouter.post('/', async (req, res)=> {
    const {name, category, description, foto, price} = req.body;
    let product = {
        name,
        category,
        description,
        foto, 
        price,
    }
    let addedProduct = await productos.addProduct(product);
    res.json(addedProduct);
})


//PATCH /productos/:producto_id => Actualiza un producto por su id
productsRouter.patch('/:id', async (req, res)=> {
    const {id, name, category, description, foto, price} = req.body;
    let product = {
        _id: id,
        name,
        category,
        description,
        foto, 
        price
    }
    let modifiedProduct = await productos.updateProductById(id, product);
    res.json(modifiedProduct);
})

//DELETE /productos/:producto_id => Borra un producto por su id
productsRouter.delete('/:id', async (req, res)=> {
    const {id} = req.params;
    let deletedProduct = await productos.deleteProduct(id);
    res.json(deletedProduct);
})

//GET => Default Route
productsRouter.get('/*', (req, res) => {
    res.json({message: `There's nothing to see here`});
})

module.exports = {productsRouter};