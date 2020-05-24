const express = require('express');
const router = express.Router();
const Personaje = require('../models/Personaje');
const bodyParser = require('body-parser');
const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.text({ type: 'text/html' }));

//GET ALL POST
/*router.get('/',  async (req,res) =>{
    const personaje = await Personaje.find();
    res.render('index.ejs', {personaje: personaje});
});*/

//SUBMIT A POST
router.post('/add-personaje', async (req,res) =>{

    const nuevopersonaje = new Personaje({
        nombre: req.body.nombre,
        iniciativa: req.body.iniciativa,
        vida: req.body.vida,
        CA: req.body.CA,
        velocidad: req.body.velocidad,
        fuerza: req.body.fuerza,
        destreza: req.body.destreza,
        constitucion: req.body.constitucion,
        inteligencia: req.body.inteligencia,
        sabiduria: req.body.sabiduria,
        carisma: req.body.carisma,
        turno: false
    });
    //console.log(nuevopersonaje);
    try{
        await nuevopersonaje.save();
        const mayorinic = await Personaje.find({"iniciativa":{$gt:req.body.iniciativa}});
        const anterior = await Personaje.findOne({"turno": true});
        if(Object.keys(mayorinic).length === 0){
            

            //console.log('Entra en el if');
            //console.log(nuevopersonaje._id);
            //console.log(anterior);
            await Personaje.updateOne(
                {_id: nuevopersonaje._id },
                { $set: {turno: true}}
            );

            //console.log(anterior._id);
            await Personaje.updateOne(
               { _id: anterior._id },
               { $set: {turno: false}}
            );
        };
        const personaje = await Personaje.find().sort({iniciativa: -1})
        res.render('index.ejs' , {personaje: personaje});
    }catch{};
});



//SPECIFIC POST
router.get('/:id' , async (req, res) =>{
    try{
        const personaje = await Personaje.findById(req.params.id);
        res.json(personaje);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/', async (req,res) =>{
    try{
        res.render('crearPersonaje.ejs');
    }catch(err){
        res.json({message: err});
    }
});

//REMOVE POST
router.get('/delete/:id' , async (req, res) =>{
    try{
        const removedPersonaje = await Personaje.findOne({ _id: req.params.id });
        if(removedPersonaje.turno == true){
            var siguiente = false;
            var id_siguiente;
            const primero = await Personaje.findOne().sort({iniciativa: -1});
            const personaje = await Personaje.find().sort({iniciativa: -1});     
            const ultimo = await Personaje.findOne().sort({iniciativa: 1});
            var id_ultimo = ultimo._id;
            personaje.forEach( personaje =>{
                var id_actual = personaje._id;
                if(siguiente){
                    id_siguiente = personaje._id;
                    siguiente = false;
                }
                if(personaje.turno == true){
                    siguiente = true;
                }
                if( String(id_actual) === String(id_ultimo) && siguiente){
                    //console.log('Entra en el ultimo if')
                    id_siguiente = primero._id;
                }
            });
            await Personaje.updateOne(
                { _id: id_siguiente },
                { $set: {turno: true}
            });
        }
        await Personaje.deleteOne({ _id: req.params.id });
        const personaje = await Personaje.find().sort({iniciativa: -1});
        res.render('index.ejs' , {personaje: personaje});
    }catch(err){
        res.json({message: err});
    }
});

//UPDATE POST
router.get('/updatesig/:id' , async (req, res) =>{
    var siguiente = false;
    var id_siguiente;
    const primero = await Personaje.findOne().sort({iniciativa: -1});
    const ultimo = await Personaje.findOne().sort({iniciativa: 1});
    const personaje = await Personaje.find().sort({iniciativa: -1});

    var id_ultimo = ultimo._id;

    personaje.forEach(personaje => {
        var id_actual = personaje._id;
        if(siguiente){
            id_siguiente = personaje._id;
            siguiente = false;
        }
        if(personaje.turno == true){
            siguiente = true;
        }
        if( String(id_actual) === String(id_ultimo) && siguiente){
            //console.log('Entra en el ultimo if')
            id_siguiente = primero._id;
        }
    });
    try{
        const updatedPersonajeSiguiente = await Personaje.updateOne(
            { _id: id_siguiente },
            { $set: {turno: true}}
        );
        const updatedPersonaje = await Personaje.updateOne(
            { _id: req.params.id },
            { $set: {turno: false}}
        );
        const personaje = await Personaje.find().sort({iniciativa: -1});
        res.render('index.ejs' , {personaje: personaje});
    }catch(err){
        res.json({message: err});
    }
});


router.get('/updateant/:id' , async (req, res) =>{
    var id_anterior;
    var id_actual;
    const primero = await Personaje.findOne().sort({iniciativa: -1});
    const ultimo = await Personaje.findOne().sort({iniciativa: 1});
    const personaje = await Personaje.find().sort({iniciativa: -1});

    var id_primero = primero._id;
    personaje.forEach(personaje => {
        
        
        if(personaje.turno == true){
            id_anterior = id_actual;
        }
        
        id_actual = personaje._id;

        if( String(id_actual) === String(id_primero) && personaje.turno == true){
            //console.log('Entra en el ultimo if')
            id_anterior = ultimo._id;
        }

        
    });
    try{
        const updatedPersonajeAnterior = await Personaje.updateOne(
            { _id: id_anterior },
            { $set: {turno: true}}  
        );
        const updatedPersonaje = await Personaje.updateOne(
            { _id: req.params.id },
            { $set: {turno: false}}
        );
        const personaje = await Personaje.find().sort({iniciativa: -1});
        res.render('index.ejs' , {personaje: personaje});
    }catch(err){
        res.json({message: err});
    }
});


//Update de la vida de un personaje
router.post('/changeHP/:id', async (req,res) => {
    var id = req.params.id;

    const personaje = await Personaje.findOne({"_id": id})
    const per = await Personaje.find().sort({iniciativa: -1});

    const vidaPersonaje = parseInt(personaje.vida,10);
    const vida = parseInt(req.body.nuevaVida,10);
    let newHP = vida + personaje.vida;

    try{
        const updatePersonaje = await Personaje.updateOne(
            { _id: req.params.id },
            { $set: {vida: newHP}}
        )
        const personaje = await Personaje.find().sort({iniciativa: -1});
        res.render('index.ejs' , {personaje: personaje});
    }catch(err){
        res.json({message: err});
    }


});

module.exports = router;