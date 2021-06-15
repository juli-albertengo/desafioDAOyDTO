const {productModel} = require('../repositories/productModel');


class Products{
    
    constructor(arrayProducts){
        this.products = arrayProducts;
    }

    async getAllProducts(){
        try {
            this.products = await productModel.find({})
            if(this.products === null || this.products === []){
                return []
            }
            return this.products;
        } catch (error){
            console.log(error)
            return [];
        }
    }

    /*async getProductsByCategory(category){
        try{
            let products = await productModel.find({category: category})
            if(products === null || products === []){
                return []
            }
            return products;
        } catch (error){
            console.log(error)
            return [];
        }

    }

    async getProductById(id){
        try {
            let product = await productModel.findOne({_id: id})
            if(!product){
                return {}
            }
            return product;
        } catch (error){
            console.log(error)
            return {};
        }
    }
    */
    async addProduct(product){
        let productToSave = new productModel(product);
        try {
            let savedProduct = await productToSave.save();
            return savedProduct;
        } catch (error) {
            console.log(error);
            return {}
        }
    }
    /*
    async updateProductById(id, updatedProduct){
        try {
            let product = await productModel.updateOne({_id: id}, {$set: updatedProduct});
            if(!product){
                return {error : 'Product not found'}
            }
            return product;
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    async deleteProduct(id){
        try {
            let product = await productModel.deleteOne({_id: id})
            if(!product){
                return {error: `Product not found`}
            }
            return product;
        } catch (error){
            console.log(error);
            return {}
        }
    }
    */
}

module.exports = {Products};