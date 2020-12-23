const mongoose = require ('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.BD_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('DB conectada');
    }catch(error){
        console.log(error);
        console.log('DB no conectada');
        process.exit(1);
    }
}

module.exports = conectarDB;