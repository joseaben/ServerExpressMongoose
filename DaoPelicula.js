'use strict'
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/test');

const Pelicula = require("./PeliculaModel");

module.exports.consultar = function (fn){
   Pelicula.find((err,peliculas)=>{
        fn(peliculas);
    });
}
module.exports.add = function (pelicula,fn){
  var nuevaPeli = new Pelicula(pelicula);
    nuevaPeli.save((error)=>{
        if(error){
            console.log("Error al insertar en bbdd ", error);
        }
        fn();
    });
}    

module.exports.update = function (id,pelicula,fn){
    Pelicula.findById(id,(error,document)=>{
        if(error){
            console.log("Error al buscar el id");
        }
        document.titulo = pelicula.titulo;
        document.director = pelicula.director;
        document.sinopsis = pelicula.sinopsis;
        document.fecha = pelicula.fecha;

        var peliModificada = new Pelicula(document);

        peliModificada.save((error)=>{
            if(error){
                console.log("Error al insertar en bbdd ", error);
            }
            fn();
        });
    });
}

module.exports.delete = function (id,fn){
    Pelicula.findByIdAndRemove(id,(error)=>{
        if(error){
            console.log("Error al borrar el documento");
        }
        fn();
    });
}