//el modulo dotenv para esconder claves
require("dotenv").config();

// nos traemos el módulo express que previamente hemos instalado
const express = require('express');
const { connectDB } = require("./src/config/db");
const issueRoutes = require('./src/api/routes/issue.routes')


//connectar do bbdd
connectDB();


const PORT = 3000;

// lo ejecutamos y guardamos en la variable app
const app = express();



console.log(process.env.DB_URL);
const router = express.Router(); 


app.use("/issues", issueRoutes);

// Aquí añadiremos el nuevo código, dejando el controlador de errores en último lugar

// Crearemos un middleware para cuando no encontremos la ruta que busquemos


app.use('*', (req, res, next) => {
	const error = new Error('Route not found'); 
	error.status = 404;
	next(error); // Lanzamos la función next() con un error
  });
  
  // Si se lanza la función
  app.use((error, req, res, next) => {//! no entiendo esto: no crees otra función con 4 argumentos como el controlador de errores
	  return res.status(error.status || 500).json(error.message || 'Unexpected error'); 
  });

 

app.listen(PORT, () => {
	console.log(`Server running in http://localhost:${PORT}`);
  });