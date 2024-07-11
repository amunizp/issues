const mongoose = require('mongoose');

const updateIssueSchema = new mongoose.Schema({
    description: {type:String, require: true, trim: true},
    issues: [{ type: mongoose.Types.ObjectId, require: true, ref: 'issues'}]
},{
    timestamps: true,
})

const UpdateIssue = mongoose.model('updateIssues', updateIssueSchema, 'updateIssues');

module.exports = UpdateIssue;
