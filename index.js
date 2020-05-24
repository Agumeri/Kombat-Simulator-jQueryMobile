const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const Personaje = require('./models/Personaje');
require('dotenv/config');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const app = express();

//Settings

//Middelwares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));
//Importamos rutas
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);
const personajeRoute = require('./routes/personaje');
app.use('/personaje', personajeRoute);

//Rutas
app.get('/', async (req,res) => {
    const personaje = await Personaje.find().sort({iniciativa: -1});
    res.render('index.ejs', {personaje: personaje});
});

app.get('/informacion', async (req,res) => {
    res.render('información.ejs');
});



//Conectamos con la base de datos
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true},
    () => console.log('connected to DB!')
);


//Escuchamos en el puerto 3000
app.listen(3000, () => {
    console.log(`Servidor conectado al puerto ${3000}`);

});