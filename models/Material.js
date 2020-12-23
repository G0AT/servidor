const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: true,
    },
    cantidad:{
        type: String,
        required: true,
        trim: true
    },
    codigo:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    maleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Maleta'
    }
});

module.exports = mongoose.model('Material', materialSchema);