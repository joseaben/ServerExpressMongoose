'use strict'
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PeliSchema = new Schema({
    titulo: String,
    director: String,
    sinopsis: String,
    fecha: String
});

module.exports = mongoose.model("Pelicula", PeliSchema);