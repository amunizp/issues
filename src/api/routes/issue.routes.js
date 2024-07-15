const express = require('express'); 

const Issue = require("../models/Issue");

const router = express.Router();

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
      console.log("else no hay issue")
      return res.status(404).json('no issue found by this id'); //TODO por alguna razon este mensaje no se ve. 
    }
  } catch (error){
    return res.status(500).json(error);
  }
};

router.get("/:id", getIssueById);

const getIssuesByCourtName = async (req, res, next) =>{
  const { courtName } = req.params; 
  try {
    const issuesByCourtName = await Issue.find({courtName: courtName});
    console.log(issue)
    return res.status(200).json(issuesByCourtName);
  } catch (error){
    return res.status(500).json(error);
  }
};

router.get("/issuesByCourtName/:issuesByCourtName", getIssuesByCourtName);

const getIssuesByCourtNumber = async (req, res, next) =>{
  const { courtNumber } = req.params; 
  try {
    const issuesByCourtNumber = await Issue.find({courtNumber: {$lte:courtNumber}});
    console.log(issue)
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
