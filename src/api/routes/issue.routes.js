const express = require('express'); 
const mongoose = require('mongoose')

const Issue = require("../models/Issue");
const { postUpdateIssue, getUpdateIssue } = require('../controllers/updateIssue') 

const router = express.Router();

const updateIssueRouter = require('express').Router();

//updateIssueRouter.get('/:id', getUpdateIssue);
//updateIssueRouter.post('/', postUpdateIssue);

module.exports = updateIssueRouter;

const getIssues = async (req, res, next) =>{
  try {
    const issues = await Issue.find();
    console.log("found issues, might be empty!")
    return res.status(200).json(issues);
  } catch (error){
    console.log("error no route found?")//porque esto no se ve? porque no he conseguido error. posiblemente tuvo un catch anterior
    return res.status(400).json(error);
  }
};

router.get("/", getIssues);


const getIssueById = async (req, res, next) =>{
  const id = req.params.id; 
  try {
    const issue = await Issue.findById(id);
    console.log(issue)
    if (issue){    
      console.log("aqui esta el issue")
      return res.status(200).json(issue);

    }
    else{
      console.log("else no hay issue. comprueba se va a catch?")
      return res.status(404).json('no issue found by this id'); //TODO por alguna razon este mensaje no se ve. 
    }
  } catch (error){
    if (error instanceof mongoose.CastError) {
      console.log("el id no es del formato adecuado. Muy largo o muy corto?")
      return res.status(400).json({ message: 'Formato ID invalido' });
  } else{
    return res.status(500).json(error);
  }
  }
};

router.get("/:id", getIssueById);

const getIssuesByCourtName = async (req, res, next) =>{
  const { courtName } = req.params; 
  try {
    const issuesByCourtName = await Issue.find({ courtName: courtName });
    console.log(issuesByCourtName) //devuelve vacío cuando deberia tener algo.
    return res.status(200).json(issuesByCourtName);

  } catch (error){
    
    return res.status(500).json(error);
  
  }
};

router.get("/issuesByCourtName/:issuesByCourtName", getIssuesByCourtName);

const getIssuesByCourtNumber = async (req, res, next) =>{
  const { courtNumber } = req.params; 
  try {
    //ver los que son menos o igual a
    const issuesByCourtNumber = await Issue.find({courtNumber: {$lte:courtNumber}});
    console.log(issuesByCourtNumber) 
    return res.status(200).json(issuesByCourtNumber);
  } catch (error){
    return res.status(500).json(error);
  }
};

router.get("/courtNumber/:courtNumber", getIssuesByCourtNumber);


const postIssue = async (req, res, next) => {
    try{
        //creamos una instancia de un issue con los datos enviados (todos?)
        const newIssue = new Issue ({
            courtName: req.body.courtName,
        courtNumber: req.body.courtNumber,
        locations: req.body.locations,
        category: req.body.category,
    img: req.body.img,
    description:req.body.description,
    reporter: req.body.reporter,
    assignTo: req.body.assignTo,
    update: req.body.update
        });
        console.log('estoy a punto de crear algo')
        const createdIssue = await newIssue.save();

        return res.status(201).json(createdIssue); 
    } catch (error){
      console.log("no consigo postear problema") 
      next(error);
     }
}
router.post('/create', postIssue)

module.exports = router;


const deleteIssue = async (req, res, next) => {
  try {
      const {id} = req.params;
      // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
      //pero me dice que la elimina aunque no exista?
      //TODO Como dejarle saber a la persona que lo que quieres eliminar no existia
      // sin tener que asignar variable?
      
      const deletedIssue = await Issue.findByIdAndDelete(id);
      if(deletedIssue){
      return res.status(200).json('issue Removed!');
      } else {
        return res.status(404).json('issue does not exist!');
      }

  } catch (error) {
      return next(error);
  }
}

router.delete('/:id', deleteIssue);

const editIssue = async (req, res, next) => {
  try {
      const { id } = req.params //Recuperamos el id de la url
      const issueModify = new Issue(req.body) //instanciamos un nuevo Issue con la información del body
      issueModify._id = id //añadimos la propiedad _id al Issue creado
      const issueUpdated = await Issue.findByIdAndUpdate(id , issueModify, {new: true}) 
      // la opción new: true nos permitirá ver el documento ya actualizado en lugar del anterior a ser actualizado
      return res.status(200).json(issueUpdated)//Este issue ya actualizado
  } catch (error) {
      return next(error)
  }
}

router.put('/edit/:id', editIssue);



