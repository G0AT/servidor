const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//crear el servidor
const app = express();

//conectamos a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilitado de express.json
app.use(express.json({extended: true}));

//puerto de al app
const port = process.env.port || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/maletas', require('./routes/maletas'));
app.use('/api/materiales', require('./routes/materiales'));

//inicio de app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});