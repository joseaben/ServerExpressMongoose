'use strict'
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const dao = require('./DaoPelicula');

var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/peliculas",(req,res)=>{
 dao.consultar((peliculas)=>{
    res.status(200).send(peliculas); 
 });
});

app.post("/peliculas",(request,response)=>{
      dao.add(request.body,()=>{
            response.json({mensaje:"insertado ok"});
      });
});

app.put("/peliculas/:id",(request,response)=>{
   dao.update(request.params.id,request.body,()=>{
         response.json({mensaje:"Pelicula modificada correctamente"});
   });   
});

app.delete("/peliculas/:id",(request,response)=>{
      dao.delete(request.params.id,()=>{
            response.json({mensaje:"pelicula borrada correctamente"});
      });
});

app.listen(3000);
console.log("servidor escuchando en el puerto 3000");