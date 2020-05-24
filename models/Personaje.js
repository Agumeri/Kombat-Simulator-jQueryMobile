const mongoose = require('mongoose');

const PersonajeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    iniciativa: {
        type: Number,
        required: true
    },
    vida: {
        type: Number,
        required: true
    },
    CA: {
        type: Number,
        required: true
    },
    velocidad: {
        type: Number,
        required: true
    },
    fuerza: {
        type: Number,
        required: true
    },
    destreza: {
        type: Number,
        required: true
    },
    constitucion: {
        type: Number,
        required: true
    },
    inteligencia: {
        type: Number,
        required: true
    },
    sabiduria: {
        type: Number,
        required: true
    },
    carisma: {
        type: Number,
        required: true
    },
    turno: {
        type: Boolean,
        required: true
    }


});

module.exports = mongoose.model('Personaje', PersonajeSchema);