const UpdateIssue = require("../models/UpdateIssue");

const postUpdateIssue = async (req, res, next) => {
  try {
    const newUpdateIssue = new UpdateIssue(req.body);
    const updateIssueSaved = newUpdateIssue.save();
    return res.status(201).json(updateIssueSaved);
  } catch (error) {
    return res.status(400).json("No se ha podido crear la actualizacion del issue");
  }
};
  
  const getUpdateIssue = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateIssue = await UpdateIssue.findById(id).populate("issues");
      return res.status(200).json(updateIssue);
    } catch (error) {
      return res.status(400).json("No se han podido conseguir los actualizaciones del los issues");
    }
  };