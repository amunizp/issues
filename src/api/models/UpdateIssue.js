const mongoose = require('mongoose');

//creamos un modelo en el que vamos a trabjar actualizando más de un asunto

const updateIssueSchema = new mongoose.Schema({
    description: {type:String, require: false},
    issues: [{ type: mongoose.Types.ObjectId, require: true, ref: 'issues'}],
    courtName: {type:String, require: false, trim:true},
    courtNumber: {type:Number, require:false},
    locations:[{type:String, enum:["window", "door", "floor", "celing", "wall", "other"]}],
    category:[{type:String, enum:["damp", "paint", "crack", "broken", "other"]}],
    assignTo:[{type:String, enum:["painter", "joiner", "carpenter", "builder", "electrician", "plumber", "roofer","handyperson", "gardener", "committee","advisoryGroup", "other"  ]}]
},{
    timestamps: true,
})

const UpdateIssue = mongoose.model('updateIssues', updateIssueSchema, 'updateIssues');

module.exports = UpdateIssue;
