require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = function(){
    let db = null;
    let instance = 0;

    async function dbConnect(){
        try {
            const connection = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
            return connection;
        } catch (error) {
            return error;
        }
    }

    async function Get(){
        try{
            instance++;
            console.log(`DbConnection called ${instance} times`);

            if(db != null){
                console.log(`Connection is already alive`);
                return db;
            } else {
                console.log(`Getting connection`);
                db = await dbConnect();
                return db
            }
        } catch(error){
            return error;
        }
    }

    return {
        Get: Get
    }
}

module.exports = dbConnection();

/*const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return 'DB Connection established'
    } catch (error) {
        return error;
    }
}

module.exports = {connectToDB}
*/