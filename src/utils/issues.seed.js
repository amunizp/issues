const issues = require("../api/data/issues");
const Issue = require("../api/models/Issue");
const mongoose = require("mongoose");
//el modulo dotenv para esconder claves
require("dotenv").config();

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos


mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
		// Buscamos todas los issues de nuestra colección
    const allIssues = await Issue.find();
		
		// Si existen issues previamente, dropearemos la colección
    if (allIssues.length) {
      await Issue.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la colección de issues, usaremos el array issues de nuestra carpeta data
		// para llenar nuestra base de datos con todas las issues.
		await Issue.insertMany(issues);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());